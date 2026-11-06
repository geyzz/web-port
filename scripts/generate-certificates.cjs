const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(__dirname, '../public/certificates');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. freeCodeCamp Certificate SVG
const fccSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 850" width="1200" height="850">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a101f"/>
      <stop offset="50%" stop-color="#0e172a"/>
      <stop offset="100%" stop-color="#080c16"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60a5fa"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="850" fill="url(#bgGrad)"/>
  
  <!-- Outer Guilloche / Border Frame -->
  <rect x="30" y="30" width="1140" height="790" rx="16" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-opacity="0.85"/>
  <rect x="44" y="44" width="1112" height="762" rx="12" fill="none" stroke="#3b82f6" stroke-width="1" stroke-opacity="0.4" stroke-dasharray="6,6"/>
  <rect x="52" y="52" width="1096" height="746" rx="8" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" stroke-opacity="0.6"/>

  <!-- Corner Ornaments -->
  <g fill="none" stroke="url(#goldGrad)" stroke-width="2">
    <path d="M 60 90 L 60 60 L 90 60" />
    <path d="M 1140 90 L 1140 60 L 1110 60" />
    <path d="M 60 760 L 60 790 L 90 790" />
    <path d="M 1140 760 L 1140 790 L 1110 790" />
  </g>

  <!-- Issuer Header / Logo Area -->
  <g transform="translate(600, 130)" text-anchor="middle">
    <!-- freeCodeCamp Flame Symbol -->
    <path d="M -16 -24 C -12 -38 0 -48 4 -52 C 4 -52 14 -42 12 -30 C 18 -26 24 -16 22 -6 C 20 8 8 18 -6 16 C -20 14 -26 -4 -16 -24 Z" fill="url(#goldGrad)"/>
    <text y="32" font-family="'Inter', -apple-system, sans-serif" font-size="28" font-weight="900" fill="#f8fafc" letter-spacing="4">
      freeCodeCamp (())
    </text>
    <text y="58" font-family="'Inter', -apple-system, sans-serif" font-size="13" font-weight="700" fill="#93c5fd" letter-spacing="6">
      VERIFIED DEVELOPER CERTIFICATION
    </text>
  </g>

  <!-- Divider Line -->
  <line x1="300" y1="225" x2="900" y2="225" stroke="url(#goldGrad)" stroke-width="2" stroke-opacity="0.7"/>

  <!-- Certificate Title -->
  <text x="600" y="275" text-anchor="middle" font-family="'Inter', sans-serif" font-size="16" font-weight="600" fill="#94a3b8" letter-spacing="3">
    THIS OFFICIALLY CERTIFIES THAT
  </text>

  <!-- Recipient Name -->
  <text x="600" y="355" text-anchor="middle" font-family="'Cinzel', 'Georgia', serif" font-size="52" font-weight="800" fill="#ffffff" letter-spacing="2" filter="url(#shadow)">
    GHAYZELLE DIZON
  </text>
  <line x1="360" y1="380" x2="840" y2="380" stroke="url(#goldGrad)" stroke-width="2"/>

  <!-- Description Text -->
  <text x="600" y="425" text-anchor="middle" font-family="'Inter', sans-serif" font-size="15" font-weight="500" fill="#cbd5e1" letter-spacing="1">
    has successfully completed the developer curriculum and earned the credential for
  </text>

  <!-- Major Credential Title -->
  <rect x="250" y="455" width="700" height="66" rx="12" fill="#1e293b" fill-opacity="0.85" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="600" y="498" text-anchor="middle" font-family="'Inter', sans-serif" font-size="26" font-weight="900" fill="#60a5fa" letter-spacing="1">
    Responsive Web Design
  </text>

  <text x="600" y="560" text-anchor="middle" font-family="'Inter', sans-serif" font-size="14" font-weight="500" fill="#94a3b8">
    Demonstrating proficiency in HTML5, CSS3, Flexbox, CSS Grid, Responsive Design &amp; Accessibility
  </text>
  <text x="600" y="586" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" font-weight="700" fill="#38bdf8">
    300 Hours of Verified Projects &amp; Coursework • September 2024
  </text>

  <!-- Gold Foil Seal Badge -->
  <g transform="translate(600, 690)">
    <circle r="48" fill="#1e293b" stroke="url(#goldGrad)" stroke-width="3"/>
    <circle r="40" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" stroke-dasharray="4,3"/>
    <!-- Star Ribbon -->
    <path d="M -18 36 L -24 64 L 0 54 L 24 64 L 18 36 Z" fill="url(#goldGrad)" opacity="0.85"/>
    <text y="-8" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="900" fill="#fef08a" letter-spacing="1.5">VERIFIED</text>
    <text y="8" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="900" fill="#ffffff">★ 300h ★</text>
    <text y="22" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" font-weight="700" fill="#93c5fd">FCC-DEV</text>
  </g>

  <!-- Signature 1 (Left) -->
  <g transform="translate(220, 690)">
    <!-- Signature Graphic -->
    <path d="M 0 0 Q 30 -22 65 -5 T 140 -12 T 200 -2" fill="none" stroke="#93c5fd" stroke-width="2.2" stroke-linecap="round"/>
    <line x1="0" y1="12" x2="220" y2="12" stroke="#64748b" stroke-width="1"/>
    <text x="110" y="32" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#e2e8f0">Quincy Larson</text>
    <text x="110" y="48" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10" font-weight="500" fill="#64748b">Executive Director, freeCodeCamp</text>
  </g>

  <!-- Signature 2 (Right) -->
  <g transform="translate(760, 690)">
    <!-- Code / Hash / Seal Details -->
    <path d="M 0 -6 Q 40 -26 80 -4 T 150 -16 T 220 0" fill="none" stroke="#fcd34d" stroke-width="2.2" stroke-linecap="round"/>
    <line x1="0" y1="12" x2="220" y2="12" stroke="#64748b" stroke-width="1"/>
    <text x="110" y="32" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#e2e8f0">Academic Board</text>
    <text x="110" y="48" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10" font-weight="500" fill="#64748b">Verification ID: FCC-RWD-2024-GD</text>
  </g>

  <!-- Bottom Verification URL -->
  <text x="600" y="805" text-anchor="middle" font-family="'SF Mono', Menlo, Consolas, monospace" font-size="10" fill="#64748b">
    Authenticity verified at freecodecamp.org/certification/ghayzelle/responsive-web-design
  </text>
</svg>`;

// 2. Cisco Networking Academy Certificate SVG
const ciscoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 850" width="1200" height="850">
  <defs>
    <linearGradient id="bgCisco" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081826"/>
      <stop offset="50%" stop-color="#0d2338"/>
      <stop offset="100%" stop-color="#05121c"/>
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#67e8f9"/>
      <stop offset="50%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#0891b2"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <filter id="shadowCisco" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="850" fill="url(#bgCisco)"/>

  <!-- Borders -->
  <rect x="30" y="30" width="1140" height="790" rx="16" fill="none" stroke="url(#cyanGrad)" stroke-width="3" stroke-opacity="0.85"/>
  <rect x="44" y="44" width="1112" height="762" rx="12" fill="none" stroke="#f59e0b" stroke-width="1" stroke-opacity="0.4" stroke-dasharray="6,6"/>
  <rect x="52" y="52" width="1096" height="746" rx="8" fill="none" stroke="url(#cyanGrad)" stroke-width="1.5" stroke-opacity="0.6"/>

  <!-- Cisco Bridge Logo Graphic -->
  <g transform="translate(600, 120)">
    <g fill="url(#cyanGrad)">
      <rect x="-42" y="-14" width="6" height="28" rx="3"/>
      <rect x="-28" y="-24" width="6" height="48" rx="3"/>
      <rect x="-14" y="-34" width="6" height="68" rx="3"/>
      <rect x="0" y="-44" width="6" height="88" rx="3"/>
      <rect x="14" y="-34" width="6" height="68" rx="3"/>
      <rect x="28" y="-24" width="6" height="48" rx="3"/>
      <rect x="42" y="-14" width="6" height="28" rx="3"/>
    </g>
    <text y="68" text-anchor="middle" font-family="'Inter', sans-serif" font-size="24" font-weight="900" fill="#ffffff" letter-spacing="4">
      CISCO NETWORKING ACADEMY
    </text>
    <text y="92" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#67e8f9" letter-spacing="5">
      IN PARTNERSHIP WITH OpenEDG JAVASCRIPT INSTITUTE
    </text>
  </g>

  <!-- Divider Line -->
  <line x1="300" y1="245" x2="900" y2="245" stroke="url(#cyanGrad)" stroke-width="2" stroke-opacity="0.7"/>

  <text x="600" y="295" text-anchor="middle" font-family="'Inter', sans-serif" font-size="15" font-weight="600" fill="#94a3b8" letter-spacing="3">
    THIS CERTIFICATE OF COMPLETION IS PROUDLY CONFERRED UPON
  </text>

  <!-- Recipient Name -->
  <text x="600" y="375" text-anchor="middle" font-family="'Cinzel', 'Georgia', serif" font-size="52" font-weight="800" fill="#ffffff" letter-spacing="2" filter="url(#shadowCisco)">
    GHAYZELLE DIZON
  </text>
  <line x1="360" y1="400" x2="840" y2="400" stroke="url(#cyanGrad)" stroke-width="2"/>

  <text x="600" y="445" text-anchor="middle" font-family="'Inter', sans-serif" font-size="15" font-weight="500" fill="#cbd5e1">
    for successfully fulfilling all course requirements and passing the examination for
  </text>

  <!-- Course Title Pill -->
  <rect x="260" y="475" width="680" height="66" rx="12" fill="#0b283d" fill-opacity="0.85" stroke="#06b6d4" stroke-width="1.5"/>
  <text x="600" y="518" text-anchor="middle" font-family="'Inter', sans-serif" font-size="28" font-weight="900" fill="#38bdf8" letter-spacing="1">
    JavaScript Essentials 1 (JSE)
  </text>

  <text x="600" y="578" text-anchor="middle" font-family="'Inter', sans-serif" font-size="14" font-weight="500" fill="#94a3b8">
    Core JavaScript ES6+, Variables, Data Types, Control Structures, Functions, Scopes &amp; Algorithmic Logic
  </text>

  <!-- Seal Badge -->
  <g transform="translate(600, 695)">
    <circle r="46" fill="#081826" stroke="url(#cyanGrad)" stroke-width="3"/>
    <circle r="38" fill="none" stroke="url(#cyanGrad)" stroke-width="1.5" stroke-dasharray="4,3"/>
    <text y="-8" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="900" fill="#67e8f9" letter-spacing="1.5">OFFICIAL</text>
    <text y="8" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="900" fill="#ffffff">★ JSE-1 ★</text>
    <text y="22" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" font-weight="700" fill="#a5f3fc">OpenEDG</text>
  </g>

  <!-- Signature 1 (Left) -->
  <g transform="translate(220, 695)">
    <path d="M 0 -4 Q 35 -24 75 -6 T 150 -18 T 215 0" fill="none" stroke="#67e8f9" stroke-width="2.2" stroke-linecap="round"/>
    <line x1="0" y1="12" x2="220" y2="12" stroke="#64748b" stroke-width="1"/>
    <text x="110" y="32" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#e2e8f0">Laura Quintana</text>
    <text x="110" y="48" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10" font-weight="500" fill="#64748b">VP &amp; GM, Cisco Networking Academy</text>
  </g>

  <!-- Signature 2 (Right) -->
  <g transform="translate(760, 695)">
    <line x1="0" y1="12" x2="220" y2="12" stroke="#64748b" stroke-width="1"/>
    <text x="110" y="32" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#e2e8f0">Oct 2024</text>
    <text x="110" y="48" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10" font-weight="500" fill="#64748b">Date of Issue</text>
  </g>

  <!-- Bottom Verification ID -->
  <text x="600" y="805" text-anchor="middle" font-family="'SF Mono', Menlo, Consolas, monospace" font-size="10" fill="#64748b">
    Credential Verification ID: 1a9f1406-b333-41bb-a5a1-43224b745423 • netacad.com
  </text>
</svg>`;

// 3. AWS Academy Graduate Certificate SVG
const awsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 850" width="1200" height="850">
  <defs>
    <linearGradient id="bgAws" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141a24"/>
      <stop offset="50%" stop-color="#1c2534"/>
      <stop offset="100%" stop-color="#0e131b"/>
    </linearGradient>
    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff9900"/>
      <stop offset="100%" stop-color="#ff6600"/>
    </linearGradient>
    <filter id="shadowAws" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="850" fill="url(#bgAws)"/>

  <!-- Frame -->
  <rect x="30" y="30" width="1140" height="790" rx="16" fill="none" stroke="url(#orangeGrad)" stroke-width="3" stroke-opacity="0.85"/>
  <rect x="44" y="44" width="1112" height="762" rx="12" fill="none" stroke="#f59e0b" stroke-width="1" stroke-opacity="0.4" stroke-dasharray="6,6"/>
  <rect x="52" y="52" width="1096" height="746" rx="8" fill="none" stroke="url(#orangeGrad)" stroke-width="1.5" stroke-opacity="0.6"/>

  <!-- AWS Smile Header -->
  <g transform="translate(600, 125)">
    <text y="-8" text-anchor="middle" font-family="'Inter', sans-serif" font-size="34" font-weight="900" fill="#ffffff" letter-spacing="3">
      aws <tspan fill="#ff9900">academy</tspan>
    </text>
    <!-- AWS Smile Arrow -->
    <path d="M -70 8 Q 0 32 70 8" fill="none" stroke="#ff9900" stroke-width="4" stroke-linecap="round"/>
    <path d="M 64 2 L 72 8 L 62 14 Z" fill="#ff9900"/>

    <text y="58" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" font-weight="700" fill="#fbbf24" letter-spacing="5">
      AMAZON WEB SERVICES ACADEMY GRADUATE
    </text>
  </g>

  <!-- Divider Line -->
  <line x1="300" y1="225" x2="900" y2="225" stroke="url(#orangeGrad)" stroke-width="2" stroke-opacity="0.7"/>

  <text x="600" y="275" text-anchor="middle" font-family="'Inter', sans-serif" font-size="15" font-weight="600" fill="#94a3b8" letter-spacing="3">
    THIS CERTIFICATE IS AWARDED TO
  </text>

  <!-- Recipient Name -->
  <text x="600" y="355" text-anchor="middle" font-family="'Cinzel', 'Georgia', serif" font-size="52" font-weight="800" fill="#ffffff" letter-spacing="2" filter="url(#shadowAws)">
    GHAYZELLE DIZON
  </text>
  <line x1="360" y1="380" x2="840" y2="380" stroke="url(#orangeGrad)" stroke-width="2"/>

  <text x="600" y="425" text-anchor="middle" font-family="'Inter', sans-serif" font-size="15" font-weight="500" fill="#cbd5e1">
    for successfully completing the approved cloud training curriculum
  </text>

  <!-- Course Title Pill -->
  <rect x="220" y="455" width="760" height="66" rx="12" fill="#232f3e" fill-opacity="0.85" stroke="#ff9900" stroke-width="1.5"/>
  <text x="600" y="498" text-anchor="middle" font-family="'Inter', sans-serif" font-size="25" font-weight="900" fill="#ff9900" letter-spacing="1">
    AWS Academy Cloud Foundations
  </text>

  <text x="600" y="560" text-anchor="middle" font-family="'Inter', sans-serif" font-size="14" font-weight="500" fill="#94a3b8">
    Cloud Architecture, Core AWS Services (EC2, S3, RDS, VPC), Security Best Practices &amp; Pricing Models
  </text>
  <text x="600" y="586" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" font-weight="700" fill="#fbbf24">
    Credly Digital Badge Verified • February 2026
  </text>

  <!-- Badge Seal -->
  <g transform="translate(600, 690)">
    <circle r="46" fill="#141a24" stroke="url(#orangeGrad)" stroke-width="3"/>
    <circle r="38" fill="none" stroke="url(#orangeGrad)" stroke-width="1.5" stroke-dasharray="4,3"/>
    <text y="-8" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="900" fill="#fbbf24" letter-spacing="1.5">GRADUATE</text>
    <text y="8" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="900" fill="#ffffff">★ AWS ★</text>
    <text y="22" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" font-weight="700" fill="#ff9900">CREDLY</text>
  </g>

  <!-- Signature 1 (Left) -->
  <g transform="translate(220, 690)">
    <path d="M 0 -2 Q 30 -22 70 -4 T 145 -14 T 210 -2" fill="none" stroke="#fbbf24" stroke-width="2.2" stroke-linecap="round"/>
    <line x1="0" y1="12" x2="220" y2="12" stroke="#64748b" stroke-width="1"/>
    <text x="110" y="32" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#e2e8f0">Kevin Kelly</text>
    <text x="110" y="48" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10" font-weight="500" fill="#64748b">Director, AWS Academy Program</text>
  </g>

  <!-- Signature 2 (Right) -->
  <g transform="translate(760, 690)">
    <line x1="0" y1="12" x2="220" y2="12" stroke="#64748b" stroke-width="1"/>
    <text x="110" y="32" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#e2e8f0">AWS Global Training</text>
    <text x="110" y="48" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10" font-weight="500" fill="#64748b">Digital Badge Issued via Credly</text>
  </g>

  <!-- Bottom Verification URL -->
  <text x="600" y="805" text-anchor="middle" font-family="'SF Mono', Menlo, Consolas, monospace" font-size="10" fill="#64748b">
    Verify digital badge on credly.com/organizations/amazon-web-services/badges
  </text>
</svg>`;

fs.writeFileSync(path.join(targetDir, 'fcc-responsive-web-design.svg'), fccSvg.trim(), 'utf8');
fs.writeFileSync(path.join(targetDir, 'cisco-javascript-essentials.svg'), ciscoSvg.trim(), 'utf8');
fs.writeFileSync(path.join(targetDir, 'aws-cloud-foundations.svg'), awsSvg.trim(), 'utf8');

console.log('Certificates generated successfully in', targetDir);
