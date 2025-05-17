export async function sendOpenAIMessage(params: Record<string, any>, message: string): Promise<string> {
  const { apiKey, model: originalModel, prompt: originalPrompt } = params;
  
  let model = originalModel || '';
  if (!model || model.trim() === '') {
    model = 'gpt-4o-mini';
  }

  let prompt = originalPrompt || '';
  if (prompt === '') {
    prompt = message;
  } else if (prompt.includes('訊息')) {
    prompt = prompt.replace('訊息', message);
  } else {
    prompt += `\n${message}`;
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    return `OpenAI API 錯誤: ${response.status} ${response.statusText}`;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? 'OpenAI 回應失敗';
}