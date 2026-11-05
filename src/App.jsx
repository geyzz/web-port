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
} from 'lucide-react';
import Desk3DViewer from './components/Desk3DViewer';
import FourPanelWindow from './components/FourPanelWindow';
import MonitorPortfolioWeb from './components/MonitorPortfolioWeb';
import GazedLogo from './components/GazedLogo';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deskViewerOpen, setDeskViewerOpen] = useState(false);
  const [portfolioWebOpen, setPortfolioWebOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [pullPos, setPullPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [stringHovered, setStringHovered] = useState(false);

  // Contact Form State (Matching Web Portfolio Format)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  const containerRef = useRef(null);
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

    const targetEmail = 'ghayzelle.dzn@gmail.com';
    const emailSubject = `[IMPORTANT INQUIRY] Portfolio Inquiry from ${formData.name}`;

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: emailSubject,
          _captcha: 'false',
          _template: 'table',
        }),
      });

      if (!response.ok) {
        throw new Error(`Submission status: ${response.status}`);
      }

      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5500);
    } catch (err) {
      console.warn('FormSubmit network notice, falling back to direct email protocol:', err);
      const mailtoBody = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
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

  // Subtle mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // -10px to +10px
      const y = (e.clientY / innerHeight - 0.5) * 15; // -7.5px to +7.5px
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
          transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px) scale(1.02)`,
          transition: 'transform 0.15s ease-out',
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
          2. ATMOSPHERIC AMBIENT GLOW ON HERO (REDUCED MOVIE-LIKE INTENSITY)
      ───────────────────────────────────────────────────────────── */}
      {lightOn && (
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '5%',
            width: '800px',
            height: '650px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(255, 115, 30, 0.08) 0%, rgba(255, 75, 20, 0.02) 50%, transparent 75%)',
            pointerEvents: 'none',
            zIndex: 10,
            filter: 'blur(70px)',
            mixBlendMode: 'screen',
            transition: 'opacity 0.5s ease',
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
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ position: 'relative', zIndex: 60 }}>
          {/* Glassmorphism Logo Badge */}
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

                    <filter id="fobGlow" x="-250%" y="-250%" width="600%" height="600%">
                      <feDropShadow
                        dx="0" dy="0"
                        stdDeviation={isThresholdReached ? '8' : !lightOn ? '14' : '4'}
                        floodColor={isThresholdReached ? '#ffffff' : !lightOn ? '#ffaa30' : '#ff7728'}
                        floodOpacity={isThresholdReached ? '1' : !lightOn ? '1' : '0.85'}
                      />
                      <feDropShadow
                        dx="0" dy="2"
                        stdDeviation={isThresholdReached ? '18' : !lightOn ? '32' : '8'}
                        floodColor={isThresholdReached ? '#ffb300' : !lightOn ? '#ff5a1e' : '#ff4d15'}
                        floodOpacity={isThresholdReached ? '0.95' : !lightOn ? '0.95' : '0.65'}
                      />
                      <feDropShadow
                        dx="0" dy="3"
                        stdDeviation={isThresholdReached ? '30' : !lightOn ? '56' : '15'}
                        floodColor={isThresholdReached ? '#ff6f00' : !lightOn ? '#ff3d00' : '#e65100'}
                        floodOpacity={isThresholdReached ? '0.8' : !lightOn ? '0.85' : '0.4'}
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

        {/* Navigation Bar (Minimal Entrance - Mobile Adaptive) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 1.5vw, 10px)', flexWrap: 'nowrap' }}>
          {/* Get in Touch Button */}
          <button
            onClick={() => setModalOpen(true)}
            style={{
              padding: '6px clamp(10px, 1.8vw, 16px)',
              backgroundColor: 'rgba(25, 30, 40, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '100px',
              color: '#e0e4ec',
              fontSize: 'clamp(11px, 1.2vw, 12px)',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 77, 21, 0.5)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.backgroundColor = 'rgba(255, 77, 21, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.color = '#e0e4ec';
              e.currentTarget.style.backgroundColor = 'rgba(25, 30, 40, 0.75)';
            }}
          >
            <Mail size={13} color="#ff7728" />
            <span style={{ display: 'inline' }}>Get in Touch</span>
          </button>

          {/* Web Portfolio Preview Button */}
          <button
            onClick={() => setPortfolioWebOpen(true)}
            style={{
              padding: '6px clamp(10px, 1.8vw, 16px)',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.45)',
              borderRadius: '100px',
              color: '#38bdf8',
              fontSize: 'clamp(11px, 1.2vw, 12px)',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0284c7';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.15)';
              e.currentTarget.style.color = '#38bdf8';
            }}
          >
            <Folder size={13} />
            <span>Web Portfolio ↗</span>
          </button>

          {/* 3D Studio Entrance */}
          <button
            onClick={() => setDeskViewerOpen(true)}
            style={{
              padding: '6px clamp(10px, 1.8vw, 16px)',
              backgroundColor: 'rgba(255, 77, 21, 0.15)',
              border: '1px solid rgba(255, 77, 21, 0.45)',
              borderRadius: '100px',
              color: '#ff8a5c',
              fontSize: 'clamp(11px, 1.2vw, 12px)',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ff4d15';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 77, 21, 0.15)';
              e.currentTarget.style.color = '#ff8a5c';
            }}
          >
            <Box size={13} />
            <span>3D Studio ↗</span>
          </button>
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
          marginLeft: 'clamp(0px, 5vw, 100px)',
          padding: 'clamp(20px, 4vh, 40px) clamp(16px, 4vw, 40px)',
          maxWidth: '680px',
        }}
      >
        {/* Candidate Eyebrow */}
        <div
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

        {/* Action Buttons: Enter 3D Studio ↗ & Get in Touch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
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

          <button
            onClick={() => setModalOpen(true)}
            style={{
              padding: '13px 22px',
              backgroundColor: 'rgba(255, 77, 21, 0.12)',
              color: '#ff8a5c',
              border: '1px solid rgba(255, 77, 21, 0.4)',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 16px rgba(255, 77, 21, 0.15)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ff4d15';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 77, 21, 0.12)';
              e.currentTarget.style.color = '#ff8a5c';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Mail size={16} />
            <span>Get in Touch</span>
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
            zIndex: 100,
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
        <div style={{ display: portfolioWebOpen ? 'none' : 'block' }}>
          <Desk3DViewer
            onClose={() => setDeskViewerOpen(false)}
            onOpenPortfolioWeb={() => setPortfolioWebOpen(true)}
            isPaused={portfolioWebOpen}
          />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          8. STANDALONE ONE-PAGE WEB PORTFOLIO (FOR MONITOR INTEGRATION)
      ───────────────────────────────────────────────────────────── */}
      {portfolioWebOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, overflowY: 'auto', backgroundColor: '#ececeb' }}>
          <MonitorPortfolioWeb
            onBackTo3D={() => {
              // Directs to landing page as requested
              setPortfolioWebOpen(false);
              setDeskViewerOpen(false);
            }}
          />
        </div>
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
