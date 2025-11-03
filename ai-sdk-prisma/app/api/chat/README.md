## 本地开发使用 Ollama

### 方案 A（继续用 openai 提供商）

.env:
OPENAI_BASE_URL=http://localhost:11434/v1
OPENAI_API_KEY=any（随便给个非空）
代码中创建客户端时加入兼容模式：
createOpenAI({ baseURL, apiKey, compatibility: 'compatible' })
模型名保持你本地的：model: openai('deepseek-r1:1.5b')
说明：compatibility: 'compatible' 会让 AI SDK 使用 /v1/chat/completions，而不是 /responses。

### 方案 B（改用 Ollama 提供商，最稳）

安装/导入提供商（AI SDK v5）：
import { ollama } from '@ai-sdk/ollama'
使用：
model: ollama('deepseek-r1:1.5b', { baseURL: 'http://localhost:11434' })
优点：直接走 Ollama 原生的兼容端点，不需 OpenAI KEY，也避免 Responses 路径问题。
