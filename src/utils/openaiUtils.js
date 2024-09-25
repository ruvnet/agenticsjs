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

const extractJsonFromMarkdown = (content) => {
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  return jsonMatch ? jsonMatch[1] : content;
};

export const defineRequest = async (query) => {
  try {
    console.log("Starting defineRequest for query:", query);
    const apiKey = localStorage.getItem('openAiApiKey');
    if (!apiKey) {
      console.error("OpenAI API key not found in local storage");
      return { success: false, message: 'Error: OpenAI API key not found in local storage.' };
    }

    const llmModel = localStorage.getItem('llmModel') || 'gpt-4o-mini';
    const llmTemperature = parseFloat(localStorage.getItem('llmTemperature') || '0.7');
    const maxTokens = parseInt(localStorage.getItem('maxTokens') || '150', 10);
    const systemPrompt = localStorage.getItem('systemPrompt') || 'You are a helpful assistant that generates related search terms based on an initial query. Provide a JSON response with an array of related searches and the number of searches to perform.';
    const guidancePrompt = localStorage.getItem('guidancePrompt') || '';

    console.log("LLM Settings for defineRequest:", { llmModel, llmTemperature, maxTokens, systemPrompt, guidancePrompt });

    const openai = new OpenAI({ 
      apiKey: apiKey, 
      dangerouslyAllowBrowser: true 
    });

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `${guidancePrompt}Generate related search terms for the query: "${query}". Respond with a JSON object containing an array of related searches and the number of searches to perform.` }
    ];

    console.log("Sending request to OpenAI API for defineRequest with messages:", JSON.stringify(messages, null, 2));

    const completion = await makeRequestWithRetry(() => 
      openai.chat.completions.create({
        model: llmModel,
        messages: messages,
        temperature: llmTemperature,
        max_tokens: maxTokens
      })
    );

    console.log("Received raw response from OpenAI API for defineRequest:", JSON.stringify(completion, null, 2));

    const assistantMessage = completion.choices[0].message.content;
    const jsonContent = extractJsonFromMarkdown(assistantMessage);
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonContent);
    } catch (error) {
      console.error("Error parsing assistant message:", error);
      parsedResponse = { related_searches: [], num_searches: 0 };
    }

    return {
      success: true,
      definition: query,
      relatedSearches: parsedResponse.related_searches || parsedResponse.relatedSearches || [],
      numberOfSearches: parsedResponse.num_searches || parsedResponse.numberOfSearches || 0,
      rawResponse: JSON.stringify(completion, null, 2)
    };
  } catch (error) {
    console.error("Error defining request:", error);
    return { 
      success: false, 
      message: `Error: ${error.message}`,
      definition: '', 
      relatedSearches: [],
      numberOfSearches: 0,
      rawResponse: JSON.stringify({ error: error.message }, null, 2)
    };
  }
};
