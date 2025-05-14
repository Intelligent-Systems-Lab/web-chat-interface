import { sendOpenAIMessage } from './mode_request/openaiAPI';

type SendMessageParams = {
  mode: string;
  params: Record<string, any>;
  message: string;
};

export async function sendMessage({ mode, params, message }: SendMessageParams): Promise<string> {
  // 根據 mode 決定要發送的內容
  if (mode === 'openai') {
    const apiKey = params.apiKey;
    if (!apiKey) return '缺少 OpenAI API 金鑰';
    return await sendOpenAIMessage(apiKey, message);

  } else if (mode === 'custom') {
    // 另一種 mode
    const res = await fetch('/api/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message, options: params }),
    });
    const data = await res.json();
    return data.result || 'Custom 回應失敗';
  } else {
    // 預設回應
    return `未知模式: ${mode}`;
  }
}