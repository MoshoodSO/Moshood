import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description: "List portfolio projects with title, description, features, tech stack, and repo/live URLs.",
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
    const projects = (data?.[0]?.data as any)?.projects ?? [];
    return {
      content: [{ type: "text", text: JSON.stringify(projects) }],
      structuredContent: { projects },
    };
  },
});
