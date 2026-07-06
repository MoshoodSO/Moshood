import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description: "Return the full portfolio profile (bio, contact links, skills, projects, recognitions, teaching, certificates, badges, tech stack, stats).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async () => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    const { data, error } = await supabase.from("profile_data").select("data").limit(1);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    const profile = data?.[0]?.data ?? null;
    return {
      content: [{ type: "text", text: JSON.stringify(profile) }],
      structuredContent: { profile },
    };
  },
});
