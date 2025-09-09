// Vercel serverless function untuk Instagram API
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username } = req.query;
  
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    // Ganti ini dengan API Instagram scraper yang kamu pake
    // Contoh: rapidapi, apify, atau service lain
    const response = await fetch(`https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=${username}`, {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Set di Vercel env vars
        'X-RapidAPI-Host': 'instagram-scraper-api2.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const apiData = await response.json();
    
    // Format response sesuai yang dibutuhkan frontend
    const formattedData = {
      data: {
        username: apiData.username || username,
        full_name: apiData.full_name || 'N/A',
        follower_count: apiData.follower_count || 0,
        following_count: apiData.following_count || 0,
        media_count: apiData.media_count || 0,
        is_private: apiData.is_private || false,
        spam_follower_setting_enabled: apiData.spam_follower_setting_enabled || false
      }
    };

    return res.status(200).json(formattedData);
    
  } catch (error) {
    console.error('Instagram API Error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch Instagram data',
      message: error.message 
    });
  }
}