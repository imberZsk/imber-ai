import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET 请求处理函数
 * 获取所有聊天消息并按创建时间升序排列
 *
 * @returns {Promise<NextResponse>} 包含消息数组的 JSON 响应
 *
 * @description
 * 此 API 路由执行以下操作：
 * 1. 从数据库查询所有消息，按创建时间升序排列
 * 2. 将数据库格式的消息转换为 UI 需要的格式
 * 3. 解析存储的 JSON 内容为消息部分（parts）
 * 4. 将角色名称转换为小写（如 "USER" -> "user"）
 */
export async function GET() {
  try {
    // 从数据库查询所有消息，按创建时间升序排列
    // 这样可以保证消息按照对话顺序返回
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'asc' }
    })

    // 将数据库消息格式转换为 UI 消息格式
    // UI 需要特定的数据结构（id, role, parts）
    const uiMessages = messages.map((msg) => ({
      id: msg.id, // 消息 ID
      role: msg.role.toLowerCase(), // 角色转为小写（USER -> user, ASSISTANT -> assistant）
      parts: JSON.parse(msg.content) // 解析存储的 JSON 内容为消息部分数组
    }))

    // 返回格式化后的消息数组
    return NextResponse.json({ messages: uiMessages })
  } catch (error) {
    // 如果查询或处理过程中发生错误，记录错误日志
    // 并返回空数组，避免前端崩溃
    console.error('Error fetching messages:', error)
    return NextResponse.json({ messages: [] })
  }
}
