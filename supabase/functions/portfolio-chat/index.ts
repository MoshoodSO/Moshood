import { createOpenAI } from "npm:@ai-sdk/openai@^3";
import { streamText, convertToModelMessages, type UIMessage } from "npm:ai@^6";
import { createClient } from "npm:@supabase/supabase-js@^2.96.0";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id",
  "Access-Control-Expose-Headers": "X-Lovable-AIG-Run-ID",
};
const RUN = "X-Lovable-AIG-Run-ID";

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json(500, { error: "AI is not configured." });

    const { messages } = (await req.json()) as { messages: UIMessage[] };
    if (!Array.isArray(messages) || messages.length === 0) return json(400, { error: "No messages." });

    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      auth: { persistSession: false },
    });
    const { data } = await sb.from("profile_data").select("data").limit(1);
    const profile = data?.[0]?.data ?? {};

    const instructions = `You are the friendly portfolio assistant on Moshood Shoyombo's website. Answer visitors' questions about Moshood's background, skills, projects, recognitions, teaching, certifications, badges and contact details using ONLY the profile data below. If the answer isn't in the data, say you don't know and suggest using the Contact page. Be concise, use markdown (lists, bold, links) when helpful, and refer to Moshood in the third person.

PROFILE DATA (JSON):
${JSON.stringify(profile)}`;

    let runId = req.headers.get(RUN)?.trim() || undefined;
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: async (input, init) => {
        const h = new Headers(init?.headers);
        if (runId && !h.has(RUN)) h.set(RUN, runId);
        const res = await fetch(input, { ...init, headers: h });
        runId ??= res.headers.get(RUN)?.trim() || undefined;
        return res;
      },
    });

    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system: instructions,
      messages: await convertToModelMessages(messages),
      abortSignal: req.signal,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      sendReasoning: true,
      headers: cors,
      onError: (e: any) => {
        const status = e?.statusCode ?? e?.status;
        if (status === 429) return "The assistant is busy right now. Please try again in a moment.";
        if (status === 402) return "The assistant is temporarily unavailable (AI credits exhausted).";
        if (status === 403) return "The assistant is not available right now.";
        console.error(e);
        return "Sorry, something went wrong answering that.";
      },
    });
  } catch (e) {
    console.error(e);
    return json(500, { error: "Unexpected error." });
  }
});
