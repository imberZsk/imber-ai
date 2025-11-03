import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * GET 请求处理函数
 * 获取所有待办事项
 */
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ todos })
  } catch (error) {
    console.error('Error fetching todos:', error)
    return NextResponse.json({ todos: [] }, { status: 500 })
  }
}

/**
 * POST 请求处理函数
 * 创建新的待办事项
 */
export async function POST(req: Request) {
  try {
    const { title, userId } = await req.json()

    if (!title) {
      return NextResponse.json({ error: '标题不能为空' }, { status: 400 })
    }

    // 如果没有 userId，创建一个默认用户或使用第一个用户
    let finalUserId = userId
    if (!finalUserId) {
      // 尝试获取或创建默认用户
      let defaultUser = await prisma.user.findFirst()
      if (!defaultUser) {
        defaultUser = await prisma.user.create({
          data: {
            email: 'default@example.com',
            name: '默认用户'
          }
        })
      }
      finalUserId = defaultUser.id
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        userId: finalUserId
      }
    })

    return NextResponse.json({ todo }, { status: 201 })
  } catch (error) {
    console.error('Error creating todo:', error)
    return NextResponse.json({ error: '创建待办事项失败' }, { status: 500 })
  }
}
