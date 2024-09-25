import OpenAI from 'openai';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const makeRequestWithRetry = async (apiCall, retries = MAX_RETRIES) => {
  try {
    return await apiCall();
  } catch (error) {
    if (retries > 0) {
      console.log(`Request failed, retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
      await sleep(RETRY_DELAY);
      return makeRequestWithRetry(apiCall, retries - 1);
    }
    throw error;
  }
};

export const defineRequest = async (query) => {
  try {
    console.log("Starting defineRequest for query:", query);
    const apiKey = localStorage.getItem('openAiApiKey');
    if (!apiKey) {
      console.error("OpenAI API key not found in local storage");
      return { success: false, message: 'Error: OpenAI API key not found in local storage.' };
    }

    const llmModel = localStorage.getItem('llmModel') || 'gpt-3.5-turbo';
    const llmTemperature = parseFloat(localStorage.getItem('llmTemperature') || '0.7');
    const systemPrompt = localStorage.getItem('systemPrompt') || '';
    const guidancePrompt = localStorage.getItem('guidancePrompt') || '';

    console.log("LLM Settings for defineRequest:", { llmModel, llmTemperature, systemPrompt, guidancePrompt });

    const openai = new OpenAI({ 
      apiKey: apiKey, 
      dangerouslyAllowBrowser: true 
    });

    const messages = [
      { role: 'system', content: systemPrompt || 'You are a helpful assistant that defines search requests.' },
      { role: 'user', content: guidancePrompt + `Define the search request: "${query}"` }
    ].filter(msg => msg.content);

    console.log("Sending request to OpenAI API for defineRequest with messages:", JSON.stringify(messages, null, 2));

    const completion = await makeRequestWithRetry(() => 
      openai.chat.completions.create({
        model: llmModel,
        messages: messages,
        temperature: llmTemperature,
        max_tokens: 150
      })
    );

    console.log("Received raw response from OpenAI API for defineRequest:", JSON.stringify(completion, null, 2));

    return {
      success: true,
      definition: completion.choices[0].message.content,
      rawResponse: JSON.stringify(completion, null, 2)
    };
  } catch (error) {
    console.error("Error defining request:", error);
    return { 
      success: false, 
      message: `Error: ${error.message}`,
      definition: '', 
      rawResponse: JSON.stringify({ error: error.message }, null, 2)
    };
  }
};
