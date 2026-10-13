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

// Extract Video ID / Tracking Parameters
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

// ==========================================================================
// PORTAL HUB (FOR ROOT HOMEPAGE VISITORS)
// ==========================================================================
function renderPortalHub() {
  document.title = "Zamverse Reader Portal | Exclusive Insights & Assessments";

  // Update Header
  document.getElementById("brandBadge").textContent = "✨ Zamverse Reader Chronicles";
  document.getElementById("brandTitle").innerHTML = `<span class="highlight">Choose Your Private Assessment</span>`;
  document.getElementById("brandSubtitle").textContent = "Explore our exclusive psychological audits, romantic archetypes, and subconscious vitality scans.";
  document.getElementById("brandMeta").innerHTML = "<span>📚 4 Reader Audits Available</span> • <span>🔒 100% Free & Confidential</span>";

  // Hide progress bar on portal
  document.getElementById("progressSection").style.display = "none";

  const cardBody = document.getElementById("quizCardBody");
  const quizzes = QUIZ_DATA ? Object.values(QUIZ_DATA.quizzes) : [];

  const cardsHtml = quizzes.map(q => {
    return `
      <div class="portal-card" onclick="selectQuizFromPortal('${q.slug}')">
        <div>
          <div class="portal-card-icon">${q.icon || "✨"}</div>
          <div class="portal-card-tag">${q.card_num || "ASSESSMENT"}</div>
          <h2 class="portal-card-title">${q.title}</h2>
          <p class="portal-card-sub">${q.subtitle.substring(0, 95)}...</p>
        </div>
        <div class="portal-card-cta">
          <span>Start Assessment (45s)</span>
          <span>→</span>
        </div>
      </div>
    `;
  }).join("");

  cardBody.innerHTML = `
    <div class="portal-view">
      <div class="portal-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
}

// Select Quiz From Portal Hub
window.selectQuizFromPortal = function(slug) {
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const newUrl = isLocal ? `/?q=${slug}` : `/${slug}${window.location.search}`;
  window.history.pushState({ slug }, "", newUrl);

  currentQuizData = QUIZ_DATA.quizzes[slug];
  startQuiz();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// ==========================================================================
// DEDICATED QUIZ FUNNEL
// ==========================================================================
function startQuiz() {
  if (!currentQuizData) return;

  currentQuestionIndex = 0;
  userAnswers = [];

  document.title = `${currentQuizData.title} | Zamverse Insights`;

  // Show progress section
  document.getElementById("progressSection").style.display = "block";

  // Update Brand Headers
  document.getElementById("brandBadge").textContent = currentQuizData.badge;
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
