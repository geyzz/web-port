import React, { useState } from 'react';

// FourPanelWindow
export default function FourPanelWindow({
  isLit = false,
  lightOn = true,
  isHalf = false,
  ambientType = null,
  onClick,
  style = {},
}) {
  const [hovered, setHovered] = useState(false);
  const isGlowing = isLit && lightOn;

  // Architectural Half-Window
  if (isHalf) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4.1 / 1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}
      >
        <svg
          viewBox="0 0 320 80"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            overflow: 'visible',
          }}
        >
          <defs>
            <linearGradient id="halfDarkGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#141820" />
              <stop offset="40%" stopColor="#0c0e13" />
              <stop offset="100%" stopColor="#06080a" />
            </linearGradient>
            <linearGradient id="halfGlassReflection" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.12)" />
              <stop offset="40%" stopColor="rgba(255, 255, 255, 0.03)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
            </linearGradient>
          </defs>

          {/* Shadow under sill */}
          <rect x="10" y="74" width="300" height="5" rx="1" fill="#05070a" opacity="0.8" />
          {/* Main Sill */}
          <rect x="12" y="68" width="296" height="8" rx="1" fill="#333b47" stroke="#222830" strokeWidth="0.8" />
          {/* Outer Window Casing Frame */}
          <rect x="18" y="6" width="284" height="64" rx="1.5" fill="#252c37" stroke="#1a2028" strokeWidth="1.2" />
          {/* Inner Frame Reveal */}
          <rect x="24" y="10" width="272" height="56" fill="#0a0d12" stroke="#000000" strokeWidth="1.5" />

          {/* Dark Glass */}
          <rect x="24" y="10" width="272" height="56" fill="url(#halfDarkGlass)" />

          {/* 3 Vertical Mullions */}
          <rect x="90" y="10" width="5" height="56" fill="#2b333f" stroke="#181d24" strokeWidth="0.8" />
          <rect x="158" y="10" width="5" height="56" fill="#2b333f" stroke="#181d24" strokeWidth="0.8" />
          <rect x="226" y="10" width="5" height="56" fill="#2b333f" stroke="#181d24" strokeWidth="0.8" />

          {/* Pane sash inner borders */}
          <rect x="25" y="11" width="64" height="54" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <rect x="96" y="11" width="61" height="54" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <rect x="164" y="11" width="61" height="54" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <rect x="232" y="11" width="63" height="54" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

          {/* Diagonal Glass Sheen */}
          <polygon points="24,10 90,10 50,66 24,66" fill="url(#halfGlassReflection)" pointerEvents="none" />
          <polygon points="120,10 190,10 150,66 100,66" fill="url(#halfGlassReflection)" pointerEvents="none" />
        </svg>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '2.05 / 1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isLit ? 'pointer' : 'default',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        ...style,
      }}
    >
      <svg
        viewBox="0 0 320 156"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          overflow: 'visible',
          filter: isGlowing
            ? 'drop-shadow(0 0 16px rgba(255, 100, 20, 0.35))'
            : hovered
            ? 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.08))'
            : 'none',
          transition: 'filter 0.35s ease',
        }}
      >
        <defs>
          {/* Glass diagonal specular reflections */}
          <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.14)" />
            <stop offset="30%" stopColor="rgba(255, 255, 255, 0.04)" />
            <stop offset="65%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.06)" />
          </linearGradient>

          {/* Dark glass reflection for unlit windows */}
          <linearGradient id="darkGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#141820" />
            <stop offset="40%" stopColor="#0c0e13" />
            <stop offset="100%" stopColor="#06080a" />
          </linearGradient>

          {/* Exterior wall accent dot glow */}
          <radialGradient id="exteriorAccentGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffb347" stopOpacity="1" />
            <stop offset="40%" stopColor="#ff7a18" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#ff4d00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff4d00" stopOpacity="0" />
          </radialGradient>

          {/* Lit window interior & beam defs (rendered ONLY when lit to eliminate overhead) */}
          {isGlowing && (
            <>
              <linearGradient id="warmInteriorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffb04a" />
                <stop offset="35%" stopColor="#ff7a18" />
                <stop offset="70%" stopColor="#cc4808" />
                <stop offset="100%" stopColor="#551502" />
              </linearGradient>

              <pattern id="slatWoodPattern" width="6" height="156" patternUnits="userSpaceOnUse">
                <rect width="3.5" height="156" fill="#7a421b" />
                <rect x="3.5" width="2.5" height="156" fill="#1c0f08" />
              </pattern>

              <radialGradient id="deskLampGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="25%" stopColor="#fff2ba" stopOpacity="0.95" />
                <stop offset="55%" stopColor="#ff9a28" stopOpacity="0.65" />
                <stop offset="85%" stopColor="#ff5a0a" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ff4000" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="deskLightPool" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#fff8e8" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#ffaa30" stopOpacity="0.5" />
                <stop offset="80%" stopColor="#c85010" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#702005" stopOpacity="0" />
              </radialGradient>

              <linearGradient id="monitorScreenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d8e8ff" />
                <stop offset="60%" stopColor="#609eff" />
                <stop offset="100%" stopColor="#2255a4" />
              </linearGradient>

              <linearGradient id="windowVolumetricBeam" x1="90%" y1="15%" x2="0%" y2="75%">
                <stop offset="0%" stopColor="#ffb540" stopOpacity="0.42" />
                <stop offset="25%" stopColor="#ff7a18" stopOpacity="0.24" />
                <stop offset="55%" stopColor="#d9480f" stopOpacity="0.10" />
                <stop offset="85%" stopColor="#9a2808" stopOpacity="0.02" />
                <stop offset="100%" stopColor="#661502" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="windowAmbientSpill" x1="90%" y1="15%" x2="0%" y2="80%">
                <stop offset="0%" stopColor="#ff9a28" stopOpacity="0.22" />
                <stop offset="35%" stopColor="#ff5710" stopOpacity="0.09" />
                <stop offset="75%" stopColor="#cc3500" stopOpacity="0.02" />
                <stop offset="100%" stopColor="#7a1800" stopOpacity="0" />
              </linearGradient>

              <filter id="beamBlurFilter" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="8" />
              </filter>

              <filter id="softSpillBlurFilter" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="20" />
              </filter>
            </>
          )}

          {ambientType === 'cyanOffice' && (
            <radialGradient id="cyanAmbientGlow" cx="45%" cy="55%" r="60%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.28" />
              <stop offset="45%" stopColor="#0284c7" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
            </radialGradient>
          )}
          {ambientType === 'warmDesk' && (
            <radialGradient id="warmAmbientGlow" cx="65%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.24" />
              <stop offset="45%" stopColor="#d97706" stopOpacity="0.11" />
              <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
            </radialGradient>
          )}
          {ambientType === 'softIndigo' && (
            <radialGradient id="indigoAmbientGlow" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.22" />
              <stop offset="45%" stopColor="#4f46e5" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#3730a3" stopOpacity="0" />
            </radialGradient>
          )}
        </defs>

        {/*
            1. PROJECTING BOTTOM WINDOW SILL (White / Light Architectural)
        */}
        {/* Shadow under the sill */}
        <rect
          x="10"
          y="148"
          width="300"
          height="6"
          rx="1"
          fill="#05070a"
          opacity="0.8"
        />
        {/* Main Sill */}
        <rect
          x="12"
          y="142"
          width="296"
          height="8"
          rx="1"
          fill={isGlowing ? '#eeddcc' : '#333b47'}
          stroke={isGlowing ? '#ffc288' : '#222830'}
          strokeWidth="0.8"
        />

        {/*
            2. OUTER WINDOW CASING FRAME (White Vinyl / Architectural Trim)
        */}
        <rect
          x="18"
          y="10"
          width="284"
          height="133"
          rx="1.5"
          fill={isGlowing ? '#e5d7c8' : hovered ? '#2d3747' : '#252c37'}
          stroke={isGlowing ? '#ffbe80' : hovered ? 'rgba(255, 255, 255, 0.35)' : '#1a2028'}
          strokeWidth={hovered ? 1.6 : 1.2}
          style={{ transition: 'all 0.25s ease' }}
        />

        {/* Inner Frame Reveal / Recess */}
        <rect
          x="24"
          y="16"
          width="272"
          height="121"
          fill="#0a0d12"
          stroke="#000000"
          strokeWidth="1.5"
        />

        {/*
            3. WINDOW INTERIOR CONTENT (PANE 1, 2, 3, 4)
        */}
        {isGlowing ? (
          <g>
            {/* Base Warm Room Atmosphere */}
            <rect x="24" y="16" width="272" height="121" fill="url(#warmInteriorGrad)" />

            {/* Back Wall Slat Wood Paneling behind monitor */}
            <rect x="68" y="16" width="180" height="90" fill="url(#slatWoodPattern)" opacity="0.65" />

            {/* Upper Ceiling Cove Warm Light Glow */}
            <rect x="24" y="16" width="272" height="16" fill="#fff5d8" opacity="0.45" />

            {/* Floating Shelves Silhouettes */}
            {/* Left shelf */}
            <rect x="35" y="38" width="55" height="4" rx="1" fill="#1b120c" />
            <rect x="42" y="24" width="8" height="14" fill="#2d4d38" /> {/* Green vase */}
            <rect x="52" y="22" width="6" height="16" fill="#182230" /> {/* Smoked glass */}

            {/* Right shelf (above desk) */}
            <rect x="180" y="44" width="75" height="4" rx="1" fill="#1b120c" />
            <rect x="190" y="32" width="7" height="12" rx="1" fill="#1a1c21" /> {/* Black Nordic vase */}
            <rect x="199" y="30" width="8" height="14" rx="1" fill="#244d73" /> {/* Dusty blue vase */}
            {/* Shelf books */}
            <rect x="212" y="26" width="5" height="18" fill="#822f1e" />
            <rect x="218" y="24" width="6" height="20" fill="#2b4257" />
            <rect x="225" y="27" width="5" height="17" fill="#9a6538" />

            {/* Ultrawide Monitor in Center-Left */}
            <rect x="80" y="58" width="68" height="34" rx="2" fill="#12151b" stroke="#080a0e" strokeWidth="1.5" />
            {/* Screen Display (Windows Blue Desktop Bloom) */}
            <rect x="82" y="60" width="64" height="30" rx="1" fill="url(#monitorScreenGlow)" opacity="0.9" />
            {/* Monitor Stand */}
            <rect x="111" y="92" width="6" height="14" fill="#0c0e12" />
            <rect x="102" y="104" width="24" height="3" rx="1" fill="#0c0e12" />

            {/* The L-Shaped Desk Surface */}
            <polygon
              points="24,115 150,115 220,105 296,105 296,137 24,137"
              fill="#221108"
            />
            {/* Desk Wood Bevel Edge Highlight */}
            <polyline
              points="24,115 150,115 220,105 296,105"
              fill="none"
              stroke="#8a4d20"
              strokeWidth="2"
            />

            {/* Study Desk Lamp & Bright Pool of Light (As in Image 1!) */}
            {/* Desk Light Pool on Desk surface & papers */}
            <ellipse cx="232" cy="118" rx="42" ry="18" fill="url(#deskLightPool)" />

            {/* White papers on desk */}
            <polygon points="215,116 242,113 246,126 219,129" fill="#faf7f0" opacity="0.95" />
            <polygon points="205,119 228,117 232,127 209,129" fill="#e2dbcf" opacity="0.85" />

            {/* Table Lamp Hardware */}
            {/* Round wooden base */}
            <ellipse cx="248" cy="118" rx="8" ry="3.5" fill="#a4683c" />
            {/* Black curved metal rod */}
            <path
              d="M 248 116 L 250 85 Q 250 78 243 78 L 236 82"
              fill="none"
              stroke="#111317"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Bulb socket */}
            <rect x="233" y="80" width="6" height="5" rx="1" fill="#111317" />
            {/* Radiant Lamp Bulb */}
            <ellipse cx="236" cy="88" rx="18" ry="18" fill="url(#deskLampGlow)" />
            <circle cx="236" cy="88" r="4.5" fill="#ffffff" />

            {/* Ceramic Mug on Coaster */}
            <ellipse cx="178" cy="116" rx="4.5" ry="2" fill="#9e663a" /> {/* Coaster */}
            <rect x="175" y="108" width="6" height="7" rx="1" fill="#6f9b94" /> {/* Pastel sage mug */}
            <rect x="175" y="113" width="6" height="2.5" fill="#ad6e3d" /> {/* Clay base */}

            {/*
                CURTAINS MATCHING IMAGE 1 (Draped on Left and Right)
             */}
            {/* LEFT CURTAIN DRAPES */}
            {/* Main curtain body with vertical ripple folds */}
            <path
              d="
                M 24 16
                L 68 16
                Q 66 50 63 80
                Q 68 110 65 137
                L 24 137
                Z
              "
              fill="#2a221b"
            />
            {/* Ripple fold warm highlights */}
            <path
              d="
                M 34 16
                Q 37 60 35 100
                Q 38 120 36 137
              "
              fill="none"
              stroke="#8a7c6e"
              strokeWidth="4"
              opacity="0.85"
            />
            <path
              d="
                M 48 16
                Q 52 55 49 95
                Q 53 115 50 137
              "
              fill="none"
              stroke="#9e8f7f"
              strokeWidth="5"
              opacity="0.9"
            />
            <path
              d="
                M 60 16
                Q 64 50 61 85
                Q 65 110 62 137
              "
              fill="none"
              stroke="#c2b39f"
              strokeWidth="4.5"
              opacity="0.95"
            />

            {/* RIGHT CURTAIN DRAPES */}
            <path
              d="
                M 258 16
                L 296 16
                L 296 137
                L 255 137
                Q 258 105 254 75
                Q 257 45 258 16
                Z
              "
              fill="#2b231c"
            />
            {/* Right curtain ripple folds catching lamp light */}
            <path
              d="
                M 262 16
                Q 260 55 264 90
                Q 261 115 263 137
              "
              fill="none"
              stroke="#dfcfbc"
              strokeWidth="5"
              opacity="0.95"
            />
            <path
              d="
                M 276 16
                Q 273 50 277 85
                Q 274 110 275 137
              "
              fill="none"
              stroke="#a69786"
              strokeWidth="4.5"
              opacity="0.85"
            />
            <path
              d="
                M 288 16
                Q 286 50 289 90
                Q 287 115 288 137
              "
              fill="none"
              stroke="#7a6e60"
              strokeWidth="3.5"
              opacity="0.75"
            />
          </g>
        ) : (
          /* Unlit Window interior */
          <g>
            <rect x="24" y="16" width="272" height="121" fill="url(#darkGlass)" />

            {/* Selected Windows with Subtle Light Animations */}
            {ambientType === 'cyanOffice' && (
              <g className="screen-glow">
                <rect x="24" y="16" width="272" height="121" fill="url(#cyanAmbientGlow)" />
                {/* Silhouette of a distant glowing desktop monitor */}
                <rect x="110" y="66" width="46" height="24" rx="2" fill="#38bdf8" opacity="0.35" />
                <rect x="112" y="68" width="42" height="20" rx="1" fill="#bae6fd" opacity="0.45" />
                <line x1="133" y1="90" x2="133" y2="102" stroke="#1e293b" strokeWidth="2.5" />
              </g>
            )}

            {ambientType === 'warmDesk' && (
              <g style={{ animation: 'windowPulse 5s ease-in-out infinite alternate' }}>
                <rect x="24" y="16" width="272" height="121" fill="url(#warmAmbientGlow)" />
                {/* Silhouette of a warm desk lamp */}
                <circle cx="210" cy="74" r="18" fill="#fef08a" opacity="0.22" />
                <circle cx="210" cy="74" r="6" fill="#fde047" opacity="0.45" />
              </g>
            )}

            {ambientType === 'softIndigo' && (
              <g style={{ animation: 'screenFlicker 6s ease-in-out infinite' }}>
                <rect x="24" y="16" width="272" height="121" fill="url(#indigoAmbientGlow)" />
                {/* Subtle shelf glow */}
                <rect x="45" y="34" width="70" height="3" rx="1" fill="#c7d2fe" opacity="0.32" />
              </g>
            )}

            {/* Subtle curtain silhouettes even in the dark */}
            <path d="M 24 16 L 55 16 L 50 137 L 24 137 Z" fill="#080b0f" opacity="0.8" />
            <path d="M 268 16 L 296 16 L 296 137 L 265 137 Z" fill="#080b0f" opacity="0.8" />
            {/* Faint interior desk horizon */}
            <line x1="24" y1="118" x2="296" y2="118" stroke="#10151e" strokeWidth="2" />
          </g>
        )}

        {/* 
            4. THE 4 VERTICAL CASEMENT PANES & DIVIDING MULLIONS
               (Pane 1: x=24..90, Pane 2: x=94..160, Pane 3: x=164..230, Pane 4: x=234..296)
         */}
        {/* Vertical Mullion 1 (Between Pane 1 and 2) */}
        <rect
          x="90"
          y="16"
          width="5"
          height="121"
          fill={isGlowing ? '#eeddcc' : '#2b333f'}
          stroke={isGlowing ? '#c8b49e' : '#181d24'}
          strokeWidth="0.8"
        />

        {/* Vertical Mullion 2 */}
        <rect
          x="158"
          y="16"
          width="5"
          height="121"
          fill={isGlowing ? '#eeddcc' : '#2b333f'}
          stroke={isGlowing ? '#c8b49e' : '#181d24'}
          strokeWidth="0.8"
        />

        {/* Vertical Mullion 3 */}
        <rect
          x="226"
          y="16"
          width="5"
          height="121"
          fill={isGlowing ? '#eeddcc' : '#2b333f'}
          stroke={isGlowing ? '#c8b49e' : '#181d24'}
          strokeWidth="0.8"
        />

        {/* Individual pane sash inner borders for realism */}
        <rect x="25" y="17" width="64" height="119" fill="none" stroke={isGlowing ? 'rgba(255,200,140,0.25)' : 'rgba(255,255,255,0.03)'} strokeWidth="1" />
        <rect x="96" y="17" width="61" height="119" fill="none" stroke={isGlowing ? 'rgba(255,200,140,0.25)' : 'rgba(255,255,255,0.03)'} strokeWidth="1" />
        <rect x="164" y="17" width="61" height="119" fill="none" stroke={isGlowing ? 'rgba(255,200,140,0.25)' : 'rgba(255,255,255,0.03)'} strokeWidth="1" />
        <rect x="232" y="17" width="63" height="119" fill="none" stroke={isGlowing ? 'rgba(255,200,140,0.25)' : 'rgba(255,255,255,0.03)'} strokeWidth="1" />

        {/* Glass Surface Diagonal Sheen Overlay */}
        <polygon
          points="24,16 110,16 60,137 24,137"
          fill="url(#glassReflection)"
          opacity={hovered ? 0.95 : 0.65}
          pointerEvents="none"
          style={{ transition: 'opacity 0.25s ease' }}
        />
        <polygon
          points="130,16 220,16 170,137 115,137"
          fill="url(#glassReflection)"
          opacity={hovered ? 0.95 : 0.65}
          pointerEvents="none"
          style={{ transition: 'opacity 0.25s ease' }}
        />

        {/*
            5. EXTERIOR WALL ACCENT POINT LIGHT (RIGHT SIDE OF WINDOW)
               (Matches the distinct amber dot in both Image 1 & Image 2!)
        */}
        {isGlowing && (
          <g>
            <circle cx="310" cy="85" r="14" fill="url(#exteriorAccentGlow)" />
            <circle cx="310" cy="85" r="3" fill="#ffaa30" />
            <circle cx="310" cy="85" r="1.5" fill="#ffffff" />
          </g>
        )}

        {/* 
            6. VOLUMETRIC LIGHT BEAM (FOLLOWING USER'S GREEN ANGLE TO HERO)
        */}
        {isGlowing && (
          <g style={{ mixBlendMode: 'screen', pointerEvents: 'none' }}>
            {/* Primary Cinematic Light Beam pointing all  text */}
            <polygon
              points="18,24 308,24 -350,680 -1200,720 -1200,24"
              fill="url(#windowVolumetricBeam)"
              filter="url(#beamBlurFilter)"
            />
            {/* Secondary Soft Ambient Room Spill over hero area */}
            <polygon
              points="0,15 320,15 -250,780 -1300,820 -1300,10"
              fill="url(#windowAmbientSpill)"
              filter="url(#softSpillBlurFilter)"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
