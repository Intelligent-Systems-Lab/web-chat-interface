export async function sendOllamaRequest(params: Record<string, any>, message: string): Promise<string> {
  const { url, model, prompt: originalPrompt } = params;
  
  if (!url) return '缺少目標 URL';
  if (!model) return '缺少模型名稱';

  let prompt = originalPrompt || '';
  if (prompt === '') {
    prompt = message;
  } else if (prompt.includes('訊息')) {
    prompt = prompt.replace('訊息', message);
  } else {
    prompt += `\n${message}`;
  }
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ model, prompt, stream: false }),
    });

    if (!response.ok) {
      return `Ollama API 錯誤: ${response.status} ${response.statusText}`;
    }
    console.log('Ollama API 回應:', response);
    const data = await response.json();
    return data.response || '未找到 response 欄位';
  } catch (err: any) {
    return `API 請求失敗: ${err.message || err}`;
  }
}