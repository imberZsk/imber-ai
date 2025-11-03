import { createOpenAI } from '@ai-sdk/openai'
import { UIMessage, convertToModelMessages, streamText } from 'ai'
import { saveChat } from '@/lib/save-chat'
import { add_todo, list_todos, toggle_todo, delete_todo } from './todos-ai-sdk'
import { ollama } from 'ollama-ai-provider-v2'
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

  // 创建自定义 OpenAI 客户端
  // 注意：根据您的 API 文档配置正确的 baseURL 格式
  //
  // 常见格式：
  // - OpenAI 标准：https://api.openai.com/v1
  // - 兼容 API（需要 /v1）：https://api.302.ai/v1
  // - 自定义格式：https://api.302.ai（根据 API 文档配置）
  const baseURL = process.env.OPENAI_BASE_URL
  const apiKey = process.env.OPENAI_API_KEY

  // 验证环境变量是否存在
  // if (!baseURL || !apiKey) {
  //   throw new Error('OPENAI_BASE_URL 和 OPENAI_API_KEY 必须配置')
  // }

  const openai = createOpenAI({
    baseURL,
    apiKey
  })

  const ollama = createOllama({
    // optional settings, e.g.
    baseURL: 'http://localhost:11434/api'
  })

  // 将 UI 消息转换为 AI 模型预期的格式，并创建流式文本响应
  const result = streamText({
    // model: openai('gpt-5'),
    model: ollama('deepseek-r1:1.5b'),
    messages: convertToModelMessages(messages),
    temperature: 0.2,
    system:
      `你是一个待办助手。` +
      `当用户提出需求时，用中文简洁回复；` +
      `需要增删改查时请触发工具。` +
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
