import React from 'react';

/**
 * GazedLogo - Pure SVG Vector Brandmark for gaze.d
 * 
 * Fully responsive and supports dynamic color changes via the `color` prop
 * or CSS `color` (using SVG currentColor).
 * 
 * @param {string} [color='currentColor'] - Color for the emblem (e.g. '#16263B', '#ffffff', '#ff4d15', 'currentColor')
 * @param {number|string} [size=36] - Size in pixels or CSS units
 * @param {string} [className] - Optional CSS class
 * @param {React.CSSProperties} [style] - Optional inline style
 */
export default function GazedLogo({
  color = 'currentColor',
  size = 36,
  className = '',
  style = {},
  ...props
}) {
  const uniqueId = React.useId().replace(/:/g, '');
  const gradG = `gazeG_${uniqueId}`;
  const gradD = `gazeD_${uniqueId}`;
  const shadowFold = `gazeShadow_${uniqueId}`;

  return (
    <svg
      viewBox="0 0 320 290"
      width={size}
      height={typeof size === 'number' ? Math.round(size * 0.906) : size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        color: color,
        overflow: 'visible',
        ...style,
      }}
      {...props}
    >
      <defs>
        {/* Dynamic currentColor Metallic / Gradient Shaders */}
        <linearGradient id={gradG} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="45%" stopColor="currentColor" stopOpacity="0.82" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.65" />
        </linearGradient>

        <linearGradient id={gradD} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.78" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.60" />
        </linearGradient>

        <linearGradient id={shadowFold} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <g id="gaze-emblem-ribbon">
        {/* LEFT 'G' RIBBON */}
        <path
          d="M 124.5 14.75 L 154.5 33.75 L 61 95.25 C 44.58 106.33, 57.75 97.33, 56 100.25 C 54.25 103.17, 51.42 101.17, 50.5 112.75 C 49.58 124.33, 50.17 159.25, 50.5 169.75 C 50.83 180.25, 50.42 172.83, 52.5 175.75 C 54.58 178.67, 51.42 179, 63 187.25 C 74.58 195.5, 107.5 222.08, 122 225.25 C 136.5 228.42, 144.08 210.67, 150 206.25 C 155.92 201.83, 155.75 201.33, 157.5 198.75 C 159.25 196.17, 160.08 202.33, 160.5 190.75 C 160.92 179.17, 167.58 134.17, 160 129.25 L 115 161.25 C 107 166.58, 117.25 164.5, 112 161.25 C 106.75 158, 77.17 152.75, 83.5 141.75 L 150 95.25 C 162.08 87.33, 150 91.25, 156 94.25 C 162 97.25, 179.92 108.5, 186 113.25 C 192.08 118, 191.08 119.83, 192.5 122.75 C 193.92 125.67, 194.17 117.92, 194.5 130.75 C 194.83 143.58, 195.33 185.58, 194.5 199.75 C 193.67 213.92, 191.17 211.92, 189.5 215.75 C 187.83 219.58, 186.92 220.33, 184.5 222.75 C 182.08 225.17, 183.75 224.33, 175 230.25 C 166.25 236.17, 142 253.42, 132 258.25 C 122 263.08, 119.5 259.75, 115 259.25 C 110.5 258.75, 116.83 262.58, 105 255.25 C 93.17 247.92, 55.33 222.75, 44 215.25 C 32.67 207.75, 40.25 213.5, 37 210.25 C 33.75 207, 27.75 201.33, 24.5 195.75 C 21.25 190.17, 18.67 191.75, 17.5 176.75 C 16.33 161.75, 16.17 121.08, 17.5 105.75 C 18.83 90.42, 22.08 90.5, 25.5 84.75 C 28.92 79, 21.58 82.83, 38 71.25 C 54.42 59.67, 109.58 24.67, 124 15.25 C 138.42 5.83, 119.42 11.67, 124.5 14.75 Z"
          fill={`url(#${gradG})`}
          fillRule="evenodd"
        />

        {/* RIGHT 'D' RIBBON */}
        <path
          d="M 186.5 20.75 C 188.5 20.58, 194.75 19.83, 198 20.25 C 201.25 20.67, 192.33 15.25, 206 23.25 C 219.67 31.25, 265.25 58.17, 280 68.25 C 294.75 78.33, 291.08 78.83, 294.5 83.75 C 297.92 88.67, 299.17 93.42, 300.5 97.75 C 301.83 102.08, 302.17 97.08, 302.5 109.75 C 302.83 122.42, 302.83 161.25, 302.5 173.75 C 302.17 186.25, 301.83 180.58, 300.5 184.75 C 299.17 188.92, 297.75 194, 294.5 198.75 C 291.25 203.5, 298.42 200.5, 281 213.25 C 263.58 226, 210.25 268.33, 190 275.25 C 169.75 282.17, 148.17 269.25, 159.5 254.75 L 258 188.25 C 275.5 176.08, 262.58 184.83, 264.5 181.75 C 266.42 178.67, 268.67 181.08, 269.5 169.75 C 270.33 158.42, 269.83 124.42, 269.5 113.75 C 269.17 103.08, 269.08 108.67, 267.5 105.75 C 265.92 102.83, 272.08 104.5, 260 96.25 C 247.92 88, 206.08 62.67, 195 56.25 L 193.5 57.75 C 193.33 65.58, 199.5 99.08, 194 103.25 L 160.5 82.75 C 154.92 73.5, 160 55.08, 160.5 47.75 C 161 40.42, 161.25 42.33, 163.5 38.75 C 165.75 35.17, 171.25 29, 174 26.25 C 176.75 23.5, 178 23.08, 180 22.25 C 182 21.42, 184.92 21.5, 186 21.25 C 187.08 21, 184.5 20.92, 186.5 20.75 Z"
          fill={`url(#${gradD})`}
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}
