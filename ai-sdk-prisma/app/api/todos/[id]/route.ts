import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

/**
 * PATCH 请求处理函数
 * 更新待办事项（主要用于切换完成状态）
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { completed, title } = await req.json()
    // 兼容 Next.js 15+ 的异步 params 和旧版本的同步 params
    const resolvedParams = await Promise.resolve(params)
    const id = resolvedParams.id

    const updateData: { completed?: boolean; title?: string } = {}
    if (completed !== undefined) updateData.completed = completed
    if (title !== undefined) updateData.title = title

    const todo = await prisma.todo.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({ todo })
  } catch (error) {
    console.error('Error updating todo:', error)
    return NextResponse.json(
      { error: '更新待办事项失败' },
      { status: 500 }
    )
  }
}

/**
 * DELETE 请求处理函数
 * 删除待办事项
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // 兼容 Next.js 15+ 的异步 params 和旧版本的同步 params
    const resolvedParams = await Promise.resolve(params)
    const id = resolvedParams.id
    
    await prisma.todo.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting todo:', error)
    return NextResponse.json(
      { error: '删除待办事项失败' },
      { status: 500 }
    )
  }
}

