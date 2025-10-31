// 导入 langchain 的核心功能
import { createAgent, tool, initChatModel } from 'langchain'
// 导入 LangGraph 的 MemorySaver（用于保存对话记忆）和 Runtime 类型
import { MemorySaver, type Runtime } from '@langchain/langgraph'
// 导入 zod 用于定义工具和响应的数据模式
import * as z from 'zod'

// 定义系统提示词（告诉 AI Agent 它的角色和任务）
const systemPrompt = `You are an expert weather forecaster, who speaks in puns.

You have access to two tools:

- get_weather_for_location: use this to get the weather for a specific location
- get_user_location: use this to get the user's location

If a user asks you for the weather, make sure you know the location. If you can tell from the question that they mean wherever they are, use the get_user_location tool to find their location.`

// 定义工具：获取指定城市的天气
const getWeather = tool(
  // 工具执行函数：接收城市名称，返回天气信息（这里是示例数据）
  ({ city }) => `It's always sunny in ${city}!`,
  {
    name: 'get_weather_for_location', // 工具名称
    description: 'Get the weather for a given city', // 工具描述：获取指定城市的天气
    schema: z.object({
      city: z.string() // 参数：城市名称（字符串类型）
    })
  }
)

// 定义工具：获取用户位置
const getUserLocation = tool(
  // 工具执行函数
  // _: 第一个参数（这里不使用，所以用 _ 表示）
  // config: 运行时配置，包含用户上下文信息
  (_, config: Runtime<{ user_id: string }>) => {
    // 从配置上下文中获取用户 ID
    const { user_id } = config.context
    // 根据用户 ID 返回对应位置（示例逻辑）
    return user_id === '1' ? 'Florida' : 'SF'
  },
  {
    name: 'get_user_location', // 工具名称
    description: 'Retrieve user information based on user ID', // 工具描述：根据用户 ID 获取用户信息
    schema: z.object({}) // 该工具不需要输入参数
  }
)

// 配置模型（初始化聊天模型）
const model = await initChatModel('anthropic:claude-sonnet-4-5', {
  temperature: 0 // 温度参数设为 0，使输出更确定（减少随机性）
})

// 定义响应格式（结构化响应）
const responseFormat = z.object({
  punny_response: z.string(), // 幽默的回复（必填）
  weather_conditions: z.string().optional() // 天气情况（可选）
})

// 设置记忆存储（用于保存对话历史）
const checkpointer = new MemorySaver()

// 创建 Agent
const agent = createAgent({
  model: 'anthropic:claude-sonnet-4-5', // 使用的 AI 模型
  systemPrompt: systemPrompt, // 系统提示词
  tools: [getUserLocation, getWeather], // Agent 可用的工具列表
  responseFormat, // 响应格式（结构化输出）
  checkpointer // 记忆存储（用于多轮对话）
})

// 运行 Agent
// `thread_id` 是对话的唯一标识符（用于区分不同的对话会话）
const config = {
  configurable: { thread_id: '1' }, // 可配置项：线程 ID（用于记忆管理）
  context: { user_id: '1' } // 上下文：用户 ID（传递给工具使用）
}

// 第一次调用：询问天气
const response = await agent.invoke(
  {
    messages: [
      {
        role: 'user', // 用户角色
        content: 'what is the weather outside?' // 用户问题：外面的天气如何？
      }
    ]
  },
  config // 传入配置（包含 thread_id 和 context）
)
console.log(response.structuredResponse)
// 预期输出示例：
// {
//   punny_response: "Florida is still having a 'sun-derful' day! The sunshine is playing 'ray-dio' hits all day long! I'd say it's the perfect weather for some 'solar-bration'! If you were hoping for rain, I'm afraid that idea is all 'washed up' - the forecast remains 'clear-ly' brilliant!",
//   weather_conditions: "It's always sunny in Florida!"
// }

// 注意：我们可以使用相同的 `thread_id` 继续对话（保持上下文记忆）
const thankYouResponse = await agent.invoke(
  {
    messages: [
      {
        role: 'user', // 用户角色
        content: 'thank you!' // 用户说：谢谢！
      }
    ]
  },
  config // 使用相同的配置（相同的 thread_id，保持对话上下文）
)
console.log(thankYouResponse.structuredResponse)
// 预期输出示例：
// {
//   punny_response: "You're 'thund-erfully' welcome! It's always a 'breeze' to help you stay 'current' with the weather. I'm just 'cloud'-ing around waiting to 'shower' you with more forecasts whenever you need them. Have a 'sun-sational' day in the Florida sunshine!",
//   weather_conditions: undefined // 这次没有查询天气，所以为 undefined
// }
