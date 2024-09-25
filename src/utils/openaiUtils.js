import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: localStorage.getItem('openAiApiKey'),
  dangerouslyAllowBrowser: true
});

export const generateSecondarySearches = async (query) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview", // Updated to use GPT-4 Turbo
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates related search terms based on an initial query. Provide a JSON response with an array of related searches and the number of searches to perform."
        },
        {
          role: "user",
          content: `Generate related search terms for the query: "${query}". Respond with a JSON object containing an array of related searches and the number of searches to perform.`
        }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    console.log('Raw OpenAI API Response:', JSON.stringify(completion, null, 2));

    const response = JSON.parse(completion.choices[0].message.content);
    return {
      relatedSearches: response.relatedSearches || [],
      numberOfSearches: response.numberOfSearches || 0,
      rawResponse: JSON.stringify(completion, null, 2)
    };
  } catch (error) {
    console.error("Error generating secondary searches:", error);
    return { 
      relatedSearches: [], 
      numberOfSearches: 0, 
      rawResponse: JSON.stringify({ error: error.message }, null, 2)
    };
  }
};
