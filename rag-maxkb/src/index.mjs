import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: 'application-7efbf2d899b11c13067e515ee2f35b7e',
  baseURL: 'http://localhost:8080/chat/api/0199e205-d485-7573-94dc-d535f5bb98e9'
})

async function main() {
  const stream = await client.chat.completions.create({
    model: 'gpt-5',
    messages: [{ role: 'user', content: '艾米在干什么' }],
    stream: true
  })

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '')
  }
}

main()
