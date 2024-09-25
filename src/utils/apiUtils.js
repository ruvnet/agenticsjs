import OpenAI from 'openai';

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

    // Get LLM settings from local storage
    const llmModel = localStorage.getItem('llmModel') || 'gpt-3.5-turbo';
    const llmTemperature = parseFloat(localStorage.getItem('llmTemperature') || '0.7');
    const systemPrompt = localStorage.getItem('systemPrompt') || '';
    const guidancePrompt = localStorage.getItem('guidancePrompt') || '';

    // WARNING: This option is not secure for production use.
    // Only use for development/testing purposes.
    const openai = new OpenAI({ 
      apiKey: apiKey, 
      dangerouslyAllowBrowser: true 
    });

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: guidancePrompt + 'Hello, can you hear me?' }
    ].filter(msg => msg.content); // Remove empty messages

    const completion = await openai.chat.completions.create({
      model: llmModel,
      messages: messages,
      temperature: llmTemperature,
      max_tokens: 50
    });

    const response = completion.choices[0].message.content;
    localStorage.setItem('openAiApiResponse', JSON.stringify(completion));

    return { success: true, message: 'API key is valid. Successfully connected to OpenAI API.', response };
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      return { success: false, message: 'Error: Unable to connect to the OpenAI API. Please check your internet connection and try again.' };
    }
    if (error.response) {
      // OpenAI API error
      return { success: false, message: `Error: ${error.response.status} - ${error.response.data.error.message}` };
    }
    return { success: false, message: `Error: ${error.message}` };
  }
};
