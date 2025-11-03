import prisma from './prisma'
import { UIMessage } from 'ai'

/**
 * 保存聊天消息到数据库
 *
 * @param messages - 要保存的 UI 消息数组
 * @param id - 会话 ID，用于标识或创建会话
 *
 * @description
 * 此函数执行以下操作：
 * 1. 使用给定 ID 更新插入（upsert）会话，如果不存在则创建
 * 2. 仅保存最后两条消息（用户和助手的最后一条消息），以避免重叠的消息
 * 3. 将消息内容序列化为 JSON 并保存到数据库
 */
export async function saveChat(messages: UIMessage[], id: string) {
  // 使用 upsert 操作：如果会话存在则更新，不存在则创建
  // upsert 确保会话总是存在，避免后续操作失败
  const session = await prisma.session.upsert({
    where: { id },
    // 如果会话已存在，不进行任何更新（保留现有数据）
    update: {},
    // 如果会话不存在，创建新会话
    create: { id }
  })

  // 验证会话是否创建成功，如果失败则抛出错误
  if (!session) throw new Error('Session not found')

  // 仅保存最后两条消息（用户和AI助手的最后一条消息）
  // 这样做的目的是避免保存重叠的消息，只保留最新的对话
  const lastTwoMessages = messages.slice(-2)

  // 遍历最后两条消息并保存到数据库
  for (const msg of lastTwoMessages) {
    // 默认将所有消息部分序列化为 JSON
    let content = JSON.stringify(msg.parts)

    // 如果是AI助手消息，只保存文本部分，过滤掉其他类型的部分（如图片、文件等）
    if (msg.role === 'assistant') {
      const textParts = msg.parts.filter((part) => part.type === 'text')
      content = JSON.stringify(textParts)
    }

    // 将消息保存到数据库，关联到对应的会话
    await prisma.message.create({
      data: {
        role: msg.role === 'user' ? 'USER' : 'ASSISTANT',
        content: content,
        sessionId: session.id
      }
    })
  }
}
