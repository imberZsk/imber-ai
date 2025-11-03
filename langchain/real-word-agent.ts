// 导入 langchain 的核心功能
import { createAgent, tool, initChatModel } from 'langchain'
// 导入 LangGraph 的 MemorySaver（用于保存对话记忆）和 Runtime 类型
import { MemorySaver, type Runtime } from '@langchain/langgraph'
// 导入 zod 用于定义工具和响应的数据模式
import * as z from 'zod'
// 加载 .env 环境变量（OPENAI_API_KEY、OPENAI_BASE_URL）
import 'dotenv/config'
// 导入 ora 用于显示加载动画
import ora from 'ora'

// 定义系统提示词（告诉 AI Agent 它的角色和任务）
const systemPrompt = `你是一位专业的天气预报员，说话时喜欢用双关语和幽默。

你可以使用两个工具：

- get_weather_for_location: 使用此工具获取特定地点的天气
- get_user_location: 使用此工具获取用户的位置

当用户询问天气时，请确保你知道地点。如果从问题中可以判断出用户是指他们所在的地方，请使用 get_user_location 工具来查找他们的位置。`

// 定义工具：获取指定城市的天气
const getWeather = tool(
  // 工具执行函数：接收城市名称，返回天气信息（这里是示例数据）
  ({ city }) => `在 ${city} 总是晴天！`,
  {
    name: 'get_weather_for_location', // 工具名称
    description: '获取指定城市的天气', // 工具描述：获取指定城市的天气
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
  // @ts-ignore
  (_, config: Runtime<{ user_id: string }>) => {
    // 从配置上下文中获取用户 ID
    const { user_id } = config.context || { user_id: '1' }
    // 根据用户 ID 返回对应位置（示例逻辑）
    return user_id === '1' ? '佛罗里达' : '旧金山'
  },
  {
    name: 'get_user_location', // 工具名称
    description: '根据用户 ID 获取用户位置信息', // 工具描述：根据用户 ID 获取用户信息
    schema: z.object({}) // 该工具不需要输入参数
  }
)

// 配置模型（初始化聊天模型）
const model = await initChatModel('openai:gpt-5', {
  // 优先读取环境变量：OPENAI_API_KEY、OPENAI_BASE_URL
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
  temperature: 0 // 温度参数设为 0，使输出更确定（减少随机性）
})

// 定义响应格式（结构化响应）
// 注意：某些自定义 API 可能不支持 responseFormat，如果报错可以注释掉
// const responseFormat = z.object({
//   punny_response: z.string().describe('幽默的回复'), // 幽默的回复（必填）
//   weather_conditions: z.string().optional().describe('天气情况') // 天气情况（可选）
// })

// 设置记忆存储（用于保存对话历史）
const checkpointer = new MemorySaver()

// 创建 Agent
const agent = createAgent({
  model, // 传入已配置好的模型实例
  systemPrompt: systemPrompt, // 系统提示词
  tools: [getUserLocation, getWeather], // Agent 可用的工具列表
  // responseFormat, // 暂时移除，因为自定义 API 可能不支持
  checkpointer // 记忆存储（用于多轮对话）
})

// 运行 Agent
// `thread_id` 是对话的唯一标识符（用于区分不同的对话会话）
const config = {
  configurable: { thread_id: '1' }, // 可配置项：线程 ID（用于记忆管理）
  context: { user_id: '1' } // 上下文：用户 ID（传递给工具使用）
}

const spinner = ora('正在查询天气...').start()

// 第一次调用：询问天气
const response = await agent.invoke(
  {
    messages: [
      {
        role: 'user', // 用户角色
        content: '外面的天气如何？' // 用户问题：外面的天气如何？
      }
    ]
  },
  config // 传入配置（包含 thread_id 和 context）
)
spinner.succeed('天气查询完成')
// 如果没有 responseFormat，使用 response.messages 而不是 structuredResponse
console.log(
  response.messages?.[response.messages.length - 1]?.content || response
)
// 预期输出示例：
// {
//   punny_response: "佛罗里达今天依然是'阳光满满'的一天！阳光全天播放着'光芒四射'的歌曲！我觉得这是'太阳能庆典'的完美天气！如果你希望下雨，恐怕这个想法要'泡汤'了——天气预报仍然'清晰可见'地晴朗！",
//   weather_conditions: "在 佛罗里达 总是晴天！"
// }

// 注意：我们可以使用相同的 `thread_id` 继续对话（保持上下文记忆）
const spinner2 = ora('正在生成感谢回复...').start()
const thankYouResponse = await agent.invoke(
  {
    messages: [
      {
        role: 'user', // 用户角色
        content: '谢谢！' // 用户说：谢谢！
      }
    ]
  },
  config // 使用相同的配置（相同的 thread_id，保持对话上下文）
)
spinner2.succeed('感谢回复完成')
// 如果没有 responseFormat，使用 response.messages 而不是 structuredResponse
console.log(
  thankYouResponse.messages?.[thankYouResponse.messages.length - 1]?.content ||
    thankYouResponse
)
// 预期输出示例：
// {
//   punny_response: "不'客气'！帮助你'及时'了解天气总是'轻风细雨'般轻松。我只是在'云游'等待，随时准备为你'倾盆'提供更多天气预报。在佛罗里达的阳光下度过一个'阳光灿烂'的日子吧！",
//   weather_conditions: undefined // 这次没有查询天气，所以为 undefined
// }
