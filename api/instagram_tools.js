// File: /api/instagram_tools.js
// VERSI FINAL - Menggunakan sintaks ES Module (import/export)

import axios from 'axios';

// Gunakan 'export default' karena ini adalah ES Module
export default async function handler(request, response) {
  // Enable CORS
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  const { username } = request.query;

  if (!username) {
    return response.status(400).json({ message: 'Username is required' });
  }

  try {
    const targetUrl = `https://sprintpedia.id/page/instagram_tools`;
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
      'Cookie': process.env.SPRINTPEDIA_COOKIE, // Pastikan ini sudah di-set di Vercel
    };

    const apiResponse = await axios.get(targetUrl, {
      params: { username },
      headers: headers,
      timeout: 10000,
    });
    
    // Kirim kembali data yang didapat dari sprintpedia
    // Frontend akan menangani jika formatnya salah
    return response.status(200).json(apiResponse.data);

  } catch (error) {
    // Logging error untuk debugging di Vercel
    console.error('API Error:', error.message);
    
    if (error.response) {
      // Jika error berasal dari respons sprintpedia (misal 403, 404)
      return response.status(error.response.status).json({ 
        message: 'Failed to fetch data from external API.',
        status: error.response.status,
        data: error.response.data
      });
    }
    
    // Error umum lainnya (misal timeout)
    return response.status(500).json({ message: 'Internal Server Error while contacting external API.' });
  }
}