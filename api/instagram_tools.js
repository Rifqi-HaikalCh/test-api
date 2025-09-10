// File: /api/instagram_tools.js
// Vercel Serverless Function

import axios from 'axios';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
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
    return res.status(200).json(apiResponse.data);

  } catch (error) {
    // Logging error untuk debugging di Vercel
    console.error('API Error:', error.message);
    
    if (error.response) {
      // Jika error berasal dari respons sprintpedia (misal 403, 404)
      return res.status(error.response.status).json({ 
        message: 'Failed to fetch data from external API.',
        status: error.response.status,
        data: error.response.data
      });
    }
    
    // Error umum lainnya (misal timeout)
    return res.status(500).json({ message: 'Internal Server Error while contacting external API.' });
  }
}