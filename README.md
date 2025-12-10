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

## Usage with Coplilot

Add the following configuration to your `.vscode/mcp.json`:

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
