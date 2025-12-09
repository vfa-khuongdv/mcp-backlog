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
    "list_priorities",
    { description: "List available priorities" },
    async () => {
      const priorities = await api.listPriorities();
      return {
        content: [{ type: "text", text: JSON.stringify(priorities, null, 2) }],
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
    "list_issue_types",
    {
      description: "List issue types for a project",
      inputSchema: { projectIdOrKey: z.string() },
    },
    async (args) => {
      const types = await api.listIssueTypes(args.projectIdOrKey);
      return {
        content: [{ type: "text", text: JSON.stringify(types, null, 2) }],
      };
    }
  );

  server.registerTool(
    "list_categories",
    {
      description: "List categories for a project",
      inputSchema: { projectIdOrKey: z.string() },
    },
    async (args) => {
      const categories = await api.listCategories(args.projectIdOrKey);
      return {
        content: [{ type: "text", text: JSON.stringify(categories, null, 2) }],
      };
    }
  );

  server.registerTool(
    "list_versions",
    {
      description: "List versions for a project",
      inputSchema: { projectIdOrKey: z.string() },
    },
    async (args) => {
      const versions = await api.listVersions(args.projectIdOrKey);
      return {
        content: [{ type: "text", text: JSON.stringify(versions, null, 2) }],
      };
    }
  );

  server.registerTool(
    "list_milestones",
    {
      description: "List milestones for a project",
      inputSchema: { projectIdOrKey: z.string() },
    },
    async (args) => {
      const milestones = await api.listMilestones(args.projectIdOrKey);
      return {
        content: [{ type: "text", text: JSON.stringify(milestones, null, 2) }],
      };
    }
  );
}
