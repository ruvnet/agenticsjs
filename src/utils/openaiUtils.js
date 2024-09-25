import OpenAI from 'openai';

export const generateSecondarySearches = async (query) => {
  try {
    console.log("Starting generateSecondarySearches for query:", query);
    const apiKey = localStorage.getItem('openAiApiKey');
    if (!apiKey) {
      console.error("OpenAI API key not found in local storage");
      return { success: false, message: 'Error: OpenAI API key not found in local storage.' };
    }

    // Get LLM settings from local storage
    const llmModel = localStorage.getItem('llmModel') || 'gpt-3.5-turbo';
    const llmTemperature = parseFloat(localStorage.getItem('llmTemperature') || '0.7');
    const systemPrompt = localStorage.getItem('systemPrompt') || '';
    const guidancePrompt = localStorage.getItem('guidancePrompt') || '';

    console.log("LLM Settings:", { llmModel, llmTemperature, systemPrompt, guidancePrompt });

    // WARNING: This option is not secure for production use.
    // Only use for development/testing purposes.
    const openai = new OpenAI({ 
      apiKey: apiKey, 
      dangerouslyAllowBrowser: true 
    });

    const messages = [
      { role: 'system', content: systemPrompt || 'You are a helpful assistant that generates related search terms based on an initial query. Provide a JSON response with an array of related searches and the number of searches to perform.' },
      { role: 'user', content: guidancePrompt + `Generate related search terms for the query: "${query}". Respond with a JSON object containing an array of related searches and the number of searches to perform.` }
    ].filter(msg => msg.content);

    console.log("Sending request to OpenAI API with messages:", messages);

    const completion = await openai.chat.completions.create({
      model: llmModel,
      messages: messages,
      temperature: llmTemperature,
      max_tokens: 150
    });

    console.log("Received response from OpenAI API:", completion);

    const response = JSON.parse(completion.choices[0].message.content);
    console.log("Parsed response:", response);

    return {
      success: true,
      relatedSearches: response.relatedSearches || [],
      numberOfSearches: response.numberOfSearches || 0,
      rawResponse: JSON.stringify(completion, null, 2)
    };
  } catch (error) {
    console.error("Error generating secondary searches:", error);
    return { 
      success: false, 
      message: `Error: ${error.message}`,
      relatedSearches: [], 
      numberOfSearches: 0, 
      rawResponse: JSON.stringify({ error: error.message }, null, 2)
    };
  }
};
