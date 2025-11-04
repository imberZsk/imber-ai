'use client'

import { useChat } from '@ai-sdk/react'
import { useState, useEffect } from 'react'

/**
 * 聊天界面组件
 * 提供用户与 AI 的交互界面，支持发送消息和显示对话历史
 */
export default function Chat() {
  // 输入框的状态，存储用户正在输入的内容
  const [input, setInput] = useState('')
  // 加载状态，用于控制是否显示加载提示
  const [isLoading, setIsLoading] = useState(true)

  // 使用 AI SDK 的 useChat hook 获取聊天相关功能
  // messages: 当前对话的所有消息
  // sendMessage: 发送消息的函数
  // setMessages: 设置消息列表的函数
  // status: 聊天状态 ('idle' | 'streaming' | 'error')
  const { messages, sendMessage, setMessages, status } = useChat()

  // 过滤掉 id='0' 的临时消息（思考过程、工具调用等内部事件）
  // 这些消息不应该显示在 UI 中
  const visibleMessages = messages.filter((msg) => String(msg.id) !== '0')

  // 判断是否应该显示 loading：
  // 1. status 为 'submitted' 或 'streaming'（表示正在处理请求）
  // 2. 或者最后一条可见消息是用户消息且还没有对应的助手回复
  const lastVisibleMessage =
    visibleMessages.length > 0
      ? visibleMessages[visibleMessages.length - 1]
      : null
  const isAIThinking =
    status === 'submitted' ||
    status === 'streaming' ||
    (lastVisibleMessage?.role === 'user' &&
      status !== 'ready' &&
      status !== 'error')

  // 组件挂载时加载历史消息
  useEffect(() => {
    // 从 API 获取保存的聊天消息
    fetch('/api/messages')
      .then((res) => res.json())
      .then((data) => {
        // 如果 API 返回了消息且不为空，则设置到消息列表
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages)
        }
        // 无论是否有消息，都关闭加载状态
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false)) // 如果请求失败，也关闭加载状态
  }, [setMessages]) // 依赖 setMessages，确保只在组件挂载时执行一次

  // Todo 类型定义
  interface Todo {
    id: string
    title: string
    completed: boolean
  }

  // 检查数据是否是 todo 对象
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isTodo = (data: any): data is Todo => {
    return (
      typeof data === 'object' &&
      data !== null &&
      'id' in data &&
      'title' in data &&
      'completed' in data &&
      typeof data.id === 'string' &&
      typeof data.title === 'string' &&
      typeof data.completed === 'boolean'
    )
  }

  // 检查数据是否是 todo 数组
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isTodoArray = (data: any): data is Todo[] => {
    return (
      Array.isArray(data) &&
      (data.length === 0 ||
        data.every(
          (item) =>
            typeof item === 'object' &&
            item !== null &&
            'id' in item &&
            'title' in item &&
            'completed' in item &&
            typeof item.id === 'string' &&
            typeof item.title === 'string' &&
            typeof item.completed === 'boolean'
        ))
    )
  }

  // 如果正在加载，显示加载提示
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {/* 遍历并渲染所有消息（过滤掉 id=0 的临时消息） */}
      {visibleMessages.map((message) => (
        <div
          key={message.id}
          // 根据消息角色（用户或助手）决定消息气泡的对齐方式
          // 用户消息靠右显示，AI 消息靠左显示
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          } mb-4`}
        >
          <div
            // 消息气泡容器样式
            // 用户消息：深色背景 + 白色文字
            // AI 消息：浅色背景（支持深色模式）
            className={`max-w-[80%] rounded-lg px-4 py-3 ${
              message.role === 'user'
                ? 'bg-neutral-600 text-white'
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
            }`}
          >
            <div className="whitespace-pre-wrap">
              {/* 显示消息发送者标签 */}
              <p className="text-xs font-extralight mb-1 opacity-70">
                {message.role === 'user' ? 'YOU ' : 'AI '}
              </p>
              {/* 遍历消息的所有部分并渲染 */}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    // 渲染文本部分
                    return <div key={`${message.id}-${i}`}>{part.text}</div>
                  default:
                    // 处理工具调用相关的部分
                    // 检查是否是工具调用（tool-call）
                    if (
                      typeof part.type === 'string' &&
                      part.type.startsWith('tool-') &&
                      'toolCallId' in part
                    ) {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const toolPart = part as any
                      // 检查是否有 output（工具输出）
                      if (
                        'output' in toolPart &&
                        toolPart.output !== undefined
                      ) {
                        // 如果是 todo 数组，渲染为列表
                        if (isTodoArray(toolPart.output)) {
                          return (
                            <div
                              key={`${message.id}-${i}`}
                              className="mt-2 w-full"
                            >
                              <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                📊 待办事项列表:
                              </p>
                              {toolPart.output.length === 0 ? (
                                <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                                  暂无待办事项
                                </div>
                              ) : (
                                <ul className="space-y-2">
                                  {toolPart.output.map((todo: Todo) => (
                                    <li
                                      key={todo.id}
                                      className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                                    >
                                      {/* 完成状态复选框 */}
                                      <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        readOnly
                                        className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-default"
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
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )
                        }
                        // 如果是单个 todo 对象，渲染为单个列表项
                        if (isTodo(toolPart.output)) {
                          return (
                            <div
                              key={`${message.id}-${i}`}
                              className="mt-2 w-full"
                            >
                              <ul className="space-y-2">
                                <li className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                                  {/* 完成状态复选框 */}
                                  <input
                                    type="checkbox"
                                    checked={toolPart.output.completed}
                                    readOnly
                                    className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-default"
                                  />
                                  {/* 待办事项内容 */}
                                  <span
                                    className={`flex-1 ${
                                      toolPart.output.completed
                                        ? 'line-through text-gray-500 dark:text-gray-400'
                                        : 'text-gray-900 dark:text-gray-100'
                                    }`}
                                  >
                                    {toolPart.output.title}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )
                        }
                        // 如果是消息类输出（如 add_todo 返回的 { message, id }），显示友好文本
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const output = toolPart.output as any
                        if (
                          output &&
                          typeof output === 'object' &&
                          'message' in output &&
                          typeof output.message === 'string'
                        ) {
                          return (
                            <div
                              key={`${message.id}-${i}`}
                              className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm text-gray-900 dark:text-gray-100"
                            >
                              ✅ {output.message}
                            </div>
                          )
                        }
                        // 其他情况显示 JSON
                        return (
                          <div
                            key={`${message.id}-${i}`}
                            className="mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                          >
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                              📊 工具输出:
                            </span>
                            <pre className="mt-2 text-xs text-gray-700 dark:text-gray-300 opacity-90 overflow-x-auto bg-gray-50 dark:bg-gray-900/50 p-2 rounded">
                              {JSON.stringify(toolPart.output, null, 2)}
                            </pre>
                          </div>
                        )
                      }
                      // 检查是否有 result（工具结果）
                      if (
                        'result' in toolPart &&
                        toolPart.result !== undefined
                      ) {
                        // 如果是 todo 数组，渲染为列表
                        if (isTodoArray(toolPart.result)) {
                          return (
                            <div
                              key={`${message.id}-${i}`}
                              className="mt-2 w-full"
                            >
                              <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                ✅ 待办事项列表:
                              </p>
                              {toolPart.result.length === 0 ? (
                                <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                                  暂无待办事项
                                </div>
                              ) : (
                                <ul className="space-y-2">
                                  {toolPart.result.map((todo: Todo) => (
                                    <li
                                      key={todo.id}
                                      className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                                    >
                                      {/* 完成状态复选框 */}
                                      <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        readOnly
                                        className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-default"
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
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )
                        }
                        // 如果是单个 todo 对象，渲染为单个列表项
                        if (isTodo(toolPart.result)) {
                          return (
                            <div
                              key={`${message.id}-${i}`}
                              className="mt-2 w-full"
                            >
                              <ul className="space-y-2">
                                <li className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                                  {/* 完成状态复选框 */}
                                  <input
                                    type="checkbox"
                                    checked={toolPart.result.completed}
                                    readOnly
                                    className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-default"
                                  />
                                  {/* 待办事项内容 */}
                                  <span
                                    className={`flex-1 ${
                                      toolPart.result.completed
                                        ? 'line-through text-gray-500 dark:text-gray-400'
                                        : 'text-gray-900 dark:text-gray-100'
                                    }`}
                                  >
                                    {toolPart.result.title}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          )
                        }
                        // 如果是消息类输出，显示友好文本
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const result = toolPart.result as any
                        if (
                          result &&
                          typeof result === 'object' &&
                          'message' in result &&
                          typeof result.message === 'string'
                        ) {
                          return (
                            <div
                              key={`${message.id}-${i}`}
                              className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm text-gray-900 dark:text-gray-100"
                            >
                              ✅ {result.message}
                            </div>
                          )
                        }
                        // 其他情况显示 JSON
                        return (
                          <div
                            key={`${message.id}-${i}`}
                            className="mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                          >
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                              ✅ 工具结果:
                            </span>
                            <pre className="mt-2 text-xs text-gray-700 dark:text-gray-300 opacity-90 overflow-x-auto bg-gray-50 dark:bg-gray-900/50 p-2 rounded">
                              {JSON.stringify(toolPart.result, null, 2)}
                            </pre>
                          </div>
                        )
                      }
                      // 检查是否有 toolName（工具调用）
                      if ('toolName' in toolPart && toolPart.toolName) {
                        return (
                          <div
                            key={`${message.id}-${i}`}
                            className="mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                          >
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                              🔧 调用工具:
                            </span>{' '}
                            <span className="text-gray-700 dark:text-gray-300">
                              {toolPart.toolName}
                            </span>
                            {'args' in toolPart && toolPart.args && (
                              <pre className="mt-2 text-xs text-gray-700 dark:text-gray-300 opacity-90 overflow-x-auto bg-gray-50 dark:bg-gray-900/50 p-2 rounded">
                                {JSON.stringify(toolPart.args, null, 2)}
                              </pre>
                            )}
                          </div>
                        )
                      }
                      // 检查是否有 input（工具输入流）
                      if ('input' in toolPart && toolPart.input !== undefined) {
                        return (
                          <div
                            key={`${message.id}-${i}`}
                            className="mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                          >
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                              🔧 工具调用中...
                            </span>
                            <pre className="mt-2 text-xs text-gray-700 dark:text-gray-300 opacity-90 overflow-x-auto bg-gray-50 dark:bg-gray-900/50 p-2 rounded">
                              {JSON.stringify(toolPart.input, null, 2)}
                            </pre>
                          </div>
                        )
                      }
                    }
                    return null
                }
              })}
            </div>
          </div>
        </div>
      ))}

      {/* AI 思考时的加载指示器 */}
      {isAIThinking && (
        <div className="flex justify-start mb-4">
          <div className="max-w-[80%] rounded-lg px-4 py-3 bg-neutral-200 dark:bg-neutral-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                AI 正在思考...
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 消息输入表单 */}
      <form
        onSubmit={(e) => {
          e.preventDefault() // 阻止表单默认提交行为
          // 发送用户输入的消息
          sendMessage({ text: input })
          // 清空输入框
          setInput('')
        }}
      >
        {/* 消息输入框 */}
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          // 监听输入变化，更新输入框状态
          onChange={(e) => setInput(e.currentTarget.value)}
          // AI 思考时禁用输入框
          disabled={isAIThinking}
        />
      </form>
    </div>
  )
}
