// tools/todos.ts
import { z } from 'zod'
import { tool } from 'langchain'
import prisma from '@/lib/prisma'

export const addTodo = tool(
  async ({ title }) => {
    const todo = await prisma.todo.create({
      data: { title, userId: '22a7645d-efde-4115-8b56-9d6e04ea5052' }
    })
    return { content: `已添加：${todo.title}`, artifact: todo }
  },
  {
    name: 'add_todo',
    description: '添加待办事项',
    schema: z.object({ title: z.string().min(1) }),
    responseFormat: 'content_and_artifact'
  }
)

export const listTodos = tool(
  async ({ completed }) => {
    const todos = await prisma.todo.findMany({ where: { completed } })
    return { content: `共 ${todos.length} 项`, artifact: todos }
  },
  {
    name: 'list_wtodos',
    description: '列出待办事项',
    schema: z.object({ completed: z.boolean().optional() }),
    responseFormat: 'content_and_artifact'
  }
)

export const toggleTodo = tool(
  async ({ id }) => {
    const todo = await prisma.todo.findUnique({ where: { id } })
    if (!todo) return { content: '未找到该待办', artifact: null }
    const updated = await prisma.todo.update({
      where: { id },
      data: { completed: !todo.completed }
    })
    return {
      content: `已${updated.completed ? '完成' : '取消完成'}：${updated.title}`,
      artifact: updated
    }
  },
  {
    name: 'toggle_todo',
    description: '切换完成状态',
    schema: z.object({ id: z.string().min(1) }),
    responseFormat: 'content_and_artifact'
  }
)

export const deleteTodo = tool(
  async ({ id }) => {
    await prisma.todo.delete({ where: { id } })
    return { content: '已删除', artifact: { id } }
  },
  {
    name: 'delete_todo',
    description: '删除待办事项',
    schema: z.object({ id: z.string().min(1) }),
    responseFormat: 'content_and_artifact'
  }
)
