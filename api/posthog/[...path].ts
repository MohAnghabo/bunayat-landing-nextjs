import type { VercelRequest, VercelResponse } from "@vercel/node";

// Simple proxy to PostHog to minimize ad-blocker issues
// Accepts any path after /api/posthog and forwards to the configured PostHog host

const POSTHOG_HOST = process.env.VITE_PUBLIC_POSTHOG_HOST || process.env.POSTHOG_HOST || "https://us.i.posthog.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS (allow site to call this endpoint)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const path = Array.isArray(req.query.path) ? req.query.path.join("/") : String(req.query.path || "");
  const targetUrl = `${POSTHOG_HOST.replace(/\/$/, "")}/${path}`;

  try {
    const init: RequestInit = {
      method: req.method,
      headers: {
        "Content-Type": req.headers["content-type"] || "application/json",
        Authorization: req.headers["authorization"] || "",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: req.method !== "GET" && req.method !== "HEAD" ? (typeof req.body === "string" ? req.body : JSON.stringify(req.body || {})) : undefined,
    };

    const response = await fetch(targetUrl, init);
    const contentType = response.headers.get("content-type") || "application/json";
    const buf = await response.arrayBuffer();

    res.status(response.status);
    res.setHeader("Content-Type", contentType);
    // Avoid exposing upstream headers that might be blocked
    res.setHeader("Cache-Control", "no-store");
    res.send(Buffer.from(buf));
  } catch (err: any) {
    console.error("PostHog proxy error:", err?.message || err);
    res.status(502).json({ error: "Bad gateway", message: err?.message || "Proxy failed" });
  }
}


