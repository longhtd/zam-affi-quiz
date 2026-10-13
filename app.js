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
  const possibleTid = urlParams.get("vid") || 
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
  const queryQuiz = urlParams.get("q") || urlParams.get("quiz");

  let slug = queryQuiz || path;

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

function renderPortalBody() {
  const cardBody = document.getElementById("quizCardBody");
  const allQuizzes = QUIZ_DATA ? Object.values(QUIZ_DATA.quizzes) : [];

  // Filter categories count
  const counts = {
    all: allQuizzes.length,
    romance: allQuizzes.filter(q => q.category === "romance").length,
    destiny: allQuizzes.filter(q => q.category === "destiny").length,
    glowup: allQuizzes.filter(q => q.category === "glowup").length,
    wealth: allQuizzes.filter(q => q.category === "wealth").length
  };

  // Filter quizzes based on active tab and search
  const term = currentPortalSearch.toLowerCase().trim();
  const filteredQuizzes = allQuizzes.filter(q => {
    const matchCat = currentPortalCategory === "all" || q.category === currentPortalCategory;
    const matchSearch = !term || 
      q.title.toLowerCase().includes(term) || 
      q.subtitle.toLowerCase().includes(term) || 
      (q.badge && q.badge.toLowerCase().includes(term));
    return matchCat && matchSearch;
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
        <h3>No assessments found</h3>
        <p>Try searching with another keyword or select "All Audits" above.</p>
      </div>
    `;
  } else {
    cardsHtml = filteredQuizzes.map(q => {
      const timeStr = q.reading_time ? q.reading_time.split("•")[0].trim() : "45s";
      const ratingStr = q.rating || "4.9/5";
      const participantsStr = q.participants || "18k+ readers";
      const categoryLabel = q.category_name || q.badge.split(" ")[0] + " ASSESSMENT";

      return `
        <div class="portal-card" onclick="selectQuizFromPortal('${q.slug}')">
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

  cardBody.innerHTML = `
    <div class="portal-view">

      <!-- Category Filter Tabs -->
      <div class="portal-tabs-container">
        <div class="portal-tabs">
          <button class="portal-tab-pill ${currentPortalCategory === 'all' ? 'active' : ''}" onclick="setPortalCategory('all')">
            <span>✨ All Audits</span>
            <span class="tab-count">${counts.all}</span>
          </button>
          <button class="portal-tab-pill ${currentPortalCategory === 'romance' ? 'active' : ''}" onclick="setPortalCategory('romance')">
            <span>💖 Romance & Soulmates</span>
            <span class="tab-count">${counts.romance}</span>
          </button>
          <button class="portal-tab-pill ${currentPortalCategory === 'destiny' ? 'active' : ''}" onclick="setPortalCategory('destiny')">
            <span>🔮 Destiny & Tarot</span>
            <span class="tab-count">${counts.destiny}</span>
          </button>
          <button class="portal-tab-pill ${currentPortalCategory === 'glowup' ? 'active' : ''}" onclick="setPortalCategory('glowup')">
            <span>👑 Cinderella Glow-Up</span>
            <span class="tab-count">${counts.glowup}</span>
          </button>
          <button class="portal-tab-pill ${currentPortalCategory === 'wealth' ? 'active' : ''}" onclick="setPortalCategory('wealth')">
            <span>⚡ System & Mindset</span>
            <span class="tab-count">${counts.wealth}</span>
          </button>
        </div>
      </div>

      <!-- Real-time Search Input -->
      <div class="portal-search-wrapper">
        <span class="search-icon-left">🔍</span>
        <input type="text" 
               class="portal-search-input" 
               placeholder="Search assessments (e.g. Duke, Soulmate, Coffee, Tarot, Belly Fat, Wealth...)"
               value="${currentPortalSearch}"
               oninput="onPortalSearch(this.value)">
        <button class="search-clear-btn" id="searchClearBtn" onclick="clearPortalSearch()">✕</button>
      </div>

      <!-- Spotlight Hero Card -->
      ${heroHtml}

      <!-- Filtered Quiz Cards Grid -->
      <div class="portal-grid">
        ${cardsHtml}
      </div>

    </div>
  `;
}

// Portal Filter Actions
window.setPortalCategory = function(cat) {
  currentPortalCategory = cat;
  renderPortalBody();
};

window.onPortalSearch = function(val) {
  currentPortalSearch = val;
  const clearBtn = document.getElementById("searchClearBtn");
  if (clearBtn) {
    clearBtn.style.display = val ? "block" : "none";
  }
  renderPortalBody();
};

window.clearPortalSearch = function() {
  currentPortalSearch = "";
  renderPortalBody();
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
        <span class="tarot-number">${res.tarot_num || "ARCHETYPE VII"}</span>
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

    </div>
  `;
}

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
