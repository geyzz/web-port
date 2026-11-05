import React, { useState } from 'react';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Briefcase,
  Award,
  Laptop,
  FileText,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Layers,
  Code2,
  Maximize2,
  Github
} from 'lucide-react';

export default function ProjectTabletCarousel({
  onClose,
  onSelectStation,
  currentTab = 'portfolio',
  onChangeTab,
  onIndexChange,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const projects = [
    {
      id: 'plan-ed',
      title: 'Plan_.ed - Shopping & Errand Planner App',
      tagline: 'Smart Shopping & Real-Time Errand Management with Alarms',
      type: 'Personal Project • Mobile Application',
      category: 'Mobile App',
      accent: '#ff4d15',
      accentGlow: 'rgba(255, 77, 21, 0.4)',
      accentBg: 'rgba(255, 77, 21, 0.12)',
      shortDesc:
        'Mobile shopping planner featuring custom light/dark themes, collapsible headers, real-time mall cost calculation, and an interactive errand calendar with native reminder alarms.',
      fullOverview:
        'Plan_.ed is a high-performance cross-platform mobile shopping and task planner engineered from scratch. It solves the friction of disorganized errand runs by pairing store-categorized checklists with live cost tracking and an integrated calendar with native alarms.',
      stack: ['React Native', 'Expo', 'Supabase', 'PostgreSQL', 'AsyncStorage', 'EAS Build'],
      highlights: [
        'Designed custom light/dark themes with fluid collapsible headers & tactile haptics.',
        'Created smart shopping checklists with real-time mall cost calculation across 4 major Pampanga shopping malls.',
        'Engineered cloud & offline sync via Supabase and AsyncStorage with optimistic UI updates.',
        'Built native reminder alarms and scheduled push notifications for errand calendar tasks.',
        'Automated CI/CD pipeline shipping standalone Android APK bundles via EAS Build.',
      ],
      mockupType: 'app-planner',
    },
    {
      id: 'cj-real-estate',
      title: 'C&J Real Estate - Property Showcase Website',
      tagline: 'Modern Architectural Property Platform with Dynamic Filters',
      type: 'Personal Project • Web Application',
      category: 'Website',
      accent: '#06b6d4',
      accentGlow: 'rgba(6, 182, 212, 0.4)',
      accentBg: 'rgba(6, 182, 212, 0.12)',
      shortDesc:
        'Single-page real estate property website crafted with a custom brand identity, hero showcase, interactive company overview cards, and dynamic property filter section.',
      fullOverview:
        'C&J Real Estate is a luxury property showcase web platform designed to elevate architectural listings. Built with React and modern CSS3, it combines bespoke typography with smooth animations, search filters, and layered imagery.',
      stack: ['React', 'Vite', 'JavaScript (JSX)', 'CSS3 Flexbox', 'HTML5 Semantic'],
      highlights: [
        'Designed modern brand identity, color schemes, and tailored typography for premium residential listings.',
        'Engineered responsive hero showcase with interactive search filters by price, location, and bedroom count.',
        'Crafted custom CSS3 Flexbox and CSS Grid layouts with glassmorphic property overview cards.',
        'Implemented lazy-loaded high-resolution image galleries and interactive contact inquiry triggers.',
      ],
      mockupType: 'web-realestate',
    },
    {
      id: 'hautogo',
      title: 'HAUtogo - Real-Time Faculty Tracking & Class Management',
      tagline: 'Live University Campus Map & Professor Locator with Geofencing',
      type: 'Collaborative Project • Mobile Application',
      category: 'Mobile App',
      accent: '#a855f7',
      accentGlow: 'rgba(168, 85, 247, 0.4)',
      accentBg: 'rgba(168, 85, 247, 0.12)',
      shortDesc:
        'Campus mobile app for Holy Angel University with an interactive map and sliding panel UI that displays live professor locations, schedules, and one-tap room navigation.',
      fullOverview:
        'HAUtogo is an official university utility app engineered to eliminate missed consultations and class delays. It renders a live GPS-geofenced campus map with real-time professor room availability, automated next-class alerts, and role-based student/faculty dashboards.',
      stack: ['Flutter', 'Dart', 'Supabase', 'flutter_map', 'geolocator', 'PostgreSQL'],
      highlights: [
        'Built campus mobile interface with OpenStreetMap integration using flutter_map and live geolocator pins.',
        'Engineered sliding bottom drawer UI displaying live professor room presence and consultation availability.',
        'Designed role-based weekly schedule views for students and faculty with next-class notifications.',
        'Implemented campus geofencing and complete user authentication with Supabase backend.',
      ],
      mockupType: 'app-campus',
    },
  ];

  const currentProject = projects[currentIndex];

  const handlePrev = (e) => {
    e?.stopPropagation();
    const nextIdx = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    setCurrentIndex(nextIdx);
    setDetailsOpen(false);
    onIndexChange?.(nextIdx);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    const nextIdx = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIdx);
    setDetailsOpen(false);
    onIndexChange?.(nextIdx);
  };

  const handleSetIndex = (idx) => {
    setCurrentIndex(idx);
    setDetailsOpen(false);
    onIndexChange?.(idx);
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        pointerEvents: 'none',
        padding: '16px 20px',
        animation: 'fadeIn 0.25s ease-out',
        overflow: 'hidden',
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. TOP 2026 TOGGLE BAR (TECH STACKS • PORTFOLIO • CERTIFICATION • RESUME)
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 60,
          pointerEvents: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(12, 16, 24, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '100px',
            padding: '5px 8px',
            gap: '4px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 77, 21, 0.2)',
          }}
        >
          {/* Year Badge [ 2026 ] */}
          <div
            style={{
              padding: '6px 14px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '100px',
              fontSize: '11.5px',
              fontWeight: '900',
              letterSpacing: '0.12em',
              color: '#f8fafc',
              border: '1px solid rgba(255, 255, 255, 0.14)',
            }}
          >
            [ 2026 ]
          </div>

          {/* 1. Tech Stacks */}
          <button
            onClick={() => {
              onClose?.();
              onSelectStation?.('techstack');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '100px',
              border: '1px solid transparent',
              backgroundColor: 'transparent',
              color: '#94a3b8',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
          >
            <Laptop size={14} color="#60a5fa" />
            <span>Tech Stacks</span>
          </button>

          {/* 2. Portfolio (ACTIVE) */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: '100px',
              border: '1px solid #ff4d15',
              backgroundColor: 'rgba(255, 77, 21, 0.24)',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'default',
              boxShadow: '0 0 16px rgba(255, 77, 21, 0.4)',
            }}
          >
            <Briefcase size={14} color="#ff7728" />
            <span>Portfolio</span>
          </button>

          {/* 3. Certification */}
          <button
            onClick={() => {
              onChangeTab?.('certificates');
              onClose?.();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '100px',
              border: '1px solid transparent',
              backgroundColor: 'transparent',
              color: '#94a3b8',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
          >
            <Award size={14} color="#22d3ee" />
            <span>Certification</span>
          </button>

          {/* 4. Resume */}
          <button
            onClick={() => {
              onClose?.();
              onSelectStation?.('resume');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '100px',
              border: '1px solid transparent',
              backgroundColor: 'transparent',
              color: '#94a3b8',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
          >
            <FileText size={14} color="#34d399" />
            <span>Resume</span>
          </button>
        </div>

        {/* Back to Folder Button */}
        <button
          onClick={onClose}
          title="Return to Folder View on Monitor"
          style={{
            padding: '7px 16px',
            borderRadius: '100px',
            backgroundColor: 'rgba(15, 20, 30, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#cbd5e1',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '700',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ff4d15';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(15, 20, 30, 0.9)';
            e.currentTarget.style.color = '#cbd5e1';
          }}
        >
          <Layers size={13} />
          <span>Folder</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. THE CAROUSEL CONTAINER (DIV > TABLET > TITLE > SHORT DESC > VIEW)
      ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '880px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '55px',
          pointerEvents: 'auto',
        }}
      >
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          aria-label="Previous Project"
          style={{
            position: 'absolute',
            left: '-60px',
            top: '42%',
            transform: 'translateY(-50%)',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(15, 20, 30, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f8fafc',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            zIndex: 60,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = currentProject.accent;
            e.currentTarget.style.borderColor = currentProject.accent;
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(15, 20, 30, 0.95)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          aria-label="Next Project"
          style={{
            position: 'absolute',
            right: '-60px',
            top: '42%',
            transform: 'translateY(-50%)',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'rgba(15, 20, 30, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f8fafc',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            zIndex: 60,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = currentProject.accent;
            e.currentTarget.style.borderColor = currentProject.accent;
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(15, 20, 30, 0.95)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <ChevronRight size={24} />
        </button>

        {/* ── THE PROJECT DIV ────────────────────────────────────────── */}
        <div
          key={currentProject.id}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            animation: 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* 1. TABLET IN LANDSCAPE FORM */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '740px',
              height: '400px',
              backgroundColor: '#121620',
              borderRadius: '26px',
              padding: '12px',
              border: `2px solid ${currentProject.accent}`,
              boxShadow: `0 24px 60px rgba(0, 0, 0, 0.85), 0 0 45px ${currentProject.accentGlow}`,
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              marginBottom: '18px',
            }}
          >
            {/* Tablet Camera Pinhole on top bezel */}
            <div
              style={{
                position: 'absolute',
                top: '5px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '6px',
                height: '6px',
                backgroundColor: '#262d3d',
                borderRadius: '50%',
                border: '1px solid #3b4252',
              }}
            />

            {/* Tablet Inner Glass Screen */}
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#0a0d14',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Tablet Top Status Bar */}
              <div
                style={{
                  height: '24px',
                  backgroundColor: 'rgba(15, 20, 30, 0.95)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 16px',
                  fontSize: '11px',
                  color: '#94a3b8',
                  fontFamily: 'monospace',
                }}
              >
                <span>9:41 AM • Landscape Tablet Preview</span>
                <span style={{ color: currentProject.accent, fontWeight: '700' }}>
                  {currentProject.category.toUpperCase()}
                </span>
                <span>Wi-Fi • 100% 🔋</span>
              </div>

              {/* Tablet Screen Mockup Content */}
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                {/* ── MOCKUP 1: Plan_.ed ── */}
                {currentProject.mockupType === 'app-planner' && (
                  <div
                    style={{
                      height: '100%',
                      display: 'grid',
                      gridTemplateColumns: '1.2fr 1fr',
                      backgroundColor: '#0b0f19',
                    }}
                  >
                    {/* Left: Shopping Checklist Column */}
                    <div
                      style={{
                        padding: '16px 20px',
                        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div>
                          <div style={{ fontSize: '10px', color: '#ff7728', fontWeight: '800', letterSpacing: '0.08em' }}>
                            SM CLARK MALL RUN
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: '900', color: '#fff' }}>Plan_.ed Checklist</div>
                        </div>
                        <div
                          style={{
                            padding: '3px 10px',
                            backgroundColor: 'rgba(255, 77, 21, 0.2)',
                            borderRadius: '100px',
                            fontSize: '11px',
                            color: '#ff8a5c',
                            fontWeight: '700',
                          }}
                        >
                          Total: ₱4,820.00
                        </div>
                      </div>

                      {/* Items */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                          { item: 'Ergonomic Desk Mat (Gray)', store: 'Miniso SM Clark', price: '₱499.00', checked: true },
                          { item: 'Keychron Low-Profile Switches', store: 'DataBlitz Nepo', price: '₱1,850.00', checked: true },
                          { item: 'Type-C Coiled Cable', store: 'Octagon Computer', price: '₱680.00', checked: false },
                          { item: 'Nordic Ceramic Mug', store: 'Muji SM Clark', price: '₱450.00', checked: false },
                        ].map((row, i) => (
                          <div
                            key={i}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 12px',
                              backgroundColor: row.checked ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.06)',
                              borderRadius: '8px',
                              border: '1px solid rgba(255,255,255,0.06)',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <CheckCircle2 size={14} color={row.checked ? '#ff4d15' : '#475569'} />
                              <div>
                                <div style={{ fontSize: '12px', color: row.checked ? '#94a3b8' : '#ffffff', textDecoration: row.checked ? 'line-through' : 'none' }}>
                                  {row.item}
                                </div>
                                <div style={{ fontSize: '10px', color: '#64748b' }}>{row.store}</div>
                              </div>
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: '700', color: row.checked ? '#94a3b8' : '#ff9d5c' }}>
                              {row.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Calendar Alarm & Mall Route */}
                    <div style={{ padding: '16px 20px', backgroundColor: '#0e1422', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={14} color="#ff4d15" />
                        <span>Scheduled Errand Alarm</span>
                      </div>
                      <div
                        style={{
                          padding: '12px',
                          backgroundColor: 'rgba(255, 77, 21, 0.15)',
                          border: '1px solid rgba(255, 77, 21, 0.4)',
                          borderRadius: '10px',
                        }}
                      >
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#ffb58a' }}>Tomorrow at 2:30 PM</div>
                        <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '2px' }}>
                          "Pick up Keychron switches before store closing at Nepo Mall"
                        </div>
                        <div style={{ marginTop: '8px', fontSize: '10px', color: '#ff7728', fontWeight: '700' }}>
                          ✓ Native Alarm Armed • Sound Active
                        </div>
                      </div>

                      {/* Mall Directory Tag */}
                      <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '700', marginTop: '4px' }}>
                        4 Pampanga Malls Directory Linked:
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                        {['SM City Clark', 'Marquee Mall', 'Nepo Mall', "Robinsons Starmills"].map((m) => (
                          <div
                            key={m}
                            style={{
                              padding: '6px 8px',
                              backgroundColor: 'rgba(255,255,255,0.05)',
                              borderRadius: '6px',
                              fontSize: '10px',
                              color: '#e2e8f0',
                              textAlign: 'center',
                            }}
                          >
                            {m}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── MOCKUP 2: C&J Real Estate ── */}
                {currentProject.mockupType === 'web-realestate' && (
                  <div
                    style={{
                      height: '100%',
                      backgroundColor: '#0a101d',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Website Navbar */}
                    <div
                      style={{
                        padding: '10px 24px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '18px', height: '18px', backgroundColor: '#06b6d4', borderRadius: '4px' }} />
                        <span style={{ fontSize: '13px', fontWeight: '900', color: '#fff', letterSpacing: '0.04em' }}>
                          C&J REAL ESTATE
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#94a3b8' }}>
                        <span style={{ color: '#06b6d4', fontWeight: '700' }}>Properties</span>
                        <span>Developments</span>
                        <span>About</span>
                        <span>Contact</span>
                      </div>
                    </div>

                    {/* Hero Section */}
                    <div style={{ padding: '16px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ fontSize: '11px', color: '#22d3ee', fontWeight: '800', letterSpacing: '0.1em' }}>
                        MODERN SANCTUARIES IN CENTRAL LUZON
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: '900', color: '#ffffff', margin: '4px 0 10px' }}>
                        Find Your Ideal Architectural Home
                      </div>

                      {/* 3 Property Cards */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                        {[
                          { title: 'The Glass Pavilion Villa', loc: 'Angeles City', price: '₱14.8M', specs: '4 Beds • 5 Baths' },
                          { title: 'Nordic Horizon Residence', loc: 'Clark Freeport', price: '₱22.5M', specs: '5 Beds • 6 Baths' },
                          { title: 'Minimalist Courtyard House', loc: 'San Fernando', price: '₱11.2M', specs: '3 Beds • 3 Baths' },
                        ].map((card, idx) => (
                          <div
                            key={idx}
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(6, 182, 212, 0.3)',
                              borderRadius: '10px',
                              padding: '12px',
                              textAlign: 'left',
                            }}
                          >
                            <div style={{ height: '70px', backgroundColor: '#162235', borderRadius: '6px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', fontSize: '11px' }}>
                              [ Property Gallery ]
                            </div>
                            <div style={{ fontSize: '12px', fontWeight: '800', color: '#fff' }}>{card.title}</div>
                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>{card.loc} • {card.specs}</div>
                            <div style={{ fontSize: '12px', fontWeight: '900', color: '#22d3ee', marginTop: '4px' }}>
                              {card.price}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── MOCKUP 3: HAUtogo ── */}
                {currentProject.mockupType === 'app-campus' && (
                  <div
                    style={{
                      height: '100%',
                      backgroundColor: '#0c0e18',
                      display: 'grid',
                      gridTemplateColumns: '1.4fr 1fr',
                    }}
                  >
                    {/* Campus Map View */}
                    <div style={{ position: 'relative', backgroundColor: '#131826', overflow: 'hidden' }}>
                      {/* Grid Roads */}
                      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.25 }}>
                        <line x1="0" y1="80" x2="500" y2="80" stroke="#a855f7" strokeWidth="6" />
                        <line x1="0" y1="220" x2="500" y2="220" stroke="#a855f7" strokeWidth="4" />
                        <line x1="180" y1="0" x2="180" y2="400" stroke="#a855f7" strokeWidth="6" />
                        <line x1="320" y1="0" x2="320" y2="400" stroke="#a855f7" strokeWidth="4" />
                      </svg>

                      {/* Campus Building Rectangles */}
                      <div style={{ position: 'absolute', top: '30px', left: '30px', width: '100px', height: '60px', backgroundColor: '#20293d', borderRadius: '6px', border: '1px solid #3d4a68', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', fontSize: '10px', fontWeight: '700' }}>
                        SJH Building
                      </div>
                      <div style={{ position: 'absolute', top: '120px', left: '50px', width: '90px', height: '80px', backgroundColor: '#20293d', borderRadius: '6px', border: '1px solid #3d4a68', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', fontSize: '10px', fontWeight: '700' }}>
                        MGN Hall
                      </div>
                      <div style={{ position: 'absolute', top: '120px', left: '220px', width: '80px', height: '70px', backgroundColor: '#20293d', borderRadius: '6px', border: '1px solid #3d4a68', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', fontSize: '10px', fontWeight: '700' }}>
                        STL Lab
                      </div>

                      {/* Live GPS Pin with Pulsing Circle */}
                      <div style={{ position: 'absolute', top: '65px', left: '165px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: '16px', height: '16px', backgroundColor: '#a855f7', borderRadius: '50%', boxShadow: '0 0 16px #a855f7', border: '2px solid #ffffff' }} />
                        <div style={{ backgroundColor: '#1e1b4b', padding: '2px 6px', borderRadius: '4px', border: '1px solid #a855f7', fontSize: '9px', color: '#e9d5ff', fontWeight: '800' }}>
                          Engr. Dizon (LIVE)
                        </div>
                      </div>

                      <div style={{ position: 'absolute', bottom: '12px', left: '16px', fontSize: '10px', color: '#a855f7', fontWeight: '800' }}>
                        ● GPS GEOFENCE: ACTIVE (HAU Main Campus)
                      </div>
                    </div>

                    {/* Right: Professor Consultation Card */}
                    <div style={{ padding: '16px 20px', backgroundColor: '#101422', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '10px', color: '#c084fc', fontWeight: '800', letterSpacing: '0.08em' }}>
                          FACULTY SCHEDULE TRACKER
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: '900', color: '#ffffff', marginTop: '2px' }}>
                          Ghayzelle Dizon
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>Computer Science • Faculty</div>

                        <div
                          style={{
                            marginTop: '12px',
                            padding: '10px 12px',
                            backgroundColor: 'rgba(168, 85, 247, 0.16)',
                            border: '1px solid rgba(168, 85, 247, 0.4)',
                            borderRadius: '8px',
                          }}
                        >
                          <div style={{ fontSize: '11px', color: '#d8b4fe', fontWeight: '800' }}>
                            Currently at: SJH 402 Lab
                          </div>
                          <div style={{ fontSize: '10px', color: '#cbd5e1', marginTop: '2px' }}>
                            Status: Available for Student Consultations
                          </div>
                          <div style={{ fontSize: '10px', color: '#a855f7', marginTop: '6px', fontWeight: '700' }}>
                            Next Class: CS301 (2:00 PM - STL 204)
                          </div>
                        </div>
                      </div>

                      <button
                        style={{
                          padding: '8px',
                          backgroundColor: '#a855f7',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: '800',
                          fontSize: '11px',
                          cursor: 'pointer',
                        }}
                      >
                        Navigate to Room SJH 402 ↗
                      </button>
                    </div>
                  </div>
                )}
                {/* ── IN-TABLET SLIDE-UP DETAILS SHEET (STRICTLY IN THE TABLET, 0 POPUPS) ── */}
                {detailsOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(8, 11, 18, 0.96)',
                      backdropFilter: 'blur(12px)',
                      padding: '16px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      zIndex: 30,
                      animation: 'slideUp 0.22s ease-out',
                      textAlign: 'left',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: '800',
                            letterSpacing: '0.1em',
                            color: currentProject.accent,
                            textTransform: 'uppercase',
                          }}
                        >
                          {currentProject.type}
                        </span>
                        <button
                          onClick={() => setDetailsOpen(false)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: 'none',
                            color: '#cbd5e1',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <X size={14} />
                        </button>
                      </div>

                      <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#fff', margin: '0 0 5px 0' }}>
                        {currentProject.title}
                      </h3>
                      <p style={{ fontSize: '11.5px', color: '#cbd5e1', lineHeight: 1.45, margin: '0 0 10px 0' }}>
                        {currentProject.fullOverview}
                      </p>

                      <div style={{ fontSize: '10.5px', fontWeight: '800', color: currentProject.accent, letterSpacing: '0.06em', marginBottom: '5px' }}>
                        TECHNICAL HIGHLIGHTS
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' }}>
                        {currentProject.highlights.slice(0, 3).map((h, i) => (
                          <div key={i} style={{ fontSize: '11px', color: '#e2e8f0', lineHeight: 1.35 }}>
                            <span style={{ color: currentProject.accent, marginRight: '6px' }}>•</span>
                            {h}
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {currentProject.stack.map((s) => (
                          <span
                            key={s}
                            style={{
                              fontSize: '10px',
                              padding: '2px 8px',
                              backgroundColor: 'rgba(255, 255, 255, 0.06)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '4px',
                              color: '#94a3b8',
                              fontWeight: '600',
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <a
                        href="https://github.com/geyzz"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '7px 14px',
                          backgroundColor: currentProject.accent,
                          color: '#ffffff',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '800',
                          textDecoration: 'none',
                        }}
                      >
                        <Github size={13} />
                        <span>Source Code</span>
                      </a>
                      <button
                        onClick={() => setDetailsOpen(false)}
                        style={{
                          padding: '7px 14px',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          border: 'none',
                          color: '#ffffff',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        Back to Screen
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 2. TITLE */}
          <h2
            style={{
              fontSize: '22px',
              fontWeight: '900',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              margin: '0 0 4px 0',
            }}
          >
            {currentProject.title}
          </h2>

          {/* 3. SHORT DESC */}
          <p
            style={{
              fontSize: '13px',
              color: '#94a3b8',
              lineHeight: 1.45,
              maxWidth: '660px',
              margin: '0 0 14px 0',
            }}
          >
            {currentProject.shortDesc}
          </p>

          {/* 4. THEN VIEW */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setDetailsOpen((prev) => !prev)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 22px',
                backgroundColor: currentProject.accent,
                color: '#ffffff',
                borderRadius: '100px',
                border: 'none',
                fontWeight: '800',
                fontSize: '12.5px',
                cursor: 'pointer',
                boxShadow: `0 8px 24px ${currentProject.accentGlow}`,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <span>{detailsOpen ? 'Hide Details' : 'View Project'}</span>
              <ExternalLink size={14} />
            </button>

            {/* Back to Folder Button */}
            <button
              onClick={onClose}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 18px',
                backgroundColor: 'rgba(15, 20, 30, 0.9)',
                color: '#cbd5e1',
                borderRadius: '100px',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                fontWeight: '700',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(15, 20, 30, 0.9)';
                e.currentTarget.style.color = '#cbd5e1';
              }}
            >
              <Layers size={13} />
              <span>Folder View</span>
            </button>

            {/* Pagination Indicator Dots */}
            <div style={{ display: 'flex', gap: '6px', marginLeft: '6px' }}>
              {projects.map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => handleSetIndex(idx)}
                  style={{
                    width: idx === currentIndex ? '24px' : '7px',
                    height: '7px',
                    borderRadius: '100px',
                    backgroundColor: idx === currentIndex ? currentProject.accent : 'rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
