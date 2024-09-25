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
    return { success: true, message: 'API key is valid. Successfully connected to Jina AI API.', response: data };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const testOpenAiApi = async () => {
  try {
    const apiKey = localStorage.getItem('openAiApiKey');
    if (!apiKey) {
      return { success: false, message: 'Error: OpenAI API key not found in local storage.' };
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Hello, can you hear me?" }],
        max_tokens: 50
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error && errorData.error.code === 'invalid_api_key') {
        return { success: false, message: 'Error: Invalid API key. Please check your OpenAI API key and try again.' };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    localStorage.setItem('openAiApiResponse', JSON.stringify(data));

    return { success: true, message: 'API key is valid. Successfully connected to OpenAI API.', response: data.choices[0].message.content };
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      return { success: false, message: 'Error: Unable to connect to the OpenAI API. Please check your internet connection and try again.' };
    }
    return { success: false, message: `Error: ${error.message}` };
  }
};
