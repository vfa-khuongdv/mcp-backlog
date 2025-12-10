#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { BacklogApi } from "./backlog-api.js";
import { validateConfig } from "./config.js";
import { registerIssueTools } from "./tools/issues.js";
import { registerCommentTools } from "./tools/comments.js";
import { registerProjectTools } from "./tools/projects.js";
import { registerMetadataTools } from "./tools/metadata.js";
import { registerWikiTools } from "./tools/wiki.js";
import { registerAttachmentTools } from "./tools/attachments.js";
import { registerCategoryTools } from "./tools/category.js";
import { registerVersionTools } from "./tools/versions.js";

validateConfig();

const server = new McpServer({
  name: "backlog-mcp",
  version: "1.0.0",
});

const backlogApi = new BacklogApi();

// Register all tools
registerIssueTools(server, backlogApi);
registerCommentTools(server, backlogApi);
registerProjectTools(server, backlogApi);
registerMetadataTools(server, backlogApi);
registerWikiTools(server, backlogApi);
registerAttachmentTools(server, backlogApi);
registerCategoryTools(server, backlogApi);
registerVersionTools(server, backlogApi);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Backlog MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
