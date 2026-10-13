/**
 * Zamverse Studio: YouTube Post & AI Prompt Generator Engine
 * Generates randomized, high-converting YouTube comment formats & 20-comment Master AI Prompts.
 */

// Current State
let currentLang = "en";
let currentLinkMode = "quiz";
let currentVideoId = "web";

// 24 Products Catalog with Angle Data
const PRODUCTS_DATA = {
  // 💖 Group 1: Romance & Male Psychology
  "soulmate": {
    name: "Soulmate Sketch",
    vendor: "tinapsc",
    slug: "soulmate",
    outSlug: "soulmate",
    category: "Romance & Destiny",
    angleEn: "Who is your real-life Duke of the North? Reveal your destined soulmate's psychic sketch.",
    angleVi: "Ai là chàng 'Bắc Cung Công Tước' ngoài đời thực của bạn? Xem bản vẽ tiên tri khuôn mặt chàng.",
    targetTopicEn: "Cold Duke of the North, Protective male leads, Unspoken devotion, Otome romance",
    targetTopicVi: "Nam chính Công Tước Phương Bắc lạnh lùng, Tổng tài bảo vệ âm thầm, Tình cảm định mệnh"
  },
  "love-secret": {
    name: "His Secret Obsession",
    vendor: "hissecret",
    slug: "love-secret",
    outSlug: "love-secret",
    category: "Male Psychology",
    angleEn: "Why do men pull away? Decode the 12-word Hero Instinct trigger that unlocks lifelong devotion.",
    angleVi: "Tại sao đàn ông đột ngột lùi bước? Giải mã tín hiệu 'Bản năng người hùng' khiến chàng cuồng si bạn.",
    targetTopicEn: "Male emotional distance, Hesitant lovers, Misunderstandings, Fierce protective love",
    targetTopicVi: "Nam chính lạnh nhạt, Hiểu lầm tình cảm, Bí mật tâm lý đàn ông, Nữ chính làm chủ cuộc tình"
  },
  "devotion": {
    name: "The Devotion System",
    vendor: "amynorth",
    slug: "devotion",
    outSlug: "devotion",
    category: "Dating & Texting",
    angleEn: "The secret 'Text Chemistry' signals that make any man constantly crave your messages.",
    angleVi: "Kỹ thuật tin nhắn 'Text Chemistry' khiến người đàn ông kiêu kỳ nhất cũng phải nhung nhớ bạn.",
    targetTopicEn: "Flirting, Mysterious female leads, Captivating charisma, Sassy romance banter",
    targetTopicVi: "Nghệ thuật nhắn tin quyến rũ, Nữ chính kiêu kỳ vạn người mê, Tán tỉnh ngọt ngào"
  },
  "ex-factor": {
    name: "The Ex Factor Guide",
    vendor: "brbrowning",
    slug: "ex-factor",
    outSlug: "ex-factor",
    category: "Relationship Healing",
    angleEn: "The reverse psychology playbook to become his unforgettable 'White Moonlight' and reignite lost love.",
    angleVi: "Chiêu bài tâm lý đảo ngược giúp bạn trở thành 'Bạch Nguyệt Quang' không thể lãng quên của người cũ.",
    targetTopicEn: "Breakup regret, Second chance romance, Winning him back, Longing and redemption",
    targetTopicVi: "Gương vỡ lại lành, Hối hận sau chia tay, Người cũ quay lại, Tình yêu tái sinh"
  },

  // 🔮 Group 2: Destiny, Astrology & Tarot
  "numerology": {
    name: "Numerologist Authority",
    vendor: "numerology",
    slug: "numerology",
    outSlug: "numerology",
    category: "Destiny & Numerology",
    angleEn: "Your sacred Life Path Number decoded: What does your birth date reveal about your romantic destiny?",
    angleVi: "Bí mật ngày sinh theo Thần số học: Con số linh hồn nào định sẵn đường tình duyên hoàng gia của bạn?",
    targetTopicEn: "Destiny, Karmic cycles, Soulmate timing, Life purpose, Royal astrology",
    targetTopicVi: "Thần số học ngày sinh, Chu kỳ nhân duyên, Vận mệnh hoàng gia, Tình duyên định sẵn"
  },
  "astrology": {
    name: "Astrology Reading",
    vendor: "astroread",
    slug: "astrology",
    outSlug: "astrology",
    category: "Astrology & Star Chart",
    angleEn: "Your natal star chart reading: When will your destined partner arrive this astrological season?",
    angleVi: "Bản đồ sao chiêm tinh cá nhân: Hành tinh nào cai quản cung phu thê và thời điểm gặp định mệnh?",
    targetTopicEn: "Zodiac signs, Planetary alignment, Star charts, Destined lovers, Cosmic fate",
    targetTopicVi: "Cung hoàng đạo, Bản đồ sao, Dự báo chiêm tinh tình yêu, Duyên số trời định"
  },
  "aura": {
    name: "Aura Manifestation",
    vendor: "auraread",
    slug: "aura",
    outSlug: "aura",
    category: "Energy & Charm",
    angleEn: "What color is your inner aura? Unlock the magnetic feminine energy that commands unconditional adoration.",
    angleVi: "Màu sắc hào quang của bạn là gì? Kích hoạt trường năng lượng thu hút tình yêu và sự may mắn.",
    targetTopicEn: "Feminine allure, Radiant presence, Magnetic attraction, Spiritual energy, Empress vibes",
    targetTopicVi: "Khí chất nữ thần, Năng lượng hào quang quyến rũ, Sức hút nữ tính vô hình"
  },
  "mind-movies": {
    name: "Mind Movies 4.0",
    vendor: "mindmovies",
    slug: "mind-movies",
    outSlug: "mind-movies",
    category: "Manifestation & Subconscious",
    angleEn: "Manifest your dream romantic life and royal abundance with 3-minute subconscious visualization.",
    angleVi: "Cài đặt câu chuyện tình yêu quý tộc và cuộc sống trong mơ vào tiềm thức với video 3 phút mỗi ngày.",
    targetTopicEn: "Law of attraction, Visualizing dream life, Subconscious leveling, Queen lifestyle",
    targetTopicVi: "Luật hấp dẫn, Cuộc sống hoàng gia trong mơ, Tự do tài chính, Tình yêu viên mãn"
  },

  // 👑 Group 3: Cinderella Glow-Up & Metabolism
  "coffee-ritual": {
    name: "Java Burn (Coffee Ritual)",
    vendor: "javaburn",
    slug: "glowup",
    outSlug: "coffee-ritual",
    category: "Metabolic Glow-Up",
    angleEn: "The effortless 10-second morning coffee ritual that reignites dormant metabolism and waistline slimming.",
    angleVi: "Mẹo 10 giây thêm vào cà phê sáng: Đánh thức chỉ số trao đổi chất ngủ đông, eo thon dáng ngọc tự nhiên.",
    targetTopicEn: "Cinderella transformation, Rebirth glow-up, Effortless beauty, Metabolic awakening",
    targetTopicVi: "Nữ chính lột xác xinh đẹp, Trùng sinh đổi vận, Giảm mỡ bụng nhẹ nhàng, Dáng chuẩn tiểu thư"
  },
  "tea-burn": {
    name: "Tea Burn (Herbal Elixir)",
    vendor: "teaburn",
    slug: "tea-burn",
    outSlug: "tea-burn",
    category: "Royal Tea Ritual",
    angleEn: "The royal afternoon tea secret that dissolves stubborn belly fat and revitalizes dewy skin radiance.",
    angleVi: "Bí quyết uống trà cung đình: Công thức đánh tan mỡ thừa vùng eo và giúp da dẻ mịn màng sáng hồng.",
    targetTopicEn: "Noble afternoon tea, Korean glass skin, Flat tummy, Gentle botanical wellness",
    targetTopicVi: "Trà chiều quý tộc, Da sáng căng bóng, Vòng eo con kiến, Thảo mộc tự nhiên"
  },
  "belly-juice": {
    name: "Ikaria Lean Belly Juice",
    vendor: "lbjuice",
    slug: "belly-juice",
    outSlug: "belly-juice",
    category: "Detox & Slimming",
    angleEn: "The ancient Mediterranean elixir that neutralizes stress-induced cortisol fat around the lower waist.",
    angleVi: "Nước ép thảo dược Hy Lạp: Giải phóng mỡ bụng cứng đầu do căng thẳng cortisol của phụ nữ quý tộc.",
    targetTopicEn: "Stress fat flush, Flat stomach, Ancient royal remedies, Natural vitality",
    targetTopicVi: "Xóa tan mỡ bụng do stress, Bụng phẳng nhẹ nhõm, Công thức thảo dược cổ truyền"
  },
  "lean-biome": {
    name: "LeanBiome for Women",
    vendor: "leanbiome",
    slug: "lean-biome",
    outSlug: "lean-biome",
    category: "Microbiome Slimming",
    angleEn: "The 'Lean Bacteria' secret: Why some women eat whatever they want and naturally maintain a slender waist.",
    angleVi: "Tại sao có người ăn mãi không béo? Bí mật bổ sung lợi khuẩn 'Lean Microbiome' cho vóc dáng tiểu thư.",
    targetTopicEn: "Gut-brain axis, Slender genetics, Healthy appetite without deprivation, Lady figure",
    targetTopicVi: "Vóc dáng mình hạc xương mai, Lợi khuẩn đường ruột thon gọn, Ăn ngon không lo tăng cân"
  },
  "mitolyn": {
    name: "Mitolyn Cellular Rebirth",
    vendor: "mitolyn",
    slug: "mitolyn",
    outSlug: "mitolyn",
    category: "Cellular Energy",
    angleEn: "Recharge your cellular mitochondria to restore youthful fat-burning speed and boundless vitality.",
    angleVi: "Nạp năng lượng cho ty thể tế bào: Phục hồi sự tươi trẻ và tốc độ đốt calo như thuở đôi mươi.",
    targetTopicEn: "Rejuvenation, Youthful energy, Beating chronic fatigue, Radiant glow",
    targetTopicVi: "Trẻ hóa tế bào, Đập tan mệt mỏi uể oải, Tươi tắn rạng ngời mỗi ngày"
  },
  "liv-pure": {
    name: "Liv Pure Mediterranean Detox",
    vendor: "livpure",
    slug: "liv-pure",
    outSlug: "liv-pure",
    category: "Liver Detox & Skin",
    angleEn: "Purify liver detox pathways to flush stubborn visceral fat and bring out natural skin luminosity.",
    angleVi: "Thanh lọc cơ thể từ gốc: Thải độc gan sâu giúp làn da sáng hồng hào và tiêu hao mỡ nội tạng.",
    targetTopicEn: "Deep inner cleansing, Glowing complexion, Clearing skin toxins, Health transformation",
    targetTopicVi: "Thải độc sáng da, Da hồng hào khỏe mạnh, Tiêu mỡ tự nhiên từ bên trong"
  },
  "alpilean": {
    name: "Alpilean Alpine Ice Hack",
    vendor: "alpilean",
    slug: "alpilean",
    outSlug: "alpilean",
    category: "Thermogenesis",
    angleEn: "The Alpine temperature secret that controls core body thermogenesis to burn calories even while sleeping.",
    angleVi: "Bí quyết nhiệt độ lõi cơ thể từ dãy Alps giúp kích hoạt đốt calo tự nhiên ngay cả trong lúc ngủ.",
    targetTopicEn: "Overnight calorie burn, Alpine nature secret, Deep metabolic reset",
    targetTopicVi: "Đốt mỡ khi ngủ, Bí quyết thiên nhiên vùng núi tuyết, Thon gọn nhẹ nhàng"
  },
  "prodentim": {
    name: "ProDentim Radiant Smile",
    vendor: "prodentim",
    slug: "prodentim",
    outSlug: "prodentim",
    category: "Smile & Beauty",
    angleEn: "The 3.5 billion probiotic secret for a luminous female-lead smile and irresistibly sweet breath.",
    angleVi: "Nụ cười tỏa nắng chuẩn nữ chính: 3.5 tỷ lợi khuẩn cho răng trắng sáng và hơi thở ngọt ngào cuốn hút.",
    targetTopicEn: "Heroine glowing smile, White teeth, Fresh breath, Unforgettable romantic charm",
    targetTopicVi: "Nụ cười nữ chính truyện tranh, Răng trắng sáng tự nhiên, Hơi thở thơm ngát tự tin"
  },
  "beauty-sleep": {
    name: "Revive Daily Beauty Sleep",
    vendor: "revive",
    slug: "beauty-sleep",
    outSlug: "beauty-sleep",
    category: "Beauty Sleep & HGH",
    angleEn: "The bedtime botanical drink that promotes tranquil sleep and restores youthful anti-aging hormones.",
    angleVi: "Giấc ngủ làm đẹp chuẩn tiểu thư: Thảo dược giúp ngủ sâu êm đềm, kích hoạt hormone trẻ hóa da suốt đêm.",
    targetTopicEn: "Sleeping beauty, Restful nights without overthinking, Morning freshness, Youthful renewal",
    targetTopicVi: "Giấc ngủ ngon không mộng mị, Hết trằn trọc âu lo, Sáng dậy tươi tắn trẻ trung"
  },
  "gut-vita": {
    name: "Gut Vita Balance",
    vendor: "gutvita",
    slug: "gut-vita",
    outSlug: "gut-vita",
    category: "Digestion & Bloat",
    angleEn: "Gentle herbal relief for a flat stomach: Eliminate uncomfortable post-meal heaviness and bloating.",
    angleVi: "Giải pháp êm dịu cho chiếc bụng phẳng lì: Hết cảm giác nặng nề, khó tiêu sau mỗi bữa ăn.",
    targetTopicEn: "Light feeling, Flat tummy, Zero bloating, Gentle feminine digestion",
    targetTopicVi: "Bụng nhẹ tênh, Êm dịu đường tiêu hóa, Hết đầy hơi khó chịu"
  },

  // ⚡ Group 4: Mindset, Focus & Wealth
  "brainwave": {
    name: "Billionaire Brain Wave",
    vendor: "attractbr",
    slug: "brainwave",
    outSlug: "brainwave",
    category: "Theta Frequency",
    angleEn: "Unlock your real-life 'System' with the 7-minute Theta brainwave frequency for effortless luck and wealth.",
    angleVi: "Khai mở chỉ số 'May mắn & Tài lộc' như nhân vật mở khóa Hệ thống: Tần số sóng não Theta 7 phút.",
    targetTopicEn: "System leveling, Unlocking IRL stat boosts, Luck attraction, High-tier abundance",
    targetTopicVi: "Mở khóa Hệ Thống ngoài đời thực, Tăng chỉ số may mắn, Sóng não thịnh vượng"
  },
  "wealth-dna": {
    name: "Wealth DNA Code",
    vendor: "wealthdna",
    slug: "wealth-dna",
    outSlug: "wealth-dna",
    category: "Spiritual Wealth",
    angleEn: "Activate your root chakra wealth vibration to attract noble opportunities and financial sovereign freedom.",
    angleVi: "Đánh thức tần số tâm linh thu hút cơ hội và sự sung túc đủ đầy của tầng lớp thượng lưu.",
    targetTopicEn: "Sovereign wealth, Royal mindset, Elevating financial frequency, Rebirth abundance",
    targetTopicVi: "Tần số tài lộc hoàng gia, Tư duy quý tộc, Đón nhận cơ hội vàng, Tự do tài chính"
  },
  "neuro-zoom": {
    name: "NeuroZoom Cognitive Shield",
    vendor: "neurozoom",
    slug: "neuro-zoom",
    outSlug: "neuro-zoom",
    category: "Brain & Focus",
    angleEn: "Boost your IRL 'Intelligence (INT)' stat: 35-in-1 cognitive formula to crush brain fog and master skills 10x faster.",
    angleVi: "Nâng cấp chỉ số 'Trí tuệ' (INT): Đập tan sương mù não bộ, tập trung học tập và làm việc như nữ phụ thông thái.",
    targetTopicEn: "Genius female lead, Laser focus, Deep study stamina, Memory boost, Intellectual power",
    targetTopicVi: "Trí tuệ minh mẫn siêu phàm, Tập trung cao độ, Trí nhớ sắc bén, Học đâu hiểu đó"
  },
  "cortexi": {
    name: "Cortexi Cognitive & Hearing",
    vendor: "cortexi",
    slug: "cortexi",
    outSlug: "cortexi",
    category: "Cognitive Acuity",
    angleEn: "Nourish neural clarity and sharp auditory wellness for calm, laser-focused composure under pressure.",
    angleVi: "Bảo vệ đôi tai và sự minh mẫn: Tăng khả năng tiếp nhận thông tin và duy trì sự sắc sảo mỗi ngày.",
    targetTopicEn: "Composure, Sharp senses, Mental sharpness, Inner calm under chaos",
    targetTopicVi: "Giác quan nhạy bén, Đầu óc thông suốt, Phong thái bình tĩnh đĩnh đạc"
  },
  "audisoothe": {
    name: "AudiSoothe Calming",
    vendor: "audifort",
    slug: "audisoothe",
    outSlug: "audisoothe",
    category: "Nerve Tranquility",
    angleEn: "Quiet annoying mental buzzing and soothe exhausted nerves after long hours in front of screens.",
    angleVi: "Xoa dịu dây thần kinh, đem lại sự tĩnh lặng tuyệt đối cho tâm trí sau những giờ xem màn hình căng thẳng.",
    targetTopicEn: "Peaceful quiet, Screen fatigue relief, Calming overworked nerves, Mind reset",
    targetTopicVi: "Bình yên cho tâm trí, Hết ong ong mệt mỏi, Thư giãn sau giờ đọc truyện"
  },
  "zeneara": {
    name: "Zeneara Vitality Balance",
    vendor: "zeneara",
    slug: "zeneara",
    outSlug: "zeneara",
    category: "Emotional Peace",
    angleEn: "Restore inner nervous balance to dissolve anxious overthinking and embody the grace of a calm noblewoman.",
    angleVi: "Cân bằng lại nhịp sống: Giúp bạn tìm lại sự thư thái, tĩnh tại và sự tự tin của một quý cô điềm đạm.",
    targetTopicEn: "Graceful elegance, Overcoming anxiety, Emotional balance, Poised noble lady",
    targetTopicVi: "Khí chất điềm đạm quý phái, Dứt điểm âu lo suy nghĩ nhiều, Tĩnh tâm an lạc"
  }
};

// Shuffling helper
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Parse Video ID from raw URL or string
function parseYouTubeId(input) {
  if (!input) return "web";
  const trimmed = input.trim();
  
  // Patterns for youtu.be, youtube.com/watch?v=, youtube.com/shorts/
  const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/);
  if (match && match[1]) {
    return match[1];
  }

  // If user pasted raw ID (usually 11 chars or alphanumeric)
  const cleaned = trimmed.replace(/[^a-zA-Z0-9_-]/g, "");
  return cleaned || "web";
}

// Handlers
window.onVideoInputChanged = function(val) {
  const parsed = parseYouTubeId(val);
  currentVideoId = parsed;
  const display = document.getElementById("detectedVidDisplay");
  if (display) {
    display.textContent = parsed !== "web" ? parsed : "Chưa nhập (Mặc định: web)";
  }
  generateOutputs();
};

window.toggleLang = function(lang) {
  currentLang = lang;
  document.getElementById("langEnLabel").classList.toggle("active", lang === "en");
  document.getElementById("langViLabel").classList.toggle("active", lang === "vi");
  generateOutputs();
};

window.toggleLinkMode = function(mode) {
  currentLinkMode = mode;
  document.getElementById("modeQuizLabel").classList.toggle("active", mode === "quiz");
  document.getElementById("modeDirectLabel").classList.toggle("active", mode === "direct");
  generateOutputs();
};

window.switchTab = function(tab) {
  const readyTab = document.getElementById("readyPostsTab");
  const aiTab = document.getElementById("aiPromptTab");
  const tabReadyBtn = document.getElementById("tabReadyBtn");
  const tabAiBtn = document.getElementById("tabAiBtn");

  if (tab === "ready") {
    readyTab.style.display = "block";
    aiTab.style.display = "none";
    tabReadyBtn.classList.add("active");
    tabAiBtn.classList.remove("active");
  } else {
    readyTab.style.display = "none";
    aiTab.style.display = "block";
    tabReadyBtn.classList.remove("active");
    tabAiBtn.classList.add("active");
    generateAiPrompt();
  }
};

window.switchToAiTab = function() {
  switchTab("ai");
  document.getElementById("aiPromptTab").scrollIntoView({ behavior: "smooth" });
};

window.randomizeVariants = function() {
  switchTab("ready");
  generateOutputs();
  
  // Highlight flash
  const outputSection = document.getElementById("readyPostsTab");
  outputSection.style.opacity = "0.5";
  setTimeout(() => {
    outputSection.style.opacity = "1";
  }, 150);
};

// ============================================================================
// MAIN GENERATOR LOGIC
// ============================================================================
function generateOutputs() {
  const prodKey = document.getElementById("productSelect").value || "soulmate";
  const p = PRODUCTS_DATA[prodKey] || PRODUCTS_DATA["soulmate"];
  const vid = currentVideoId || "web";

  // Build Target Link
  let finalLink = "";
  if (currentLinkMode === "quiz") {
    finalLink = `https://quiz.zamverse.com/${p.slug}?v=${vid}`;
  } else {
    finalLink = `https://quiz.zamverse.com/out/${p.outSlug}?tid=${vid}`;
  }

  if (currentLang === "en") {
    generateEnglishVariants(p, finalLink);
  } else {
    generateVietnameseVariants(p, finalLink);
  }

  generateAiPrompt();
}

// ----------------------------------------------------------------------------
// ENGLISH VARIANTS (RANDOMIZED POOLS)
// ----------------------------------------------------------------------------
function generateEnglishVariants(p, link) {
  // Pool 1: Emotional Hook Openers
  const emotionalOpeners = [
    `The way he looked at her in this scene spoke louder than a thousand words... 🥹❤️`,
    `Can we just take a moment to appreciate this chapter? My heart actually skipped a beat... 🥺✨`,
    `The unspoken devotion between them in this episode is everything I've ever wanted... 😭💖`,
    `That protective stare gave me literal chills. He would burn down the whole kingdom for her... 👑🔥`,
    `Watching them navigate this misunderstanding broke my heart and healed it all at once... 💔❤️`
  ];

  // Pool 2: Bridge Questions
  const bridgeQuestions = [
    `✨ For our romantic readers who believe in true soulmate connections:\nEver wonder what kind of destined archetype is written in your stars?`,
    `👑 Quick question for the ladies watching:\nIf you could meet your real-life counterpart to this story, what kind of energy would they have?`,
    `🔮 If you love deep romantic resonance as much as I do:\nThere's a quick intuitive test that reveals the exact archetype destined for you:`,
    `💫 A fun little gift for our lovely community:\nTake this 45-second private assessment to uncover your personalized romantic reading:`
  ];

  // Pool 3: Community Debate Openers
  const debateOpeners = [
    `Question of the day for our romance readers: If you were in her shoes, would you forgive him after what he did? 🤔💭`,
    `Let's be completely honest in the comments: Is he acting out of pride, or is he terrified of getting hurt? 💬👇`,
    `Unpopular opinion: He loved her from chapter one, he was just terrible at showing his feelings! What do you think? 🧐❤️`,
    `Be honest: Which male lead archetype would YOU choose in real life? The cold protective duke or the charming prince? ⚔️✨`
  ];

  // Pool 4: Curious / Shockingly Accurate Hooks
  const curiosityHooks = [
    `Someone shared this intuitive archetype test in our Discord last night and it was SHOCKINGLY accurate... 😳🔮`,
    `I normally don't do online quizzes, but the psychological accuracy of this one gave me literal goosebumps... 🫣✨`,
    `If you've been seeing repeating synchronicities lately, this personalized reading will feel like someone read your diary... 🌙🗝️`,
    `Did this test yesterday out of pure curiosity and it described my exact relationship pattern down to the detail: 🤯💫`
  ];

  // Pool 5: Guarantees / Sub-notes
  const subnotes = [
    `(100% free • Takes 45 seconds • Instant private reading ✨)`,
    `(Confidential & free • Takes under a minute • Shockingly deep 🔮)`,
    `(Instant personalized result • No signup required • Have fun! 💖)`,
    `(Takes 60 seconds • Made specifically for romantic souls 👑)`
  ];

  // Variant 1: Emotional Hook
  const v1 = `${pickRandom(emotionalOpeners)}

${pickRandom(bridgeQuestions)}
👉 ${link}

${pickRandom(subnotes)}`;

  // Variant 2: Community Debate
  const v2 = `${pickRandom(debateOpeners)}

Drop your thoughts below! And while you're here, check out your own romantic archetype test:
👉 ${link}
${pickRandom(subnotes)}`;

  // Variant 3: Shocking Curiosity
  const v3 = `${pickRandom(curiosityHooks)}

Curious about your own result? Take the 45-second test here:
👉 ${link}

(Drop your archetype in the comments below! I want to see who else got mine 👇)`;

  // Variant 4: Short & Punchy (Shorts / Community)
  const v4 = `Who is your real-life destined archetype? 👑✨
Take the 45-second private quiz to uncover your personalized report:
👉 ${link}`;

  // Variant 5: Top 3 Lines Description
  const v5 = `✨ Who is your destined partner? Take the free assessment: ${link}
📖 Today's Manhwa Chapter Recap & Deep Dive Analysis.
🔔 Don't forget to Like, Subscribe, and leave your thoughts in the comments!`;

  // Render to UI
  document.getElementById("res1").textContent = v1;
  document.getElementById("res2").textContent = v2;
  document.getElementById("res3").textContent = v3;
  document.getElementById("res4").textContent = v4;
  document.getElementById("res5").textContent = v5;
}

// ----------------------------------------------------------------------------
// VIETNAMESE VARIANTS (RANDOMIZED POOLS)
// ----------------------------------------------------------------------------
function generateVietnameseVariants(p, link) {
  const emotionalOpenersVi = [
    `Ánh mắt nam chính nhìn cô ấy trong tập này ấm áp xao xuyến thực sự... 🥹❤️`,
    `Có ai xem đến đoạn này mà tim đập thình thịch như mình không? Cảm giác được che chở đúng đỉnh chóp... 🥺✨`,
    `Sự nuông chiều âm thầm của chàng quả thật là ước mơ của mọi cô gái... 😭💖`,
    `Nam chính ngoài lạnh trong nóng thế này ai mà cưỡng lại nổi chứ! 👑🔥`
  ];

  const bridgeQuestionsVi = [
    `✨ Dành cho các bạn fan mê truyện ngôn tình & hoàng gia:\nĐã bao giờ bạn tự hỏi mẫu 'Bắc Cung Công Tước' ngoài đời thực của mình sẽ là ai chưa?`,
    `👑 Một bài trắc nghiệm vui 45 giây cho độc giả:\nKhám phá mẫu người yêu tiền định và lá số tình duyên của bạn tại đây:`,
    `🔮 Tặng các bạn một bài test trực giác thú vị:\nGiải mã tần số cảm xúc và tìm ra chàng trai định mệnh của bạn:`,
    `💫 Bật mí cho các nàng xem truyện:\nLàm bài kiểm tra tâm lý ngắn 45 giây để xem chân dung và tính cách người ấy:`
  ];

  const debateOpenersVi = [
    `Hỏi thật các bạn: Nếu ở vào vị trí của nữ chính, bạn có tha thứ cho nam chính sau tất cả những gì anh ấy đã làm không? 🤔💭`,
    `Anh ấy làm vậy là vì kiêu ngạo hay vì quá sợ mất cô ấy? Mọi người nghĩ sao, chia sẻ ở dưới nhé! 💬👇`,
    `Mọi người thích gu nam chính lạnh lùng bảo vệ âm thầm hay hoàng tử ấm áp dịu dàng hơn? ⚔️✨`
  ];

  const curiosityHooksVi = [
    `Hôm qua mình làm thử bài test tính cách này mà ngỡ ngàng vì trúng tim đen từng li từng tí... 😳🔮`,
    `Đoán chuẩn đến mức nổi da gà luôn! Bài test trực giác này mô tả đúng hệt gu người yêu của mình: 🤯✨`,
    `Không ngờ có bài trắc nghiệm tâm lý đoán đúng cảm xúc của mình lúc này đến thế... 🌙🗝️`
  ];

  const subnotesVi = [
    `(Hoàn toàn miễn phí • Chỉ mất 45 giây • Kết quả tức thì ✨)`,
    `(Bảo mật 100% • Khám phá thú vị • Xem kết quả ngay 💖)`,
    `(Làm test nhanh 45s • Đoán trúng tính cách bất ngờ 🔮)`
  ];

  const v1 = `${pickRandom(emotionalOpenersVi)}

${pickRandom(bridgeQuestionsVi)}
👉 ${link}

${pickRandom(subnotesVi)}`;

  const v2 = `${pickRandom(debateOpenersVi)}

Bình luận góc nhìn của bạn bên dưới nhé! Và đừng quên khám phá bài trắc nghiệm nhân duyên của riêng bạn:
👉 ${link}
${pickRandom(subnotesVi)}`;

  const v3 = `${pickRandom(curiosityHooksVi)}

Các bạn tò mò kết quả của mình thì thử làm bài test 45 giây này xem nhé:
👉 ${link}

(Làm xong nhớ comment kết quả bên dưới xem ai trùng cung hoàng đạo với mình nha 👇)`;

  const v4 = `Ai là chàng 'Bắc Cung Công Tước' ngoài đời thực của bạn? 👑✨
Làm bài test 45 giây giải mã nhân duyên tại đây:
👉 ${link}`;

  const v5 = `✨ Ai là người yêu định mệnh của bạn? Xem kết quả bài test miễn phí: ${link}
📖 Tóm tắt & Phân tích chi tiết tập truyện Manhwa hôm nay.
🔔 Nhớ Like và Đăng Ký Kênh để không bỏ lỡ tập tiếp theo nhé!`;

  document.getElementById("res1").textContent = v1;
  document.getElementById("res2").textContent = v2;
  document.getElementById("res3").textContent = v3;
  document.getElementById("res4").textContent = v4;
  document.getElementById("res5").textContent = v5;
}

// ============================================================================
// AI MEGA-PROMPT GENERATOR (20 COMMENTS)
// ============================================================================
function generateAiPrompt() {
  const prodKey = document.getElementById("productSelect").value || "soulmate";
  const p = PRODUCTS_DATA[prodKey] || PRODUCTS_DATA["soulmate"];
  const vid = currentVideoId || "web";

  let finalLink = "";
  if (currentLinkMode === "quiz") {
    finalLink = `https://quiz.zamverse.com/${p.slug}?v=${vid}`;
  } else {
    finalLink = `https://quiz.zamverse.com/out/${p.outSlug}?tid=${vid}`;
  }

  const promptText = `You are a world-class YouTube Community Manager and Direct Response Copywriter specializing in female romance manga / manhwa / webtoon recap channels.

TARGET CHANNEL NICHE:
- Audience: 85%+ Female readers, aged 18–35.
- Interests: Otome Isekai, Cold Duke of the North, Protective male leads, Villainess reincarnation, Cinderella glow-up, Soulmate destiny, Tarot, Astrology, and Romantic drama.
- Vibe: Emotional, cozy, relatable, high-engagement, passionate, protective of female leads.

YOUR TASK:
Write exactly 20 DISTINCT, highly engaging, natural-sounding YouTube Pinned Comments to pin at the top of our manga recap videos. Every comment must feel like a genuine channel host or fellow fangirl speaking, and smoothly bridge the video's emotional high into the following interactive link:

OFFER / DESTINATION DETAILS:
- Product: ${p.name} (Category: ${p.category})
- Unique Selling Angle: ${currentLang === "en" ? p.angleEn : p.angleVi}
- Relevant Video Tropes: ${currentLang === "en" ? p.targetTopicEn : p.targetTopicVi}
- The Exact Link to Embed in every comment:
  ${finalLink}

LANGUAGE REQUIREMENT:
Generate all 20 comments in ${currentLang === "en" ? "ENGLISH" : "VIETNAMESE (Tiếng Việt tự nhiên, hợp gu giới trẻ đọc truyện)"}.

STRUCTURE THE 20 COMMENTS INTO 5 DISTINCT CATEGORIES (4 comments per category):

1. CATEGORY 1: Deep Emotional & Character-Connected (Hooks into the male lead's devotion or heartbreak)
   - 4 Comments that start with a touching observation about the chapter, then bridge to the link.

2. CATEGORY 2: Playful, Sassy & Debate-Provoking (Drives comment section arguments & replies)
   - 4 Comments asking a spicy question about the female lead's choices or the male lead's red/green flags.

3. CATEGORY 3: Psychological & "Shockingly Accurate" (Taps into curiosity & the Barnum effect)
   - 4 Comments emphasizing how uncanny and accurate the assessment was for other viewers.

4. CATEGORY 4: Wholesome & Sisterly Community Gifts (Friendly recommendation style)
   - 4 Comments written as a sweet gift or fun relaxation activity for the viewers.

5. CATEGORY 5: Short, Punchy & High-Impact (Ideal for YouTube Shorts, Community Posts, or Mobile users)
   - 4 Concise 2-to-3-line comments that drive maximum click-through rate.

STRICT GUIDELINES:
- DO NOT use cheesy, salesy infomercial language (Never say "Buy now", "Special discount", "Click here to purchase").
- Frame the link as an interactive, fun, 100% free intuitive test or confidential reading.
- Include natural emojis (✨, 🥹, 👑, 🔮, 💖, 👇) placed tastefully.
- Every single comment MUST contain the exact link: ${finalLink}

Please generate the 20 numbered comments now:`;

  const outputEl = document.getElementById("aiPromptOutput");
  if (outputEl) {
    outputEl.value = promptText;
  }
}

// Copy Helper
window.copyResultText = function(btn, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  navigator.clipboard.writeText(el.textContent).then(() => {
    const originalText = btn.textContent;
    btn.textContent = "✅ Đã Copy!";
    btn.classList.add("copied");

    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove("copied");
    }, 2000);
  });
};

window.copyAiPrompt = function(btn) {
  const textarea = document.getElementById("aiPromptOutput");
  if (!textarea) return;

  textarea.select();
  navigator.clipboard.writeText(textarea.value).then(() => {
    const originalText = btn.textContent;
    btn.textContent = "✅ Đã Copy Master Prompt!";
    btn.classList.add("copied");

    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove("copied");
    }, 2500);
  });
};

// Initialize on Load
document.addEventListener("DOMContentLoaded", () => {
  // Check URL params for prefilled video id
  const params = new URLSearchParams(window.location.search);
  const prefillVid = params.get("v") || params.get("vid");
  if (prefillVid) {
    const input = document.getElementById("videoInput");
    if (input) {
      input.value = prefillVid;
      onVideoInputChanged(prefillVid);
    }
  } else {
    generateOutputs();
  }
});
