import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BacklogApi } from "../backlog-api.js";

export function registerMetadataTools(server: McpServer, api: BacklogApi) {
  server.registerTool(
    "get_myself",
    { description: "Get information about the current user" },
    async () => {
      const user = await api.getMyself();
      return {
        content: [{ type: "text", text: JSON.stringify(user, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get_priority_list",
    { description: "Get Priority List" },
    async () => {
      const priorities = await api.listPriorities();
      return {
        content: [{ type: "text", text: JSON.stringify(priorities, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get_resolution_list",
    { description: "Get Resolution List" },
    async () => {
      const resolutions = await api.listResolutions();
      return {
        content: [{ type: "text", text: JSON.stringify(resolutions, null, 2) }],
      };
    }
  );

  server.registerTool(
    "list_statuses",
    { description: "List available statuses" },
    async () => {
      const statuses = await api.listStatuses();
      return {
        content: [{ type: "text", text: JSON.stringify(statuses, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get_issue_type_list",
    {
      description: "Get issue type list of a project",
      inputSchema: { projectIdOrKey: z.string() },
    },
    async (args) => {
      const types = await api.listIssueTypes(args.projectIdOrKey);
      return {
        content: [{ type: "text", text: JSON.stringify(types, null, 2) }],
      };
    }
  );
}
