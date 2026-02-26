# MCP Server Setup Guide

Claude Scholar relies on MCP (Model Context Protocol) servers for extended capabilities. MCP servers are **not included** in this repository — users must install and configure them separately.

## Required MCP Servers

### 1. Zotero MCP (Research Workflow)

Used by: `literature-reviewer` agent, `/research-init`, `/zotero-review`, `/zotero-notes` commands

**Package**: [54yyyu/zotero-mcp](https://github.com/54yyyu/zotero-mcp) — full-featured with PDF management, full-text reading, semantic search, and citation export.

#### Prerequisites

1. Install [Zotero](https://www.zotero.org/) desktop app
2. **Enable Local API** (required):
   - Open Zotero → Edit → Settings (or Zotero → Settings on macOS)
   - Go to **Advanced** tab
   - Check **"Allow other applications on this computer to communicate with Zotero"**

#### Installation

```bash
# Install via uv (recommended)
uv tool install zotero-mcp-server
```

#### Configuration

claude code V2.1.5 

Add to your  `~/.claude.json` under `mcpServers`:

Claude code (earlier version)

Add to your `~/.claude/settings.json` under `mcpServers`:

```json
{
  "mcpServers": {
    "zotero": {
      "command": "zotero-mcp",
      "args": ["serve"],
      "env": {
        "ZOTERO_LOCAL": "true",
        "NO_PROXY": "localhost,127.0.0.1"
      }
    }
  }
}
```

**Note**: This configuration uses **local mode** — connects to Zotero desktop app directly. No API key required.

#### Available Tools

| Tool | Purpose |
|------|---------|
| `zotero_get_collections` | List all collections |
| `zotero_get_collection_items` | Get items in a collection |
| `zotero_search_items` | Search library by keyword |
| `zotero_search_by_tag` | Search by tag |
| `zotero_get_item_metadata` | Get item metadata and abstract |
| `zotero_get_item_fulltext` | Read PDF full text |
| `zotero_get_annotations` | Get PDF annotations |
| `zotero_get_notes` | Get notes |
| `zotero_semantic_search` | Semantic search (uses embeddings) |
| `zotero_advanced_search` | Advanced search |

### 2. Browser Automation MCP (Optional)

Used for: Chrome browser control, web page interaction.

This is optional and only needed if you want browser automation capabilities.

#### Configuration

```json
{
  "mcpServers": {
    "streamable-mcp-server": {
      "type": "streamable-http",
      "url": "http://127.0.0.1:12306/mcp"
    }
  }
}
```

## Verification

After configuration, restart Claude Code and verify MCP servers are connected:

```
# launch zotero-mcp server first
> zotero-mcp
> claude mcp list
# seen "zotero: zotero-mcp serve - ✓ Connected" is mean success

# In Claude Code, try calling a Zotero tool:
> List my Zotero collections
```

If the tool responds with your collections, the setup is complete.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Zotero tools return 502 error | Ensure Zotero desktop app is running and Local API is enabled |
| Tools not available | Check that `zotero-mcp` command is in your PATH |
| HTTP 502 from localhost | Add `NO_PROXY` environment variable (see config above) |
| SSL errors on macOS | Not needed for local mode |
| API rate limit (429) | Batch ≤10 papers at a time, add delays between batches |
