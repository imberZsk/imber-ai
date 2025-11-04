import { UIMessage, convertToModelMessages, streamText } from 'ai'
import { saveChat } from '@/lib/save-chat'
import { add_todo, list_todos, toggle_todo, delete_todo } from './todos-ai-sdk'
import { createOllama } from 'ollama-ai-provider-v2'

/// 最大执行时间（秒），用于服务器less函数超时设置
export const maxDuration = 300

/**
 * POST 请求处理函数
 * 处理聊天 API 请求，从请求正文中提取对话历史记录，
 * 将 UI 消息转换为 AI 模型预期的格式，并将 AI 响应实时流式传输回客户端
 */
export async function POST(req: Request) {
  // 从请求正文中提取对话历史记录
  const { messages, id }: { messages: UIMessage[]; id: string } =
    await req.json()

  // 创建 Ollama 客户端
  const ollama = createOllama({
    // optional settings, e.g.
    baseURL: 'http://localhost:11434/api'
  })

  // 将 UI 消息转换为 AI 模型预期的格式，并创建流式文本响应
  const result = streamText({
    model: ollama('gpt-oss:20b'),
    messages: convertToModelMessages(messages),
    temperature: 0.2,
    system:
      `你是一个待办助手。` +
      `当用户提出需求时，用中文简洁回复；` +
      `需要增删改查时请触发工具。` +
      `使用 list_todos 工具时：如果用户说"列出全部"、"列出所有"、"显示所有待办"等，必须传递 filter: "all" 或不传 filter 参数；只有当用户明确说"只列出已完成的"时才传 filter: "completed"；只有当用户明确说"只列出未完成的"时才传 filter: "incomplete"。` +
      `若无法执行，请给出明确的错误原因与下一步建议。`,
    tools: {
      add_todo,
      list_todos,
      toggle_todo,
      delete_todo
    }
  })

  // 将 AI 响应实时流式传输回客户端
  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    onFinish: async ({ messages }) => {
      await saveChat(messages, id)
    }
  })
}
