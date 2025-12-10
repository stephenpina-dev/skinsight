# SKIN SIGHT — Master Build Prompt

## For Claude Code

You are building SKIN SIGHT, a white-label client intake quiz for tattoo artists.

---

## Reference Files

Before building anything, read these files completely:

1. **SKINSIGHT-Data.txt** — All content (sliders, archetypes, ink profiles, modifiers, flags, design system)
2. **SKINSIGHT-Spec.txt** — Technical specification (architecture, components, logic, user flows)

---

## What You Are Building

A mobile-first, frontend-only web application that:

1. Loads artist branding from a config JSON file based on URL path
2. Guides client through 12 slider questions across 3 sections
3. Calculates their archetype, ink profile, modifiers, and flags
4. Shows a shareable archetype reveal
5. Collects details (placement, size, budget, timeline, references, contact)
6. Submits all data to artist via email (Formspree) or webhook
7. Shows confirmation with booking CTA

---

## File Structure

Create these files:

```
index.html      — Semantic HTML structure
styles.css      — All styling, CSS custom properties for theming
data.js         — All content from SKINSIGHT-Data.txt
app.js          — All logic and interactivity
configs/
  default.json  — Fallback config
```

---

## Key Requirements

### Architecture
- No backend, no database, no auth
- White-label via config JSON loaded from URL path
- Progress saved to localStorage
- Submission via Formspree (email) or webhook

### Design
- Mobile first (base styles are mobile)
- Warm, light palette (see design system in Data file)
- Fonts: Fraunces (headings), DM Sans (body)
- Smooth scroll between sections
- Reveal animation on archetype screen

### User Flow
1. Landing → Begin button
2. Section 1: Your Intuition (4 sliders) → Continue
3. Section 2: Your Vision (4 sliders) → Continue
4. Section 3: Your Style (4 sliders) → See Results
5. Archetype Reveal (with Ink Profile below) → Continue to Details
6. Details Form → Submit
7. Confirmation → Booking CTA

### Logic
- Archetype detection follows priority order in Data file
- Ink Profile detection follows priority order in Data file
- Flags detect contradictions and risk patterns
- Signal Clarity summarizes flag count
- All detection logic is documented in Spec file

### Submission
- Compile all data into structured payload
- Format as readable email for artist
- Include: archetype, ink profile, signal, flags, modifiers, artist notes, details, contact

---

## Do NOT

- Use any JavaScript frameworks (React, Vue, etc.)
- Use any CSS frameworks (Tailwind, Bootstrap)
- Add backend/database
- Change the archetype names or detection logic
- Skip any component in the spec

---

## Do

- Follow the spec exactly
- Use semantic HTML5
- Use CSS custom properties for theming
- Make it fully responsive (test at 375px width)
- Include all accessibility features (labels, focus states, sr-only text)
- Handle errors gracefully
- Comment code clearly

---

## Testing

Before completing, verify:

- [ ] Config loads from URL path (e.g., /artistname)
- [ ] Falls back to default config if not found
- [ ] All 12 sliders work
- [ ] Progress saves and loads from localStorage
- [ ] Section gating works (Continue disabled until all sliders touched)
- [ ] Archetype detects correctly (test multiple scenarios)
- [ ] Ink Profile detects correctly
- [ ] Flags detect correctly
- [ ] Reveal animation plays
- [ ] Form validates required fields
- [ ] Submission sends
- [ ] Confirmation shows with correct artist name and booking link
- [ ] Works on mobile (375px)
- [ ] All touch targets are 48px minimum

---

## Start

Begin by creating index.html with the full structure, then styles.css, then data.js, then app.js.

Reference SKINSIGHT-Spec.txt for exact component HTML and CSS.
Reference SKINSIGHT-Data.txt for all content to include in data.js.

Build it complete and working in one pass.
