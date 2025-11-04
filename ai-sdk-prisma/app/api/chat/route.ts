import { createOpenAI } from '@ai-sdk/openai'
import { UIMessage, convertToModelMessages, streamText } from 'ai'
import { saveChat } from '@/lib/save-chat'
import { add_todo, list_todos, toggle_todo, delete_todo } from './todos-ai-sdk'

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

  let baseURL = process.env.OPENAI_BASE_URL
  const apiKey = process.env.OPENAI_API_KEY

  // 验证环境变量是否存在
  if (!baseURL || !apiKey) {
    throw new Error('OPENAI_BASE_URL 和 OPENAI_API_KEY 必须配置')
  }

  // 确保 baseURL 包含 /v1 后缀（对于兼容的 OpenAI API）
  // 如果 baseURL 不包含 /v1，自动添加
  if (baseURL && !baseURL.endsWith('/v1')) {
    baseURL = baseURL.endsWith('/') ? `${baseURL}v1` : `${baseURL}/v1`
  }

  // 创建自定义 OpenAI 客户端
  // 确保 baseURL 包含 /v1，这样会使用正确的路径 /v1/chat/completions
  const openai = createOpenAI({
    baseURL,
    apiKey
  })

  // 将 UI 消息转换为 AI 模型预期的格式，并创建流式文本响应
  const result = streamText({
    model: openai('gpt-5'),
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
