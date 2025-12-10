import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BacklogApi } from "../backlog-api.js";

export function registerCategoryTools(server: McpServer, api: BacklogApi) {
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
    "create_category",
    {
      description: "Create a new category for a project",
      inputSchema: {
        projectIdOrKey: z.string(),
        name: z.string(),
      },
    },
    async (args) => {
      const category = await api.createCategory(args.projectIdOrKey, {
        name: args.name,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(category, null, 2) }],
      };
    }
  );

  server.registerTool(
    "update_category",
    {
      description: "Update an existing category",
      inputSchema: {
        projectIdOrKey: z.string(),
        categoryId: z.number(),
        name: z.string(),
      },
    },
    async (args) => {
      const category = await api.updateCategory(
        args.projectIdOrKey,
        args.categoryId,
        {
          name: args.name,
        }
      );
      return {
        content: [{ type: "text", text: JSON.stringify(category, null, 2) }],
      };
    }
  );

  server.registerTool(
    "delete_category",
    {
      description: "Delete a category",
      inputSchema: {
        projectIdOrKey: z.string(),
        categoryId: z.number(),
      },
    },
    async (args) => {
      const result = await api.deleteCategory(
        args.projectIdOrKey,
        args.categoryId
      );
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
