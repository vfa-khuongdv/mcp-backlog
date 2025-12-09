import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BacklogApi } from "../backlog-api.js";

export function registerIssueTools(server: McpServer, api: BacklogApi) {
  server.registerTool(
    "create_issue",
    {
      description: "Create a new issue/ticket",
      inputSchema: {
        projectId: z.number(),
        summary: z.string(),
        issueTypeId: z.number(),
        priorityId: z.number(),
        description: z.string().optional(),
        assigneeId: z.number().optional(),
      },
    },
    async (args) => {
      const issue = await api.createIssue(args);
      return {
        content: [{ type: "text", text: JSON.stringify(issue, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get_issue",
    {
      description: "Get issue details",
      inputSchema: {
        issueIdOrKey: z.string(),
      },
    },
    async (args) => {
      const issue = await api.getIssue(args.issueIdOrKey);
      return {
        content: [{ type: "text", text: JSON.stringify(issue, null, 2) }],
      };
    }
  );

  server.registerTool(
    "update_issue",
    {
      description: "Update an existing issue",
      inputSchema: {
        issueIdOrKey: z.string(),
        summary: z.string().optional(),
        description: z.string().optional(),
        statusId: z.number().optional(),
        priorityId: z.number().optional(),
        assigneeId: z.number().optional(),
        comment: z.string().optional(),
      },
    },
    async (args) => {
      const { issueIdOrKey, ...params } = args;
      const issue = await api.updateIssue(issueIdOrKey, params);
      return {
        content: [{ type: "text", text: JSON.stringify(issue, null, 2) }],
      };
    }
  );

  server.registerTool(
    "delete_issue",
    {
      description: "Delete an issue",
      inputSchema: {
        issueIdOrKey: z.string(),
      },
    },
    async (args) => {
      const issue = await api.deleteIssue(args.issueIdOrKey);
      return {
        content: [{ type: "text", text: JSON.stringify(issue, null, 2) }],
      };
    }
  );

  server.registerTool(
    "search_issues",
    {
      description: "Search issues by keyword",
      inputSchema: {
        keyword: z.string(),
      },
    },
    async (args) => {
      const issues = await api.listIssues({ keyword: args.keyword });
      return {
        content: [{ type: "text", text: JSON.stringify(issues, null, 2) }],
      };
    }
  );

  server.registerTool(
    "list_issues",
    {
      description: "List issues with filters",
      inputSchema: {
        projectId: z.array(z.number()).optional(),
        statusId: z.array(z.number()).optional(),
        assigneeId: z.array(z.number()).optional(),
        priorityId: z.array(z.number()).optional(),
      },
    },
    async (args) => {
      const issues = await api.listIssues(args);
      return {
        content: [{ type: "text", text: JSON.stringify(issues, null, 2) }],
      };
    }
  );

  server.registerTool(
    "count_issues",
    {
      description: "Count issues with filters",
      inputSchema: {
        projectId: z.array(z.number()).optional(),
        statusId: z.array(z.number()).optional(),
        assigneeId: z.array(z.number()).optional(),
        priorityId: z.array(z.number()).optional(),
      },
    },
    async (args) => {
      const count = await api.countIssues(args);
      return {
        content: [{ type: "text", text: JSON.stringify(count, null, 2) }],
      };
    }
  );
}
