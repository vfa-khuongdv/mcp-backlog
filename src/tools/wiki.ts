import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BacklogApi } from "../backlog-api.js";

export function registerWikiTools(server: McpServer, api: BacklogApi) {
  server.registerTool(
    "list_wikis",
    {
      description: "List wikis in a project",
      inputSchema: {
        projectIdOrKey: z.string(),
      },
    },
    async (args) => {
      const wikis = await api.listWikis(args.projectIdOrKey);
      return {
        content: [{ type: "text", text: JSON.stringify(wikis, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get_wiki",
    {
      description: "Get a wiki page",
      inputSchema: {
        wikiId: z.number(),
      },
    },
    async (args) => {
      const wiki = await api.getWiki(args.wikiId);
      return {
        content: [{ type: "text", text: JSON.stringify(wiki, null, 2) }],
      };
    }
  );

  server.registerTool(
    "create_wiki",
    {
      description: "Create a new wiki page",
      inputSchema: {
        projectId: z.number(),
        name: z.string(),
        content: z.string(),
        mailNotify: z.boolean().optional(),
      },
    },
    async (args) => {
      const wiki = await api.createWiki(args);
      return {
        content: [{ type: "text", text: JSON.stringify(wiki, null, 2) }],
      };
    }
  );

  server.registerTool(
    "update_wiki",
    {
      description: "Update a wiki page",
      inputSchema: {
        wikiId: z.number(),
        name: z.string().optional(),
        content: z.string().optional(),
        mailNotify: z.boolean().optional(),
      },
    },
    async (args) => {
      const { wikiId, ...params } = args;
      const wiki = await api.updateWiki(wikiId, params);
      return {
        content: [{ type: "text", text: JSON.stringify(wiki, null, 2) }],
      };
    }
  );

  server.registerTool(
    "delete_wiki",
    {
      description: "Delete a wiki page",
      inputSchema: {
        wikiId: z.number(),
      },
    },
    async (args) => {
      const result = await api.deleteWiki(args.wikiId);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
