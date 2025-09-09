import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { path } = req.query;
  
  if (!Array.isArray(path)) {
    return res.status(400).json({ error: 'Invalid path' });
  }

  const posthogPath = path.join('/');
  const posthogUrl = `https://us.i.posthog.com/${posthogPath}`;
  
  try {
    const response = await fetch(posthogUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers,
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();
    
    res.status(response.status).send(data);
  } catch (error) {
    console.error('PostHog proxy error:', error);
    res.status(500).json({ error: 'Proxy error' });
  }
}