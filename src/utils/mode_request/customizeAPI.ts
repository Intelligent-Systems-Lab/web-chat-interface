export async function sendCustomizeAPI(params: Record<string, any>, message: string): Promise<string> {
  const { method = 'GET', url, apiKey, customBody } = params;
  if (!url) return '缺少目標 URL';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

  let response: Response;
  try {
    if (method === 'POST') {
      let bodyObj: Record<string, any> = { messages: [{ role: 'user', content: message }]};
      console.log('customBody', customBody);
      if (customBody) {
        try {
          bodyObj = { ...bodyObj, ...customBody };
        } catch {
          return '自訂 Body 不是有效的 JSON 格式';
        }
      }
      response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(bodyObj),
      });
    } else {
      // GET 預設將 message 當作 query string
      const query = new URLSearchParams({ message }).toString();
      response = await fetch(`${url}?${query}`, {
        method: 'GET',
        headers,
      });
    }
    const data = await response.json();
    return data.result || JSON.stringify(data);
  } catch (err: any) {
    return `API 請求失敗: ${err.message || err}`;
  }
}