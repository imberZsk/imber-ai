// AI SDK 工具定义（非 LangChain）
import { z } from 'zod'
import prisma from '@/lib/prisma'

// 注意：返回值需要是可序列化的 JSON

export const add_todo = {
  description: '添加待办事项',
  inputSchema: z.object({
    title: z.string().min(1, '标题不能为空')
  }),
  execute: async ({ title }: { title: string }) => {
    // 生产中请从身份获取 userId；这里做兜底示例
    let user = await prisma.user.findFirst()
    if (!user) {
      user = await prisma.user.create({
        data: { email: 'default@example.com', name: '默认用户' }
      })
    }
    const todo = await prisma.todo.create({
      data: { title, userId: user.id }
    })
    return { message: `已添加：${todo.title}`, id: todo.id }
  }
}

export const list_todos = {
  description:
    '列出待办事项。filter 参数用于筛选：不传或传 "all" 返回所有待办事项（包括已完成和未完成的）；传 "completed" 只返回已完成的；传 "incomplete" 只返回未完成的。当用户说"列出全部"、"列出所有"、"显示所有待办"时，必须传递 filter: "all" 或不传 filter 参数。',
  inputSchema: z.object({
    filter: z.enum(['all', 'completed', 'incomplete']).optional()
  }),
  execute: async ({
    filter
  }: {
    filter?: 'all' | 'completed' | 'incomplete'
  }) => {
    // 如果没有提供 filter 参数或 filter 为 'all'，查询所有 todos
    // 如果 filter 为 'completed'，只查询已完成的
    // 如果 filter 为 'incomplete'，只查询未完成的
    const where =
      filter === undefined || filter === 'all'
        ? {}
        : filter === 'completed'
        ? { completed: true }
        : { completed: false }
    const todos = await prisma.todo.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
    return todos.map((t) => ({
      id: t.id,
      title: t.title,
      completed: t.completed
    }))
  }
}

export const toggle_todo = {
  description: '切换待办事项完成状态',
  inputSchema: z.object({
    id: z.string().min(1, 'id 必填')
  }),
  execute: async ({ id }: { id: string }) => {
    const todo = await prisma.todo.findUnique({ where: { id } })
    if (!todo) return { message: '未找到该待办', id }
    const updated = await prisma.todo.update({
      where: { id },
      data: { completed: !todo.completed }
    })
    return {
      message: updated.completed ? '已完成' : '已取消完成',
      id: updated.id,
      completed: updated.completed
    }
  }
}

export const delete_todo = {
  description: '删除待办事项',
  inputSchema: z.object({
    id: z.string().min(1, 'id 必填')
  }),
  execute: async ({ id }: { id: string }) => {
    await prisma.todo.delete({ where: { id } })
    return { message: '已删除', id }
  }
}

export type TodoTools = {
  add_todo: typeof add_todo
  list_todos: typeof list_todos
  toggle_todo: typeof toggle_todo
  delete_todo: typeof delete_todo
}
