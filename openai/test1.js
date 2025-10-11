import OpenAI from 'openai'
import dotenv from 'dotenv'

// 加载环境变量
dotenv.config()

const client = new OpenAI({
  apiKey: process.env.APIKEY,
  baseURL: process.env.BASE_URL
})

async function main() {
  const stream = await client.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: '生成一个 Table 的 React 组件' }],
    stream: true
  })

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '')
  }
}

main()
