# MCP 服务配置指南

Claude Scholar 依赖 MCP（Model Context Protocol）服务器提供扩展能力。MCP 服务器**不包含**在本仓库中，用户需自行安装和配置。

## 所需 MCP 服务

### 1. Zotero MCP（研究工作流）

使用场景：`literature-reviewer` agent、`/research-init`、`/zotero-review`、`/zotero-notes` 命令

**安装包**：[54yyyu/zotero-mcp](https://github.com/54yyyu/zotero-mcp) — 功能完整，支持 PDF 管理、全文阅读、语义搜索、引用导出。

#### 前置条件

1. 安装 [Zotero](https://www.zotero.org/) 桌面客户端
2. **启用本地 API**（必需）：
   - 打开 Zotero → 编辑 → 设置（macOS 上为 Zotero → 设置）
   - 转到**高级**选项卡
   - 勾选**"允许其他应用程序与 Zotero 通信"**

#### 安装

```bash
# 通过 uv 安装（推荐）
uv tool install zotero-mcp-server
```

#### 配置

在 `~/.claude/settings.json` 的 `mcpServers` 中添加：

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

**注意**：此配置使用**本地模式**——直接连接 Zotero 桌面客户端，无需 API key。

#### 可用工具

| 工具 | 功能 |
|------|------|
| `zotero_get_collections` | 列出所有集合 |
| `zotero_get_collection_items` | 获取集合中的条目 |
| `zotero_search_items` | 按关键词搜索库 |
| `zotero_search_by_tag` | 按标签搜索 |
| `zotero_get_item_metadata` | 获取条目元数据和摘要 |
| `zotero_get_item_fulltext` | 读取 PDF 全文 |
| `zotero_get_annotations` | 获取 PDF 标注 |
| `zotero_get_notes` | 获取笔记 |
| `zotero_semantic_search` | 语义搜索（使用嵌入向量） |
| `zotero_advanced_search` | 高级搜索 |

### 2. 浏览器自动化 MCP（可选）

用途：Chrome 浏览器控制、网页交互。

此项为可选配置，仅在需要浏览器自动化时安装。

#### 配置

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

## 验证

配置完成后，重启 Claude Code 并验证 MCP 服务是否连接：

```
# 在 Claude Code 中尝试调用 Zotero 工具：
> 列出我的 Zotero 集合
```

如果工具返回了你的集合列表，说明配置成功。

## 常见问题

| 问题 | 解决方案 |
|------|---------|
| Zotero 工具返回 502 错误 | 确保 Zotero 桌面客户端正在运行且本地 API 已启用 |
| 工具不可用 | 检查 `zotero-mcp` 命令是否在 PATH 中 |
| localhost 返回 HTTP 502 | 添加 `NO_PROXY` 环境变量（见上方配置） |
| macOS SSL 错误 | 本地模式不需要 |
| API 速率限制 (429) | 每批 ≤10 篇论文，批次间添加延迟 |
