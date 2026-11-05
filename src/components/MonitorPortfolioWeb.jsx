import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Send,
  Award,
  GraduationCap,
  Github,
  Linkedin,
  ExternalLink,
  Download,
  Globe,
  Smartphone,
  Palette,
  Database,
  CheckCircle2,
  ArrowUpRight,
  Lightbulb,
  Eye,
  BookOpen,
  Sparkles,
  Shuffle,
  Rocket,
  MessageSquare,
  Users,
  X,
} from 'lucide-react';
import GazedLogo from './GazedLogo';

// ── FORMAL, COOL, SOPHISTICATED LIGHT-GREY & NAVY BLUE STUDIO PALETTE ──
const BG_MAIN = '#ececeb';           // Cool formal light grey canvas
const BG_SURFACE = '#f4f4f3';        // Elevated matte alabaster-grey surface
const BG_GLASS = 'rgba(255, 255, 255, 0.68)'; // Frosted glass callout pill fill
const TEXT_PRIMARY = '#141515';      // Deep formal obsidian charcoal
const TEXT_SECONDARY = '#525554';    // Cool architectural slate grey
const TEXT_MUTED = '#858987';        // Subtle silver-pewter grey
const NAVY_PRIMARY = '#16263b';      // Sophisticated architectural navy blue
const NAVY_ACCENT = '#213752';       // Rich slate-navy highlight
const NAVY_LIGHT = 'rgba(22, 38, 59, 0.08)'; // Subtle navy wash
const BORDER_SUBTLE = 'rgba(22, 38, 59, 0.1)';
const BORDER_STRONG = 'rgba(22, 38, 59, 0.22)';

const DISPLAY_FONT = '"Syne", "Plus Jakarta Sans", "Inter", -apple-system, sans-serif';
const SERIF_FONT = '"Bodoni Moda", "Playfair Display", Georgia, serif';
const SANS_FONT = '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, sans-serif';

// ── PERSONAL STRENGTHS & WORK ETHIC ──
const PERSONAL_STRENGTHS = [
  {
    num: '01',
    title: 'Creative Thinking',
    icon: Lightbulb,
    desc: 'You enjoy coming up with original concepts and exploring different ways to present ideas, especially in design and development.',
  },
  {
    num: '02',
    title: 'Attention to Detail',
    icon: Eye,
    desc: 'You pay attention to visual elements, layouts, colors, interactions, and small improvements that can make a project better.',
  },
  {
    num: '03',
    title: 'Willingness to Learn',
    icon: BookOpen,
    desc: "You're interested in exploring different technologies and learning tools like Blender, React, and 3D web development.",
  },
  {
    num: '04',
    title: 'Problem-Solving',
    icon: Sparkles,
    desc: "You explore solutions when something doesn't work as expected and look for ways to improve your projects.",
  },
  {
    num: '05',
    title: 'Adaptability',
    icon: Shuffle,
    desc: "You're willing to explore unfamiliar software, approaches, and technologies instead of limiting yourself to one area.",
  },
  {
    num: '06',
    title: 'Initiative and Self-Motivation',
    icon: Rocket,
    desc: 'You come up with your own project ideas and take steps to turn them into actual outputs.',
  },
  {
    num: '07',
    title: 'Interpersonal Communication',
    icon: Users,
    desc: 'Good with communication with people, actively listening, aligning on visions, and collaborating productively in team and client settings.',
  },
];

// ── CUSTOM SVG TECH ICONS ──
function TechSvgIcon({ name, size = 18, color = 'currentColor' }) {
  const s = size;
  switch (name) {
    case 'React':
    case 'React.js':
    case 'React Native':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7">
          <circle cx="12" cy="12" r="2.2" fill={color} />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
        </svg>
      );
    case 'Flutter':
    case 'Dart':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2L4 12l3.5 3.5L21 2h-7z" />
          <path d="M14 11.5L8.5 17l5.5 5.5h7l-5.5-5.5L21 11.5h-7z" />
        </svg>
      );
    case 'TypeScript':
    case 'JavaScript':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M10 15v-5M8 10h4M14 14.5c.5.8 2.5.8 2.5-.5s-2.5-.8-2.5-2 2-1.2 2.5-.4" />
        </svg>
      );
    case 'HTML5':
    case 'Custom CSS3':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 3l1.6 14.4L12 21l6.4-3.6L20 3H4z" />
          <path d="M8 8h8l-.5 4.5-3.5 1-3.5-1-.2-2" />
        </svg>
      );
    case 'Figma':
    case 'UI/UX Design':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3H8.5a3 3 0 0 0 0 6H12V3z" />
          <path d="M12 3h3.5a3 3 0 0 1 0 6H12V3z" />
          <path d="M12 9H8.5a3 3 0 0 0 0 6H12V9z" />
          <circle cx="15.5" cy="12" r="3" />
          <path d="M8.5 21a3 3 0 0 0 3.5-3v-3H8.5a3 3 0 0 0 0 6z" />
        </svg>
      );
    case 'Blender 3D':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
          <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
        </svg>
      );
    case 'Supabase':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
    case 'PostgreSQL':
    case 'SQL':
    case 'AsyncStorage':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
        </svg>
      );
    case 'Vite':
    case 'Expo':
    case 'EAS Build':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case 'Git / GitHub':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <path d="M6 8.5v7M18 8.5c0 4.5-12 2.5-12 7" />
        </svg>
      );
    default:
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      );
  }
}

// ── CENTERPIECE 3D SMOKED-GLASS FOLDER WITH FLOATING CALLOUT TAGS (Replaces Joker in Reference Layout) ──
function Centerpiece3DFolder({ onScrollToProjects }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: ny * -11, y: nx * 13 });
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px clamp(8px, 3vw, 44px)',
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Soft diffused studio pedestal shadow beneath folder */}
      <div
        style={{
          position: 'absolute',
          bottom: '4px',
          width: 'min(390px, 85vw)',
          height: '44px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(20, 21, 21, 0.26) 0%, rgba(20, 21, 21, 0.08) 52%, transparent 76%)',
          filter: 'blur(12px)',
          pointerEvents: 'none',
        }}
      />

      {/* Interactive 3D Folder Body */}
      <div
        onClick={onScrollToProjects}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHovered(false);
          setTilt({ x: 0, y: 0 });
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onScrollToProjects();
        }}
        title="Click folder to explore Selected Works"
        style={{
          position: 'relative',
          width: 'min(440px, calc(100vw - 40px))',
          height: 'min(375px, calc((100vw - 40px) * 0.85))',
          maxWidth: '440px',
          maxHeight: '375px',
          cursor: 'pointer',
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.03 : 1})`,
          transition: hovered ? 'transform 0.08s ease-out' : 'transform 0.48s cubic-bezier(0.22, 1, 0.36, 1)',
          userSelect: 'none',
        }}
      >
        {/* 1. BACK SMOKED-OBSIDIAN GLASS PLATE WITH TOP-LEFT TAB */}
        <svg
          width="100%"
          height="92%"
          viewBox="0 0 460 360"
          fill="none"
          style={{
            position: 'absolute',
            bottom: '2%',
            left: 0,
            overflow: 'visible',
          }}
        >
          <defs>
            <linearGradient id="formalBackPlate" x1="0" y1="40" x2="440" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#353837" />
              <stop offset="45%" stopColor="#1d1f1e" />
              <stop offset="100%" stopColor="#111212" />
            </linearGradient>
            <linearGradient id="formalBackRim" x1="0" y1="40" x2="450" y2="350" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.65)" />
              <stop offset="50%" stopColor="rgba(160, 165, 162, 0.35)" />
              <stop offset="100%" stopColor="rgba(20, 21, 21, 0.5)" />
            </linearGradient>
          </defs>
          <path
            d="M 22 78
               Q 22 48 52 48
               L 156 48
               Q 176 48 188 64
               L 210 92
               Q 218 102 234 102
               L 416 102
               Q 442 102 442 128
               L 442 322
               Q 442 348 416 348
               L 48 348
               Q 22 348 22 322
               Z"
            fill="url(#formalBackPlate)"
            stroke="url(#formalBackRim)"
            strokeWidth="2.2"
          />
        </svg>

        {/* 2. PEEKING GOLDEN-RATIO & ARCHITECTURAL NAVY BLUEPRINT PLATES INSIDE FOLDER */}
        <div
          style={{
            position: 'absolute',
            top: hovered ? '2px' : '16px',
            left: '80px',
            width: '230px',
            height: '178px',
            borderRadius: '16px',
            background: 'linear-gradient(145deg, #213752 0%, #111e2e 100%)',
            border: '1.5px solid rgba(180, 210, 245, 0.34)',
            boxShadow: '0 18px 36px rgba(15, 27, 43, 0.48)',
            transform: hovered ? 'rotate(-8deg) translateY(-12px)' : 'rotate(-6deg)',
            transition: 'all 0.38s cubic-bezier(0.22, 1, 0.36, 1)',
            overflow: 'hidden',
          }}
        >
          <svg width="230" height="178" viewBox="0 0 240 185" fill="none">
            <line x1="0" y1="36" x2="240" y2="36" stroke="rgba(190,218,248,0.22)" strokeWidth="0.9" />
            <line x1="0" y1="95" x2="240" y2="95" stroke="rgba(190,218,248,0.18)" strokeWidth="0.9" />
            <line x1="0" y1="142" x2="240" y2="142" stroke="rgba(190,218,248,0.14)" strokeWidth="0.9" />
            <line x1="48" y1="0" x2="48" y2="185" stroke="rgba(190,218,248,0.18)" strokeWidth="0.9" />
            <line x1="138" y1="0" x2="138" y2="185" stroke="rgba(190,218,248,0.25)" strokeWidth="0.9" />
            <line x1="196" y1="0" x2="196" y2="185" stroke="rgba(190,218,248,0.2)" strokeWidth="0.9" />
            <path
              d="M 48 165 Q 138 36 196 36 Q 230 36 220 95 Q 210 142 138 142"
              stroke="rgba(220, 236, 255, 0.78)"
              strokeWidth="1.3"
              fill="none"
            />
          </svg>
        </div>

        <div
          style={{
            position: 'absolute',
            top: hovered ? '20px' : '36px',
            right: '42px',
            width: '178px',
            height: '158px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #f5f5f4 0%, #cfd2d0 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.9)',
            boxShadow: '0 16px 32px rgba(0,0,0,0.35)',
            transform: hovered ? 'rotate(16deg) translateY(-12px) translateX(6px)' : 'rotate(12deg)',
            transition: 'all 0.38s cubic-bezier(0.22, 1, 0.36, 1)',
            overflow: 'hidden',
          }}
        >
          <svg width="178" height="158" viewBox="0 0 185 165" fill="none">
            <line x1="0" y1="45" x2="185" y2="45" stroke="rgba(20,21,21,0.28)" strokeWidth="0.9" />
            <line x1="0" y1="105" x2="185" y2="105" stroke="rgba(20,21,21,0.28)" strokeWidth="0.9" />
            <line x1="65" y1="0" x2="65" y2="165" stroke="rgba(20,21,21,0.28)" strokeWidth="0.9" />
            <line x1="125" y1="0" x2="125" y2="165" stroke="rgba(20,21,21,0.28)" strokeWidth="0.9" />
            <line x1="20" y1="15" x2="160" y2="155" stroke="rgba(20,21,21,0.22)" strokeWidth="0.9" />
            <line x1="160" y1="15" x2="20" y2="155" stroke="rgba(20,21,21,0.22)" strokeWidth="0.9" />
            <circle cx="65" cy="105" r="28" stroke="rgba(20,21,21,0.45)" strokeWidth="1" />
            <circle cx="65" cy="105" r="14" stroke="rgba(20,21,21,0.35)" strokeWidth="0.9" />
          </svg>
        </div>

        {/* 3. FRONT SCULPTED SMOKED-GLASS POCKET */}
        <div
          style={{
            position: 'absolute',
            bottom: '2%',
            left: '5%',
            width: '90%',
            height: '70%',
            pointerEvents: 'none',
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 416 272"
            fill="none"
            style={{ position: 'absolute', inset: 0, filter: 'drop-shadow(0 22px 36px rgba(20,21,21,0.32))' }}
          >
            <defs>
              <linearGradient id="formalFrontFill" x1="0" y1="0" x2="416" y2="272" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(68, 72, 70, 0.86)" />
                <stop offset="28%" stopColor="rgba(34, 36, 35, 0.92)" />
                <stop offset="75%" stopColor="rgba(18, 19, 19, 0.96)" />
                <stop offset="100%" stopColor="rgba(48, 52, 50, 0.9)" />
              </linearGradient>
              <linearGradient id="formalFrontRim" x1="0" y1="0" x2="416" y2="272" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.92)" />
                <stop offset="30%" stopColor="rgba(200, 204, 202, 0.45)" />
                <stop offset="70%" stopColor="rgba(140, 145, 142, 0.25)" />
                <stop offset="100%" stopColor="rgba(230, 233, 231, 0.8)" />
              </linearGradient>
            </defs>

            <path
              d="M 4 36
                 Q 4 6 34 6
                 L 132 6
                 Q 154 6 168 24
                 L 188 48
                 Q 198 60 218 60
                 L 384 60
                 Q 412 60 412 88
                 L 412 242
                 Q 412 268 384 268
                 L 32 268
                 Q 4 268 4 242
                 Z"
              fill="url(#formalFrontFill)"
              stroke="url(#formalFrontRim)"
              strokeWidth="2.4"
            />
          </svg>

          {/* TYPOGRAPHY & DETAILS ON FRONT GLASS FACE */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              padding: '58px 32px 24px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div
                  style={{
                    fontFamily: SANS_FONT,
                    fontSize: '40px',
                    fontWeight: '800',
                    lineHeight: 0.98,
                    letterSpacing: '-0.035em',
                    color: '#f2f3f2',
                  }}
                >
                  Selected
                </div>
                <div
                  style={{
                    fontFamily: SANS_FONT,
                    fontSize: '40px',
                    fontWeight: '700',
                    lineHeight: 1.02,
                    letterSpacing: '-0.035em',
                    background: 'linear-gradient(90deg, #d8dcdb 0%, #8a918e 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Works
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', marginTop: '4px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '800',
                    color: '#f2f3f2',
                  }}
                >
                  GD
                </div>
                <div
                  style={{
                    fontSize: '8px',
                    fontWeight: '600',
                    letterSpacing: '0.18em',
                    lineHeight: 1.5,
                    color: 'rgba(220, 224, 222, 0.65)',
                    textTransform: 'uppercase',
                  }}
                >
                  DIGITAL<br />
                  ARCHIVE<br />
                  EDITION
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '18px', fontWeight: '300', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', lineHeight: 1 }}>
                +
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  fontSize: '8px',
                  fontWeight: '600',
                  letterSpacing: '0.2em',
                  color: 'rgba(220, 224, 222, 0.6)',
                  textTransform: 'uppercase',
                }}
              >
                <span>LAYOUTS</span>
                <span>SYSTEMS</span>
                <span>MOBILE</span>
                <span>PRECISION</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. 3D METALLIC-GLASS CURSOR POINTER ON BOTTOM-RIGHT */}
        <div
          style={{
            position: 'absolute',
            bottom: '-6px',
            right: '6px',
            transform: hovered ? 'translate(-6px, -6px) scale(1.08)' : 'translate(0, 0) scale(1)',
            transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
            pointerEvents: 'none',
            filter: 'drop-shadow(0 14px 22px rgba(0,0,0,0.45))',
          }}
        >
          <svg width="82" height="88" viewBox="0 0 88 94" fill="none">
            <path
              d="M 14 10 L 78 44 Q 84 47 78 51 L 49 60 L 36 86 Q 33 92 29 85 L 10 15 Q 9 8 14 10 Z"
              fill="#f4f4f3"
            />
            <path
              d="M 17 15 L 72 45 L 46 54 L 34 79 L 17 15 Z"
              fill={NAVY_PRIMARY}
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ── FLOATING FROSTED GLASS CALLOUT PILL 1 (Matching "● Intelligence" in Reference Image) ── */}
      <div
        style={{
          position: 'absolute',
          top: '52px',
          right: '8px',
          zIndex: 20,
          backgroundColor: 'rgba(244, 244, 243, 0.88)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${BORDER_SUBTLE}`,
          borderRadius: '10px',
          padding: '11px 18px',
          boxShadow: '0 12px 32px rgba(22, 38, 59, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          maxWidth: 'calc(100% - 16px)',
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: NAVY_PRIMARY,
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: '12px', fontWeight: '700', color: TEXT_PRIMARY, letterSpacing: '0.01em' }}>
          UI/UX &amp; 3D Architecture
        </span>
      </div>

      {/* ── FLOATING FROSTED GLASS CALLOUT PILL 2 (Matching "● Complete Unpredictability" in Reference Image) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          right: '8px',
          zIndex: 20,
          backgroundColor: 'rgba(244, 244, 243, 0.88)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${BORDER_SUBTLE}`,
          borderRadius: '10px',
          padding: '12px 18px',
          boxShadow: '0 12px 32px rgba(22, 38, 59, 0.08)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          pointerEvents: 'none',
          maxWidth: 'calc(100% - 16px)',
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: NAVY_PRIMARY,
            marginTop: '4px',
            flexShrink: 0,
          }}
        />
        <div style={{ fontSize: '12px', fontWeight: '700', color: TEXT_PRIMARY, lineHeight: 1.35 }}>
          Front-End Web &amp;
          <br />
          Cross-Platform Mobile
        </div>
      </div>
    </div>
  );
}

// ── FLOATING 3D INTERACTIVE ARCHITECTURAL PORTRAIT (Dynamic Cursor Physics Tilt & Holographic Pills) ──
function FloatingInteractivePortrait() {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: ny * -16, y: nx * 18 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Normalized parallax offsets for layered 3D depth
  const pX = tilt.y / 18;
  const pY = -tilt.x / 16;

  // The 4 About Me credential callout items floating in 3D parallax
  const calloutPills = [
    {
      id: 'p1',
      num: '01',
      text: 'Holy Angel University',
      pos: { top: '-14px', left: '-18px' },
      depthZ: 44,
      pFactor: 14,
    },
    {
      id: 'p2',
      num: '02',
      text: 'B.S. Computer Science',
      pos: { top: '34%', right: '-24px' },
      depthZ: 52,
      pFactor: 18,
    },
    {
      id: 'p3',
      num: '03',
      text: "Dean's Honor List",
      pos: { bottom: '26%', left: '-22px' },
      depthZ: 48,
      pFactor: 16,
    },
    {
      id: 'p4',
      num: '04',
      text: 'Front-End & Spatial 3D',
      pos: { bottom: '-14px', right: '-8px' },
      depthZ: 42,
      pFactor: 12,
    },
  ];

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 10px 36px',
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto',
        perspective: '1200px',
        overflow: 'visible',
      }}
    >
      {/* Soft Diffused Studio Pedestal Shadow beneath the floating card */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          width: '80%',
          height: '38px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(20, 21, 21, 0.28) 0%, rgba(20, 21, 21, 0.08) 55%, transparent 75%)',
          filter: 'blur(14px)',
          pointerEvents: 'none',
          transform: `scale(${hovered ? 1.08 : 0.95}) translateY(${hovered ? 6 : 0}px)`,
          transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      {/* Floating 3D Tilting Dossier Card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '340px',
          backgroundColor: '#e9e9e8',
          borderRadius: '18px',
          border: `1px solid ${BORDER_SUBTLE}`,
          padding: '16px 16px 20px',
          boxShadow: hovered
            ? '0 28px 56px rgba(22, 38, 59, 0.16), 0 10px 20px rgba(0,0,0,0.06)'
            : '0 16px 36px rgba(20, 21, 21, 0.08), 0 4px 10px rgba(0,0,0,0.03)',
          boxSizing: 'border-box',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hovered ? -10 : 0}px) scale(${hovered ? 1.025 : 1})`,
          transition: hovered
            ? 'transform 0.08s ease-out, box-shadow 0.25s ease'
            : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease',
          cursor: 'grab',
          userSelect: 'none',
        }}
      >
        {/* ── FLOATING CALLOUT PILL: • INTERACTIVE 3D ── */}
        <div
          style={{
            position: 'absolute',
            top: '-14px',
            right: '-10px',
            zIndex: 26,
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${BORDER_SUBTLE}`,
            borderRadius: '100px',
            padding: '6px 14px',
            boxShadow: hovered
              ? '0 10px 28px rgba(22, 38, 59, 0.16)'
              : '0 6px 18px rgba(22, 38, 59, 0.10)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            fontWeight: '800',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: NAVY_PRIMARY,
            transform: `translateZ(38px) translate(${pX * 8}px, ${pY * 8}px)`,
            transition: hovered
              ? 'transform 0.08s ease-out, box-shadow 0.25s ease'
              : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: NAVY_PRIMARY,
              flexShrink: 0,
            }}
          />
          <span>Interactive 3D</span>
        </div>

        {/* ── 4 FLOATING 3D PARALLAX PILLS ([01] to [04]) ── */}
        {calloutPills.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              ...p.pos,
              zIndex: 25,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(16px)',
              border: `1px solid ${BORDER_SUBTLE}`,
              borderRadius: '100px',
              padding: '6px 13px',
              boxShadow: hovered
                ? '0 10px 26px rgba(22, 38, 59, 0.15)'
                : '0 6px 16px rgba(22, 38, 59, 0.09)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10px',
              fontWeight: '800',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: NAVY_PRIMARY,
              transform: `translateZ(${p.depthZ}px) translate(${pX * p.pFactor}px, ${pY * p.pFactor}px)`,
              transition: hovered
                ? 'transform 0.08s ease-out, box-shadow 0.25s ease'
                : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: NAVY_PRIMARY,
                flexShrink: 0,
              }}
            />
            <span style={{ opacity: 0.6, fontSize: '9px', letterSpacing: '0.08em' }}>[{p.num}]</span>
            <span>{p.text}</span>
          </div>
        ))}

        {/* Top Technical Metadata Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '9.5px',
            fontWeight: '700',
            letterSpacing: '0.14em',
            color: TEXT_MUTED,
            textTransform: 'uppercase',
            paddingBottom: '10px',
            borderBottom: '1px solid rgba(22, 38, 59, 0.08)',
            marginBottom: '14px',
          }}
        >
          <span>[ 01 ] ARCHIVE PORTRAIT</span>
          <span>+</span>
          <span>15.145°N 120.588°E</span>
        </div>

        {/* Framed Photograph Container with Corner Brackets & Reverse Depth Parallax */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            borderRadius: '10px',
            overflow: 'hidden',
            backgroundColor: '#1b222c',
            border: '1px solid rgba(22, 38, 59, 0.16)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.25)',
            transform: `translateZ(18px) translate(${pX * -4}px, ${pY * -4}px)`,
            transition: hovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <img
            src="/ghayzelle-polaroid.jpg"
            alt="Ghayzelle Dizon"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '380px',
              objectFit: 'cover',
              display: 'block',
              filter: 'contrast(1.03) saturate(0.96)',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />

          {/* Subtle Studio Corner Registration L-Brackets */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              width: '12px',
              height: '12px',
              borderTop: '2px solid rgba(255,255,255,0.7)',
              borderLeft: '2px solid rgba(255,255,255,0.7)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '12px',
              height: '12px',
              borderTop: '2px solid rgba(255,255,255,0.7)',
              borderRight: '2px solid rgba(255,255,255,0.7)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              width: '12px',
              height: '12px',
              borderBottom: '2px solid rgba(255,255,255,0.7)',
              borderLeft: '2px solid rgba(255,255,255,0.7)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              width: '12px',
              height: '12px',
              borderBottom: '2px solid rgba(255,255,255,0.7)',
              borderRight: '2px solid rgba(255,255,255,0.7)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Bottom Architectural Typographic Spec Block */}
        <div
          style={{
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid rgba(22, 38, 59, 0.08)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '4px',
            }}
          >
            <span
              style={{
                fontFamily: DISPLAY_FONT,
                fontSize: '15px',
                fontWeight: '800',
                letterSpacing: '0.02em',
                color: TEXT_PRIMARY,
              }}
            >
              Ghayzelle Dizon
            </span>
            <span
              style={{
                fontFamily: DISPLAY_FONT,
                fontSize: '11px',
                fontWeight: '800',
                letterSpacing: '0.1em',
                color: NAVY_PRIMARY,
                padding: '2px 7px',
                borderRadius: '4px',
                backgroundColor: 'rgba(22, 38, 59, 0.08)',
              }}
            >
              GD · 2026
            </span>
          </div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: TEXT_MUTED,
            }}
          >
            Front-End Developer · Pampanga, Philippines
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TABLET GADGET (Formal Studio Hardware Frame with Authentic Project Homepage Previews) ──
function TabletGadget({ project }) {
  const [planedScreen, setPlanedScreen] = useState(0);
  const [cjActiveProp, setCjActiveProp] = useState(0);

  const cjProperties = [
    { img: '/projects/cj-property1.jpg', loc: 'Magalang, Pampanga', prov: 'PAMPANGA', badge: 'FEATURED LOT' },
    { img: '/projects/cj-property2.png', loc: 'Angeles City, Pampanga', prov: 'PAMPANGA', badge: 'PRIME ESTATE' },
    { img: '/projects/cj-property3.jpg', loc: 'San Fernando, Pampanga', prov: 'PAMPANGA', badge: 'CLEAN TITLE' },
  ];

  const renderHomepagePreview = () => {
    // 1. C&J REAL ESTATE HOMEPAGE PREVIEW (Exact replica of geyzz/real-estate Navbar.jsx + Hero.jsx + App.css)
    if (project.id === 'cj-realestate') {
      const currentProp = cjProperties[cjActiveProp];
      const nextProp = cjProperties[(cjActiveProp + 1) % cjProperties.length];
      return (
        <div
          style={{
            position: 'relative',
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: '#DFE1E5',
            overflow: 'hidden',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            userSelect: 'none',
          }}
        >
          {/* Aerial Estate Background Image (Mirrored horizontally like .background-img in App.css) */}
          <img
            src={currentProp.img}
            alt="C&J Real Estate Hero"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)',
              transition: 'all 0.45s ease',
            }}
          />

          {/* Soft Alabaster Radial Vignette Overlay (Matching .home-page::after in App.css) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 68% 65% at 26% 38%, rgba(243, 244, 246, 0.88) 0%, rgba(243, 244, 246, 0.52) 55%, rgba(243, 244, 246, 0.08) 100%), linear-gradient(180deg, rgba(243, 244, 246, 0.72) 0%, rgba(243, 244, 246, 0.15) 40%, rgba(15, 20, 15, 0.35) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Top Navbar: C [AND] J Real Est. + White Trapezoid Nav + Green "Find a Property" Pill */}
          <div
            style={{
              position: 'relative',
              zIndex: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 14px',
              height: '34px',
            }}
          >
            {/* C AND J Real Est. Brand Mark */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#3D3B36',
                fontWeight: '800',
                fontSize: '11px',
                letterSpacing: '0.02em',
                textShadow: '0 1px 8px rgba(243,244,246,0.95)',
              }}
            >
              <span style={{ fontSize: '13px' }}>C</span>
              <span
                style={{
                  fontSize: '6px',
                  transform: 'rotate(90deg)',
                  margin: '0 -1px',
                  fontWeight: '900',
                }}
              >
                AND
              </span>
              <span style={{ fontSize: '13px', marginRight: '3px' }}>J</span>
              <span style={{ fontSize: '10.5px', fontFamily: 'Georgia, serif' }}>Real Est.</span>
            </div>

            {/* White Curved Trapezoid Center Nav (.nav-trapezoid) */}
            <div
              style={{
                background: '#F3F4F6',
                padding: '5px 18px 6px',
                borderRadius: '0 0 14px 14px',
                boxShadow: '0 4px 10px rgba(61, 59, 54, 0.18)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '7.5px',
                fontWeight: '800',
                color: '#3D3B36',
              }}
            >
              <span style={{ color: '#4F6D3A', borderBottom: '1.5px solid #4F6D3A', paddingBottom: '1px' }}>Home</span>
              <span>About Us</span>
              <span>Properties</span>
              <span>Contact Us</span>
            </div>

            {/* Right Green Pill Button (.property-btn) */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '999px',
                background: 'linear-gradient(180deg, #567640 0%, #486435 55%, #3D562C 100%)',
                color: '#F3F4F6',
                fontSize: '7.5px',
                fontWeight: '700',
                boxShadow: '0 1px 0 #314623, 0 4px 10px rgba(42, 60, 30, 0.42)',
              }}
            >
              <span>🔍</span>
              <span>Find a Property</span>
            </div>
          </div>

          {/* Left Hero Message (.home-msg) */}
          <div
            style={{
              position: 'relative',
              zIndex: 3,
              padding: '18px 18px 0',
              maxWidth: '58%',
            }}
          >
            <div
              style={{
                fontSize: '17px',
                fontWeight: '900',
                color: '#3D3B36',
                lineHeight: 1.06,
                letterSpacing: '-0.01em',
                textShadow: '0 2px 12px rgba(243, 244, 246, 0.95)',
                marginBottom: '6px',
              }}
            >
              Find A Property
              <br />
              To Build Your Dream House
            </div>
            <div
              style={{
                fontSize: '7.5px',
                fontWeight: '600',
                color: '#3D3B36',
                lineHeight: 1.45,
                textShadow: '0 1px 8px rgba(243, 244, 246, 0.95)',
                marginBottom: '10px',
              }}
            >
              Discover prime residential lots and modern estates set in peaceful, thriving communities.
              C and J Real Estate makes every step simple and transparent.
            </div>
            <div
              style={{
                display: 'inline-block',
                padding: '5px 16px',
                borderRadius: '999px',
                background: 'linear-gradient(180deg, #567640 0%, #486435 55%, #3D562C 100%)',
                color: '#F3F4F6',
                fontSize: '8px',
                fontWeight: '700',
                boxShadow: '0 1.5px 0 #314623, 0 6px 14px rgba(42, 60, 30, 0.45)',
              }}
            >
              Get Started
            </div>
          </div>

          {/* Bottom Row: Left 3 Feature Cards (.abt-icons) + Right Property Carousel (.carousel-property) */}
          <div
            style={{
              position: 'absolute',
              left: '14px',
              right: '14px',
              bottom: '10px',
              zIndex: 4,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            {/* 3 Hero Features: Quality Estates, Prime Locations, Trusted Ownership */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '6px',
                flex: '1 1 56%',
                background: 'rgba(243, 244, 246, 0.84)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                padding: '7px 8px',
                border: '1px solid rgba(255,255,255,0.75)',
                boxShadow: '0 8px 20px rgba(28, 27, 24, 0.16)',
              }}
            >
              {[
                { title: 'Quality Estates', sub: 'Ready-to-build residential lots' },
                { title: 'Prime Locations', sub: 'Safe, accessible communities' },
                { title: 'Trusted Ownership', sub: 'Verified clean titles & pricing' },
              ].map((ft) => (
                <div key={ft.title} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ fontSize: '7px', fontWeight: '800', color: '#4F6D3A' }}>{ft.title}</div>
                  <div style={{ fontSize: '6px', color: '#3D3B36', lineHeight: 1.25, fontWeight: '600' }}>{ft.sub}</div>
                </div>
              ))}
            </div>

            {/* Interactive Property Carousel Card (Click to cycle real properties) */}
            <div
              onClick={() => setCjActiveProp((prev) => (prev + 1) % cjProperties.length)}
              title="Click to cycle property preview"
              style={{
                width: '152px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'stretch',
                gap: '5px',
                cursor: 'pointer',
              }}
            >
              {/* Featured Property Card */}
              <div
                style={{
                  flex: 1,
                  background: 'rgba(243, 244, 246, 0.92)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '12px',
                  padding: '6px',
                  border: '1px solid rgba(255,255,255,0.85)',
                  boxShadow: '0 10px 24px rgba(20, 21, 21, 0.28)',
                  display: 'flex',
                  gap: '6px',
                  alignItems: 'center',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'inline-block',
                      fontSize: '5.5px',
                      fontWeight: '800',
                      padding: '1.5px 5px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(79, 109, 58, 0.16)',
                      color: '#3D562C',
                      marginBottom: '2px',
                    }}
                  >
                    {currentProp.badge}
                  </div>
                  <div
                    style={{
                      fontSize: '7px',
                      fontWeight: '800',
                      color: '#3D3B36',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginBottom: '4px',
                    }}
                  >
                    {currentProp.loc}
                  </div>
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '2.5px 7px',
                      borderRadius: '999px',
                      background: 'linear-gradient(180deg, #567640 0%, #3D562C 100%)',
                      color: '#fff',
                      fontSize: '6px',
                      fontWeight: '700',
                    }}
                  >
                    View Details
                  </div>
                </div>
                <img
                  src={nextProp.img}
                  alt={nextProp.loc}
                  style={{
                    width: '42px',
                    height: '46px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 2. PLAN_.ED HOMEPAGE PREVIEW (Actual Mobile App Screenshots from geyzz/shopping-planner)
    if (project.id === 'plan-ed') {
      const screens = [
        { src: '/projects/planed-home.jpg', label: 'Home Dashboard' },
        { src: '/projects/planed-malls.jpg', label: '4 Malls & Cost' },
        { src: '/projects/planed-calendar.jpg', label: 'Errand Calendar' },
      ];
      return (
        <div
          style={{
            position: 'relative',
            flex: 1,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 50% 35%, #1d2433 0%, #0e121a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '10px 16px',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Gold Glow Behind Active Phone */}
          <div
            style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(214, 179, 73, 0.22) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {screens.map((scr, idx) => {
            const isCenter = idx === planedScreen;
            return (
              <div
                key={scr.label}
                onClick={() => setPlanedScreen(idx)}
                style={{
                  width: isCenter ? '116px' : '92px',
                  height: isCenter ? '218px' : '182px',
                  borderRadius: '14px',
                  padding: '3px',
                  background: isCenter
                    ? 'linear-gradient(145deg, #d6b349 0%, #524318 100%)'
                    : 'rgba(255, 255, 255, 0.14)',
                  boxShadow: isCenter
                    ? '0 16px 34px rgba(0, 0, 0, 0.55)'
                    : '0 8px 18px rgba(0, 0, 0, 0.35)',
                  opacity: isCenter ? 1 : 0.72,
                  transform: isCenter ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.95)',
                  transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: isCenter ? 3 : 1,
                  flexShrink: 0,
                }}
              >
                <img
                  src={scr.src}
                  alt={scr.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                     objectPosition: 'top center',
                    borderRadius: '11px',
                    display: 'block',
                  }}
                />
              </div>
            );
          })}
        </div>
      );
    }

    // 3. HAUTOGO HOMEPAGE PREVIEW (HAU Maroon #550000 & Gold #EFBF04 Campus Geofence Map + Live Supabase DB)
    return (
      <div
        style={{
          position: 'relative',
          flex: 1,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #2d0606 0%, #550000 52%, #1a0505 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '12px 16px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
        }}
      >
        {/* Left: HAUtogo Flutter Mobile Home Screen (mainPage.dart) */}
        <div
          style={{
            width: '148px',
            height: '216px',
            borderRadius: '16px',
            backgroundColor: '#f7f4f0',
            border: '2.5px solid #EFBF04',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            flexShrink: 0,
            position: 'relative',
            zIndex: 3,
          }}
        >
          {/* HAU Maroon Top AppBar (#550000) */}
          <div
            style={{
              backgroundColor: '#550000',
              color: '#ffffff',
              padding: '7px 9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1.5px solid #EFBF04',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <img
                src="/projects/hautogo-4.jpg"
                alt="HAUtogo Emblem"
                style={{ width: '15px', height: '15px', borderRadius: '4px', objectFit: 'cover' }}
              />
              <span style={{ fontSize: '8.5px', fontWeight: '800', letterSpacing: '0.03em' }}>HAUtogo</span>
            </div>
            <span
              style={{
                fontSize: '5.5px',
                fontWeight: '800',
                padding: '1.5px 5px',
                borderRadius: '999px',
                backgroundColor: '#EFBF04',
                color: '#550000',
              }}
            >
              GEOFENCE ON
            </span>
          </div>

          {/* Interactive HAU Campus Map Viewport (flutter_map + Geofence + Live Professor Markers) */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              background:
                'radial-gradient(circle at 52% 46%, rgba(239, 191, 4, 0.16) 0%, rgba(85, 0, 0, 0.08) 58%, #e5e0d8 100%)',
              overflow: 'hidden',
            }}
          >
            {/* Campus Map Grid & Roads */}
            <svg width="100%" height="100%" viewBox="0 0 150 110" style={{ position: 'absolute', inset: 0 }}>
              <rect width="150" height="110" fill="#ebe6de" />
              <path d="M0 32 L150 32 M0 74 L150 74 M42 0 L42 110 M105 0 L105 110" stroke="#d8d0c5" strokeWidth="4" />
              {/* HAU Campus Buildings */}
              <rect x="48" y="14" width="48" height="22" rx="3" fill="#d5c7b8" stroke="#b5a392" strokeWidth="1" />
              <rect x="14" y="42" width="42" height="24" rx="3" fill="#d5c7b8" stroke="#b5a392" strokeWidth="1" />
              <rect x="76" y="44" width="54" height="24" rx="3" fill="#d5c7b8" stroke="#b5a392" strokeWidth="1" />
              {/* Dashed HAU Geofence Boundary */}
              <circle
                cx="75"
                cy="52"
                r="44"
                fill="rgba(85, 0, 0, 0.05)"
                stroke="#550000"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
            </svg>

            {/* Live Professor Location Pin 1 (St. Joseph Hall Rm 501) */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '48px',
                backgroundColor: '#550000',
                color: '#ffffff',
                border: '1px solid #EFBF04',
                borderRadius: '999px',
                padding: '2px 6px',
                fontSize: '5.8px',
                fontWeight: '800',
                boxShadow: '0 3px 8px rgba(85,0,0,0.35)',
              }}
            >
              📍 SJH Rm 501 · CS101
            </div>

            {/* Live Professor Location Pin 2 (MGN Bldg Rm 301) */}
            <div
              style={{
                position: 'absolute',
                top: '46px',
                right: '8px',
                backgroundColor: '#EFBF04',
                color: '#550000',
                border: '1px solid #550000',
                borderRadius: '999px',
                padding: '2px 6px',
                fontSize: '5.8px',
                fontWeight: '900',
                boxShadow: '0 3px 8px rgba(0,0,0,0.22)',
              }}
            >
              📍 MGN Rm 301 · MATH102
            </div>
          </div>

          {/* Sliding Up Panel (sliding_up_panel: Next Class Info + Navigate Next Room) */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderTop: '1px solid rgba(85,0,0,0.12)',
              borderRadius: '10px 10px 0 0',
              padding: '6px 8px 5px',
              boxShadow: '0 -4px 12px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ width: '20px', height: '2px', backgroundColor: '#ccc', borderRadius: '2px', margin: '0 auto 4px' }} />
            <div style={{ fontSize: '5.5px', fontWeight: '800', color: '#550000', letterSpacing: '0.06em' }}>
              NEXT CLASS SCHEDULE
            </div>
            <div style={{ fontSize: '7px', fontWeight: '800', color: '#1b1b1b', marginBottom: '4px' }}>
              CS103 · Web Dev · SJH 503
            </div>
            <div
              style={{
                backgroundColor: '#550000',
                color: '#EFBF04',
                textAlign: 'center',
                padding: '3.5px 6px',
                borderRadius: '999px',
                fontSize: '6px',
                fontWeight: '800',
                marginBottom: '5px',
              }}
            >
              Navigate Next Room →
            </div>

            {/* Rounded Pill BottomNavigationBar (Radius.circular(100) from README) */}
            <div
              style={{
                backgroundColor: '#550000',
                borderRadius: '100px',
                padding: '3px 8px',
                display: 'flex',
                justifyContent: 'space-around',
                fontSize: '5.5px',
                fontWeight: '800',
                color: '#ffffff',
              }}
            >
              <span style={{ color: '#EFBF04' }}>● Map</span>
              <span>Schedule</span>
              <span>Profile</span>
            </div>
          </div>
        </div>

        {/* Right: Actual Supabase Realtime Schedule & Professor Database Screenshot from Repo */}
        <div
          style={{
            flex: 1,
            height: '206px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(239, 191, 4, 0.35)',
            backgroundColor: '#121212',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 14px 28px rgba(0, 0, 0, 0.45)',
          }}
        >
          <div
            style={{
              padding: '5px 8px',
              backgroundColor: 'rgba(85, 0, 0, 0.85)',
              borderBottom: '1px solid rgba(239, 191, 4, 0.25)',
              fontSize: '6.5px',
              fontWeight: '800',
              color: '#EFBF04',
              letterSpacing: '0.08em',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>SUPABASE · SCHEDULES &amp; GEOFENCE</span>
            <span>LIVE</span>
          </div>
          <img
            src="/projects/hautogo-2.png"
            alt="HAUtogo Supabase Database"
            style={{
              width: '100%',
              flex: 1,
              objectFit: 'cover',
              objectPosition: 'left top',
            }}
          />
          <img
            src="/projects/hautogo-1.png"
            alt="HAUtogo Supabase Project"
            style={{
              width: '100%',
              height: '68px',
              objectFit: 'cover',
              objectPosition: 'left center',
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '470px',
        padding: '12px',
      }}
    >
      {/* Floating Callout Pill on Tablet Corner */}
      <div
        style={{
          position: 'absolute',
          top: '-4px',
          right: '0px',
          zIndex: 10,
          backgroundColor: 'rgba(244, 244, 243, 0.88)',
          backdropFilter: 'blur(14px)',
          border: `1px solid ${BORDER_SUBTLE}`,
          borderRadius: '8px',
          padding: '8px 14px',
          boxShadow: '0 10px 24px rgba(22, 38, 59, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: NAVY_PRIMARY }} />
        <span style={{ fontSize: '10.5px', fontWeight: '700', color: TEXT_PRIMARY }}>
          {project.category.split('·')[0].trim()}
        </span>
      </div>

      {/* Outer Anodized Slate-Charcoal Tablet Bezel */}
      <div
        style={{
          position: 'relative',
          borderRadius: '22px',
          padding: '12px',
          background: 'linear-gradient(145deg, #2a2c2b 0%, #141515 100%)',
          border: '1px solid rgba(20, 21, 21, 0.85)',
          boxShadow: '0 28px 60px rgba(20, 21, 21, 0.18)',
        }}
      >
        {/* Screen Viewport */}
        <div
          style={{
            width: '100%',
            aspectRatio: '16 / 10.4',
            borderRadius: '13px',
            overflow: 'hidden',
            position: 'relative',
            background: `linear-gradient(145deg, ${project.bgFrom} 0%, ${project.bgTo} 100%)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Tablet Status Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 14px',
              backgroundColor: 'rgba(10, 11, 11, 0.72)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '9.5px',
              color: '#d8dcdb',
              fontFamily: 'monospace',
              flexShrink: 0,
            }}
          >
            <span>ARCHIVE // {project.number}</span>
            <span>{project.title.toUpperCase()} — HOMEPAGE PREVIEW</span>
            <span>LIVE</span>
          </div>

          {renderHomepagePreview()}
        </div>
      </div>
    </div>
  );
}

// ── ASCENDING SCROLL-REVEAL PROJECT DIV (Formal Light-Grey Architectural Card) ──
function AscendingProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [revealState, setRevealState] = useState({ visible: false, direction: 'below' });

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealState({ visible: true, direction: 'in' });
        } else {
          const isAbove = entry.boundingClientRect.top < 0;
          setRevealState({ visible: false, direction: isAbove ? 'above' : 'below' });
        }
      },
      {
        threshold: 0.16,
        rootMargin: '-35px 0px -35px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;
  const { visible, direction } = revealState;

  const translateY = visible ? '0px' : direction === 'below' ? '90px' : '-65px';
  const scale = visible ? 1 : 0.95;
  const opacity = visible ? 1 : 0;
  const blur = visible ? 'blur(0px)' : 'blur(6px)';

  return (
    <div
      ref={cardRef}
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}, 0) scale(${scale})`,
        filter: blur,
        transition:
          'opacity 0.78s cubic-bezier(0.16, 1, 0.3, 1), transform 0.78s cubic-bezier(0.16, 1, 0.3, 1), filter 0.78s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity, filter',
        backgroundColor: BG_SURFACE,
        border: `1px solid ${BORDER_SUBTLE}`,
        borderRadius: '24px',
        padding: 'clamp(28px, 4vw, 48px)',
        boxShadow: '0 20px 50px rgba(20, 21, 21, 0.05)',
        display: 'flex',
        flexDirection: isEven ? 'row' : 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '48px',
        flexWrap: 'wrap',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Giant Watermark Number in Background Corner (Matching Reference DC Watermark Style) */}
      <div
        style={{
          position: 'absolute',
          top: '-18px',
          right: isEven ? '24px' : 'auto',
          left: isEven ? 'auto' : '24px',
          fontFamily: DISPLAY_FONT,
          fontSize: '120px',
          fontWeight: '800',
          color: 'rgba(20, 21, 21, 0.035)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {project.number}
      </div>

      {/* 1. TABLET GADGET */}
      <div
        style={{
          flex: '1 1 430px',
          display: 'flex',
          justifyContent: 'center',
          transform: visible ? 'translateY(0)' : 'translateY(36px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.08s, opacity 0.85s ease 0.08s',
        }}
      >
        <TabletGadget project={project} />
      </div>

      {/* 2. FORMAL PROJECT SPECIFICATION */}
      <div
        style={{
          flex: '1 1 380px',
          minWidth: '280px',
          position: 'relative',
          zIndex: 2,
          transform: visible ? 'translateY(0)' : 'translateY(48px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.88s cubic-bezier(0.16, 1, 0.3, 1) 0.16s, opacity 0.88s ease 0.16s',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '10.5px',
            fontWeight: '700',
            letterSpacing: '0.14em',
            color: TEXT_SECONDARY,
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: NAVY_PRIMARY }} />
          <span>{project.category}</span>
        </div>

        <h3
          style={{
            fontFamily: DISPLAY_FONT,
            fontSize: 'clamp(28px, 3.4vw, 40px)',
            fontWeight: '800',
            letterSpacing: '-0.03em',
            color: TEXT_PRIMARY,
            margin: '0 0 4px',
            lineHeight: 1.08,
          }}
        >
          {project.title}
        </h3>

        <div style={{ fontSize: '13.5px', fontWeight: '600', color: TEXT_MUTED, marginBottom: '18px' }}>
          {project.subtitle}
        </div>

        {/* Small Dot Separator (Matching Reference Image) */}
        <div
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: NAVY_PRIMARY,
            marginBottom: '16px',
          }}
        />

        <div style={{ fontSize: '12px', fontWeight: '800', color: TEXT_PRIMARY, marginBottom: '6px' }}>
          Architecture &amp; Scope
        </div>

        <p
          style={{
            fontSize: '13.5px',
            color: TEXT_SECONDARY,
            lineHeight: 1.72,
            margin: '0 0 22px',
          }}
        >
          {project.desc}
        </p>

        {/* Tech Stack Badges with Custom Icons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '26px' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11.5px',
                fontWeight: '600',
                padding: '6px 12px',
                borderRadius: '8px',
                backgroundColor: BG_MAIN,
                border: `1px solid ${BORDER_SUBTLE}`,
                color: TEXT_PRIMARY,
              }}
            >
              <TechSvgIcon name={tag} size={13} color={NAVY_PRIMARY} />
              <span>{tag}</span>
            </span>
          ))}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 26px',
            borderRadius: '100px',
            background: `linear-gradient(135deg, ${NAVY_ACCENT} 0%, ${NAVY_PRIMARY} 100%)`,
            color: '#f4f6f8',
            fontWeight: '700',
            fontSize: '12px',
            letterSpacing: '0.04em',
            textDecoration: 'none',
            boxShadow: '0 10px 24px rgba(22, 38, 59, 0.22)',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>View Project</span>
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}

// ── SILKY SMOOTH PARALLAX & ASCENDING REVEAL BLOCK (Used in Resume & Contact Sections) ──
function SmoothParallaxBlock({
  children,
  speed = 0.04,        // Parallax depth multiplier (positive = floats slower/deeper, negative = floats faster/higher)
  revealDelay = 0,     // Delay ONLY for initial entrance reveal (ms)
  delayMs = 0,         // Alias for revealDelay
  offset = 36,         // Initial glide distance on reveal (px)
  style = {},
}) {
  const containerRef = useRef(null);
  const parallaxRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const targetYRef = useRef(0);
  const currentYRef = useRef(0);
  const rafIdRef = useRef(null);

  const delay = revealDelay || delayMs || 0;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // 1. Smooth entrance reveal observer:
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (entry.boundingClientRect.top > (window.innerHeight || 800)) {
          // Only reset when scrolled well below the viewport so it never flickers while reading
          setIsVisible(false);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '60px 0px 60px 0px',
      }
    );
    observer.observe(el);

    // 2. High-performance lerped parallax RAF loop (60/120fps, zero state re-renders)
    let isRunning = false;

    const tick = () => {
      const diff = targetYRef.current - currentYRef.current;
      if (Math.abs(diff) > 0.06) {
        currentYRef.current += diff * 0.12; // Buttery smooth exponential damping
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = `translate3d(0, ${currentYRef.current.toFixed(2)}px, 0)`;
        }
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        currentYRef.current = targetYRef.current;
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = `translate3d(0, ${currentYRef.current.toFixed(2)}px, 0)`;
        }
        isRunning = false;
      }
    };

    const updateTarget = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Calculate distance from screen center
      const centerDelta = (rect.top + rect.height * 0.5) - vh * 0.5;
      targetYRef.current = Math.max(-40, Math.min(40, centerDelta * speed));

      if (!isRunning) {
        isRunning = true;
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    updateTarget();
    window.addEventListener('scroll', updateTarget, { capture: true, passive: true });
    window.addEventListener('resize', updateTarget, { passive: true });

    return () => {
      observer.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('scroll', updateTarget, { capture: true });
      window.removeEventListener('resize', updateTarget);
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : `translate3d(0, ${offset}px, 0)`,
        filter: isVisible ? 'blur(0px)' : 'blur(5px)',
        transition: `opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform, filter',
        ...style,
      }}
    >
      <div
        ref={parallaxRef}
        style={{
          width: '100%',
          height: '100%',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}

const ParallaxSectionBlock = SmoothParallaxBlock;

// ── PARALLAX RATCHET TECH STACK BOOKSHELF (Stacks on scroll down; stays stacked on scroll up) ──
function ParallaxBookshelf({ techStackItems }) {
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const maxProgressRef = useRef(0);
  const [isPinned, setIsPinned] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    let rafId = null;

    const computeProgress = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      const pinTop = 64;
      const totalLockedDistance = Math.max(1, rect.height - (vh - pinTop));
      const scrolledWhilePinned = pinTop - rect.top;

      const currentlyPinned = scrolledWhilePinned >= -8 && scrolledWhilePinned <= totalLockedDistance + 8;
      setIsPinned(currentlyPinned);

      const raw = Math.max(0, Math.min(1, scrolledWhilePinned / totalLockedDistance));

      // Parallax ratchet: stacks books when scrolling down, and stays as is when scrolling up!
      if (raw > maxProgressRef.current) {
        maxProgressRef.current = raw;
        setScrollProgress(raw);
      }
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(computeProgress);
    };

    computeProgress();
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Ordered strictly according to visual size from Bottom (idx 0 = Widest) to Top (idx 15 = Smallest)
  // Color palette cycles through Navy Blue, Dark Grey, Grey, and Light Grey
  const orderedBooks = [
    { label: 'React Native', category: 'Mobile', palette: 'navy' },       // 01 Widest at Bottom
    { label: 'Git / GitHub', category: 'Workflow', palette: 'darkGrey' }, // 02
    { label: 'Custom CSS3', category: 'Design & UI', palette: 'lightGrey' }, // 03
    { label: 'PostgreSQL', category: 'Database', palette: 'grey' },       // 04
    { label: 'Blender 3D', category: '3D Visuals', palette: 'navy' },     // 05
    { label: 'TypeScript', category: 'Language', palette: 'darkGrey' },   // 06
    { label: 'JavaScript', category: 'Language', palette: 'lightGrey' },  // 07
    { label: 'Design Systems', category: 'Design & UI', palette: 'navy' }, // 08
    { label: 'Supabase', category: 'Backend', palette: 'grey' },          // 09
    { label: 'Flutter', category: 'Mobile', palette: 'lightGrey' },       // 10
    { label: 'HTML5', category: 'Language', palette: 'navy' },            // 11
    { label: 'React', category: 'Framework', palette: 'darkGrey' },       // 12
    { label: 'Figma', category: 'Design & UI', palette: 'grey' },         // 13
    { label: 'Expo', category: 'Mobile', palette: 'lightGrey' },          // 14
    { label: 'Dart', category: 'Language', palette: 'navy' },             // 15
    { label: 'Vite', category: 'Tooling', palette: 'darkGrey' },          // 16 Smallest at Top
  ];

  const bookPalettes = {
    navy: {
      bg: 'linear-gradient(180deg, #213752 0%, #16263b 55%, #0f1b2b 100%)',
      text: '#f4f6f8',
      border: '1.5px solid #0d1724',
      borderTop: '1px solid rgba(180, 208, 240, 0.28)',
      seam: 'rgba(180, 208, 240, 0.22)',
      iconBg: 'rgba(255, 255, 255, 0.12)',
      showPages: false,
    },
    darkGrey: {
      bg: 'linear-gradient(180deg, #363a3e 0%, #26292c 55%, #1c1e21 100%)',
      text: '#f4f4f3',
      border: '1.5px solid #16181a',
      borderTop: '1px solid rgba(255, 255, 255, 0.22)',
      seam: 'rgba(255, 255, 255, 0.18)',
      iconBg: 'rgba(255, 255, 255, 0.1)',
      showPages: false,
    },
    grey: {
      bg: 'linear-gradient(180deg, #747b82 0%, #61676e 55%, #51575d 100%)',
      text: '#f6f7f8',
      border: '1.5px solid #3f444a',
      borderTop: '1px solid rgba(255, 255, 255, 0.32)',
      seam: 'rgba(255, 255, 255, 0.24)',
      iconBg: 'rgba(255, 255, 255, 0.14)',
      showPages: false,
    },
    lightGrey: {
      bg: 'linear-gradient(180deg, #e6e8ea 0%, #d6d9dc 55%, #c5c9cd 100%)',
      text: '#16202a',
      border: '1.5px solid rgba(22, 32, 42, 0.36)',
      borderTop: '1px solid rgba(255, 255, 255, 0.88)',
      seam: 'rgba(22, 32, 42, 0.18)',
      iconBg: 'rgba(22, 32, 42, 0.08)',
      showPages: true,
    },
  };

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI'];

  const capabilityCards = [
    {
      icon: Globe,
      title: 'Front-End Developer',
      desc: 'Turning Figma concepts into responsive, pixel-accurate React & Vite web interfaces with custom CSS3.',
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform Mobile',
      desc: 'Building production Android & iOS apps using React Native, Expo, and Flutter with offline sync & geolocation.',
    },
    {
      icon: Palette,
      title: '3D Visuals & UI/UX',
      desc: 'Modeling interactive 3D rooms in Blender and crafting cohesive design systems with tactile micro-interactions.',
    },
    {
      icon: MessageSquare,
      title: 'Communication & Collaboration',
      desc: 'Articulating technical concepts clearly, actively listening, and collaborating smoothly with team members and clients.',
    },
  ];

  const personalStrengths = [
    {
      num: '01',
      title: 'Creative Thinking',
      icon: Lightbulb,
      desc: 'Enjoying coming up with original concepts and exploring different ways to present ideas, especially in design and development.',
    },
    {
      num: '02',
      title: 'Attention to Detail',
      icon: Eye,
      desc: 'Paying attention to visual elements, layouts, colors, interactions, and small improvements that can make a project better.',
    },
    {
      num: '03',
      title: 'Willingness to Learn',
      icon: BookOpen,
      desc: 'Interested in exploring different technologies and learning tools like Blender, React, and 3D web development.',
    },
    {
      num: '04',
      title: 'Problem-Solving',
      icon: Sparkles,
      desc: 'Exploring solutions when something does not work as expected and looking for ways to improve projects.',
    },
    {
      num: '05',
      title: 'Adaptability',
      icon: Shuffle,
      desc: 'Willing to explore unfamiliar software, approaches, and technologies instead of limiting myself to one area.',
    },
    {
      num: '06',
      title: 'Initiative & Self-Motivation',
      icon: Rocket,
      desc: 'Coming up with original project ideas and taking proactive steps to turn them into actual finished outputs.',
    },
    {
      num: '07',
      title: 'Interpersonal Communication',
      icon: Users,
      desc: 'Naturally comfortable communicating with people, listening attentively, and collaborating positively to align on shared goals.',
    },
  ];

  const totalBooks = orderedBooks.length;
  // Progressively maps 0..0.88 of the scroll track to all 16 books
  const bookPhaseProgress = Math.max(0, Math.min(1, scrollProgress / 0.88));
  const floatBookIndex = bookPhaseProgress * totalBooks;
  const stackedCount = Math.min(totalBooks, Math.floor(floatBookIndex + 0.06));
  const activeBook =
    hoveredIdx !== null
      ? orderedBooks[hoveredIdx]
      : orderedBooks[Math.min(totalBooks - 1, Math.max(0, stackedCount > 0 ? stackedCount - 1 : 0))];

  return (
    <div
      ref={trackRef}
      style={{
        position: 'relative',
        height: 'clamp(180vh, 210vh, 240vh)',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: '64px',
          paddingTop: '8px',
          paddingBottom: '24px',
          width: '100%',
        }}
      >
        {/* ── TWO-COLUMN FULL-BLEED LEFT STACK + RIGHT EDITORIAL CONTENT ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(28px, 4vw, 56px)',
            alignItems: 'end',
          }}
        >
          {/* ── LEFT SIDE: BOOKS ORDERED BY SIZE & COLORED IN NAVY BLUE, DARK GREY, GREY, LIGHT GREY ── */}
          <div
            style={{
              marginLeft: 'calc(-1 * clamp(0px, 3.5vw, 64px))',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              minHeight: '568px',
              paddingBottom: '4px',
              userSelect: 'none',
              maxWidth: '100%',
              overflow: 'hidden',
            }}
          >
            {/* Architectural Navy-Charcoal Plinth / Base Support at the Bottom */}
            <div style={{ width: '535px', maxWidth: '92vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '100%',
                  height: '12px',
                  borderRadius: '0 6px 6px 0',
                  background: 'linear-gradient(180deg, #1b2c42 0%, #0f1b2b 100%)',
                  boxShadow: '0 14px 30px rgba(15, 27, 43, 0.26)',
                }}
              />
            </div>

            {/* 16 Level Books Graduated by Size from Bottom (idx 0 = Widest) to Top (idx 15 = Smallest) */}
            {orderedBooks.map((book, idx) => {
              const isHovered = hoveredIdx === idx;
              const itemProgress = Math.max(0, Math.min(1, floatBookIndex - idx));
              const isRevealed = itemProgress > 0.04;
              const isLanding = itemProgress > 0.04 && itemProgress < 0.96;

              const bookHeight = 34;
              const pal = bookPalettes[book.palette] || bookPalettes.navy;

              // Parallax motion: drops down and slides in on scroll down; stays stacked on scroll up
              const dropY = (1 - itemProgress) * -28;
              const slideX = isHovered ? 14 : (1 - itemProgress) * -80;
              const opacity = isRevealed ? 1 : 0;

              // Strictly decreasing minimum width + right padding by index so every book is ordered according to size!
              const minBookWidth = 515 - idx * 17;
              const extraRightPad = Math.max(8, (15 - idx) * 6);

              return (
                <div
                  key={book.label}
                  title={`${book.label} — ${book.category}`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onClick={() => setHoveredIdx(idx)}
                  style={{
                    width: 'fit-content',
                    minWidth: `min(${minBookWidth}px, 90vw)`,
                    maxWidth: '92vw',
                    height: `${bookHeight}px`,
                    background: pal.bg,
                    color: pal.text,
                    border: pal.border,
                    borderLeft: 'none',
                    borderTop: pal.borderTop,
                    borderRadius: '0 8px 8px 0',
                    position: 'relative',
                    zIndex: isHovered ? 30 : idx + 2,
                    cursor: isRevealed ? 'pointer' : 'default',
                    pointerEvents: isRevealed ? 'auto' : 'none',
                    opacity: opacity,
                    transform: isHovered
                      ? 'translate3d(14px, 0px, 0)'
                      : `translate3d(${slideX}px, ${dropY}px, 0)`,
                    transition: isHovered
                      ? 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s ease'
                      : 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.18s ease-out, box-shadow 0.2s ease',
                    boxShadow:
                      isHovered || isLanding
                        ? '12px 14px 30px rgba(15, 27, 43, 0.32)'
                        : '4px 6px 14px rgba(15, 27, 43, 0.14)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                    padding: `0 16px 0 clamp(28px, 4vw, 48px)`,
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {/* Left Book Spine Ribbing Seam */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: 0,
                      bottom: 0,
                      width: '3px',
                      backgroundColor: pal.seam,
                    }}
                  />

                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
                    {/* Roman Numeral Volume */}
                    <span
                      style={{
                        fontFamily: SERIF_FONT,
                        fontSize: '10px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        opacity: 0.72,
                        minWidth: '24px',
                      }}
                    >
                      {romanNumerals[idx % romanNumerals.length]}
                    </span>

                    {/* Tech Stack Icon */}
                    <div
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '5px',
                        backgroundColor: pal.iconBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <TechSvgIcon name={book.label} size={13} color={pal.text} />
                    </div>

                    {/* Book Name */}
                    <span
                      style={{
                        fontFamily: DISPLAY_FONT,
                        fontSize: 'clamp(15.5px, 1.7vw, 20px)',
                        fontWeight: '800',
                        letterSpacing: '0.13em',
                        textTransform: 'uppercase',
                        paddingRight: `${extraRightPad}px`,
                      }}
                    >
                      {book.label}
                    </span>
                  </div>

                  {/* Right Book End: Cream Multi-Page Paper Block on Light Grey Books or Spine Band */}
                  {pal.showPages ? (
                    <div
                      style={{
                        width: '22px',
                        height: `${bookHeight - 8}px`,
                        borderRadius: '2px',
                        background:
                          'repeating-linear-gradient(180deg, #f6f5f1 0px, #f6f5f1 2px, #dcdad2 2px, #dcdad2 4px)',
                        border: '1px solid rgba(22, 32, 42, 0.32)',
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '4px',
                        height: `${bookHeight - 12}px`,
                        borderRadius: '2px',
                        backgroundColor: pal.seam,
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── RIGHT SIDE: SECTION HEADER + ACTIVE MONOGRAPH DOSSIER + 4 CORE CAPABILITY CARDS ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingBottom: '12px' }}>
            {/* Formal Section Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                borderBottom: `1px solid ${BORDER_SUBTLE}`,
                paddingBottom: '14px',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '0.18em',
                    color: TEXT_MUTED,
                    textTransform: 'uppercase',
                  }}
                >
                  01.1 / TECHNICAL TOOLKIT
                </div>
                <h2
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontSize: 'clamp(30px, 3.8vw, 44px)',
                    fontWeight: '800',
                    letterSpacing: '-0.03em',
                    margin: '4px 0 0',
                    color: TEXT_PRIMARY,
                  }}
                >
                  Tech Stack
                </h2>
              </div>

              {/* Scroll Status Callout Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: BG_SURFACE,
                  border: `1px solid ${BORDER_STRONG}`,
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  color: TEXT_PRIMARY,
                  boxShadow: '0 8px 24px rgba(20, 21, 21, 0.06)',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: stackedCount === totalBooks ? '#10b981' : NAVY_PRIMARY,
                    boxShadow: stackedCount === totalBooks ? '0 0 10px rgba(16, 185, 129, 0.6)' : `0 0 8px ${NAVY_PRIMARY}66`,
                  }}
                />
                <span style={{ fontWeight: '800', fontFamily: 'monospace' }}>
                  {String(stackedCount).padStart(2, '0')} / {String(totalBooks).padStart(2, '0')} BOOKS
                </span>
                <span style={{ color: TEXT_MUTED }}>·</span>
                <span style={{ fontWeight: '600', color: TEXT_SECONDARY }}>
                  {stackedCount === 0
                    ? '16 Technical Volumes'
                    : stackedCount < totalBooks
                      ? `Active: ${activeBook?.label}`
                      : 'All 16 Volumes Stacked'}
                </span>
              </div>
            </div>

            {/* Active Book Dossier Card (Navy Blue Accent Card) */}
            <div
              style={{
                background: 'linear-gradient(135deg, #1e324c 0%, #142235 60%, #0f1a28 100%)',
                color: '#f4f6f8',
                borderRadius: '20px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                boxShadow: '0 16px 36px rgba(15, 26, 40, 0.18)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <TechSvgIcon name={activeBook?.label || 'React Native'} size={22} color="#f4f4f3" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '9.5px',
                      fontWeight: '700',
                      letterSpacing: '0.16em',
                      color: '#a8acab',
                      textTransform: 'uppercase',
                      marginBottom: '2px',
                    }}
                  >
                    ACTIVE VOLUME // {activeBook?.category || 'Mobile'}
                  </div>
                  <div
                    style={{
                      fontFamily: DISPLAY_FONT,
                      fontSize: '19px',
                      fontWeight: '800',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {activeBook?.label || 'React Native'}
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '6px 12px',
                  borderRadius: '100px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  fontSize: '10.5px',
                  fontWeight: '700',
                  fontFamily: 'monospace',
                  flexShrink: 0,
                }}
              >
                {stackedCount === totalBooks ? '100% READY' : `${Math.round(bookPhaseProgress * 100)}%`}
              </div>
            </div>

            {/* 4 Core Capability Cards (2x2 Grid) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: '14px',
              }}
            >
              {capabilityCards.map((card, i) => {
                const Icon = card.icon;
                const cardStart = 0.4 + i * 0.1;
                const cardProg = Math.max(0, Math.min(1, (scrollProgress - cardStart) / 0.14));
                return (
                  <div
                    key={i}
                    style={{
                      backgroundColor: BG_SURFACE,
                      border: `1px solid ${BORDER_SUBTLE}`,
                      borderRadius: '18px',
                      padding: '20px 22px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      boxShadow: '0 12px 30px rgba(20, 21, 21, 0.04)',
                      opacity: Math.max(0.65, cardProg),
                      transform: `translate3d(0, ${(1 - cardProg) * 14}px, 0)`,
                      transition: 'transform 0.22s ease-out, opacity 0.22s ease-out, box-shadow 0.22s ease-out',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '9px',
                          backgroundColor: BG_MAIN,
                          border: `1px solid ${BORDER_SUBTLE}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon size={16} color={TEXT_PRIMARY} />
                      </div>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: NAVY_PRIMARY }} />
                    </div>
                    <div style={{ fontSize: '14.5px', fontWeight: '800', color: TEXT_PRIMARY }}>{card.title}</div>
                    <div style={{ fontSize: '12px', color: TEXT_SECONDARY, lineHeight: 1.55 }}>{card.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FULL-WIDTH CURVED PANORAMIC CONVEYOR-BELT CERTIFICATES (Exact Match to Reference Picture + Hover Expand) ──
function EditorialCertCollage({ certifications }) {
  const [selectedCert, setSelectedCert] = useState(null);
  const [hoveredKey, setHoveredKey] = useState(null);

  const beltRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(1.05);

  // Duplicate list so the full-width conveyor belt loops seamlessly without ever running out of panels
  const loopItems = [...certifications, ...certifications];

  useEffect(() => {
    let rafId = null;
    // 10 panels * (430px base width + 12px gap) = 4420px per full cycle
    const singleSetWidth = certifications.length * 442;

    const animateBelt = () => {
      const targetSpeed = hoveredKey !== null ? 0 : 1.05;
      // Smooth follow-the-leader inertia
      velocityRef.current += (targetSpeed - velocityRef.current) * 0.08;
      offsetRef.current += velocityRef.current;

      if (offsetRef.current >= singleSetWidth) {
        offsetRef.current -= singleSetWidth;
      } else if (offsetRef.current < 0) {
        offsetRef.current += singleSetWidth;
      }

      if (beltRef.current) {
        beltRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(animateBelt);
    };

    rafId = requestAnimationFrame(animateBelt);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [hoveredKey, certifications.length]);

  // Rich gallery panel themes (Navy Blue, Dark Grey, Slate Grey, Deep Navy-Charcoal)
  const panelThemes = [
    {
      bg: 'radial-gradient(circle at 75% 25%, #2b486b 0%, #16263b 52%, #0c1522 100%)',
      text: '#f4f6f8',
      sub: '#adc2d9',
      pillBg: 'rgba(255, 255, 255, 0.12)',
      border: 'rgba(180, 210, 245, 0.24)',
      accent: '#7eb3ef',
    },
    {
      bg: 'radial-gradient(circle at 25% 30%, #3d4247 0%, #222528 55%, #121416 100%)',
      text: '#f4f4f3',
      sub: '#b5bac0',
      pillBg: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.18)',
      accent: '#e2e6ea',
    },
    {
      bg: 'radial-gradient(circle at 70% 30%, #586370 0%, #39414a 55%, #23282e 100%)',
      text: '#f6f7f8',
      sub: '#d0d6dc',
      pillBg: 'rgba(255, 255, 255, 0.13)',
      border: 'rgba(255, 255, 255, 0.22)',
      accent: '#a9c6e8',
    },
    {
      bg: 'radial-gradient(circle at 30% 25%, #243b56 0%, #132030 58%, #0a111a 100%)',
      text: '#f4f6f8',
      sub: '#9eb6d0',
      pillBg: 'rgba(255, 255, 255, 0.11)',
      border: 'rgba(180, 210, 245, 0.22)',
      accent: '#8ec0f8',
    },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        paddingTop: '36px',
        paddingBottom: '12px',
        overflow: 'hidden',
        backgroundImage:
          'linear-gradient(to right, rgba(22, 38, 59, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(22, 38, 59, 0.04) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
      }}
    >
      {/* ── TOP CENTERED EDITORIAL HEADER (Exact Match to Reference Picture) ── */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: '880px',
          margin: '0 auto 26px',
          padding: '0 24px',
          position: 'relative',
          zIndex: 30,
        }}
      >
        <h3
          style={{
            fontFamily: SANS_FONT,
            fontSize: 'clamp(28px, 3.8vw, 44px)',
            fontWeight: '700',
            letterSpacing: '-0.03em',
            lineHeight: 1.22,
            color: TEXT_PRIMARY,
            margin: '0 0 16px',
          }}
        >
          The Art{' '}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              verticalAlign: 'middle',
              width: '32px',
              height: '44px',
              borderRadius: '10px',
              background: `linear-gradient(180deg, ${NAVY_ACCENT} 0%, ${NAVY_PRIMARY} 100%)`,
              color: '#f4f6f8',
              margin: '0 4px',
              boxShadow: '0 8px 18px rgba(22, 38, 59, 0.22)',
            }}
          >
            <Award size={18} />
          </span>{' '}
          of Verified Mastery, Uncover
          <br />
          The{' '}
          <span
            style={{
              fontFamily: SERIF_FONT,
              fontStyle: 'italic',
              fontWeight: '500',
              color: NAVY_PRIMARY,
              padding: '0 4px',
            }}
          >
            Stories
          </span>{' '}
          Behind the Licenses{' '}
          {/* Wide Inline Pill Badge (Matching the Grey Sculptural Pill Next to "Behind the Art" in Reference Picture) */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              verticalAlign: 'middle',
              height: '38px',
              padding: '0 22px',
              borderRadius: '100px',
              background: 'linear-gradient(90deg, #cfd5dc 0%, #e4e7eb 50%, #c8cfd6 100%)',
              border: `1px solid ${BORDER_STRONG}`,
              boxShadow: 'inset 0 2px 6px rgba(22, 38, 59, 0.1)',
              fontSize: '11px',
              fontFamily: SANS_FONT,
              fontWeight: '800',
              letterSpacing: '0.12em',
              color: NAVY_PRIMARY,
              marginLeft: '10px',
            }}
          >
            10 CREDENTIALS
          </span>
        </h3>

        <p
          style={{
            fontSize: '12.5px',
            color: TEXT_SECONDARY,
            lineHeight: 1.65,
            maxWidth: '460px',
            margin: '0 auto 24px',
          }}
        >
          Discover verified certifications across Cloud, AI, Networking, Cybersecurity &amp; Front-End Web.
          Hover any moving panel on the conveyor belt to expand it.
        </p>

        {/* Centered Dark Navy Pill Button (Exact Match to Centered "Explore" Pill in Reference Picture) */}
        <a
          href="https://www.credly.com/users/ghayzelle-dizon.c089c1d2/badges/credly"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 34px',
            background: `linear-gradient(180deg, ${NAVY_ACCENT} 0%, ${NAVY_PRIMARY} 100%)`,
            color: '#f4f6f8',
            fontSize: '12.5px',
            fontWeight: '600',
            letterSpacing: '0.02em',
            textDecoration: 'none',
            borderRadius: '100px',
            boxShadow: '0 14px 28px rgba(22, 38, 59, 0.28)',
          }}
        >
          <span>Explore Credentials</span>
        </a>
      </div>

      {/* ── FULL-WIDTH (100VW) CURVED PANORAMIC CONVEYOR BELT (Exact Match to Reference Picture Bottom Strip) ── */}
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '490px',
          overflow: 'hidden',
        }}
      >
        {/* Top Sweeping Concave Curve Mask (Slices Across Full 100vw Width Like Reference Picture) */}
        <div
          style={{
            position: 'absolute',
            top: '-68px',
            left: '-8vw',
            width: '116vw',
            height: '124px',
            borderRadius: '50%',
            backgroundColor: BG_MAIN,
            zIndex: 20,
            pointerEvents: 'none',
          }}
        />

        {/* Bottom Sweeping Concave Curve Mask (Slices Across Full 100vw Width Like Reference Picture) */}
        <div
          style={{
            position: 'absolute',
            bottom: '-68px',
            left: '-8vw',
            width: '116vw',
            height: '124px',
            borderRadius: '50%',
            backgroundColor: BG_MAIN,
            zIndex: 20,
            pointerEvents: 'none',
          }}
        />

        {/* ── CONTINUOUS CONVEYOR-BELT TRACK ("Follow-the-Leader" Full-Bleed Panels) ── */}
        <div
          ref={beltRef}
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '12px',
            width: 'max-content',
            height: '100%',
            willChange: 'transform',
          }}
        >
          {loopItems.map((cert, i) => {
            const uniqueKey = `${cert.id}-${i}`;
            const origIdx = i % certifications.length;
            const theme = panelThemes[origIdx % panelThemes.length];
            const isExpanded = hoveredKey === uniqueKey;

            return (
              <div
                key={uniqueKey}
                onMouseEnter={() => setHoveredKey(uniqueKey)}
                onMouseLeave={() => setHoveredKey(null)}
                onClick={() => setSelectedCert(cert)}
                style={{
                  // Large 3-across gallery panels like the picture (430px), expanding wide to 720px when hovered!
                  width: isExpanded ? '720px' : '430px',
                  height: '100%',
                  flexShrink: 0,
                  background: theme.bg,
                  color: theme.text,
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'width 0.52s cubic-bezier(0.22, 1, 0.36, 1), filter 0.35s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: isExpanded ? '68px 48px' : '68px 32px',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                }}
              >
                {/* Architectural concentric rings & grid lines in panel backdrop */}
                <svg
                  width="420"
                  height="420"
                  viewBox="0 0 420 420"
                  fill="none"
                  style={{
                    position: 'absolute',
                    right: isExpanded ? '-40px' : '-90px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    opacity: isExpanded ? 0.18 : 0.1,
                    transition: 'all 0.5s ease',
                    pointerEvents: 'none',
                  }}
                >
                  <circle cx="210" cy="210" r="190" stroke={theme.text} strokeWidth="1" />
                  <circle cx="210" cy="210" r="140" stroke={theme.text} strokeWidth="1" strokeDasharray="4 6" />
                  <circle cx="210" cy="210" r="90" stroke={theme.text} strokeWidth="1" />
                  <line x1="0" y1="210" x2="420" y2="210" stroke={theme.text} strokeWidth="0.8" />
                  <line x1="210" y1="0" x2="210" y2="420" stroke={theme.text} strokeWidth="0.8" />
                </svg>

                {/* Giant Watermark Number */}
                <div
                  style={{
                    position: 'absolute',
                    right: '24px',
                    bottom: '54px',
                    fontFamily: DISPLAY_FONT,
                    fontSize: isExpanded ? '130px' : '96px',
                    fontWeight: '800',
                    color: theme.text,
                    opacity: 0.07,
                    lineHeight: 1,
                    pointerEvents: 'none',
                    transition: 'font-size 0.45s ease',
                  }}
                >
                  {String(origIdx + 1).padStart(2, '0')}
                </div>

                {/* Main Content Inside Curved Panel */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: isExpanded ? 'row' : 'column',
                    alignItems: isExpanded ? 'center' : 'flex-start',
                    gap: isExpanded ? '32px' : '18px',
                    height: '100%',
                    justifyContent: 'center',
                  }}
                >
                  {/* Large Official Certificate Emblem */}
                  <div
                    style={{
                      width: isExpanded ? '148px' : '108px',
                      height: isExpanded ? '148px' : '108px',
                      borderRadius: '24px',
                      backgroundColor: theme.pillBg,
                      border: `1.5px solid ${theme.border}`,
                      padding: '14px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 20px 44px rgba(0, 0, 0, 0.28)',
                      transition: 'all 0.48s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    {cert.badgeImg ? (
                      <img
                        src={cert.badgeImg}
                        alt={cert.title}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    ) : (
                      <div style={{ textAlign: 'center' }}>
                        <Award size={isExpanded ? 48 : 36} />
                        <div style={{ fontSize: '10px', fontWeight: '800', marginTop: '4px', letterSpacing: '0.1em' }}>
                          300 HRS
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Certificate Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '10.5px',
                        fontWeight: '800',
                        letterSpacing: '0.16em',
                        color: theme.accent,
                        textTransform: 'uppercase',
                        marginBottom: '8px',
                      }}
                    >
                      <span
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          backgroundColor: theme.accent,
                        }}
                      />
                      <span>
                        {cert.badgeCode} · {cert.date.replace('Issued ', '')}
                      </span>
                    </div>

                    <h4
                      style={{
                        fontFamily: DISPLAY_FONT,
                        fontSize: isExpanded ? '26px' : '21px',
                        fontWeight: '800',
                        lineHeight: 1.15,
                        letterSpacing: '-0.02em',
                        margin: '0 0 6px',
                        color: theme.text,
                        transition: 'font-size 0.35s ease',
                      }}
                    >
                      {cert.title}
                    </h4>

                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: '600',
                        color: theme.sub,
                        marginBottom: '14px',
                      }}
                    >
                      {cert.issuer}
                    </div>

                    {/* Expanded Description & Full Skill Tags on Hover */}
                    {isExpanded && (
                      <p
                        style={{
                          fontSize: '13px',
                          color: theme.sub,
                          lineHeight: 1.62,
                          margin: '0 0 16px',
                          maxWidth: '440px',
                        }}
                      >
                        {cert.desc}
                      </p>
                    )}

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                      {(isExpanded ? cert.skills : cert.skills.slice(0, 3)).map((skill) => (
                        <span
                          key={skill}
                          style={{
                            fontSize: '10.5px',
                            fontWeight: '700',
                            padding: '4px 10px',
                            borderRadius: '100px',
                            backgroundColor: theme.pillBg,
                            border: `1px solid ${theme.border}`,
                            color: theme.text,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 18px',
                          borderRadius: '100px',
                          backgroundColor: '#f4f6f8',
                          color: NAVY_PRIMARY,
                          fontSize: '11.5px',
                          fontWeight: '800',
                          textDecoration: 'none',
                        }}
                      >
                        <span>Verify Credential</span>
                        <ArrowUpRight size={13} />
                      </a>

                      {isExpanded && (
                        <span style={{ fontSize: '11px', fontWeight: '700', color: theme.sub }}>
                          Click panel to open full license preview
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal when clicking any Certificate in the Conveyor Trail */}
      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            backgroundColor: 'rgba(15, 27, 43, 0.6)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '460px',
              width: '100%',
              backgroundColor: BG_SURFACE,
              color: TEXT_PRIMARY,
              border: `1px solid ${BORDER_STRONG}`,
              borderRadius: '24px',
              padding: '32px 28px',
              textAlign: 'center',
              boxShadow: '0 30px 70px rgba(15, 27, 43, 0.32)',
            }}
          >
            <div style={{ fontSize: '10.5px', fontWeight: '700', letterSpacing: '0.18em', color: NAVY_PRIMARY, marginBottom: '14px' }}>
              {selectedCert.badgeCode} · {selectedCert.date}
            </div>
            {selectedCert.badgeImg && (
              <img
                src={selectedCert.badgeImg}
                alt={selectedCert.title}
                style={{ width: '96px', height: '96px', objectFit: 'contain', marginBottom: '14px' }}
              />
            )}
            <h4 style={{ fontFamily: DISPLAY_FONT, fontSize: '22px', fontWeight: '800', margin: '0 0 6px' }}>
              {selectedCert.title}
            </h4>
            <div style={{ fontSize: '13.5px', fontWeight: '600', color: TEXT_SECONDARY, marginBottom: '14px' }}>
              Ghayzelle Dizon · {selectedCert.issuer}
            </div>
            <p style={{ fontSize: '13px', color: TEXT_SECONDARY, lineHeight: 1.6, marginBottom: '22px' }}>
              {selectedCert.desc}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <a
                href={selectedCert.verifyUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 22px',
                  background: `linear-gradient(135deg, ${NAVY_ACCENT} 0%, ${NAVY_PRIMARY} 100%)`,
                  color: '#f4f6f8',
                  fontSize: '12px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  borderRadius: '100px',
                }}
              >
                <CheckCircle2 size={14} />
                <span>{selectedCert.verifyLabel}</span>
              </a>
              <button
                onClick={() => setSelectedCert(null)}
                style={{
                  padding: '11px 18px',
                  backgroundColor: BG_MAIN,
                  border: `1px solid ${BORDER_SUBTLE}`,
                  color: TEXT_PRIMARY,
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  borderRadius: '100px',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MonitorPortfolioWeb({ onBackTo3D = null }) {
  const [activeNav, setActiveNav] = useState('folder-landing');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'UI/UX Design',
    message: '',
  });
  const containerRef = useRef(null);

  // Validate email format and common email provider domains (@gmail.com, @yahoo.com, @outlook.com, @icloud.com, etc.)
  const validateEmailProvider = (rawEmail) => {
    const trimmed = (rawEmail || '').trim().toLowerCase();
    if (!trimmed) {
      return 'Invalid email address. Please use a valid email address.';
    }
    const basicMatch = trimmed.match(/^[^\s@]+@([^\s@]+\.[^\s@]+)$/);
    if (!basicMatch) {
      return 'Invalid email address. Please use a valid email address.';
    }
    const domain = basicMatch[1];
    const allowedDomains = [
      'gmail.com',
      'googlemail.com',
      'yahoo.com',
      'yahoo.com.ph',
      'ymail.com',
      'rocketmail.com',
      'outlook.com',
      'hotmail.com',
      'live.com',
      'msn.com',
      'icloud.com',
      'me.com',
      'mac.com',
      'proton.me',
      'protonmail.com',
      'zoho.com',
      'aol.com',
      'gmx.com',
      'mail.com',
      'hau.edu.ph',
      'student.hau.edu.ph',
    ];
    const isInstitutional = /\.(edu|edu\.ph|ac\.uk|gov|org)$/i.test(domain);
    if (!allowedDomains.includes(domain) && !isInstitutional) {
      return 'Invalid email address. Please use a valid email address.';
    }
    return '';
  };

  const sectionsList = [
    { id: 'folder-landing', num: '01', label: 'Home' },
    { id: 'about', num: '02', label: 'About' },
    { id: 'portfolio', num: '03', label: 'Portfolio' },
    { id: 'resume', num: '04', label: 'Resume' },
    { id: 'contact', num: '05', label: 'Contact' },
  ];

  // Track active section on scroll for the right-side vertical pagination indicator (01 • • • 05)
  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 800;
      for (const s of sectionsList) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= vh * 0.45 && rect.bottom >= vh * 0.35) {
            setActiveNav(s.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return () => window.removeEventListener('scroll', onScroll, { capture: true });
  }, []);

  // Projects Data
  const projects = [
    {
      id: 'cj-realestate',
      number: '01',
      logoMonogram: 'C&J',
      title: 'C&J Real Estate',
      subtitle: 'Property Showcase & Supabase Web Platform',
      desc: 'Real estate web application backed by a Supabase and PostgreSQL database for dynamic property listings, real-time data persistence, and client inquiries, paired with a custom editorial brand identity, hero architectural showcase, and property filtering in React and Vite.',
      category: 'WEB APPLICATION · SUPABASE & REACT',
      bgFrom: '#1e2f44',
      bgTo: '#0d1622',
      tags: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'JavaScript', 'Custom CSS3'],
      url: 'https://github.com/geyzz/real-estate',
      image: null,
    },
    {
      id: 'plan-ed',
      number: '02',
      logoMonogram: 'P_',
      title: 'Plan_.ed',
      subtitle: 'Smart Shopping & Errand Planner App',
      desc: 'Mobile shopping planner featuring custom light/dark themes, collapsible headers, an interactive errand calendar with native reminder alarms, real-time cost calculation across 4 major Pampanga malls, and cloud/offline sync.',
      category: 'MOBILE APP · PERSONAL PROJECT',
      bgFrom: '#282522',
      bgTo: '#12100e',
      tags: ['React Native', 'Expo', 'Supabase', 'PostgreSQL', 'AsyncStorage', 'EAS Build'],
      url: 'https://github.com/geyzz/shopping-planner',
      image: null,
    },
    {
      id: 'hautogo',
      number: '03',
      logoMonogram: 'HAU',
      title: 'HAUtogo',
      subtitle: 'Real-Time Faculty Tracking & Class Management',
      desc: 'Campus mobile application for Holy Angel University featuring an interactive campus map and sliding panel UI displaying live professor locations, role-based weekly schedules, campus geofencing, and one-tap room navigation.',
      category: 'MOBILE APP · COLLABORATIVE PROJECT',
      bgFrom: '#1f2623',
      bgTo: '#0d100f',
      tags: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'UI/UX Design'],
      url: 'https://github.com/qwertyuipaas/HAUtogo',
      image: null,
    },
  ];

  // All 10 Verified Certifications
  const certifications = [
    {
      id: 'cisco-data-analytics',
      title: 'Data Analytics Essentials',
      issuer: 'Cisco Networking Academy',
      date: 'Issued Apr 8, 2026',
      badgeCode: 'CISCO · DATA',
      badgeImg: 'https://images.credly.com/images/1fdfeaeb-e61c-4450-bdfe-a07bd4e715df/image.png',
      skills: ['Data Analysis', 'SQL', 'Data Visualization', 'Data Storytelling', 'Dashboard', 'Excel'],
      desc: 'Verified proficiency in transforming and analyzing data using statistical techniques, SQL queries, Excel, and interactive Tableau dashboards.',
      verifyUrl: 'https://www.credly.com/badges/305e1507-d9b6-455a-8178-ae7c9904c91c',
      verifyLabel: 'Verify License on Credly',
    },
    {
      id: 'cisco-ccna-itn',
      title: 'CCNA: Introduction to Networks',
      issuer: 'Cisco Networking Academy',
      date: 'Issued Apr 3, 2026',
      badgeCode: 'CISCO · CCNA',
      badgeImg: 'https://images.credly.com/images/70d71df5-f3dc-4380-9b9d-f22513a70417/CCNAITN__1_.png',
      skills: ['Network Fundamentals', 'IPv4 & IPv6', 'IP Subnetting', 'Ethernet', 'IP Connectivity'],
      desc: 'Completed up to 54 hands-on labs configuring switches, routers, IPv4/IPv6 subnetting, and Ethernet protocols for local and remote network access.',
      verifyUrl: 'https://www.credly.com/badges/b437e0f7-2694-4339-9ba1-3e3f9a1b59b5',
      verifyLabel: 'Verify License on Credly',
    },
    {
      id: 'cisco-ibm-ai',
      title: 'AI Fundamentals with IBM SkillsBuild',
      issuer: 'Cisco & IBM SkillsBuild',
      date: 'Issued Feb 27, 2026',
      badgeCode: 'CISCO × IBM',
      badgeImg: 'https://images.credly.com/images/26c21273-c0ab-485b-98a7-f1212dcb82b8/image.png',
      skills: ['Artificial Intelligence', 'Neural Networks', 'AI Ethics', 'AI Applications', 'Chatbots'],
      desc: 'Demonstrated knowledge of core AI systems including natural language processing, computer vision, deep learning architectures, and AI ethics.',
      verifyUrl: 'https://www.credly.com/badges/c58cfc01-9983-4dcd-8f02-efd99f5f5759',
      verifyLabel: 'Verify License on Credly',
    },
    {
      id: 'ibm-ai-fundamentals',
      title: 'Artificial Intelligence Fundamentals',
      issuer: 'IBM SkillsBuild',
      date: 'Issued Feb 27, 2026',
      badgeCode: 'IBM · AI',
      badgeImg: 'https://images.credly.com/images/82b908e1-fdcd-4785-9d32-97f11ccbcf08/image.png',
      skills: ['Artificial Intelligence', 'Neural Networks', 'IBM Watson Studio', 'AI Ethics'],
      desc: 'Mastery of machine learning, deep learning, neural networks, and deploying AI models using IBM Watson Studio with ethical AI principles.',
      verifyUrl: 'https://www.credly.com/badges/8ff7893b-18a6-4615-a611-97653a74214b',
      verifyLabel: 'Verify License on Credly',
    },
    {
      id: 'aws-cloud-foundations',
      title: 'AWS Academy — Cloud Foundations',
      issuer: 'Amazon Web Services',
      date: 'Issued Feb 26, 2026',
      badgeCode: 'AWS · CLOUD',
      badgeImg: 'https://images.credly.com/images/e3541a0c-dd4a-4820-8052-5001006efc85/blob',
      skills: ['AWS Architecture', 'AWS Cloud', 'AWS Core Services', 'AWS Pricing', 'AWS Security'],
      desc: 'Completed the AWS Academy Cloud Foundations training covering cloud architecture, core compute/storage services, security, and cloud economics.',
      verifyUrl: 'https://www.credly.com/badges/754ac22f-7e73-4a6c-8fa5-a4bc0a45fc97',
      verifyLabel: 'Verify License on Credly',
    },
    {
      id: 'cisco-cyber-threat',
      title: 'Cyber Threat Management',
      issuer: 'Cisco Networking Academy',
      date: 'Issued Oct 24, 2025',
      badgeCode: 'CISCO · SEC',
      badgeImg: 'https://images.credly.com/images/5d5ac32b-d239-42b8-9665-8a921dc3ab47/image.png',
      skills: ['Incident Response', 'CVSS Scoring', 'Disaster Recovery', 'Governance', 'Risk Assessment'],
      desc: 'Trained in cybersecurity governance, network vulnerability assessment, risk management planning, and post-incident forensic response.',
      verifyUrl: 'https://www.credly.com/badges/2986d054-0a70-4bea-82c2-a7b92b2319a4',
      verifyLabel: 'Verify License on Credly',
    },
    {
      id: 'cisco-endpoint-security',
      title: 'Endpoint Security',
      issuer: 'Cisco Networking Academy',
      date: 'Issued Sep 29, 2025',
      badgeCode: 'CISCO · ENDPOINT',
      badgeImg: 'https://images.credly.com/images/0ca5f542-fb5e-4a22-9b7a-c1a1ce4c3db7/EndpointSecurity.png',
      skills: ['Application Security', 'Antimalware Protection', 'Host Intrusion Prevention', 'System Defense'],
      desc: 'Broad proficiency in network security, operating system hardening, host-based intrusion prevention, and defending endpoints against cyber threats.',
      verifyUrl: 'https://www.credly.com/badges/24bdb5f0-8fb5-420e-9963-d36ecab4d6b2',
      verifyLabel: 'Verify License on Credly',
    },
    {
      id: 'fcc-relational-db',
      title: 'Relational Database (V8)',
      issuer: 'freeCodeCamp · 300 Hours',
      date: 'Verified 2025',
      badgeCode: 'FCC · SQL & BASH',
      badgeImg: null,
      skills: ['PostgreSQL', 'SQL', 'Bash Scripting', 'Linux Terminal', 'Git Version Control'],
      desc: 'Built real-world relational databases using PostgreSQL, SQL queries, Linux/Bash command-line scripts, and Git version control workflows.',
      verifyUrl: 'https://www.freecodecamp.org/certification/ghayzelle/relational-database-v8',
      verifyLabel: 'Verify on freeCodeCamp',
    },
    {
      id: 'cisco-js-essentials',
      title: 'JavaScript Essentials 1',
      issuer: 'Cisco & OpenEDG JS Institute',
      date: 'Issued Oct 19, 2024',
      badgeCode: 'CISCO · JSE1',
      badgeImg: 'https://images.credly.com/images/b93bf373-3da6-4ada-9879-a0c39d6a11f8/image.png',
      skills: ['JavaScript (ES6+)', 'Control Flow', 'Data Types', 'Debugging', 'Algorithmic Logic'],
      desc: 'Verified proficiency in core JavaScript syntax, data types, algorithmic problem analysis, functions, and interactive program development.',
      verifyUrl: 'https://www.credly.com/badges/febf2277-6034-4762-873e-594202d09651',
      verifyLabel: 'Verify License on Credly',
    },
    {
      id: 'fcc-responsive-web',
      title: 'Responsive Web Design',
      issuer: 'freeCodeCamp · 300 Hours',
      date: 'Issued Sep 2024',
      badgeCode: 'FCC · FRONT-END',
      badgeImg: null,
      skills: ['Semantic HTML5', 'CSS3', 'CSS Flexbox', 'CSS Grid', 'Web Accessibility (a11y)'],
      desc: 'Completed 300 hours of front-end developer coursework mastering semantic HTML5, modern CSS Grid & Flexbox, accessibility, and mobile-first design.',
      verifyUrl: 'https://www.freecodecamp.org/certification/ghayzelle/responsive-web-design',
      verifyLabel: 'Verify on freeCodeCamp',
    },
  ];

  // Tech Stack Volumes
  const techStackItems = [
    { label: 'React', category: 'Framework' },
    { label: 'React Native', category: 'Mobile' },
    { label: 'Flutter', category: 'Mobile' },
    { label: 'TypeScript', category: 'Language' },
    { label: 'JavaScript', category: 'Language' },
    { label: 'HTML5', category: 'Language' },
    { label: 'Custom CSS3', category: 'Design & UI' },
    { label: 'Dart', category: 'Language' },
    { label: 'Figma', category: 'Design & UI' },
    { label: 'Blender 3D', category: '3D Visuals' },
    { label: 'Supabase', category: 'Backend' },
    { label: 'PostgreSQL', category: 'Database' },
    { label: 'Vite', category: 'Tooling' },
    { label: 'Expo', category: 'Mobile' },
    { label: 'Git / GitHub', category: 'Workflow' },
    { label: 'Design Systems', category: 'UI/UX & Design' },
  ];

  // Helper to reliably find the active scrollable ancestor across any mounting mode (fixed modal or window)
  const getScrollContainer = (el) => {
    if (!el) return window;
    let curr = el.parentElement;
    while (curr && curr !== document.body && curr !== document.documentElement) {
      const style = window.getComputedStyle(curr);
      const overflowY = style.overflowY || style.overflow;
      if (overflowY === 'auto' || overflowY === 'scroll') {
        return curr;
      }
      curr = curr.parentElement;
    }
    return window;
  };

  const getScrollTop = (scroller) => {
    if (scroller === window || !scroller) {
      return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }
    return scroller.scrollTop || 0;
  };

  const setScrollTop = (scroller, top) => {
    const rounded = Math.round(top);
    if (scroller === window || !scroller) {
      window.scrollTo(0, rounded);
      if (document.documentElement) document.documentElement.scrollTop = rounded;
      if (document.body) document.body.scrollTop = rounded;
    } else {
      scroller.scrollTop = rounded;
    }
  };

  // Cinematic, unhurried smooth scroll with ease-in-out curve (never rushed or abrupt)
  const smoothScrollTo = (targetPosition = 0) => {
    const scroller = getScrollContainer(containerRef.current);
    const startY = getScrollTop(scroller);
    const distance = targetPosition - startY;
    if (Math.abs(distance) < 4) {
      setScrollTop(scroller, targetPosition);
      return;
    }

    // Comfortable pacing: scales with distance (~750ms for local hops, ~1150ms for full-page traverse)
    const computedDuration = Math.min(1300, Math.max(700, Math.abs(distance) * 0.28));
    const startTime = performance.now();

    // Luxurious ease-in-out cubic curve (relaxed cruise, gentle touchdown)
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let cancelled = false;
    const cancelOnUserInteraction = () => {
      cancelled = true;
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('wheel', cancelOnUserInteraction);
      window.removeEventListener('touchstart', cancelOnUserInteraction);
    };

    window.addEventListener('wheel', cancelOnUserInteraction, { passive: true });
    window.addEventListener('touchstart', cancelOnUserInteraction, { passive: true });

    const step = (now) => {
      if (cancelled) return;
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / computedDuration);
      const ease = easeInOutCubic(progress);

      setScrollTop(scroller, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setScrollTop(scroller, targetPosition);
        cleanup();
      }
    };

    requestAnimationFrame(step);
  };

  const scrollToTop = () => {
    setActiveNav('folder-landing');
    smoothScrollTo(0);
  };

  const scrollToSection = (id) => {
    setActiveNav(id);
    if (id === 'folder-landing') {
      smoothScrollTo(0);
      return;
    }
    const targetEl = document.getElementById(id);
    if (!targetEl) return;
    const scroller = getScrollContainer(containerRef.current);
    const currentTop = getScrollTop(scroller);
    const rect = targetEl.getBoundingClientRect();
    const targetScrollTop = Math.max(0, currentTop + rect.top - 20);
    smoothScrollTo(targetScrollTop);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationMsg = validateEmailProvider(formData.email);
    if (validationMsg) {
      setEmailError(validationMsg);
      return;
    }
    setEmailError('');
    setIsSubmitting(true);

    const targetEmail = 'ghayzelle.dzn@gmail.com';
    const emailSubject = `[IMPORTANT INQUIRY] ${formData.projectType} commission from ${formData.name}`;

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          'Project Discipline': formData.projectType,
          Message: formData.message,
          _subject: emailSubject,
          _replyto: formData.email,
          _priority: 'urgent',
          _importance: 'high',
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (!response.ok) {
        throw new Error(`Submission status: ${response.status}`);
      }

      setFormSubmitted(true);
      setFormData({ name: '', email: '', projectType: 'UI/UX Design', message: '' });
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5500);
    } catch (err) {
      console.warn('FormSubmit network notice, falling back to direct email protocol:', err);
      // Fallback: Direct mailto trigger so no inquiry is ever lost
      const mailtoBody = `Name: ${formData.name}\nEmail: ${formData.email}\nProject Discipline: ${formData.projectType}\n\nMessage:\n${formData.message}`;
      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(mailtoBody)}`;
      window.location.href = mailtoUrl;

      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: BG_MAIN,
        color: TEXT_PRIMARY,
        fontFamily: SANS_FONT,
        overflowX: 'clip',
        position: 'relative',
      }}
    >
      {/* Load Formal Architectural Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,500..800;1,6..96,400..700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
      `}</style>

      {/* ════════════════════════════════════════════════════════════════
          RIGHT-SIDE VERTICAL PAGINATION INDICATOR (Exact Match to "01 ⦿ • • • 05" in Reference Image)
      ════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'fixed',
          right: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 70,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: '700', color: TEXT_SECONDARY, fontFamily: 'monospace' }}>
          01
        </span>

        {sectionsList.map((s) => {
          const isCurrent = activeNav === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              title={s.label}
              aria-label={`Scroll to ${s.label}`}
              style={{
                width: isCurrent ? '20px' : '8px',
                height: isCurrent ? '20px' : '8px',
                borderRadius: '50%',
                border: isCurrent ? `1.5px solid ${NAVY_PRIMARY}` : 'none',
                backgroundColor: isCurrent ? 'transparent' : 'rgba(22, 38, 59, 0.32)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {isCurrent && (
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: NAVY_PRIMARY,
                  }}
                />
              )}
            </button>
          );
        })}

        <span style={{ fontSize: '11px', fontWeight: '700', color: TEXT_SECONDARY, fontFamily: 'monospace' }}>
          05
        </span>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          STICKY TOP BAR (With Navy Blue Active Pill Accent)
      ════════════════════════════════════════════════════════════════ */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 60,
          padding: '12px clamp(12px, 3.5vw, 48px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none',
          gap: '12px',
        }}
      >
        {/* Top-Left White/Alabaster Navigation Pill */}
        <div
          style={{
            pointerEvents: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'clamp(8px, 1.8vw, 20px)',
            backgroundColor: 'rgba(246, 246, 245, 0.92)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${BORDER_SUBTLE}`,
            padding: '6px clamp(10px, 1.6vw, 18px) 6px 10px',
            borderRadius: '100px',
            boxShadow: '0 10px 30px rgba(22, 38, 59, 0.06)',
            maxWidth: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Transparent Vector Emblem */}
          <div
            onClick={() => scrollToSection('folder-landing')}
            title="gaze.d Home"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              padding: '0 4px',
              transition: 'transform 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <GazedLogo
              size={24}
              color={NAVY_PRIMARY}
            />
          </div>

          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(2px, 0.8vw, 8px)',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {[
              { id: 'folder-landing', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'resume', label: 'Resume' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${NAVY_ACCENT} 0%, ${NAVY_PRIMARY} 100%)`
                      : 'transparent',
                    border: 'none',
                    padding: isActive ? '6px 14px' : '6px 10px',
                    borderRadius: '100px',
                    color: isActive ? '#f4f6f8' : TEXT_SECONDARY,
                    fontSize: '12px',
                    fontWeight: isActive ? '700' : '600',
                    cursor: 'pointer',
                    transition: 'all 0.22s ease',
                    flexShrink: 0,
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Exit Button directing back to the Landing Page */}
        <button
          onClick={onBackTo3D}
          style={{
            pointerEvents: 'auto',
            padding: '8px 16px',
            borderRadius: '12px',
            backgroundColor: 'rgba(246, 246, 245, 0.9)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${BORDER_STRONG}`,
            color: TEXT_PRIMARY,
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(20, 21, 21, 0.05)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(246, 246, 245, 0.9)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <X size={15} />
          <span>Exit</span>
        </button>
      </header>

      {/* ════════════════════════════════════════════════════════════════
          MAIN ONE-PAGE SCROLLING PORTFOLIO
      ════════════════════════════════════════════════════════════════ */}
      <main style={{ position: 'relative', zIndex: 1 }}>

        {/* ─────────────────────────────────────────────────────────────
            0. LANDING SCREEN: EXACT "JOKER" REFERENCE LAYOUT WITH THE 3D FOLDER IN CENTER
        ───────────────────────────────────────────────────────────── */}
        <section
          id="folder-landing"
          style={{
            minHeight: 'calc(100vh - 84px)',
            padding: '10px clamp(16px, 4vw, 64px) 48px',
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            boxSizing: 'border-box',
          }}
        >
          {/* Giant Faint Embossed Top-Right Watermark (Matching Giant Faint "DC" in Reference Image) */}
          <div
            style={{
              position: 'absolute',
              top: '-36px',
              right: '4%',
              fontFamily: DISPLAY_FONT,
              fontSize: 'clamp(120px, 16vw, 250px)',
              fontWeight: '800',
              letterSpacing: '-0.05em',
              color: 'rgba(20, 21, 21, 0.035)',
              lineHeight: 0.85,
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
            }}
          >
            GD
          </div>

          {/* Center Hero Grid: Left = "Gazed" + "Expertise" (Matches "Joker" + "Power"), Center = 3D Folder */}
          <div
            style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              alignItems: 'center',
              gap: 'clamp(24px, 4vw, 48px)',
              position: 'relative',
              zIndex: 2,
              margin: 'auto 0',
            }}
          >
            {/* LEFT COLUMN: Title, Subtitle, Dot, Expertise Block (Exact Match to Left Column of Reference Image) */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  background: 'transparent',
                }}
              >
                <GazedLogo
                  size={20}
                  color={NAVY_PRIMARY}
                />
                <span
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontSize: '11px',
                    fontWeight: '800',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: NAVY_PRIMARY,
                  }}
                >
                  gaze.d
                </span>
              </div>

              <h1
                style={{
                  fontFamily: DISPLAY_FONT,
                  fontSize: 'clamp(54px, 6.5vw, 84px)',
                  fontWeight: '800',
                  letterSpacing: '-0.035em',
                  color: TEXT_PRIMARY,
                  margin: '0 0 6px',
                  lineHeight: 0.96,
                }}
              >
                Gazed
              </h1>

              <div
                style={{
                  fontSize: '13.5px',
                  fontWeight: '600',
                  color: TEXT_MUTED,
                  marginBottom: '44px',
                }}
              >
                Curated By Ghayzelle Dizon
              </div>

              {/* Minimal Dot Separator (Exact Match to Reference Image) */}
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: TEXT_MUTED,
                  marginBottom: '36px',
                }}
              />

              {/* Specification Block (Matching "Power" Block in Reference Image) */}
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: '800',
                  color: NAVY_PRIMARY,
                  marginBottom: '10px',
                }}
              >
                Architecture &amp; Craft
              </div>

              <p
                style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: TEXT_SECONDARY,
                  lineHeight: 1.78,
                  margin: 0,
                  maxWidth: '330px',
                }}
              >
                Crafting responsive Front-End web applications,
                <br />
                Cross-Platform mobile experiences, and
                <br />
                3D Blender visuals &amp; UI/UX design systems.
              </p>
            </div>

            {/* CENTER / RIGHT COLUMN: THE 3D FOLDER WITH FLOATING CALLOUT PILLS (Replaces Joker) */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Centerpiece3DFolder onScrollToProjects={() => scrollToSection('portfolio')} />
            </div>
          </div>

          {/* Bottom Bar: Left = "[🖱️] Scroll Mouse", Right = Monogram Stamp (Exact Match to Reference Image) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <button
              onClick={() => scrollToSection('portfolio')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                color: TEXT_SECONDARY,
                fontSize: '12.5px',
                fontWeight: '600',
              }}
            >
              {/* Mouse Icon */}
              <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
                <rect x="1.5" y="1.5" width="15" height="21" rx="7.5" stroke={TEXT_PRIMARY} strokeWidth="1.8" />
                <line x1="9" y1="6" x2="9" y2="10" stroke={TEXT_PRIMARY} strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span>Scroll Mouse</span>
            </button>

            {/* Bottom-Right Formal Studio Monogram Mark */}
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: TEXT_PRIMARY,
                color: '#f4f4f3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: SERIF_FONT,
                fontSize: '13px',
                fontWeight: '700',
              }}
            >
              GD
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            1. ABOUT SECTION (Personal Introduction, Tech Stack Bookshelf & Personal Strengths)
        ───────────────────────────────────────────────────────────── */}
        <section
          id="about"
          style={{
            padding: '40px clamp(16px, 4vw, 64px) clamp(50px, 7vw, 90px)',
            maxWidth: '1240px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Main About Section Header */}
          <ParallaxSectionBlock speed={-0.02} delayMs={0} offset={24}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                borderBottom: `1px solid ${BORDER_SUBTLE}`,
                paddingBottom: '20px',
                marginBottom: '36px',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '0.18em',
                    color: TEXT_MUTED,
                    textTransform: 'uppercase',
                  }}
                >
                  01 / PROFILE &amp; STORY
                </div>
                <h2
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontSize: 'clamp(32px, 4.4vw, 48px)',
                    fontWeight: '800',
                    letterSpacing: '-0.03em',
                    margin: '6px 0 0',
                    color: TEXT_PRIMARY,
                  }}
                >
                  About
                </h2>
              </div>
            </div>
          </ParallaxSectionBlock>

          {/* Part A: Architectural About Me — Separated Free-Floating 3D Portrait & Narrative Dossier */}
          <ParallaxSectionBlock speed={0.03} offset={30} delayMs={40} style={{ width: '100%', marginBottom: '64px' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
                gap: 'clamp(36px, 5vw, 64px)',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {/* Left: Free-Floating 3D Interactive Portrait with Holographic 3D Tilt & Floating Parallax Pills */}
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', overflow: 'visible' }}>
                <FloatingInteractivePortrait />
              </div>

              {/* Right: Editorial Narrative Card */}
              <div
                style={{
                  backgroundColor: BG_SURFACE,
                  borderRadius: '28px',
                  border: `1px solid ${BORDER_SUBTLE}`,
                  padding: 'clamp(28px, 4.5vw, 48px)',
                  boxShadow: '0 20px 50px rgba(22, 38, 59, 0.05)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Top Right Architectural Registration Mark (GD / BIO.01) */}
                <div
                  style={{
                    position: 'absolute',
                    top: '22px',
                    right: '26px',
                    fontFamily: DISPLAY_FONT,
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '0.18em',
                    color: 'rgba(22, 38, 59, 0.32)',
                    textTransform: 'uppercase',
                    userSelect: 'none',
                  }}
                >
                  GD / BIO.01
                </div>

                {/* Category Pill Tag */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(22, 38, 59, 0.06)',
                    border: `1px solid ${BORDER_SUBTLE}`,
                    padding: '6px 14px',
                    borderRadius: '100px',
                    fontSize: '10.5px',
                    fontWeight: '700',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: NAVY_PRIMARY,
                    marginBottom: '22px',
                    alignSelf: 'flex-start',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: NAVY_PRIMARY,
                    }}
                  />
                  01.0 / A LITTLE ABOUT ME
                </div>

                {/* Authentic Narrative Paragraphs */}
                <div
                  style={{
                    fontSize: '14.5px',
                    fontWeight: '500',
                    color: TEXT_SECONDARY,
                    lineHeight: 1.82,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    marginBottom: '28px',
                  }}
                >
                  <p style={{ margin: 0 }}>
                    I'm someone who embraces new experiences, welcomes different ideas and perspectives, and is always genuinely open to learning.
                  </p>
                  <p style={{ margin: 0 }}>
                    As an aspiring <strong style={{ color: TEXT_PRIMARY, fontWeight: '700' }}>Front-End Developer</strong>, I enjoy turning ideas into interactive and meaningful digital experiences. I'm fascinated by how design and technology work in concert to create interfaces that are both aesthetically purposeful and intuitively functional.
                  </p>
                  <p style={{ margin: 0 }}>
                    I believe lasting progress comes from taking on challenges, exploring unfamiliar technologies like Blender and 3D web frameworks, and turning new concepts into working reality. Beyond code, I deeply value communicating with people, listening attentively, and collaborating to build software that resonates.
                  </p>
                </div>

                {/* Sophisticated Architectural Action Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  <a
                    href="https://github.com/geyzz"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '9px',
                      padding: '11px 22px',
                      backgroundColor: NAVY_PRIMARY,
                      color: '#f4f6f8',
                      borderRadius: '100px',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      transition: 'all 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
                      boxShadow: '0 6px 18px rgba(22, 38, 59, 0.16)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = NAVY_ACCENT;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 24px rgba(22, 38, 59, 0.24)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = NAVY_PRIMARY;
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 18px rgba(22, 38, 59, 0.16)';
                    }}
                  >
                    <Github size={14} />
                    <span>GITHUB ARCHIVE</span>
                    <ArrowUpRight size={13} />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/ghayzelle-dizon-6a5665327/"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '9px',
                      padding: '11px 22px',
                      backgroundColor: '#ffffff',
                      border: `1.2px solid ${BORDER_STRONG}`,
                      color: NAVY_PRIMARY,
                      borderRadius: '100px',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(22, 38, 59, 0.05)',
                      transition: 'all 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = NAVY_PRIMARY;
                      e.currentTarget.style.backgroundColor = 'rgba(22, 38, 59, 0.04)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = BORDER_STRONG;
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Linkedin size={14} />
                    <span>LINKEDIN PROFILE</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </ParallaxSectionBlock>

          {/* Part B: Scroll-Scrubbed Tech Stack Bookshelf */}
          <div id="techstack">
            <ParallaxBookshelf techStackItems={techStackItems} />
          </div>

          {/* Part B: Personal Strengths Sub-Section */}
          <div id="personal-strengths" style={{ marginTop: '72px' }}>
            <ParallaxSectionBlock speed={-0.02} delayMs={0} offset={24}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  borderBottom: `1px solid ${BORDER_SUBTLE}`,
                  paddingBottom: '18px',
                  marginBottom: '36px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '0.18em',
                      color: TEXT_MUTED,
                      textTransform: 'uppercase',
                    }}
                  >
                    01.5 / CREATIVE MINDSET &amp; WORK ETHIC
                  </div>
                  <h3
                    style={{
                      fontFamily: DISPLAY_FONT,
                      fontSize: 'clamp(26px, 3.6vw, 38px)',
                      fontWeight: '800',
                      letterSpacing: '-0.03em',
                      margin: '6px 0 0',
                      color: TEXT_PRIMARY,
                    }}
                  >
                    Personal Strengths
                  </h3>
                </div>
              </div>
            </ParallaxSectionBlock>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                width: '100%',
                maxWidth: '980px',
              }}
            >
              {PERSONAL_STRENGTHS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <ParallaxSectionBlock
                    key={item.num}
                    speed={0.02 + (idx % 2) * 0.012}
                    delayMs={30 + idx * 40}
                    offset={28}
                    style={{ width: '100%' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        paddingBottom: '22px',
                        borderBottom: `1px solid ${BORDER_SUBTLE}`,
                        transition: 'border-color 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(22, 38, 59, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = BORDER_SUBTLE;
                      }}
                    >
                      {/* 01 icon title */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          marginBottom: '10px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontSize: '13px',
                            fontWeight: '800',
                            color: NAVY_PRIMARY,
                            letterSpacing: '0.04em',
                          }}
                        >
                          {item.num}
                        </span>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            backgroundColor: NAVY_LIGHT,
                            border: `1px solid ${BORDER_SUBTLE}`,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: NAVY_PRIMARY,
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={16} />
                        </div>
                        <h3
                          style={{
                            fontFamily: DISPLAY_FONT,
                            fontSize: '18px',
                            fontWeight: '800',
                            color: TEXT_PRIMARY,
                            letterSpacing: '-0.015em',
                            margin: 0,
                          }}
                        >
                          {item.title}
                        </h3>
                      </div>

                      {/* below is desc */}
                      <p
                        style={{
                          fontSize: '14px',
                          color: TEXT_SECONDARY,
                          lineHeight: 1.7,
                          margin: 0,
                          maxWidth: '860px',
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </ParallaxSectionBlock>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            2. PORTFOLIO SECTION (Next Scroll · Ascending Appear / Hidden Transitions)
        ───────────────────────────────────────────────────────────── */}
        <section
          id="portfolio"
          style={{
            padding: 'clamp(50px, 7vw, 80px) clamp(16px, 4vw, 64px) clamp(60px, 8vw, 100px)',
            maxWidth: '1240px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              borderBottom: `1px solid ${BORDER_SUBTLE}`,
              paddingBottom: '20px',
              marginBottom: '52px',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.18em', color: TEXT_MUTED, textTransform: 'uppercase' }}>
                02 / CURATED ARCHIVE
              </div>
              <h2
                style={{
                  fontFamily: DISPLAY_FONT,
                  fontSize: 'clamp(32px, 4.4vw, 48px)',
                  fontWeight: '800',
                  letterSpacing: '-0.03em',
                  margin: '6px 0 0',
                  color: TEXT_PRIMARY,
                }}
              >
                Selected Works
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
            {projects.map((project, idx) => (
              <AscendingProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            3. RESUME & CERTIFICATE COLLAGE SECTION
        ───────────────────────────────────────────────────────────── */}
        <section
          id="resume"
          style={{
            padding: 'clamp(50px, 7vw, 80px) clamp(16px, 4vw, 64px) clamp(50px, 7vw, 90px)',
            maxWidth: '1240px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <ParallaxSectionBlock speed={-0.025}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                borderBottom: `1px solid ${BORDER_SUBTLE}`,
                paddingBottom: '20px',
                marginBottom: '40px',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.18em', color: TEXT_MUTED, textTransform: 'uppercase' }}>
                  03 / CURRICULUM VITAE &amp; CREDENTIALS
                </div>
                <h2
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontSize: 'clamp(32px, 4.4vw, 48px)',
                    fontWeight: '800',
                    letterSpacing: '-0.03em',
                    margin: '6px 0 0',
                    color: TEXT_PRIMARY,
                  }}
                >
                  Resume &amp; Archive
                </h2>
              </div>

              {/* Download Resume Button */}
              <a
                href="/Ghayzelle_Dizon_Resume.pdf"
                download="Ghayzelle_Dizon_Resume.pdf"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 22px',
                  borderRadius: '100px',
                  backgroundColor: NAVY_PRIMARY,
                  color: '#f4f6f8',
                  fontSize: '13px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(22, 38, 59, 0.22)',
                  transition: 'all 0.22s ease',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = NAVY_ACCENT;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(22, 38, 59, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = NAVY_PRIMARY;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(22, 38, 59, 0.22)';
                }}
              >
                <Download size={15} />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </ParallaxSectionBlock>

          {/* ── PART A: EDUCATION & ACADEMIC HONORS (PARALLAX DEPTH CARD) ── */}
          <ParallaxSectionBlock speed={0.03} delayMs={40}>
            <div
              style={{
                backgroundColor: BG_SURFACE,
                border: `1px solid ${BORDER_SUBTLE}`,
                borderRadius: '24px',
                padding: '34px 38px',
                marginBottom: '44px',
                boxShadow: '0 20px 50px rgba(20, 21, 21, 0.04)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '32px',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle Giant Watermark Number in Background Corner */}
              <div
                style={{
                  position: 'absolute',
                  top: '-18px',
                  right: '24px',
                  fontFamily: DISPLAY_FONT,
                  fontSize: '120px',
                  fontWeight: '800',
                  color: 'rgba(20, 21, 21, 0.035)',
                  lineHeight: 1,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                03
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <GraduationCap size={19} color={NAVY_PRIMARY} />
                  <span style={{ fontSize: '10.5px', fontWeight: '700', letterSpacing: '0.16em', color: NAVY_PRIMARY, textTransform: 'uppercase' }}>
                    Holy Angel University · Angeles City, Pampanga
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontSize: '24px',
                    fontWeight: '800',
                    color: TEXT_PRIMARY,
                    margin: '0 0 6px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Bachelor of Science in Computer Science
                </h3>
                <div style={{ fontSize: '13.5px', fontWeight: '600', color: TEXT_SECONDARY, marginBottom: '12px' }}>
                  2023 – Present · Front-End, Mobile &amp; 3D Interactive Systems
                </div>
                <p style={{ fontSize: '13.5px', color: TEXT_SECONDARY, lineHeight: 1.65, margin: 0 }}>
                  Computer Science student and Front-End Developer passionate about UI/UX design, 3D visuals, and building distinctive web and mobile applications from initial concept in Figma and Blender to working production product.
                </p>
                <div style={{ marginTop: '16px' }}>
                  <a
                    href="/Ghayzelle_Dizon_Resume.pdf"
                    download="Ghayzelle_Dizon_Resume.pdf"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      backgroundColor: 'transparent',
                      color: NAVY_PRIMARY,
                      fontSize: '12px',
                      fontWeight: '700',
                      textDecoration: 'none',
                      border: `1.5px solid ${BORDER_STRONG}`,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = NAVY_PRIMARY;
                      e.currentTarget.style.color = '#f4f6f8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = NAVY_PRIMARY;
                    }}
                  >
                    <Download size={13} />
                    <span>Download CV (PDF)</span>
                  </a>
                </div>
              </div>

              <ParallaxSectionBlock speed={0.035} delayMs={80}>
                <div
                  style={{
                    background: `linear-gradient(135deg, ${NAVY_ACCENT} 0%, ${NAVY_PRIMARY} 60%, #0f1a28 100%)`,
                    color: '#f4f6f8',
                    borderRadius: '18px',
                    padding: '24px 26px',
                    boxShadow: '0 16px 36px rgba(22, 38, 59, 0.18)',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                    <Award size={18} color="#adc2d9" />
                    <span style={{ fontSize: '15px', fontWeight: '800', color: '#f4f6f8' }}>
                      Academic Honors — Dean&apos;s Lister
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['1st Year · 1st Semester', '2nd Year · 1st Semester', '3rd Year'].map((sem) => (
                      <span
                        key={sem}
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(255, 255, 255, 0.11)',
                          border: '1px solid rgba(180, 210, 245, 0.24)',
                          color: '#f4f6f8',
                        }}
                      >
                        ● {sem}
                      </span>
                    ))}
                  </div>
                </div>
              </ParallaxSectionBlock>
            </div>
          </ParallaxSectionBlock>

          {/* ── PART B: 10-CERTIFICATE ARCHITECTURAL COLLAGE ── */}
          <ParallaxSectionBlock speed={0.02} delayMs={80}>
            <EditorialCertCollage certifications={certifications} />
          </ParallaxSectionBlock>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            4. CONTACT SECTION (Scroll-Driven Parallax & Email Provider Validation)
        ───────────────────────────────────────────────────────────── */}
        <section
          id="contact"
          style={{
            padding: 'clamp(50px, 7vw, 80px) clamp(16px, 4vw, 64px) clamp(50px, 7vw, 90px)',
            maxWidth: '1240px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <ParallaxSectionBlock speed={-0.025}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                borderBottom: `1px solid ${BORDER_SUBTLE}`,
                paddingBottom: '20px',
                marginBottom: '40px',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.18em', color: TEXT_MUTED, textTransform: 'uppercase' }}>
                  04 / INQUIRY &amp; COMMISSION
                </div>
                <h2
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontSize: 'clamp(32px, 4.4vw, 48px)',
                    fontWeight: '800',
                    letterSpacing: '-0.03em',
                    margin: '6px 0 0',
                    color: TEXT_PRIMARY,
                  }}
                >
                  Contact
                </h2>
              </div>
            </div>
          </ParallaxSectionBlock>

          <ParallaxSectionBlock speed={0.03} delayMs={40}>
            <div
              style={{
                backgroundColor: BG_SURFACE,
                border: `1px solid ${BORDER_SUBTLE}`,
                borderRadius: '24px',
                padding: 'clamp(28px, 4vw, 48px)',
                boxShadow: '0 20px 50px rgba(20, 21, 21, 0.04)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '48px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle Giant Watermark Number in Background Corner */}
              <div
                style={{
                  position: 'absolute',
                  top: '-18px',
                  right: '24px',
                  fontFamily: DISPLAY_FONT,
                  fontSize: '120px',
                  fontWeight: '800',
                  color: 'rgba(20, 21, 21, 0.035)',
                  lineHeight: 1,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                04
              </div>

              <ParallaxSectionBlock speed={0.02} delayMs={70}>
                <div>
                  <h3
                    style={{
                      fontFamily: DISPLAY_FONT,
                      fontSize: '26px',
                      fontWeight: '800',
                      color: TEXT_PRIMARY,
                      margin: '0 0 10px',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Initiate a Conversation.
                  </h3>
                  <p style={{ fontSize: '13.5px', color: TEXT_SECONDARY, lineHeight: 1.68, marginBottom: '22px' }}>
                    Select a project discipline below to tailor your commission or role inquiry.
                  </p>

                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '0.14em',
                      color: NAVY_PRIMARY,
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                    }}
                  >
                    Select Project Type <span style={{ color: NAVY_PRIMARY }}>*</span>
                  </div>

                  <div
                    role="radiogroup"
                    aria-label="Project Type"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    {[
                      { value: 'UI/UX Design', desc: 'Figma Design Systems, Wireframing & Interactive Prototypes' },
                      { value: 'Front-End Development', desc: 'Responsive React, Vite & Custom CSS3 Web Applications' },
                      { value: 'Blender 3D Visuals', desc: 'Interactive 3D Environments, Spatial Assets & Motion' },
                      { value: 'Cross-Platform Mobile', desc: 'React Native, Expo & Flutter iOS / Android Apps' },
                    ].map((option) => {
                      const isSelected = formData.projectType === option.value;
                      return (
                        <label
                          key={option.value}
                          onClick={() => setFormData({ ...formData, projectType: option.value })}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            backgroundColor: isSelected ? NAVY_PRIMARY : BG_MAIN,
                            color: isSelected ? '#f4f6f8' : TEXT_PRIMARY,
                            border: isSelected ? `1.5px solid ${NAVY_PRIMARY}` : `1px solid ${BORDER_SUBTLE}`,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: isSelected ? '0 10px 24px rgba(22, 38, 59, 0.18)' : 'none',
                          }}
                        >
                          <input
                            type="radio"
                            name="projectType"
                            required
                            value={option.value}
                            checked={isSelected}
                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                            style={{
                              accentColor: NAVY_PRIMARY,
                              width: '16px',
                              height: '16px',
                              margin: 0,
                              cursor: 'pointer',
                              flexShrink: 0,
                            }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: '13px', fontWeight: '800', lineHeight: 1.2 }}>
                              {option.value}
                            </div>
                            <div
                              style={{
                                fontSize: '11px',
                                color: isSelected ? '#adc2d9' : TEXT_SECONDARY,
                                marginTop: '2px',
                              }}
                            >
                              {option.desc}
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </ParallaxSectionBlock>

              <ParallaxSectionBlock speed={0.03} delayMs={100}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', zIndex: 2 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: TEXT_SECONDARY, marginBottom: '6px' }}>
                      Your Name <span style={{ color: NAVY_PRIMARY }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      aria-required="true"
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        backgroundColor: BG_MAIN,
                        border: `1px solid ${BORDER_SUBTLE}`,
                        borderRadius: '10px',
                        padding: '12px 14px',
                        color: TEXT_PRIMARY,
                        fontSize: '13.5px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label style={{ fontSize: '11px', fontWeight: '700', color: TEXT_SECONDARY }}>
                        Email Address <span style={{ color: NAVY_PRIMARY }}>*</span>
                      </label>
                      {formData.email && !validateEmailProvider(formData.email) && (
                        <span style={{ fontSize: '10.5px', fontWeight: '700', color: NAVY_PRIMARY }}>
                          ✓ Verified Provider (@{formData.email.trim().split('@')[1]?.toLowerCase()})
                        </span>
                      )}
                    </div>
                    <input
                      type="email"
                      required
                      aria-required="true"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData({ ...formData, email: val });
                        if (emailError) {
                          setEmailError(validateEmailProvider(val));
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value.trim()) {
                          setEmailError(validateEmailProvider(e.target.value));
                        } else {
                          setEmailError('');
                        }
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: BG_MAIN,
                        border: emailError ? '1.5px solid #b91c1c' : `1px solid ${BORDER_SUBTLE}`,
                        borderRadius: '10px',
                        padding: '12px 14px',
                        color: TEXT_PRIMARY,
                        fontSize: '13.5px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                    {emailError && (
                      <div
                        style={{
                          marginTop: '6px',
                          fontSize: '11.5px',
                          fontWeight: '600',
                          color: '#b91c1c',
                          lineHeight: 1.4,
                        }}
                      >
                        {emailError}
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: TEXT_SECONDARY, marginBottom: '6px' }}>
                      Inquiry Message <span style={{ color: NAVY_PRIMARY }}>*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      aria-required="true"
                      placeholder="Enter message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        backgroundColor: BG_MAIN,
                        border: `1px solid ${BORDER_SUBTLE}`,
                        borderRadius: '10px',
                        padding: '12px 14px',
                        color: TEXT_PRIMARY,
                        fontSize: '13.5px',
                        outline: 'none',
                        resize: 'none',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '13px',
                      borderRadius: '100px',
                      background: formSubmitted
                        ? 'linear-gradient(135deg, #15803d 0%, #166534 100%)'
                        : `linear-gradient(135deg, ${NAVY_ACCENT} 0%, ${NAVY_PRIMARY} 100%)`,
                      color: '#f4f6f8',
                      border: 'none',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.75 : 1,
                      boxShadow: '0 12px 26px rgba(22, 38, 59, 0.22)',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <Send size={14} />
                    <span>
                      {isSubmitting
                        ? 'Transmitting to Important Inbox...'
                        : formSubmitted
                        ? 'Dispatched to Ghayzelle (Important Priority) ✓'
                        : 'Send Important Inquiry'}
                    </span>
                  </button>

                </form>
              </ParallaxSectionBlock>
            </div>
          </ParallaxSectionBlock>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            5. FORMAL ARCHITECTURAL STUDIO FOOTER (Full-Width Navy-Charcoal Monolith)
        ───────────────────────────────────────────────────────────── */}
        <footer
          style={{
            position: 'relative',
            width: '100%',
            background: 'linear-gradient(180deg, #16263b 0%, #0f1b2b 58%, #09111b 100%)',
            color: '#f4f6f8',
            padding: 'clamp(48px, 6vw, 72px) clamp(16px, 4vw, 64px) 44px',
            boxSizing: 'border-box',
            overflow: 'hidden',
            borderTop: '1px solid rgba(180, 210, 245, 0.18)',
          }}
        >
          {/* Faint Giant Watermark in Footer Background */}
          <div
            style={{
              position: 'absolute',
              bottom: '-28px',
              right: '3%',
              fontFamily: DISPLAY_FONT,
              fontSize: 'clamp(90px, 14vw, 190px)',
              fontWeight: '800',
              letterSpacing: '-0.04em',
              color: 'rgba(255, 255, 255, 0.03)',
              lineHeight: 0.85,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            GAZED
          </div>

          <div
            style={{
              maxWidth: '1240px',
              margin: '0 auto',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Top Multi-Column Editorial Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                gap: 'clamp(24px, 4vw, 36px)',
                paddingBottom: '48px',
                borderBottom: '1px solid rgba(180, 210, 245, 0.14)',
              }}
            >
              {/* Brand Column */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'transparent',
                    }}
                  >
                    <GazedLogo
                      size={36}
                      color="#f4f6f8"
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: DISPLAY_FONT,
                        fontSize: '20px',
                        fontWeight: '800',
                        letterSpacing: '-0.02em',
                        color: '#f4f6f8',
                      }}
                    >
                      Gazed
                    </div>
                    <div style={{ fontSize: '11px', color: '#9eb6d0', fontWeight: '600' }}>
                      Curated By Ghayzelle Dizon
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: '13px',
                    color: '#adc2d9',
                    lineHeight: 1.7,
                    maxWidth: '340px',
                    margin: '0 0 20px',
                  }}
                >
                  Front-End Developer &amp; Computer Science Student crafting responsive web applications,
                  cross-platform mobile experiences, and 3D Blender visuals from concept to production.
                </p>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    backgroundColor: 'rgba(126, 179, 239, 0.12)',
                    border: '1px solid rgba(126, 179, 239, 0.28)',
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#d8e8fa',
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#7eb3ef',
                    }}
                  />
                  <span>Available for Front-End, UI/UX &amp; Mobile Roles</span>
                </div>
              </div>

              {/* Column 1: Index Navigation */}
              <div>
                <div
                  style={{
                    fontSize: '10.5px',
                    fontWeight: '800',
                    letterSpacing: '0.16em',
                    color: '#7eb3ef',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  01 / Directory
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { id: 'folder-landing', label: '01 · Home & Overview' },
                    { id: 'about', label: '02 · About' },
                    { id: 'portfolio', label: '03 · Selected Works' },
                    { id: 'resume', label: '04 · Resume & Credentials' },
                    { id: 'contact', label: '05 · Initiate Inquiry' },
                  ].map((navItem) => (
                    <button
                      key={navItem.id}
                      onClick={() => scrollToSection(navItem.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        textAlign: 'left',
                        color: '#c8d7e8',
                        fontSize: '12.5px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      {navItem.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Column 2: Selected Repositories (Stacked Title + URL Format, No Icons) */}
              <div>
                <div
                  style={{
                    fontSize: '10.5px',
                    fontWeight: '800',
                    letterSpacing: '0.16em',
                    color: '#7eb3ef',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  02 / Selected Works
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { label: 'C&J Real Estate (Supabase)', url: 'https://github.com/geyzz/real-estate', text: 'github.com/geyzz/real-estate' },
                    { label: 'Plan_.ed Mobile Planner', url: 'https://github.com/geyzz/shopping-planner', text: 'github.com/geyzz/shopping-planner' },
                    { label: 'HAUtogo Campus Tracker', url: 'https://github.com/qwertyuipaas/HAUtogo', text: 'github.com/qwertyuipaas/HAUtogo' },
                  ].map((projLink) => (
                    <div key={projLink.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#f4f6f8' }}>
                        {projLink.label}
                      </div>
                      <a
                        href={projLink.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: '#9eb6d0',
                          textDecoration: 'none',
                          fontSize: '11.5px',
                          fontWeight: '500',
                          wordBreak: 'break-all',
                        }}
                      >
                        {projLink.text}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Direct Contact & Profiles (Stacked Label + Link/Value, No Icons) */}
              <div>
                <div
                  style={{
                    fontSize: '10.5px',
                    fontWeight: '800',
                    letterSpacing: '0.16em',
                    color: '#7eb3ef',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  03 / Contact &amp; Profiles
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    {
                      label: 'Github',
                      value: 'https://github.com/geyzz',
                      href: 'https://github.com/geyzz',
                      external: true,
                    },
                    {
                      label: 'LinkedIn',
                      value: 'https://www.linkedin.com/in/ghayzelle-dizon/',
                      href: 'https://www.linkedin.com/in/ghayzelle-dizon/',
                      external: true,
                    },
                    {
                      label: 'Gmail',
                      value: 'ghayzelle.dzn@gmail.com',
                      href: 'mailto:ghayzelle.dzn@gmail.com',
                      external: false,
                    },
                    {
                      label: 'Contact Number',
                      value: '+63 969 019 9663',
                      href: 'tel:+639690199663',
                      external: false,
                    },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#f4f6f8' }}>
                        {item.label}
                      </div>
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noreferrer' : undefined}
                        style={{
                          color: '#9eb6d0',
                          textDecoration: 'none',
                          fontSize: '11.5px',
                          fontWeight: '500',
                          wordBreak: 'break-all',
                        }}
                      >
                        {item.value}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Copyright & Back-to-Top Row (No Icon Link Pills) */}
            <div
              style={{
                paddingTop: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div style={{ fontSize: '12px', color: '#8ea8c3', fontWeight: '500' }}>
                © 2026 Ghayzelle Dizon · Holy Angel University · Pampanga, Philippines. All rights reserved.
              </div>

              <button
                onClick={scrollToTop}
                title="Scroll back to top"
                aria-label="Back to Top"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 22px',
                  borderRadius: '100px',
                  backgroundColor: '#f4f6f8',
                  border: 'none',
                  color: NAVY_PRIMARY,
                  fontSize: '12px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.22)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 22px rgba(0, 0, 0, 0.32)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.22)';
                }}
              >
                <span>↑ Back to Top</span>
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
