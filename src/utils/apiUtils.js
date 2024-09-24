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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

export const testOpenAiApi = async (apiKey) => {
  try {
    const response = await fetch('https://api.openai.com/v1/engines', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return JSON.stringify(data, null, 2);
  } catch (error) {
    return `Error: ${error.message}`;
  }
};
