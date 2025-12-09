import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BacklogApi } from "../backlog-api.js";

export function registerCommentTools(server: McpServer, api: BacklogApi) {
  server.registerTool(
    "list_comments",
    {
      description: "List comments of an issue",
      inputSchema: {
        issueIdOrKey: z.string(),
      },
    },
    async (args) => {
      const comments = await api.listComments(args.issueIdOrKey);
      return {
        content: [{ type: "text", text: JSON.stringify(comments, null, 2) }],
      };
    }
  );

  server.registerTool(
    "add_comment",
    {
      description: "Add a comment to an issue",
      inputSchema: {
        issueIdOrKey: z.string(),
        content: z.string(),
      },
    },
    async (args) => {
      const comment = await api.addComment(args.issueIdOrKey, args.content);
      return {
        content: [{ type: "text", text: JSON.stringify(comment, null, 2) }],
      };
    }
  );

  server.registerTool(
    "update_comment",
    {
      description: "Update a comment",
      inputSchema: {
        issueIdOrKey: z.string(),
        commentId: z.number(),
        content: z.string(),
      },
    },
    async (args) => {
      const comment = await api.updateComment(
        args.issueIdOrKey,
        args.commentId,
        args.content
      );
      return {
        content: [{ type: "text", text: JSON.stringify(comment, null, 2) }],
      };
    }
  );

  server.registerTool(
    "delete_comment",
    {
      description: "Delete a comment",
      inputSchema: {
        issueIdOrKey: z.string(),
        commentId: z.number(),
      },
    },
    async (args) => {
      const result = await api.deleteComment(args.issueIdOrKey, args.commentId);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get_comment",
    {
      description: "Get a specific comment",
      inputSchema: {
        issueIdOrKey: z.string(),
        commentId: z.number(),
      },
    },
    async (args) => {
      const comment = await api.getComment(args.issueIdOrKey, args.commentId);
      return {
        content: [{ type: "text", text: JSON.stringify(comment, null, 2) }],
      };
    }
  );
}
