import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BacklogApi } from "../backlog-api.js";

export function registerVersionTools(server: McpServer, api: BacklogApi) {
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
    "create_version",
    {
      description: "Create a new version for a project",
      inputSchema: {
        projectIdOrKey: z.string(),
        name: z.string(),
        description: z.string().optional(),
        startDate: z.string().optional(), // YYYY-MM-DD
        releaseDueDate: z.string().optional(), // YYYY-MM-DD
      },
    },
    async (args) => {
      const version = await api.createVersion(args.projectIdOrKey, {
        name: args.name,
        description: args.description,
        startDate: args.startDate,
        releaseDueDate: args.releaseDueDate,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(version, null, 2) }],
      };
    }
  );

  server.registerTool(
    "update_version",
    {
      description: "Update an existing version",
      inputSchema: {
        projectIdOrKey: z.string(),
        versionId: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        startDate: z.string().optional(),
        releaseDueDate: z.string().optional(),
        archived: z.boolean().optional(),
      },
    },
    async (args) => {
      const version = await api.updateVersion(
        args.projectIdOrKey,
        args.versionId,
        {
          name: args.name,
          description: args.description,
          startDate: args.startDate,
          releaseDueDate: args.releaseDueDate,
          archived: args.archived,
        }
      );
      return {
        content: [{ type: "text", text: JSON.stringify(version, null, 2) }],
      };
    }
  );

  server.registerTool(
    "delete_version",
    {
      description: "Delete a version",
      inputSchema: {
        projectIdOrKey: z.string(),
        versionId: z.number(),
      },
    },
    async (args) => {
      const result = await api.deleteVersion(
        args.projectIdOrKey,
        args.versionId
      );
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
