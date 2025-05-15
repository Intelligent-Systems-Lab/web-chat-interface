export async function sendCustomizeAPI(params: Record<string, any>, message: string): Promise<string> {
  const { method, url, apiKey, query_params, body, responseFields } = params;
  if (!url) return '缺少目標 URL';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

  let response: Response;
  try {
    if (method === 'POST') {
      let bodyObj: Record<string, any> = { messages: [{ role: 'user', content: message }] };
      if (body) {
        try {
          bodyObj = { ...bodyObj, ...body };
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
      const query = new URLSearchParams({
        ...query_params,
        message,
      }).toString();
      response = await fetch(`${url}?${query}`, {
        method: 'GET',
        headers,
      });
    }
    const data = await response.json();

    if (responseFields && Array.isArray(responseFields) && responseFields.length > 0) {
      const extractedFields: Record<string, any> = {};
      for (const field of responseFields) {
        const keys = field.split('.');
        let value = data;
        for (const key of keys) {
          if (key.includes('[') && key.includes(']')) {
            const [arrayKey, index] = key.match(/([^\[\]]+)|(\d+)/g) || [];
            if (value[arrayKey] && Array.isArray(value[arrayKey]) && value[arrayKey][+index] !== undefined) {
              value = value[arrayKey][+index];
            } else {
              value = undefined;
              break;
            }
          } else if (value[key] !== undefined) {
            value = value[key];
          } else {
            value = undefined;
            break;
          }
        }
        if (value !== undefined) {
          extractedFields[field] = value;
        }
      }

      if (responseFields.length === 1) {
        return extractedFields[responseFields[0]] !== undefined
          ? extractedFields[responseFields[0]]
          : '欄位值不存在';
      }

      return JSON.stringify(extractedFields);
    }

    return data.result || JSON.stringify(data);
  } catch (err: any) {
    return `API 請求失敗: ${err.message || err}`;
  }
}