/**
 * Vercel Serverless Redirect: Hides ClickBank affiliate hoplink behind clean domain URL
 * Usage: /out/soulmate?tid=VIDEO_ID -> redirects to https://hop.clickbank.net/?affiliate=gnite&vendor=...
 */
export default function handler(req, res) {
  const { slug, tid, v } = req.query;
  const affiliate = "gnite";

  const vendorMap = {
    // 💖 Group 1: Romance, Dating & Male Psychology
    "soulmate": "tinapsc",
    "love-secret": "hissecret",
    "hero-instinct": "hissecret",
    "devotion": "amynorth",
    "text-chemistry": "amynorth",
    "ex-factor": "brbrowning",

    // 🔮 Group 2: Destiny, Astrology, Tarot & Mindset
    "numerology": "numerology",
    "astrology": "astroread",
    "aura": "auraread",
    "mind-movies": "mindmovies",

    // 👑 Group 3: Cinderella Glow-Up & Metabolism
    "glowup": "javaburn",
    "coffee-ritual": "javaburn",
    "tea-burn": "teaburn",
    "belly-juice": "lbjuice",
    "lean-biome": "leanbiome",
    "mitolyn": "mitolyn",
    "liv-pure": "livpure",
    "alpilean": "alpilean",
    "prodentim": "prodentim",
    "beauty-sleep": "revive",
    "gut-vita": "gutvita",

    // ⚡ Group 4: Inner Peace, Focus & Wealth
    "brainwave": "attractbr",
    "wealth-dna": "wealthdna",
    "neuro-zoom": "neurozoom",
    "cortexi": "cortexi",
    "audisoothe": "audifort",
    "zeneara": "zeneara"
  };

  const targetSlug = (slug || "").toLowerCase();
  let vendor = vendorMap[targetSlug];
  if (!vendor || targetSlug === "random" || targetSlug === "any") {
    const topVendors = ["tinapsc", "hissecret", "amynorth", "javaburn", "numerology", "astroread", "teaburn", "attractbr"];
    vendor = topVendors[Math.floor(Math.random() * topVendors.length)];
  }
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
