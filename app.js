/**
 * zam-affi-quiz: Dynamic Multi-Quiz Engine
 * Manages URL routing, interactive question flow, realistic calculation state,
 * and high-converting ClickBank Hoplink generation with SubID / Video ID tracking.
 */

// Global state
let currentQuizData = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let targetSubId = "web";

// ClickBank Configuration
const DEFAULT_AFFILIATE = "gnite";

// Embedded fallback config ensuring instant execution
const QUIZ_CATALOG = {
  "affiliate": "gnite",
  "default_quiz": "soulmate",
  "quizzes": {
    "soulmate": {
      "id": "soulmate",
      "slug": "soulmate",
      "vendor": "tinapsc",
      "badge": "✨ Royal Destiny & Soulmate Audit",
      "title": "Who is Your Real-Life Duke of the North?",
      "subtitle": "Answer 4 intuitive questions to uncover your destined partner's archetype and reveal their psychic sketch.",
      "reading_time": "Takes 45 seconds • Instant Report",
      "questions": [
        {
          "question": "When meeting someone new, what catches your attention first?",
          "options": [
            "Their quiet, protective aura and deep gaze",
            "Their warm smile, wit, and effortless charm",
            "Their mysterious past and untamed independence",
            "Their intellectual depth and calm leadership"
          ]
        },
        {
          "question": "What is your biggest unspoken desire in love?",
          "options": [
            "To be fiercely protected and chosen above all else",
            "A deep mental connection where no words are needed",
            "An adventurous partner who pushes me to grow",
            "Unwavering loyalty through life's darkest storms"
          ]
        },
        {
          "question": "How do you intuitively sense when someone is 'The One'?",
          "options": [
            "An inexplicable feeling of familiarity, like we met in a past life",
            "A sense of calm certainty and quiet safety in my chest",
            "Intense emotional and creative sparks that never fade",
            "Synchronistic dreams or gut feelings before we even spoke"
          ]
        },
        {
          "question": "What zodiac element or season do you feel most drawn to?",
          "options": [
            "Winter & Ice (Silent strength, profound loyalty)",
            "Autumn & Fire (Warmth, passion, golden intensity)",
            "Spring & Air (Freedom, quick wit, new beginnings)",
            "Summer & Earth (Steadfast grounding, lush abundance)"
          ]
        }
      ],
      "result": {
        "title": "Your Connection Archetype: The Destined Sovereign",
        "description": "Your intuitive frequency points toward a partner with deep protective instincts, unyielding loyalty, and a profound soul connection. They are likely already in your orbit or about to cross your path within the next moon cycle.",
        "highlight": "98.7% Energy Match Detected",
        "cta_label": "✨ Reveal Your Soulmate's Psychic Sketch Now",
        "cta_subtext": "Official artist sketch & personalized astrological reading ready"
      }
    },
    "love-secret": {
      "id": "love-secret",
      "slug": "love-secret",
      "vendor": "hissecret",
      "badge": "👑 Male Psychology & Hero Instinct Audit",
      "title": "Why Do Men Pull Away? Decode His Hidden Desire",
      "subtitle": "Discover the primal psychological trigger that turns casual attraction into lifelong devotion.",
      "reading_time": "Takes 60 seconds • Private Assessment",
      "questions": [
        {
          "question": "What happens when you open your heart completely to a man?",
          "options": [
            "He seems intensely interested at first, then becomes distant",
            "He treats me like a friend instead of his romantic priority",
            "He has trouble committing and stays emotionally guarded",
            "Things start great, but the passion fizzles out over time"
          ]
        },
        {
          "question": "Which quality makes a woman truly unforgettable in a man's mind?",
          "options": [
            "Making him feel indispensable, like your personal hero",
            "Always being supportive, gentle, and understanding",
            "Keeping an air of mystery and high value",
            "Sharing all the same hobbies and daily routines"
          ]
        },
        {
          "question": "How does he react when you need help or advice?",
          "options": [
            "He lights up and wants to step up and solve it",
            "He seems indifferent or changes the subject",
            "He gets defensive or feels pressured",
            "He listens, but rarely takes protective action"
          ]
        },
        {
          "question": "If you could activate a single psychological instinct in him, which would you choose?",
          "options": [
            "An irresistible urge to pursue me and lock in our future",
            "Complete emotional transparency without fear of vulnerability",
            "A protective devotion where he never looks at anyone else",
            "A deep romantic obsession that grows stronger with age"
          ]
        }
      ],
      "result": {
        "title": "Diagnosis: His 'Hero Instinct' Is Currently Dormant",
        "description": "Men don't fall in love because of physical beauty alone; they commit to women who unlock their deep psychological need to feel essential. Once triggered, distance dissolves into intense devotion.",
        "highlight": "Psychological Trigger Identified: High Receptivity",
        "cta_label": "🔓 Watch The 12-Word Text That Triggers His Devotion",
        "cta_subtext": "Free relationship masterclass by relationship counselor James Bauer"
      }
    },
    "glowup": {
      "id": "glowup",
      "slug": "glowup",
      "vendor": "javaburn",
      "badge": "💎 Villainess Metabolic Glow-Up Audit",
      "title": "What Is Your True Biological Metabolic Score?",
      "subtitle": "Discover the exotic rice & botanical ritual Hollywood and Manhwa heroines use for radiant energy and effortless fat burning.",
      "reading_time": "Takes 45 seconds • Instant Metabolic Blueprint",
      "questions": [
        {
          "question": "When does your energy hit the biggest slump during the day?",
          "options": [
            "Right around 2:00 PM – 4:00 PM (Brain fog & sugar cravings)",
            "Immediately upon waking up, even after 7–8 hours in bed",
            "Late in the evening after dinner",
            "Random bursts of fatigue throughout the entire day"
          ]
        },
        {
          "question": "Where does your body stubbornly hold onto excess weight?",
          "options": [
            "Lower belly and waistline (cortisol & hormone related)",
            "Hips, thighs, and lower body",
            "Overall sluggish puffiness and fluid retention",
            "Upper body and face"
          ]
        },
        {
          "question": "How have traditional restrictive diets worked for you in the past?",
          "options": [
            "I lose a few pounds, but it rebounds the second I stop",
            "My metabolism slows to a crawl, leaving me exhausted",
            "It feels unnatural and causes terrible mood swings",
            "I haven't found a sustainable, natural routine yet"
          ]
        },
        {
          "question": "Are you willing to test a natural 10-second morning botanical ritual?",
          "options": [
            "Yes, absolutely! I want natural, effortless results",
            "Yes, as long as it's backed by clinical research",
            "I'd love to see the research and video explanation first"
          ]
        }
      ],
      "result": {
        "title": "Profile: Low BAT (Brown Adipose Tissue) Activity",
        "description": "Your metabolism isn't broken; modern toxins and stress have simply put your fat-shrinking brown adipose tissue into hibernation. Activating this natural pathway allows your body to burn calories effortlessly 24/7.",
        "highlight": "Potential Metabolic Rebound: +300% Calorie Burn",
        "cta_label": "🌿 Watch The 10-Second Morning Ritual Video",
        "cta_subtext": "Official research presentation by clinical nutritionists"
      }
    },
    "brainwave": {
      "id": "brainwave",
      "slug": "brainwave",
      "vendor": "attractbr",
      "badge": "⚡ System Awakening & Theta Frequency Test",
      "title": "Is Your Real-Life 'System' Unlocked?",
      "subtitle": "Discover which brainwave frequency is holding back your wealth, intuition, and IRL stat boosts.",
      "reading_time": "Takes 60 seconds • Frequency Scan",
      "questions": [
        {
          "question": "If you woke up with an IRL 'Leveling System', which stat would you max out first?",
          "options": [
            "Luck & Wealth Generation (Never worry about money again)",
            "Focus & Mental Acuity (Learn any skill 10x faster)",
            "Charisma & Authority (Command respect and influence)",
            "Stamina & Vitality (Unstoppable drive and physical energy)"
          ]
        },
        {
          "question": "How often do you feel trapped by mental fatigue or overthinking?",
          "options": [
            "Almost daily—my brain refuses to shut down at night",
            "Whenever I try to take big risks or start new ventures",
            "Periodically, when burnout catches up with me",
            "Rarely, but I know I'm operating far below my true potential"
          ]
        },
        {
          "question": "What is the biggest bottleneck between where you are and where you want to be?",
          "options": [
            "Subconscious self-sabotage and limiting beliefs",
            "Lack of high-level financial opportunities and timing",
            "Procrastination and dopamine burnout from screens",
            "Energy drainage from negative environments and people"
          ]
        },
        {
          "question": "Can you listen to a targeted 7-minute audio frequency each morning?",
          "options": [
            "Yes, I can easily listen with headphones during morning routine",
            "Yes, if it's proven by neuroscientists",
            "I want to hear the sound sample first"
          ]
        }
      ],
      "result": {
        "title": "Scan Complete: Theta Brainwave Suppressed by Beta Dominance",
        "description": "Your hippocampus is currently overproducing stressful Beta waves, blocking the intuitive Theta state where true wealth generation, breakthrough creativity, and effortless abundance occur.",
        "highlight": "Neural Awakening Potential: 99.4%",
        "cta_label": "🎧 Activate Your Theta Wave (7-Minute Audio)",
        "cta_subtext": "Official audio frequency demonstration by Columbia neuroscientists"
      }
    }
  }
};

// Initialize App
document.addEventListener("DOMContentLoaded", async () => {
  extractTrackingSubId();
  resolveActiveQuiz();
  renderDirectoryFooter();
  startQuiz();
});

// Extract Tracking Parameters (Video ID, UTM, etc.)
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

// Resolve Active Quiz by Pathname or Query Parameter
function resolveActiveQuiz() {
  const path = window.location.pathname.replace(/^\/|\/$/g, "").toLowerCase();
  const urlParams = new URLSearchParams(window.location.search);
  const queryQuiz = urlParams.get("q") || urlParams.get("quiz");

  let slug = queryQuiz || path || QUIZ_CATALOG.default_quiz;

  // Handle aliases
  if (slug === "" || slug === "index.html") slug = "soulmate";
  if (slug === "love" || slug === "secret" || slug === "hero") slug = "love-secret";
  if (slug === "diet" || slug === "health" || slug === "cinderella") slug = "glowup";
  if (slug === "theta" || slug === "wealth" || slug === "system") slug = "brainwave";

  currentQuizData = QUIZ_CATALOG.quizzes[slug] || QUIZ_CATALOG.quizzes["soulmate"];
  document.title = `${currentQuizData.title} | Zamverse Quiz`;
}

// Start Quiz Rendering
function startQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];

  // Update Brand Headers
  document.getElementById("brandBadge").textContent = currentQuizData.badge;
  document.getElementById("brandTitle").innerHTML = `<span class="highlight">${currentQuizData.title}</span>`;
  document.getElementById("brandSubtitle").textContent = currentQuizData.subtitle;
  document.getElementById("readingTime").textContent = currentQuizData.reading_time;

  renderQuestion();
}

// Render Current Question
function renderQuestion() {
  const cardBody = document.getElementById("quizCardBody");
  const total = currentQuizData.questions.length;
  const current = currentQuestionIndex + 1;
  const percent = Math.round((current / total) * 100);

  // Update Progress
  document.getElementById("progressLabel").textContent = `Question ${current} of ${total}`;
  document.getElementById("progressFill").style.width = `${percent}%`;

  const q = currentQuizData.questions[currentQuestionIndex];

  let optionsHtml = q.options.map((opt, idx) => {
    const text = typeof opt === "string" ? opt : opt.text;
    return `
      <button class="option-btn" onclick="selectOption(${idx})">
        <span>${text}</span>
        <span class="arrow-icon">→</span>
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

// Select an option with smooth transition
window.selectOption = function(optionIndex) {
  userAnswers.push(optionIndex);

  if (currentQuestionIndex < currentQuizData.questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    showCalculationState();
  }
};

// Calculation Screen with Realistic Cycling Status
function showCalculationState() {
  const cardBody = document.getElementById("quizCardBody");
  document.getElementById("progressFill").style.width = "100%";
  document.getElementById("progressLabel").textContent = "Calculating Results";

  const statusMessages = [
    "Analyzing your subconscious responses...",
    "Matching frequency with psychological archetypes...",
    "Calibrating personalized solution roadmap...",
    "Finalizing your confidential report..."
  ];

  cardBody.innerHTML = `
    <div class="calculating-view">
      <div class="pulsing-orb">
        <span style="font-size: 30px;">🔮</span>
      </div>
      <h3 class="calculating-title">Generating Your Report</h3>
      <div class="calculating-status" id="calcStatus">Analyzing responses...</div>
      <div class="calculating-percent" id="calcPercent">38%</div>
    </div>
  `;

  let step = 0;
  let percent = 38;
  const statusEl = document.getElementById("calcStatus");
  const percentEl = document.getElementById("calcPercent");

  const interval = setInterval(() => {
    step++;
    percent += 20;
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
  }, 550);
}

// Show Final Result Card with Hidden / Cloaked Clean Hoplink
function showFinalResult() {
  const cardBody = document.getElementById("quizCardBody");
  const res = currentQuizData.result;
  const affiliate = QUIZ_CATALOG.affiliate || DEFAULT_AFFILIATE;
  const vendor = currentQuizData.vendor;

  // Clean, branded internal URL shown on hover (NO mention of ClickBank)
  const cleanOutboundUrl = `/out/${currentQuizData.slug}?tid=${encodeURIComponent(targetSubId)}`;

  // Obfuscated payload (Base64) for instant client-side fallback
  const rawTarget = `https://hop.clickbank.net/?affiliate=${affiliate}&vendor=${vendor}&tid=${encodeURIComponent(targetSubId)}`;
  const encodedPayload = btoa(rawTarget);

  cardBody.innerHTML = `
    <div class="result-view">
      <div class="result-badge-row">
        <span class="match-chip">⚡ ${res.highlight}</span>
      </div>

      <h2 class="result-title">${res.title}</h2>

      <div class="result-desc-box">
        <p>${res.description}</p>
      </div>

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
    </div>
  `;
}

// Seamless outbound handler ensuring clean UX and fallback
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
  // On Vercel production (quiz.zamverse.com), allow natural navigation to /out/:slug which executes api/out.js 307 redirect
};

// Directory Footer to Switch between Quizzes easily
function renderDirectoryFooter() {
  const container = document.getElementById("directoryChips");
  if (!container) return;

  const currentSlug = currentQuizData.slug;
  const items = Object.values(QUIZ_CATALOG.quizzes).map(q => {
    const activeClass = q.slug === currentSlug ? "active" : "";
    return `<a href="/${q.slug}" class="dir-chip ${activeClass}">${q.badge.split(" ")[0]} ${q.title.split("?")[0].substring(0, 24)}...</a>`;
  }).join("");

  container.innerHTML = items;
}
