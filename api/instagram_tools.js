// File: /api/instagram_tools.js
// Vercel serverless function untuk menggantikan Vite proxy

const axios = require('axios');

module.exports = async function handler(request, response) {
  // Enable CORS untuk frontend
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Ambil username dari query parameter (contoh: ?username=dapurbuzzer)
  const { username } = request.query;

  if (!username) {
    return response.status(400).json({ message: 'Username is required' });
  }

  try {
    const targetUrl = `https://sprintpedia.id/page/instagram_tools`;
    
    // Siapkan header, sama seperti di vite.config.js
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
      // PENTING: Cookie valid harus diset di Environment Variables Vercel
      'Cookie': process.env.SPRINTPEDIA_COOKIE || 'ci_session=MASUKKAN_COOKIE_VALID_DISINI'
    };

    // Lakukan request ke server sprintpedia
    const apiResponse = await axios.get(targetUrl, {
      params: { username },
      headers: headers,
      timeout: 10000 // 10 second timeout
    });

    // Kirim kembali data JSON yang didapat dari sprintpedia ke frontend
    return response.status(200).json(apiResponse.data);

  } catch (error) {
    console.error('API Error:', error.message);
    
    // Handle specific errors
    if (error.code === 'ECONNABORTED') {
      return response.status(408).json({ message: 'Request timeout' });
    }
    
    if (error.response) {
      return response.status(error.response.status).json({ 
        message: 'Failed to fetch data from external API',
        status: error.response.status
      });
    }
    
    // Tangani jika terjadi error umum
    return response.status(500).json({ message: 'Failed to fetch data from external API.' });
  }
}