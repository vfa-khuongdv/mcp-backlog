import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BacklogApi } from "../backlog-api.js";

export function registerAttachmentTools(server: McpServer, api: BacklogApi) {
  server.registerTool(
    "list_issue_attachments",
    {
      description: "List attachments for an issue",
      inputSchema: {
        issueIdOrKey: z.string(),
      },
    },
    async (args) => {
      const attachments = await api.listIssueAttachments(args.issueIdOrKey);
      return {
        content: [{ type: "text", text: JSON.stringify(attachments, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get_attachment_url",
    {
      description: "Get download URL/Details for an attachment",
      inputSchema: {
        issueIdOrKey: z.string(),
        attachmentId: z.number(),
      },
    },
    async (args) => {
      const result = await api.getAttachment(
        args.issueIdOrKey,
        args.attachmentId
      );
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}
