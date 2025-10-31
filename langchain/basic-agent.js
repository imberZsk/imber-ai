// 导入 langchain 的核心功能
import { createAgent, tool, initChatModel } from 'langchain'
// 导入 zod 用于定义工具的参数模式（schema）
import * as z from 'zod'
// 加载 .env 环境变量（OPENAI_API_KEY、OPENAI_BASE_URL）
import 'dotenv/config'

import ora from 'ora'

// 定义天气查询工具
// tool 函数用于创建一个可被 AI Agent 调用的工具
const getWeather = tool(
  // 工具的执行函数：接收输入参数，返回天气信息
  (input) => `在 ${input.city} 总是晴天！`,
  {
    name: 'get_weather', // 工具名称
    description: '获取指定城市的天气', // 工具描述（告诉 AI 这个工具是做什么的）
    schema: z.object({
      // 定义工具需要的参数结构
      city: z.string().describe('要查询天气的城市') // city 是一个字符串类型，用于指定要查询天气的城市
    })
  }
)

// 通过 initChatModel 显式配置 OpenAI 的 apiKey 与 baseURL（也可全用环境变量）
const model = await initChatModel('openai:gpt-5', {
  // 优先读取环境变量：OPENAI_API_KEY、OPENAI_BASE_URL
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL
})

// 创建一个 AI Agent（智能代理）
const agent = createAgent({
  model, // 传入已配置好的模型实例
  tools: [getWeather] // Agent 可以使用的工具列表
})

const spinner = ora('正在查询天气...').start()

// 调用 Agent 并打印响应
const response = await agent.invoke({
  messages: [
    {
      role: 'user', // 用户角色
      content: '东京的天气如何？' // 用户的问题：东京的天气如何？
    }
  ]
})
spinner.succeed('天气查询完成')
console.log(response)
