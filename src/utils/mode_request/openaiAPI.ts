export async function sendOpenAIMessage(apiKey: string, message: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }],
    }),
  });

  if (!response.ok) {
    return `OpenAI API 錯誤: ${response.status} ${response.statusText}`;
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? 'OpenAI 回應失敗';
}