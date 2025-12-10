import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BacklogApi } from "../backlog-api.js";
import { REGEX_YYYYMMDD } from "../constants/regex.js";

export function registerIssueTools(server: McpServer, api: BacklogApi) {
  server.registerTool(
    "create_issue",
    {
      description: "Create a new issue/ticket",
      inputSchema: {
        projectId: z.number(),
        summary: z.string(),
        parentIssueId: z.number().optional(),
        description: z.string().optional(),
        startDate: z.string().regex(REGEX_YYYYMMDD).optional(),
        dueDate: z.string().regex(REGEX_YYYYMMDD).optional(),
        estimatedHours: z.number().optional(),
        actualHours: z.number().optional(),
        issueTypeId: z.number(),
        categoryId: z.array(z.number()).optional(),
        versionId: z.array(z.number()).optional(),
        milestoneId: z.array(z.number()).optional(),
        priorityId: z.number(),
        assigneeId: z.number().optional(),
        notifiedUserId: z.array(z.number()).optional(),
        attachmentId: z.array(z.number()).optional(),
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
        parentIssueId: z.number().optional(),
        description: z.string().optional(),
        statusId: z.number().optional(),
        resolutionId: z.number().optional(),
        startDate: z.string().optional(),
        dueDate: z.string().optional(),
        estimatedHours: z.number().optional(),
        actualHours: z.number().optional(),
        issueTypeId: z.number().optional(),
        categoryId: z.array(z.number()).optional(),
        versionId: z.array(z.number()).optional(),
        milestoneId: z.array(z.number()).optional(),
        priorityId: z.number().optional(),
        assigneeId: z.number().optional(),
        notifiedUserId: z.array(z.number()).optional(),
        attachmentId: z.array(z.number()).optional(),
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
        issueTypeId: z.array(z.number()).optional(),
        categoryId: z.array(z.number()).optional(),
        versionId: z.array(z.number()).optional(),
        milestoneId: z.array(z.number()).optional(),
        statusId: z.array(z.number()).optional(),
        priorityId: z.array(z.number()).optional(),
        assigneeId: z.array(z.number()).optional(),
        createdUserId: z.array(z.number()).optional(),
        resolutionId: z.array(z.number()).optional(),
        parentChild: z
          .union([
            z.literal(0),
            z.literal(1),
            z.literal(2),
            z.literal(3),
            z.literal(4),
          ])
          .optional(),
        sort: z.string().optional(),
        order: z.string().optional(),
        offset: z.number().optional(),
        count: z.number().optional(),
        createdSince: z.string().regex(REGEX_YYYYMMDD).optional(),
        createdUntil: z.string().regex(REGEX_YYYYMMDD).optional(),
        updatedSince: z.string().regex(REGEX_YYYYMMDD).optional(),
        updatedUntil: z.string().regex(REGEX_YYYYMMDD).optional(),
        startDateSince: z.string().regex(REGEX_YYYYMMDD).optional(),
        startDateUntil: z.string().regex(REGEX_YYYYMMDD).optional(),
        dueDateSince: z.string().regex(REGEX_YYYYMMDD).optional(),
        dueDateUntil: z.string().regex(REGEX_YYYYMMDD).optional(),
        hasDueDate: z.boolean().optional(),
        id: z.array(z.number()).optional(),
        parentIssueId: z.array(z.number()).optional(),
        keyword: z.string().optional(),
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
        issueTypeId: z.array(z.number()).optional(),
        categoryId: z.array(z.number()).optional(),
        versionId: z.array(z.number()).optional(),
        milestoneId: z.array(z.number()).optional(),
        statusId: z.array(z.number()).optional(),
        priorityId: z.array(z.number()).optional(),
        assigneeId: z.array(z.number()).optional(),
        createdUserId: z.array(z.number()).optional(),
        resolutionId: z.array(z.number()).optional(),
        parentChild: z
          .union([
            z.literal(0),
            z.literal(1),
            z.literal(2),
            z.literal(3),
            z.literal(4),
          ])
          .optional(),
        attachment: z.boolean().optional(),
        sharedFile: z.boolean().optional(),
        sort: z
          .enum([
            "issueType",
            "category",
            "version",
            "milestone",
            "summary",
            "status",
            "priority",
            "attachment",
            "sharedFile",
            "created",
            "createdUser",
            "updated",
            "updatedUser",
            "assignee",
            "startDate",
            "dueDate",
            "estimatedHours",
            "actualHours",
            "childIssue",
          ])
          .optional(),
        order: z.enum(["asc", "desc"]).optional(),
        offset: z.number().optional(),
        count: z.number().optional(),
        createdSince: z.string().regex(REGEX_YYYYMMDD).optional(),
        createdUntil: z.string().regex(REGEX_YYYYMMDD).optional(),
        updatedSince: z.string().regex(REGEX_YYYYMMDD).optional(),
        updatedUntil: z.string().regex(REGEX_YYYYMMDD).optional(),
        startDateSince: z.string().regex(REGEX_YYYYMMDD).optional(),
        startDateUntil: z.string().regex(REGEX_YYYYMMDD).optional(),
        dueDateSince: z.string().regex(REGEX_YYYYMMDD).optional(),
        dueDateUntil: z.string().regex(REGEX_YYYYMMDD).optional(),
        hasDueDate: z.boolean().optional(),
        id: z.array(z.number()).optional(),
        parentIssueId: z.array(z.number()).optional(),
        keyword: z.string().optional(),
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
