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
  const { messages, sendMessage, setMessages } = useChat()

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
      {/* 遍历并渲染所有消息 */}
      {messages.map((message) => (
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
                  // 可以在这里添加其他类型的消息部分（如图片、文件等）
                }
              })}
            </div>
          </div>
        </div>
      ))}

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
        />
      </form>
    </div>
  )
}
