import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact",
  title: "Get contact info",
  description: "Return contact methods and links (email, LinkedIn, GitHub, Kaggle, Twitter, etc.).",
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
    const profile = (data?.[0]?.data as any) ?? {};
    const contact = {
      email: profile.email,
      linkedin: profile.linkedin,
      twitter: profile.twitter,
      github: profile.github,
      kaggle: profile.kaggle,
      datacamp: profile.datacamp,
      methods: profile.contact?.methods ?? [],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(contact) }],
      structuredContent: { contact },
    };
  },
});
