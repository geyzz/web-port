import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import ProjectTabletCarousel from './ProjectTabletCarousel';
import GazedLogo from './GazedLogo';
import {
  X,
  Compass,
  Monitor,
  Laptop,
  Pin,
  FileText,
  ExternalLink,
  Download,
  Sparkles,
  Layers,
  Code,
  Palette,
  Bot,
  User,
  Briefcase,
  GraduationCap,
  Award,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Mail,
  ArrowUpRight
} from 'lucide-react';

const ROOM_STATIONS = {
  room: {
    id: 'room',
    name: 'Studio Room',
    camPos: new THREE.Vector3(1.50, 6.38, 0.08),
    targetPos: new THREE.Vector3(-2.80, 5.88, 0.08),
    fov: 60,
  },
  portfolio: {
    id: 'portfolio',
    name: 'Portfolio',
    icon: Monitor,
    camPos: new THREE.Vector3(-1.35, 6.30, 0.08),
    targetPos: new THREE.Vector3(-2.95, 6.22, 0.08),
    fov: 38,
  },
  techstack: {
    id: 'techstack',
    name: 'Technical Skills',
    icon: Laptop,
    camPos: new THREE.Vector3(-2.056, 6.044, -1.233),
    targetPos: new THREE.Vector3(-2.507, 5.876, -1.591),
    fov: 48,
  },
  aboutme: {
    id: 'aboutme',
    name: 'About Me',
    icon: Pin,
    camPos: new THREE.Vector3(-2.025, 6.575, 1.15),
    targetPos: new THREE.Vector3(-2.025, 6.575, 1.824),
    fov: 48,
  },
  resume: {
    id: 'resume',
    name: 'Resume',
    icon: FileText,
    camPos: new THREE.Vector3(-0.828, 6.42, -1.30),
    targetPos: new THREE.Vector3(-0.827, 5.604, -1.579),
    fov: 45,
  },
};

const STATION_LIMITS = {
  room: { minDistance: 1.5, maxDistance: 4.6 },
  portfolio: { minDistance: 0.7, maxDistance: 1.9 },
  techstack: { minDistance: 0.35, maxDistance: 0.95 },
  aboutme: { minDistance: 0.4, maxDistance: 1.1 },
  resume: { minDistance: 0.35, maxDistance: 1.4 },
};

const CALLOUT_CONFIG = [
  {
    id: 'portfolio',
    name: 'Portfolio',
    icon: Monitor,
    iconColor: '#ff7728',
    glowColor: 'rgba(255, 119, 40, 0.65)',
    badgePos: new THREE.Vector3(-2.80, 6.82, 0.08),
    targetPos: new THREE.Vector3(-2.80, 6.38, 0.08),
  },
  {
    id: 'techstack',
    name: 'Technical Skills',
    icon: Laptop,
    iconColor: '#60a5fa',
    glowColor: 'rgba(96, 165, 250, 0.65)',
    badgePos: new THREE.Vector3(-2.18, 6.48, -1.30),
    targetPos: new THREE.Vector3(-2.32, 6.05, -1.35),
  },
  {
    id: 'aboutme',
    name: 'About Me',
    icon: Pin,
    iconColor: '#ff9f43',
    glowColor: 'rgba(255, 159, 67, 0.65)',
    badgePos: new THREE.Vector3(-1.45, 6.75, 1.821),
    targetPos: new THREE.Vector3(-1.765, 6.583, 1.821), // Points squarely on Ghayzelle's Polaroid crocodile picture
  },
  {
    id: 'resume',
    name: 'Resume',
    icon: FileText,
    iconColor: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.65)',
    badgePos: new THREE.Vector3(-0.95, 5.35, -1.15),
    targetPos: new THREE.Vector3(-0.827, 5.604, -1.579), // Points squarely on the Resume Paper Sheet
  },
];

const PORTFOLIO_PROJECTS = [
  {
    id: 'plan_ed',
    title: 'Plan_.ed',
    subtitle: 'Shopping & Errand Planner App',
    category: 'Mobile Application • Android APK',
    role: 'Sole Developer & UI/UX Designer',
    tag: 'Personal Project',
    accent: '#d6b349',
    accentGlow: 'rgba(214, 179, 73, 0.35)',
    stack: ['React Native', 'Expo', 'Supabase', 'PostgreSQL', 'AsyncStorage', 'EAS Build'],
    desc: 'Designed and built a mobile shopping planner featuring custom light/dark themes, collapsible headers, and an interactive errand calendar with native reminder alarms.',
    highlights: [
      'Smart checklists with real-time mall cost calculations linked to 4 Pampanga malls',
      'Interactive errand calendar with native reminder alarms & notifications',
      'Dual cloud sync and offline storage via Supabase RLS and AsyncStorage',
      'Shipped optimized standalone Android APK via EAS Build',
    ],
    github: 'https://github.com/geyzz/shopping-planner',
    demo: null,
  },
  {
    id: 'cj_realestate',
    title: 'C&J Real Estate',
    subtitle: 'Property Showcase & Management Platform',
    category: 'Full-Stack Web Platform',
    role: 'Full-Stack Developer & Designer',
    tag: 'Personal Project',
    accent: '#4F6D3A',
    accentGlow: 'rgba(79, 109, 58, 0.35)',
    stack: ['React', 'Vite', 'Supabase', 'PostgreSQL RLS', 'EmailJS', 'Custom CSS3'],
    desc: 'Architected a full-stack real estate platform and session-authenticated Admin Portal with Supabase for real-time property CRUD listings, status management, and lead tracking.',
    highlights: [
      'Interactive showroom with dual-thumb price sliders and Philippine geographic filters',
      'Session-authenticated Admin Portal with real-time CRUD listings and inquiry tracking',
      'Automated client notifications and lead capture workflows using EmailJS',
      'Fluid CSS3 Grid/Flex layouts with sub-second load times',
    ],
    github: 'https://github.com/geyzz/real-estate',
    demo: null,
  },
  {
    id: 'hautogo',
    title: 'HAUtogo',
    subtitle: 'Real-Time Faculty Tracking & Management',
    category: 'Collaborative Mobile App',
    role: 'Front-End & UI/UX Developer',
    tag: 'Holy Angel University',
    accent: '#991b1b',
    accentGlow: 'rgba(153, 27, 27, 0.35)',
    stack: ['Flutter', 'Dart', 'Supabase', 'flutter_map', 'geolocator'],
    desc: 'Campus mobile app for Holy Angel University with an interactive map and sliding panel UI that displays live professor locations and timetables.',
    highlights: [
      'Live campus geofenced GPS map with sliding panel professor locator',
      'Role-based weekly schedules for students and faculty with next-class alerts',
      'One-tap classroom navigation and schedule synchronizer',
      'Cloud auth and user profile management with Supabase',
    ],
    github: 'https://github.com/geyzz/HAUtogo',
    secondaryGithub: 'https://github.com/qwertyuipaas/HAUtogo',
    demo: null,
  },
];

const CERTIFICATES_DATA = [
  {
    title: 'Legacy Responsive Web Design V8',
    issuer: 'freeCodeCamp',
    date: 'September 18, 2024 • 300 Hours Verified',
    skills: 'HTML5 Semantic, Modern CSS3, Flexbox, CSS Grid, Responsive Architecture, Web Accessibility',
    badge: 'Developer Certification',
    accent: '#3b82f6',
    image: '/certificates/fcc-responsive-web-design.jpg',
    url: 'https://www.freecodecamp.org/certification/ghayzelle/responsive-web-design',
  },
  {
    title: 'JavaScript Essentials 1',
    issuer: 'Cisco Networking Academy • HAU',
    date: '19 Oct 2024 • Cert ID: ad4c3402-fdc9-4f18-9693-cfd7e8891364',
    skills: 'ES6+ Syntax, Control Flow, Functions, Arrays, Objects, Scope, Algorithmic Logic',
    badge: 'Cisco & JS Institute',
    accent: '#06b6d4',
    image: '/certificates/cisco-javascript-essentials.jpg',
    url: 'https://www.credly.com/users/ghayzelle-dizon.c089c1d2',
  },
  {
    title: 'AWS Academy Graduate - Cloud Foundations',
    issuer: 'Amazon Web Services (AWS) Academy',
    date: '02/26/2026 • 20 Course Hours Completed',
    skills: 'Cloud Architecture, AWS Core Services (EC2, S3, RDS, VPC), IAM Security, Cloud Economics',
    badge: 'AWS Academy',
    accent: '#f59e0b',
    image: '/certificates/aws-cloud-foundations.jpg',
    url: 'https://www.credly.com/go/lIjcca1p',
  },
];

const PERSONAL_STRENGTHS = [
  {
    num: '01',
    title: 'Creative Thinking',
    desc: 'Original concepts and engaging visuals in UI/UX & development.',
  },
  {
    num: '02',
    title: 'Attention to Detail',
    desc: 'Pixel-perfect typography, color harmony, layouts, and micro-interactions.',
  },
  {
    num: '03',
    title: 'Willingness to Learn',
    desc: 'Exploring modern tech: Blender 3D, React, Flutter, and Three.js.',
  },
  {
    num: '04',
    title: 'Problem-Solving',
    desc: 'Methodical troubleshooting, clean algorithmic logic, and resilient architecture.',
  },
  {
    num: '05',
    title: 'Adaptability',
    desc: 'Swiftly embracing new frameworks, tools, and diverse team workflows.',
  },
  {
    num: '06',
    title: 'Initiative & Motivation',
    desc: 'Taking original project ideas from concept to shipped deployment.',
  },
  {
    num: '07',
    title: 'Interpersonal Communication',
    desc: 'Active listener, open communicator, and collaborative teammate.',
  },
];

const BOOK_PALETTE = [
  0x822f1e,
  0x2b4257,
  0x2c4430,
  0x9a6538,
  0x1f2227,
  0xc5a176,
  0x663c26,
  0x3f5145,
];

// generate two-tone ceramic mug texture
function createTwoToneMugTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Glazed pastel sage / teal ceramic
  ctx.fillStyle = '#6f9b94';
  ctx.fillRect(0, 0, 256, 175);

  // Raw warm terracotta clay base
  ctx.fillStyle = '#ad6e3d';
  ctx.fillRect(0, 175, 256, 81);

  // Soft transition border
  ctx.fillStyle = '#94582c';
  ctx.fillRect(0, 173, 256, 4);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// split text into wrapped lines for 2D canvas drawing
function wrapCanvasText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (let w of words) {
    if ((cur + ' ' + w).trim().length <= maxChars) {
      cur = (cur + ' ' + w).trim();
    } else {
      lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

// ── REAL PROJECT ASSETS CACHE & PRELOADER (LITERAL GITHUB & SHIPPED BUILDS) ──
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
  hautogoMap: '/projects/hautogo-map.jpg',
  hautogoBuilding: '/projects/hautogo-building.jpg',
  hautogoSchedule: '/projects/hautogo-schedule.png',
  hautogoLogin: '/projects/hautogo-login.jpg',
  hautogoProfile: '/projects/hautogo-profile.jpg',
  hautogoSupabase1: '/projects/hautogo-1.png',
  hautogoSupabase2: '/projects/hautogo-2.png',
  hautogoSupabase3: '/projects/hautogo-3.png',
};

const CERT_SCREEN_ASSETS = {
  fcc: '/certificates/fcc-responsive-web-design.jpg',
  cisco: '/certificates/cisco-javascript-essentials.jpg',
  aws: '/certificates/aws-cloud-foundations.jpg',
};

const cachedProjectScreenImages = {};
const cachedCertScreenImages = {};
const registeredPortfolioCanvases = [];
let onProjectImagesLoadedListener = null;
let onCertImagesLoadedListener = null;

function preloadCertScreenImages() {
  if (typeof window === 'undefined') return;
  Object.entries(CERT_SCREEN_ASSETS).forEach(([key, src]) => {
    if (!cachedCertScreenImages[key]) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => {
        cachedCertScreenImages[key] = img;
        if (onCertImagesLoadedListener) {
          onCertImagesLoadedListener();
        }
      };
      cachedCertScreenImages[key] = img;
    }
  });
}

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
      desc: 'Campus utility app for Holy Angel University with GPS geofencing, real-time professor room availability, next-class alerts, and live Supabase telemetry.',
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

  ctx.font = 'bold 15px "SF Mono", Menlo, Consolas, monospace';
  ctx.fillStyle = '#f1f5f9';
  ctx.fillText('ghayzelle@workstation: ~/portfolio-showcase', 120, 34);

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
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(tab.label, tab.x + 16, 33);
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.roundRect(tab.x, 12, tab.w, 32, 16);
      ctx.fill();
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '600 13px sans-serif';
      ctx.fillText(tab.label, tab.x + 16, 33);
    }
  });

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
    ctx.font = '900 34px sans-serif';
    ctx.fillText('Plan_.ed', rx + 32, ry + 50);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('Smart Shopping & Real-Time Errand Management with Alarms', rx + 32, ry + 82);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '500 15px sans-serif';
    ctx.fillText('Personal mobile project engineered from scratch to solve unorganized errand runs with store-partitioned pricing.', rx + 32, ry + 108);

    // Tech Stack Badges
    const pStack = ['React Native', 'Expo Router', 'Supabase PostgreSQL', 'AsyncStorage', 'EAS Build', 'Native Alarms'];
    let bx = rx + 32;
    pStack.forEach((t) => {
      ctx.font = 'bold 13px sans-serif';
      const tw = ctx.measureText(t).width + 20;
      ctx.fillStyle = 'rgba(214, 179, 73, 0.2)';
      ctx.beginPath();
      ctx.roundRect(bx, ry + 128, tw, 28, 14);
      ctx.fill();
      ctx.strokeStyle = 'rgba(214, 179, 73, 0.5)';
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
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.roundRect(rx + 32, fy, rw - 64, 70, 10);
      ctx.fill();
      ctx.strokeStyle = 'rgba(214, 179, 73, 0.2)';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(feat.title, rx + 48, fy + 26);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '500 13.5px sans-serif';
      ctx.fillText(feat.desc, rx + 48, fy + 50);
    });

    // Status pill at bottom of right panel
    ctx.fillStyle = 'rgba(34, 197, 94, 0.18)';
    ctx.beginPath();
    ctx.roundRect(rx + 32, ry + rh - 48, rw - 64, 34, 17);
    ctx.fill();
    ctx.fillStyle = '#86efac';
    ctx.font = 'bold 13.5px sans-serif';
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
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('The Obsidian Pavilion', tX, c1Y + 38);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '600 14px sans-serif';
    ctx.fillText('Exclusive Residence • San Fernando, Pampanga', tX, c1Y + 65);
    ctx.fillStyle = '#f1f5f9';
    ctx.font = '500 13px sans-serif';
    ctx.fillText('5 Bedrooms  •  6 Bathrooms  •  650 sqm  •  Private Infinity Pool', tX, c1Y + 95);
    ctx.fillText('Automated Smart Home  •  Triple Garage  •  Turnkey Ready', tX, c1Y + 118);

    ctx.fillStyle = '#facc15';
    ctx.font = '900 22px sans-serif';
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
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('Villa Solaria Sanctuary', tX2, c2Y + 38);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '600 14px sans-serif';
    ctx.fillText('Gated Community • Angeles City, Pampanga', tX2, c2Y + 65);
    ctx.fillStyle = '#f1f5f9';
    ctx.font = '500 13px sans-serif';
    ctx.fillText('4 Bedrooms  •  5 Bathrooms  •  420 sqm  •  Courtyard Garden', tX2, c2Y + 95);
    ctx.fillText('Solar Powered  •  Modern Minimalist Stone & Glass Architecture', tX2, c2Y + 118);

    ctx.fillStyle = '#facc15';
    ctx.font = '900 22px sans-serif';
    ctx.fillText('₱18,200,000', tX2, c2Y + 155);

    // Bottom Tech Info
    ctx.fillStyle = '#86efac';
    ctx.font = 'bold 13px monospace';
    ctx.fillText('React 18  •  Vite  •  Supabase PostgreSQL CRUD  •  Custom CSS3 Grid/Flex  •  github.com/geyzz/real-estate', rwX + 24, scrY + scrH - 18);

  } else {
    // ══════════════════════════════════════════════════════════════
    // PROJECT 3: HAUtogo (https://github.com/qwertyuipaas/HAUtogo / geyzz/HAUtogo)
    // ══════════════════════════════════════════════════════════════
    ctx.fillStyle = '#180407';
    ctx.fillRect(scrX, scrY, scrW, scrH);

    // Subtle HAU maroon/gold radial glow behind mobile showcase
    const hGlow = ctx.createRadialGradient(scrX + 500, scrY + 310, 80, scrX + 500, scrY + 310, 600);
    hGlow.addColorStop(0, 'rgba(239, 191, 4, 0.16)');
    hGlow.addColorStop(0.6, 'rgba(85, 0, 0, 0.28)');
    hGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = hGlow;
    ctx.fillRect(scrX, scrY, scrW, scrH);

    // 3 Actual Mobile Device Mockups rendering real HAUtogo screens (Matching Plan_.ed layout)
    const pw = 255;
    const ph = 540;
    const py = scrY + 40;

    const phones = [
      {
        key: 'hautogoMap',
        fallbackText: 'Campus Map & Building Locator',
        label: '1. Campus Map & Radar 📍',
        x: scrX + 45,
        elevated: false,
      },
      {
        key: 'hautogoBuilding',
        fallbackText: 'St. Joseph Hall Floor Radar',
        label: '2. St. Joseph Hall Floor Radar 🏢',
        x: scrX + 335,
        elevated: true,
      },
      {
        key: 'hautogoSchedule',
        fallbackText: '1st Year Class Schedule',
        label: '3. Student & Faculty Timetable ⏰',
        x: scrX + 625,
        elevated: false,
      },
    ];

    phones.forEach((p) => {
      const cy = p.elevated ? py - 14 : py;
      const ch = p.elevated ? ph + 28 : ph;
      const cw = p.elevated ? pw + 12 : pw;

      // Phone outer bezel
      ctx.fillStyle = '#1c0d10';
      ctx.strokeStyle = p.elevated ? '#EFBF04' : '#550000';
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
        ctx.fillStyle = '#1a080d';
        ctx.fillRect(sx, sy, sw, sh);
        ctx.fillStyle = '#EFBF04';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(p.fallbackText, sx + 20, sy + 60);
      }
      ctx.restore();

      // Dynamic Island / Speaker Pill
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.roundRect(p.x + cw / 2 - 38, cy + 12, 76, 16, 8);
      ctx.fill();

      // Bottom label badge
      ctx.fillStyle = p.elevated ? '#EFBF04' : 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.roundRect(p.x + 10, cy + ch - 34, cw - 20, 24, 12);
      ctx.fill();
      ctx.fillStyle = p.elevated ? '#3a0202' : '#cbd5e1';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.label, p.x + cw / 2, cy + ch - 18);
      ctx.textAlign = 'left';
    });

    // ── RIGHT-HAND TELEMETRY & ARCHITECTURE PANEL (Matching Plan_.ed layout) ──
    const rx = scrX + 935;
    const rw = scrW - 955;
    const ry = scrY + 30;
    const rh = scrH - 60;

    ctx.fillStyle = 'rgba(28, 8, 12, 0.94)';
    ctx.strokeStyle = 'rgba(239, 191, 4, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(rx, ry, rw, rh, 18);
    ctx.fill();
    ctx.stroke();

    // HAUtogo Brand Header
    ctx.fillStyle = '#EFBF04';
    ctx.font = '900 34px sans-serif';
    ctx.fillText('HAUtogo', rx + 32, ry + 50);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('Holy Angel University Smart Campus Geofence & Faculty Radar', rx + 32, ry + 82);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '500 15px sans-serif';
    ctx.fillText('Location-aware mobile ecosystem engineered with Flutter & Supabase to track faculty room availability and send automated class alerts.', rx + 32, ry + 108);

    // Tech Stack Badges
    const hStack = ['Flutter', 'Dart', 'Supabase PostgreSQL', 'flutter_map', 'geolocator', 'WebSockets', 'Geofencing'];
    let bx = rx + 32;
    hStack.forEach((t) => {
      ctx.font = 'bold 13px sans-serif';
      const tw = ctx.measureText(t).width + 20;
      ctx.fillStyle = 'rgba(239, 191, 4, 0.2)';
      ctx.beginPath();
      ctx.roundRect(bx, ry + 128, tw, 28, 14);
      ctx.fill();
      ctx.strokeStyle = 'rgba(239, 191, 4, 0.5)';
      ctx.stroke();
      ctx.fillStyle = '#fef08a';
      ctx.fillText(t, bx + 10, ry + 146);
      bx += tw + 10;
    });

    // 4 Architecture Feature Cards
    const hFeatures = [
      {
        title: '📍 Live Campus Geofence Radar',
        desc: 'Detects student arrival within HAU coordinates (15.1438° N, 120.5902° E) with high accuracy GPS.',
      },
      {
        title: '👨‍🏫 Real-Time Faculty Availability',
        desc: 'Instant room check-ins across SJH, MGN, and STL buildings using real-time database subscriptions.',
      },
      {
        title: '🔔 Automated Next-Class Alerts',
        desc: 'Triggers notifications 18 mins before upcoming lectures with assigned building room numbers and professor status.',
      },
      {
        title: '⚡ Supabase PostgreSQL Backend',
        desc: 'Synchronizes schedule tables, room assignments, and faculty telemetry via low-latency cloud database.',
      },
    ];

    hFeatures.forEach((feat, idx) => {
      const fy = ry + 175 + idx * 82;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.roundRect(rx + 32, fy, rw - 64, 70, 10);
      ctx.fill();
      ctx.strokeStyle = 'rgba(239, 191, 4, 0.25)';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(feat.title, rx + 48, fy + 26);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '500 13.5px sans-serif';
      ctx.fillText(feat.desc, rx + 48, fy + 50);
    });

    // Status pill at bottom of right panel
    ctx.fillStyle = 'rgba(239, 191, 4, 0.18)';
    ctx.beginPath();
    ctx.roundRect(rx + 32, ry + rh - 48, rw - 64, 34, 17);
    ctx.fill();
    ctx.strokeStyle = 'rgba(239, 191, 4, 0.4)';
    ctx.stroke();
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 13.5px sans-serif';
    ctx.fillText('✓ Holy Angel University Campus Engine  •  PostgreSQL 15 Realtime Sync Active', rx + 52, ry + rh - 26);
  }

  // Floating Left / Right Navigation Chevrons directly on the 3D Monitor Viewport (Consistent 48x48, r:12)
  // Left Chevron (scrX + 16)
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.beginPath();
  ctx.roundRect(scrX + 16, scrY + scrH / 2 - 24, 48, 48, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('‹', scrX + 40, scrY + scrH / 2 + 8);

  // Right Chevron (scrX + scrW - 64)
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.beginPath();
  ctx.roundRect(scrX + scrW - 64, scrY + scrH / 2 - 24, 48, 48, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 24px sans-serif';
  ctx.fillText('›', scrX + scrW - 40, scrY + scrH / 2 + 8);
  ctx.textAlign = 'left';

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
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText(cur.tag, tabX + 35, botY + 28);

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(cur.title, tabX + 35, botY + 56);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(cur.desc, tabX + 35, botY + 84);

  // Center / Right Controls (CONSISTENT DESIGN SYSTEM: Height 48px, Radius 12px)
  // 1. View Project Link (Positioned cleanly at bottom right corner)
  ctx.fillStyle = cur.accent;
  ctx.beginPath();
  ctx.roundRect(tabX + tabW - 225, botY + 36, 190, 48, 12);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('View Repository ↗', tabX + tabW - 130, botY + 65);
  ctx.textAlign = 'left';

  // 2. Dot indicators
  [0, 1, 2].forEach((idx) => {
    ctx.fillStyle = idx === projectIndex ? cur.accent : 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(tabX + tabW - 255 - (2 - idx) * 22, botY + 60, idx === projectIndex ? 6 : 4, 0, Math.PI * 2);
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
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 16;
  return texture;
}

// CERTIFICATES DISPLAY ON 34" CURVED ULTRAWIDE MONITOR
function drawCertificatesScreenOnCanvas(canvas) {
  const ctx = canvas.getContext('2d');

  // Deep dark IDE / workstation background
  const bg = ctx.createLinearGradient(0, 0, 2048, 1024);
  bg.addColorStop(0, '#0a0d14');
  bg.addColorStop(1, '#05070b');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 2048, 1024);

  // Top Nav / Window Header
  ctx.fillStyle = '#111724';
  ctx.fillRect(0, 0, 2048, 64);

  // Window control dots
  ctx.fillStyle = '#ff5f56';
  ctx.beginPath();
  ctx.arc(36, 32, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffbd2e';
  ctx.beginPath();
  ctx.arc(64, 32, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#27c93f';
  ctx.beginPath();
  ctx.arc(92, 32, 8, 0, Math.PI * 2);
  ctx.fill();

  // App Title
  ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#f8fafc';
  ctx.fillText('GHAYZELLE DIZON • CREDENTIALS & WORK', 130, 40);

  // Segmented Interactive Toggle Tabs drawn on screen header:
  // Tab 1: Portfolio (inactive)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.roundRect(840, 14, 160, 36, 18);
  ctx.fill();
  ctx.font = 'bold 14px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('💼  PORTFOLIO', 866, 37);

  // Tab 2: Certificates (ACTIVE)
  ctx.fillStyle = '#06b6d4';
  ctx.beginPath();
  ctx.roundRect(1015, 14, 185, 36, 18);
  ctx.fill();
  ctx.font = 'bold 14px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('📜  CERTIFICATES', 1040, 37);

  // Status tag
  ctx.fillStyle = '#06b6d4';
  ctx.beginPath();
  ctx.arc(1860, 32, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = 'bold 16px sans-serif';
  ctx.fillStyle = '#22d3ee';
  ctx.fillText('VERIFIED CREDENTIALS', 1880, 38);

  // Main Heading: CERTIFICATIONS
  ctx.font = '900 46px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('CERTIFICATIONS', 56, 136);

  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#22d3ee';
  ctx.fillText('Industry Accreditations • Cloud Architecture, Full-Stack Web Engineering & Honors', 440, 133);

  // Subtle separator line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(56, 160);
  ctx.lineTo(1992, 160);
  ctx.stroke();

  // 3 Industry Certificate Cards Aligned with Developer Role
  const certificates = [
    {
      title: 'Legacy Responsive Web Design V8',
      issuer: 'freeCodeCamp',
      date: 'September 18, 2024',
      badge: '300 HOURS CERTIFIED',
      accent: '#3b82f6',
      imageKey: 'fcc',
      description: 'Comprehensive mastery of modern web standards, semantic HTML5, advanced CSS3 responsive architecture, Flexbox layouts, CSS Grid layouts, and web accessibility standards.',
      skills: ['HTML5 Semantic', 'CSS3 Layouts', 'Flexbox', 'CSS Grid', 'Accessibility'],
    },
    {
      title: 'JavaScript Essentials 1',
      issuer: 'Cisco Networking Academy • HAU',
      date: '19 Oct 2024',
      badge: 'CISCO & JS INSTITUTE',
      accent: '#06b6d4',
      imageKey: 'cisco',
      description: 'Credential covering modern JavaScript ES6+ programming, variable scopes, control flow, functions, asynchronous patterns, objects, and algorithmic debugging.',
      skills: ['JavaScript (ES6+)', 'DOM Logic', 'Async / Promises', 'Data Structures', 'Debugging'],
    },
    {
      title: 'AWS Academy Graduate — Cloud Foundations',
      issuer: 'Amazon Web Services (AWS)',
      date: '02/26/2026',
      badge: 'AWS CLOUD FOUNDATIONS',
      accent: '#f59e0b',
      imageKey: 'aws',
      description: 'Mastery of foundational AWS cloud architecture, global infrastructure, AWS IAM security, Amazon EC2 compute, S3 storage, VPC networking, and cloud monitoring.',
      skills: ['AWS IAM', 'Amazon EC2', 'Amazon S3', 'VPC Networking', 'Cloud Security'],
    },
  ];

  const colW = 616;
  const colH = 750;
  const startX = 56;
  const startY = 184;
  const gap = 28;

  certificates.forEach((cert, idx) => {
    const x = startX + idx * (colW + gap);
    const y = startY;

    // Card background
    ctx.fillStyle = '#0f1522';
    ctx.strokeStyle = cert.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x, y, colW, colH, 16);
    ctx.fill();
    ctx.stroke();

    // Accent top header
    ctx.fillStyle = cert.accent;
    ctx.beginPath();
    ctx.roundRect(x, y, colW, 10, [16, 16, 0, 0]);
    ctx.fill();

    // Credential Badge Tag
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(x + 24, y + 24, 205, 26, 6);
    ctx.fill();
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = cert.accent;
    ctx.fillText(cert.badge, x + 34, y + 41);

    // Issue Date Tag
    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(cert.date, x + colW - 130, y + 41);

    // Title
    ctx.font = 'bold 22px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(cert.title, x + 24, y + 74);

    // Issuer
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = cert.accent;
    ctx.fillText(cert.issuer, x + 24, y + 100);

    // Certificate Photo Preview Image
    const certImg = cachedCertScreenImages[cert.imageKey];
    const imgX = x + 20;
    const imgY = y + 118;
    const imgW = colW - 40;
    const imgH = 240;

    ctx.fillStyle = '#070a12';
    ctx.fillRect(imgX, imgY, imgW, imgH);

    if (certImg && certImg.complete && certImg.naturalWidth > 0) {
      const aspect = certImg.naturalWidth / certImg.naturalHeight;
      let drawW = imgW;
      let drawH = imgW / aspect;
      if (drawH > imgH) {
        drawH = imgH;
        drawW = imgH * aspect;
      }
      const drawX = imgX + (imgW - drawW) / 2;
      const drawY = imgY + (imgH - drawH) / 2;
      ctx.drawImage(certImg, drawX, drawY, drawW, drawH);
      ctx.strokeStyle = cert.accent;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(imgX, imgY, imgW, imgH);
    } else {
      ctx.strokeStyle = `${cert.accent}44`;
      ctx.lineWidth = 1;
      ctx.strokeRect(imgX, imgY, imgW, imgH);
      ctx.font = 'bold 13px sans-serif';
      ctx.fillStyle = cert.accent;
      ctx.fillText('CERTIFICATE PREVIEW', imgX + 24, imgY + imgH / 2);
    }

    // Description Box
    const curY = y + 375;
    ctx.fillStyle = '#090d14';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x + 20, curY, colW - 40, 110, 8);
    ctx.fill();
    ctx.stroke();

    ctx.font = '14px -apple-system, sans-serif';
    ctx.fillStyle = '#cbd5e1';
    const descLines = wrapCanvasText(cert.description, 60);
    descLines.slice(0, 4).forEach((dl, dIdx) => {
      ctx.fillText(dl, x + 34, curY + 26 + dIdx * 22);
    });

    // Skills & Competencies Heading
    const compY = curY + 130;
    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('COMPETENCIES & DOMAINS:', x + 24, compY);

    // Skill pills
    let pillX = x + 24;
    let pillY = compY + 18;
    cert.skills.forEach((skill) => {
      ctx.font = 'bold 12px sans-serif';
      const textW = ctx.measureText(skill).width;
      const pillW = textW + 20;

      if (pillX + pillW > x + colW - 24) {
        pillX = x + 24;
        pillY += 34;
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.strokeStyle = cert.accent;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, 26, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.fillText(skill, pillX + 10, pillY + 17);

      pillX += pillW + 8;
    });

    // Verification Footer
    ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
    ctx.beginPath();
    ctx.roundRect(x + 20, y + colH - 60, colW - 40, 42, 8);
    ctx.fill();
    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = '#34d399';
    ctx.fillText('✓  OFFICIAL VERIFIED CREDENTIAL • GHAYZELLE DIZON', x + 36, y + colH - 34);
  });

  // Bottom Status Bar
  ctx.fillStyle = '#0a0e16';
  ctx.fillRect(0, 960, 2048, 64);
  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText("Academic Honor: Holy Angel University Dean's Lister (1st Year, 2nd Year, 3rd Year) • School of Computing", 56, 998);
}

function createCertificatesScreenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  drawCertificatesScreenOnCanvas(canvas);

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 16;
  return texture;
}

// TECH STACK DISPLAY ON SAMSUNG GALAXY BOOK 2 LAPTOP
function createTechStackScreenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1280;
  const ctx = canvas.getContext('2d');

  // Terminal background
  ctx.fillStyle = '#070a10';
  ctx.fillRect(0, 0, 2048, 1280);

  // Top Title Bar
  ctx.fillStyle = '#0f1726';
  ctx.fillRect(0, 0, 2048, 64);

  // Window dots
  ctx.fillStyle = '#ff5f56';
  ctx.beginPath();
  ctx.arc(36, 32, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffbd2e';
  ctx.beginPath();
  ctx.arc(64, 32, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#27c93f';
  ctx.beginPath();
  ctx.arc(92, 32, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = 'bold 20px "SF Mono", Menlo, Consolas, monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('bash - ghayzelle@workstation: ~/technical-skills', 130, 41);

  // TECHNICAL SKILLS
  ctx.fillStyle = '#111b2b';
  ctx.fillRect(56, 90, 1936, 110);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.strokeRect(56, 90, 1936, 110);

  ctx.font = '900 46px sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('TECHNICAL SKILLS', 88, 150);

  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('Ghayzelle Dizon | Front-End Developer | Figma & Blender to React, React Native & Flutter', 88, 182);

  // 5 Categories - realistic everyday developer stack
  const skillsList = [
    {
      category: 'Core Web & Languages',
      color: '#38bdf8',
      text: 'HTML5, CSS3, JavaScript (ES6+), TypeScript, Dart, SQL',
    },
    {
      category: 'Front-End & Mobile',
      color: '#34d399',
      text: 'React, Vite, React Native, Expo, Expo Router, Flutter',
    },
    {
      category: 'UI/UX & 3D Design',
      color: '#ff7728',
      text: 'Figma (UI/UX & Prototyping), Blender (3D Modeling), Responsive Design, CSS Flexbox & Grid',
    },
    {
      category: 'Backend & Databases',
      color: '#c084fc',
      text: 'Supabase (Auth, Realtime, Row-Level Security), PostgreSQL, AsyncStorage',
    },
    {
      category: 'Developer Workflow',
      color: '#fbbf24',
      text: 'Git, GitHub, EAS Build, VS Code',
    },
  ];

  let cardY = 226;
  const cardW = 1936;
  const cardH = 148;
  const gap = 24;

  skillsList.forEach((item) => {
    // Card box
    ctx.fillStyle = '#0d131f';
    ctx.strokeStyle = item.color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(56, cardY, cardW, cardH, 12);
    ctx.fill();
    ctx.stroke();

    // Category pill on left
    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.roundRect(80, cardY + 20, 360, 42, 8);
    ctx.fill();

    ctx.font = 'bold 20px -apple-system, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText(item.category + ':', 98, cardY + 48);

    // text description
    ctx.font = 'bold 22px "SF Mono", Menlo, Consolas, sans-serif';
    ctx.fillStyle = '#f8fafc';
    const lines = wrapCanvasText(item.text, 78);
    lines.forEach((l, lIdx) => {
      ctx.fillText(l, 460, cardY + 48 + lIdx * 34);
    });

    cardY += cardH + gap;
  });

  // Terminal Prompt at Bottom
  ctx.fillStyle = '#05080e';
  ctx.fillRect(56, 1140, 1936, 76);
  ctx.strokeStyle = '#1e293b';
  ctx.strokeRect(56, 1140, 1936, 76);

  ctx.font = '20px monospace';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('ghayzelle@workstation:~$ npm run deploy --role "Front-End Developer" --status "READY" 🚀', 88, 1186);

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false; // Maps canvas top to top of laptop screen
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 16;
  return texture;
}

// RESUME PAPER DISPLAY ON STUDY DESK (EXACT MATCH OF DOWNLOADABLE RESUME)
function drawResumeOnCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  // Crisp pure white paper
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // Subtle clean paper border
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 30, W - 60, H - 60);

  const marginX = 110;
  const marginR = W - 110;
  const contentW = marginR - marginX;

  // 1. Top Navy Accent Bar (#16263b)
  ctx.fillStyle = '#16263b';
  ctx.fillRect(marginX, 85, contentW, 14);

  // 2. Header
  ctx.font = 'bold 84px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.fillText('GHAYZELLE DIZON', marginX, 195);

  ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#ea580c';
  ctx.fillText('Front-End Developer', marginX, 245);

  ctx.font = '500 25px -apple-system, sans-serif';
  ctx.fillStyle = '#475569';
  ctx.fillText('0969 0199 663  |  ghayzelle.dzn@gmail.com  |  gazed.vercel.app  |  github.com/geyzz  |  linkedin.com/in/ghayzelle-dizon', marginX, 292);

  // Header Bottom Divider
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(marginX, 340);
  ctx.lineTo(marginR, 340);
  ctx.stroke();

  let curY = 385;

  const drawSectionHeader = (title) => {
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(marginX, curY + 4, 20, 20);

    ctx.font = 'bold 34px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#16263b';
    ctx.fillText(title.toUpperCase(), marginX + 32, curY + 22);

    curY += 44;
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(marginX, curY);
    ctx.lineTo(marginR, curY);
    ctx.stroke();
    curY += 28;
  };

  const wrapText = (text, maxWidth) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    words.forEach((w) => {
      const test = currentLine ? currentLine + ' ' + w : w;
      if (ctx.measureText(test).width <= maxWidth) {
        currentLine = test;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = w;
      }
    });
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  // 3. PROFILE
  drawSectionHeader('Profile');
  ctx.font = '500 26px -apple-system, sans-serif';
  ctx.fillStyle = '#334155';
  const profileText =
    'Computer Science student and Front-End Developer with a strong passion for UI/UX design, 3D visuals, and building distinctive web and mobile interfaces. Seeking a Front-End Developer role where I can turn creative design concepts in Figma and Blender into polished, responsive applications using React, React Native, and Flutter. Works earnestly toward every goal, learns new tools quickly, and follows through from initial design to working product.';
  const pLines = wrapText(profileText, contentW);
  pLines.forEach((l) => {
    ctx.fillText(l, marginX, curY);
    curY += 38;
  });
  curY += 28;

  // 4. TECHNICAL SKILLS
  drawSectionHeader('Technical Skills');
  const skillsData = [
    { label: 'Design & UI:', val: 'Figma, Blender (3D Modeling), UI/UX Design, Wireframing & Prototyping, Responsive Design, Custom CSS3' },
    { label: 'Languages:', val: 'JavaScript, TypeScript, HTML5, CSS3, Dart, Python, SQL' },
    { label: 'Frameworks & Libraries:', val: 'React, Vite, React Native, Expo, Expo Router, Flutter' },
    { label: 'Backend & Databases:', val: 'Supabase (Auth, Realtime, Row-Level Security), PostgreSQL, AsyncStorage' },
    { label: 'Tools:', val: 'Git, GitHub, EAS Build, VS Code' },
  ];

  skillsData.forEach((s) => {
    ctx.font = 'bold 27px -apple-system, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText(s.label, marginX, curY);

    const lblW = ctx.measureText(s.label).width;
    ctx.font = '500 26px -apple-system, sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText(s.val, marginX + lblW + 16, curY);
    curY += 42;
  });
  curY += 28;

  // 5. PROJECTS
  drawSectionHeader('Projects');
  const projects = [
    {
      title: 'Plan_.ed - Shopping & Errand Planner App',
      tag: 'Personal Project',
      tech: 'React Native, Expo, Supabase, PostgreSQL, AsyncStorage, EAS Build',
      bullets: [
        'Designed and built a mobile shopping planner featuring custom light/dark themes, collapsible headers, and an interactive errand calendar with native reminder alarms.',
        'Created smart checklists with real-time cost calculation and a directory linking items to 4 major Pampanga malls.',
        'Implemented cloud and offline sync using Supabase and AsyncStorage, and shipped an Android APK via EAS Build.',
      ],
    },
    {
      title: 'C&J Real Estate - Property Showcase Website',
      tag: 'Personal Project',
      tech: 'React, Vite, JavaScript (JSX), CSS3, HTML5',
      bullets: [
        'Designed and developed a single-page real estate website with a custom brand identity, hero showcase, company overview cards, and property section.',
        'Crafted custom CSS3 Flexbox layouts, layered blurred and clipped background visuals, and tailored typography.',
      ],
    },
    {
      title: 'HAUtogo - Real-Time Faculty Tracking & Class Management',
      tag: 'Collaborative Project',
      tech: 'Flutter, Dart, Supabase, flutter_map, geolocator',
      bullets: [
        'Built a campus mobile app for Holy Angel University with an interactive map and sliding panel UI that displays live professor locations.',
        'Designed role-based weekly schedule views for students and professors, plus one-tap room navigation and next-class indicators.',
        'Implemented campus geofencing and full account authentication (login, password recovery, profile management) with Supabase.',
      ],
    },
  ];

  projects.forEach((p) => {
    ctx.font = 'bold 29px -apple-system, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText(p.title, marginX, curY);

    ctx.font = 'bold 26px -apple-system, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';
    ctx.fillText(p.tag, marginR, curY);
    ctx.textAlign = 'left';
    curY += 40;

    ctx.font = 'italic 26px -apple-system, sans-serif';
    ctx.fillStyle = '#ea580c';
    ctx.fillText('Tech Stack: ' + p.tech, marginX, curY);
    curY += 38;

    p.bullets.forEach((b) => {
      ctx.fillStyle = '#ea580c';
      ctx.beginPath();
      ctx.arc(marginX + 12, curY - 9, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '500 26px -apple-system, sans-serif';
      ctx.fillStyle = '#334155';
      const bLines = wrapText(b, contentW - 40);
      bLines.forEach((bl) => {
        ctx.fillText(bl, marginX + 28, curY);
        curY += 38;
      });
      curY += 4;
    });
    curY += 18;
  });
  curY += 12;

  // 6. EDUCATION
  drawSectionHeader('Education');
  ctx.font = 'bold 29px -apple-system, sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.fillText('Bachelor of Science in Computer Science', marginX, curY);

  ctx.font = 'bold 26px -apple-system, sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.textAlign = 'right';
  ctx.fillText('2023 - Present', marginR, curY);
  ctx.textAlign = 'left';
  curY += 38;

  ctx.font = '500 26px -apple-system, sans-serif';
  ctx.fillStyle = '#475569';
  ctx.fillText('Holy Angel University', marginX, curY);
  curY += 38;

  // Dean's Lister badge pill
  const badgeText = "• Dean's Lister: 1st Year (1st Semester), 2nd Year (1st Semester), 3rd Year";
  ctx.font = 'bold 24px -apple-system, sans-serif';
  const badgeW = ctx.measureText(badgeText).width;
  ctx.fillStyle = '#f0fdfa';
  ctx.strokeStyle = '#0d9488';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(marginX, curY, badgeW + 32, 42, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f766e';
  ctx.fillText(badgeText, marginX + 16, curY + 29);
  curY += 72;

  // 7. CERTIFICATIONS
  drawSectionHeader('Certifications');
  const certs = [
    { title: 'Responsive Web Design - freeCodeCamp', date: 'Sep 2024' },
    { title: 'JavaScript Essentials 1 - Cisco Networking Academy', date: 'Oct 2024' },
    { title: 'AWS Academy Graduate - Cloud Foundations - Amazon Web Services', date: 'Feb 2026' },
  ];

  certs.forEach((c) => {
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.arc(marginX + 12, curY - 9, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'bold 27px -apple-system, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText(c.title, marginX + 28, curY);

    ctx.font = '500 26px -apple-system, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';
    ctx.fillText(c.date, marginR, curY);
    ctx.textAlign = 'left';

    curY += 44;
  });

  // Footer bar
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(marginX, H - 85);
  ctx.lineTo(marginR, H - 85);
  ctx.stroke();

  ctx.font = '500 24px -apple-system, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Ghayzelle Dizon  •  Front-End Developer  •  gazed.vercel.app  •  Official Resume', marginX, H - 60);
}

function createResumePaperTexture() {
  const loader = new THREE.TextureLoader();
  const texture = loader.load('/resume-sheet.png?v=4');
  texture.flipY = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 16;
  texture.needsUpdate = true;
  return texture;
}

// ABOUT ME PAPER DISPLAY ON BULLETIN BOARD (BIO & PERSONAL STRENGTHS)
function createAboutMePaperTexture() {
  const canvas = document.createElement('canvas');
  // Wide pinned memo paper matching the 3D bulletin board note proportions (~ 1.33 : 1)
  canvas.width = 2048;
  canvas.height = 1536;
  const ctx = canvas.getContext('2d');

  // Warm cream textured memo paper
  ctx.fillStyle = '#faf7f2';
  ctx.fillRect(0, 0, 2048, 1536);

  // Clean paper border
  ctx.strokeStyle = '#dfd9ce';
  ctx.lineWidth = 4;
  ctx.strokeRect(36, 36, 1976, 1464);

  // Top pin hole indicator
  ctx.fillStyle = '#b0a898';
  ctx.beginPath();
  ctx.arc(1024, 64, 10, 0, Math.PI * 2);
  ctx.fill();

  // Title: A Little About Me (Bold, High Contrast, Centered)
  ctx.font = '900 64px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';
  ctx.fillText('A Little About Me', 1024, 138);

  // Warm terracotta accent line under title
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(760, 168);
  ctx.lineTo(1288, 168);
  ctx.stroke();

  // Reset text alignment for two columns
  ctx.textAlign = 'left';

  // ═════════════════════════════════════════════════════════════════════
  // LEFT COLUMN: HELLO, I'M GHAYZELLE + EDUCATION (X: 90 .. 1000)
  // ═════════════════════════════════════════════════════════════════════
  ctx.font = '900 34px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#ea580c';
  ctx.fillText("Hello, I'm Ghayzelle", 90, 235);

  const helloWidth = ctx.measureText("Hello, I'm Ghayzelle").width;
  ctx.strokeStyle = '#fed7aa';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(90, 255);
  ctx.lineTo(90 + helloWidth + 20, 255);
  ctx.stroke();

  const paragraphs = [
    "I'm someone who embraces new experiences, welcomes different ideas and perspectives, and is always open to learning.",
    "As an aspiring Front-End Developer, I enjoy turning ideas into interactive and meaningful digital experiences. I'm interested in exploring how design and technology work together to create interfaces that are both functional and engaging.",
    "I believe growth comes from stepping outside my comfort zone, taking on challenges, and turning new ideas into action. I may not have everything figured out, but I'm always moving forward, learning through experience, and finding new ways to improve.",
  ];

  let curY = 300;
  ctx.font = '500 27px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#1e293b';

  paragraphs.forEach((p) => {
    const lines = wrapCanvasText(p, 42);
    lines.forEach((line) => {
      ctx.fillText(line, 90, curY);
      curY += 40;
    });
    curY += 26;
  });

  // Education Card Box
  const eduY = curY + 14;
  ctx.fillStyle = '#f1f5f9';
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(90, eduY, 890, 175, 12);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 28px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.fillText('🎓 Holy Angel University', 115, eduY + 44);

  ctx.font = '500 24px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#475569';
  ctx.fillText('Bachelor of Science in Computer Science (2023 – Present)', 115, eduY + 86);

  ctx.font = 'bold 23px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#059669';
  ctx.fillText("★ Dean's Lister: 1st Year (1st Sem), 2nd Year (1st Sem), 3rd Year", 115, eduY + 132);

  // ═════════════════════════════════════════════════════════════════════
  // RIGHT COLUMN: PERSONAL STRENGTHS (X: 1040 .. 1958)
  // ═════════════════════════════════════════════════════════════════════
  ctx.font = '900 34px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#ea580c';
  ctx.fillText('PERSONAL STRENGTHS', 1040, 235);

  ctx.strokeStyle = '#fed7aa';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(1040, 255);
  ctx.lineTo(1450, 255);
  ctx.stroke();

  let sy = 295;
  PERSONAL_STRENGTHS.forEach((item) => {
    // Card background
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(1040, sy, 918, 128, 10);
    ctx.fill();
    ctx.stroke();

    // Number badge
    ctx.fillStyle = '#ffedd5';
    ctx.strokeStyle = '#fdba74';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(1060, sy + 24, 60, 60, 8);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 26px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#c2410c';
    ctx.textAlign = 'center';
    ctx.fillText(item.num, 1090, sy + 62);
    ctx.textAlign = 'left';

    // Title & Description
    ctx.font = 'bold 28px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText(item.title, 1140, sy + 48);

    ctx.font = '500 24px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText(item.desc, 1140, sy + 90);

    sy += 148;
  });

  // Signature
  ctx.font = 'bold italic 36px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#ea580c';
  ctx.textAlign = 'right';
  ctx.fillText('— Ghayzelle Dizon', 1958, 1445);

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 16;
  return texture;
}

export default function Desk3DViewer({ onClose, onOpenInquiry = null, isPaused = false }) {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const isModelLoadedRef = useRef(false);

  // Smooth, deliberate loading progress controller: paces steady progression without rushing
  useEffect(() => {
    let animId;
    let lastTime = performance.now();
    const startTime = performance.now();
    let current = 0;

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;

      // Ambient baseline crawl: gently moves to 12% in the first 1.2s so it never stays stuck at 0%
      const ambientBase = Math.min(elapsed * 10, 15);
      let rawTarget = Math.max(targetProgressRef.current, ambientBase);

      if (!isModelLoadedRef.current) {
        // While downloading / parsing, never rush past 90%
        rawTarget = Math.min(rawTarget, 90);
      } else {
        // Model is added to scene and ready, target full 100%
        rawTarget = 100;
      }

      if (current < rawTarget) {
        // Paced rate cap: smoothly takes ~3.5 to 4.5s to reach 90%
        // Prevents rushing all the way to 90% in 1 second
        let maxRate = 18; // % per second
        if (current > 65 && !isModelLoadedRef.current) {
          maxRate = 9; // gradual deceleration while Three.js finishes GLTF parsing
        } else if (isModelLoadedRef.current) {
          maxRate = 32; // smooth finish to 100%
        }

        const step = Math.min(maxRate * dt, Math.max(0.2, (rawTarget - current) * 3.0 * dt));
        current = Math.min(rawTarget, current + step);
        setProgress(Math.floor(current));
      }

      if (current >= 100 && isModelLoadedRef.current) {
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
        }, 450);
        return;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  const [activeStation, setActiveStation] = useState('room');
  const [hoveredStation, setHoveredStation] = useState(null);
  const [panelDismissed, setPanelDismissed] = useState(false);
  const [resumeTab, setResumeTab] = useState('resume'); // 'resume' | 'certificates'
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedCertModal, setSelectedCertModal] = useState(null);

  // Stale-closure-safe refs for event handlers
  const activeStationRef = useRef(activeStation);
  activeStationRef.current = activeStation;

  const carouselIndexRef = useRef(carouselIndex);
  carouselIndexRef.current = carouselIndex;

  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  // References
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const interactiveMeshesRef = useRef([]);
  const targetCamPos = useRef(ROOM_STATIONS.room.camPos.clone());
  const targetLookAt = useRef(ROOM_STATIONS.room.targetPos.clone());
  const targetFov = useRef(ROOM_STATIONS.room.fov);
  const isTransitioning = useRef(false);
  const flightState = useRef({
    active: false,
    startTime: 0,
    duration: 950,
    startPos: new THREE.Vector3(),
    endPos: new THREE.Vector3(),
    startLookAt: new THREE.Vector3(),
    endLookAt: new THREE.Vector3(),
    startFov: 60,
    endFov: 60,
    targetLimits: STATION_LIMITS.room,
  });
  const monitorMeshRef = useRef(null);
  const projectCanvasesRef = useRef(null);
  const monitorCanvasRef = useRef(null);
  const monitorTextureRef = useRef(null);
  const transitionAnimIdRef = useRef(null);
  const isTransitioningMonitorRef = useRef(false);

  // Initialize pre-rendered project canvases and the single persistent monitor screen canvas/texture
  if (!monitorCanvasRef.current && typeof document !== 'undefined') {
    projectCanvasesRef.current = [0, 1, 2].map((idx) => {
      const c = document.createElement('canvas');
      c.width = 2048;
      c.height = 1024;
      c._projectIndex = idx;
      drawProjectScreenOnCanvas(c, idx);
      return c;
    });

    const mCanvas = document.createElement('canvas');
    mCanvas.width = 2048;
    mCanvas.height = 1024;
    const mCtx = mCanvas.getContext('2d');
    mCtx.drawImage(projectCanvasesRef.current[0], 0, 0);
    monitorCanvasRef.current = mCanvas;

    const mTex = new THREE.CanvasTexture(mCanvas);
    mTex.flipY = false;
    mTex.colorSpace = THREE.SRGBColorSpace;
    mTex.minFilter = THREE.LinearFilter;
    mTex.magFilter = THREE.LinearFilter;
    mTex.generateMipmaps = false;
    monitorTextureRef.current = mTex;
  }

  const certificatesTextureRef = useRef(null);
  const containerSizeRef = useRef({ w: 0, h: 0 });
  const cachedDomRectRef = useRef(null);
  const elementsRef = useRef({});

  // Smooth cinematic animated slide transition between projects on the 3D monitor screen
  const updateMonitorProject = (newIndex, explicitDir = null) => {
    if (isTransitioningMonitorRef.current) return;

    const fromIdx = carouselIndexRef.current;
    const toIdx = ((newIndex % 3) + 3) % 3;

    if (fromIdx === toIdx) return;

    // Slide direction: +1 slides left (advance next), -1 slides right (go back)
    let dir = explicitDir;
    if (dir === null) {
      if (fromIdx === 2 && toIdx === 0) dir = 1;
      else if (fromIdx === 0 && toIdx === 2) dir = -1;
      else dir = toIdx > fromIdx ? 1 : -1;
    }

    if (transitionAnimIdRef.current) {
      cancelAnimationFrame(transitionAnimIdRef.current);
      transitionAnimIdRef.current = null;
    }

    isTransitioningMonitorRef.current = true;
    setCarouselIndex(toIdx);
    carouselIndexRef.current = toIdx;

    const fromCanvas = projectCanvasesRef.current?.[fromIdx];
    const toCanvas = projectCanvasesRef.current?.[toIdx];
    const mCanvas = monitorCanvasRef.current;
    const mTex = monitorTextureRef.current;

    if (!fromCanvas || !toCanvas || !mCanvas || !mTex) {
      if (toCanvas && mCanvas && mTex) {
        mCanvas.getContext('2d').drawImage(toCanvas, 0, 0);
        mTex.needsUpdate = true;
      }
      isTransitioningMonitorRef.current = false;
      return;
    }

    const mCtx = mCanvas.getContext('2d');
    const targetAccent = PORTFOLIO_PROJECTS[toIdx]?.accent || '#d6b349';
    const duration = 380; // snappy, fluid 380ms slide
    const startTime = performance.now();

    const animateSlide = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Snappy deceleration cubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      const shift = dir * ease * 2048;

      // Draw sliding canvases directly onto monitorCanvas
      mCtx.fillStyle = '#06080e';
      mCtx.fillRect(0, 0, 2048, 1024);

      // 1. Outgoing project sliding away
      mCtx.drawImage(fromCanvas, -shift, 0);

      // 2. Incoming project sliding into view
      const incomingX = dir > 0 ? (2048 - shift) : (-2048 - shift);
      mCtx.drawImage(toCanvas, incomingX, 0);

      // 3. Futuristic glowing neon energy divider line
      const dividerX = incomingX;
      mCtx.save();
      mCtx.strokeStyle = targetAccent;
      mCtx.shadowColor = targetAccent;
      mCtx.shadowBlur = 24;
      mCtx.lineWidth = 6;
      mCtx.beginPath();
      mCtx.moveTo(dividerX, 0);
      mCtx.lineTo(dividerX, 1024);
      mCtx.stroke();

      // Atmospheric glowing gradient bleed on the incoming side
      const grad = mCtx.createLinearGradient(dividerX - (dir > 0 ? 40 : -40), 0, dividerX, 0);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      grad.addColorStop(1, targetAccent + '55');
      mCtx.fillStyle = grad;
      mCtx.fillRect(dir > 0 ? (dividerX - 40) : dividerX, 0, 40, 1024);
      mCtx.restore();

      // Dynamic emissive pulse on monitor during transition
      if (monitorMeshRef.current?.material) {
        const pulse = Math.sin(progress * Math.PI) * 0.08;
        monitorMeshRef.current.material.emissiveIntensity = 0.95 + pulse;
      }

      mTex.needsUpdate = true;

      if (progress < 1) {
        transitionAnimIdRef.current = requestAnimationFrame(animateSlide);
      } else {
        // Animation finished: cleanly render destination frame
        mCtx.drawImage(toCanvas, 0, 0);
        mTex.needsUpdate = true;
        if (monitorMeshRef.current?.material) {
          monitorMeshRef.current.material.emissiveIntensity = 0.95;
        }
        isTransitioningMonitorRef.current = false;
        transitionAnimIdRef.current = null;
      }
    };

    transitionAnimIdRef.current = requestAnimationFrame(animateSlide);
  };

  // Preload actual project screenshots & certificate images and re-render monitor screen
  useEffect(() => {
    preloadProjectScreenImages();
    preloadCertScreenImages();
    onProjectImagesLoadedListener = () => {
      if (projectCanvasesRef.current) {
        projectCanvasesRef.current.forEach((canv, idx) => {
          if (canv) {
            drawProjectScreenOnCanvas(canv, idx);
          }
        });
        if (monitorCanvasRef.current && !isTransitioningMonitorRef.current) {
          const curCanvas = projectCanvasesRef.current[carouselIndexRef.current];
          if (curCanvas) {
            const mCtx = monitorCanvasRef.current.getContext('2d');
            mCtx.drawImage(curCanvas, 0, 0);
            if (monitorTextureRef.current) {
              monitorTextureRef.current.needsUpdate = true;
            }
          }
        }
      }
    };
    onCertImagesLoadedListener = () => {
      if (certificatesTextureRef.current?.image) {
        drawCertificatesScreenOnCanvas(certificatesTextureRef.current.image);
        certificatesTextureRef.current.needsUpdate = true;
      }
    };
    return () => {
      onProjectImagesLoadedListener = null;
      onCertImagesLoadedListener = null;
    };
  }, []);

  // Secondary safeguard: update monitor canvas whenever carouselIndex state changes
  useEffect(() => {
    if (projectCanvasesRef.current && monitorCanvasRef.current && !isTransitioningMonitorRef.current) {
      const safeIdx = ((carouselIndex % 3) + 3) % 3;
      const curCanvas = projectCanvasesRef.current[safeIdx];
      if (curCanvas) {
        const mCtx = monitorCanvasRef.current.getContext('2d');
        mCtx.drawImage(curCanvas, 0, 0);
        if (monitorTextureRef.current) {
          monitorTextureRef.current.needsUpdate = true;
        }
      }
    }
  }, [carouselIndex]);

  const goToStation = (stationKey) => {
    setActiveStation(stationKey);
    setPanelDismissed(false);
    if (stationKey !== 'portfolio') {
      setCarouselOpen(false);
    }
    const station = ROOM_STATIONS[stationKey];
    if (station) {
      const curCam = cameraRef.current;
      const curControls = controlsRef.current;
      const limits = STATION_LIMITS[stationKey] || STATION_LIMITS.room;

      // 1. Current position & target ("from here")
      const startCam = curCam ? curCam.position.clone() : ROOM_STATIONS.room.camPos.clone();
      const startLook = curControls ? curControls.target.clone() : ROOM_STATIONS.room.targetPos.clone();
      const startFov = curCam ? curCam.fov : 60;

      // 2. Destination position & target ("to there")
      const endCamPos = new THREE.Vector3();
      let endFov = station.fov ?? 58;
      if (stationKey === 'room') {
        const isPortrait = (containerSizeRef.current.w || window.innerWidth) < (containerSizeRef.current.h || window.innerHeight);
        if (isPortrait) {
          endCamPos.set(0.65, 7.05, -0.25);
          endFov = 62;
        } else {
          endCamPos.copy(station.camPos);
          endFov = station.fov ?? 60;
        }
      } else {
        endCamPos.copy(station.camPos);
        endFov = station.fov ?? 58;
      }
      const endLookAt = station.targetPos.clone();

      // 3. Temporarily disable OrbitControls and distance clamping during flight
      // This guarantees zero skipped frames, zero snapping, and pure continuous motion!
      if (curControls) {
        curControls.enabled = false;
        curControls.minDistance = 0.01;
        curControls.maxDistance = 100.0;
      }

      // Gentle, luxurious cinematic travel duration (min 1650ms, max 2100ms) eliminates sudden "woosh" rushes
      const distance = startCam.distanceTo(endCamPos);
      const duration = Math.min(Math.max(distance * 380, 1650), 2100);

      flightState.current = {
        active: true,
        startTime: performance.now(),
        duration,
        startPos: startCam,
        endPos: endCamPos,
        startLookAt: startLook,
        endLookAt: endLookAt,
        startFov,
        endFov,
        targetLimits: limits,
      };
      isTransitioning.current = true;

      if (rendererRef.current) {
        rendererRef.current.shadowMap.needsUpdate = true;
      }
    }
  };

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;
    containerSizeRef.current = { w: width, h: height };
    const isMobile = width < 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);
    const isPortrait = width < height;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x06080b);

    // 2. Camera Setup (Responsive Portrait framing on phones)
    const initialFov = isPortrait ? 62 : ROOM_STATIONS.room.fov;
    const camera = new THREE.PerspectiveCamera(initialFov, width / height, 0.05, 50);
    if (isPortrait) {
      camera.position.set(0.65, 7.05, -0.25);
    } else {
      camera.position.copy(ROOM_STATIONS.room.camPos);
    }
    cameraRef.current = camera;

    // 3. WebGL Renderer with High-Contrast ACES Filmic Tone Mapping & Mobile Optimization
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile, // Disabling on mobile dramatically cuts fragment overhead
      powerPreference: 'high-performance',
      precision: isMobile ? 'mediump' : 'highp',
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.25));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;

    // PERFORMANCE: Static Shadow Map (prevents 1,236 cubemap shadow passes per frame!)
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;
    currentMount.appendChild(renderer.domElement);
    cachedDomRectRef.current = renderer.domElement.getBoundingClientRect();

    // 4. OrbitControls with STRICT Room Containment & 360 Viewing
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.copy(ROOM_STATIONS.room.targetPos);
    controls.enablePan = false; // Strictly prevent panning outside room boundaries
    controls.minDistance = STATION_LIMITS.room.minDistance;
    controls.maxDistance = STATION_LIMITS.room.maxDistance;
    controls.minPolarAngle = Math.PI * 0.16; // Prevent flipping above ceiling
    controls.maxPolarAngle = Math.PI * 0.52; // Prevent sinking below floor (keeps camera above ground)
    controls.enableRotate = true; // Full 360-degree rotation around designated destination

    // 5. WARM, VIBRANT ARCHITECTURAL STUDIO LIGHTING (Reliable 100% illumination, zero black-outs)
    // A. Warm general ambient light guaranteeing all meshes are visible & textured
    const ambient = new THREE.AmbientLight(0xffecd6, 1.35);
    scene.add(ambient);

    // B. Soft studio fill directional light pointing into room from top-front
    const studioFill = new THREE.DirectionalLight(0xfffaea, 1.25);
    studioFill.position.set(1.5, 7.5, 1.0);
    studioFill.target.position.set(-2.5, 5.8, 0.0);
    scene.add(studioFill);
    scene.add(studioFill.target);

    // C. Warm Amber Cove Uplight placed BEHIND the monitor against the panel
    const monitorBacklight = new THREE.PointLight(0xff7a15, 8.0, 4.5);
    monitorBacklight.position.set(-2.98, 5.85, 0.08);
    scene.add(monitorBacklight);

    const monitorBacklightTop = new THREE.PointLight(0xff8c20, 5.0, 3.8);
    monitorBacklightTop.position.set(-2.98, 6.5, 0.08);
    scene.add(monitorBacklightTop);

    // D. Left Upper Shelf Warm Cove Light
    const shelfLightLeft = new THREE.PointLight(0xff9925, 4.2, 3.2);
    shelfLightLeft.position.set(-2.4, 7.0, 1.2);
    scene.add(shelfLightLeft);

    // E. Right Floating Shelf Warm Cove Light
    const shelfLightRight = new THREE.PointLight(0xff9925, 3.2, 3.0);
    shelfLightRight.position.set(-2.5, 6.45, -1.35);
    scene.add(shelfLightRight);

    // F. Table Lamp Light (Warm glow over desk surface)
    const tableLamp = new THREE.PointLight(0xfff2be, 1.8, 3.8);
    tableLamp.position.set(-0.72, 5.92, -1.62);
    scene.add(tableLamp);

    // G. Ceiling Recessed Perimeter LED Strip
    const ceilingLightCenter = new THREE.PointLight(0xfffaea, 3.0, 5.5);
    ceilingLightCenter.position.set(-1.4, 7.82, 0.0);
    scene.add(ceilingLightCenter);

    // H. Monitor Screen Cool Ambient (Soft, balanced illumination)
    const monitorScreenLight = new THREE.PointLight(0x3b77cc, 0.45, 2.5);
    monitorScreenLight.position.set(-2.4, 5.65, 0.08);
    scene.add(monitorScreenLight);

    // 6. LOAD GLB AND FIX ALL MATERIALS (MUG, VASES, WOOD, BOOKS, PAPERS)
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);
    const interactiveList = [];
    let bookCounter = 0;
    const mugTexture = createTwoToneMugTexture();
    const certificatesTexture = createCertificatesScreenTexture();
    certificatesTextureRef.current = certificatesTexture;
    const techStackTexture = createTechStackScreenTexture();
    const resumePaperTexture = createResumePaperTexture();
    const aboutMePaperTexture = createAboutMePaperTexture();
    const polaroidPhotoTexture = new THREE.TextureLoader().load('/ghayzelle-polaroid.jpg');
    polaroidPhotoTexture.flipY = true;
    polaroidPhotoTexture.generateMipmaps = true;
    polaroidPhotoTexture.minFilter = THREE.LinearMipmapLinearFilter;
    polaroidPhotoTexture.magFilter = THREE.LinearFilter;
    polaroidPhotoTexture.anisotropy = 16;

    loader.load(
      '/desk.glb',
      (gltf) => {
        const model = gltf.scene;

        model.traverse((child) => {
          const name = (child.name || '').toLowerCase();
          const parentName = (child.parent?.name || '').toLowerCase();

          // Remove the office chair completely
          if (name.includes('chair') || parentName.includes('chair')) {
            child.visible = false;
            return;
          }

          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            const matName = child.material ? (Array.isArray(child.material) ? child.material.map(m => m.name || '').join(' ') : (child.material.name || '')).toLowerCase() : '';

            // Hide meshes outside the room, duplicate curtain layers, and the glass mesh directly covering laptop screen
            if (
              name.includes('cube.004') ||
              name.includes('backdrop') ||
              name.includes('outside') ||
              name.includes('voilage') ||
              name.includes('plane.020') ||
              name.includes('509_1') || // Hide the reflective Glass mesh directly covering the laptop screen
              (matName === 'glass' && (parentName.includes('plane.001') || parentName.includes('plane001')))
            ) {
              child.visible = false;
              return;
            }

            // Tag interactive objects for clicks
            if (
              (name.includes('monitor') || matName.includes('monitor_screen')) &&
              !name.includes('screen_low')
            ) {
              child.userData = { station: 'portfolio' };
              interactiveList.push(child);
            } else if (
              name.includes('samsung') ||
              name.includes('book 2') ||
              name.includes('laptop') ||
              name.includes('plane509') ||
              name.includes('plane001') ||
              name.includes('plane.001') ||
              parentName.includes('plane001') ||
              parentName.includes('samsung')
            ) {
              child.userData = { station: 'techstack' };
              interactiveList.push(child);
            } else if (name.includes('bullet') || name.includes('photo') || name.includes('pin')) {
              child.userData = { station: 'aboutme' };
              interactiveList.push(child);
            } else if (name.includes('resume') || name.includes('paper')) {
              child.userData = { station: 'resume' };
              interactiveList.push(child);
            }

            // 0. LAPTOP SCREEN (Samsung Galaxy Book 2)
            const isLaptopScreen =
              name.includes('509_2') ||
              (matName === 'screen' && (parentName.includes('plane001') || parentName.includes('plane.001') || parentName.includes('samsung') || name.includes('plane')));

            if (isLaptopScreen) {
              techStackTexture.needsUpdate = true;
              if (child.geometry?.attributes?.uv1 && !child.geometry.attributes.uv) {
                child.geometry.attributes.uv = child.geometry.attributes.uv1;
              }
              child.material = new THREE.MeshStandardMaterial({
                map: techStackTexture,
                emissiveMap: techStackTexture,
                color: new THREE.Color(0xffffff),
                emissive: new THREE.Color(0xffffff),
                emissiveIntensity: 0.32,
                roughness: 0.35,
                metalness: 0.0,
                side: THREE.DoubleSide,
              });
              child.material.needsUpdate = true;
              child.userData = { station: 'techstack' };
              interactiveList.push(child);
              return;
            }

            // 0B. CURVED ULTRAWIDE MONITOR SCREEN (Projects & Certificates)
            if (
              name.includes('screen_low') ||
              matName.includes('monitor_screen')
            ) {
              monitorMeshRef.current = child;
              const initialTex = monitorTextureRef.current;
              if (initialTex) initialTex.needsUpdate = true;
              child.material = new THREE.MeshStandardMaterial({
                map: initialTex,
                emissiveMap: initialTex,
                color: new THREE.Color(0x181818), // subtle diffuse catch so screen seamlessly integrates with ambient
                emissive: new THREE.Color(0xffffff),
                emissiveIntensity: 0.95, // vivid, crisp high-contrast self-illumination
                roughness: 0.4,
                metalness: 0.0,
                side: THREE.DoubleSide,
              });
              child.material.needsUpdate = true;
              child.userData = { station: 'portfolio', isScreen: true };
              interactiveList.push(child);
              return;
            }

            // 0C. CLEAN PAPER STACK UNDERNEATH RESUME (LARGE DESK PAPER PILES)
            if (
              name === 'plane.015' ||
              name === 'plane015' ||
              (parentName.includes('paper stack') && child.isMesh) ||
              matName.includes('paper.001')
            ) {
              child.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(0xf6f6f6),
                roughness: 0.9,
                metalness: 0.0,
              });
              child.material.needsUpdate = true;
              child.userData = { station: 'resume' };
              interactiveList.push(child);
              return;
            }

            // 0D. ABOUT ME PAPER DOCUMENT ON BULLETIN BOARD
            if (
              name === 'film.002' ||
              (name.includes('film') && name.includes('002'))
            ) {
              aboutMePaperTexture.needsUpdate = true;
              child.geometry = child.geometry.clone();
              const posAttr = child.geometry.attributes.position;
              const uvAttr = child.geometry.attributes.uv;
              if (posAttr && uvAttr) {
                // Front face of Cube.037 faces towards room camera (z < -0.1)
                // In local space due to -94.2 deg Z rotation:
                // Correctly un-mirrored so text reads naturally left-to-right (u = (y + 1) * 0.5)
                // Vertically right-side up (v = (x + 1) * 0.5 with flipY = false on canvas texture)
                for (let i = 0; i < posAttr.count; i++) {
                  const z = posAttr.getZ(i);
                  if (z < -0.1) {
                    const x = posAttr.getX(i);
                    const y = posAttr.getY(i);
                    const u = (1 - y) * 0.5;
                    const v = (x + 1) * 0.5;
                    uvAttr.setXY(i, u, v);
                  } else {
                    uvAttr.setXY(i, 0.01, 0.01);
                  }
                }
                uvAttr.needsUpdate = true;
                if (child.geometry.attributes.uv1) {
                  child.geometry.attributes.uv1 = uvAttr;
                }
              }
              child.material = new THREE.MeshStandardMaterial({
                map: aboutMePaperTexture,
                emissiveMap: aboutMePaperTexture,
                emissive: new THREE.Color(0xffffff),
                emissiveIntensity: 0.28, // Crisp natural contrast with bold black ink, zero light-bleach
                roughness: 0.85, // Authentic matte memo paper texture
                metalness: 0.0,
                side: THREE.DoubleSide,
              });
              child.material.needsUpdate = true;
              child.userData = { station: 'aboutme' };
              interactiveList.push(child);
              return;
            }

            // 0E. POLAROID PHOTO ON BULLETIN BOARD (Node 175 / film.001 - Crocodile Photo)
            if (
              name === 'film.001' ||
              (name.includes('film') && name.includes('001'))
            ) {
              child.geometry = child.geometry.clone();
              const posAttr = child.geometry.attributes.position;
              const uvAttr = child.geometry.attributes.uv;
              if (posAttr && uvAttr) {
                // In local plane geometry:
                // With flipY = true:
                // u = (1 - x) * 0.5 maps crocodile head to left, tail to right
                // v = (z + 1) * 0.5 maps hat to top, body/feet to bottom (upright)
                for (let i = 0; i < posAttr.count; i++) {
                  const x = posAttr.getX(i);
                  const z = posAttr.getZ(i);
                  const u = (1 - x) * 0.5;
                  const v = (z + 1) * 0.5;
                  uvAttr.setXY(i, u, v);
                }
                uvAttr.needsUpdate = true;
                if (child.geometry.attributes.uv1) {
                  child.geometry.attributes.uv1 = uvAttr;
                }
              }
              child.material = new THREE.MeshStandardMaterial({
                map: polaroidPhotoTexture,
                emissiveMap: polaroidPhotoTexture,
                emissive: new THREE.Color(0xffffff),
                emissiveIntensity: 0.45,
                roughness: 0.25, // Glossy photo finish
                metalness: 0.05,
                side: THREE.DoubleSide,
              });
              child.material.needsUpdate = true;
              child.userData = { station: 'aboutme' };
              interactiveList.push(child);
              return;
            }

            // 0F. POLAROID WHITE FRAME/BORDER (Node 174 / film)
            if (name === 'film' && !name.includes('.')) {
              child.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(0xfcfcfc), // Classic white Polaroid card stock
                roughness: 0.85,
                metalness: 0.0,
                side: THREE.DoubleSide,
              });
              child.material.needsUpdate = true;
              child.userData = { station: 'aboutme' };
              interactiveList.push(child);
              return;
            }

            // 1. CURTAIN DRAPES (Completely replace material - eliminates zebra stripes)
            if (
              name.includes('curtain') ||
              name.includes('rideau') ||
              name.includes('plane.019') ||
              (child.material && ((child.material.name || '').toLowerCase().includes('tissus') || (child.material.name || '').toLowerCase().includes('curtain')))
            ) {
              child.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(0x9a9388), // Natural warm linen taupe drape
                roughness: 0.95,
                metalness: 0.0,
                side: THREE.DoubleSide,
              });
              child.material.needsUpdate = true;
              return;
            }

            // 2. VASES ON RIGHT FLOATING SHELF (Nordic Handle Vases beside books)
            const isNordicVase =
              parentName.includes('nordic') ||
              name === 'vase' ||
              name === 'vase.001' ||
              name === 'circle' ||
              name === 'circle.002' ||
              (child.material && (child.material.name || '').toLowerCase().includes('speckled ceramic'));

            if (isNordicVase) {
              // Strip vertex colors that override shaders with glowing white
              if (child.geometry?.attributes?.color) {
                child.geometry.deleteAttribute('color');
              }
              if (child.geometry?.attributes?.color_1) {
                child.geometry.deleteAttribute('color_1');
              }

              const matName = (child.material?.name || '').toLowerCase();
              // Node 202 / Circle / Speckled Ceramic.002 = Matte Charcoal Black Ceramic
              // Node 203 / Circle.002 / Speckled Ceramic = Dusty Cobalt Blue Ceramic
              const isCharcoalBlack =
                matName.includes('002') ||
                name === 'vase' ||
                name === 'circle';

              child.material = new THREE.MeshStandardMaterial({
                color: isCharcoalBlack
                  ? new THREE.Color(0x1a1c21) // Matte charcoal black ceramic
                  : new THREE.Color(0x274e73), // Dusty cobalt / teal blue ceramic
                roughness: isCharcoalBlack ? 0.65 : 0.35,
                metalness: 0.05,
                emissive: new THREE.Color(0x000000),
                emissiveIntensity: 0.0,
                side: THREE.DoubleSide,
              });
              child.material.needsUpdate = true;
              return;
            }

            // MATERIAL RESTORATION & COLOR RECOVERY (EXACT IMAGE 2)
            if (child.material) {
              const mats = Array.isArray(child.material) ? child.material : [child.material];
              mats.forEach((mat, mIdx) => {
                mat.side = THREE.DoubleSide;
                mat.needsUpdate = true;

                const matName = (mat.name || '').toLowerCase();

                // 1. THE MUG (Cylinder.032 - two-tone dipped clay)
                if (name.includes('cylinder.032') || matName.includes('coated clay')) {
                  mat.map = mugTexture;
                  mat.color = new THREE.Color(0xffffff);
                  mat.roughness = 0.35; // glazed ceramic sheen
                  mat.metalness = 0.05;
                }

                // 2. THE SAUCER / COASTER UNDER THE MUG (Cylinder.033 - warm cork/wood)
                if (name.includes('cylinder.033') || matName.includes('pressed sawdust')) {
                  mat.color = new THREE.Color(0xbf7f49);
                  mat.roughness = 0.85;
                  mat.metalness = 0.0;
                }

                // 3. VASES ON THE LEFT FLOATING SHELF
                // A. Emerald Green Reactive Glaze Ribbed Vase (Vase.003)
                if (name.includes('vase.003') || matName.includes('material.022')) {
                  mat.color = new THREE.Color(0x2d4d38); // Deep emerald glaze
                  mat.roughness = 0.45;
                }
                // B. Smoked Dark Glass Vase (Ikea Glass Vase)
                if (name.includes('ikea glass vase') || matName.includes('glass.001')) {
                  mat.color = new THREE.Color(0x1a1e24);
                  mat.transmission = 0.82;
                  mat.roughness = 0.12;
                }

                // 4. WOOD SLAT WALL PANEL (Behind Monitor)
                if (matName.includes('wood smooth walnut')) {
                  mat.color = new THREE.Color(0x8f582f); // Warm rich walnut slats
                  mat.roughness = 0.65;
                  mat.metalness = 0.05;
                } else if (matName.includes('material.019')) {
                  mat.color = new THREE.Color(0x111113); // Dark acoustic backing gap
                  mat.roughness = 0.95;
                  mat.metalness = 0.0;
                }

                // 5. BOOKS ON SHELVES (Color Palette Recovery)
                if (
                  matName.includes('book cover') ||
                  (name.includes('cube.1') && !name.includes('panel')) ||
                  (name.includes('cube.00') && !name.includes('panel'))
                ) {
                  const bookMat = mat.clone();
                  const colorHex = BOOK_PALETTE[bookCounter % BOOK_PALETTE.length];
                  bookCounter++;
                  bookMat.color = new THREE.Color(colorHex);
                  bookMat.roughness = 0.7;
                  bookMat.metalness = 0.0;
                  if (Array.isArray(child.material)) {
                    child.material[mIdx] = bookMat;
                  } else {
                    child.material = bookMat;
                  }
                }

                // 6. BOOK PAGES
                if (matName.includes('stacked paper') || matName.includes('pages')) {
                  mat.color = new THREE.Color(0xf0ece1);
                  mat.roughness = 0.9;
                }

                // 7. PAPERS ON DESK (Separate top paper and bottom paper)
                if (name.includes('paper_a4') || matName.includes('papera4') || matName.includes('white recycled paper')) {
                  if (name === 'paper_a4' || name.includes('001')) {
                    // Top resume paper: Crisp bright white
                    mat.color = new THREE.Color(0xfafafa);
                    mat.roughness = 0.85;
                  } else {
                    // Paper below: Darker warm cream with subtle contrast
                    mat.color = new THREE.Color(0xd4cdc0);
                    mat.roughness = 0.95;
                  }
                }

                // 8. RETRO ALARM CLOCK (Warm Orange on Desk)
                if (name.includes('alarm clock') || matName.includes('clock')) {
                  if (!matName.includes('face') && !matName.includes('dial')) {
                    mat.color = new THREE.Color(0xff6a14); // Warm retro orange
                    mat.roughness = 0.35;
                  }
                }

                // 9. PLASTER WALLS
                if (matName.includes('plaster') || matName.includes('wall')) {
                  mat.color = new THREE.Color(0xaea59b);
                  mat.roughness = 0.95;
                  mat.metalness = 0.0;
                }

                // 10. CEILING COVE
                if (matName.includes('ceiling') || (child.name.toLowerCase().includes('ceiling') && !name.includes('lights'))) {
                  mat.color = new THREE.Color(0x383028);
                  mat.roughness = 0.9;
                }

                // 11. LED COVE & FILAMENT
                if (matName.includes('light') || matName.includes('led') || matName.includes('filament')) {
                  mat.emissive = new THREE.Color(0xffaa44);
                  mat.emissiveIntensity = 3.5;
                }


              });
            }
          }
        });

        // DEDICATED CRISP PRINTED RESUME SHEET ON DESK (HIGH CONTRAST & SELF-ILLUMINATED TEXTURE)
        resumePaperTexture.needsUpdate = true;
        const resumeGeo = new THREE.PlaneGeometry(0.42, 0.594); // matches the paper stack on the desk
        const resumeMat = new THREE.MeshStandardMaterial({
          map: resumePaperTexture,
          emissiveMap: resumePaperTexture,
          emissive: new THREE.Color(0xffffff),
          emissiveIntensity: 0.45,
          color: new THREE.Color(0xffffff),
          roughness: 0.4,
          metalness: 0.0,
          side: THREE.DoubleSide,
        });
        const resumeMesh = new THREE.Mesh(resumeGeo, resumeMat);
        resumeMesh.name = 'resumePaperSheet';
        resumeMesh.position.set(-0.827, 5.606, -1.579);
        resumeMesh.rotation.set(-Math.PI / 2, 0, -0.25);
        resumeMesh.userData = { station: 'resume' };
        resumeMesh.castShadow = true;
        resumeMesh.receiveShadow = true;
        model.add(resumeMesh);
        interactiveList.push(resumeMesh);

        interactiveMeshesRef.current = interactiveList;
        scene.add(model);
        isModelLoadedRef.current = true;
        targetProgressRef.current = 100;
        renderer.shadowMap.needsUpdate = true;
      },
      (xhr) => {
        let pct = 0;
        if (xhr.total > 0) {
          pct = Math.round((xhr.loaded / xhr.total) * 100);
        } else {
          const approxTotal = 24156136;
          pct = Math.round((xhr.loaded / approxTotal) * 100);
        }
        targetProgressRef.current = Math.max(targetProgressRef.current, Math.min(pct, 99));
      },
      (err) => {
        console.error('Error loading desk.glb:', err);
        isModelLoadedRef.current = true;
        setLoading(false);
      }
    );

    // 7. Raycasting on Click & Hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let pointerQueued = false;
    const handlePointerMove = (e) => {
      const rect = cachedDomRectRef.current || renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!pointerQueued) {
        pointerQueued = true;
        requestAnimationFrame(() => {
          pointerQueued = false;
          if (isPausedRef.current) return;
          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(interactiveMeshesRef.current, false);

          if (intersects.length > 0) {
            const station = intersects[0].object.userData.station;
            setHoveredStation(station);
            renderer.domElement.style.cursor = 'pointer';

            if (station === 'portfolio' && monitorMeshRef.current?.material) {
              monitorMeshRef.current.material.emissiveIntensity = 1.05;
            } else if (monitorMeshRef.current?.material) {
              monitorMeshRef.current.material.emissiveIntensity = 0.95;
            }
          } else {
            setHoveredStation(null);
            renderer.domElement.style.cursor = 'grab';
            if (monitorMeshRef.current?.material) {
              monitorMeshRef.current.material.emissiveIntensity = 0.95;
            }
          }
        });
      }
    };

    const handleClick = (e) => {
      if (isPausedRef.current || flightState.current.active) return;
      if (e) {
        const rect = cachedDomRectRef.current || renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      }
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshesRef.current, false);
      if (intersects.length > 0) {
        const hit = intersects[0];
        const station = hit.object.userData.station;
        if (station) {
          const currentStation = activeStationRef.current;
          if (station === 'portfolio') {
            if (currentStation === 'portfolio') {
              // 1. Check if clicked "View Repository" button in bottom right corner
              const isViewRepo = hit.uv && hit.uv.x > 0.85 && hit.uv.y > 0.82;
              if (isViewRepo) {
                const currentProj = PORTFOLIO_PROJECTS[carouselIndexRef.current];
                if (currentProj?.github) {
                  window.open(currentProj.github, '_blank', 'noopener,noreferrer');
                  return;
                }
              }

              // 2. Bi-directional 3D Monitor navigation: click left side for Prev (-1), right side for Next (+1)
              const isLeft = (hit.uv && typeof hit.uv.x === 'number')
                ? hit.uv.x < 0.5
                : (hit.point ? hit.point.z > 0.08 : false);

              if (isLeft) {
                const prevIdx = (carouselIndexRef.current - 1 + 3) % 3;
                updateMonitorProject(prevIdx, -1);
              } else {
                const nextIdx = (carouselIndexRef.current + 1) % 3;
                updateMonitorProject(nextIdx, 1);
              }
            } else {
              goToStation('portfolio');
            }
            return;
          } else {
            goToStation(station);
          }
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointermove', handlePointerMove);
    domEl.addEventListener('click', handleClick);

    // Cache DOM element references once at mount to eliminate per-frame getElementById lookups
    const getCalloutElements = (id) => {
      let els = elementsRef.current[id];
      if (!els || !els.badge) {
        els = {
          badge: document.getElementById(`callout-badge-${id}`),
          lineGlow: document.getElementById(`callout-line-glow-${id}`),
          line: document.getElementById(`callout-line-${id}`),
          dot: document.getElementById(`callout-dot-${id}`),
          halo: document.getElementById(`callout-halo-${id}`),
        };
        elementsRef.current[id] = els;
      }
      return els;
    };

    for (let i = 0; i < CALLOUT_CONFIG.length; i++) {
      getCalloutElements(CALLOUT_CONFIG[i].id);
    }

    // Reusable projection vectors to avoid per-frame GC allocations
    const projBadgeVec = new THREE.Vector3();
    const projTargetVec = new THREE.Vector3();

    // 8. Animation Loop with Continuous Cinematic Camera Flight & Collision Avoidance
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Instantly suspend 3D GPU render loop when viewing the live web portfolio
      if (isPausedRef.current) return;

      if (flightState.current.active) {
        const flight = flightState.current;
        const now = performance.now();
        const elapsed = now - flight.startTime;
        const rawT = Math.min(Math.max(elapsed / flight.duration, 0), 1);

        // Silky, gentle Sine Ease-In-Out: cuts peak acceleration in half compared to cubic easing,
        // completely eliminating the abrupt "woosh" rush for a weightless, floating cinematic glide
        const ease = 0.5 * (1 - Math.cos(Math.PI * rawT));

        camera.position.lerpVectors(flight.startPos, flight.endPos, ease);
        controls.target.lerpVectors(flight.startLookAt, flight.endLookAt, ease);

        camera.fov = flight.startFov + (flight.endFov - flight.startFov) * ease;
        camera.updateProjectionMatrix();
        camera.lookAt(controls.target);

        if (rawT >= 1) {
          flight.active = false;
          isTransitioning.current = false;

          camera.position.copy(flight.endPos);
          controls.target.copy(flight.endLookAt);
          camera.fov = flight.endFov;
          camera.updateProjectionMatrix();

          // Flight complete: safely apply station min/max limits & re-enable OrbitControls
          controls.minDistance = flight.targetLimits.minDistance;
          controls.maxDistance = flight.targetLimits.maxDistance;
          controls.enabled = true;
          controls.update();

          if (renderer.shadowMap) {
            renderer.shadowMap.needsUpdate = true;
          }
        }
      } else {
        controls.update();

        // Enforce strict interior room boundaries only during free orbit exploration (not during flight)
        camera.position.x = Math.max(-2.75, Math.min(1.82, camera.position.x));
        camera.position.y = Math.max(5.35, Math.min(7.55, camera.position.y));
        camera.position.z = Math.max(-1.95, Math.min(1.85, camera.position.z));
      }

      renderer.render(scene, camera);

      // Project 3D callout badges & glowing pointer lines (only active when in 'room' view)
      if (mountRef.current && activeStationRef.current === 'room') {
        const w = containerSizeRef.current.w || currentMount.clientWidth;
        const h = containerSizeRef.current.h || currentMount.clientHeight;
        const isMobileScreen = w < 768;

        const badgeList = [];
        const badgeWidth = isMobileScreen ? 98 : 136;
        const badgeHeight = isMobileScreen ? 34 : 40;

        for (let i = 0; i < CALLOUT_CONFIG.length; i++) {
          const c = CALLOUT_CONFIG[i];
          projBadgeVec.copy(c.badgePos).project(camera);
          projTargetVec.copy(c.targetPos).project(camera);

          if (projBadgeVec.z < 1.0 && projTargetVec.z < 1.0) {
            const bx = (projBadgeVec.x * 0.5 + 0.5) * w;
            const by = (-(projBadgeVec.y * 0.5) + 0.5) * h;
            const tx = (projTargetVec.x * 0.5 + 0.5) * w;
            const ty = (-(projTargetVec.y * 0.5) + 0.5) * h;

            badgeList.push({
              id: c.id,
              bx,
              by,
              tx,
              ty,
              w: badgeWidth,
              h: badgeHeight,
              visible: true,
            });
          } else {
            badgeList.push({
              id: c.id,
              bx: 0,
              by: 0,
              tx: 0,
              ty: 0,
              w: badgeWidth,
              h: badgeHeight,
              visible: false,
            });
          }
        }

        // Active Anti-Collision Resolution & Viewport Clamping (Guarantees ZERO overlaps on phones)
        const padX = isMobileScreen ? 10 : 18;
        const topPad = isMobileScreen ? 68 : 80; // Stay comfortably below top nav
        const bottomPad = isMobileScreen ? 44 : 54; // Stay comfortably above bottom
        
        // 1. Initial viewport clamp
        for (let i = 0; i < badgeList.length; i++) {
          const b = badgeList[i];
          if (!b.visible) continue;
          b.bx = Math.max(padX + b.w / 2, Math.min(w - padX - b.w / 2, b.bx));
          b.by = Math.max(topPad + b.h / 2, Math.min(h - bottomPad - b.h / 2, b.by));
        }

        // 2. Iterative pairwise repulsion (3 passes guarantee zero overlapping)
        const gapX = isMobileScreen ? 8 : 14;
        const gapY = isMobileScreen ? 10 : 16;
        for (let pass = 0; pass < 3; pass++) {
          for (let i = 0; i < badgeList.length; i++) {
            for (let j = i + 1; j < badgeList.length; j++) {
              const b1 = badgeList[i];
              const b2 = badgeList[j];
              if (!b1.visible || !b2.visible) continue;

              const overlapX = (b1.w + b2.w) / 2 + gapX - Math.abs(b1.bx - b2.bx);
              const overlapY = (b1.h + b2.h) / 2 + gapY - Math.abs(b1.by - b2.by);

              if (overlapX > 0 && overlapY > 0) {
                // Separate along the axis with smaller overlap
                if (overlapY <= overlapX) {
                  const shift = overlapY * 0.5 + 2;
                  if (b1.by < b2.by) {
                    b1.by = Math.max(topPad + b1.h / 2, b1.by - shift);
                    b2.by = Math.min(h - bottomPad - b2.h / 2, b2.by + shift);
                  } else {
                    b1.by = Math.min(h - bottomPad - b1.h / 2, b1.by + shift);
                    b2.by = Math.max(topPad + b2.h / 2, b2.by - shift);
                  }
                } else {
                  const shift = overlapX * 0.5 + 2;
                  if (b1.bx < b2.bx) {
                    b1.bx = Math.max(padX + b1.w / 2, b1.bx - shift);
                    b2.bx = Math.min(w - padX - b2.w / 2, b2.bx + shift);
                  } else {
                    b1.bx = Math.min(w - padX - b1.w / 2, b1.bx + shift);
                    b2.bx = Math.max(padX + b2.w / 2, b2.bx - shift);
                  }
                }
              }
            }
          }
        }

        // Apply fast GPU transforms to elements
        for (let i = 0; i < badgeList.length; i++) {
          const b = badgeList[i];
          const els = getCalloutElements(b.id);
          if (!els || !els.badge) continue;

          if (b.visible) {
            els.badge.style.transform = `translate3d(${b.bx}px, ${b.by}px, 0) translate(-50%, -50%)`;
            els.badge.style.display = 'inline-flex';

            if (els.lineGlow) {
              els.lineGlow.setAttribute('x1', b.bx);
              els.lineGlow.setAttribute('y1', b.by);
              els.lineGlow.setAttribute('x2', b.tx);
              els.lineGlow.setAttribute('y2', b.ty);
              els.lineGlow.style.display = 'block';
            }
            if (els.line) {
              els.line.setAttribute('x1', b.bx);
              els.line.setAttribute('y1', b.by);
              els.line.setAttribute('x2', b.tx);
              els.line.setAttribute('y2', b.ty);
              els.line.style.display = 'block';
            }
            if (els.dot) {
              els.dot.setAttribute('cx', b.tx);
              els.dot.setAttribute('cy', b.ty);
              els.dot.style.display = 'block';
            }
            if (els.halo) {
              els.halo.setAttribute('cx', b.tx);
              els.halo.setAttribute('cy', b.ty);
              els.halo.style.display = 'block';
            }
          } else {
            els.badge.style.display = 'none';
            if (els.lineGlow) els.lineGlow.style.display = 'none';
            if (els.line) els.line.style.display = 'none';
            if (els.dot) els.dot.style.display = 'none';
            if (els.halo) els.halo.style.display = 'none';
          }
        }
      } else if (mountRef.current && activeStationRef.current !== 'room') {
        for (let i = 0; i < CALLOUT_CONFIG.length; i++) {
          const c = CALLOUT_CONFIG[i];
          const els = getCalloutElements(c.id);
          if (els && els.badge && els.badge.style.display !== 'none') {
            els.badge.style.display = 'none';
            if (els.lineGlow) els.lineGlow.style.display = 'none';
            if (els.line) els.line.style.display = 'none';
            if (els.dot) els.dot.style.display = 'none';
            if (els.halo) els.halo.style.display = 'none';
          }
        }
      }
    };
    animate();

    // 9. Resize (Caches dimensions and dynamically adapts portrait FOV & camera distance)
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      containerSizeRef.current = { w, h };
      cachedDomRectRef.current = renderer.domElement.getBoundingClientRect();
      const isPortraitNow = w < h;
      if (activeStationRef.current === 'room') {
        camera.fov = isPortraitNow ? 62 : ROOM_STATIONS.room.fov;
        if (isPortraitNow && !flightState.current.active) {
          camera.position.set(0.65, 7.05, -0.25);
        }
      }
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.shadowMap.needsUpdate = true;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      if (transitionAnimIdRef.current) {
        cancelAnimationFrame(transitionAnimIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('pointermove', handlePointerMove);
      domEl.removeEventListener('click', handleClick);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 150,
        backgroundColor: '#0a0d13',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* 
          TOP BAR & NAVIGATION CONTROLS
      */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: 'clamp(12px, 2.5vw, 16px) clamp(14px, 3.5vw, 28px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(to bottom, rgba(6,8,11,0.95), rgba(6,8,11,0))',
          zIndex: 50,
          pointerEvents: 'none',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'auto' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 77, 21, 0.12)',
              border: '1px solid rgba(255, 77, 21, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 18px rgba(255, 77, 21, 0.28)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <GazedLogo size={24} color="#ff7728" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '900',
                letterSpacing: '-0.02em',
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.15,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>gaze.d</span>
            </h3>
            <span
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#94a3b8',
                letterSpacing: '0.02em',
              }}
            >
              Ghayzelle Dizon
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            pointerEvents: 'auto',
            padding: '8px 14px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: '600',
            backdropFilter: 'blur(8px)',
          }}
        >
          <X size={16} />
          <span>Exit Studio</span>
        </button>
      </div>

      {/*
          3D VIEWPORT CONTAINER
      */}
      <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
        {/* Loading Progress with smooth fade out */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0d13',
            zIndex: 30,
            opacity: loading ? 1 : 0,
            pointerEvents: loading ? 'auto' : 'none',
            transition: 'opacity 0.6s ease',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              border: '4px solid rgba(255, 77, 21, 0.2)',
              borderTopColor: '#ff4d15',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '20px',
            }}
          />
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', marginBottom: '14px' }}>
            Setting up the studio... ({progress}%)
          </h3>
          <div
            style={{
              width: '320px',
              height: '8px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: '99px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: '#ff4d15',
                boxShadow: '0 0 14px #ff4d15',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>

        {/* 3D Hover Tooltip Indicator (only show when not already at that station) */}
        {hoveredStation && !loading && hoveredStation !== activeStation && (
          <div
            style={{
              position: 'absolute',
              top: '80px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(15, 18, 25, 0.88)',
              border: '1px solid #ff4d15',
              padding: '8px 18px',
              borderRadius: '100px',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              pointerEvents: 'none',
              boxShadow: '0 4px 20px rgba(255, 77, 21, 0.4)',
              zIndex: 25,
            }}
          >
            <Sparkles size={14} color="#ff7728" />
            <span>Click to explore {ROOM_STATIONS[hoveredStation]?.name}</span>
          </div>
        )}
      </div>

      {/*
          STATION PANELS (DISPLAYED WHEN ZOOMED IN)
      */}

      {/* 1. PORTFOLIO & CERTIFICATES STATION PANEL (CURVED ULTRAWIDE MONITOR) */}
      {activeStation === 'portfolio' && !panelDismissed && (
        <div
          className="station-info-panel"
          style={{
            width: 'min(460px, calc(100vw - 20px))',
            border: '1px solid rgba(255, 120, 60, 0.35)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(255, 77, 21, 0.2)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <Monitor size={18} color="#ff7728" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.08em', color: '#ff8a5c', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                PORTFOLIO • FEATURED PROJECTS
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <button
                onClick={() => goToStation('room')}
                title="Return to Studio View"
                style={{
                  background: 'rgba(255, 120, 60, 0.12)',
                  border: '1px solid rgba(255, 120, 60, 0.3)',
                  color: '#ff8a5c',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.2s',
                }}
              >
                <Compass size={12} />
                <span>Studio</span>
              </button>
              <button
                onClick={() => setPanelDismissed(true)}
                title="Hide Panel to inspect 3D Monitor"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#94a3b8',
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Project Pills & Carousel Arrows */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '12px' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateMonitorProject((carouselIndex - 1 + 3) % 3, -1);
                  }}
                  title="Previous Project"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronLeft size={16} />
                </button>

                <div style={{ display: 'flex', gap: '6px', flex: 1 }}>
                  {PORTFOLIO_PROJECTS.map((proj, idx) => {
                    const isActive = carouselIndex === idx;
                    return (
                      <button
                        key={proj.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          updateMonitorProject(idx);
                        }}
                        style={{
                          flex: 1,
                          padding: '6px 4px',
                          borderRadius: '6px',
                          border: isActive ? `1px solid ${proj.accent}` : '1px solid rgba(255, 255, 255, 0.08)',
                          background: isActive ? `${proj.accent}22` : 'rgba(255, 255, 255, 0.04)',
                          color: isActive ? '#fff' : '#94a3b8',
                          fontSize: '11px',
                          fontWeight: isActive ? '800' : '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {proj.title}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateMonitorProject((carouselIndex + 1) % 3, 1);
                  }}
                  title="Next Project"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Interactive 3D Screen Hint */}
              <div
                style={{
                  fontSize: '11px',
                  color: '#ffaa80',
                  backgroundColor: 'rgba(255, 77, 21, 0.08)',
                  border: '1px dashed rgba(255, 77, 21, 0.3)',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={12} color="#ff7728" style={{ flexShrink: 0 }} />
                <span>Tip: Click directly on the 3D monitor screen to cycle through projects!</span>
              </div>

              {/* Current Project Details */}
              {(() => {
                const currentProj = PORTFOLIO_PROJECTS[carouselIndex];
                return (
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#fff' }}>
                        {currentProj.title}
                      </h4>
                      <span style={{ fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '100px', backgroundColor: `${currentProj.accent}25`, color: currentProj.accent, border: `1px solid ${currentProj.accent}55` }}>
                        {currentProj.tag}
                      </span>
                    </div>

                    <div style={{ fontSize: '11.5px', color: '#94a3b8', marginBottom: '8px' }}>
                      {currentProj.subtitle} • {currentProj.category}
                    </div>

                    <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                      {currentProj.desc}
                    </p>

                    {/* Highlights */}
                    <div style={{ marginBottom: '10px' }}>
                      {currentProj.highlights.map((h, i) => (
                        <div key={i} style={{ fontSize: '11.5px', color: '#94a3b8', lineHeight: 1.45, marginBottom: '3px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                          <span style={{ color: currentProj.accent, fontWeight: 'bold' }}>•</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                      {currentProj.stack.map((s, i) => (
                        <span key={i} style={{ fontSize: '10px', fontWeight: '600', padding: '2px 7px', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.06)', color: '#e2e8f0', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {currentProj.github && (
                        <a
                          href={currentProj.github}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            flex: 1,
                            padding: '8px 12px',
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            color: '#fff',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '700',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            transition: 'all 0.2s',
                          }}
                        >
                          <ExternalLink size={13} />
                          <span>View Code on GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })()}

          {/* Bottom Actions */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => goToStation('room')}
              style={{
                flex: 1,
                padding: '9px 14px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Compass size={14} />
              <span>Back to Studio</span>
            </button>
            <button
              onClick={() => setPanelDismissed(true)}
              style={{
                flex: 1,
                padding: '9px 14px',
                backgroundColor: '#ff4d15',
                color: '#fff',
                borderRadius: '8px',
                border: 'none',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(255, 77, 21, 0.35)',
              }}
            >
              <Maximize2 size={14} />
              <span>Inspect in 3D</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. TECH STACK PANEL (LAPTOP) */}
      {activeStation === 'techstack' && !panelDismissed && (
        <div
          className="station-info-panel"
          style={{
            width: 'min(440px, calc(100vw - 20px))',
            border: '1px solid rgba(100, 180, 255, 0.35)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(100, 180, 255, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <Laptop size={18} color="#60a5fa" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.08em', color: '#60a5fa', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                TECHNICAL SKILLS
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <button
                onClick={() => goToStation('room')}
                title="Return to Studio View"
                style={{
                  background: 'rgba(96, 165, 250, 0.12)',
                  border: '1px solid rgba(96, 165, 250, 0.3)',
                  color: '#93c5fd',
                  padding: '4px 10px',
                  borderRadius: '100px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Compass size={12} color="#60a5fa" />
                <span>Studio</span>
              </button>
              <button
                onClick={() => setPanelDismissed(true)}
                title="Hide panel to inspect 3D laptop"
                style={{ background: 'transparent', border: 'none', color: '#889', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '14px' }}>
            Technical Skills & Tools
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Core Web Languages */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Code size={15} color="#38bdf8" />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#38bdf8' }}>Core Languages</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {['HTML5', 'Modern CSS3', 'JavaScript (ES6+)', 'TypeScript', 'Dart', 'SQL'].map((t) => (
                  <span key={t} style={{ fontSize: '12px', backgroundColor: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.28)', padding: '4px 10px', borderRadius: '6px', color: '#bae6fd', fontWeight: '600' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Frameworks & Libraries */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Code size={15} color="#34d399" />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#34d399' }}>Frameworks & Libraries</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {['React', 'Vite', 'React Native', 'Expo', 'Expo Router', 'Flutter'].map((t) => (
                  <span key={t} style={{ fontSize: '12px', backgroundColor: 'rgba(52, 211, 153, 0.12)', border: '1px solid rgba(52, 211, 153, 0.28)', padding: '4px 10px', borderRadius: '6px', color: '#a7f3d0' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Design & UI */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Palette size={15} color="#ff7728" />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#ff7728' }}>UI/UX & 3D Design</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {['Figma (UI/UX)', 'Blender (3D Modeling)', 'Responsive Design', 'CSS Grid & Flexbox', 'Wireframing & Prototyping'].map((t) => (
                  <span key={t} style={{ fontSize: '12px', backgroundColor: 'rgba(255, 119, 40, 0.12)', border: '1px solid rgba(255, 119, 40, 0.28)', padding: '4px 10px', borderRadius: '6px', color: '#fed7aa' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend & Databases */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Layers size={15} color="#c084fc" />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#c084fc' }}>Backend & Databases</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {['Supabase (Auth, Realtime, RLS)', 'PostgreSQL', 'AsyncStorage'].map((t) => (
                  <span key={t} style={{ fontSize: '12px', backgroundColor: 'rgba(192, 132, 252, 0.12)', border: '1px solid rgba(192, 132, 252, 0.25)', padding: '4px 10px', borderRadius: '6px', color: '#e9d5ff' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Bot size={15} color="#f59e0b" />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#f59e0b' }}>Tools & Workflow</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {['Git', 'GitHub', 'EAS Build', 'VS Code'].map((t) => (
                  <span key={t} style={{ fontSize: '12px', backgroundColor: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.25)', padding: '4px 10px', borderRadius: '6px', color: '#fde68a' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. ABOUT ME PANEL (BULLETIN BOARD & POLAROID) */}
      {activeStation === 'aboutme' && !panelDismissed && (
        <div
          className="station-info-panel"
          style={{
            width: 'min(430px, calc(100vw - 20px))',
            border: '1px solid rgba(255, 170, 60, 0.35)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(255, 170, 60, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <Pin size={18} color="#ffaa40" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.08em', color: '#ffaa40', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                ABOUT ME
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <button
                onClick={() => goToStation('room')}
                title="Return to Studio View"
                style={{
                  background: 'rgba(255, 170, 60, 0.12)',
                  border: '1px solid rgba(255, 170, 60, 0.3)',
                  color: '#fcd34d',
                  padding: '4px 10px',
                  borderRadius: '100px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Compass size={12} color="#ffaa40" />
                <span>Studio</span>
              </button>
              <button
                onClick={() => setPanelDismissed(true)}
                title="Hide panel to inspect 3D board"
                style={{ background: 'transparent', border: 'none', color: '#889', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#fffdfa',
              padding: '12px 12px 16px 12px',
              borderRadius: '8px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              transform: 'rotate(-1.5deg)',
              marginBottom: '18px',
              border: '1px solid #e2dcd2',
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                maxHeight: '340px',
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundColor: '#1c2230',
              }}
            >
              <img
                src="/ghayzelle-about.png"
                alt="Ghayzelle Dizon"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  display: 'block',
                }}
              />
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px', fontWeight: '800', fontSize: '13px', color: '#1e293b', letterSpacing: '0.02em' }}>
              Ghayzelle Dizon
            </div>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ff7728', marginBottom: '10px' }}>
            Hello, I'm Ghayzelle
          </h3>
          <div style={{ fontSize: '12.5px', color: '#cbd5e1', lineHeight: 1.65, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
            <p style={{ margin: 0 }}>
              I'm someone who embraces new experiences, welcomes different ideas and perspectives, and is always open to learning.
            </p>
            <p style={{ margin: 0 }}>
              As an aspiring Front-End Developer, I enjoy turning ideas into interactive and meaningful digital experiences. I'm interested in exploring how design and technology work together to create interfaces that are both functional and engaging.
            </p>
            <p style={{ margin: 0 }}>
              I believe growth comes from stepping outside my comfort zone, taking on challenges, and turning new ideas into action. I may not have everything figured out, but I'm always moving forward, learning through experience, and finding new ways to improve.
            </p>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#f8fafc' }}>
              Holy Angel University
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>
              Bachelor of Science in Computer Science (2023 – Present)
            </div>
            <div style={{ fontSize: '11px', color: '#34d399', fontWeight: '700', marginTop: '3px' }}>
              ★ Dean's Lister: 1st Year (1st Sem), 2nd Year (1st Sem), 3rd Year
            </div>
          </div>

          {/* Personal Strengths Section */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Sparkles size={15} color="#ffaa40" />
              <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#ffaa40', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Personal Strengths
              </h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {PERSONAL_STRENGTHS.map((item) => (
                <div
                  key={item.num}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 170, 64, 0.18)',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: '800',
                      color: '#ff9f43',
                      backgroundColor: 'rgba(255, 159, 67, 0.15)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      marginTop: '2px',
                      flexShrink: 0,
                    }}
                  >
                    {item.num}
                  </span>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#f8fafc', marginBottom: '2px' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.45 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <a
              href="https://github.com/geyzz"
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1,
                padding: '8px',
                textAlign: 'center',
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: '#fff',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              GitHub (geyzz)
            </a>
            <a
              href="https://linkedin.com/in/ghayzelle-dizon"
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1,
                padding: '8px',
                textAlign: 'center',
                backgroundColor: '#0a66c2',
                color: '#fff',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      )}

      {/* 4. RESUME PANEL (STUDY DESK PAPER) */}
      {activeStation === 'resume' && !panelDismissed && (
        <div
          className="station-info-panel"
          style={{
            width: 'min(450px, calc(100vw - 20px))',
            border: '1px solid rgba(255, 77, 21, 0.4)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(255, 77, 21, 0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <FileText size={18} color="#ff4d15" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.08em', color: '#ff7728', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                RESUME
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <button
                onClick={() => goToStation('room')}
                title="Return to Studio View"
                style={{
                  background: 'rgba(255, 77, 21, 0.12)',
                  border: '1px solid rgba(255, 77, 21, 0.3)',
                  color: '#ff8a5c',
                  padding: '4px 10px',
                  borderRadius: '100px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Compass size={12} color="#ff7728" />
                <span>Studio</span>
              </button>
              <button
                onClick={() => setPanelDismissed(true)}
                title="Hide panel to inspect 3D paper"
                style={{ background: 'transparent', border: 'none', color: '#889', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Tab Selector: Resume vs Certificates */}
          <div style={{ display: 'flex', gap: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '4px', borderRadius: '8px', marginBottom: '14px' }}>
            <button
              onClick={() => setResumeTab('resume')}
              style={{
                flex: 1,
                padding: '7px 12px',
                borderRadius: '6px',
                border: 'none',
                background: resumeTab === 'resume' ? 'linear-gradient(135deg, #ff4d15, #ff7728)' : 'transparent',
                color: resumeTab === 'resume' ? '#fff' : '#94a3b8',
                fontWeight: '700',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Resume
            </button>
            <button
              onClick={() => setResumeTab('certificates')}
              style={{
                flex: 1,
                padding: '7px 12px',
                borderRadius: '6px',
                border: 'none',
                background: resumeTab === 'certificates' ? 'linear-gradient(135deg, #ff4d15, #ff7728)' : 'transparent',
                color: resumeTab === 'certificates' ? '#fff' : '#94a3b8',
                fontWeight: '700',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Award size={13} />
              <span>Certificates (3)</span>
            </button>
          </div>

          {/* TAB 1: RESUME SHEET */}
          {resumeTab === 'resume' && (
            <>
              <div
                style={{
                  backgroundColor: '#fff',
                  color: '#1a1f2c',
                  padding: '22px',
                  borderRadius: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  marginBottom: '14px',
                  fontFamily: 'sans-serif',
                }}
              >
              <div style={{ borderBottom: '2px solid #ea580c', paddingBottom: '10px', marginBottom: '14px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '900', margin: 0, color: '#0f172a' }}>
                  Ghayzelle Dizon
                </h2>
                <div style={{ fontSize: '13px', color: '#ea580c', fontWeight: '800', marginTop: '2px' }}>
                  Front-End Developer
                </div>
                <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>
                  0969 0199 663 | ghayzelle.dzn@gmail.com | gazed.vercel.app | github.com/geyzz | linkedin.com/in/ghayzelle-dizon
                </div>
              </div>

              {/* Profile */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', marginBottom: '4px' }}>
                  PROFILE
                </div>
                <p style={{ fontSize: '12px', color: '#1e293b', margin: 0, lineHeight: 1.5 }}>
                  Computer Science student and Front-End Developer with a strong passion for UI/UX design, 3D visuals, and building distinctive web and mobile interfaces. Seeking a Front-End Developer role where I can turn creative design concepts in Figma and Blender into polished, responsive applications using React, React Native, and Flutter. Works earnestly toward every goal, learns new tools quickly, and follows through from initial design to working product.
                </p>
              </div>

              {/* Technical Skills */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', marginBottom: '4px' }}>
                  TECHNICAL SKILLS
                </div>
                <div style={{ fontSize: '11.5px', color: '#1e293b', lineHeight: 1.5 }}>
                  <strong>Design &amp; UI:</strong> Figma, Blender (3D Modeling), UI/UX Design, Wireframing &amp; Prototyping, Responsive Design, Custom CSS3<br />
                  <strong>Languages:</strong> JavaScript, TypeScript, HTML5, CSS3, Dart, Python, SQL<br />
                  <strong>Frameworks &amp; Libraries:</strong> React, Vite, React Native, Expo, Expo Router, Flutter<br />
                  <strong>Backend &amp; Databases:</strong> Supabase (Auth, Realtime, Row-Level Security), PostgreSQL, AsyncStorage<br />
                  <strong>Tools:</strong> Git, GitHub, EAS Build, VS Code
                </div>
              </div>

              {/* Projects */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', marginBottom: '4px' }}>
                  PROJECTS
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '12.5px', color: '#0f172a' }}>Plan_.ed - Shopping &amp; Errand Planner App</strong>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Personal Project</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#c2410c', fontStyle: 'italic', marginBottom: '3px' }}>Tech Stack: React Native, Expo, Supabase, PostgreSQL, AsyncStorage, EAS Build</div>
                  <div style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.45 }}>• Designed and built a mobile shopping planner featuring custom light/dark themes, collapsible headers, and an interactive errand calendar with native reminder alarms.</div>
                  <div style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.45 }}>• Created smart checklists with real-time cost calculation and a directory linking items to 4 major Pampanga malls.</div>
                  <div style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.45 }}>• Implemented cloud and offline sync using Supabase and AsyncStorage, and shipped an Android APK via EAS Build.</div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '12.5px', color: '#0f172a' }}>C&amp;J Real Estate - Property Showcase &amp; Management Platform</strong>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Personal</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#c2410c', fontStyle: 'italic', marginBottom: '3px' }}>Tech Stack: React, Vite, Supabase (PostgreSQL, RLS), JavaScript (ES6+), EmailJS, Custom CSS3</div>
                  <div style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.45 }}>• Architected a full-stack real estate platform and session-authenticated Admin Portal with Supabase for real-time property CRUD listings, status management, and lead tracking.</div>
                  <div style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.45 }}>• Engineered an interactive showroom featuring dual-thumb price sliders, dynamic Philippine geographic selectors (phil-reg-prov-mun-brgy), and multi-property inquiry carts.</div>
                  <div style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.45 }}>• Integrated automated client notification workflows using EmailJS and crafted responsive CSS3 Grid layouts achieving sub-second load times and fluid modal views.</div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '12.5px', color: '#0f172a' }}>HAUtogo - Real-Time Faculty Tracking &amp; Class Management</strong>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Collaborative</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#c2410c', fontStyle: 'italic', marginBottom: '3px' }}>Tech Stack: Flutter, Dart, Supabase, flutter_map, geolocator</div>
                  <div style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.45 }}>• Built a campus mobile app for Holy Angel University with an interactive map and sliding panel UI that displays live professor locations.</div>
                  <div style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.45 }}>• Designed role-based weekly schedule views for students and professors, plus one-tap room navigation and next-class indicators.</div>
                  <div style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.45 }}>• Implemented campus geofencing and full account authentication (login, password recovery, profile management) with Supabase.</div>
                </div>
              </div>

              {/* Education */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', marginBottom: '4px' }}>
                  EDUCATION
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '12.5px', color: '#0f172a' }}>Bachelor of Science in Computer Science</strong>
                  <span style={{ fontSize: '11.5px', color: '#64748b' }}>2023 - Present</span>
                </div>
                <div style={{ fontSize: '12px', color: '#475569' }}>Holy Angel University</div>
                <div style={{ fontSize: '11.5px', color: '#0f172a', fontWeight: '600', marginTop: '2px' }}>• Dean's Lister: 1st Year (1st Semester), 2nd Year (1st Semester), 3rd Year</div>
              </div>

              {/* Certifications on sheet */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', marginBottom: '4px' }}>
                  CERTIFICATIONS
                </div>
                <div style={{ fontSize: '11.5px', color: '#1e293b', lineHeight: 1.6 }}>
                  <div>• <strong>Responsive Web Design</strong> - freeCodeCamp</div>
                  <div>• <strong>JavaScript Essentials 1</strong> - Cisco Networking Academy</div>
                  <div>• <strong>AWS Academy Graduate</strong> - Cloud Foundations - Amazon Web Services</div>
                </div>
              </div>
            </div>

            {/* Download Resume & CV Action Bar (Positioned Below Resume Sheet) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              <a
                href="/Ghayzelle_Dizon_Resume.pdf"
                download="Ghayzelle_Dizon_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '11px 16px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #ff4d15, #ff7728)',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '13px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(255, 77, 21, 0.35)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 77, 21, 0.55)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(255, 77, 21, 0.35)';
                }}
              >
                <Download size={15} />
                <span>Download Resume</span>
              </a>

              <a
                href="/Ghayzelle_Dizon_CV.pdf"
                download="Ghayzelle_Dizon_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '11px 16px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  color: '#f8fafc',
                  fontWeight: '700',
                  fontSize: '13px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <FileText size={15} color="#38bdf8" />
                <span>Download CV</span>
              </a>
            </div>
          </>
        )}

          {/* TAB 2: CERTIFICATES SHOWCASE */}
          {resumeTab === 'certificates' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
              <div
                style={{
                  fontSize: '11.5px',
                  color: '#ffaa80',
                  backgroundColor: 'rgba(255, 77, 21, 0.08)',
                  border: '1px dashed rgba(255, 77, 21, 0.3)',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Award size={16} color="#ff7728" style={{ flexShrink: 0 }} />
                <span>Verified industry credentials in modern web design, JavaScript algorithms, and cloud infrastructure.</span>
              </div>

              {CERTIFICATES_DATA.map((cert, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.09)',
                    borderRadius: '12px',
                    padding: '14px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {/* Certificate Image Preview */}
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '16 / 11.2',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginBottom: '12px',
                      border: `1.5px solid ${cert.accent}40`,
                      backgroundColor: '#070a12',
                      position: 'relative',
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={() => setSelectedCertModal(cert)}
                    title="Click to view full certificate"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease',
                        display: 'block',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1.0)'; }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(10, 15, 29, 0.88)',
                        backdropFilter: 'blur(6px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#f8fafc',
                        fontSize: '10px',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        pointerEvents: 'none',
                      }}
                    >
                      <ExternalLink size={10} color={cert.accent} />
                      <span>Full Certificate</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px', gap: '8px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#fff' }}>
                      {cert.title}
                    </div>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: '700',
                        color: cert.accent,
                        padding: '2px 8px',
                        borderRadius: '100px',
                        backgroundColor: `${cert.accent}20`,
                        border: `1px solid ${cert.accent}45`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {cert.badge}
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', color: '#ff8a5c', fontWeight: '700', marginBottom: '4px' }}>
                    {cert.issuer}
                  </div>

                  <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px' }}>
                    {cert.date}
                  </div>

                  <div style={{ fontSize: '11.5px', color: '#cbd5e1', lineHeight: 1.45, backgroundColor: 'rgba(255, 255, 255, 0.02)', padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.05)', marginBottom: '10px' }}>
                    <strong style={{ color: '#94a3b8' }}>Core Skills: </strong>
                    {cert.skills}
                  </div>

                  {/* View Certificate Button */}
                  <button
                    onClick={() => setSelectedCertModal(cert)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '7px',
                      padding: '9px 12px',
                      backgroundColor: `${cert.accent}18`,
                      border: `1px solid ${cert.accent}55`,
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${cert.accent}30`;
                      e.currentTarget.style.borderColor = cert.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${cert.accent}18`;
                      e.currentTarget.style.borderColor = `${cert.accent}55`;
                    }}
                  >
                    <Maximize2 size={13} color={cert.accent} />
                    <span>View Certificate</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          UNIFIED ACTION CONTROLS: [Studio Room View] [Show Info Panel] [View Button] [Inquire]
          Responsive for all gadgets: stacks vertically on mobile, horizontal row on desktop/tablet.
          Buttons elapse when not applicable, with Inquire as the constant anchor.
      ───────────────────────────────────────────────────────────── */}
      {!loading && (
        <div className="studio-bottom-actions">
          {/* 1. Studio Room View (Present when zoomed into any station; elapses in room view) */}
          {activeStation !== 'room' && (
            <button
              onClick={() => goToStation('room')}
              className="studio-action-btn studio-btn-room"
              title="Return to Studio Room View"
            >
              <Compass size={14} color="#ff7728" />
              <span>Studio Room View</span>
            </button>
          )}

          {/* 2. Show Info Panel (Present when station panel is dismissed; elapses when panel is open or in room view) */}
          {panelDismissed && activeStation !== 'room' && (
            <button
              onClick={() => setPanelDismissed(false)}
              className="studio-action-btn studio-btn-panel"
              title="Show Information Panel"
            >
              <Sparkles size={14} color="#ff7728" />
              <span>Show Info Panel</span>
            </button>
          )}

          {/* 3. Inquire Button (Constant anchor across all views and stations) */}
          <button
            onClick={() => {
              if (onOpenInquiry) {
                onOpenInquiry();
              } else {
                window.location.href = 'mailto:ghayzelle.dzn@gmail.com?subject=Portfolio%20Inquiry%20-%20Ghayzelle%20Dizon';
              }
            }}
            className="studio-action-btn studio-btn-inquire"
            title="Send an Inquiry"
          >
            <Mail size={14} color="#fff" />
            <span>Inquire</span>
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3D SPATIAL CALLOUT BADGES & POINTER LINES (Replaces Bottom Nav)
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: (!loading && activeStation === 'room') ? 1 : 0,
          transition: 'opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          zIndex: 25,
          overflow: 'hidden',
        }}
      >
        {/* SVG Canvas for Elegant Ambient Glowing Pointer Lines & Anchor Beacons */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            <defs>
              <filter id="softLineGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="anchorDotGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffffff" floodOpacity="0.95" />
                <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#ff7728" floodOpacity="0.75" />
              </filter>
            </defs>
            {CALLOUT_CONFIG.map((c) => (
              <g key={c.id}>
                {/* 1. Underlying Soft Glowing Ambient Atmosphere */}
                <line
                  id={`callout-line-glow-${c.id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="0"
                  stroke={c.glowColor || 'rgba(255, 119, 40, 0.65)'}
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  filter="url(#softLineGlow)"
                  style={{ display: 'none', opacity: 0.85 }}
                />
                {/* 2. Crisp Solid White Glowing Line */}
                <line
                  id={`callout-line-${c.id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="0"
                  stroke="rgba(255, 255, 255, 0.88)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ display: 'none' }}
                />
                {/* 3. Glowing Anchor Dot Touching 3D Target Item */}
                <circle
                  id={`callout-dot-${c.id}`}
                  cx="0"
                  cy="0"
                  r="3.5"
                  fill="#ffffff"
                  filter="url(#anchorDotGlow)"
                  style={{ display: 'none' }}
                />
                {/* 4. Soft Concentric Halo Beacon Ring at Anchor */}
                <circle
                  id={`callout-halo-${c.id}`}
                  cx="0"
                  cy="0"
                  r="7"
                  fill="none"
                  stroke={c.iconColor || '#ff7728'}
                  strokeWidth="1.2"
                  opacity="0.75"
                  style={{ display: 'none' }}
                />
              </g>
            ))}
          </svg>

          {/* Interactive Floating Badges (Uniform, Consistent Dimensions & Glowing Cyberpunk Glass) */}
          {CALLOUT_CONFIG.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                id={`callout-badge-${c.id}`}
                onClick={() => goToStation(c.id)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  display: 'none', // positioned dynamically in animate()
                  pointerEvents: 'auto',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'clamp(5px, 1.2vw, 9px)',
                  minWidth: 'clamp(82px, 18vw, 136px)',
                  height: 'clamp(32px, 4.4vw, 40px)',
                  padding: '0 clamp(10px, 1.8vw, 18px)',
                  borderRadius: '100px',
                  border: `1.5px solid ${c.glowColor || 'rgba(255, 120, 40, 0.5)'}`,
                  backgroundColor: 'rgba(12, 16, 24, 0.88)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  color: '#ffffff',
                  fontSize: 'clamp(10px, 1.3vw, 11.5px)',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: `0 8px 30px rgba(0,0,0,0.7), 0 0 18px ${c.glowColor || 'rgba(255, 100, 30, 0.3)'}, inset 0 1px 0 rgba(255, 255, 255, 0.22)`,
                  transition: 'box-shadow 0.22s, border-color 0.22s, background-color 0.22s',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                  willChange: 'transform',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#ffffff';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 77, 21, 0.32)';
                  e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,0,0,0.9), 0 0 32px rgba(255, 115, 30, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = c.glowColor || 'rgba(255, 120, 40, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(12, 16, 24, 0.88)';
                  e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.7), 0 0 18px ${c.glowColor || 'rgba(255, 100, 30, 0.3)'}, inset 0 1px 0 rgba(255, 255, 255, 0.22)`;
                }}
              >
                <Icon size={14} color={c.iconColor || '#ff7728'} />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>

      {/* ─────────────────────────────────────────────────────────────
          CERTIFICATE VIEWER LIGHTBOX MODAL
      ───────────────────────────────────────────────────────────── */}
      {selectedCertModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedCertModal(null)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '960px',
              backgroundColor: '#0c1018',
              borderRadius: '16px',
              border: `1.5px solid ${selectedCertModal.accent || '#ff4d15'}66`,
              boxShadow: `0 24px 64px rgba(0,0,0,0.92), 0 0 40px ${selectedCertModal.accent || '#ff4d15'}30`,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '92vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 22px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff' }}>
                  {selectedCertModal.title}
                </div>
                <div style={{ fontSize: '12px', color: selectedCertModal.accent || '#ff7728', fontWeight: '700', marginTop: '2px' }}>
                  {selectedCertModal.issuer} • {selectedCertModal.date}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {selectedCertModal.url && (
                  <a
                    href={selectedCertModal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      color: '#ffffff',
                      textDecoration: 'none',
                      padding: '7px 13px',
                      borderRadius: '8px',
                      backgroundColor: `${selectedCertModal.accent}30`,
                      border: `1px solid ${selectedCertModal.accent}80`,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${selectedCertModal.accent}50`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${selectedCertModal.accent}30`;
                    }}
                  >
                    <ExternalLink size={13} color={selectedCertModal.accent} />
                    <span>Verify Credential ↗</span>
                  </a>
                )}
                <a
                  href={selectedCertModal.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11.5px',
                    fontWeight: '700',
                    color: '#cbd5e1',
                    textDecoration: 'none',
                    padding: '7px 13px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <ExternalLink size={13} />
                  <span>Full View</span>
                </a>
                <button
                  onClick={() => setSelectedCertModal(null)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
                  title="Close"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Certificate image display */}
            <div
              style={{
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto',
                backgroundColor: '#070a10',
              }}
            >
              <img
                src={selectedCertModal.image}
                alt={selectedCertModal.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '72vh',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  boxShadow: '0 16px 44px rgba(0,0,0,0.8)',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtleHaloPulse {
          0%, 100% {
            r: 7px;
            opacity: 0.75;
          }
          50% {
            r: 9px;
            opacity: 0.45;
          }
        }
        [id^="callout-halo-"] {
          animation: subtleHaloPulse 2.8s ease-in-out infinite;
        }

        /* ── Unified Responsive Studio Action Buttons ── */
        .studio-bottom-actions {
          position: absolute;
          bottom: 24px;
          right: 28px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 50;
          pointer-events: auto;
        }
        .studio-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 100px;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: all 0.22s cubic-bezier(0.22, 1, 0.36, 1);
          white-space: nowrap;
          text-decoration: none;
          box-sizing: border-box;
          user-select: none;
        }
        .studio-btn-room {
          background-color: rgba(14, 18, 25, 0.92);
          border: 1px solid #ff4d15;
          color: #ffffff;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.6), 0 0 14px rgba(255, 77, 21, 0.3);
        }
        .studio-btn-room:hover {
          background-color: rgba(255, 77, 21, 0.24);
          transform: translateY(-2px);
        }
        .studio-btn-panel {
          background-color: rgba(15, 20, 30, 0.92);
          border: 1px solid rgba(255, 120, 60, 0.5);
          color: #ff9966;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.6);
        }
        .studio-btn-panel:hover {
          background-color: rgba(255, 120, 60, 0.22);
          transform: translateY(-2px);
        }
        .studio-btn-inquire {
          background: linear-gradient(135deg, #ff4d15, #ff7728);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          font-weight: 800;
          box-shadow: 0 4px 20px rgba(255, 77, 21, 0.45), 0 0 16px rgba(255, 77, 21, 0.3);
        }
        .studio-btn-inquire:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 24px rgba(255, 77, 21, 0.6), 0 0 24px rgba(255, 77, 21, 0.45);
        }

        /* ── Station Information Panels & Mobile Bottom Clearance ── */
        .station-info-panel {
          position: absolute;
          bottom: clamp(92px, 12vh, 114px);
          right: clamp(14px, 3vw, 36px);
          left: clamp(14px, 3vw, auto);
          max-height: min(72vh, calc(100vh - 170px));
          margin: 0 auto;
          overflow-y: auto;
          background-color: rgba(13, 17, 24, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: clamp(14px, 2.5vw, 24px);
          z-index: 40;
          animation: slideUp 0.3s ease-out;
        }

        /* Mobile View (Phones <= 640px) - Stack vertically, aligned right */
        @media (max-width: 640px) {
          .station-info-panel {
            bottom: 118px !important;
            left: 12px !important;
            right: 12px !important;
            width: calc(100vw - 24px) !important;
            max-height: calc(100vh - 195px) !important;
            padding: 14px !important;
          }
          .studio-bottom-actions {
            bottom: 14px !important;
            right: 14px !important;
            flex-direction: column-reverse !important;
            align-items: flex-end !important;
            gap: 7px !important;
            max-width: calc(100vw - 28px) !important;
          }
          .studio-action-btn {
            padding: 8px 14px !important;
            font-size: 11.5px !important;
            min-height: 38px !important;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.75) !important;
          }
        }

        /* Landscape Mobile Proportions (Short screens <= 520px height) */
        @media (max-height: 520px) {
          .station-info-panel {
            bottom: 56px !important;
            max-height: calc(100vh - 110px) !important;
            padding: 10px 14px !important;
          }
          .studio-bottom-actions {
            bottom: 8px !important;
            right: 12px !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 6px !important;
          }
          .studio-action-btn {
            padding: 6px 11px !important;
            font-size: 11px !important;
            min-height: 30px !important;
          }
        }
      `}</style>
    </div>
  );
}
