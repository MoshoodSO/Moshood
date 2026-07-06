import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_certificates",
  title: "List certificates",
  description: "List certifications, optionally filtered by category or year.",
  inputSchema: {
    category: z.string().optional().describe("Filter by category (case-insensitive)."),
    year: z.string().optional().describe("Filter by year (e.g. '2025')."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category, year }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
    const { data, error } = await supabase.from("profile_data").select("data").limit(1);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    let certs: any[] = (data?.[0]?.data as any)?.certificates ?? [];
    if (category) certs = certs.filter((c) => (c.category ?? "").toLowerCase() === category.toLowerCase());
    if (year) certs = certs.filter((c) => String(c.year) === year);
    return {
      content: [{ type: "text", text: JSON.stringify(certs) }],
      structuredContent: { certificates: certs },
    };
  },
});
