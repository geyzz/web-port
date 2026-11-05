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
    name: 'Tech Stack',
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
    camPos: new THREE.Vector3(-0.83, 6.55, -1.25),
    targetPos: new THREE.Vector3(-0.827, 5.604, -1.579),
    fov: 48,
  },
};

const STATION_LIMITS = {
  room: { minDistance: 1.5, maxDistance: 4.6 },
  portfolio: { minDistance: 0.7, maxDistance: 1.9 },
  techstack: { minDistance: 0.35, maxDistance: 0.95 },
  aboutme: { minDistance: 0.4, maxDistance: 1.1 },
  resume: { minDistance: 0.5, maxDistance: 1.4 },
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
    name: 'Tech Stack',
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

// ── PORTFOLIO DISPLAY IN LANDSCAPE TABLET FORM (DIRECTLY ON MONITOR SCREEN, 0 POPUPS) ──
function createPortfolioCarouselTexture(projectIndex = 0) {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  const projects = [
    {
      title: 'Plan_.ed - Shopping & Errand Planner App',
      tag: 'MOBILE APP • REACT NATIVE',
      desc: 'Mobile shopping planner featuring custom light/dark themes, real-time mall cost calculation, and errand reminder alarms.',
      accent: '#ff4d15',
      accentGlow: 'rgba(255, 77, 21, 0.4)',
    },
    {
      title: 'C&J Real Estate - Property Showcase Website',
      tag: 'WEB APP • REACT & CSS3',
      desc: 'Single-page real estate property website crafted with custom brand identity, hero showcase, property filters, and glassmorphic cards.',
      accent: '#06b6d4',
      accentGlow: 'rgba(6, 182, 212, 0.4)',
    },
    {
      title: 'HAUtogo - Real-Time Faculty Tracking & Management',
      tag: 'MOBILE APP • FLUTTER & DART',
      desc: 'Campus mobile app for Holy Angel University with interactive campus map, live professor GPS locator, and next-class timetables.',
      accent: '#a855f7',
      accentGlow: 'rgba(168, 85, 247, 0.4)',
    },
  ];

  const cur = projects[projectIndex % projects.length];

  // Deep dark workstation background with atmospheric ambient radial
  ctx.fillStyle = '#0a0d14';
  ctx.fillRect(0, 0, 2048, 1024);

  const radial = ctx.createRadialGradient(1024, 450, 100, 1024, 450, 800);
  radial.addColorStop(0, cur.accent + '24');
  radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, 2048, 1024);

  // Top Nav Header Bar
  ctx.fillStyle = '#0f1420';
  ctx.fillRect(0, 0, 2048, 64);

  // Window dots
  ctx.fillStyle = '#ff5f56';
  ctx.beginPath(); ctx.arc(36, 32, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffbd2e';
  ctx.beginPath(); ctx.arc(60, 32, 7, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#27c93f';
  ctx.beginPath(); ctx.arc(84, 32, 7, 0, Math.PI * 2); ctx.fill();

  // Left header label
  ctx.font = '600 15px -apple-system, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Portfolio Preview', 120, 38);

  // Center [ 2026 ] Toggle Bar
  ctx.font = '900 15px -apple-system, sans-serif';
  ctx.fillStyle = '#f8fafc';
  ctx.fillText('[ 2026 ]', 780, 38);

  const tabs = [
    { label: 'Tech Stacks', active: false, x: 880, w: 120 },
    { label: 'Portfolio', active: true, x: 1010, w: 110 },
    { label: 'Certification', active: false, x: 1130, w: 130 },
    { label: 'Resume', active: false, x: 1270, w: 100 },
  ];

  tabs.forEach((tab) => {
    if (tab.active) {
      ctx.fillStyle = cur.accent;
      ctx.beginPath();
      ctx.roundRect(tab.x, 15, tab.w, 34, 17);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(tab.label, tab.x + 18, 37);
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.beginPath();
      ctx.roundRect(tab.x, 15, tab.w, 34, 17);
      ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 13px sans-serif';
      ctx.fillText(tab.label, tab.x + 16, 37);
    }
  });

  // Right Header Label
  ctx.font = '600 14px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.textAlign = 'right';
  ctx.fillText('Landscape Tablet Showcase', 1990, 38);
  ctx.textAlign = 'left';

  // ── TABLET IN LANDSCAPE FORM ──
  const tabW = 1260;
  const tabH = 590;
  const tabX = (2048 - tabW) / 2;
  const tabY = 95;

  // Tablet Chassis Frame
  ctx.fillStyle = '#141824';
  ctx.strokeStyle = cur.accent;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.roundRect(tabX, tabY, tabW, tabH, 26);
  ctx.fill();
  ctx.stroke();

  // Tablet Camera Pinhole on top bezel
  ctx.fillStyle = '#262d3d';
  ctx.beginPath();
  ctx.arc(tabX + tabW / 2, tabY + 7, 4, 0, Math.PI * 2);
  ctx.fill();

  // Tablet Screen Area
  const scrX = tabX + 16;
  const scrY = tabY + 20;
  const scrW = tabW - 32;
  const scrH = tabH - 36;

  ctx.fillStyle = '#07090f';
  ctx.beginPath();
  ctx.roundRect(scrX, scrY, scrW, scrH, 16);
  ctx.fill();

  // Screen Status Bar
  ctx.fillStyle = '#0f1420';
  ctx.fillRect(scrX, scrY, scrW, 30);
  ctx.font = '12px monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('9:41 AM • Landscape Tablet Mode', scrX + 18, scrY + 20);
  ctx.fillStyle = cur.accent;
  ctx.font = 'bold 12px monospace';
  ctx.fillText(cur.tag, scrX + scrW - 270, scrY + 20);

  // ── LITERAL PREVIEWS INSIDE THE LANDSCAPE TABLET ──
  if (projectIndex === 0) {
    // ── PLAN_.ED SHOPPING & ERRANDS APP LITERAL PREVIEW ──
    const leftW = Math.floor(scrW * 0.55);
    const rightW = scrW - leftW;

    // Left Pane: Shopping Checklist
    ctx.fillStyle = '#0b0f19';
    ctx.fillRect(scrX, scrY + 30, leftW, scrH - 30);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.strokeRect(scrX, scrY + 30, leftW, scrH - 30);

    ctx.fillStyle = '#ff7728';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('SM CLARK SHOPPING LIST', scrX + 30, scrY + 65);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('Plan_.ed Active Run', scrX + 30, scrY + 92);

    // Total pill
    ctx.fillStyle = 'rgba(255, 77, 21, 0.18)';
    ctx.beginPath();
    ctx.roundRect(scrX + leftW - 170, scrY + 68, 140, 28, 14);
    ctx.fill();
    ctx.fillStyle = '#ffaa66';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('Total: ₱4,820.00', scrX + leftW - 155, scrY + 86);

    // 4 Real Items
    const items = [
      { name: 'Ergonomic Desk Mat (Gray)', store: 'Miniso SM Clark', p: '₱499.00', checked: true },
      { name: 'Keychron Low-Profile Switches', store: 'DataBlitz Nepo Mall', p: '₱1,850.00', checked: true },
      { name: 'Type-C Coiled Keyboard Cable', store: 'Octagon Computer', p: '₱680.00', checked: false },
      { name: 'Nordic Ceramic Coffee Mug', store: 'Muji SM Clark', p: '₱450.00', checked: false },
      { name: 'Microfiber Cleaning Cloth 3-Pack', store: 'Miniso SM Clark', p: '₱199.00', checked: true },
    ];

    items.forEach((it, i) => {
      const iy = scrY + 115 + i * 72;
      ctx.fillStyle = it.checked ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.roundRect(scrX + 25, iy, leftW - 50, 60, 10);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.stroke();

      // Checkbox circle
      ctx.fillStyle = it.checked ? '#ff4d15' : 'transparent';
      ctx.strokeStyle = it.checked ? '#ff4d15' : '#64748b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(scrX + 55, iy + 30, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      if (it.checked) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('✓', scrX + 50, iy + 35);
      }

      ctx.fillStyle = it.checked ? '#94a3b8' : '#ffffff';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(it.name, scrX + 80, iy + 27);

      ctx.fillStyle = '#64748b';
      ctx.font = '12px sans-serif';
      ctx.fillText(it.store, scrX + 80, iy + 47);

      ctx.fillStyle = it.checked ? '#94a3b8' : '#ffaa66';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(it.p, scrX + leftW - 120, iy + 36);
    });

    // Right Pane: Errand Calendar & Alarms
    const rx = scrX + leftW;
    ctx.fillStyle = '#0e1320';
    ctx.fillRect(rx, scrY + 30, rightW, scrH - 30);

    ctx.fillStyle = '#ff7728';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('ERRAND CALENDAR & NATIVE ALARMS', rx + 30, scrY + 65);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('Today\'s Schedule', rx + 30, scrY + 92);

    const alarms = [
      { time: '10:30 AM', title: 'Pick up Keychron Switches at DataBlitz', loc: 'Nepo Mall • Alarm Set 🔔', active: true },
      { time: '01:15 PM', title: 'Restock Ceramic Coffee Mug', loc: 'Muji SM Clark • Alarm Set 🔔', active: true },
      { time: '04:00 PM', title: 'Studio Cable Management Run', loc: 'Octagon • Upcoming', active: false },
    ];

    alarms.forEach((al, i) => {
      const ay = scrY + 115 + i * 105;
      ctx.fillStyle = al.active ? 'rgba(255, 77, 21, 0.1)' : 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      ctx.roundRect(rx + 25, ay, rightW - 50, 90, 10);
      ctx.fill();
      ctx.strokeStyle = al.active ? 'rgba(255, 77, 21, 0.35)' : 'rgba(255, 255, 255, 0.07)';
      ctx.stroke();

      ctx.fillStyle = al.active ? '#ffaa44' : '#94a3b8';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(al.time, rx + 45, ay + 30);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(al.title, rx + 45, ay + 54);

      ctx.fillStyle = al.active ? '#ff8a5c' : '#64748b';
      ctx.font = '12px sans-serif';
      ctx.fillText(al.loc, rx + 45, ay + 74);
    });

    // Cloud status bar
    ctx.fillStyle = 'rgba(255, 77, 21, 0.15)';
    ctx.fillRect(rx, scrY + scrH - 45, rightW, 45);
    ctx.fillStyle = '#ffedd5';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('⚡ Supabase Cloud & AsyncStorage Offline Sync Active', rx + 30, scrY + scrH - 18);
  } else if (projectIndex === 1) {
    // ── C&J REAL ESTATE PROPERTY WEBSITE LITERAL PREVIEW ──
    // Browser URL bar inside tablet
    ctx.fillStyle = '#111827';
    ctx.fillRect(scrX, scrY + 30, scrW, 36);
    ctx.fillStyle = '#06b6d4';
    ctx.font = '12px monospace';
    ctx.fillText('🔒 https://cj-realestate.ph/exclusive-listings/san-fernando', scrX + 24, scrY + 53);

    // Main website showcase container
    ctx.fillStyle = '#080d16';
    ctx.fillRect(scrX, scrY + 66, scrW, scrH - 66);

    // Left Hero: Full Architectural Residence Photo
    const heroW = Math.floor(scrW * 0.62);
    const heroH = scrH - 100;
    const heroX = scrX + 24;
    const heroY = scrY + 86;

    const skyGrad = ctx.createLinearGradient(heroX, heroY, heroX, heroY + heroH);
    skyGrad.addColorStop(0, '#164e63');
    skyGrad.addColorStop(0.5, '#0e7490');
    skyGrad.addColorStop(1, '#082f49');
    ctx.fillStyle = skyGrad;
    ctx.beginPath();
    ctx.roundRect(heroX, heroY, heroW, heroH, 14);
    ctx.fill();

    // Architectural Villa Structure
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(heroX + 60, heroY + 80, heroW - 120, 180);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(heroX + 110, heroY + 40, heroW - 220, 90);

    // Floor-to-ceiling windows with warm interior glow
    const winGlow = ctx.createLinearGradient(0, heroY + 90, 0, heroY + 230);
    winGlow.addColorStop(0, '#fef08a');
    winGlow.addColorStop(1, '#f59e0b');
    ctx.fillStyle = winGlow;
    ctx.fillRect(heroX + 85, heroY + 100, 150, 140);
    ctx.fillRect(heroX + 265, heroY + 100, 170, 140);
    ctx.fillRect(heroX + 465, heroY + 100, 150, 140);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(heroX + 160, heroY + 100, 5, 140);
    ctx.fillRect(heroX + 350, heroY + 100, 5, 140);
    ctx.fillRect(heroX + 540, heroY + 100, 5, 140);

    // Infinity pool
    const poolGrad = ctx.createLinearGradient(heroX, heroY + 250, heroX, heroY + heroH);
    poolGrad.addColorStop(0, '#06b6d4');
    poolGrad.addColorStop(1, '#0e7490');
    ctx.fillStyle = poolGrad;
    ctx.beginPath();
    ctx.roundRect(heroX + 40, heroY + 250, heroW - 80, 80, [0, 0, 12, 12]);
    ctx.fill();

    // Floating Glass Tag
    ctx.fillStyle = 'rgba(8, 13, 22, 0.85)';
    ctx.beginPath();
    ctx.roundRect(heroX + 25, heroY + 25, 200, 32, 16);
    ctx.fill();
    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('EXCLUSIVE • SAN FERNANDO', heroX + 42, heroY + 46);

    // Hero Property Overlay Typography
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 24px sans-serif';
    ctx.fillText('The Obsidian Pavilion', heroX + 30, heroY + heroH - 65);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '14px sans-serif';
    ctx.fillText('5 Beds • 6 Baths • 650 sqm • Private Infinity Pool', heroX + 30, heroY + heroH - 40);
    ctx.fillStyle = '#22d3ee';
    ctx.font = '900 24px sans-serif';
    ctx.fillText('₱28,500,000', heroX + 30, heroY + heroH - 12);

    // Right Sidebar: Filtered Property Cards
    const sideX = scrX + heroW + 45;
    const sideW = scrW - heroW - 65;

    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('CURATED SANCTUARIES', sideX, scrY + 95);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('Central Luzon Listings', sideX, scrY + 120);

    const listings = [
      { name: 'Villa Solaria Retreat', loc: 'Angeles City', price: '₱18,200,000', specs: '4 Beds • 420 sqm' },
      { name: 'The Glasshouse Loft', loc: 'Clark Freeport Zone', price: '₱34,000,000', specs: '6 Beds • 800 sqm' },
      { name: 'Casa Terra Sanctuary', loc: 'San Fernando', price: '₱14,500,000', specs: '3 Beds • 310 sqm' },
    ];

    listings.forEach((prop, i) => {
      const py = scrY + 145 + i * 115;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.beginPath();
      ctx.roundRect(sideX, py, sideW, 100, 10);
      ctx.fill();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(prop.name, sideX + 20, py + 30);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '13px sans-serif';
      ctx.fillText(`${prop.loc} • ${prop.specs}`, sideX + 20, py + 55);

      ctx.fillStyle = '#22d3ee';
      ctx.font = '900 16px sans-serif';
      ctx.fillText(prop.price, sideX + 20, py + 82);

      ctx.fillStyle = '#0891b2';
      ctx.beginPath();
      ctx.roundRect(sideX + sideW - 110, py + 60, 95, 26, 13);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('Inspect ↗', sideX + sideW - 88, py + 77);
    });
  } else {
    // ── HAUTOGO CAMPUS FACULTY TRACKING APP LITERAL PREVIEW ──
    const mapW = Math.floor(scrW * 0.62);
    const mapH = scrH - 60;
    const mapX = scrX + 20;
    const mapY = scrY + 45;

    // Campus Vector Surface
    ctx.fillStyle = '#101422';
    ctx.beginPath();
    ctx.roundRect(mapX, mapY, mapW, mapH, 14);
    ctx.fill();

    // Road Lines
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.35)';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(mapX, mapY + 180); ctx.lineTo(mapX + mapW, mapY + 180);
    ctx.moveTo(mapX + 240, mapY); ctx.lineTo(mapX + 240, mapY + mapH);
    ctx.moveTo(mapX + 500, mapY); ctx.lineTo(mapX + 500, mapY + mapH);
    ctx.stroke();

    // Campus Buildings
    ctx.fillStyle = '#1e2638';
    ctx.strokeStyle = '#3d4d6e';
    ctx.lineWidth = 1.5;

    // SJH Building
    ctx.fillRect(mapX + 40, mapY + 40, 160, 110);
    ctx.strokeRect(mapX + 40, mapY + 40, 160, 110);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('SJH Building', mapX + 70, mapY + 95);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.fillText('Engineering & CS Labs', mapX + 60, mapY + 115);

    // MGN Hall
    ctx.fillStyle = '#1e2638';
    ctx.fillRect(mapX + 40, mapY + 220, 170, 140);
    ctx.strokeRect(mapX + 40, mapY + 220, 170, 140);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('MGN Hall', mapX + 85, mapY + 285);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.fillText('Arts & Sciences', mapX + 75, mapY + 305);

    // STL Lab
    ctx.fillStyle = '#1e2638';
    ctx.fillRect(mapX + 280, mapY + 40, 180, 110);
    ctx.strokeRect(mapX + 280, mapY + 40, 180, 110);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('STL Building', mapX + 325, mapY + 95);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.fillText('Advanced Computing', mapX + 310, mapY + 115);

    // Live GPS Radar Waves & Pin
    ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
    ctx.beginPath();
    ctx.arc(mapX + 120, mapY + 95, 36, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.arc(mapX + 120, mapY + 95, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(mapX + 120, mapY + 95, 5, 0, Math.PI * 2);
    ctx.fill();

    // Callout badge
    ctx.fillStyle = '#1e1b4b';
    ctx.beginPath();
    ctx.roundRect(mapX + 140, mapY + 70, 170, 34, 8);
    ctx.fill();
    ctx.strokeStyle = '#a855f7';
    ctx.stroke();
    ctx.fillStyle = '#f3e8ff';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('Engr. Dizon (LIVE)', mapX + 155, mapY + 92);

    // Geofence status pill
    ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
    ctx.beginPath();
    ctx.roundRect(mapX + 20, mapY + mapH - 45, 280, 28, 14);
    ctx.fill();
    ctx.fillStyle = '#d8b4fe';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('● GPS Geofence: Active (Holy Angel Univ.)', mapX + 35, mapY + mapH - 26);

    // Right Pane: Faculty Consultation Drawer
    const rightX = scrX + mapW + 40;
    const rightWidth = scrW - mapW - 60;

    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('FACULTY AVAILABILITY RADAR', rightX, scrY + 65);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('Ghayzelle Dizon', rightX, scrY + 95);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px sans-serif';
    ctx.fillText('Computer Science Faculty & Researcher', rightX, scrY + 118);

    // Consultation Status Box
    ctx.fillStyle = 'rgba(168, 85, 247, 0.14)';
    ctx.beginPath();
    ctx.roundRect(rightX, scrY + 140, rightWidth, 140, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
    ctx.stroke();

    ctx.fillStyle = '#f3e8ff';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('📍 Current Room: SJH 402 Lab', rightX + 20, scrY + 175);

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('● Status: Available for Student Consultations', rightX + 20, scrY + 205);

    ctx.fillStyle = '#c084fc';
    ctx.font = '13px sans-serif';
    ctx.fillText('⏰ Next Class: CS301 (2:00 PM • STL 204)', rightX + 20, scrY + 235);

    // Weekly schedule timetable
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.beginPath();
    ctx.roundRect(rightX, scrY + 300, rightWidth, 120, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('Today\'s Timetable', rightX + 20, scrY + 330);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '12px sans-serif';
    ctx.fillText('• 09:00 AM - 11:30 AM: CS402 Capstone Consultation (SJH 402)', rightX + 20, scrY + 355);
    ctx.fillText('• 02:00 PM - 04:30 PM: CS301 Advanced Web Engineering (STL 204)', rightX + 20, scrY + 380);
    ctx.fillText('• 05:00 PM - 06:00 PM: Department Faculty Sync', rightX + 20, scrY + 405);
  }

  // ── BOTTOM PROJECT METADATA BAR (TITLE, SHORT DESC, VIEW, PREV, NEXT, FOLDER) ──
  const botY = 715;
  const botH = 190;
  ctx.fillStyle = '#0b0f19';
  ctx.beginPath();
  ctx.roundRect(tabX, botY, tabW, botH, 18);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Project Category Tag
  ctx.fillStyle = cur.accent;
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText(cur.tag, tabX + 35, botY + 35);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 24px -apple-system, sans-serif';
  ctx.fillText(cur.title, tabX + 35, botY + 68);

  // Short Desc
  ctx.fillStyle = '#94a3b8';
  ctx.font = '14.5px -apple-system, sans-serif';
  ctx.fillText(cur.desc, tabX + 35, botY + 100);

  // Buttons Row (y: botY + 120 to botY + 165)
  // 1. View Project Button
  ctx.fillStyle = cur.accent;
  ctx.beginPath();
  ctx.roundRect(tabX + 35, botY + 125, 175, 42, 21);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('View Project ↗', tabX + 68, botY + 151);

  // 2. Back to Folder Button
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.roundRect(tabX + 225, botY + 125, 175, 42, 21);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.stroke();
  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 13.5px sans-serif';
  ctx.fillText('📂 Back to Folder', tabX + 250, botY + 151);

  // 3. Prev Button
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.roundRect(tabX + tabW - 380, botY + 125, 130, 42, 21);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('‹ Prev', tabX + tabW - 340, botY + 151);

  // 4. Next Button
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.roundRect(tabX + tabW - 235, botY + 125, 130, 42, 21);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('Next ›', tabX + tabW - 195, botY + 151);

  // 5. Dots indicator
  const dotsX = tabX + tabW - 85;
  [0, 1, 2].forEach((idx) => {
    ctx.fillStyle = idx === projectIndex ? cur.accent : 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(dotsX + idx * 20, botY + 68, idx === projectIndex ? 5 : 4, 0, Math.PI * 2);
    ctx.fill();
  });

  // Bottom Monitor Footer
  ctx.fillStyle = '#080c14';
  ctx.fillRect(0, 960, 2048, 64);
  ctx.font = '15px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Ghayzelle Dizon • Front-End Developer', 56, 998);

  ctx.textAlign = 'center';
  ctx.fillStyle = cur.accent;
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText(`Project ${projectIndex + 1} of 3 • Click ‹ Prev / Next › to browse`, 1024, 998);
  ctx.textAlign = 'left';

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 16;
  return texture;
}

// CERTIFICATES DISPLAY ON 34" CURVED ULTRAWIDE MONITOR
function createCertificatesScreenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
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
  ctx.fillText('GHAYZELLE DIZON • 34" ULTRAWIDE DISPLAY', 130, 40);

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

  // 3 Large Certificate Cards
  const certificates = [
    {
      title: 'AWS Academy Graduate — Cloud Foundations',
      issuer: 'Amazon Web Services (AWS)',
      date: 'Feb 2026',
      badge: 'AWS CLOUD FOUNDATIONS',
      accent: '#ff9900',
      description: 'Mastery of foundational AWS cloud architecture, global infrastructure, AWS IAM security, Amazon EC2 compute, S3 storage, VPC networking, and cloud monitoring.',
      skills: ['AWS IAM', 'Amazon EC2', 'Amazon S3', 'VPC Networking', 'Cloud Security', 'Serverless'],
    },
    {
      title: 'Responsive Web Design Certification',
      issuer: 'freeCodeCamp',
      date: 'Sep 2024',
      badge: '300 HOURS CERTIFIED',
      accent: '#10b981',
      description: 'Comprehensive mastery of modern web standards, semantic HTML5, advanced CSS3 responsive architecture, Flexbox layouts, CSS Grid layouts, and web accessibility standards.',
      skills: ['HTML5 Semantic', 'CSS3 Architecture', 'CSS Flexbox', 'CSS Grid', 'Mobile-First', 'Accessibility'],
    },
    {
      title: 'JavaScript Essentials 1',
      issuer: 'Cisco Networking Academy & OpenEDG',
      date: 'Oct 2024',
      badge: 'CISCO ACCREDITED',
      accent: '#06b6d4',
      description: 'Credential covering core JavaScript programming, variables, control flow, functions, DOM manipulation, asynchronous logic, and error handling.',
      skills: ['JavaScript (ES6+)', 'DOM Manipulation', 'Event Handling', 'Data Structures', 'Debugging'],
    },
  ];

  const colW = 620;
  const colH = 750;
  const startX = 56;
  const startY = 184;
  const gap = 38;

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
    ctx.roundRect(x + 24, y + 26, 185, 26, 6);
    ctx.fill();
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = cert.accent;
    ctx.fillText(cert.badge, x + 34, y + 43);

    // Issue Date Tag
    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(cert.date, x + colW - 120, y + 43);

    // Title
    ctx.font = 'bold 23px sans-serif';
    ctx.fillStyle = '#ffffff';
    const titleLines = wrapCanvasText(cert.title, 32);
    let curY = y + 84;
    titleLines.forEach((tl) => {
      ctx.fillText(tl, x + 24, curY);
      curY += 30;
    });

    // Issuer
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = cert.accent;
    ctx.fillText(cert.issuer, x + 24, curY + 6);
    curY += 34;

    // Description Box
    ctx.fillStyle = '#090d14';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x + 20, curY, colW - 40, 160, 10);
    ctx.fill();
    ctx.stroke();

    ctx.font = '14.5px -apple-system, sans-serif';
    ctx.fillStyle = '#cbd5e1';
    const descLines = wrapCanvasText(cert.description, 48);
    descLines.forEach((dl, dIdx) => {
      ctx.fillText(dl, x + 34, curY + 30 + dIdx * 24);
    });
    curY += 184;

    // Skills & Competencies Heading
    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('COMPETENCIES & DOMAINS:', x + 24, curY);
    curY += 24;

    // Skill pills
    let pillX = x + 24;
    let pillY = curY;
    cert.skills.forEach((skill) => {
      ctx.font = 'bold 13px sans-serif';
      const textW = ctx.measureText(skill).width;
      const pillW = textW + 22;

      if (pillX + pillW > x + colW - 24) {
        pillX = x + 24;
        pillY += 38;
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.strokeStyle = cert.accent;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, 28, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.fillText(skill, pillX + 11, pillY + 19);

      pillX += pillW + 10;
    });

    // Verification Footer
    ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
    ctx.beginPath();
    ctx.roundRect(x + 20, y + colH - 64, colW - 40, 44, 8);
    ctx.fill();
    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = '#34d399';
    ctx.fillText('✓  OFFICIAL VERIFIED CREDENTIAL • GHAYZELLE DIZON', x + 36, y + colH - 37);
  });

  // Bottom Status Bar
  ctx.fillStyle = '#0a0e16';
  ctx.fillRect(0, 960, 2048, 64);
  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText("Academic Honor: Holy Angel University Dean's Lister (1st Year, 2nd Year, 3rd Year) • School of Computing", 56, 998);

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.minFilter = THREE.LinearFilter;
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
  ctx.fillText('bash - ghayzelle@galaxy-book2: ~/technical-skills', 130, 41);

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

  // 5 Categories
  const skillsList = [
    {
      category: 'Design & UI',
      color: '#ff7728',
      text: 'Figma, Blender (3D Modeling), UI/UX Design, Wireframing & Prototyping, Responsive Design, Custom CSS3',
    },
    {
      category: 'Languages',
      color: '#38bdf8',
      text: 'JavaScript, TypeScript, HTML5, CSS3, Dart, Python, SQL',
    },
    {
      category: 'Frameworks & Libraries',
      color: '#34d399',
      text: 'React, Vite, React Native, Expo, Expo Router, Flutter',
    },
    {
      category: 'Backend & Databases',
      color: '#c084fc',
      text: 'Supabase (Auth, Realtime, Row-Level Security), PostgreSQL, AsyncStorage',
    },
    {
      category: 'Tools',
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
  ctx.fillText('ghayzelle@galaxy-book2:~$ npm run deploy --role "Front-End Developer" --status "READY" 🚀', 88, 1186);

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false; // Maps canvas top to top of laptop screen
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 16;
  return texture;
}

// RESUME PAPER DISPLAY ON STUDY DESK
function createResumePaperTexture() {
  const canvas = document.createElement('canvas');
  // Ultra high-res A4 document aspect ratio (1 : 1.414)
  canvas.width = 2048;
  canvas.height = 2896;
  const ctx = canvas.getContext('2d');

  // Pure bright white background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 2048, 2896);

  // Subtle clean border
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 48, 1952, 2800);

  // Top Header (Matching Resume PDF exactly)
  ctx.font = '900 88px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.fillText('Ghayzelle Dizon', 88, 155);

  // Role Title
  ctx.font = '800 32px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#ea580c';
  ctx.fillText('FRONT-END DEVELOPER', 88, 205);

  // Contact Info bar
  ctx.font = '600 24.5px sans-serif';
  ctx.fillStyle = '#475569';
  ctx.fillText('+63 969 0199 663 | ghayzelle.dzn@gmail.com | gazed.vercel.app | github.com/geyzz | linkedin.com/in/ghayzelle-dizon', 88, 252);

  // Header separator
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(88, 280);
  ctx.lineTo(1960, 280);
  ctx.stroke();

  let curY = 345;

  // Helper section header with orange square bullet matching the PDF
  const drawSectionHeader = (title) => {
    // Orange square icon
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(88, curY - 22, 18, 18);

    ctx.font = '900 32px "Inter", -apple-system, sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText(title, 120, curY - 5);

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(88, curY + 14);
    ctx.lineTo(1960, curY + 14);
    ctx.stroke();

    curY += 52;
  };

  // 1. PROFILE
  drawSectionHeader('PROFILE');
  ctx.font = '500 27px "Inter", -apple-system, sans-serif';
  ctx.fillStyle = '#1e293b';
  const profileText =
    'Computer Science student and Front-End Developer with a strong passion for UI/UX design, 3D visuals, and building distinctive web and mobile interfaces. Seeking a Front-End Developer role where I can turn creative design concepts in Figma and Blender into polished, responsive applications using React, React Native, and Flutter. Works earnestly toward every goal, learns new tools quickly, and follows through from initial design to working product.';
  const profileLines = wrapCanvasText(profileText, 94);
  profileLines.forEach((line) => {
    ctx.fillText(line, 88, curY);
    curY += 40;
  });
  curY += 28;

  // 2. TECHNICAL SKILLS
  drawSectionHeader('TECHNICAL SKILLS');

  const skills = [
    { label: 'Design & UI:', val: 'Figma, Blender (3D Modeling), UI/UX Design, Wireframing & Prototyping, Responsive Design, Custom CSS3' },
    { label: 'Languages:', val: 'JavaScript, TypeScript, HTML5, CSS3, Dart, Python, SQL' },
    { label: 'Frameworks & Libraries:', val: 'React, Vite, React Native, Expo, Expo Router, Flutter' },
    { label: 'Backend & Databases:', val: 'Supabase (Auth, Realtime, Row-Level Security), PostgreSQL, AsyncStorage' },
    { label: 'Tools:', val: 'Git, GitHub, EAS Build, VS Code' },
  ];

  skills.forEach((s) => {
    ctx.font = '800 27px sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText(s.label, 88, curY);

    const labelW = ctx.measureText(s.label).width;
    ctx.font = '500 27px sans-serif';
    ctx.fillStyle = '#334155';
    ctx.fillText(s.val, 88 + labelW + 12, curY);
    curY += 40;
  });
  curY += 28;

  // 3. PROJECTS
  drawSectionHeader('PROJECTS');

  const projects = [
    {
      title: 'Plan_.ed - Shopping & Errand Planner App',
      tag: 'Personal',
      stack: 'React Native, Expo, Supabase, PostgreSQL, AsyncStorage, EAS Build',
      bullets: [
        'Designed and built a mobile shopping planner featuring custom light/dark themes, collapsible headers, and an interactive errand calendar with native reminder alarms.',
        'Created smart checklists with real-time cost calculation and a directory linking items to 4 major Pampanga malls.',
        'Implemented cloud and offline sync using Supabase and AsyncStorage, and shipped an Android APK via EAS Build.',
      ],
    },
    {
      title: 'C&J Real Estate - Property Showcase & Management Platform',
      tag: 'Personal',
      stack: 'React, Vite, Supabase (PostgreSQL, RLS), JavaScript (ES6+), EmailJS, Custom CSS3',
      bullets: [
        'Architected a full-stack real estate platform and session-authenticated Admin Portal with Supabase for real-time property CRUD listings, status management, and lead tracking.',
        'Engineered an interactive showroom featuring dual-thumb price sliders, dynamic Philippine geographic selectors (phil-reg-prov-mun-brgy), and multi-property inquiry carts.',
        'Integrated automated client notification workflows using EmailJS and crafted responsive CSS3 Grid layouts achieving sub-second load times and fluid modal views.',
      ],
    },
    {
      title: 'HAUtogo - Real-Time Faculty Tracking & Class Management',
      tag: 'Collaborative',
      stack: 'Flutter, Dart, Supabase, flutter_map, geolocator',
      bullets: [
        'Built a campus mobile app for Holy Angel University with an interactive map and sliding panel UI that displays live professor locations.',
        'Designed role-based weekly schedule views for students and professors, plus one-tap room navigation and next-class indicators.',
        'Implemented campus geofencing and full account authentication (login, password recovery, profile management) with Supabase.',
      ],
    },
  ];

  projects.forEach((p) => {
    ctx.font = '800 29px sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText(p.title, 88, curY);

    ctx.font = '600 24px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText(p.tag, 1840, curY);
    curY += 36;

    ctx.font = 'italic 700 25px sans-serif';
    ctx.fillStyle = '#c2410c';
    ctx.fillText('Tech Stack: ' + p.stack, 88, curY);
    curY += 34;

    p.bullets.forEach((b) => {
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.arc(98, curY - 7, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '500 26px sans-serif';
      ctx.fillStyle = '#1e293b';
      const lines = wrapCanvasText(b, 90);
      lines.forEach((l) => {
        ctx.fillText(l, 118, curY);
        curY += 36;
      });
    });
    curY += 18;
  });
  curY += 12;

  // 4. EDUCATION
  drawSectionHeader('EDUCATION');
  ctx.font = '800 29px sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.fillText('Bachelor of Science in Computer Science', 88, curY);

  ctx.font = '600 24px sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('2023 - Present', 1780, curY);
  curY += 36;

  ctx.font = '600 26px sans-serif';
  ctx.fillStyle = '#334155';
  ctx.fillText('Holy Angel University', 88, curY);
  curY += 34;

  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(98, curY - 7, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = '600 25.5px sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.fillText("Dean's Lister: 1st Year (1st Semester), 2nd Year (1st Semester), 3rd Year", 118, curY);
  curY += 56;

  // 5. CERTIFICATIONS
  drawSectionHeader('CERTIFICATIONS');

  const certs = [
    'Responsive Web Design - freeCodeCamp',
    'JavaScript Essentials 1 - Cisco Networking Academy',
    'AWS Academy Graduate - Cloud Foundations - Amazon Web Services',
  ];

  certs.forEach((c) => {
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.arc(98, curY - 7, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '600 26px sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.fillText(c, 118, curY);
    curY += 40;
  });

  const texture = new THREE.CanvasTexture(canvas);
  // Three.js PlaneGeometry uses standard top-to-bottom UVs when flipY is true
  texture.flipY = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 16;
  return texture;
}

// ABOUT ME PAPER DISPLAY ON BULLETIN BOARD
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
  ctx.lineWidth = 5;
  ctx.strokeRect(40, 40, 1968, 1456);

  // Top pin hole indicator
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.beginPath();
  ctx.arc(1024, 70, 14, 0, Math.PI * 2);
  ctx.fill();

  // Title: A Little About Me (Bold, High Contrast, Centered)
  ctx.font = '900 78px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';
  ctx.fillText('A Little About Me', 1024, 195);

  // Warm terracotta accent line under title
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(760, 228);
  ctx.lineTo(1288, 228);
  ctx.stroke();

  // Reset text alignment for paragraphs
  ctx.textAlign = 'left';

  // 3 paragraphs provided by Ghayzelle
  const paragraphs = [
    "I'm someone who embraces new experiences, welcomes different ideas and perspectives, and is always open to learning.",
    "As an aspiring Front-End Developer, I enjoy turning ideas into interactive and meaningful digital experiences. I'm interested in exploring how design and technology work together to create interfaces that are both functional and engaging.",
    "I believe growth comes from stepping outside my comfort zone, taking on challenges, and turning new ideas into action. I may not have everything figured out, but I'm always moving forward, learning through experience, and finding new ways to improve.",
  ];

  let curY = 345;

  paragraphs.forEach((p) => {
    // Bold, punchy font size and pitch dark color guarantees 100% readability from any camera angle
    ctx.font = 'bold 46px "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#020617';
    const lines = wrapCanvasText(p, 52);
    lines.forEach((line) => {
      ctx.fillText(line, 150, curY);
      curY += 66;
    });
    curY += 48; // comfortable spacing between paragraphs
  });

  // Education tag
  ctx.font = 'bold 40px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#1e293b';
  ctx.fillText('🎓 Holy Angel University — BS Computer Science (2023 – Present)', 150, 1430);

  // Sign-off
  ctx.font = 'bold italic 48px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#ea580c';
  ctx.textAlign = 'right';
  ctx.fillText('— Ghayzelle Dizon', 1898, 1430);

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 16;
  return texture;
}

export default function Desk3DViewer({ onClose, onOpenPortfolioWeb = null, isPaused = false }) {
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
  const [monitorTab, setMonitorTab] = useState('portfolio'); // 'portfolio' | 'certificates'
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Stale-closure-safe refs for event handlers
  const activeStationRef = useRef(activeStation);
  activeStationRef.current = activeStation;

  const onOpenPortfolioWebRef = useRef(onOpenPortfolioWeb);
  onOpenPortfolioWebRef.current = onOpenPortfolioWeb;

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
  const portfolioTextureRef = useRef(null);
  const certificatesTextureRef = useRef(null);
  const containerSizeRef = useRef({ w: 0, h: 0 });
  const cachedDomRectRef = useRef(null);
  const elementsRef = useRef({});

  // Dynamically swap 3D monitor texture whenever monitorTab, carouselOpen, or carouselIndex changes
  useEffect(() => {
    if (monitorMeshRef.current && monitorMeshRef.current.material) {
      let tex;
      if (monitorTab === 'certificates') {
        tex = certificatesTextureRef.current;
      } else if (carouselOpen) {
        tex = createPortfolioCarouselTexture(carouselIndex);
      } else {
        tex = portfolioTextureRef.current;
      }
      if (tex) {
        tex.needsUpdate = true;
        monitorMeshRef.current.material.map = tex;
        monitorMeshRef.current.material.emissiveMap = tex;
        monitorMeshRef.current.material.needsUpdate = true;
      }
    }
  }, [monitorTab, carouselOpen, carouselIndex]);

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

    // H. Monitor Screen Cool Blue Ambient
    const monitorScreenLight = new THREE.PointLight(0x3b77cc, 1.5, 2.5);
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
    const portfolioTexture = new THREE.TextureLoader().load(
      '/monitor-screen.png',
      (tex) => {
        tex.flipY = false;
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.anisotropy = 16;
        tex.needsUpdate = true;
        if (monitorMeshRef.current?.material) {
          monitorMeshRef.current.material.map = tex;
          monitorMeshRef.current.material.emissiveMap = tex;
          monitorMeshRef.current.material.needsUpdate = true;
        }
      }
    );
    portfolioTexture.flipY = false;
    portfolioTexture.generateMipmaps = true;
    portfolioTexture.minFilter = THREE.LinearFilter;
    portfolioTexture.magFilter = THREE.LinearFilter;
    portfolioTexture.anisotropy = 16;
    portfolioTextureRef.current = portfolioTexture;

    const certificatesTexture = createCertificatesScreenTexture();
    certificatesTextureRef.current = certificatesTexture;
    const techStackTexture = createTechStackScreenTexture();
    const resumePaperTexture = createResumePaperTexture();
    const aboutMePaperTexture = createAboutMePaperTexture();
    const polaroidPhotoTexture = new THREE.TextureLoader().load('/ghayzelle-polaroid.jpg');
    polaroidPhotoTexture.flipY = true;
    polaroidPhotoTexture.generateMipmaps = true;
    polaroidPhotoTexture.minFilter = THREE.LinearFilter;
    polaroidPhotoTexture.magFilter = THREE.LinearFilter;

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
              name.includes('monitor') ||
              name.includes('screen_low') ||
              matName.includes('monitor_screen')
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
                emissiveIntensity: 1.3,
                roughness: 0.15,
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
              const initialTex = monitorTab === 'portfolio' ? portfolioTexture : certificatesTexture;
              initialTex.needsUpdate = true;
              child.material = new THREE.MeshStandardMaterial({
                map: initialTex,
                emissiveMap: initialTex,
                color: new THREE.Color(0xffffff),
                emissive: new THREE.Color(0xffffff),
                emissiveIntensity: 1.1,
                roughness: 0.2,
                metalness: 0.0,
                side: THREE.DoubleSide,
              });
              child.material.needsUpdate = true;
              child.userData = { station: 'portfolio' };
              interactiveList.push(child);
              return;
            }

            // 0C. CLEAN PAPER STACK UNDERNEATH RESUME ()
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
                    const u = (y + 1) * 0.5;
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

        // DEDICATED CRISP PRINTED RESUME SHEET ON DESK
        resumePaperTexture.needsUpdate = true;
        const resumeGeo = new THREE.PlaneGeometry(0.42, 0.594); // standard A4 sheet proportion (1 : 1.414)
        const resumeMat = new THREE.MeshStandardMaterial({
          map: resumePaperTexture,
          emissiveMap: resumePaperTexture,
          emissive: new THREE.Color(0xffffff),
          emissiveIntensity: 0.65, // Crisp self-illumination guarantees 100% text legibility under all room lighting
          roughness: 0.25,
          metalness: 0.0,
          side: THREE.DoubleSide,
        });
        const resumeMesh = new THREE.Mesh(resumeGeo, resumeMat);
        resumeMesh.name = 'resumePaperSheet';
        resumeMesh.position.set(-0.827, 5.604, -1.579);
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
              monitorMeshRef.current.material.emissiveIntensity = 1.35;
            } else if (monitorMeshRef.current?.material) {
              monitorMeshRef.current.material.emissiveIntensity = 1.05;
            }
          } else {
            setHoveredStation(null);
            renderer.domElement.style.cursor = 'grab';
            if (monitorMeshRef.current?.material) {
              monitorMeshRef.current.material.emissiveIntensity = 1.05;
            }
          }
        });
      }
    };

    const handleClick = () => {
      if (isPausedRef.current || flightState.current.active) return;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshesRef.current, false);
      if (intersects.length > 0) {
        const hit = intersects[0];
        const station = hit.object.userData.station;
        if (station) {
          const currentStation = activeStationRef.current;
          if (station === 'portfolio') {
            if (currentStation === 'portfolio') {
              if (onOpenPortfolioWebRef.current) {
                onOpenPortfolioWebRef.current();
                return;
              }
            } else {
              goToStation('portfolio');
              return;
            }
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





      {/* 2. TECH STACK PANEL (LAPTOP) */}
      {activeStation === 'techstack' && !panelDismissed && (
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(14px, 3vh, 90px)',
            right: 'clamp(10px, 3vw, 36px)',
            left: 'clamp(10px, 3vw, auto)',
            width: 'min(440px, calc(100vw - 20px))',
            maxHeight: 'min(76vh, calc(100vh - 120px))',
            margin: '0 auto',
            overflowY: 'auto',
            backgroundColor: 'rgba(13, 17, 24, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(100, 180, 255, 0.35)',
            borderRadius: '16px',
            padding: 'clamp(14px, 2.5vw, 24px)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(100, 180, 255, 0.2)',
            zIndex: 40,
            animation: 'slideUp 0.3s ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <Laptop size={18} color="#60a5fa" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.08em', color: '#60a5fa', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                SAMSUNG GALAXY BOOK 2 • SKILLS
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
            {/* Design & UI */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Palette size={15} color="#ff7728" />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#ff7728' }}>Design & UI</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {['Figma', 'Blender (3D Modeling)', 'UI/UX Design', 'Wireframing & Prototyping', 'Responsive Design', 'Custom CSS3'].map((t) => (
                  <span key={t} style={{ fontSize: '12px', backgroundColor: 'rgba(255, 255, 255, 0.06)', padding: '4px 10px', borderRadius: '6px', color: '#e2e8f0' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Frameworks & Libraries */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Code size={15} color="#60a5fa" />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#60a5fa' }}>Frameworks & Libraries</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {['React', 'Vite', 'React Native', 'Expo', 'Expo Router', 'Flutter'].map((t) => (
                  <span key={t} style={{ fontSize: '12px', backgroundColor: 'rgba(96, 165, 250, 0.12)', border: '1px solid rgba(96, 165, 250, 0.25)', padding: '4px 10px', borderRadius: '6px', color: '#bfdbfe' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Code size={15} color="#34d399" />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#34d399' }}>Languages</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {['JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Dart', 'Python', 'SQL'].map((t) => (
                  <span key={t} style={{ fontSize: '12px', backgroundColor: 'rgba(52, 211, 153, 0.12)', border: '1px solid rgba(52, 211, 153, 0.25)', padding: '4px 10px', borderRadius: '6px', color: '#a7f3d0' }}>
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
          style={{
            position: 'absolute',
            bottom: 'clamp(14px, 3vh, 90px)',
            right: 'clamp(10px, 3vw, 36px)',
            left: 'clamp(10px, 3vw, auto)',
            width: 'min(430px, calc(100vw - 20px))',
            maxHeight: 'min(76vh, calc(100vh - 120px))',
            margin: '0 auto',
            overflowY: 'auto',
            backgroundColor: 'rgba(13, 17, 24, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 170, 60, 0.35)',
            borderRadius: '16px',
            padding: 'clamp(14px, 2.5vw, 24px)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(255, 170, 60, 0.2)',
            zIndex: 40,
            animation: 'slideUp 0.3s ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <Pin size={18} color="#ffaa40" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.08em', color: '#ffaa40', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                BULLETIN BOARD • ABOUT ME
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
              padding: '12px 12px 18px 12px',
              borderRadius: '6px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              transform: 'rotate(-2deg)',
              marginBottom: '18px',
              border: '1px solid #e2dcd2',
            }}
          >
            <div
              style={{
                width: '100%',
                maxHeight: '230px',
                borderRadius: '3px',
                overflow: 'hidden',
                backgroundColor: '#1c2230',
              }}
            >
              <img
                src="/ghayzelle-polaroid.jpg"
                alt="Ghayzelle Dizon"
                style={{
                  width: '100%',
                  height: '230px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px', fontWeight: '700', fontSize: '13px', color: '#1e293b' }}>
              Ghayzelle Dizon
            </div>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ff7728', marginBottom: '10px' }}>
            A Little About Me
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
          <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '12px', marginBottom: '14px' }}>
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
          style={{
            position: 'absolute',
            bottom: 'clamp(14px, 3vh, 90px)',
            right: 'clamp(10px, 3vw, 36px)',
            left: 'clamp(10px, 3vw, auto)',
            width: 'min(450px, calc(100vw - 20px))',
            maxHeight: 'min(78vh, calc(100vh - 120px))',
            margin: '0 auto',
            overflowY: 'auto',
            backgroundColor: 'rgba(13, 17, 24, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 77, 21, 0.4)',
            borderRadius: '16px',
            padding: 'clamp(14px, 2.5vw, 24px)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(255, 77, 21, 0.25)',
            zIndex: 40,
            animation: 'slideUp 0.3s ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <FileText size={18} color="#ff4d15" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.08em', color: '#ff7728', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                DESK DOCUMENT • RESUME
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

          <div
            style={{
              backgroundColor: '#fff',
              color: '#1a1f2c',
              padding: '22px',
              borderRadius: '8px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              marginBottom: '18px',
              fontFamily: 'sans-serif',
            }}
          >
            <div style={{ borderBottom: '2px solid #ea580c', paddingBottom: '10px', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '900', margin: 0, color: '#0f172a' }}>
                Ghayzelle Dizon
              </h2>
              <div style={{ fontSize: '13px', color: '#ea580c', fontWeight: '800', marginTop: '2px' }}>
                FRONT-END DEVELOPER
              </div>
              <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>
                +63 969 0199 663 | ghayzelle.dzn@gmail.com | gazed.vercel.app | github.com/geyzz | linkedin.com/in/ghayzelle-dizon
              </div>
            </div>

            {/* Profile */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', marginBottom: '4px' }}>
                Profile
              </div>
              <p style={{ fontSize: '12px', color: '#1e293b', margin: 0, lineHeight: 1.5 }}>
                Computer Science student and Front-End Developer with a strong passion for UI/UX design, 3D visuals, and building distinctive web and mobile interfaces. Seeking a Front-End Developer role where I can turn creative design concepts in Figma and Blender into polished, responsive applications using React, React Native, and Flutter. Works earnestly toward every goal, learns new tools quickly, and follows through from initial design to working product.
              </p>
            </div>

            {/* Technical Skills */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', marginBottom: '4px' }}>
                Technical Skills
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
                Projects
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
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Personal Project</span>
                </div>
                <div style={{ fontSize: '11px', color: '#c2410c', fontStyle: 'italic', marginBottom: '3px' }}>Tech Stack: React, Vite, Supabase (PostgreSQL, RLS), JavaScript (ES6+), EmailJS, Custom CSS3</div>
                <div style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.45 }}>• Architected a full-stack real estate platform and session-authenticated Admin Portal with Supabase for real-time property CRUD listings, status management, and lead tracking.</div>
                <div style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.45 }}>• Engineered an interactive showroom featuring dual-thumb price sliders, dynamic Philippine geographic selectors (phil-reg-prov-mun-brgy), and multi-property inquiry carts.</div>
                <div style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.45 }}>• Integrated automated client notification workflows using EmailJS and crafted responsive CSS3 Grid layouts achieving sub-second load times and fluid modal views.</div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '12.5px', color: '#0f172a' }}>HAUtogo - Real-Time Faculty Tracking &amp; Class Management</strong>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Collaborative Project</span>
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
                Education
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '12.5px', color: '#0f172a' }}>Bachelor of Science in Computer Science</strong>
                <span style={{ fontSize: '11.5px', color: '#64748b' }}>2023 - Present</span>
              </div>
              <div style={{ fontSize: '12px', color: '#475569' }}>Holy Angel University</div>
              <div style={{ fontSize: '11.5px', color: '#0f172a', fontWeight: '600', marginTop: '2px' }}>• Dean's Lister: 1st Year (1st Semester), 2nd Year (1st Semester), 3rd Year</div>
            </div>

            {/* Certifications */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', marginBottom: '4px' }}>
                Certifications
              </div>
              <div style={{ fontSize: '11.5px', color: '#1e293b' }}>• <strong>Responsive Web Design</strong> - freeCodeCamp</div>
              <div style={{ fontSize: '11.5px', color: '#1e293b' }}>• <strong>JavaScript Essentials 1</strong> - Cisco Networking Academy</div>
              <div style={{ fontSize: '11.5px', color: '#1e293b' }}>• <strong>AWS Academy Graduate</strong> - Cloud Foundations - Amazon Web Services</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <a
              href="/Ghayzelle_Dizon_Resume.pdf"
              download="Ghayzelle_Dizon_Resume.pdf"
              style={{
                flex: '1 1 140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '11px 16px',
                backgroundColor: '#ff4d15',
                color: '#fff',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '13px',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(255, 77, 21, 0.4)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff6332';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ff4d15';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Download size={15} />
              <span>Download Resume (PDF)</span>
            </a>
            <a
              href="/Ghayzelle_Dizon_CV.pdf"
              download="Ghayzelle_Dizon_CV.pdf"
              style={{
                flex: '1 1 140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '11px 16px',
                backgroundColor: '#0f172a',
                color: '#fff',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '13px',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1e293b';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0f172a';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Download size={15} />
              <span>Download CV (PDF)</span>
            </a>
            <a
              href="mailto:ghayzelle.dzn@gmail.com?subject=Job%20Inquiry%20-%20Ghayzelle%20Dizon"
              style={{
                flex: '1 1 120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '11px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '13px',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <Mail size={15} />
              <span>Email</span>
            </a>
            <a
              href="https://github.com/geyzz"
              target="_blank"
              rel="noreferrer"
              style={{
                padding: '11px 16px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: '#fff',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '13px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <ExternalLink size={14} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}

      {/* Restore Info Panel Button when user dismissed it to inspect 3D */}
      {panelDismissed && activeStation !== 'portfolio' && (
        <button
          onClick={() => setPanelDismissed(false)}
          style={{
            position: 'absolute',
            bottom: '96px',
            right: '36px',
            backgroundColor: 'rgba(15, 20, 30, 0.92)',
            border: '1px solid #ff4d15',
            color: '#ff8a5c',
            padding: '10px 18px',
            borderRadius: '100px',
            fontSize: '12.5px',
            fontWeight: '700',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6), 0 0 16px rgba(255, 77, 21, 0.35)',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          <Sparkles size={14} color="#ff7728" />
          <span>Show Info Panel</span>
        </button>
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

      {/* Return to Room View Pill (Visible when zoomed into any station) */}
      {!loading && activeStation !== 'room' && (
        <button
          onClick={() => goToStation('room')}
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            borderRadius: '100px',
            border: '1px solid #ff4d15',
            backgroundColor: 'rgba(14, 18, 25, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: '#ffffff',
            fontSize: '12.5px',
            fontWeight: '700',
            letterSpacing: '0.04em',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(255, 77, 21, 0.35)',
            zIndex: 35,
            transition: 'all 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 77, 21, 0.28)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
            e.currentTarget.style.backgroundColor = 'rgba(14, 18, 25, 0.92)';
          }}
        >
          <Compass size={15} color="#ff7728" />
          <span>← Studio Room View</span>
        </button>
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
      `}</style>
    </div>
  );
}
