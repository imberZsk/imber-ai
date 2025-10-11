import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
const api = 'https://imber.netlify.app/api/author'
// 创建 server
const server = new McpServer({
  name: 'author',
  version: '1.0.0',
  capabilities: {
    resources: {},
    tools: {}
  }
})
server.tool('get-author', 'Get imber blog author information', async () => {
  const response = await fetch(`${api}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(data.data, null, 2)
      }
    ]
  }
})
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Author MCP Server running on stdio')
}
main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
