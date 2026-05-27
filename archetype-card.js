// ============================================================
// SKIN SIGHT - Shareable Archetype Card (render only)
// ------------------------------------------------------------
// One function: renderArchetypeCard(archetypeName, clientFirstName, inkProfileName)
//   -> returns a 9:16 (1080x1920) SVG string for Instagram Stories.
//
// All 12 archetypes share ONE template. Only the 3-color palette and the
// central geometric placeholder symbol change between them. Real imagery
// swaps into the symbol zone later; PNG export / share comes later.
//
// Fonts: uses the site's loaded webfonts (Fraunces serif, DM Sans). Because
// the card renders INLINE in the document, these resolve from the page. PNG
// export later will need fonts embedded as data URIs (out of scope here).
//
// oneLiner (the quote) is read from the global SKIN_SIGHT_DATA (data.js) by
// archetype name — data.js is not modified.
// ============================================================

(function () {
  'use strict';

  // ----- 3-color palettes (bg / text / accent). Optional `small` overrides
  // the colour used for small-caps + footer text where the mid-tone ground
  // would otherwise hurt legibility. ----------------------------------------
  const PALETTES = {
    'The Debut':      { bg: '#F5EFE3', text: '#5C4A3A', accent: '#C9A24B' },
    'The Compass':    { bg: '#1C2B3A', text: '#EDE8DD', accent: '#B08D57' },
    'The Canvas':     { bg: '#F4F1EA', text: '#3A3A38', accent: '#C2BAA8' },
    'The Spark':      { bg: '#0B0B0C', text: '#FF6A1A', accent: '#D81E2C' },
    'The Architect':  { bg: '#3E4C5E', text: '#F2EEE7', accent: '#262B32' },
    'The Muse':       { bg: '#C29A93', text: '#6E4B45', accent: '#C9A24B', small: '#6E4B45', eyebrow: '#6E4B45' },
    'The Mythmaker':  { bg: '#4A1420', text: '#C9A24B', accent: '#0A0608' },
    'The Visionary':  { bg: '#0C0C0E', text: '#F4EFE2', accent: '#CBB06A' },
    'The Deliberate': { bg: '#243A2E', text: '#EFE9DA', accent: '#8A6A4A' },
    'The Collector':  { bg: '#E8DEC8', text: '#4A3826', accent: '#1A1410' },
    'The Rhythm':     { bg: '#335E5B', text: '#EFE9DA', accent: '#9B9389' },
    'The Attuned':    { bg: '#FCF8EF', text: '#A9772A', accent: '#F2C14E' }
  };

  const FALLBACK = { bg: '#F4F1EA', text: '#3A3A38', accent: '#C2BAA8' };

  // ----- geometry constants (in viewBox units) -----------------------------
  const W = 1080, H = 1920;
  const CX = 540;          // horizontal centre
  const SYM_CY = 730;      // symbol zone centre (~30-35% band)

  // ----- central placeholder symbols ---------------------------------------
  // Each returns SVG markup centred on (CX, SYM_CY), stroked in the accent.
  // Simple primitives only — swappable for real art later.
  const SYMBOLS = {
    'The Debut': (p) =>
      // single open ring — the first mark
      `<circle cx="${CX}" cy="${SYM_CY}" r="165" fill="none" stroke="${p.accent}" stroke-width="5"/>`,

    'The Compass': (p) =>
      // ring + diagonal needle + centre dot
      `<circle cx="${CX}" cy="${SYM_CY}" r="160" fill="none" stroke="${p.accent}" stroke-width="5"/>
       <line x1="${CX - 96}" y1="${SYM_CY + 96}" x2="${CX + 96}" y2="${SYM_CY - 96}" stroke="${p.accent}" stroke-width="5" stroke-linecap="round"/>
       <path d="M ${CX + 96} ${SYM_CY - 96} L ${CX + 56} ${SYM_CY - 92} L ${CX + 92} ${SYM_CY - 56} Z" fill="${p.accent}"/>
       <circle cx="${CX}" cy="${SYM_CY}" r="11" fill="${p.accent}"/>`,

    'The Canvas': (p) =>
      // empty thin square — mostly negative space
      `<rect x="${CX - 150}" y="${SYM_CY - 150}" width="300" height="300" fill="none" stroke="${p.accent}" stroke-width="4"/>`,

    'The Spark': (p) => {
      // burst: radiating lines (accent/crimson) + ember centre (text)
      let rays = '';
      for (let i = 0; i < 8; i++) {
        const a = (Math.PI / 4) * i;
        const x1 = CX + Math.cos(a) * 60, y1 = SYM_CY + Math.sin(a) * 60;
        const x2 = CX + Math.cos(a) * 178, y2 = SYM_CY + Math.sin(a) * 178;
        rays += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${p.accent}" stroke-width="6" stroke-linecap="round"/>`;
      }
      return rays + `<circle cx="${CX}" cy="${SYM_CY}" r="20" fill="${p.text}"/>`;
    },

    'The Architect': (p) =>
      // square with a smaller inset square — blueprint
      `<rect x="${CX - 155}" y="${SYM_CY - 155}" width="310" height="310" fill="none" stroke="${p.accent}" stroke-width="5"/>
       <rect x="${CX - 88}" y="${SYM_CY - 88}" width="176" height="176" fill="none" stroke="${p.accent}" stroke-width="5"/>`,

    'The Muse': (p) =>
      // two overlapping circles (vesica)
      `<circle cx="${CX - 74}" cy="${SYM_CY}" r="128" fill="none" stroke="${p.accent}" stroke-width="5"/>
       <circle cx="${CX + 74}" cy="${SYM_CY}" r="128" fill="none" stroke="${p.accent}" stroke-width="5"/>`,

    'The Mythmaker': (p) =>
      // three concentric circles — chapters
      `<circle cx="${CX}" cy="${SYM_CY}" r="72" fill="none" stroke="${p.accent}" stroke-width="5"/>
       <circle cx="${CX}" cy="${SYM_CY}" r="126" fill="none" stroke="${p.accent}" stroke-width="5"/>
       <circle cx="${CX}" cy="${SYM_CY}" r="180" fill="none" stroke="${p.accent}" stroke-width="5"/>`,

    'The Visionary': (p) => {
      // ornamental thin gold-leaf rectangular frame — museum frame energy
      const ox = CX - 158, oy = SYM_CY - 208, ow = 316, oh = 416;
      const ix = CX - 138, iy = SYM_CY - 188, iw = 276, ih = 376;
      const corners = [
        [ox, oy], [ox + ow, oy], [ox, oy + oh], [ox + ow, oy + oh]
      ].map(([x, y]) =>
        `<rect x="${x - 6}" y="${y - 6}" width="12" height="12" fill="${p.accent}"/>`
      ).join('');
      return `<rect x="${ox}" y="${oy}" width="${ow}" height="${oh}" fill="none" stroke="${p.accent}" stroke-width="3"/>
       <rect x="${ix}" y="${iy}" width="${iw}" height="${ih}" fill="none" stroke="${p.accent}" stroke-width="1.5"/>
       ${corners}`;
    },

    'The Deliberate': (p) =>
      // horizontal line bisected by a vertical line + small filled dot above
      // the intersection — sundial mark / growth-ring cross-section
      `<line x1="${CX - 155}" y1="${SYM_CY}" x2="${CX + 155}" y2="${SYM_CY}" stroke="${p.accent}" stroke-width="5" stroke-linecap="round"/>
       <line x1="${CX}" y1="${SYM_CY - 155}" x2="${CX}" y2="${SYM_CY + 155}" stroke="${p.accent}" stroke-width="5" stroke-linecap="round"/>
       <circle cx="${CX}" cy="${SYM_CY - 92}" r="15" fill="${p.accent}"/>`,

    'The Collector': (p) =>
      // three stacked horizontal bars — strata
      `<line x1="${CX - 150}" y1="${SYM_CY - 78}" x2="${CX + 150}" y2="${SYM_CY - 78}" stroke="${p.accent}" stroke-width="14" stroke-linecap="round"/>
       <line x1="${CX - 150}" y1="${SYM_CY}" x2="${CX + 150}" y2="${SYM_CY}" stroke="${p.accent}" stroke-width="14" stroke-linecap="round"/>
       <line x1="${CX - 150}" y1="${SYM_CY + 78}" x2="${CX + 150}" y2="${SYM_CY + 78}" stroke="${p.accent}" stroke-width="14" stroke-linecap="round"/>`,

    'The Rhythm': (p) => {
      // varying-height vertical lines forming a waveform
      const heights = [130, 244, 322, 168, 262];
      const xs = [CX - 168, CX - 84, CX, CX + 84, CX + 168];
      return heights.map((h, i) =>
        `<line x1="${xs[i]}" y1="${SYM_CY - h / 2}" x2="${xs[i]}" y2="${SYM_CY + h / 2}" stroke="${p.accent}" stroke-width="16" stroke-linecap="round"/>`
      ).join('');
    },

    'The Attuned': (p) => {
      // filled sun + radial halo + rays — radiant sunrise
      const uid = 'au' + Math.random().toString(36).slice(2, 8);
      let rays = '';
      for (let i = 0; i < 12; i++) {
        const a = (Math.PI / 6) * i;
        const x1 = CX + Math.cos(a) * 150, y1 = SYM_CY + Math.sin(a) * 150;
        const x2 = CX + Math.cos(a) * 205, y2 = SYM_CY + Math.sin(a) * 205;
        rays += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${p.accent}" stroke-width="5" stroke-linecap="round" opacity="0.75"/>`;
      }
      return `<defs>
         <radialGradient id="${uid}" cx="50%" cy="50%" r="50%">
           <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.55"/>
           <stop offset="55%" stop-color="${p.accent}" stop-opacity="0.14"/>
           <stop offset="100%" stop-color="${p.accent}" stop-opacity="0"/>
         </radialGradient>
       </defs>
       <circle cx="${CX}" cy="${SYM_CY}" r="360" fill="url(#${uid})"/>
       ${rays}
       <circle cx="${CX}" cy="${SYM_CY}" r="108" fill="${p.accent}"/>`;
    }
  };

  // ----- helpers ------------------------------------------------------------
  function escapeXml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Greedy word-wrap into <= maxChars lines.
  function wrapText(text, maxChars) {
    const words = String(text || '').split(/\s+/).filter(Boolean);
    const lines = [];
    let line = '';
    for (const word of words) {
      const next = line ? line + ' ' + word : word;
      if (next.length > maxChars && line) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
    }
    if (line) lines.push(line);
    return lines.length ? lines : [''];
  }

  function getOneLiner(archetypeName) {
    const data = (typeof SKIN_SIGHT_DATA !== 'undefined') ? SKIN_SIGHT_DATA
      : (typeof window !== 'undefined' ? window.SKIN_SIGHT_DATA : null);
    if (!data || !Array.isArray(data.archetypes)) return '';
    const match = data.archetypes.find(a => a.name === archetypeName);
    return match && match.oneLiner ? match.oneLiner : '';
  }

  // ----- per-card background atmosphere (only where the brief calls for it) -
  function backgroundLayers(name, p, uid) {
    if (name === 'The Attuned') {
      // soft warm vertical wash — sunrise
      return {
        defs: `<linearGradient id="${uid}bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFF6E2"/>
            <stop offset="100%" stop-color="${p.bg}"/>
          </linearGradient>`,
        rect: `<rect width="${W}" height="${H}" fill="url(#${uid}bg)"/>`,
        extra: ''
      };
    }
    if (name === 'The Collector') {
      // faint paper grain
      return {
        defs: `<filter id="${uid}grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>`,
        rect: `<rect width="${W}" height="${H}" fill="${p.bg}"/>`,
        extra: `<rect width="${W}" height="${H}" filter="url(#${uid}grain)" opacity="0.06"/>`
      };
    }
    if (name === 'The Visionary') {
      // faint gold-leaf gallery hairline inset — museum gala
      return {
        defs: '',
        rect: `<rect width="${W}" height="${H}" fill="${p.bg}"/>`,
        extra: `<rect x="34" y="34" width="${W - 68}" height="${H - 68}" fill="none" stroke="${p.accent}" stroke-width="1.5" opacity="0.32"/>`
      };
    }
    return { defs: '', rect: `<rect width="${W}" height="${H}" fill="${p.bg}"/>`, extra: '' };
  }

  // ----- main ---------------------------------------------------------------
  function renderArchetypeCard(archetypeName, clientFirstName, inkProfileName) {
    const p = PALETTES[archetypeName] || FALLBACK;
    const small = p.small || p.text;          // small-caps / footer colour
    const eyebrowFill = p.eyebrow || small;   // eyebrow override (full opacity)
    const uid = 'sc' + Math.random().toString(36).slice(2, 8);

    const first = (clientFirstName || '').trim();
    const eyebrow = (first ? first.toUpperCase() + '’S' : 'YOUR') + ' ARCHETYPE';
    const name = escapeXml(archetypeName).toUpperCase();
    // Normalize straight apostrophes -> curly (’) so contractions don't clash
    // with the curly display quotes. Render-time only; data.js is untouched.
    const oneLiner = getOneLiner(archetypeName).replace(/'/g, '’');
    const profile = escapeXml(inkProfileName || '');

    const symbol = (SYMBOLS[archetypeName] || SYMBOLS['The Canvas'])(p);
    const bg = backgroundLayers(archetypeName, p, uid);

    // quote: italic serif, curly quotes, wrapped + vertically centred in the
    // gap between the name and the divider.
    const quoteLines = wrapText(oneLiner, 30);
    const qLH = 58;
    const qFirstY = 1338 - (quoteLines.length - 1) * (qLH / 2);
    const quoteTspans = quoteLines.map((ln, i) => {
      const text = (quoteLines.length === 1) ? '“' + ln + '”'
        : (i === 0 ? '“' + ln : (i === quoteLines.length - 1 ? ln + '”' : ln));
      const y = qFirstY + i * qLH;
      return `<tspan x="${CX}" y="${y}">${escapeXml(text)}</tspan>`;
    }).join('');

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" class="archetype-card-svg" role="img" aria-label="${escapeXml(archetypeName)} archetype card">
  <defs>${bg.defs}</defs>
  ${bg.rect}
  ${bg.extra}

  <!-- eyebrow -->
  <text x="${CX}" y="222" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="30" font-weight="600" letter-spacing="8" fill="${eyebrowFill}" opacity="${p.eyebrow ? '1' : '0.72'}">${escapeXml(eyebrow)}</text>

  <!-- symbol zone -->
  <g>${symbol}</g>

  <!-- archetype name -->
  <text x="${CX}" y="1196" text-anchor="middle" font-family="'Fraunces', Georgia, serif" font-size="86" font-weight="600" letter-spacing="3" fill="${p.text}">${name}</text>

  <!-- quote -->
  <text text-anchor="middle" font-family="'Fraunces', Georgia, serif" font-style="italic" font-weight="400" font-size="44" fill="${p.text}" opacity="0.86">${quoteTspans}</text>

  <!-- divider -->
  <rect x="${CX - 75}" y="1456" width="150" height="3" fill="${p.accent}"/>

  <!-- ink profile -->
  <text x="${CX}" y="1566" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="27" font-weight="600" letter-spacing="6" fill="${eyebrowFill}" opacity="${p.eyebrow ? '1' : '0.68'}">YOUR INK PROFILE</text>
  <text x="${CX}" y="1646" text-anchor="middle" font-family="'Fraunces', Georgia, serif" font-size="52" font-weight="600" fill="${p.text}">${profile}</text>

  <!-- footer -->
  <text x="${CX}" y="1814" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="30" font-weight="600" letter-spacing="10" fill="${small}">SKIN SIGHT</text>
  <text x="${CX}" y="1860" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="22" font-weight="400" letter-spacing="4" fill="${small}" opacity="0.6">skinsight.ink</text>
</svg>`;
  }

  // expose
  if (typeof window !== 'undefined') {
    window.renderArchetypeCard = renderArchetypeCard;
    window.ARCHETYPE_CARD_PALETTES = PALETTES;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { renderArchetypeCard, PALETTES };
  }
})();
