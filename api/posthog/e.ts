import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const posthogUrl = 'https://us.i.posthog.com/e/';
  
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
    console.error('PostHog event error:', error);
    res.status(500).json({ error: 'Event error' });
  }
}