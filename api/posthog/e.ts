import type { VercelRequest, VercelResponse } from "@vercel/node";

const POSTHOG_HOST = process.env.VITE_PUBLIC_POSTHOG_HOST || process.env.POSTHOG_HOST || "https://us.i.posthog.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const targetUrl = `${POSTHOG_HOST.replace(/\/$/, "")}/e/`;

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
    res.setHeader("Cache-Control", "no-store");
    res.send(Buffer.from(buf));
  } catch (err: any) {
    console.error("PostHog e proxy error:", err?.message || err);
    res.status(502).json({ error: "Bad gateway", message: err?.message || "Proxy failed" });
  }
}


