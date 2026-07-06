import { defineMcp } from "@lovable.dev/mcp-js";
import getProfileTool from "./tools/get-profile";
import listProjectsTool from "./tools/list-projects";
import listCertificatesTool from "./tools/list-certificates";
import getContactTool from "./tools/get-contact";

export default defineMcp({
  name: "moshood-portfolio-mcp",
  title: "Moshood Shoyombo Portfolio",
  version: "0.1.0",
  instructions:
    "Tools for exploring Moshood Shoyombo's portfolio. Use `get_profile` for a full overview, `list_projects` for projects, `list_certificates` (optionally filtered by category or year) for credentials, and `get_contact` for contact links.",
  tools: [getProfileTool, listProjectsTool, listCertificatesTool, getContactTool],
});
