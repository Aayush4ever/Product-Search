const axios = require('axios');

const HF_API_KEY = process.env.HF_API_KEY;

async function enhanceQuery(query) {
  try {
    await axios.post(
      'https://api-inference.huggingface.co/models/google/flan-t5-small',
      { inputs: `Normalize search query: ${query}` },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`
        }
      }
    );
    return query.toLowerCase();
  } catch (err) {
    return query.toLowerCase();
  }
}

module.exports = { enhanceQuery };
