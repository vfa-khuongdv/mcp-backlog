import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BacklogApi } from "../backlog-api.js";

export function registerProjectTools(server: McpServer, api: BacklogApi) {
  server.registerTool(
    "list_projects",
    { description: "List all projects" },
    async () => {
      const projects = await api.listProjects();
      return {
        content: [{ type: "text", text: JSON.stringify(projects, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get_project",
    {
      description: "Get project details",
      inputSchema: {
        projectIdOrKey: z.string(),
      },
    },
    async (args) => {
      const project = await api.getProject(args.projectIdOrKey);
      return {
        content: [{ type: "text", text: JSON.stringify(project, null, 2) }],
      };
    }
  );

  server.registerTool(
    "list_project_members",
    {
      description: "List members of a project",
      inputSchema: {
        projectIdOrKey: z.string(),
      },
    },
    async (args) => {
      const members = await api.listProjectUsers(args.projectIdOrKey);
      return {
        content: [{ type: "text", text: JSON.stringify(members, null, 2) }],
      };
    }
  );

  server.registerTool(
    "add_project_member",
    {
      description: "Add a user to a project",
      inputSchema: {
        projectIdOrKey: z.string(),
        userId: z.number(),
      },
    },
    async (args) => {
      const result = await api.addProjectUser(args.projectIdOrKey, args.userId);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.registerTool(
    "remove_project_member",
    {
      description: "Remove a user from a project",
      inputSchema: {
        projectIdOrKey: z.string(),
        userId: z.number(),
      },
    },
    async (args) => {
      const result = await api.removeProjectUser(
        args.projectIdOrKey,
        args.userId
      );
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
