# Backlog MCP Server

A Model Context Protocol (MCP) server for interacting with Backlog (backlog.com / backlog.jp). This server enables AI agents to manage Backlog projects, issues, versions, wiki pages, and more through a standardized interface.

**Package**: [`@duongkhuong/mcp-backlog`](https://www.npmjs.com/package/@duongkhuong/mcp-backlog)

## Overview

This MCP server provides a comprehensive suite of tools to interact with Backlog's API, enabling seamless integration with AI agents like Claude. Perform project management tasks, create and update issues, manage versions, organize wiki documentation, and handle attachments all through a unified interface.

## Features

The server provides tools organized into the following categories:

### Issues Management
- Create, read, update, and delete issues
- Search issues by various criteria
- Manage issue metadata (priority, status, assignees)
- Add and manage watchers

### Comments & Discussions
- Add comments to issues
- Retrieve and manage issue comments
- Support for rich formatting

### Projects
- List and retrieve project information
- Get project details and metadata
- Manage project settings

### Versions & Releases
- Create and manage project versions
- Track version lifecycle
- List versions by project

### Wiki Documentation
- Create and update wiki pages
- Organize documentation
- Retrieve wiki page content

### Attachments
- Upload and manage file attachments
- Retrieve attachment details
- Download attachment URLs

### Categories & Metadata
- List project categories
- Manage issue types
- Retrieve project metadata

### Additional Tools
- Get user information
- Retrieve priorities and resolution statuses
- Access project configurations

## Installation

### Prerequisites

- Node.js 18+ or higher
- npm or yarn
- A Backlog account with API access

### From npm

Install the package globally or locally:

```bash
npm install @duongkhuong/mcp-backlog
```

### From Source

Clone the repository and install dependencies:

```bash
git clone https://github.com/vfa-khuongdv/mcp-backlog.git
cd mcp-backlog
npm install
npm run build
```

## Configuration

### Obtaining Credentials

1. **Backlog API Key**:
   - Log in to your Backlog account
   - Go to **Personal Settings > API**
   - Generate a new API key
   - Copy the API key

2. **Backlog Host**:
   - Your Backlog instance URL (e.g., `your-space-id.backlog.com` or `your-space-id.backlog.jp`)

### Environment Variables

The server requires the following environment variables:

```bash
BACKLOG_HOST=your-space-id.backlog.com
BACKLOG_API_KEY=your_api_key_here
```

## Usage

### Claude Desktop

Add the following configuration to your `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "backlog": {
      "command": "npx",
      "args": ["-y", "@duongkhuong/mcp-backlog"],
      "env": {
        "BACKLOG_HOST": "your-space-id.backlog.com",
        "BACKLOG_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### VS Code with Copilot

Add the following configuration to your `.vscode/mcp.json` file:

```json
{
  "servers": {
    "backlog": {
      "command": "npx",
      "args": ["-y", "@duongkhuong/mcp-backlog"],
      "env": {
        "BACKLOG_HOST": "your-space-id.backlog.com",
        "BACKLOG_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Local Development

To run the server locally during development:

```bash
npm run build
npm start
```

Or in watch mode:

```bash
npm run build -- --watch
```

## Available Tools

The server exposes the following tools (grouped by functionality):

### Issues
- `mcp_backlog_list_issues` - List all issues in a project
- `mcp_backlog_get_issue` - Get a specific issue
- `mcp_backlog_create_issue` - Create a new issue
- `mcp_backlog_update_issue` - Update an existing issue
- `mcp_backlog_delete_issue` - Delete an issue
- `mcp_backlog_search_issues` - Search issues with filters

### Comments
- `mcp_backlog_add_comment` - Add a comment to an issue
- `mcp_backlog_get_comment` - Get a specific comment
- `mcp_backlog_list_issue_comments` - List all comments on an issue
- `mcp_backlog_update_comment` - Update a comment
- `mcp_backlog_delete_comment` - Delete a comment

### Projects
- `mcp_backlog_list_projects` - List all projects
- `mcp_backlog_get_project` - Get project details
- `mcp_backlog_get_project_members` - Get project members

### Versions
- `mcp_backlog_list_versions` - List project versions
- `mcp_backlog_create_version` - Create a new version
- `mcp_backlog_update_version` - Update a version
- `mcp_backlog_delete_version` - Delete a version

### Wiki
- `mcp_backlog_list_wikis` - List wiki pages
- `mcp_backlog_get_wiki` - Get a specific wiki page
- `mcp_backlog_create_wiki` - Create a new wiki page
- `mcp_backlog_update_wiki` - Update a wiki page
- `mcp_backlog_delete_wiki` - Delete a wiki page

### Attachments
- `mcp_backlog_list_attachments` - List attachments for an issue
- `mcp_backlog_get_attachment` - Get attachment details
- `mcp_backlog_add_attachment` - Upload an attachment

### Categories & Metadata
- `mcp_backlog_list_categories` - List project categories
- `mcp_backlog_get_issue_types` - Get issue types
- `mcp_backlog_list_priorities` - List priority levels
- `mcp_backlog_list_resolutions` - List resolution statuses
- `mcp_backlog_get_myself` - Get current user information

## Project Structure

```
mcp-backlog/
├── src/
│   ├── index.ts              # Server entry point
│   ├── backlog-api.ts        # Backlog API wrapper
│   ├── config.ts             # Configuration validation
│   ├── constants/
│   │   └── regex.ts          # Regular expressions
│   └── tools/                # Tool implementations
│       ├── issues.ts         # Issue management tools
│       ├── comments.ts       # Comment management tools
│       ├── projects.ts       # Project tools
│       ├── versions.ts       # Version management tools
│       ├── wiki.ts           # Wiki page tools
│       ├── attachments.ts    # Attachment tools
│       ├── category.ts       # Category tools
│       └── metadata.ts       # Metadata tools
├── package.json
├── tsconfig.json
├── server.json               # MCP server definition
└── README.md
```

## Development

### Building

Compile TypeScript to JavaScript:

```bash
npm run build
```

### Running

Start the server:

```bash
npm start
```

### Testing

Run tests (when available):

```bash
npm test
```

## API Documentation

For detailed API documentation, visit:
- [Backlog API Documentation](https://developer.nulab.com/docs/backlog/)
- [Backlog API Reference](https://developer.nulab.com/docs/backlog/api/2/)

## Error Handling

The server provides comprehensive error handling with descriptive error messages. Common errors include:

- **Invalid API Key**: Verify your `BACKLOG_API_KEY` environment variable
- **Invalid Host**: Ensure `BACKLOG_HOST` is correct (e.g., `your-space-id.backlog.com`)
- **Network Errors**: Check your internet connection and firewall settings
- **Rate Limiting**: Backlog API has rate limits; implement appropriate delays

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request to the [GitHub repository](https://github.com/vfa-khuongdv/mcp-backlog).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, questions, or suggestions, please open an issue on [GitHub Issues](https://github.com/vfa-khuongdv/mcp-backlog/issues).

## Related Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Backlog Official Website](https://backlog.com/)
- [Claude Desktop Setup Guide](https://docs.anthropic.com/en/docs/build-a-system-with-claude/claude-for-developers)
- [VS Code Copilot Documentation](https://code.visualstudio.com/docs/copilot/overview)
