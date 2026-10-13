/**
 * Vercel Serverless Redirect: Hides ClickBank affiliate hoplink behind clean domain URL
 * Usage: /out/soulmate?tid=VIDEO_ID -> redirects to https://hop.clickbank.net/?affiliate=gnite&vendor=...
 */
export default function handler(req, res) {
  const { slug, tid, v } = req.query;
  const affiliate = "gnite";

  const vendorMap = {
    "soulmate": "soulmatesk",
    "love-secret": "beirresist",
    "glowup": "puravive",
    "brainwave": "bbwave"
  };

  const targetSlug = (slug || "").toLowerCase();
  const vendor = vendorMap[targetSlug] || req.query.vendor || "soulmatesk";
  const trackingId = (tid || v || "web").replace(/[^a-zA-Z0-9_-]/g, "").substring(0, 30);

  const hoplink = `https://hop.clickbank.net/?affiliate=${affiliate}&vendor=${vendor}&tid=${trackingId}`;

  // 307 Temporary Redirect with strict anti-cache headers
  res.writeHead(307, {
    "Location": hoplink,
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  });
  res.end();
}
