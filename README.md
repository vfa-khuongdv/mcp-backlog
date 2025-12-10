# Backlog MCP Server

A Model Context Protocol (MCP) server for interacting with Backlog (backlog.com / backlog.jp).

## Features

This server provides tools to:

- **Attachments**: List and get attachments.
- **Categories**: List and get categories.
- **Versions**: List and get versions.
  ...

## Installation

1.  **Clone and Install Dependencies**:

    ```bash
    npm install
    ```

2.  **Build the Project**:
    ```bash
    npm run build
    ```

## Configuration

You need a Backlog API Key. You can generate one in your Backlog Personal Settings > API.

## Usage with Claude Desktop

Add the following configuration to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "backlog": {
      "command": "node",
      "args": ["/Users/khuongdv/Desktop/projects/AI/mcp-backlog/dist/index.js"],
      "env": {
        "BACKLOG_HOST": "your-space-id.backlog.com",
        "BACKLOG_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Usage with Coplilot

Add the following configuration to your `.vscode/mcp.json`:

```json
{
  "servers": {
    "backlog": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/mcp-backlog/dist/index.js"],
      "env": {
        "BACKLOG_HOST": "your-space-id.backlog.com", // not include https://
        "BACKLOG_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Replace `/ABSOLUTE/PATH/TO/mcp-backlog` with the actual absolute path to this directory.
Replace `your-space-id.backlog.com` and `your_api_key_here` with your actual Backlog credentials.
