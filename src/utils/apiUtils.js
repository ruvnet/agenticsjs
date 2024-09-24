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
      if (response.status === 401) {
        const errorData = await response.json();
        if (errorData.error && errorData.error.code === 'invalid_api_key') {
          return 'Error: Invalid API key. Please check your OpenAI API key and try again.';
        }
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return 'API key is valid. Successfully connected to OpenAI API.';
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      return 'Error: Unable to connect to the OpenAI API. Please check your internet connection and try again.';
    }
    return `Error: ${error.message}`;
  }
};
