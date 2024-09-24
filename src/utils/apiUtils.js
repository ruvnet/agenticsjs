import https from 'https';

export const testJinaApi = (apiKey) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 's.jina.ai',
      path: '/When%20was%20Jina%20AI%20founded%3F',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-Return-Format': 'markdown'
      }
    };

    const req = https.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
    });

    req.on('error', (error) => {
      reject(`Error: ${error.message}`);
    });

    req.end();
  });
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
    const data = await response.json();
    return JSON.stringify(data, null, 2);
  } catch (error) {
    return `Error: ${error.message}`;
  }
};
