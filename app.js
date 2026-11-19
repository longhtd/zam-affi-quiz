/**
 * zam-affi-quiz: High-Converting Focused Multi-Funnel Engine
 * Implements:
 * 1. Dedicated, distraction-free quiz funnels (No distracting tabs).
 * 2. Portal Hub when visiting root homepage.
 * 3. Psychological Cold Reading (Barnum Effect) on Result Screen.
 * 4. Royal Archetype Tarot Card presentation with Urgency & Social Proof.
 * 5. Hidden, cloaked outbound route (/out/:slug) with YouTube Video ID (TID) tracking.
 */

// Global State
let QUIZ_DATA = null;
let currentQuizData = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let targetSubId = "web";

// ClickBank Configuration
const DEFAULT_AFFILIATE = "gnite";

// Initialize App
document.addEventListener("DOMContentLoaded", async () => {
  extractTrackingSubId();
  await loadQuizCatalog();
  routeAndRender();

  window.addEventListener("popstate", () => {
    routeAndRender();
  });
});

// Extract Video ID / Tracking Parameters and persist across all quizzes
function extractTrackingSubId() {
  const urlParams = new URLSearchParams(window.location.search);
  const possibleTid = urlParams.get("from") ||
                      urlParams.get("vid") || 
                      urlParams.get("v") || 
                      urlParams.get("subid") || 
                      urlParams.get("tid") || 
                      urlParams.get("utm_campaign") || 
                      urlParams.get("src");
  if (possibleTid) {
    targetSubId = possibleTid.replace(/[^a-zA-Z0-9_-]/g, "").substring(0, 30);
    try {
      sessionStorage.setItem("zam_affi_tid", targetSubId);
      localStorage.setItem("zam_affi_tid", targetSubId);
    } catch (e) {}
  } else {
    try {
      const savedTid = sessionStorage.getItem("zam_affi_tid") || localStorage.getItem("zam_affi_tid");
      if (savedTid) {
        targetSubId = savedTid;
      }
    } catch (e) {}
  }
}


// ==========================================================================
// ZAMVERSE ECOSYSTEM FLYWHEEL (ARCHETYPE -> COZY GAME + SISTER NETWORK + VIP)
// ==========================================================================
const ARCHETYPE_ECOSYSTEM_MAP = {
  romance: {
    gameSlug: "styledrop",
    gameName: "Style Drop & Snug Cats",
    gameHook: "Your romantic archetype thrives on elegance & warm intuition. Relax between chapters with our royal dress-up & cozy cat puzzles.",
    channelLabel: "Manhwa Melodies · Manhwa Duchess · Manhwa Ladies",
  },
  glowup: {
    gameSlug: "glimmergrove",
    gameName: "Glimmer Grove & Burrow Buddy",
    gameHook: "Your radiance blueprint matches tranquil nature & self-care. Grow a moonlit glowing garden or decorate a warm woodland burrow.",
    channelLabel: "Manhwa Darling · Manhwa Sweetie · Villainess Haven",
  },
  destiny: {
    gameSlug: "wordlodge",
    gameName: "Word Lodge (Live on Google Play)",
    gameHook: "Your intuitive mind excels at connecting hidden patterns. Travel 35 painted woodland worlds in our #1 offline word puzzle.",
    channelLabel: "Manhwa Fangirl Stories · Manhwa Serenade · Manhwa Dreamy",
  },
  wealth: {
    gameSlug: "arrowaway",
    gameName: "Arrow Away & Word Lodge",
    gameHook: "Your strategic frequency loves thinking 3 steps ahead. Test your focus across 4,000 calm elemental arrow & word levels.",
    channelLabel: "The Manga Reel · Manhwa Vertical · Manhwa Returner",
  },
};

function buildEcosystemFlywheelHtml(quizObj) {
  const cat = (quizObj && quizObj.category) ? quizObj.category : "destiny";
  const eco = ARCHETYPE_ECOSYSTEM_MAP[cat] || ARCHETYPE_ECOSYSTEM_MAP.destiny;
  const fromParam = encodeURIComponent(targetSubId || "quiz");
  const gameUrl = `https://games.zamverse.com/${eco.gameSlug}/?from=${fromParam}`;
  const allGamesUrl = `https://games.zamverse.com/?from=${fromParam}`;
  const darlingUrl = `https://darling.zamverse.com/?from=${fromParam}`;
  const gateUrl = `https://zamverse.com/?from=${fromParam}`;
  const honorUrl = `https://games.zamverse.com/honor/?from=${fromParam}`;

  return `
    <div class="zv-map-container">
      <div class="zv-map-head">
        <span class="zv-map-badge">🌐 Interactive Ecosystem Map</span>
        <h3 class="zv-map-title">Zamverse Universe Navigation Map</h3>
        <p class="zv-map-sub">Click any connected node in the diagram below to jump directly to our games, Manhwa channels, or VIP communities.</p>
      </div>

      <!-- Visual Hub & Spoke Ecosystem Diagram -->
      <div class="zv-diagram">
        <!-- SVG Connecting Lines Behind Nodes (Desktop/Tablet) -->
        <svg class="zv-diagram-svg" viewBox="0 0 900 420" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="zvLineGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.75"/>
              <stop offset="50%" stop-color="#f5d061" stop-opacity="0.95"/>
              <stop offset="100%" stop-color="#f472b6" stop-opacity="0.75"/>
            </linearGradient>
          </defs>
          <!-- Center (450, 210) to Top-Left (175, 85) -->
          <path d="M450,210 C340,210 280,85 175,85" class="zv-conn-line" stroke="url(#zvLineGold)"/>
          <!-- Center (450, 210) to Top-Right (725, 85) -->
          <path d="M450,210 C560,210 620,85 725,85" class="zv-conn-line" stroke="url(#zvLineGold)"/>
          <!-- Center (450, 210) to Mid-Left (155, 215) -->
          <path d="M450,210 L155,215" class="zv-conn-line" stroke="url(#zvLineGold)"/>
          <!-- Center (450, 210) to Mid-Right (745, 215) -->
          <path d="M450,210 L745,215" class="zv-conn-line" stroke="url(#zvLineGold)"/>
          <!-- Center (450, 210) to Bottom-Left (210, 345) -->
          <path d="M450,210 C350,210 300,345 210,345" class="zv-conn-line" stroke="url(#zvLineGold)"/>
          <!-- Center (450, 210) to Bottom-Center (450, 355) -->
          <path d="M450,210 L450,355" class="zv-conn-line" stroke="url(#zvLineGold)"/>
          <!-- Center (450, 210) to Bottom-Right (690, 345) -->
          <path d="M450,210 C550,210 600,345 690,345" class="zv-conn-line" stroke="url(#zvLineGold)"/>
        </svg>

        <!-- Row 1: Primary Pillar Nodes (Games & Sister Channels) -->
        <div class="zv-diagram-row top">
          <a href="${gameUrl}" target="_blank" rel="noopener" class="zv-node node-cyan">
            <div class="zv-node-icon">🎮</div>
            <div class="zv-node-body">
              <span class="zv-node-tag">Cozy Games</span>
              <strong>${eco.gameName}</strong>
              <small>games.zamverse.com • +250 Bonus Coins</small>
            </div>
          </a>

          <a href="${darlingUrl}" target="_blank" rel="noopener" class="zv-node node-rose">
            <div class="zv-node-icon">📺</div>
            <div class="zv-node-body">
              <span class="zv-node-tag">13+ YouTube Channels</span>
              <strong>Sister Manhwa Network</strong>
              <small>darling.zamverse.com • Full Story Recaps</small>
            </div>
          </a>
        </div>

        <!-- Row 2: Left Satellite + Central Core Hub + Right Satellite -->
        <div class="zv-diagram-row middle">
          <a href="${allGamesUrl}" target="_blank" rel="noopener" class="zv-node node-emerald compact">
            <div class="zv-node-icon">🕹️</div>
            <div class="zv-node-body">
              <span class="zv-node-tag">7 Mobile Games</span>
              <strong>All Cozy Games Studio</strong>
              <small>Word Lodge • Snug Cats • Glimmer Grove</small>
            </div>
          </a>

          <a href="${gateUrl}" target="_blank" rel="noopener" class="zv-core-hub" title="Open Zamverse Central Universe Gate">
            <div class="zv-core-ring"></div>
            <div class="zv-core-inner">
              <span class="zv-core-crown">✨ CENTRAL HUB</span>
              <strong>zamverse.com</strong>
              <small>Universe Portal</small>
            </div>
          </a>

          <a href="${honorUrl}" target="_blank" rel="noopener" class="zv-node node-gold compact">
            <div class="zv-node-icon">🏆</div>
            <div class="zv-node-body">
              <span class="zv-node-tag">Hall of Fame</span>
              <strong>Player Wall of Honor</strong>
              <small>games.zamverse.com/honor</small>
            </div>
          </a>
        </div>

        <!-- Row 3: Community & Social Nodes (Facebook, Telegram, Zalo) -->
        <div class="zv-diagram-row bottom">
          <a href="https://www.facebook.com/zamverse.official" target="_blank" rel="noopener" class="zv-node node-blue mini">
            <div class="zv-node-icon">📘</div>
            <div class="zv-node-body">
              <strong>Facebook Game Page</strong>
              <small>Daily Updates &amp; Art</small>
            </div>
          </a>

          <a href="https://t.me/zamverse" target="_blank" rel="noopener" class="zv-node node-sky mini">
            <div class="zv-node-icon">✈️</div>
            <div class="zv-node-body">
              <strong>Telegram VIP Channel</strong>
              <small>Episode Alerts &amp; Spoilers</small>
            </div>
          </a>

          <a href="https://zalo.me/g/zamverse" target="_blank" rel="noopener" class="zv-node node-teal mini">
            <div class="zv-node-icon">💬</div>
            <div class="zv-node-body">
              <strong>Zalo VIP Community</strong>
              <small>Giao Lưu &amp; Sự Kiện</small>
            </div>
          </a>
        </div>
      </div>
    </div>
  `;
}

// Load Quizzes Configuration
async function loadQuizCatalog() {
  try {
    const res = await fetch("/quizzes.json");
    if (res.ok) {
      QUIZ_DATA = await res.json();
      return;
    }
  } catch (e) {
    console.warn("Using inline fallback catalog", e);
  }
}

// Router & View Switcher
function routeAndRender() {
  const path = window.location.pathname.replace(/^\/|\/$/g, "").toLowerCase();
  const urlParams = new URLSearchParams(window.location.search);
  let queryQuiz = urlParams.get("q") || urlParams.get("quiz");

  // /?q=<keyword> on the portal root prefills the search box (videos end on a
  // keyword and send viewers to the bio link). A real quiz slug or an old alias
  // in ?q= still opens that quiz directly, as before.
  const isPortalPath = !path || path === "index.html" || path === "portal";
  const portalQuery = isPortalPath ? resolvePortalQuery(urlParams.get("q")) : null;
  if (portalQuery !== null) {
    currentPortalSearch = portalQuery;
    currentPortalCategory = "all";
    queryQuiz = urlParams.get("quiz");
  }

  let slug = (queryQuiz || path).toLowerCase();

  // Handle aliases
  if (slug === "love" || slug === "secret" || slug === "hero") slug = "love-secret";
  if (slug === "diet" || slug === "health" || slug === "cinderella") slug = "glowup";
  if (slug === "theta" || slug === "wealth" || slug === "system") slug = "brainwave";

  // 🎲 Universal Random Route (/random, /any, /lucky)
  if (slug === "random" || slug === "any" || slug === "lucky") {
    if (QUIZ_DATA && QUIZ_DATA.quizzes) {
      const availableSlugs = Object.keys(QUIZ_DATA.quizzes);
      if (availableSlugs.length > 0) {
        const randomSlug = availableSlugs[Math.floor(Math.random() * availableSlugs.length)];
        const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
        const trackingQuery = (targetSubId && targetSubId !== "web") ? `?v=${encodeURIComponent(targetSubId)}` : "";
        const targetUrl = isLocal ? `/?q=${randomSlug}${trackingQuery ? '&' + trackingQuery.slice(1) : ''}` : `/${randomSlug}${trackingQuery}`;
        window.history.replaceState({ slug: randomSlug }, "", targetUrl);
        currentQuizData = QUIZ_DATA.quizzes[randomSlug];
        startQuiz();
        return;
      }
    }
  }

  if (!slug || slug === "" || slug === "index.html" || slug === "portal") {
    // Show Portal Hub if no specific quiz is targeted
    renderPortalHub();
  } else if (QUIZ_DATA && QUIZ_DATA.quizzes[slug]) {
    // Show Dedicated Quiz Funnel
    currentQuizData = QUIZ_DATA.quizzes[slug];
    startQuiz();
  } else {
    // Fallback to soulmate
    currentQuizData = QUIZ_DATA ? QUIZ_DATA.quizzes["soulmate"] : null;
    startQuiz();
  }
}

// Portal Filter State
let currentPortalCategory = "all";
let currentPortalSearch = "";

// ==========================================================================
// PORTAL SEARCH (pure helpers: video keyword first, then text fields)
// ==========================================================================
function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (ch) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]
  ));
}

function normalizeSearchTerm(value) {
  return String(value == null ? "" : value).trim().toLowerCase();
}

function quizKeywords(quiz) {
  return quiz && Array.isArray(quiz.keywords)
    ? quiz.keywords.map(normalizeSearchTerm).filter(Boolean)
    : [];
}

// What the visitor typed, reduced to the bare keyword:
// "tea.", "#TEA", " tea " or "“tea”" all become "tea" (people copy what they see).
function keywordFromTerm(term) {
  return normalizeSearchTerm(term).replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, "");
}

// keywords[0] is the PRIMARY keyword (the word shown at the end of the video);
// the rest are older aliases. Scores, higher is listed first, 0 = no match:
// 100 exact primary, 95 exact alias, 90 primary prefix, 85 alias prefix,
// then plain text. Keywords are compared as whole words or prefixes only, so
// "ex" never matches "next" and "tea" never matches "team" through a keyword.
function scoreQuizForSearch(quiz, term) {
  if (!quiz || !term) return 0;
  const keywordTerm = keywordFromTerm(term);
  const keywords = quizKeywords(quiz);
  if (keywordTerm && keywords.length > 0) {
    const primary = keywords[0];
    const aliases = keywords.slice(1);
    if (primary === keywordTerm) return 100;
    if (aliases.includes(keywordTerm)) return 95;
    if (primary.startsWith(keywordTerm)) return 90;
    if (aliases.some((k) => k.startsWith(keywordTerm))) return 85;
  }

  const has = (field) => typeof field === "string" && field.toLowerCase().includes(term);
  if (has(quiz.title)) return 60;
  if (has(quiz.badge)) return 50;
  if (has(quiz.category) || has(quiz.category_name)) return 40;
  if (has(quiz.subtitle)) return 30;
  if (has(quiz.slug)) return 20;
  return 0;
}

// Returns { term, exact, results }.
// - no term: the category tab decides, original order
// - exact keyword: only the matching quiz, whatever tab is active and whatever
//   other quizzes contain those letters; a primary keyword beats an alias
// - otherwise: every quiz that matches, best match first
function searchQuizzes(quizzes, rawTerm, category) {
  const list = Array.isArray(quizzes) ? quizzes : [];
  const term = normalizeSearchTerm(rawTerm);
  if (!term) {
    const cat = category || "all";
    return { term, exact: false, results: list.filter((q) => cat === "all" || q.category === cat) };
  }

  const scored = list
    .map((quiz, index) => ({ quiz, index, score: scoreQuizForSearch(quiz, term) }))
    .filter((item) => item.score > 0);

  const topScore = scored.reduce((max, item) => Math.max(max, item.score), 0);
  if (topScore >= 95) {
    const exactMatches = scored.filter((item) => item.score === topScore);
    return { term, exact: true, results: exactMatches.map((item) => item.quiz) };
  }

  scored.sort((a, b) => b.score - a.score || a.index - b.index);
  return { term, exact: false, results: scored.map((item) => item.quiz) };
}

// Old ?q= values that must keep opening a quiz (aliases and the random route)
const LEGACY_Q_ROUTES = [
  "love", "secret", "hero", "diet", "health", "cinderella", "theta", "wealth", "system",
  "random", "any", "lucky", "portal", "index.html"
];

// Decides what ?q= means on the portal root.
// Returns the text to put in the search box, or null when ?q= is a quiz route.
function resolvePortalQuery(rawQ) {
  if (rawQ === null || rawQ === undefined) return null;
  const raw = String(rawQ).trim().slice(0, 60);
  const term = raw.toLowerCase();
  if (!term) return null;

  const quizzes = QUIZ_DATA && QUIZ_DATA.quizzes ? QUIZ_DATA.quizzes : {};
  if (Object.prototype.hasOwnProperty.call(quizzes, term)) return null;
  if (searchQuizzes(Object.values(quizzes), term, "all").exact) return raw;
  if (LEGACY_Q_ROUTES.includes(term)) return null;
  return raw;
}

// ==========================================================================
// PORTAL HUB (FOR ROOT HOMEPAGE VISITORS)
// ==========================================================================
function renderPortalHub() {
  document.title = "Zamverse Reader Portal | Exclusive Insights & Assessments";

  // Expand container for wide catalog view
  const mainContainer = document.getElementById("mainContainer");
  if (mainContainer) {
    mainContainer.classList.add("portal-expanded");
  }

  // Update Header
  document.getElementById("brandBadge").textContent = "👑 Zamverse Reader Chronicles";
  document.getElementById("brandTitle").innerHTML = `<span class="highlight">Discover Your Royal Archetype & Destiny</span>`;
  document.getElementById("brandSubtitle").textContent = "Explore our interactive psychological assessments, romantic soulmate sketches, and metabolic vitality blueprints.";
  
  const allQuizzes = QUIZ_DATA ? Object.values(QUIZ_DATA.quizzes) : [];
  document.getElementById("brandMeta").innerHTML = `<span>📚 ${allQuizzes.length} Reader Audits Available</span> • <span>🔒 100% Free & Confidential</span>`;

  // Hide progress bar on portal
  document.getElementById("progressSection").style.display = "none";

  renderPortalBody();
}

// Builds the portal shell (search box, realm map, ecosystem map) ONCE, then only
// refreshes the results. The search <input> is never re-created while typing:
// replacing it on every keystroke is what dropped focus and made the page flash.
function renderPortalBody() {
  const cardBody = document.getElementById("quizCardBody");
  if (!cardBody) return;

  let input = document.getElementById("portalSearchInput");
  if (!input) {
    cardBody.innerHTML = buildPortalShellHtml();
    input = document.getElementById("portalSearchInput");
  }
  // Set through the property (not the HTML) so ?q= text can never break the markup
  if (input && input.value !== currentPortalSearch) {
    input.value = currentPortalSearch;
  }

  updatePortalResults();
}

// Re-renders ONLY the results area (#portalResults) and the small state flags.
function updatePortalResults() {
  const resultsEl = document.getElementById("portalResults");
  if (!resultsEl) return;

  const allQuizzes = QUIZ_DATA && QUIZ_DATA.quizzes ? Object.values(QUIZ_DATA.quizzes) : [];
  const found = searchQuizzes(allQuizzes, currentPortalSearch, currentPortalCategory);
  const term = found.term;
  const filteredQuizzes = found.results;

  // While searching, the realm map is hidden so results sit right under the box
  const view = document.getElementById("portalView");
  if (view) view.classList.toggle("is-searching", !!term);

  const clearBtn = document.getElementById("searchClearBtn");
  if (clearBtn) clearBtn.style.display = currentPortalSearch ? "block" : "none";

  document.querySelectorAll("[data-realm]").forEach((node) => {
    node.classList.toggle("active", node.getAttribute("data-realm") === currentPortalCategory);
  });

  // Featured Hero Quiz (Soulmate Sketch)
  const heroQuiz = QUIZ_DATA && QUIZ_DATA.quizzes ? QUIZ_DATA.quizzes["soulmate"] : null;
  const showHero = heroQuiz && currentPortalCategory === "all" && !term;

  const heroHtml = showHero ? `
    <div class="portal-hero-banner" onclick="selectQuizFromPortal('${heroQuiz.slug}')">
      <div class="hero-content">
        <div class="hero-crown-badge">👑 Reader Favorite • Most Viral Today</div>
        <h2 class="hero-title">${heroQuiz.title}</h2>
        <p class="hero-sub">${heroQuiz.subtitle}</p>
        <div class="hero-meta">
          <span>🔥 38,400+ readers completed</span>
          <span>•</span>
          <span>⚡ 98.7% Accuracy</span>
          <span>•</span>
          <span>⏱️ 45 Seconds</span>
        </div>
      </div>
      <div>
        <div class="hero-cta-btn">
          <span>✨ Start Soulmate Reading</span>
          <span>→</span>
        </div>
      </div>
    </div>
  ` : "";

  // Grid cards
  let cardsHtml = "";
  if (filteredQuizzes.length === 0) {
    cardsHtml = `
      <div class="portal-empty">
        <div class="portal-empty-icon">🔍</div>
        <h3>${term ? `No quiz matches “${escapeHtml(currentPortalSearch.trim())}” yet` : "No quizzes here yet"}</h3>
        <p>Double-check the keyword from the video, or
          <button type="button" class="portal-link-btn" onclick="clearPortalSearch()">browse all ${allQuizzes.length} quizzes</button>.
        </p>
      </div>
    `;
  } else {
    cardsHtml = filteredQuizzes.map(q => {
      const timeStr = q.reading_time ? q.reading_time.split("•")[0].trim() : "45s";
      const ratingStr = q.rating || "4.9/5";
      const participantsStr = q.participants || "18k+ readers";
      const categoryLabel = q.category_name || q.badge || "Story Quiz";

      // Exact video keyword: one highlighted card with an obvious Start button
      if (found.exact) {
        // Show the word the visitor typed (primary or alias), not always the primary
        const typedKeyword = keywordFromTerm(currentPortalSearch);
        const keywordLabel = quizKeywords(q).includes(typedKeyword) ? typedKeyword : (quizKeywords(q)[0] || typedKeyword);
        return `
        <div class="portal-card keyword-match" data-slug="${q.slug}" onclick="selectQuizFromPortal('${q.slug}')">
          <div class="portal-card-top">
            <span class="portal-card-badge">🔑 Keyword match • ${escapeHtml(String(keywordLabel).toUpperCase())}</span>
            <span class="portal-card-time">⏱️ ${timeStr}</span>
          </div>

          <div class="portal-card-main">
            <h2 class="portal-card-title">${q.title}</h2>
            <p class="portal-card-sub">${q.subtitle}</p>
          </div>

          <div class="portal-card-footer">
            <span class="portal-card-rating">⭐️ ${ratingStr} • ${participantsStr}</span>
            <button type="button" class="portal-start-btn">
              <span>✨ Start</span>
              <span>→</span>
            </button>
          </div>
        </div>
      `;
      }

      return `
        <div class="portal-card" data-slug="${q.slug}" onclick="selectQuizFromPortal('${q.slug}')">
          <div class="portal-card-top">
            <span class="portal-card-badge">${q.icon || "✨"} ${categoryLabel}</span>
            <span class="portal-card-time">⏱️ ${timeStr}</span>
          </div>

          <div class="portal-card-main">
            <h2 class="portal-card-title">${q.title}</h2>
            <p class="portal-card-sub">${q.subtitle.substring(0, 110)}...</p>
          </div>

          <div class="portal-card-footer">
            <span class="portal-card-rating">⭐️ ${ratingStr} • ${participantsStr}</span>
            <span class="portal-card-cta">
              <span>Begin Audit</span>
              <span>→</span>
            </span>
          </div>
        </div>
      `;
    }).join("");
  }

  const moreHtml = (term && filteredQuizzes.length > 0) ? `
    <div class="portal-search-more">
      <button type="button" class="portal-link-btn" onclick="clearPortalSearch()">← Browse all ${allQuizzes.length} quizzes</button>
    </div>
  ` : "";

  resultsEl.innerHTML = `
    <!-- Spotlight Hero Card -->
    ${heroHtml}

    <!-- Filtered Quiz Cards Grid -->
    <div class="portal-grid">
      ${cardsHtml}
    </div>
    ${moreHtml}
  `;
}

function buildPortalShellHtml() {
  const allQuizzes = QUIZ_DATA && QUIZ_DATA.quizzes ? Object.values(QUIZ_DATA.quizzes) : [];

  // Filter categories count
  const counts = {
    all: allQuizzes.length,
    romance: allQuizzes.filter(q => q.category === "romance").length,
    destiny: allQuizzes.filter(q => q.category === "destiny").length,
    glowup: allQuizzes.filter(q => q.category === "glowup").length,
    wealth: allQuizzes.filter(q => q.category === "wealth").length
  };

  return `
    <div class="portal-view" id="portalView">

      <!-- Keyword / Real-time Search (first thing on a phone screen) -->
      <form class="portal-search-block" role="search" onsubmit="return submitPortalSearch(event)">
        <label class="portal-search-label" for="portalSearchInput">🔑 Have a video keyword? Type it here</label>
        <div class="portal-search-wrapper">
          <span class="search-icon-left">🔍</span>
          <input type="text"
                 id="portalSearchInput"
                 class="portal-search-input"
                 placeholder="Keyword or topic (e.g. COFFEE)"
                 inputmode="search"
                 enterkeyhint="go"
                 autocomplete="off"
                 autocorrect="off"
                 autocapitalize="off"
                 spellcheck="false"
                 maxlength="60"
                 aria-label="Search quizzes by keyword"
                 oninput="onPortalSearch(this.value)">
          <button type="button" class="search-clear-btn" id="searchClearBtn" aria-label="Clear search" onclick="clearPortalSearch(true)">✕</button>
        </div>
      </form>

      <!-- Interactive Story Realm Map (Sơ đồ 4 Nhánh Trắc Nghiệm thay cho hàng button phẳng) -->
      <div class="realm-map-wrapper">
        <svg class="realm-map-svg" viewBox="0 0 800 130" preserveAspectRatio="none" aria-hidden="true">
          <path d="M400,26 C240,26 140,68 95,98" class="realm-line"/>
          <path d="M400,26 C330,26 305,68 295,98" class="realm-line"/>
          <path d="M400,26 C470,26 495,68 505,98" class="realm-line"/>
          <path d="M400,26 C560,26 660,68 705,98" class="realm-line"/>
        </svg>
        <div class="realm-root-row">
          <div class="realm-root-node ${currentPortalCategory === 'all' ? 'active' : ''}" data-realm="all" onclick="setPortalCategory('all')">
            <span class="realm-root-dot"></span>
            <strong>✨ All Story Realms (${counts.all} Quizzes)</strong>
            <span class="realm-root-hint">Tap any branch node below to filter</span>
          </div>
        </div>
        <div class="realm-branches-row">
          <div class="realm-branch-node rose ${currentPortalCategory === 'romance' ? 'active' : ''}" data-realm="romance" onclick="setPortalCategory('romance')">
            <span class="r-icon">💖</span>
            <div class="r-text">
              <strong>Romance &amp; Soulmates</strong>
              <small>${counts.romance} Story Quizzes</small>
            </div>
          </div>
          <div class="realm-branch-node purple ${currentPortalCategory === 'destiny' ? 'active' : ''}" data-realm="destiny" onclick="setPortalCategory('destiny')">
            <span class="r-icon">🔮</span>
            <div class="r-text">
              <strong>Destiny &amp; Star Chart</strong>
              <small>${counts.destiny} Story Quizzes</small>
            </div>
          </div>
          <div class="realm-branch-node emerald ${currentPortalCategory === 'glowup' ? 'active' : ''}" data-realm="glowup" onclick="setPortalCategory('glowup')">
            <span class="r-icon">👑</span>
            <div class="r-text">
              <strong>Royal Glow-Up</strong>
              <small>${counts.glowup} Story Quizzes</small>
            </div>
          </div>
          <div class="realm-branch-node gold ${currentPortalCategory === 'wealth' ? 'active' : ''}" data-realm="wealth" onclick="setPortalCategory('wealth')">
            <span class="r-icon">⚡</span>
            <div class="r-text">
              <strong>Genius &amp; Abundance</strong>
              <small>${counts.wealth} Story Quizzes</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero + quiz cards: the only part that changes while typing -->
      <div id="portalResults"></div>
      ${buildEcosystemFlywheelHtml(null)}

    </div>
  `;
}

// Portal Filter Actions (none of them rebuilds the search input)
window.setPortalCategory = function(cat) {
  currentPortalCategory = cat;
  updatePortalResults();
};

window.onPortalSearch = function(val) {
  currentPortalSearch = val;
  updatePortalResults();
};

// refocus = true for the ✕ button inside the box (keep typing);
// the "browse all" links leave the keyboard closed.
window.clearPortalSearch = function(refocus) {
  currentPortalSearch = "";
  currentPortalCategory = "all";
  const input = document.getElementById("portalSearchInput");
  if (input) {
    input.value = "";
    if (refocus === true) input.focus();
  }
  updatePortalResults();
};

// Enter / "Go" on the keyboard: open the quiz when exactly one result is left
window.submitPortalSearch = function(event) {
  if (event && event.preventDefault) event.preventDefault();
  const allQuizzes = QUIZ_DATA && QUIZ_DATA.quizzes ? Object.values(QUIZ_DATA.quizzes) : [];
  const found = searchQuizzes(allQuizzes, currentPortalSearch, currentPortalCategory);
  if (found.term && found.results.length === 1) {
    selectQuizFromPortal(found.results[0].slug);
  }
  return false;
};

// Select Quiz From Portal Hub (Always keeps tracking ID)
window.selectQuizFromPortal = function(slug) {
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const trackingQuery = (targetSubId && targetSubId !== "web") ? `?v=${encodeURIComponent(targetSubId)}` : "";
  const newUrl = isLocal 
    ? `/?q=${slug}${trackingQuery ? '&' + trackingQuery.slice(1) : ''}` 
    : `/${slug}${trackingQuery}`;
  window.history.pushState({ slug }, "", newUrl);

  currentQuizData = QUIZ_DATA.quizzes[slug];
  startQuiz();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Return back to Portal Hub (Always keeps tracking ID)
window.backToPortal = function() {
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const trackingQuery = (targetSubId && targetSubId !== "web") ? `?v=${encodeURIComponent(targetSubId)}` : "";
  const newUrl = isLocal ? `/${trackingQuery}` : `/${trackingQuery}`;
  window.history.pushState({}, "", newUrl);

  renderPortalHub();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// ==========================================================================
// DEDICATED QUIZ FUNNEL
// ==========================================================================
function startQuiz() {
  if (!currentQuizData) return;

  currentQuestionIndex = 0;
  userAnswers = [];

  // Revert container to focused width
  const mainContainer = document.getElementById("mainContainer");
  if (mainContainer) {
    mainContainer.classList.remove("portal-expanded");
  }

  document.title = `${currentQuizData.title} | Zamverse Insights`;

  // Show progress section
  document.getElementById("progressSection").style.display = "block";

  // Update Brand Headers
  document.getElementById("brandBadge").innerHTML = `
    <span onclick="backToPortal()" style="cursor: pointer; opacity: 0.8; margin-right: 6px;">← All Audits</span> • ${currentQuizData.badge}
  `;
  document.getElementById("brandTitle").innerHTML = `<span class="highlight">${currentQuizData.title}</span>`;
  document.getElementById("brandSubtitle").textContent = currentQuizData.subtitle;
  document.getElementById("brandMeta").innerHTML = `<span>⏱️ ${currentQuizData.reading_time}</span> • <span>🔒 100% Free & Private</span>`;

  renderQuestion();
}

// Render Current Question
function renderQuestion() {
  const cardBody = document.getElementById("quizCardBody");
  const total = currentQuizData.questions.length;
  const current = currentQuestionIndex + 1;
  const percent = Math.round((current / total) * 100);

  // Update Progress
  document.getElementById("progressLabel").textContent = `Step ${current} of ${total}`;
  document.getElementById("progressFill").style.width = `${percent}%`;

  const q = currentQuizData.questions[currentQuestionIndex];
  const letterLabels = ["A", "B", "C", "D"];

  const optionsHtml = q.options.map((opt, idx) => {
    const text = typeof opt === "string" ? opt : opt.text;
    const sub = typeof opt === "object" && opt.sub ? opt.sub : "";
    const letter = letterLabels[idx] || "•";

    return `
      <button class="option-btn" onclick="selectOption(${idx})">
        <div class="option-badge">${letter}</div>
        <div class="option-content">
          <div class="option-title">${text}</div>
          ${sub ? `<div class="option-sub">${sub}</div>` : ""}
        </div>
      </button>
    `;
  }).join("");

  cardBody.innerHTML = `
    <div class="question-container">
      <h2 class="question-text">${q.question}</h2>
      <div class="options-grid">
        ${optionsHtml}
      </div>
    </div>
  `;
}

// Option Selected
window.selectOption = function(optionIndex) {
  userAnswers.push(optionIndex);

  if (currentQuestionIndex < currentQuizData.questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    showCalculationState();
  }
};

// ==========================================================================
// ASTROLOGICAL / PSYCHOLOGICAL SCANNER SCREEN
// ==========================================================================
function showCalculationState() {
  const cardBody = document.getElementById("quizCardBody");
  document.getElementById("progressFill").style.width = "100%";
  document.getElementById("progressLabel").textContent = "Synthesizing Archetype";

  const statusMessages = [
    "Calibrating emotional & psychological archetypes...",
    "Matching response frequencies with destiny matrix...",
    "Synthesizing personal resonance blueprint...",
    "Archetype detected. Preparing confidential report..."
  ];

  cardBody.innerHTML = `
    <div class="calculating-view">
      <div class="scanner-ring-container">
        <div class="scanner-ring"></div>
        <div class="scanner-core">
          <span>${currentQuizData.icon || "🔮"}</span>
        </div>
      </div>
      <h3 class="calculating-title">Calibrating Your Reading</h3>
      <div class="calculating-status" id="calcStatus">Analyzing responses...</div>
      <div class="calculating-percent" id="calcPercent">42%</div>
    </div>
  `;

  let step = 0;
  let percent = 42;
  const statusEl = document.getElementById("calcStatus");
  const percentEl = document.getElementById("calcPercent");

  const interval = setInterval(() => {
    step++;
    percent += 19;
    if (percent > 100) percent = 100;

    if (statusEl && statusMessages[step]) {
      statusEl.textContent = statusMessages[step];
    }
    if (percentEl) {
      percentEl.textContent = `${percent}%`;
    }

    if (step >= 3) {
      clearInterval(interval);
      setTimeout(showFinalResult, 600);
    }
  }, 600);
}

// ==========================================================================
// HIGH-CONVERTING RESULT SCREEN (TAROT CARD + COLD READING + CTA)
// ==========================================================================
function showFinalResult() {
  const cardBody = document.getElementById("quizCardBody");
  const res = currentQuizData.result;
  const affiliate = QUIZ_DATA ? (QUIZ_DATA.affiliate || DEFAULT_AFFILIATE) : DEFAULT_AFFILIATE;
  const vendor = currentQuizData.vendor;

  // Clean, branded internal URL (NO mention of ClickBank on hover)
  const cleanOutboundUrl = `/out/${currentQuizData.slug}?tid=${encodeURIComponent(targetSubId)}`;

  // Obfuscated payload (Base64) for instant client-side fallback
  const rawTarget = `https://hop.clickbank.net/?affiliate=${affiliate}&vendor=${vendor}&tid=${encodeURIComponent(targetSubId)}`;
  const encodedPayload = btoa(rawTarget);

  // Trait matrix chips
  const traitsHtml = res.traits ? res.traits.map(t => `
    <div class="trait-item">
      <div class="trait-label">${t.label}</div>
      <div class="trait-value">${t.value}</div>
    </div>
  `).join("") : "";

  // Testimonials
  const testimonialsHtml = res.testimonials ? res.testimonials.map(item => `
    <div class="testimonial-card">
      <div class="testimonial-quote">“${item.text}”</div>
      <div class="testimonial-author">⭐️ 5/5 — ${item.author}</div>
    </div>
  `).join("") : "";

  // Hide the progress section on result
  document.getElementById("progressSection").style.display = "none";

  cardBody.innerHTML = `
    <div class="result-view">

      <!-- Tarot Header -->
      <div class="tarot-badge-row">
        <span class="tarot-number">${res.tarot_num || "Archetype VII"}</span>
        <span class="tarot-match">⚡ ${res.match_percentage || "98.7% Match"}</span>
      </div>

      <!-- Card Title & Subtitle -->
      <h2 class="tarot-card-title">${res.card_title}</h2>
      <p class="tarot-card-subtitle">${res.card_subtitle || ""}</p>

      <!-- Cold Reading Box (Đoán trúng tim đen) -->
      <div class="cold-reading-box">
        <div class="cold-reading-label">🔮 Intuitive Personality Profile</div>
        <p class="cold-reading-text">${res.cold_reading}</p>
      </div>

      <!-- Trait Matrix -->
      ${traitsHtml ? `<div class="trait-grid">${traitsHtml}</div>` : ""}

      ${buildGiftHtml("main")}

      <!-- Urgency Banner -->
      <div class="urgency-banner">
        <span>⏳</span>
        <span>${res.urgency_notice || "Your personalized report has been generated and is ready to view."}</span>
      </div>

      <!-- Big Gold CTA Button -->
      <div class="cta-button-container">
        <a href="${cleanOutboundUrl}" 
           data-token="${encodedPayload}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="cta-button" 
           id="affiliateCta"
           onclick="handleOutboundClick(event, this)">
          ${res.cta_label}
        </a>
        <span class="cta-subtext">🔒 ${res.cta_subtext}</span>
      </div>

      <!-- Social Proof / Reader Feedback -->
      ${testimonialsHtml ? `
        <div class="testimonials-section">
          <div class="testimonials-title">Verified Reader Experiences</div>
          <div class="testimonial-cards">
            ${testimonialsHtml}
          </div>
        </div>
      ` : ""}
      ${buildGiftHtml("soft")}

    </div>
  `;
}

// ==========================================================================
// BONUS GIFT: buttons on the result screen open ONE email dialog.
// Submit -> zamverse.com/api/subscribe (contact + gift email) -> zamverse.com/welcome/?q=<quiz>
// ==========================================================================
const SUBSCRIBE_URL = "https://zamverse.com/api/subscribe/";

// Visitors who arrive from our own daily emails (?from=dayN) are already subscribed: no gift buttons.
function giftHidden() {
  return /^(day\d+|email\d*)$/i.test(targetSubId || "");
}

function buildGiftHtml(kind) {
  if (giftHidden()) return "";
  if (kind === "main") {
    return `
      <div class="zv-gift">
        <button type="button" class="zv-gift-btn" data-gift>🎁 Reveal my bonus video</button>
        <p class="zv-gift-note">Free · a video picked for you, plus 5 recaps sent to your inbox</p>
      </div>`;
  }
  return `
    <div class="zv-gift zv-gift-soft">
      <button type="button" class="zv-gift-link" data-gift>📩 Email me my picks</button>
    </div>`;
}

function ensureGiftModal() {
  let m = document.getElementById("zvGiftModal");
  if (m) return m;
  m = document.createElement("div");
  m.id = "zvGiftModal";
  m.className = "zv-modal";
  m.hidden = true;
  m.innerHTML = `
    <div class="zv-modal-backdrop" data-gift-close></div>
    <div class="zv-modal-card" role="dialog" aria-modal="true" aria-labelledby="zvGiftTitle">
      <button type="button" class="zv-modal-x" data-gift-close aria-label="Close">×</button>
      <h3 id="zvGiftTitle">Almost there! 🎁</h3>
      <p class="zv-modal-sub">Enter your email to unlock your bonus video. We'll also send your picks to your inbox.</p>
      <form class="zv-gift-form" novalidate>
        <label class="zv-sr-only" for="zvGiftEmail">Email address</label>
        <input id="zvGiftEmail" name="email" type="email" required autocomplete="email" placeholder="you@email.com">
        <input class="zv-hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
        <label class="zv-optin-consent"><input type="checkbox" name="consent" required> I agree to receive emails from Zamverse. Unsubscribe any time.</label>
        <button type="submit" class="zv-gift-submit">Unlock my bonus</button>
        <p class="zv-optin-msg" role="status" aria-live="polite"></p>
      </form>
    </div>`;
  document.body.appendChild(m);
  return m;
}

function openGiftModal() {
  const m = ensureGiftModal();
  m.hidden = false;
  document.body.classList.add("zv-modal-open");
  setTimeout(function () {
    const input = document.getElementById("zvGiftEmail");
    if (input) input.focus();
  }, 50);
}

function closeGiftModal() {
  const m = document.getElementById("zvGiftModal");
  if (m) m.hidden = true;
  document.body.classList.remove("zv-modal-open");
}

document.addEventListener("click", function (ev) {
  const t = ev.target;
  if (!t || !t.closest) return;
  if (t.closest("[data-gift]")) { openGiftModal(); return; }
  if (t.closest("[data-gift-close]")) closeGiftModal();
});

document.addEventListener("keydown", function (ev) {
  if (ev.key === "Escape") closeGiftModal();
});

document.addEventListener("submit", function (ev) {
  const form = ev.target.closest ? ev.target.closest("form.zv-gift-form") : null;
  if (!form) return;
  ev.preventDefault();
  const msg = form.querySelector(".zv-optin-msg");
  const btn = form.querySelector("button[type=submit]");
  const messages = {
    email: "That email doesn't look right.",
    consent: "Please tick the box so we can email you.",
    busy: "We're a bit busy. Try again in a minute.",
    fail: "Something went wrong. Please try again later."
  };
  const slug = currentQuizData && currentQuizData.slug ? currentQuizData.slug : "";
  const cat = currentQuizData && currentQuizData.category ? currentQuizData.category : "";
  btn.disabled = true;
  msg.textContent = "";
  fetch(SUBSCRIBE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: form.elements.email.value,
      website: form.elements.website.value,
      consent: form.elements.consent.checked,
      tag: cat,
      quiz: slug
    })
  })
    .then(function (r) { return r.json().catch(function () { return {}; }); })
    .then(function (j) {
      if (j.ok) {
        msg.textContent = "You're in! Unlocking your bonus...";
        msg.className = "zv-optin-msg good";
        setTimeout(function () {
          window.location.href = "https://zamverse.com/welcome/?q=" + encodeURIComponent(slug);
        }, 700);
      } else {
        msg.textContent = messages[j.error] || messages.fail;
        msg.className = "zv-optin-msg bad";
        btn.disabled = false;
      }
    })
    .catch(function () {
      msg.textContent = messages.fail;
      msg.className = "zv-optin-msg bad";
      btn.disabled = false;
    });
});

// Seamless Outbound Handler
window.handleOutboundClick = function(event, el) {
  // If running locally or on static preview without serverless backend, open via decoded token
  if (window.location.protocol === "file:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    event.preventDefault();
    const token = el.getAttribute("data-token");
    if (token) {
      const targetUrl = atob(token);
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  }
  // On Vercel production (quiz.zamverse.com), allows natural navigation to /out/:slug which executes api/out.js 307 redirect
};
