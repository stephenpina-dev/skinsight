// ============================================================
// SKIN SIGHT TEST HARNESS
// Accessible via URL parameter ?test=true
// ============================================================

(function() {
  'use strict';

  // Check if test mode is enabled
  const urlParams = new URLSearchParams(window.location.search);
  const testMode = urlParams.get('test') === 'true';

  if (!testMode) return;

  // ============================================================
  // INITIALIZATION
  // ============================================================

  document.addEventListener('DOMContentLoaded', initTestHarness);

  function initTestHarness() {
    // Show test harness container
    const container = document.getElementById('test-harness');
    if (container) {
      container.style.display = 'block';
    }

    // Build the UI
    renderTestPanel();

    // Initialize event listeners
    initTestListeners();

    console.log('🧪 Skin Sight Test Harness initialized');
  }

  // ============================================================
  // RENDER TEST PANEL
  // ============================================================

  function renderTestPanel() {
    const container = document.getElementById('test-harness');
    if (!container) return;

    const questionIds = [
      'incubation', 'permanence_comfort', 'body_intuition', 'canvas_state',
      'inner_vision', 'reference_harmony', 'density_appetite', 'certainty',
      'creative_handoff', 'iteration_comfort', 'openness_to_influence', 'articulation'
    ];

    const questionLabels = {
      incubation: 'Incubation',
      permanence_comfort: 'Permanence',
      body_intuition: 'Body Intuition',
      canvas_state: 'Canvas State',
      inner_vision: 'Inner Vision',
      reference_harmony: 'Ref Harmony',
      density_appetite: 'Density',
      certainty: 'Certainty',
      creative_handoff: 'Creative Handoff',
      iteration_comfort: 'Iteration',
      openness_to_influence: 'Openness',
      articulation: 'Articulation'
    };

    container.innerHTML = `
      <div class="test-header">
        <h2>SKIN SIGHT TEST HARNESS</h2>
        <button class="test-close" id="test-close">&times;</button>
      </div>

      <div class="test-body">
        <div class="test-section">
          <h3>INPUTS</h3>
          <div class="test-inputs">
            ${questionIds.map(id => `
              <div class="test-input-row">
                <label>${questionLabels[id]}</label>
                <div class="test-buttons" data-question="${id}">
                  <button type="button" class="test-value-btn" data-value="2">2</button>
                  <button type="button" class="test-value-btn" data-value="5">5</button>
                  <button type="button" class="test-value-btn" data-value="9">9</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="test-section">
          <h3>OPTIONAL DETAILS</h3>
          <div class="test-details">
            <div class="test-input-row">
              <label>Size</label>
              <select id="test-size">
                <option value="">--</option>
                <option value="tiny">Tiny</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xlarge">XLarge</option>
              </select>
            </div>
            <div class="test-input-row">
              <label>Budget</label>
              <select id="test-budget">
                <option value="">--</option>
                <option value="under_200">Under $200</option>
                <option value="200_500">$200-500</option>
                <option value="500_1000">$500-1000</option>
                <option value="1000_2500">$1000-2500</option>
                <option value="2500_plus">$2500+</option>
              </select>
            </div>
            <div class="test-input-row">
              <label>Timeline</label>
              <select id="test-timeline">
                <option value="">--</option>
                <option value="asap">ASAP</option>
                <option value="1_month">1 Month</option>
                <option value="1_3_months">1-3 Months</option>
                <option value="3_6_months">3-6 Months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
        </div>

        <button type="button" class="test-calculate-btn" id="test-calculate">CALCULATE</button>

        <div class="test-section test-outputs" id="test-outputs">
          <h3>OUTPUTS</h3>
          <div id="test-results">
            <p class="test-placeholder">Click CALCULATE to see results</p>
          </div>
        </div>

        <div class="test-section">
          <h3>PRESETS</h3>
          <div class="test-presets" id="test-presets">
            ${Object.keys(TEST_PRESETS).map(key => `
              <button type="button" class="test-preset-btn" data-preset="${key}">${TEST_PRESETS[key].name}</button>
            `).join('')}
          </div>
        </div>

        <div class="test-section">
          <h3>BATCH TEST</h3>
          <button type="button" class="test-batch-btn" id="test-batch">Run All Presets</button>
          <div id="test-batch-results"></div>
        </div>
      </div>
    `;
  }

  // ============================================================
  // EVENT LISTENERS
  // ============================================================

  function initTestListeners() {
    const container = document.getElementById('test-harness');
    if (!container) return;

    // Close button
    container.querySelector('#test-close').addEventListener('click', () => {
      container.style.display = 'none';
    });

    // Value buttons
    container.querySelectorAll('.test-value-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const row = e.target.closest('.test-buttons');
        row.querySelectorAll('.test-value-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
      });
    });

    // Calculate button
    container.querySelector('#test-calculate').addEventListener('click', runTest);

    // Preset buttons
    container.querySelectorAll('.test-preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        loadPreset(e.target.dataset.preset);
      });
    });

    // Batch test button
    container.querySelector('#test-batch').addEventListener('click', runBatchTest);
  }

  // ============================================================
  // TEST FUNCTIONS
  // ============================================================

  function getTestValues() {
    const values = {};
    document.querySelectorAll('.test-buttons').forEach(row => {
      const questionId = row.dataset.question;
      const activeBtn = row.querySelector('.test-value-btn.active');
      if (activeBtn) {
        values[questionId] = parseInt(activeBtn.dataset.value, 10);
      }
    });
    return values;
  }

  function getTestDetails() {
    return {
      size: document.getElementById('test-size')?.value || null,
      budget: document.getElementById('test-budget')?.value || null,
      timeline: document.getElementById('test-timeline')?.value || null
    };
  }

  function runTest() {
    const values = getTestValues();
    const details = getTestDetails();

    // Check if all values are set
    if (Object.keys(values).length < 12) {
      document.getElementById('test-results').innerHTML = `
        <p class="test-error">Please set all 12 values first</p>
      `;
      return;
    }

    // Run detection using data.js functions
    const scale = SKIN_SIGHT_DATA.scale;

    // Detect archetype
    const archetypes = [...SKIN_SIGHT_DATA.archetypes].sort((a, b) => a.priority - b.priority);
    let archetype = archetypes[archetypes.length - 1];
    for (const arch of archetypes) {
      if (arch.detect(values, scale)) {
        archetype = arch;
        break;
      }
    }

    // Detect ink profile
    const inkProfiles = [...SKIN_SIGHT_DATA.inkProfiles].sort((a, b) => a.priority - b.priority);
    let inkProfile = inkProfiles[inkProfiles.length - 1];
    for (const profile of inkProfiles) {
      if (profile.detect(values, scale, archetype)) {
        inkProfile = profile;
        break;
      }
    }

    // Detect flags
    const flags = [];
    for (const category of ['intuition', 'vision', 'style', 'cross']) {
      for (const flag of SKIN_SIGHT_DATA.flags[category]) {
        if (flag.detect(values, scale, archetype, details)) {
          flags.push({ ...flag, category });
        }
      }
    }

    // Detect modifiers
    const modifiers = SKIN_SIGHT_DATA.modifiers.filter(mod => mod.detect(values, scale));

    // Detect positive flags
    const positiveFlags = SKIN_SIGHT_DATA.positiveFlags.filter(pf => pf.detect(values, scale, archetype, flags.length));

    // Calculate signal clarity
    const hasGhost = flags.some(f => f.id === 'ghost_handoff');
    const hasSilent = flags.some(f => f.id === 'silent_director');
    let signal;
    if (hasGhost && hasSilent) {
      signal = SKIN_SIGHT_DATA.signalClarity.find(s => s.id === 'chaotic');
    } else {
      signal = SKIN_SIGHT_DATA.signalClarity.find(s => flags.length >= s.min && flags.length <= s.max);
    }

    // Render results
    renderTestResults({
      values,
      details,
      archetype,
      inkProfile,
      flags,
      modifiers,
      positiveFlags,
      signal
    });
  }

  function renderTestResults(results) {
    const { archetype, inkProfile, flags, modifiers, positiveFlags, signal } = results;

    const severityColors = {
      high: '#dc3545',
      medium: '#ffc107',
      low: '#17a2b8'
    };

    document.getElementById('test-results').innerHTML = `
      <div class="test-result-block">
        <div class="test-result-label">Archetype:</div>
        <div class="test-result-value">${archetype.name.toUpperCase()}</div>
        <div class="test-result-detection">${archetype.detectionDesc}</div>
      </div>

      <div class="test-result-block">
        <div class="test-result-label">Ink Profile:</div>
        <div class="test-result-value">${inkProfile.name}</div>
        <div class="test-result-detection">${inkProfile.detectionDesc}</div>
      </div>

      <div class="test-result-block">
        <div class="test-result-label">Flags (${flags.length}):</div>
        ${flags.length === 0 ? '<div class="test-result-none">None</div>' :
          flags.map(f => `
            <div class="test-result-flag" style="border-left: 3px solid ${severityColors[f.severity]}">
              <span class="test-flag-severity ${f.severity}">${f.severity[0].toUpperCase()}</span>
              ${f.label}
              <div class="test-result-detection">${f.detectionDesc}</div>
            </div>
          `).join('')}
      </div>

      <div class="test-result-block">
        <div class="test-result-label">Modifiers (${modifiers.length}):</div>
        ${modifiers.length === 0 ? '<div class="test-result-none">None</div>' :
          modifiers.map(m => `
            <div class="test-result-modifier">
              ${m.icon} ${m.label}
            </div>
          `).join('')}
      </div>

      <div class="test-result-block">
        <div class="test-result-label">Positive Flags:</div>
        ${positiveFlags.length === 0 ? '<div class="test-result-none">None</div>' :
          positiveFlags.map(f => `
            <div class="test-result-positive">
              ${f.icon} ${f.label}
            </div>
          `).join('')}
      </div>

      <div class="test-result-block">
        <div class="test-result-label">Signal:</div>
        <div class="test-result-signal ${signal.id}">
          ${signal.icon} ${signal.label}
        </div>
        <div class="test-result-detection">${signal.display}</div>
      </div>
    `;
  }

  function loadPreset(presetKey) {
    const preset = TEST_PRESETS[presetKey];
    if (!preset) return;

    // Set all value buttons
    Object.entries(preset.values).forEach(([questionId, value]) => {
      const row = document.querySelector(`.test-buttons[data-question="${questionId}"]`);
      if (row) {
        row.querySelectorAll('.test-value-btn').forEach(btn => {
          btn.classList.remove('active');
          if (parseInt(btn.dataset.value, 10) === value) {
            btn.classList.add('active');
          }
        });
      }
    });

    // Run the test
    runTest();
  }

  function runBatchTest() {
    const resultsContainer = document.getElementById('test-batch-results');
    const results = [];

    Object.entries(TEST_PRESETS).forEach(([key, preset]) => {
      const values = preset.values;
      const scale = SKIN_SIGHT_DATA.scale;

      // Detect archetype
      const archetypes = [...SKIN_SIGHT_DATA.archetypes].sort((a, b) => a.priority - b.priority);
      let archetype = archetypes[archetypes.length - 1];
      for (const arch of archetypes) {
        if (arch.detect(values, scale)) {
          archetype = arch;
          break;
        }
      }

      // Detect flags
      const flags = [];
      for (const category of ['intuition', 'vision', 'style', 'cross']) {
        for (const flag of SKIN_SIGHT_DATA.flags[category]) {
          if (flag.detect(values, scale, archetype, null)) {
            flags.push(flag);
          }
        }
      }

      // Detect modifiers
      const modifiers = SKIN_SIGHT_DATA.modifiers.filter(mod => mod.detect(values, scale));

      // Detect positive flags
      const positiveFlags = SKIN_SIGHT_DATA.positiveFlags.filter(pf => pf.detect(values, scale, archetype, flags.length));

      // Calculate signal clarity
      const hasGhost = flags.some(f => f.id === 'ghost_handoff');
      const hasSilent = flags.some(f => f.id === 'silent_director');
      let signal;
      if (hasGhost && hasSilent) {
        signal = SKIN_SIGHT_DATA.signalClarity.find(s => s.id === 'chaotic');
      } else {
        signal = SKIN_SIGHT_DATA.signalClarity.find(s => flags.length >= s.min && flags.length <= s.max);
      }

      // Check expectations
      const expected = preset.expected || {};
      const checks = [];

      if (expected.archetype && archetype.id !== expected.archetype) {
        checks.push(`❌ Expected archetype "${expected.archetype}", got "${archetype.id}"`);
      } else if (expected.archetype) {
        checks.push(`✓ Archetype: ${archetype.id}`);
      }

      if (expected.signal && signal.id !== expected.signal) {
        checks.push(`❌ Expected signal "${expected.signal}", got "${signal.id}"`);
      } else if (expected.signal) {
        checks.push(`✓ Signal: ${signal.id}`);
      }

      if (expected.flags) {
        const flagIds = flags.map(f => f.id);
        expected.flags.forEach(expectedFlag => {
          if (!flagIds.includes(expectedFlag)) {
            checks.push(`❌ Expected flag "${expectedFlag}" not found`);
          } else {
            checks.push(`✓ Flag: ${expectedFlag}`);
          }
        });
      }

      if (expected.modifiers) {
        const modIds = modifiers.map(m => m.id);
        expected.modifiers.forEach(expectedMod => {
          if (!modIds.includes(expectedMod)) {
            checks.push(`❌ Expected modifier "${expectedMod}" not found`);
          } else {
            checks.push(`✓ Modifier: ${expectedMod}`);
          }
        });
      }

      if (expected.positiveFlags) {
        const pfIds = positiveFlags.map(f => f.id);
        expected.positiveFlags.forEach(expectedPf => {
          if (!pfIds.includes(expectedPf)) {
            checks.push(`❌ Expected positive flag "${expectedPf}" not found`);
          } else {
            checks.push(`✓ Positive: ${expectedPf}`);
          }
        });
      }

      if (expected.flagCount !== undefined && flags.length !== expected.flagCount) {
        checks.push(`❌ Expected ${expected.flagCount} flags, got ${flags.length}`);
      } else if (expected.flagCount !== undefined) {
        checks.push(`✓ Flag count: ${flags.length}`);
      }

      const passed = checks.every(c => c.startsWith('✓'));

      results.push({
        name: preset.name,
        passed,
        archetype: archetype.id,
        signal: signal.id,
        flagCount: flags.length,
        checks
      });
    });

    // Render batch results
    const passCount = results.filter(r => r.passed).length;
    resultsContainer.innerHTML = `
      <div class="test-batch-summary">
        ${passCount}/${results.length} presets passed
      </div>
      ${results.map(r => `
        <div class="test-batch-item ${r.passed ? 'passed' : 'failed'}">
          <div class="test-batch-name">${r.passed ? '✓' : '❌'} ${r.name}</div>
          <div class="test-batch-details">
            Archetype: ${r.archetype} | Signal: ${r.signal} | Flags: ${r.flagCount}
          </div>
          ${r.checks.length > 0 ? `
            <div class="test-batch-checks">
              ${r.checks.map(c => `<div class="${c.startsWith('✓') ? 'check-pass' : 'check-fail'}">${c}</div>`).join('')}
            </div>
          ` : ''}
        </div>
      `).join('')}
    `;
  }

})();
