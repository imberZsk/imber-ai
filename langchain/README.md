## Agent（智能代理）

Agent 是一个能够自主思考和行动的 AI 系统，它不仅仅是被动回答问题的聊天机器人，而是一个能够：

### 1. 理解上下文并记住对话（Understand context and remember conversations）

**代码实现：**

```typescript
// 使用 MemorySaver 保存对话历史
const checkpointer = new MemorySaver()

// 使用 thread_id 区分不同的对话会话
const config = {
  configurable: { thread_id: '1' }, // 同一个 thread_id 会保持对话上下文
  context: { user_id: '1' }
}
```

**功能说明：**

- Agent 能记住之前说过的话
- 在多轮对话中保持上下文连贯
- 同一个 `thread_id` 的对话会共享历史记录

### 2. 智能使用多种工具（Use multiple tools intelligently）

**代码实现：**

```typescript
// 定义多个工具
const getWeather = tool(...)      // 获取天气工具
const getUserLocation = tool(...) // 获取用户位置工具

// Agent 可以根据需要智能选择使用哪个工具
const agent = createAgent({
  tools: [getUserLocation, getWeather] // Agent 会自己决定何时使用哪个工具
})
```

**功能说明：**

- Agent 可以根据用户问题，智能判断需要使用哪个工具
- 例如：用户问"外面的天气如何？"，Agent 会先调用 `get_user_location` 获取位置，再调用 `get_weather_for_location` 获取天气

### 3. 提供结构化响应（Provide structured responses in a consistent format）

**代码实现：**

```typescript
// 定义响应格式（虽然当前代码中已注释，但功能存在）
const responseFormat = z.object({
  punny_response: z.string(), // 幽默回复
  weather_conditions: z.string().optional() // 天气情况
})
```

**功能说明：**

- Agent 可以按照预定义的格式返回数据
- 保证响应的一致性和可解析性
- 方便后续程序处理

### 4. 通过上下文处理用户特定信息（Handle user-specific information through context）

**代码实现：**

```typescript
// 通过 context 传递用户信息
const config = {
  context: { user_id: '1' } // 用户 ID
}

// 工具可以访问上下文信息
const getUserLocation = tool((_, config: Runtime<{ user_id: string }>) => {
  const { user_id } = config.context // 从上下文获取用户 ID
  return user_id === '1' ? '佛罗里达' : '旧金山'
})
```

**功能说明：**

- Agent 可以访问用户特定的上下文信息
- 不同用户可以获得个性化响应
- 工具执行时可以获取用户相关数据

### 5. 在交互之间保持对话状态（Maintain conversation state across interactions）

**代码实现：**

```typescript
// 第一次对话
const response = await agent.invoke(
  {
    messages: [{ role: 'user', content: '外面的天气如何？' }]
  },
  config
)

// 第二次对话（使用相同的 thread_id）
const thankYouResponse = await agent.invoke(
  {
    messages: [{ role: 'user', content: '谢谢！' }]
  },
  config
) // 相同的 config，Agent 知道之前的对话内容
```

**功能说明：**

- Agent 记住之前的对话内容
- 在多轮交互中保持连贯性
- 用户说"谢谢"时，Agent 知道是在回应之前的天气查询

---

## 总结

**Agent = 普通聊天机器人 + 自主决策能力 + 工具调用能力 + 记忆能力**

与普通聊天机器人的区别：

- ❌ 普通机器人：只能回答问题，没有记忆，不能执行操作
- ✅ Agent：能记住对话、能自主决策、能调用工具、能处理复杂任务

- Understand context and remember conversations 理解上下文并记住对话
- Use multiple tools intelligently 智能使用多种工具
- Provide structured responses in a consistent format 以一致的格式提供结构化的回复
- Handle user-specific information through context 通过上下文处理用户特定信息
- Maintain conversation state across interactions 在交互之间保持对话状态
