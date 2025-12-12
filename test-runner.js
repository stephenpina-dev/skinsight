#!/usr/bin/env node

// ============================================================
// SKIN SIGHT TEST RUNNER
// Run with: node test-runner.js
// ============================================================

// Load data.js
const fs = require('fs');

// Read data.js and modify to export
let dataCode = fs.readFileSync('./data.js', 'utf8');

// Wrap in a function that returns the objects
dataCode = `
(function() {
  ${dataCode}
  return { SKIN_SIGHT_DATA, TEST_PRESETS };
})()
`;

const { SKIN_SIGHT_DATA, TEST_PRESETS } = eval(dataCode);

console.log('🧪 SKIN SIGHT TEST RUNNER');
console.log('========================\n');

// Detection functions
function detectArchetype(values) {
  const scale = SKIN_SIGHT_DATA.scale;
  const sorted = [...SKIN_SIGHT_DATA.archetypes].sort((a, b) => a.priority - b.priority);

  for (const arch of sorted) {
    if (arch.detect(values, scale)) {
      return arch;
    }
  }
  return sorted[sorted.length - 1];
}

function detectInkProfile(values, archetype) {
  const scale = SKIN_SIGHT_DATA.scale;
  const sorted = [...SKIN_SIGHT_DATA.inkProfiles].sort((a, b) => a.priority - b.priority);

  for (const profile of sorted) {
    if (profile.detect(values, scale, archetype)) {
      return profile;
    }
  }
  return sorted[sorted.length - 1];
}

function detectFlags(values, archetype, details) {
  const scale = SKIN_SIGHT_DATA.scale;
  const detected = [];

  for (const category of ['intuition', 'vision', 'style', 'cross']) {
    for (const flag of SKIN_SIGHT_DATA.flags[category]) {
      if (flag.detect(values, scale, archetype, details)) {
        detected.push({ ...flag, category });
      }
    }
  }
  return detected;
}

function detectModifiers(values) {
  const scale = SKIN_SIGHT_DATA.scale;
  return SKIN_SIGHT_DATA.modifiers.filter(mod => mod.detect(values, scale));
}

function detectPositiveFlags(values, archetype, flagCount) {
  const scale = SKIN_SIGHT_DATA.scale;
  return SKIN_SIGHT_DATA.positiveFlags.filter(pf => pf.detect(values, scale, archetype, flagCount));
}

function calculateSignalClarity(flagCount, detectedFlags) {
  const hasGhost = detectedFlags.some(f => f.id === 'ghost_handoff');
  const hasSilent = detectedFlags.some(f => f.id === 'silent_director');

  if (hasGhost && hasSilent) {
    return SKIN_SIGHT_DATA.signalClarity.find(s => s.id === 'chaotic');
  }
  return SKIN_SIGHT_DATA.signalClarity.find(s => flagCount >= s.min && flagCount <= s.max);
}

// Run tests
let passed = 0;
let failed = 0;

Object.entries(TEST_PRESETS).forEach(([key, preset]) => {
  console.log(`\n📋 Testing: ${preset.name}`);
  console.log('─'.repeat(40));

  const values = preset.values;
  const archetype = detectArchetype(values);
  const inkProfile = detectInkProfile(values, archetype);
  const flags = detectFlags(values, archetype, null);
  const modifiers = detectModifiers(values);
  const positiveFlags = detectPositiveFlags(values, archetype, flags.length);
  const signal = calculateSignalClarity(flags.length, flags);

  console.log(`   Archetype: ${archetype.name} (${archetype.id})`);
  console.log(`   Ink Profile: ${inkProfile.name}`);
  console.log(`   Flags (${flags.length}): ${flags.map(f => f.id).join(', ') || 'none'}`);
  console.log(`   Modifiers: ${modifiers.map(m => m.id).join(', ') || 'none'}`);
  console.log(`   Positive: ${positiveFlags.map(f => f.id).join(', ') || 'none'}`);
  console.log(`   Signal: ${signal.icon} ${signal.label}`);

  // Check expectations
  const expected = preset.expected || {};
  const errors = [];

  if (expected.archetype && archetype.id !== expected.archetype) {
    errors.push(`Expected archetype "${expected.archetype}", got "${archetype.id}"`);
  }

  if (expected.signal && signal.id !== expected.signal) {
    errors.push(`Expected signal "${expected.signal}", got "${signal.id}"`);
  }

  if (expected.flagCount !== undefined && flags.length !== expected.flagCount) {
    errors.push(`Expected ${expected.flagCount} flags, got ${flags.length}`);
  }

  if (expected.flags) {
    const flagIds = flags.map(f => f.id);
    expected.flags.forEach(expectedFlag => {
      if (!flagIds.includes(expectedFlag)) {
        errors.push(`Expected flag "${expectedFlag}" not found`);
      }
    });
  }

  if (expected.modifiers) {
    const modIds = modifiers.map(m => m.id);
    expected.modifiers.forEach(expectedMod => {
      if (!modIds.includes(expectedMod)) {
        errors.push(`Expected modifier "${expectedMod}" not found`);
      }
    });
  }

  if (expected.positiveFlags) {
    const pfIds = positiveFlags.map(f => f.id);
    expected.positiveFlags.forEach(expectedPf => {
      if (!pfIds.includes(expectedPf)) {
        errors.push(`Expected positive flag "${expectedPf}" not found`);
      }
    });
  }

  if (errors.length === 0) {
    console.log('   ✓ PASSED');
    passed++;
  } else {
    console.log('   ✗ FAILED:');
    errors.forEach(e => console.log(`     - ${e}`));
    failed++;
  }
});

// Summary
console.log('\n' + '='.repeat(40));
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log('='.repeat(40));

process.exit(failed > 0 ? 1 : 0);
