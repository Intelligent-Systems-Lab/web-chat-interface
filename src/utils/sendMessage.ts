import { sendOpenAIMessage } from './mode_request/openaiAPI';
import { sendCustomizeAPI } from './mode_request/customizeAPI';
import { sendOllamaRequest } from './mode_request/ollamaAPI';

type SendMessageParams = {
  mode: string;
  params: Record<string, any>;
  message: string;
};

export async function sendMessage({ mode, params, message }: SendMessageParams): Promise<string> {
  if (mode === '') {
    return `請先選擇模式保存設定`;
  } else if (mode === 'openai') { 
    if (!params.apiKey) return '缺少 OpenAI API 金鑰';
    return await sendOpenAIMessage(params, message);
  }  else if (mode === 'ollama') {
    return await sendOllamaRequest(params, message);
  } else if (mode === 'customize') {
    return await sendCustomizeAPI(params, message);
  } else {
    return `未知模式: ${mode}`;
  }
}