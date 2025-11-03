'use client'

import { useState, useEffect } from 'react'

interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

/**
 * 待办事项页面组件
 * 支持展示 todos 列表、添加新 todo、切换完成状态、删除 todo
 */
export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)

  // 加载待办事项列表
  const fetchTodos = async () => {
    try {
      const res = await fetch('/api/todos')
      const data = await res.json()
      setTodos(data.todos || [])
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      setLoading(false)
    }
  }

  // 组件挂载时加载数据
  useEffect(() => {
    fetchTodos()
  }, [])

  // 添加新的待办事项
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setAdding(true)
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input.trim() })
      })

      if (res.ok) {
        const data = await res.json()
        setTodos([data.todo, ...todos])
        setInput('')
      } else {
        const error = await res.json()
        alert(error.error || '添加失败')
      }
    } catch (error) {
      console.error('Error adding todo:', error)
      alert('添加失败，请重试')
    } finally {
      setAdding(false)
    }
  }

  // 切换完成状态
  const handleToggleComplete = async (
    id: string,
    currentCompleted: boolean
  ) => {
    // 乐观更新：立即更新 UI，不等待服务器响应
    const newCompleted = !currentCompleted
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: newCompleted } : todo
      )
    )

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: newCompleted })
      })

      if (res.ok) {
        const data = await res.json()
        // 使用服务器返回的数据更新状态，确保数据同步
        setTodos(todos.map((todo) => (todo.id === id ? data.todo : todo)))
      } else {
        // 如果请求失败，恢复之前的状态
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: currentCompleted } : todo
          )
        )
        const error = await res.json()
        alert(error.error || '更新失败，请重试')
      }
    } catch (error) {
      // 如果请求失败，恢复之前的状态
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: currentCompleted } : todo
        )
      )
      console.error('Error updating todo:', error)
      alert('更新失败，请重试')
    }
  }

  // 删除待办事项
  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个待办事项吗？')) return

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        setTodos(todos.filter((todo) => todo.id !== id))
      } else {
        alert('删除失败')
      }
    } catch (error) {
      console.error('Error deleting todo:', error)
      alert('删除失败，请重试')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">加载中...</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* 页面标题 */}
      <h1 className="text-3xl font-bold mb-6 text-center">待办事项</h1>

      {/* 添加待办事项表单 */}
      <form onSubmit={handleAddTodo} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入新的待办事项..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            disabled={adding}
          />
          <button
            type="submit"
            disabled={adding || !input.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {adding ? '添加中...' : '添加'}
          </button>
        </div>
      </form>

      {/* 待办事项列表 */}
      {todos.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg">暂无待办事项</p>
          <p className="text-sm mt-2">添加你的第一个待办事项吧！</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              {/* 完成状态复选框 */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id, todo.completed)}
                className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />

              {/* 待办事项内容 */}
              <span
                className={`flex-1 ${
                  todo.completed
                    ? 'line-through text-gray-500 dark:text-gray-400'
                    : 'text-gray-900 dark:text-gray-100'
                }`}
              >
                {todo.title}
              </span>

              {/* 删除按钮 */}
              <button
                onClick={() => handleDelete(todo.id)}
                className="px-3 py-1 text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                title="删除"
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 统计信息 */}
      {todos.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            共 {todos.length} 项待办，已完成{' '}
            {todos.filter((t) => t.completed).length} 项
          </p>
        </div>
      )}
    </div>
  )
}
