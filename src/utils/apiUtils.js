export const testJinaApi = async (apiKey) => {
  try {
    const response = await fetch('https://s.jina.ai/When%20was%20Jina%20AI%20founded%3F', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-Return-Format': 'markdown'
      }
    });
    const data = await response.json();
    return JSON.stringify(data, null, 2);
  } catch (error) {
    return `Error: ${error.message}`;
  }
};