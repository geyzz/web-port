const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../src/components/Desk3DViewer.jsx');
let content = fs.readFileSync(targetFile, 'utf8');

const markerStart = '// ── PORTFOLIO DISPLAY IN LANDSCAPE TABLET FORM (DIRECTLY ON MONITOR SCREEN, 0 POPUPS) ──';
const markerEnd = '// CERTIFICATES DISPLAY ON 34" CURVED ULTRAWIDE MONITOR';

const startIndex = content.indexOf(markerStart);
const endIndex = content.indexOf(markerEnd);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find markers:', { startIndex, endIndex });
  process.exit(1);
}

const replacementCode = `// ── REAL PROJECT ASSETS CACHE & PRELOADER (LITERAL GITHUB & SHIPPED BUILDS) ──
const PROJECT_SCREEN_ASSETS = {
  planedHome: '/projects/planed-home.jpg',
  planedMalls: '/projects/planed-malls.jpg',
  planedCalendar: '/projects/planed-calendar.jpg',
  planedBanner: '/projects/planed-banner.png',
  cjProperty1: '/projects/cj-property1.jpg',
  cjProperty2: '/projects/cj-property2.png',
  cjProperty3: '/projects/cj-property3.jpg',
  cjAboutBg: '/projects/cj-about-bg.jpg',
  hautogoEmblem: '/projects/hautogo-4.jpg',
  hautogoSupabase1: '/projects/hautogo-1.png',
  hautogoSupabase2: '/projects/hautogo-2.png',
  hautogoSupabase3: '/projects/hautogo-3.png',
};

const cachedProjectScreenImages = {};
const registeredPortfolioCanvases = [];
let onProjectImagesLoadedListener = null;

function preloadProjectScreenImages() {
  if (typeof window === 'undefined') return;
  Object.entries(PROJECT_SCREEN_ASSETS).forEach(([key, src]) => {
    if (!cachedProjectScreenImages[key]) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => {
        cachedProjectScreenImages[key] = img;
        if (onProjectImagesLoadedListener) {
          onProjectImagesLoadedListener();
        }
      };
      cachedProjectScreenImages[key] = img;
    }
  });
}

// ── LITERAL PROJECT RENDERING ON 34" CURVED ULTRAWIDE MONITOR ──
function drawProjectScreenOnCanvas(canvas, projectIndex = 0) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  const projects = [
    {
      title: 'Plan_.ed - Shopping & Errand Planner App',
      subtitle: 'Smart Shopping & Real-Time Errand Management with Alarms',
      tag: 'MOBILE APP • REACT NATIVE & EXPO',
      desc: 'Smart mobile shopping & errand manager featuring custom light/dark themes, collapsible headers, 4-mall live cost calculations, and native reminder alarms.',
      accent: '#d6b349',
      accentGlow: 'rgba(214, 179, 73, 0.4)',
      repo: 'github.com/geyzz/shopping-planner',
    },
    {
      title: 'C&J Real Estate - Property Showcase Website',
      subtitle: 'Luxury Estates & Central Luzon Architectural Showroom',
      tag: 'WEB APP • REACT & CSS3',
      desc: 'Single-page real estate property website crafted with custom brand identity, trapezoid navigation, hero showcase, property filters, and glassmorphic cards.',
      accent: '#4F6D3A',
      accentGlow: 'rgba(79, 109, 58, 0.4)',
      repo: 'github.com/geyzz/real-estate',
    },
    {
      title: 'HAUtogo - University Faculty Tracking & Class Management',
      subtitle: 'Holy Angel University Geofence & Real-Time Faculty Radar',
      tag: 'MOBILE APP • FLUTTER, DART & SUPABASE',
      desc: 'Official campus utility app for Holy Angel University with GPS geofencing, real-time professor room availability, next-class alerts, and live Supabase telemetry.',
      accent: '#991b1b',
      accentGlow: 'rgba(153, 27, 27, 0.4)',
      repo: 'github.com/geyzz/HAUtogo',
    },
  ];

  const cur = projects[projectIndex % projects.length];

  // 1. Deep workstation background with ambient vignette
  ctx.fillStyle = '#06080e';
  ctx.fillRect(0, 0, w, h);

  const radial = ctx.createRadialGradient(1024, 460, 150, 1024, 460, 950);
  radial.addColorStop(0, cur.accent + '28');
  radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, w, h);

  // 2. Top Workstation Header Bar (height 56)
  ctx.fillStyle = '#0a0e18';
  ctx.fillRect(0, 0, w, 56);

  // macOS window dots
  ctx.fillStyle = '#ff5f56';
  ctx.beginPath(); ctx.arc(36, 28, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffbd2e';
  ctx.beginPath(); ctx.arc(60, 28, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#27c93f';
  ctx.beginPath(); ctx.arc(84, 28, 7, 0, Math.PI * 2); ctx.fill();

  ctx.font = 'bold 14px "SF Mono", Menlo, Consolas, monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('curved-ultrawide-34inch • ghayzelle@galaxy-book2: ~/portfolio-showcase', 120, 33);

  // Center navigation tabs
  const tabs = [
    { label: 'Technical Skills', active: false, x: 920, w: 140 },
    { label: 'Portfolio: ACTIVE', active: true, x: 1075, w: 155 },
    { label: 'Certificates', active: false, x: 1245, w: 125 },
    { label: 'Resume', active: false, x: 1385, w: 95 },
  ];

  tabs.forEach((tab) => {
    if (tab.active) {
      ctx.fillStyle = cur.accent;
      ctx.beginPath();
      ctx.roundRect(tab.x, 12, tab.w, 32, 16);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12.5px sans-serif';
      ctx.fillText(tab.label, tab.x + 16, 33);
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.roundRect(tab.x, 12, tab.w, 32, 16);
      ctx.fill();
      ctx.fillStyle = '#64748b';
      ctx.font = '600 12.5px sans-serif';
      ctx.fillText(tab.label, tab.x + 16, 33);
    }
  });

  ctx.font = '600 13px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'right';
  ctx.fillText('Samsung 34" Curved Display (21:9 UWQHD)', 2012, 33);
  ctx.textAlign = 'left';

  // 3. Main Display Chassis Area
  const tabX = 36;
  const tabY = 70;
  const tabW = 1976;
  const tabH = 800;

  ctx.fillStyle = '#0d121d';
  ctx.strokeStyle = cur.accent;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(tabX, tabY, tabW, tabH, 20);
  ctx.fill();
  ctx.stroke();

  // Internal screen area
  const scrX = tabX + 8;
  const scrY = tabY + 40;
  const scrW = tabW - 16;
  const scrH = tabH - 180; // height approx 620px

  // Chassis title bar
  ctx.fillStyle = '#111726';
  ctx.beginPath();
  ctx.roundRect(tabX, tabY, tabW, 40, [20, 20, 0, 0]);
  ctx.fill();

  ctx.font = 'bold 13px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(cur.title, tabX + 24, tabY + 25);

  ctx.font = 'bold 12px "SF Mono", monospace';
  ctx.fillStyle = cur.accent;
  ctx.textAlign = 'right';
  ctx.fillText(cur.repo + '  ●  LIVE REPO BUILD', tabX + tabW - 24, tabY + 25);
  ctx.textAlign = 'left';

  // ── 4. LITERAL PROJECT VIEWS MATCHING USER GITHUB REPOSITORIES ──
  if (projectIndex === 0) {
    // ══════════════════════════════════════════════════════════════
    // PROJECT 1: Plan_.ed (https://github.com/geyzz/shopping-planner)
    // ══════════════════════════════════════════════════════════════
    ctx.fillStyle = '#090d16';
    ctx.fillRect(scrX, scrY, scrW, scrH);

    // Subtle golden glow background behind mobile showcase
    const pGold = ctx.createRadialGradient(scrX + 500, scrY + 310, 80, scrX + 500, scrY + 310, 600);
    pGold.addColorStop(0, 'rgba(214, 179, 73, 0.18)');
    pGold.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = pGold;
    ctx.fillRect(scrX, scrY, scrW, scrH);

    // 3 Actual Mobile Device Mockups rendering real screenshots
    const pw = 255;
    const ph = 540;
    const py = scrY + 40;

    const phones = [
      {
        key: 'planedHome',
        fallbackText: 'Home Dashboard & Checklists',
        label: '1. Home Dashboard & Progress',
        x: scrX + 45,
        elevated: false,
      },
      {
        key: 'planedMalls',
        fallbackText: '4 Malls Cost Breakdown (₱4,820.00)',
        label: '2. 4-Mall Cost Breakdown ₱',
        x: scrX + 335,
        elevated: true,
      },
      {
        key: 'planedCalendar',
        fallbackText: 'Errand Calendar & Native Alarms',
        label: '3. Errand Calendar & Alarms',
        x: scrX + 625,
        elevated: false,
      },
    ];

    phones.forEach((p) => {
      const cy = p.elevated ? py - 14 : py;
      const ch = p.elevated ? ph + 28 : ph;
      const cw = p.elevated ? pw + 12 : pw;

      // Phone outer bezel
      ctx.fillStyle = '#1e2433';
      ctx.strokeStyle = p.elevated ? '#d6b349' : '#334155';
      ctx.lineWidth = p.elevated ? 3 : 1.5;
      ctx.beginPath();
      ctx.roundRect(p.x, cy, cw, ch, 28);
      ctx.fill();
      ctx.stroke();

      // Screen image area
      const sx = p.x + 8;
      const sy = cy + 8;
      const sw = cw - 16;
      const sh = ch - 16;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(sx, sy, sw, sh, 22);
      ctx.clip();

      const img = cachedProjectScreenImages[p.key];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, sx, sy, sw, sh);
      } else {
        // High fidelity fallback matching actual screenshot colors
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(sx, sy, sw, sh);
        ctx.fillStyle = '#d6b349';
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText(p.fallbackText, sx + 20, sy + 60);
      }
      ctx.restore();

      // Dynamic Island / Speaker Pill
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.roundRect(p.x + cw / 2 - 38, cy + 12, 76, 16, 8);
      ctx.fill();

      // Bottom label badge
      ctx.fillStyle = p.elevated ? '#d6b349' : 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.roundRect(p.x + 10, cy + ch - 34, cw - 20, 24, 12);
      ctx.fill();
      ctx.fillStyle = p.elevated ? '#0f172a' : '#cbd5e1';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.label, p.x + cw / 2, cy + ch - 18);
      ctx.textAlign = 'left';
    });

    // Right-Hand Telemetry & Architecture Panel
    const rx = scrX + 935;
    const rw = scrW - 955;
    const ry = scrY + 30;
    const rh = scrH - 60;

    ctx.fillStyle = 'rgba(15, 21, 35, 0.94)';
    ctx.strokeStyle = 'rgba(214, 179, 73, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(rx, ry, rw, rh, 18);
    ctx.fill();
    ctx.stroke();

    // Plan_.ed Brand Header
    ctx.fillStyle = '#d6b349';
    ctx.font = '900 32px sans-serif';
    ctx.fillText('Plan_.ed', rx + 32, ry + 50);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 17px sans-serif';
    ctx.fillText('Smart Shopping & Real-Time Errand Management with Alarms', rx + 32, ry + 82);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '13.5px sans-serif';
    ctx.fillText('Personal mobile project engineered from scratch to solve unorganized errand runs with store-partitioned pricing.', rx + 32, ry + 108);

    // Tech Stack Badges
    const pStack = ['React Native', 'Expo Router', 'Supabase PostgreSQL', 'AsyncStorage', 'EAS Build', 'Native Alarms'];
    let bx = rx + 32;
    pStack.forEach((t) => {
      ctx.font = 'bold 12px sans-serif';
      const tw = ctx.measureText(t).width + 20;
      ctx.fillStyle = 'rgba(214, 179, 73, 0.15)';
      ctx.beginPath();
      ctx.roundRect(bx, ry + 128, tw, 28, 14);
      ctx.fill();
      ctx.strokeStyle = 'rgba(214, 179, 73, 0.35)';
      ctx.stroke();
      ctx.fillStyle = '#fef08a';
      ctx.fillText(t, bx + 10, ry + 146);
      bx += tw + 10;
    });

    // 4 Architecture Feature Cards
    const features = [
      {
        title: '🛒 4-Mall Partitioned Checklists',
        desc: 'Categorizes errand items into SM City Clark, Nepo Mall, Marquee Mall, and Robinsons Starmills with per-store pricing.',
      },
      {
        title: '💰 Real-Time Mall Cost Calculator',
        desc: 'Calculates active run totals (₱4,820.00) dynamically as checkboxes are checked, with budgeting thresholds.',
      },
      {
        title: '⏰ Native Errand Calendar & Alarms',
        desc: 'Interactive schedule with system alarms at 10:30 AM & 1:15 PM so critical errands are never missed.',
      },
      {
        title: '🔄 Offline-First & Dual Sync',
        desc: 'Uses AsyncStorage for instant offline access and synchronizes with Supabase cloud when internet restores.',
      },
    ];

    features.forEach((feat, idx) => {
      const fy = ry + 175 + idx * 82;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.beginPath();
      ctx.roundRect(rx + 32, fy, rw - 64, 70, 10);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(feat.title, rx + 48, fy + 26);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '12.5px sans-serif';
      ctx.fillText(feat.desc, rx + 48, fy + 50);
    });

    // Status pill at bottom of right panel
    ctx.fillStyle = 'rgba(34, 197, 94, 0.12)';
    ctx.beginPath();
    ctx.roundRect(rx + 32, ry + rh - 48, rw - 64, 34, 17);
    ctx.fill();
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 12.5px sans-serif';
    ctx.fillText('✓ Standalone Android APK Shipped via EAS Build  •  100% Offline-Capable Mobile Engine', rx + 52, ry + rh - 26);

  } else if (projectIndex === 1) {
    // ══════════════════════════════════════════════════════════════
    // PROJECT 2: C&J Real Estate (https://github.com/geyzz/real-estate)
    // ══════════════════════════════════════════════════════════════
    ctx.fillStyle = '#DFE1E5';
    ctx.fillRect(scrX, scrY, scrW, scrH);

    // Left Browser Showcase Area (Width 1250px)
    const bwW = 1250;
    const bwX = scrX;
    const bwY = scrY;
    const bwH = scrH;

    // Background Architectural Photo (Mirrored horizontally like .background-img in App.css)
    const heroImg = cachedProjectScreenImages.cjProperty1;
    ctx.save();
    ctx.beginPath();
    ctx.rect(bwX, bwY, bwW, bwH);
    ctx.clip();

    if (heroImg && heroImg.complete && heroImg.naturalWidth > 0) {
      // Flip horizontally across hero width
      ctx.save();
      ctx.translate(bwX + bwW, bwY);
      ctx.scale(-1, 1);
      ctx.drawImage(heroImg, 0, 0, bwW, bwH);
      ctx.restore();
    } else {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(bwX, bwY, bwW, bwH);
    }

    // Soft Alabaster Radial Vignette Overlay (Matching .home-page::after in App.css)
    const albGrad = ctx.createRadialGradient(bwX + bwW * 0.28, bwY + bwH * 0.4, 50, bwX + bwW * 0.28, bwY + bwH * 0.4, bwW * 0.75);
    albGrad.addColorStop(0, 'rgba(243, 244, 246, 0.94)');
    albGrad.addColorStop(0.55, 'rgba(243, 244, 246, 0.62)');
    albGrad.addColorStop(1, 'rgba(243, 244, 246, 0.12)');
    ctx.fillStyle = albGrad;
    ctx.fillRect(bwX, bwY, bwW, bwH);

    // Top Navbar: C [AND] J Real Est. + White Trapezoid Nav + Green "Find a Property" Pill
    ctx.fillStyle = 'rgba(243, 244, 246, 0.9)';
    ctx.fillRect(bwX, bwY, bwW, 46);

    // Brand mark
    ctx.fillStyle = '#3D3B36';
    ctx.font = '900 18px sans-serif';
    ctx.fillText('C', bwX + 28, bwY + 30);
    ctx.font = '900 8px sans-serif';
    ctx.fillText('AND', bwX + 43, bwY + 28);
    ctx.font = '900 18px sans-serif';
    ctx.fillText('J', bwX + 65, bwY + 30);
    ctx.font = '600 15px Georgia, serif';
    ctx.fillText('Real Est.', bwX + 80, bwY + 30);

    // White Curved Trapezoid Center Nav (.nav-trapezoid)
    ctx.fillStyle = '#F3F4F6';
    ctx.beginPath();
    ctx.roundRect(bwX + bwW / 2 - 180, bwY + 4, 360, 36, [0, 0, 16, 16]);
    ctx.fill();
    ctx.strokeStyle = 'rgba(61, 59, 54, 0.12)';
    ctx.stroke();

    ctx.font = 'bold 12.5px sans-serif';
    ctx.fillStyle = '#4F6D3A';
    ctx.fillText('Home', bwX + bwW / 2 - 140, bwY + 27);
    ctx.fillStyle = '#3D3B36';
    ctx.fillText('About Us', bwX + bwW / 2 - 75, bwY + 27);
    ctx.fillText('Properties', bwX + bwW / 2 + 10, bwY + 27);
    ctx.fillText('Contact Us', bwX + bwW / 2 + 95, bwY + 27);

    // Right Green Pill Button (.property-btn)
    ctx.fillStyle = '#4F6D3A';
    ctx.beginPath();
    ctx.roundRect(bwX + bwW - 170, bwY + 8, 145, 30, 15);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('🔍 Find a Property', bwX + bwW - 156, bwY + 28);

    // Left Hero Message (.home-msg in App.css)
    ctx.fillStyle = '#1c1b18';
    ctx.font = '900 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Find A Property', bwX + 42, bwY + 120);
    ctx.fillText('To Build Your Dream House', bwX + 42, bwY + 165);

    ctx.fillStyle = '#3D3B36';
    ctx.font = '600 14.5px sans-serif';
    ctx.fillText('Discover prime residential lots and modern estates set in peaceful, thriving communities.', bwX + 42, bwY + 205);
    ctx.fillText('C and J Real Estate makes every step simple, secure, and transparent.', bwX + 42, bwY + 228);

    // Get Started Button
    ctx.fillStyle = '#4F6D3A';
    ctx.beginPath();
    ctx.roundRect(bwX + 42, bwY + 252, 140, 38, 19);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13.5px sans-serif';
    ctx.fillText('Get Started', bwX + 75, bwY + 276);

    // Bottom 3 Hero Features
    const featBoxY = bwY + bwH - 120;
    const featW = 220;
    const cjFeats = [
      { title: 'Quality Estates', sub: 'Ready-to-build residential lots' },
      { title: 'Prime Locations', sub: 'Safe, accessible communities' },
      { title: 'Trusted Ownership', sub: 'Clean titles & verified deeds' },
    ];

    cjFeats.forEach((f, i) => {
      const fx = bwX + 42 + i * (featW + 16);
      ctx.fillStyle = 'rgba(243, 244, 246, 0.92)';
      ctx.beginPath();
      ctx.roundRect(fx, featBoxY, featW, 75, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.stroke();

      ctx.fillStyle = '#4F6D3A';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(f.title, fx + 16, featBoxY + 30);
      ctx.fillStyle = '#64748b';
      ctx.font = '11.5px sans-serif';
      ctx.fillText(f.sub, fx + 16, featBoxY + 54);
    });

    ctx.restore();

    // Right-Hand Real Estate Showroom Cards (Width ~670px)
    const rwX = bwX + bwW + 15;
    const rwW = scrW - bwW - 25;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(rwX, scrY, rwW, scrH);

    // Header
    ctx.fillStyle = '#4F6D3A';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('CURATED EXCLUSIVE RESIDENCES', rwX + 24, scrY + 35);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 22px sans-serif';
    ctx.fillText('Central Luzon Architectural Showcase', rwX + 24, scrY + 65);

    // Property Card 1 (The Obsidian Pavilion)
    const c1Y = scrY + 85;
    const c1H = 210;
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(rwX + 20, c1Y, rwW - 40, c1H, 14);
    ctx.fill();
    ctx.strokeStyle = '#4F6D3A';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const pImg1 = cachedProjectScreenImages.cjProperty2;
    if (pImg1 && pImg1.complete && pImg1.naturalWidth > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(rwX + 32, c1Y + 16, 240, c1H - 32, 10);
      ctx.clip();
      ctx.drawImage(pImg1, rwX + 32, c1Y + 16, 240, c1H - 32);
      ctx.restore();
    }

    const tX = rwX + 290;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('The Obsidian Pavilion', tX, c1Y + 40);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12.5px sans-serif';
    ctx.fillText('Exclusive Residence • San Fernando, Pampanga', tX, c1Y + 66);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '12px sans-serif';
    ctx.fillText('5 Bedrooms  •  6 Bathrooms  •  650 sqm  •  Private Infinity Pool', tX, c1Y + 95);
    ctx.fillText('Automated Smart Home  •  Triple Garage  •  Turnkey Ready', tX, c1Y + 118);

    ctx.fillStyle = '#d6b349';
    ctx.font = '900 20px sans-serif';
    ctx.fillText('₱28,500,000', tX, c1Y + 155);

    // Property Card 2 (Villa Solaria Sanctuary)
    const c2Y = c1Y + c1H + 20;
    const c2H = 210;
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(rwX + 20, c2Y, rwW - 40, c2H, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(79, 109, 58, 0.4)';
    ctx.stroke();

    const pImg2 = cachedProjectScreenImages.cjProperty3;
    if (pImg2 && pImg2.complete && pImg2.naturalWidth > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(rwX + 32, c2Y + 16, 240, c2H - 32, 10);
      ctx.clip();
      ctx.drawImage(pImg2, rwX + 32, c2Y + 16, 240, c2H - 32);
      ctx.restore();
    }

    const tX2 = rwX + 290;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('Villa Solaria Sanctuary', tX2, c2Y + 40);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12.5px sans-serif';
    ctx.fillText('Gated Community • Angeles City, Pampanga', tX2, c2Y + 66);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '12px sans-serif';
    ctx.fillText('4 Bedrooms  •  5 Bathrooms  •  420 sqm  •  Courtyard Garden', tX2, c2Y + 95);
    ctx.fillText('Solar Powered  •  Modern Minimalist Stone & Glass Architecture', tX2, c2Y + 118);

    ctx.fillStyle = '#d6b349';
    ctx.font = '900 20px sans-serif';
    ctx.fillText('₱18,200,000', tX2, c2Y + 155);

    // Bottom Tech Info
    ctx.fillStyle = '#4F6D3A';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('React 18  •  Vite  •  Supabase PostgreSQL CRUD  •  Custom CSS3 Grid/Flex  •  github.com/geyzz/real-estate', rwX + 24, scrY + scrH - 18);

  } else {
    // ══════════════════════════════════════════════════════════════
    // PROJECT 3: HAUtogo (https://github.com/qwertyuipaas/HAUtogo / geyzz/HAUtogo)
    // ══════════════════════════════════════════════════════════════
    ctx.fillStyle = '#220000';
    ctx.fillRect(scrX, scrY, scrW, scrH);

    // HAU Maroon Gradient Surface
    const hauGrad = ctx.createLinearGradient(scrX, scrY, scrX + scrW, scrY + scrH);
    hauGrad.addColorStop(0, '#3a0202');
    hauGrad.addColorStop(0.5, '#550000');
    hauGrad.addColorStop(1, '#1f0000');
    ctx.fillStyle = hauGrad;
    ctx.fillRect(scrX, scrY, scrW, scrH);

    // Left Side: HAUtogo Mobile Client Phone Mockup (Width 360px)
    const phW = 350;
    const phH = 550;
    const phX = scrX + 45;
    const phY = scrY + 35;

    ctx.fillStyle = '#f7f4f0';
    ctx.strokeStyle = '#EFBF04';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(phX, phY, phW, phH, 24);
    ctx.fill();
    ctx.stroke();

    // HAU Maroon Top AppBar (#550000)
    ctx.fillStyle = '#550000';
    ctx.beginPath();
    ctx.roundRect(phX, phY, phW, 58, [24, 24, 0, 0]);
    ctx.fill();

    // HAUtogo Emblem image (hautogo-4.jpg)
    const emblemImg = cachedProjectScreenImages.hautogoEmblem;
    if (emblemImg && emblemImg.complete && emblemImg.naturalWidth > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(phX + 16, phY + 12, 34, 34, 8);
      ctx.clip();
      ctx.drawImage(emblemImg, phX + 16, phY + 12, 34, 34);
      ctx.restore();
    } else {
      ctx.fillStyle = '#EFBF04';
      ctx.beginPath();
      ctx.roundRect(phX + 16, phY + 12, 34, 34, 8);
      ctx.fill();
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 17px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('HAUtogo', phX + 60, phY + 34);

    ctx.fillStyle = '#EFBF04';
    ctx.font = 'bold 9.5px sans-serif';
    ctx.fillText('FACULTY TRACKING & CLASS RADAR', phX + 60, phY + 48);

    // Geofence ON Pill
    ctx.fillStyle = '#EFBF04';
    ctx.beginPath();
    ctx.roundRect(phX + phW - 105, phY + 18, 90, 22, 11);
    ctx.fill();
    ctx.fillStyle = '#550000';
    ctx.font = 'bold 9.5px sans-serif';
    ctx.fillText('GEOFENCE ON', phX + phW - 95, phY + 33);

    // Campus Map Surface
    const mapY = phY + 58;
    const mapH = phH - 148;
    ctx.fillStyle = '#ebe6de';
    ctx.fillRect(phX, mapY, phW, mapH);

    // Roads & Pathways
    ctx.strokeStyle = '#d8d0c5';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(phX, mapY + 100); ctx.lineTo(phX + phW, mapY + 100);
    ctx.moveTo(phX, mapY + 240); ctx.lineTo(phX + phW, mapY + 240);
    ctx.moveTo(phX + 110, mapY); ctx.lineTo(phX + 110, mapY + mapH);
    ctx.moveTo(phX + 250, mapY); ctx.lineTo(phX + 250, mapY + mapH);
    ctx.stroke();

    // HAU Campus Geofence Circle
    ctx.strokeStyle = '#550000';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.arc(phX + phW / 2, mapY + mapH / 2, 130, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Campus Buildings: SJH, MGN, STL
    // 1. St. Joseph Hall (SJH)
    ctx.fillStyle = '#d5c7b8';
    ctx.strokeStyle = '#b5a392';
    ctx.lineWidth = 1.5;
    ctx.fillRect(phX + 30, mapY + 30, 110, 60);
    ctx.strokeRect(phX + 30, mapY + 30, 110, 60);
    ctx.fillStyle = '#550000';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('SJH Building', phX + 45, mapY + 58);
    ctx.font = '9px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Engineering & CS', phX + 40, mapY + 74);

    // Pin on SJH
    ctx.fillStyle = '#550000';
    ctx.beginPath();
    ctx.roundRect(phX + 24, mapY + 12, 125, 20, 10);
    ctx.fill();
    ctx.strokeStyle = '#EFBF04';
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('📍 Dr. Santos • SJH 501', phX + 30, mapY + 25);

    // 2. MGN Hall
    ctx.fillStyle = '#d5c7b8';
    ctx.fillRect(phX + 180, mapY + 40, 130, 70);
    ctx.strokeRect(phX + 180, mapY + 40, 130, 70);
    ctx.fillStyle = '#550000';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('MGN Hall', phX + 215, mapY + 72);
    ctx.font = '9px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Arts & Sciences', phX + 205, mapY + 88);

    // Pin on MGN
    ctx.fillStyle = '#550000';
    ctx.beginPath();
    ctx.roundRect(phX + 180, mapY + 18, 130, 20, 10);
    ctx.fill();
    ctx.strokeStyle = '#EFBF04';
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('📍 Prof. Cruz • MGN 302', phX + 188, mapY + 31);

    // 3. STL Lab Building
    ctx.fillStyle = '#d5c7b8';
    ctx.fillRect(phX + 70, mapY + 160, 150, 75);
    ctx.strokeRect(phX + 70, mapY + 160, 150, 75);
    ctx.fillStyle = '#550000';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('STL Building', phX + 105, mapY + 195);
    ctx.font = '9px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Advanced Computing Labs', phX + 85, mapY + 212);

    // Pin on STL
    ctx.fillStyle = '#550000';
    ctx.beginPath();
    ctx.roundRect(phX + 70, mapY + 138, 140, 20, 10);
    ctx.fill();
    ctx.strokeStyle = '#EFBF04';
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 8.5px sans-serif';
    ctx.fillText('📍 Engr. David • STL Lab 2', phX + 78, mapY + 151);

    // Mobile Bottom Sheet
    const sheetY = phY + phH - 90;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(phX, sheetY, phW, 90, [16, 16, 24, 24]);
    ctx.fill();

    ctx.fillStyle = '#550000';
    ctx.font = 'bold 12.5px sans-serif';
    ctx.fillText('Next Class In: 18 mins  •  SJH Rm 501', phX + 16, sheetY + 28);
    ctx.fillStyle = '#64748b';
    ctx.font = '11px sans-serif';
    ctx.fillText('CS301 Advanced Web Development with Prof. Cruz', phX + 16, sheetY + 48);
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('● Faculty in Room & Ready for Class', phX + 16, sheetY + 68);

    // Right Side: Live Supabase Backend & Database Telemetry
    const sX = phX + phW + 35;
    const sW = scrW - phW - 55;
    const sY = scrY + 30;
    const sH = scrH - 60;

    ctx.fillStyle = 'rgba(10, 12, 18, 0.92)';
    ctx.strokeStyle = '#EFBF04';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(sX, sY, sW, sH, 16);
    ctx.fill();
    ctx.stroke();

    // Supabase Header
    ctx.fillStyle = '#EFBF04';
    ctx.font = 'bold 13px "SF Mono", monospace';
    ctx.fillText('SUPABASE CLUSTER TELEMETRY  •  HOLY ANGEL UNIVERSITY CAMPUS GEOFENCE & SCHEDULES', sX + 24, sY + 32);

    // Real Supabase Database Screenshot (hautogo-2.png)
    const dbImg1 = cachedProjectScreenImages.hautogoSupabase2;
    const db1H = 220;
    if (dbImg1 && dbImg1.complete && dbImg1.naturalWidth > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(sX + 24, sY + 46, sW - 48, db1H, 10);
      ctx.clip();
      ctx.drawImage(dbImg1, sX + 24, sY + 46, sW - 48, db1H);
      ctx.restore();
    } else {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(sX + 24, sY + 46, sW - 48, db1H);
    }

    // Real Supabase Project Screenshot (hautogo-1.png)
    const dbImg2 = cachedProjectScreenImages.hautogoSupabase1;
    const db2Y = sY + 46 + db1H + 14;
    const db2H = 140;
    if (dbImg2 && dbImg2.complete && dbImg2.naturalWidth > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(sX + 24, db2Y, sW - 48, db2H, 10);
      ctx.clip();
      ctx.drawImage(dbImg2, sX + 24, db2Y, sW - 48, db2H);
      ctx.restore();
    } else {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(sX + 24, db2Y, sW - 48, db2H);
    }

    // Telemetry Status Bar
    const statY = db2Y + db2H + 16;
    ctx.fillStyle = 'rgba(239, 191, 4, 0.12)';
    ctx.beginPath();
    ctx.roundRect(sX + 24, statY, sW - 48, 65, 10);
    ctx.fill();
    ctx.strokeStyle = 'rgba(239, 191, 4, 0.35)';
    ctx.stroke();

    ctx.fillStyle = '#EFBF04';
    ctx.font = 'bold 12.5px sans-serif';
    ctx.fillText('● PostgreSQL 15 (Supabase Cloud Hosted)  •  Realtime WebSockets Active  •  Geofence Radius: 350m', sX + 40, statY + 26);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '11.5px monospace';
    ctx.fillText('Campus Coordinates: 15.1438° N, 120.5902° E  •  flutter_map + geolocator  •  github.com/geyzz/HAUtogo', sX + 40, statY + 48);
  }

  // ── 5. BOTTOM METADATA BAR (TITLE, TECH STACK, ACTIONS, PREV/NEXT) ──
  const botY = tabY + tabH - 130;
  const botH = 120;

  ctx.fillStyle = '#080c14';
  ctx.beginPath();
  ctx.roundRect(tabX + 8, botY, tabW - 16, botH, [0, 0, 16, 16]);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.stroke();

  // Left info
  ctx.fillStyle = cur.accent;
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText(cur.tag, tabX + 35, botY + 30);

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 22px sans-serif';
  ctx.fillText(cur.title, tabX + 35, botY + 60);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '13.5px sans-serif';
  ctx.fillText(cur.desc, tabX + 35, botY + 90);

  // Center / Right Controls
  // 1. View Project Link (Positioned cleanly at bottom right corner)
  ctx.fillStyle = cur.accent;
  ctx.beginPath();
  ctx.roundRect(tabX + tabW - 225, botY + 35, 190, 48, 12);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('View Repository ↗', tabX + tabW - 130, botY + 64);
  ctx.textAlign = 'left';

  // 2. Dot indicators
  [0, 1, 2].forEach((idx) => {
    ctx.fillStyle = idx === projectIndex ? cur.accent : 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(tabX + tabW - 255 - (2 - idx) * 22, botY + 59, idx === projectIndex ? 6 : 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function createPortfolioCarouselTexture(projectIndex = 0) {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  canvas._projectIndex = projectIndex;

  drawProjectScreenOnCanvas(canvas, projectIndex);

  if (!registeredPortfolioCanvases.includes(canvas)) {
    registeredPortfolioCanvases.push(canvas);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 16;
  return texture;
}

`;

const newContent = content.substring(0, startIndex) + replacementCode + content.substring(endIndex);

// Also add the preloader effect in useEffect
const effectHookMarker = `  // Secondary safeguard: swap 3D monitor texture whenever carouselIndex state changes`;
const effectReplacement = `  // Preload actual project screenshots & telemetry and re-render monitor screen
  useEffect(() => {
    preloadProjectScreenImages();
    onProjectImagesLoadedListener = () => {
      if (portfolioTexturesRef.current) {
        portfolioTexturesRef.current.forEach((tex, idx) => {
          if (tex && tex.image) {
            drawProjectScreenOnCanvas(tex.image, idx);
            tex.needsUpdate = true;
          }
        });
        if (monitorMeshRef.current?.material) {
          const curTex = portfolioTexturesRef.current[carouselIndexRef.current];
          if (curTex) {
            monitorMeshRef.current.material.map = curTex;
            monitorMeshRef.current.material.emissiveMap = curTex;
            monitorMeshRef.current.material.needsUpdate = true;
          }
        }
      }
    };
    return () => {
      onProjectImagesLoadedListener = null;
    };
  }, []);

  // Secondary safeguard: swap 3D monitor texture whenever carouselIndex state changes`;

let finalContent = newContent;
if (finalContent.includes(effectHookMarker)) {
  finalContent = finalContent.replace(effectHookMarker, effectReplacement);
} else {
  console.warn('Could not find effectHookMarker');
}

fs.writeFileSync(targetFile, finalContent, 'utf8');
console.log('Successfully updated Desk3DViewer.jsx with literal project screen views!');
