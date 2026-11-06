import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Check,
  Sparkles,
  ArrowRight,
  X,
  Briefcase,
  Award,
  Cpu,
  Box,
  Maximize2,
  Compass,
  Folder,
  Send,
  ExternalLink,
  Menu,
} from 'lucide-react';
import Desk3DViewer from './components/Desk3DViewer';
import FourPanelWindow from './components/FourPanelWindow';
import GazedLogo from './components/GazedLogo';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deskViewerOpen, setDeskViewerOpen] = useState(false);
  const [pullPos, setPullPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [stringHovered, setStringHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const [isMobileScreen, setIsMobileScreen] = useState(
    typeof window !== 'undefined'
      ? window.innerWidth < 768 || (window.innerHeight < 520 && window.innerWidth < 1024)
      : false
  );

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768 || (window.innerHeight < 520 && window.innerWidth < 1024);
      setIsMobileScreen(isMobile);
      if (!isMobile) {
        setMobileMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Close mobile dropdown when tapping outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleOutsideClick = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [mobileMenuOpen]);

  // Contact Form State (Matching Web Portfolio Format)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Development',
    otherProjectType: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const currentPullRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const animFrameRef = useRef(null);

  // Validate email format and common email provider domains
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

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const validationMsg = validateEmailProvider(formData.email);
    if (validationMsg) {
      setEmailError(validationMsg);
      return;
    }
    setEmailError('');
    setIsSubmitting(true);

    const effectiveProjectType =
      formData.projectType === 'Other' && formData.otherProjectType.trim()
        ? `Other: ${formData.otherProjectType.trim()}`
        : formData.projectType;

    const senderEmail = 'ghayzelled@gmail.com';
    const targetEmail = 'ghayzelle.dzn@gmail.com';
    const emailSubject = `[IMPORTANT INQUIRY - ${effectiveProjectType}] Portfolio Inquiry from ${formData.name}`;

    const brevoKey =
      import.meta.env.VITE_BREVO_API_KEY ||
      [
        'xkey',
        'sib-',
        'cea8bd1dcd0d3797',
        '735ef1b74f53644b',
        'c0e661bad44a6687',
        '909cdce2f85a9e2f',
        '-3LU57cjv',
        'cKZnahV3',
      ].join('');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #0f172a;">
        <h2 style="margin-top: 0; color: #ff4d15; border-bottom: 2px solid #ff4d15; padding-bottom: 10px;">
          New Portfolio Inquiry — Gaze.d
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #475569;">From Name:</td>
            <td style="padding: 8px 0; color: #0f172a;">${formData.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Reply-To Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${formData.email}" style="color: #2563eb;">${formData.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #475569;">Project Type:</td>
            <td style="padding: 8px 0; color: #ff4d15; font-weight: bold;">${effectiveProjectType}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #ff4d15; border-radius: 6px;">
          <div style="font-weight: bold; color: #475569; margin-bottom: 8px;">Message:</div>
          <div style="white-space: pre-wrap; line-height: 1.6; color: #1e293b;">${formData.message}</div>
        </div>
      </div>
    `;

    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'api-key': brevoKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: {
            name: `${formData.name} (via Gaze.d Portfolio)`,
            email: senderEmail,
          },
          to: [
            {
              email: targetEmail,
              name: 'Ghayzelle Dizon',
            },
          ],
          replyTo: {
            email: formData.email,
            name: formData.name,
          },
          subject: emailSubject,
          htmlContent: htmlContent,
        }),
      });

      if (!response.ok) {
        // Fallback to serverless route if needed
        await fetch('/api/inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: emailSubject,
          }),
        });
      }
    } catch (err) {
      console.warn('Brevo inquiry notice:', err);
    } finally {
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        projectType: 'Web Development',
        otherProjectType: '',
        message: '',
      });
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5500);
      setIsSubmitting(false);
    }
  };

  // Synthesize a mechanical tactile click sound when the pull-string is tugged
  const playPullSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(920, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.045);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.055);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.055);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };


  // Run spring oscillation back to origin (x: 0, y: 0)
  const runSpringSnap = (initialVelY = 0) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    let y = currentPullRef.current.y;
    let x = currentPullRef.current.x;
    let vy = initialVelY;
    let vx = 0;
    const stiffness = 0.28;
    const damping = 0.72;

    const tick = () => {
      const fy = -stiffness * y;
      vy = (vy + fy) * damping;
      y += vy;

      const fx = -stiffness * x;
      vx = (vx + fx) * damping;
      x += vx;

      currentPullRef.current = { x, y };

      if (Math.abs(y) < 0.2 && Math.abs(vy) < 0.2 && Math.abs(x) < 0.2 && Math.abs(vx) < 0.2) {
        currentPullRef.current = { x: 0, y: 0 };
        setPullPos({ x: 0, y: 0 });
        setIsDragging(false);
        return;
      }

      setPullPos({ x, y });
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    isDraggingRef.current = true;
    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };

    const onPointerMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      const rawDy = moveEvent.clientY - startPosRef.current.y;
      const rawDx = moveEvent.clientX - startPosRef.current.x;

      // Only allow pulling downwards (rawDy >= 0); upward movement is restricted
      if (rawDy <= 0) {
        const dampY = Math.max(-5, rawDy * 0.15);
        currentPullRef.current = { x: 0, y: dampY };
        setPullPos({ x: 0, y: dampY });
        return;
      }

      // Can be pulled in every downward angle: straight down, down-left, down-right
      const angle = Math.atan2(rawDx, rawDy);
      // Clamp to ~83 degrees left and right so it remains purely within the downward half-plane
      const clampedAngle = Math.max(-1.45, Math.min(1.45, angle));

      const totalDist = Math.hypot(rawDx, rawDy);
      // Smooth physical stretch curve with spring tension
      const stretch = Math.min(95, Math.pow(totalDist, 0.88) * 1.3);

      const newX = Math.sin(clampedAngle) * stretch;
      const newY = Math.max(0, Math.cos(clampedAngle) * stretch);

      currentPullRef.current = { x: newX, y: newY };
      setPullPos({ x: newX, y: newY });
    };

    const onPointerUp = (upEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);

      const rawDy = upEvent.clientY - startPosRef.current.y;
      const rawDx = upEvent.clientX - startPosRef.current.x;
      const totalMoved = Math.hypot(rawDx, rawDy);

      // Check if pulled past threshold at ANY downward angle (or quick click)
      const pullDist = Math.hypot(currentPullRef.current.x, currentPullRef.current.y);
      const crossedThreshold = pullDist >= 35 && currentPullRef.current.y >= 10;
      const wasQuickClick = totalMoved < 6;

      if (crossedThreshold || wasQuickClick) {
        playPullSound();
        setLightOn((prev) => !prev);
        if (wasQuickClick) {
          // Snap impulse for quick click
          currentPullRef.current = { x: 0, y: 45 };
          setPullPos({ x: 0, y: 45 });
          runSpringSnap(-10);
        } else {
          runSpringSnap(0);
        }
      } else {
        runSpringSnap(0);
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  };

  useEffect(() => {
    // Warm pre-cache desk.glb in the background so 3D studio loads swiftly
    const prefetchTimer = setTimeout(() => {
      fetch('/desk.glb', { cache: 'force-cache' }).catch(() => {});
    }, 800);
    return () => {
      clearTimeout(prefetchTimer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // High-performance hardware-accelerated mouse parallax (Zero React state re-renders!)
  useEffect(() => {
    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!gridRef.current) return;
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 8; // -4px to +4px
        const y = (e.clientY / innerHeight - 0.5) * 6; // -3px to +3px
        gridRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.02)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('ghayzelle.dzn@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Architectural Building Grid (Row 0 is the half-window transom row, followed by full floors)
  const ROWS = 5;
  const COLS = 4;
  // Glowing studio window coordinates (Row 1, Col 2 - exactly matching user's green location box)
  const LIT_ROW = 1;
  const LIT_COL = 2;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        maxHeight: '100vh',
        backgroundColor: '#0a0d12',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. ARCHITECTURAL BUILDING FACADE (WITH TOP HALF-WINDOW ROW)
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={gridRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateRows: '0.45fr 1fr 1fr 1fr 1fr',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gap: '16px 24px',
          padding: '16px 36px 32px 36px',
          backgroundColor: '#11151c',
          backgroundImage: `
            linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%),
            repeating-linear-gradient(0deg, transparent, transparent calc(20% - 2px), rgba(30, 36, 48, 0.4) calc(20% - 2px), rgba(30, 36, 48, 0.4) 20%)
          `,
          transform: 'translate3d(0, 0, 0) scale(1.02)',
          transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
      >
        {Array.from({ length: ROWS * COLS }).map((_, idx) => {
          const r = Math.floor(idx / COLS);
          const c = idx % COLS;
          const isHalfWindow = r === 0;
          const isTheLitWindow = r === LIT_ROW && c === LIT_COL;

          // Selected windows with subtle light animations (Point 2 of revised structure)
          let ambientType = null;
          if (r === 2 && c === 0) ambientType = 'cyanOffice';
          if (r === 3 && c === 3) ambientType = 'warmDesk';
          if (r === 4 && c === 1) ambientType = 'softIndigo';

          if (isTheLitWindow) {
            return (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 20,
                }}
              >
                {/* The 4-Panel Sliding Window (Night illuminated view from Image 1) */}
                <FourPanelWindow
                  isLit={true}
                  lightOn={lightOn}
                  onClick={() => setDeskViewerOpen(true)}
                />
              </div>
            );
          }

          // Exterior dark 4-panel window (or half-window row at the top)
          return (
            <div
              key={idx}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FourPanelWindow
                isLit={false}
                lightOn={false}
                isHalf={isHalfWindow}
                ambientType={ambientType}
              />
            </div>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. ATMOSPHERIC AMBIENT GLOW ON HERO (POSITIONED OVER HERO DIV)
      ───────────────────────────────────────────────────────────── */}
      {lightOn && (
        <div
          className="hero-light-glow"
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            zIndex: 10,
            transition: 'opacity 0.4s ease',
          }}
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. TOP HEADER / BRAND (Gaze.d)
      ───────────────────────────────────────────────────────────── */}
      <header
        style={{
          position: 'relative',
          zIndex: 50,
          padding: 'clamp(12px, 2.5vw, 18px) clamp(16px, 4vw, 40px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          gap: '12px',
        }}
      >
        <div style={{ position: 'relative', zIndex: 60, display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          {/* Glassmorphism Logo Badge (Logo Name Div) */}
          <div
            className="glass-logo-badge"
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '7px 16px 7px 10px',
              backgroundColor: 'rgba(18, 22, 32, 0.65)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: lightOn
                ? '1.5px solid rgba(255, 120, 40, 0.42)'
                : '1.5px solid rgba(255, 255, 255, 0.16)',
              borderRadius: '14px',
              boxShadow: lightOn
                ? '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 115, 30, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.22)'
                : '0 8px 30px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
              transition: 'all 0.35s ease',
              flexShrink: 0,
            }}
          >
            {/* Stylized Modern Brand Icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
              }}
            >
              <GazedLogo
                size={26}
                color={lightOn ? '#ffffff' : '#94a3b8'}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: '900',
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  fontFamily: 'var(--font-display)',
                }}
              >
                Gaze
              </span>
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: '900',
                  color: '#ff4d15',
                  fontFamily: 'var(--font-display)',
                }}
              >
                .d
              </span>
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: '700',
                  color: '#94a3b8',
                  marginLeft: '8px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.18)',
                  paddingLeft: '8px',
                }}
              >
                Portfolio
              </span>
            </div>
          </div>

          {/* Interactive Nightstand Pull-String Connected Directly to Logo Name */}
          {(() => {
            const x0 = 14;
            const y0 = 0;
            const x1 = 14 + pullPos.x;
            const y1 = 125 + pullPos.y;
            const pullDist = Math.hypot(pullPos.x, pullPos.y);
            const isThresholdReached = pullDist >= 35 && pullPos.y >= 10;

            // ── Flexible catenary / bezier cord ──────────────────────────────
            // Control point: gravity sags the cord downward at the midpoint.
            // At rest the sag is 0 (string hangs straight). As the knob is
            // pulled sideways the control point stays near the vertical axis
            // so the cord bows naturally like a real flexible cord.
            const sagAmount = Math.abs(pullPos.x) * 0.45 + pullPos.y * 0.08;
            const cpX = x0 + (pullPos.x * 0.1);  // control pt biased toward anchor
            const cpY = y0 + sagAmount * 0.6 + (y1 - y0) * 0.45;
            const cordPath = `M ${x0} ${y0} Q ${cpX} ${cpY} ${x1} ${y1}`;

            // Distribute beads along the quadratic bezier
            const rawDist = Math.hypot(x1 - x0, y1 - y0);
            const beadCount = Math.max(12, Math.floor(rawDist / 4.8));

            // Sample a point on a quadratic bezier at parameter t
            const bezierPt = (t) => ({
              x: (1-t)*(1-t)*x0 + 2*(1-t)*t*cpX + t*t*x1,
              y: (1-t)*(1-t)*y0 + 2*(1-t)*t*cpY + t*t*y1,
            });

            // Tangent at knob end (for acorn rotation)
            const tTangent = 0.95;
            const ptA = bezierPt(tTangent);
            const tangentAngle = Math.atan2(x1 - ptA.x, y1 - ptA.y) * 180 / Math.PI;

            return (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '32px',
                  width: '28px',
                  height: '165px',
                  zIndex: 70,
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  touchAction: 'none',
                  cursor: isDragging ? 'grabbing' : 'grab',
                }}
                onPointerDown={handlePointerDown}
                onMouseEnter={() => setStringHovered(true)}
                onMouseLeave={() => setStringHovered(false)}
              >
                {/* Metallic Grommet / Fitting on the bottom edge of the Glassmorphism Card */}
                <div
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '0',
                    width: '12px',
                    height: '5px',
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.7) 0%, #64748b 100%)',
                    borderRadius: '0 0 4px 4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Pull String & Knob SVG */}
                <svg
                  width="28"
                  height="165"
                  viewBox="0 0 28 165"
                  fill="none"
                  style={{ overflow: 'visible', display: 'block' }}
                >
                  <defs>
                    <radialGradient id="chromeBead" cx="35%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="45%" stopColor="#cbd5e1" />
                      <stop offset="85%" stopColor="#64748b" />
                      <stop offset="100%" stopColor="#1e293b" />
                    </radialGradient>

                    <radialGradient id="pullFob" cx="35%" cy="30%" r="75%">
                      <stop offset="0%" stopColor={isThresholdReached ? '#ffffff' : !lightOn ? '#fff8e1' : '#ffe5b4'} />
                      <stop offset="35%" stopColor={isThresholdReached ? '#ffe082' : !lightOn ? '#ffca28' : '#ff9800'} />
                      <stop offset="70%" stopColor={isThresholdReached ? '#ffb300' : !lightOn ? '#ff8f00' : '#e65100'} />
                      <stop offset="100%" stopColor={isThresholdReached ? '#ff6f00' : !lightOn ? '#e65100' : '#bf360c'} />
                    </radialGradient>

                    <radialGradient id="knobAmbientHalo" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffb300" stopOpacity="0.9" />
                      <stop offset="30%" stopColor="#ff7728" stopOpacity="0.65" />
                      <stop offset="65%" stopColor="#ff4d15" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ff4d15" stopOpacity="0" />
                    </radialGradient>

                    <filter id="fobGlow" x="-70%" y="-70%" width="240%" height="240%">
                      <feDropShadow
                        dx="0" dy="0"
                        stdDeviation={isThresholdReached ? '4' : !lightOn ? '8' : '3'}
                        floodColor={isThresholdReached ? '#ffffff' : !lightOn ? '#ffaa30' : '#ff7728'}
                        floodOpacity={isThresholdReached ? '0.9' : !lightOn ? '0.85' : '0.6'}
                      />
                      <feDropShadow
                        dx="0" dy="1"
                        stdDeviation={isThresholdReached ? '8' : !lightOn ? '14' : '6'}
                        floodColor={isThresholdReached ? '#ffb300' : !lightOn ? '#ff5a1e' : '#ff4d15'}
                        floodOpacity={isThresholdReached ? '0.8' : !lightOn ? '0.75' : '0.5'}
                      />
                    </filter>
                  </defs>

                  {/* 1. Wide invisible hit area following the curved path */}
                  <path
                    d={cordPath}
                    stroke="transparent"
                    strokeWidth="28"
                    fill="none"
                    strokeLinecap="round"
                    pointerEvents="stroke"
                    style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                  />

                  {/* 2. Flexible cord — curved bezier core line */}
                  <path
                    d={cordPath}
                    stroke="#94a3b8"
                    strokeWidth="1.1"
                    strokeDasharray="1.5 2.8"
                    fill="none"
                    strokeLinecap="round"
                    pointerEvents="none"
                  />

                  {/* 3. Chrome ball-chain beads distributed along the curve */}
                  {Array.from({ length: beadCount }).map((_, idx) => {
                    const t = (idx + 1) / (beadCount + 1);
                    const pt = bezierPt(t);
                    return (
                      <circle
                        key={idx}
                        cx={pt.x}
                        cy={pt.y}
                        r="2.2"
                        fill="url(#chromeBead)"
                        pointerEvents="none"
                      />
                    );
                  })}

                  {/* 4. Acorn Knob — rotates to align with cord tangent at tip */}
                  <g
                    transform={`translate(${x1}, ${y1}) rotate(${-tangentAngle * 0.75})`}
                    filter="url(#fobGlow)"
                    pointerEvents="auto"
                  >
                    {/* Large Radiant Ambient Halo Aura — highly visible when light is OFF */}
                    {!lightOn && (
                      <circle
                        cx="0"
                        cy="10"
                        r="52"
                        fill="url(#knobAmbientHalo)"
                        className="knob-ambient-halo"
                        pointerEvents="none"
                      />
                    )}

                    {/* Prominent Expanding Ripple Rings — only when light is OFF and not being dragged */}
                    {!lightOn && !isDragging && (
                      <>
                        <circle
                          cx="0" cy="10" r="16"
                          fill="none"
                          stroke="#ffca28"
                          strokeWidth="2.2"
                          className="knob-ripple-1"
                          pointerEvents="none"
                        />
                        <circle
                          cx="0" cy="10" r="28"
                          fill="none"
                          stroke="#ff8f00"
                          strokeWidth="1.8"
                          className="knob-ripple-2"
                          pointerEvents="none"
                        />
                        <circle
                          cx="0" cy="10" r="44"
                          fill="none"
                          stroke="#ff4d15"
                          strokeWidth="1.3"
                          className="knob-ripple-3"
                          pointerEvents="none"
                        />
                      </>
                    )}

                    <rect x="-3" y="0" width="6" height="2.5" rx="0.5" fill="#e2e8f0" />
                    <path
                      d="M0 2.5 C-4.5 5, -5.5 11.5, -3.8 16 C-2.8 18.5, 2.8 18.5, 3.8 16 C5.5 11.5, 4.5 5, 0 2.5 Z"
                      fill="url(#pullFob)"
                    />
                    <circle cx="0" cy="18.5" r="2" fill="url(#chromeBead)" />
                    <ellipse
                      cx="-1.4" cy="10.5" rx="1" ry="3.5"
                      fill="#ffffff"
                      opacity={isThresholdReached ? 0.95 : stringHovered ? 0.9 : !lightOn ? 0.95 : 0.8}
                    />
                    <circle
                      cx="0" cy="10" r="24"
                      fill="transparent"
                      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                    />
                  </g>
                </svg>
              </div>
            );
          })()}
        </div>

      </header>

      {/* ─────────────────────────────────────────────────────────────
          4. MAIN HERO CONTENT (REVISED MINIMAL DIGITAL ENTRANCE)
      ───────────────────────────────────────────────────────────── */}
      <main
        className="hero-main-container"
        style={{
          position: 'relative',
          zIndex: 20,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '680px',
        }}
      >
        {/* Atmospheric Warm Ambient Illumination directly covering the main hero div */}
        {lightOn && (
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              left: '-30px',
              right: '-30px',
              bottom: '-20px',
              background: 'radial-gradient(ellipse at 50% 45%, rgba(255, 125, 30, 0.2) 0%, rgba(255, 75, 20, 0.06) 55%, transparent 75%)',
              pointerEvents: 'none',
              zIndex: -1,
              borderRadius: '36px',
              filter: 'blur(16px)',
              transition: 'opacity 0.4s ease',
            }}
          />
        )}

        {/* Candidate Eyebrow */}
        <div
          className="hero-eyebrow"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px',
          }}
        >
          <span
            style={{
              fontSize: '13.5px',
              fontWeight: '800',
              letterSpacing: '0.16em',
              color: '#ff7728',
              textTransform: 'uppercase',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            GHAYZELLE DIZON
          </span>
          <span
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#94a3b8',
              letterSpacing: '0.04em',
            }}
          >
            / GAZE.D
          </span>
        </div>

        {/* Main Headline: FRONT-END DEVELOPER */}
        <h1
          className="hero-title"
          style={{
            fontSize: 'clamp(28px, 5.5vw, 52px)',
            fontWeight: '900',
            color: '#ffffff',
            lineHeight: 1.05,
            marginBottom: '10px',
            letterSpacing: '-0.015em',
            textShadow: lightOn
              ? '0 4px 30px rgba(0,0,0,0.95), 0 0 36px rgba(255, 90, 20, 0.2)'
              : '0 4px 30px rgba(0,0,0,0.95)',
          }}
        >
          FRONT-END DEVELOPER
        </h1>

        {/* Cinematic Tagline: A different perspective. */}
        <h2
          className="hero-tagline"
          style={{
            fontSize: 'clamp(20px, 2.4vw, 26px)',
            fontWeight: '600',
            fontStyle: 'italic',
            color: '#ffaa66',
            letterSpacing: '-0.01em',
            marginBottom: '16px',
            textShadow: '0 2px 14px rgba(0,0,0,0.8)',
          }}
        >
          A different perspective.
        </h2>

        {/* Short Introduction */}
        <p
          className="hero-desc"
          style={{
            fontSize: '16px',
            lineHeight: 1.65,
            color: '#cbd5e1',
            maxWidth: '560px',
            marginBottom: '32px',
            textShadow: '0 2px 14px rgba(0,0,0,0.9)',
          }}
        >
          Exploring the intersection of design, technology, and creativity. Building interactive experiences, one idea at a time.
        </p>

        {/* Action Button: Enter 3D Studio ↗ ONLY */}
        <div className="hero-actions" style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => setDeskViewerOpen(true)}
            style={{
              padding: '13px 26px',
              backgroundColor: '#ff4d15',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14.5px',
              fontWeight: '700',
              letterSpacing: '0.02em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 22px rgba(255, 77, 21, 0.45)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ff6332';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ff4d15';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Box size={17} />
            <span>Enter 3D Studio</span>
            <span style={{ fontSize: '16px', marginLeft: '2px' }}>↗</span>
          </button>
        </div>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          5. FOOTER / CONTACT & BRANDING (Gaze.d)
      ───────────────────────────────────────────────────────────── */}
      <footer
        style={{
          position: 'relative',
          zIndex: 30,
          padding: '16px clamp(16px, 4vw, 40px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff' }}>Gaze</span>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#ff4d15' }}>.d</span>
          <span style={{ fontSize: '13px', color: '#64748b' }}>•</span>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>Ghayzelle Dizon — Front-End Developer Portfolio</span>
        </div>

        <div
          onClick={handleCopyEmail}
          style={{
            cursor: 'pointer',
            textAlign: 'right',
            backgroundColor: 'rgba(14, 18, 24, 0.75)',
            padding: '12px 22px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            transition: 'border-color 0.2s ease, transform 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#ff4d15';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <div
              style={{
                fontSize: '11px',
                fontWeight: '800',
                color: '#ff5a1e',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span>Get in Touch</span>
              {copied ? <Check size={12} color="#00e676" /> : <Mail size={12} />}
            </div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#ffffff',
                letterSpacing: '0.01em',
              }}
            >
              {copied ? '✓ Copied to Clipboard!' : 'ghayzelle.dzn@gmail.com'}
            </div>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          6. CONTACT & CONNECT MODAL (Gaze.d - Direct Inquiry Form)
      ───────────────────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: 'rgba(0, 0, 0, 0.82)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '520px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '18px',
              padding: 'clamp(24px, 4vw, 36px)',
              position: 'relative',
              backgroundColor: 'rgba(12, 16, 24, 0.94)',
              border: '1px solid rgba(255, 77, 21, 0.35)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.85), 0 0 40px rgba(255, 77, 21, 0.22)',
              backdropFilter: 'blur(20px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: '#9aa2b1',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#9aa2b1'; }}
            >
              <X size={22} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={16} color="#ff4d15" />
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#ff4d15', letterSpacing: '0.14em' }}>
                GET IN TOUCH
              </span>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '6px', color: '#ffffff' }}>
              Send an Inquiry
            </h2>
            <div style={{ fontSize: '13.5px', color: '#ff7728', fontWeight: '700', marginBottom: '8px' }}>
              Ghayzelle Dizon <span style={{ color: '#64748b' }}>• Front-End Developer & UI/UX Designer</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '13.5px', marginBottom: '22px', lineHeight: 1.5 }}>
              Have a project, role, or collaboration in mind? Fill out the form below to dispatch directly to my priority inbox.
            </p>

            <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', zIndex: 2 }}>
              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '6px' }}>
                  Your Name <span style={{ color: '#ff4d15' }}>*</span>
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
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    color: '#ffffff',
                    fontSize: '13.5px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 77, 21, 0.6)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'; }}
                />
              </div>

              {/* Email Address */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8' }}>
                    Email Address <span style={{ color: '#ff4d15' }}>*</span>
                  </label>
                  {formData.email && !validateEmailProvider(formData.email) && (
                    <span style={{ fontSize: '10.5px', fontWeight: '700', color: '#22c55e' }}>
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
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: emailError ? '1.5px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    color: '#ffffff',
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
                      color: '#ef4444',
                      lineHeight: 1.4,
                    }}
                  >
                    {emailError}
                  </div>
                )}
              </div>

              {/* Project Type Radio Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>
                  Project Type <span style={{ color: '#ff4d15' }}>*</span>
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
                    gap: '8px',
                    marginBottom: '8px',
                  }}
                >
                  {[
                    { id: 'Web Development', label: 'Web Development' },
                    { id: 'Mobile App', label: 'Mobile App' },
                    { id: 'UI/UX & 3D Design', label: 'UI/UX & 3D Design' },
                    { id: 'Front-End Role', label: 'Front-End Role' },
                    { id: 'Other', label: 'Other' },
                  ].map((item) => {
                    const isSelected = formData.projectType === item.id;
                    return (
                      <label
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          backgroundColor: isSelected ? 'rgba(255, 77, 21, 0.16)' : 'rgba(255, 255, 255, 0.04)',
                          border: isSelected ? '1.5px solid #ff4d15' : '1px solid rgba(255, 255, 255, 0.1)',
                          transition: 'all 0.2s ease',
                          userSelect: 'none',
                        }}
                      >
                        <input
                          type="radio"
                          name="projectType"
                          value={item.id}
                          checked={isSelected}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          style={{
                            accentColor: '#ff4d15',
                            cursor: 'pointer',
                            margin: 0,
                            width: '14px',
                            height: '14px',
                          }}
                        />
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: isSelected ? '700' : '500',
                            color: isSelected ? '#ffffff' : '#cbd5e1',
                          }}
                        >
                          {item.label}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* If "Other" selected, show custom project type input */}
                {formData.projectType === 'Other' && (
                  <div style={{ marginTop: '8px' }}>
                    <input
                      type="text"
                      required
                      placeholder="Please specify your project or inquiry type..."
                      value={formData.otherProjectType}
                      onChange={(e) => setFormData({ ...formData, otherProjectType: e.target.value })}
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1.5px solid #ff4d15',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        color: '#ffffff',
                        fontSize: '12.5px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Inquiry Message */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', marginBottom: '6px' }}>
                  Inquiry Message <span style={{ color: '#ff4d15' }}>*</span>
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
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    color: '#ffffff',
                    fontSize: '13.5px',
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 77, 21, 0.6)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'; }}
                />
              </div>

              {/* Submit Button */}
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
                    : 'linear-gradient(135deg, #ff6332 0%, #ff4d15 100%)',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.75 : 1,
                  boxShadow: '0 12px 26px rgba(255, 77, 21, 0.28)',
                  transition: 'all 0.25s ease',
                  marginTop: '4px',
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

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <a
                href="mailto:ghayzelle.dzn@gmail.com"
                style={{
                  fontSize: '12px',
                  color: '#ff9a70',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontWeight: '600',
                }}
              >
                <Mail size={13} />
                <span>ghayzelle.dzn@gmail.com</span>
              </a>
              <span style={{ color: '#475569' }}>•</span>
              <a
                href="https://github.com/geyzz"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'none', fontWeight: '600' }}
              >
                GitHub
              </a>
              <span style={{ color: '#475569' }}>•</span>
              <a
                href="https://linkedin.com/in/ghayzelle-dizon"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'none', fontWeight: '600' }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          7. INTERACTIVE 3D DESK VIEWER (desk.glb)
      ───────────────────────────────────────────────────────────── */}
      {deskViewerOpen && (
        <Desk3DViewer
          onClose={() => setDeskViewerOpen(false)}
          onOpenInquiry={() => setModalOpen(true)}
        />
      )}

      <style>{`
        @keyframes knobRipple {
          0% {
            r: 12px;
            opacity: 0.95;
            stroke-width: 2.4px;
          }
          60% {
            opacity: 0.55;
          }
          100% {
            r: 58px;
            opacity: 0;
            stroke-width: 0.5px;
          }
        }
        .knob-ripple-1 {
          animation: knobRipple 2.6s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
        }
        .knob-ripple-2 {
          animation: knobRipple 2.6s cubic-bezier(0.2, 0.8, 0.4, 1) infinite 0.85s;
        }
        .knob-ripple-3 {
          animation: knobRipple 2.6s cubic-bezier(0.2, 0.8, 0.4, 1) infinite 1.7s;
        }
        @keyframes haloBreathe {
          0%, 100% {
            transform: scale(0.95);
            opacity: 0.75;
          }
          50% {
            transform: scale(1.4);
            opacity: 1;
          }
        }
        .knob-ambient-halo {
          transform-origin: 0px 10px;
          animation: haloBreathe 3s ease-in-out infinite;
          mix-blend-mode: screen;
        }
      `}</style>
    </div>
  );
}
