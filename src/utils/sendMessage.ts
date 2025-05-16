import { sendOpenAIMessage } from './mode_request/openaiAPI';
import { sendCustomizeAPI } from './mode_request/customizeAPI';
import { sendOllamaRequest } from './mode_request/ollamaAPI';

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
  } else if (mode === 'ollama') {
    return await sendOllamaRequest(params, message);
  } else if (mode === 'customize') {
    return await sendCustomizeAPI(params, message);
  } else {
    // 預設回應
    return `未知模式: ${mode}`;
  }
}