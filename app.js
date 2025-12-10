// ============================================================
// SKIN SIGHT - Application Logic
// Quiz flow, calculations, form handling, submission
// ============================================================

(function() {
  'use strict';

  // ============================================================
  // STATE
  // ============================================================

  const STORAGE_KEY = 'skinsight_progress';
  const PROGRESS_STEPS = {
    landing: 0,
    intuition: 1,
    vision: 2,
    style: 3,
    reveal: 4,
    details: 5,
    confirmation: 6
  };

  let currentConfig = null;
  let questionValues = {};
  let currentScreen = 'landing';
  let calculatedResults = null;
  let uploadedFiles = [];

  // ============================================================
  // INITIALIZATION
  // ============================================================

  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    await loadConfig();
    applyBranding();
    initQuestions();
    initNavigation();
    initForm();
    loadProgress();
    updateProgressBar();
  }

  // ============================================================
  // CONFIG LOADING
  // ============================================================

  async function loadConfig() {
    // Extract artist slug from URL path
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const artistSlug = pathParts[0] || 'default';

    try {
      const response = await fetch(`configs/${artistSlug}.json`);
      if (response.ok) {
        currentConfig = await response.json();
      } else {
        throw new Error('Config not found');
      }
    } catch (error) {
      // Fall back to default config
      try {
        const defaultResponse = await fetch('configs/default.json');
        if (defaultResponse.ok) {
          currentConfig = await defaultResponse.json();
        } else {
          // Use hardcoded fallback
          currentConfig = getDefaultConfig();
        }
      } catch (e) {
        currentConfig = getDefaultConfig();
      }
    }
  }

  function getDefaultConfig() {
    return {
      artistId: 'default',
      displayName: 'Skin Sight',
      logoUrl: null,
      colors: {
        primary: '#C9885C',
        secondary: '#8FA878'
      },
      bookingUrl: '#',
      instagramHandle: '',
      submission: {
        method: 'formspree',
        formId: 'YOUR_FORMSPREE_ID'
      },
      options: {
        budgetRanges: null,
        showInstagram: true,
        showPhone: false,
        requireReferences: false
      }
    };
  }

  // ============================================================
  // BRANDING
  // ============================================================

  function applyBranding() {
    const root = document.documentElement;

    // Apply colors
    if (currentConfig.colors) {
      if (currentConfig.colors.primary) {
        root.style.setProperty('--color-primary', currentConfig.colors.primary);
        root.style.setProperty('--color-primary-hover', adjustColor(currentConfig.colors.primary, -15));
        root.style.setProperty('--border-focus', currentConfig.colors.primary);
        root.style.setProperty('--color-highlight', adjustColor(currentConfig.colors.primary, 40, 0.3));
      }
      if (currentConfig.colors.secondary) {
        root.style.setProperty('--color-secondary', currentConfig.colors.secondary);
        root.style.setProperty('--color-secondary-hover', adjustColor(currentConfig.colors.secondary, -15));
      }
    }

    // Apply logo or text
    const logoArea = document.getElementById('logo-area');
    const logoText = document.getElementById('logo-text');

    if (currentConfig.logoUrl) {
      const img = document.createElement('img');
      img.src = currentConfig.logoUrl;
      img.alt = currentConfig.displayName;
      img.className = 'logo';
      logoArea.innerHTML = '';
      logoArea.appendChild(img);
    } else if (logoText) {
      logoText.textContent = currentConfig.displayName;
    }

    // Update confirmation message
    const confirmationMessage = document.getElementById('confirmation-message');
    if (confirmationMessage) {
      confirmationMessage.textContent = `${currentConfig.displayName} will be in touch soon.`;
    }

    // Update booking CTA
    const bookingCTA = document.getElementById('booking-cta');
    if (bookingCTA) {
      bookingCTA.href = currentConfig.bookingUrl || '#';
      bookingCTA.textContent = `Book with ${currentConfig.displayName}`;
    }

    // Show/hide optional form fields
    const instagramGroup = document.getElementById('instagram-group');
    const phoneGroup = document.getElementById('phone-group');

    if (instagramGroup && currentConfig.options) {
      instagramGroup.style.display = currentConfig.options.showInstagram !== false ? 'block' : 'none';
    }
    if (phoneGroup && currentConfig.options) {
      phoneGroup.style.display = currentConfig.options.showPhone ? 'block' : 'none';
    }

    // Update page title
    document.title = `${currentConfig.displayName} - Tattoo Quiz`;
  }

  function adjustColor(hex, amount, alpha = 1) {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Adjust brightness
    r = Math.max(0, Math.min(255, r + amount));
    g = Math.max(0, Math.min(255, g + amount));
    b = Math.max(0, Math.min(255, b + amount));

    if (alpha < 1) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  // ============================================================
  // QUESTION INITIALIZATION (Bubble Selectors)
  // ============================================================

  function initQuestions() {
    // Add event listeners to all bubble option radio buttons
    document.querySelectorAll('.bubble-option input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', handleQuestionChange);
    });
  }

  function handleQuestionChange(e) {
    const questionId = e.target.name;
    const value = parseInt(e.target.value, 10);
    const section = e.target.closest('.quiz-section').dataset.section;

    // Store the value
    questionValues[questionId] = value;

    // Check if section is complete
    checkSectionComplete(section);

    // Save progress
    saveProgress();
  }

  function getQuestionValues() {
    const values = {};
    document.querySelectorAll('.bubble-group').forEach(group => {
      const selected = group.querySelector('input[type="radio"]:checked');
      if (selected) {
        const name = selected.name;
        const value = parseInt(selected.value, 10);
        values[name] = value;
      }
    });
    return values;
  }

  // ============================================================
  // SECTION NAVIGATION
  // ============================================================

  function initNavigation() {
    // Begin button
    document.getElementById('begin-btn').addEventListener('click', () => {
      navigateToScreen('section-intuition');
    });

    // Continue buttons
    document.getElementById('continue-intuition').addEventListener('click', () => {
      navigateToScreen('section-vision');
    });

    document.getElementById('continue-vision').addEventListener('click', () => {
      navigateToScreen('section-style');
    });

    document.getElementById('continue-style').addEventListener('click', () => {
      calculateResults();
      navigateToScreen('reveal');
    });

    // Continue to details
    document.getElementById('continue-to-details').addEventListener('click', () => {
      navigateToScreen('details');
    });

    // Retake quiz
    document.getElementById('retake-btn').addEventListener('click', () => {
      clearProgress();
      resetQuiz();
      navigateToScreen('landing');
    });
  }

  function navigateToScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });

    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.classList.add('active');
      currentScreen = screenId;

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Update progress bar
      updateProgressBar();

      // Save progress
      saveProgress();
    }
  }

  function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');

    // Map screen to progress step
    let step = 0;
    if (currentScreen === 'landing') {
      step = 0;
      progressContainer.style.display = 'none';
    } else if (currentScreen === 'section-intuition') {
      step = 1;
      progressContainer.style.display = 'block';
    } else if (currentScreen === 'section-vision') {
      step = 2;
      progressContainer.style.display = 'block';
    } else if (currentScreen === 'section-style') {
      step = 3;
      progressContainer.style.display = 'block';
    } else if (currentScreen === 'reveal') {
      step = 4;
      progressContainer.style.display = 'block';
    } else if (currentScreen === 'details') {
      step = 5;
      progressContainer.style.display = 'block';
    } else if (currentScreen === 'confirmation') {
      step = 6;
      progressContainer.style.display = 'none';
    }

    const percentage = (step / 6) * 100;
    progressBar.style.width = `${percentage}%`;
  }

  function checkSectionComplete(section) {
    let sectionQuestions;

    switch (section) {
      case 'intuition':
        sectionQuestions = ['incubation', 'permanence_comfort', 'body_intuition', 'canvas_state'];
        break;
      case 'vision':
        sectionQuestions = ['inner_vision', 'reference_harmony', 'density_appetite', 'certainty'];
        break;
      case 'style':
        sectionQuestions = ['creative_handoff', 'iteration_comfort', 'openness_to_influence', 'articulation'];
        break;
      default:
        return;
    }

    // Check if all questions in the section have been answered
    const allAnswered = sectionQuestions.every(questionId => {
      const radio = document.querySelector(`input[name="${questionId}"]:checked`);
      return radio !== null;
    });

    const continueBtn = document.getElementById(`continue-${section}`);

    if (continueBtn) {
      continueBtn.disabled = !allAnswered;
    }
  }

  // ============================================================
  // CALCULATION LOGIC
  // ============================================================

  function calculateResults() {
    const values = getQuestionValues();
    questionValues = values;

    // Detect archetype
    const archetype = detectArchetype(values);

    // Detect ink profile
    const inkProfile = detectInkProfile(values, archetype);

    // Detect modifiers
    const detectedModifiers = detectModifiers(values);

    // Detect flags (initial without details)
    const detectedFlags = detectFlags(values, archetype, null);

    // Detect positive flags
    const detectedPositiveFlags = detectPositiveFlags(values, archetype, detectedFlags.length);

    // Calculate signal clarity
    const signal = calculateSignalClarity(detectedFlags.length, detectedFlags);

    calculatedResults = {
      archetype,
      inkProfile,
      modifiers: detectedModifiers,
      flags: detectedFlags,
      positiveFlags: detectedPositiveFlags,
      signal,
      questionValues: values
    };

    // Update reveal screen
    renderReveal();
  }

  function detectArchetype(values) {
    // Priority order check
    // Note: With bubble values (2, 5, 9), thresholds are adjusted accordingly
    const checks = [
      {
        id: 'debut',
        check: () => values.canvas_state <= 2
      },
      {
        id: 'compass',
        check: () => values.reference_harmony <= 2 && values.certainty <= 5 && values.inner_vision <= 5
      },
      {
        id: 'canvas',
        check: () => values.certainty <= 2 && values.articulation <= 5 && values.creative_handoff >= 5
      },
      {
        id: 'spark',
        check: () => values.incubation <= 2 && values.permanence_comfort >= 5
      },
      {
        id: 'architect',
        check: () => values.creative_handoff <= 2 && values.articulation >= 9 && values.inner_vision >= 9
      },
      {
        id: 'muse',
        check: () => values.creative_handoff >= 9 && values.openness_to_influence >= 9
      },
      {
        id: 'mythmaker',
        check: () => values.inner_vision <= 5 && values.certainty >= 9 && values.articulation >= 5
      },
      {
        id: 'visionary',
        check: () => values.inner_vision >= 9 && values.reference_harmony >= 9 && values.certainty >= 5
      },
      {
        id: 'deliberate',
        check: () => values.incubation >= 9 && values.reference_harmony >= 9 && values.iteration_comfort >= 9
      },
      {
        id: 'collector',
        check: () => values.canvas_state >= 9 && values.certainty >= 9 && values.reference_harmony >= 9
      },
      {
        id: 'rhythm',
        check: () => values.canvas_state >= 5 && values.creative_handoff >= 5 && values.openness_to_influence >= 9 && values.iteration_comfort >= 5
      },
      {
        id: 'attuned',
        check: () => true // Default fallback
      }
    ];

    for (const archetypeCheck of checks) {
      if (archetypeCheck.check()) {
        return archetypes.find(a => a.id === archetypeCheck.id);
      }
    }

    return archetypes.find(a => a.id === 'attuned');
  }

  function detectInkProfile(values, archetype) {
    const checks = [
      {
        id: 'still_unfolding',
        check: () => values.certainty <= 2 && values.reference_harmony <= 5
      },
      {
        id: 'artists_hand',
        check: () => values.creative_handoff >= 9 && values.inner_vision <= 5 && values.openness_to_influence >= 9
      },
      {
        id: 'light_touch',
        check: () => values.density_appetite <= 2 && values.certainty >= 5
      },
      {
        id: 'full_canvas',
        check: () => values.density_appetite >= 9 && values.reference_harmony >= 5 && values.certainty >= 5
      },
      {
        id: 'precision',
        check: () => values.inner_vision >= 9 && values.certainty >= 9 && values.density_appetite === 5
      },
      {
        id: 'soft_edge',
        check: () => values.inner_vision <= 5 && values.creative_handoff >= 5 && values.density_appetite <= 5
      },
      {
        id: 'bold_classic',
        check: () => values.density_appetite >= 5 && values.reference_harmony >= 9 && values.inner_vision >= 5 && values.certainty >= 9
      },
      {
        id: 'living_story',
        check: () => archetype && archetype.id === 'mythmaker' || (values.inner_vision === 5 && values.certainty >= 5)
      }
    ];

    for (const profileCheck of checks) {
      if (profileCheck.check()) {
        return inkProfiles.find(p => p.id === profileCheck.id);
      }
    }

    return inkProfiles.find(p => p.id === 'living_story');
  }

  function detectModifiers(values) {
    const detected = [];

    if (values.certainty <= 2) {
      detected.push(modifiers.find(m => m.id === 'low_certainty'));
    }
    if (values.reference_harmony <= 2) {
      detected.push(modifiers.find(m => m.id === 'scattered_references'));
    }
    if (values.certainty >= 9 && values.reference_harmony >= 9) {
      detected.push(modifiers.find(m => m.id === 'locked_in'));
    }
    if (values.reference_harmony <= 2 && values.density_appetite >= 9) {
      detected.push(modifiers.find(m => m.id === 'eclectic_taste'));
    }
    if (values.inner_vision <= 2) {
      detected.push(modifiers.find(m => m.id === 'feeling_over_image'));
    }
    if (values.inner_vision >= 9 && values.articulation >= 9) {
      detected.push(modifiers.find(m => m.id === 'image_over_feeling'));
    }
    // True middle: all vision questions at middle value (5)
    if (values.inner_vision === 5 &&
        values.reference_harmony === 5 &&
        values.density_appetite === 5 &&
        values.certainty === 5) {
      detected.push(modifiers.find(m => m.id === 'true_middle'));
    }
    if ((values.density_appetite >= 9 || values.density_appetite <= 2) && values.certainty <= 5) {
      detected.push(modifiers.find(m => m.id === 'style_curious'));
    }

    return detected.filter(Boolean);
  }

  function detectFlags(values, archetype, details) {
    const detected = [];

    // Intuition flags
    if (values.incubation <= 2 && values.permanence_comfort <= 2) {
      detected.push({ ...flags.intuition[0] }); // Impulse Alert
    }
    if (values.body_intuition >= 9 && values.canvas_state <= 2) {
      detected.push({ ...flags.intuition[1] }); // Pain Blind
    }
    if (values.canvas_state <= 2 && values.certainty >= 9) {
      detected.push({ ...flags.intuition[2] }); // Fresh but Certain
    }
    if (values.incubation <= 2 && values.density_appetite >= 9) {
      detected.push({ ...flags.intuition[3] }); // Rushed Timeline
    }

    // Vision flags
    if (values.reference_harmony <= 2 && values.certainty >= 9) {
      detected.push({ ...flags.vision[0] }); // Pinterest Storm
    }
    if (values.inner_vision <= 2 && values.certainty >= 9) {
      detected.push({ ...flags.vision[1] }); // Fog Vision
    }
    if (details && values.density_appetite >= 9 && (details.size === 'tiny' || details.size === 'small')) {
      detected.push({ ...flags.vision[2] }); // Size vs Detail
    }
    if (values.density_appetite === 5 && values.certainty <= 2) {
      detected.push({ ...flags.vision[3] }); // Complexity Unclear
    }

    // Style flags
    if (values.creative_handoff >= 9 && values.openness_to_influence <= 2) {
      detected.push({ ...flags.style[0] }); // Control Paradox
    }
    if (values.articulation <= 2 && values.creative_handoff <= 2) {
      detected.push({ ...flags.style[1] }); // Silent Director
    }
    if (values.iteration_comfort >= 9 && values.articulation <= 2) {
      detected.push({ ...flags.style[2] }); // Perfectionist Loop
    }
    if (values.iteration_comfort <= 2 && values.articulation <= 5) {
      detected.push({ ...flags.style[3] }); // One Shot Pressure
    }
    if (values.openness_to_influence >= 9 && values.iteration_comfort <= 2) {
      detected.push({ ...flags.style[4] }); // Yes Then No
    }

    // Cross section flags
    if (details && values.density_appetite >= 9 && details.budget === 'under_200') {
      detected.push({ ...flags.cross[0] }); // Champagne / Beer
    }
    if (values.inner_vision <= 2 && values.creative_handoff <= 2 && values.articulation <= 2) {
      detected.push({ ...flags.cross[1] }); // Ghost Handoff
    }
    if (values.canvas_state >= 9 && values.certainty <= 2 && values.reference_harmony <= 2) {
      detected.push({ ...flags.cross[2] }); // Experienced but Lost
    }
    if (archetype && archetype.id === 'attuned' && values.incubation <= 2) {
      detected.push({ ...flags.cross[3] }); // Ready but Rushed
    }
    if (details && values.incubation <= 2 && details.timeline === 'asap') {
      detected.push({ ...flags.cross[4] }); // Timeline Crunch
    }

    return detected;
  }

  function detectPositiveFlags(values, archetype, flagCount) {
    const detected = [];

    // Calculate section averages
    const intuitionAvg = (values.incubation + values.permanence_comfort + values.body_intuition + values.canvas_state) / 4;
    const visionAvg = (values.inner_vision + values.reference_harmony + values.density_appetite + values.certainty) / 4;
    const styleAvg = (values.creative_handoff + values.iteration_comfort + values.openness_to_influence + values.articulation) / 4;

    if (intuitionAvg >= 7 && visionAvg >= 7 && styleAvg >= 7 && flagCount === 0) {
      detected.push(positiveFlags[0]); // Dream Client
    }
    if (values.canvas_state >= 5 && archetype && archetype.id === 'rhythm' && flagCount === 0) {
      detected.push(positiveFlags[1]); // Smooth Repeat
    }
    if (archetype && archetype.id === 'muse' && values.openness_to_influence >= 9 && values.creative_handoff >= 9) {
      detected.push(positiveFlags[2]); // Trust Given
    }

    return detected.filter(Boolean);
  }

  function calculateSignalClarity(flagCount, detectedFlags) {
    const hasGhostHandoff = detectedFlags.some(f => f.id === 'ghost_handoff');
    const hasSilentDirector = detectedFlags.some(f => f.id === 'silent_director');

    if (flagCount >= 5 || (hasGhostHandoff && hasSilentDirector)) {
      return signalClarity.levels[3]; // Chaotic
    }
    if (flagCount >= 3) {
      return signalClarity.levels[2]; // Mixed
    }
    if (flagCount >= 1) {
      return signalClarity.levels[1]; // Some Noise
    }
    return signalClarity.levels[0]; // Clear
  }

  // ============================================================
  // REVEAL RENDERING
  // ============================================================

  function renderReveal() {
    if (!calculatedResults) return;

    const { archetype, inkProfile } = calculatedResults;

    // Update archetype info
    document.getElementById('archetype-name').textContent = archetype.name;
    document.getElementById('archetype-oneliner').textContent = `"${archetype.oneLiner}"`;
    document.getElementById('archetype-copy').textContent = archetype.revealCopy;

    // Update ink profile info
    document.getElementById('profile-name').textContent = inkProfile.name;
    document.getElementById('profile-tagline').textContent = `"${inkProfile.tagline}"`;
    document.getElementById('profile-copy').textContent = inkProfile.clientCopy;

    // Render style matches (only if there are actual styles, not artist instructions)
    const styleMatchesContainer = document.getElementById('style-matches');
    if (inkProfile.styleMatches && inkProfile.styleMatches.length > 0) {
      styleMatchesContainer.innerHTML = inkProfile.styleMatches
        .map(style => `<span class="style-tag">${style}</span>`)
        .join('');
      styleMatchesContainer.style.display = 'flex';
    } else {
      styleMatchesContainer.style.display = 'none';
    }
  }

  // ============================================================
  // FORM HANDLING
  // ============================================================

  function initForm() {
    const form = document.getElementById('details-form');
    const noteTextarea = document.getElementById('note');
    const noteCount = document.getElementById('note-count');
    const timelineRadios = document.querySelectorAll('input[name="timeline"]');
    const specificDateField = document.getElementById('specific-date-field');
    const fileInput = document.getElementById('references');
    const fileList = document.getElementById('file-list');

    // Character count for note
    if (noteTextarea && noteCount) {
      noteTextarea.addEventListener('input', () => {
        noteCount.textContent = noteTextarea.value.length;
      });
    }

    // Timeline specific date toggle
    timelineRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'specific' && radio.checked) {
          specificDateField.style.display = 'block';
        } else if (radio.checked) {
          specificDateField.style.display = 'none';
        }
      });
    });

    // File upload handling
    if (fileInput) {
      fileInput.addEventListener('change', handleFileUpload);
    }

    // Form submission
    if (form) {
      form.addEventListener('submit', handleFormSubmit);
    }
  }

  function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    const fileList = document.getElementById('file-list');
    const maxFiles = 5;

    // Limit to max files
    const newFiles = files.slice(0, maxFiles - uploadedFiles.length);
    uploadedFiles = [...uploadedFiles, ...newFiles].slice(0, maxFiles);

    // Render file list
    renderFileList();

    // Clear input to allow re-uploading same file
    e.target.value = '';
  }

  function renderFileList() {
    const fileList = document.getElementById('file-list');
    if (!fileList) return;

    fileList.innerHTML = uploadedFiles.map((file, index) => `
      <div class="file-item">
        <span>${file.name}</span>
        <button type="button" class="file-remove" data-index="${index}" aria-label="Remove file">&times;</button>
      </div>
    `).join('');

    // Add remove handlers
    fileList.querySelectorAll('.file-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        uploadedFiles.splice(index, 1);
        renderFileList();
      });
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const errors = validateForm(formData);

    if (errors.length > 0) {
      showErrors(errors);
      return;
    }

    // Show loading
    showLoading(true);

    // Recalculate flags with details
    const details = {
      placement: formData.get('placement'),
      size: formData.get('size'),
      budget: formData.get('budget'),
      timeline: formData.get('timeline'),
      specificDate: formData.get('specific_date') || null
    };

    const updatedFlags = detectFlags(calculatedResults.questionValues, calculatedResults.archetype, details);
    calculatedResults.flags = updatedFlags;
    calculatedResults.signal = calculateSignalClarity(updatedFlags.length, updatedFlags);

    // Build submission data
    const submissionData = buildSubmissionData(formData, details);

    // Submit
    try {
      await submitData(submissionData);
      clearProgress();
      navigateToScreen('confirmation');
    } catch (error) {
      showErrors(['Something went wrong. Please try again or contact the artist directly.']);
    } finally {
      showLoading(false);
    }
  }

  function validateForm(formData) {
    const errors = [];

    if (!formData.get('placement')) {
      errors.push('Please select a placement');
    }
    if (!formData.get('size')) {
      errors.push('Please select a size');
    }
    if (!formData.get('budget')) {
      errors.push('Please select a budget');
    }
    if (!formData.get('timeline')) {
      errors.push('Please select a timeline');
    }
    if (!formData.get('name') || formData.get('name').trim() === '') {
      errors.push('Please enter your name');
    }

    const email = formData.get('email');
    if (!email || !isValidEmail(email)) {
      errors.push('Please enter a valid email address');
    }

    return errors;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showErrors(errors) {
    const errorContainer = document.getElementById('form-errors');
    if (errorContainer) {
      errorContainer.innerHTML = errors.map(e => `<p class="error">${e}</p>`).join('');
      errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function showLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.style.display = show ? 'flex' : 'none';
    }
  }

  function buildSubmissionData(formData, details) {
    const { archetype, inkProfile, modifiers: mods, flags: flgs, positiveFlags: posFlags, signal, questionValues: values } = calculatedResults;

    return {
      // Meta
      timestamp: new Date().toISOString(),
      artistId: currentConfig.artistId,

      // Results
      archetype: {
        id: archetype.id,
        name: archetype.name,
        oneLiner: archetype.oneLiner
      },
      inkProfile: {
        id: inkProfile.id,
        name: inkProfile.name,
        tagline: inkProfile.tagline,
        styleMatches: inkProfile.styleMatches,
        artistTags: inkProfile.artistTags || []
      },

      // Signal
      signalClarity: {
        level: signal.label,
        icon: signal.icon,
        display: signal.display
      },

      // Flags
      flags: flgs.map(f => ({
        label: f.label,
        severity: f.severity,
        artistNote: f.artistNote
      })),
      positiveFlags: posFlags.map(f => ({
        label: f.label,
        icon: f.icon,
        artistNote: f.artistNote
      })),

      // Modifiers
      modifiers: mods.map(m => ({
        icon: m.icon,
        label: m.label,
        artistNote: m.artistNote
      })),

      // Raw scores
      questionValues: values,

      // Artist notes
      artistSummary: archetype.artistNote.summary,
      artistHowToWork: archetype.artistNote.howToWork,
      artistWatchFor: archetype.artistNote.watchFor,
      inkProfileArtistCopy: inkProfile.artistCopy,

      // Details
      details: {
        placement: details.placement,
        size: details.size,
        budget: details.budget,
        timeline: details.timeline,
        specificDate: details.specificDate,
        pinterestUrl: formData.get('pinterest') || null,
        note: formData.get('note') || null
      },

      // Contact
      contact: {
        name: formData.get('name'),
        email: formData.get('email'),
        instagram: formData.get('instagram') || null,
        phone: formData.get('phone') || null
      },

      // Formatted email body
      emailBody: formatEmailBody({
        archetype,
        inkProfile,
        signal,
        flags: flgs,
        positiveFlags: posFlags,
        modifiers: mods,
        artistSummary: archetype.artistNote.summary,
        artistHowToWork: archetype.artistNote.howToWork,
        artistWatchFor: archetype.artistNote.watchFor,
        inkProfileArtistCopy: inkProfile.artistCopy,
        details,
        contact: {
          name: formData.get('name'),
          email: formData.get('email'),
          instagram: formData.get('instagram') || null,
          phone: formData.get('phone') || null
        },
        pinterestUrl: formData.get('pinterest') || null,
        note: formData.get('note') || null,
        timestamp: new Date().toISOString()
      })
    };
  }

  function formatEmailBody(data) {
    let body = `NEW SKIN SIGHT SUBMISSION
========================

CLIENT: ${data.contact.name}
EMAIL: ${data.contact.email}`;

    if (data.contact.instagram) {
      body += `\nINSTAGRAM: ${data.contact.instagram}`;
    }
    if (data.contact.phone) {
      body += `\nPHONE: ${data.contact.phone}`;
    }

    body += `

ARCHETYPE: ${data.archetype.name}
"${data.archetype.oneLiner}"

INK PROFILE: ${data.inkProfile.name}
"${data.inkProfile.tagline}"`;

    if (data.inkProfile.styleMatches && data.inkProfile.styleMatches.length > 0) {
      body += `\nStyle matches: ${data.inkProfile.styleMatches.join(', ')}`;
    }
    if (data.inkProfile.artistTags && data.inkProfile.artistTags.length > 0) {
      body += `\nArtist guidance: ${data.inkProfile.artistTags.join(', ')}`;
    }

    body += `

SIGNAL: ${data.signal.icon} ${data.signal.label}
${data.signal.display}`;

    if (data.flags.length > 0) {
      body += `

FLAGS:
${data.flags.map(f => `- ${f.label} (${f.severity})\n  ${f.artistNote}`).join('\n\n')}`;
    }

    if (data.positiveFlags.length > 0) {
      body += `

GREEN LIGHTS:
${data.positiveFlags.map(f => `${f.icon} ${f.label}\n  ${f.artistNote}`).join('\n\n')}`;
    }

    if (data.modifiers.length > 0) {
      body += `

MODIFIERS:
${data.modifiers.map(m => `${m.icon} ${m.label}: ${m.artistNote}`).join('\n')}`;
    }

    body += `

ARTIST NOTES:
Summary: ${data.artistSummary}
How to work: ${data.artistHowToWork}
Watch for: ${data.artistWatchFor}

Ink Profile Note: ${data.inkProfileArtistCopy}

DETAILS:
Placement: ${data.details.placement}
Size: ${data.details.size}
Budget: ${data.details.budget}
Timeline: ${data.details.timeline}${data.details.specificDate ? ` (${data.details.specificDate})` : ''}`;

    if (data.pinterestUrl) {
      body += `\nPinterest: ${data.pinterestUrl}`;
    }
    if (data.note) {
      body += `\nNote: ${data.note}`;
    }

    body += `

---
Submitted via Skin Sight
${data.timestamp}`;

    return body;
  }

  async function submitData(data) {
    const submission = currentConfig.submission || {};

    if (submission.webhookUrl) {
      // Webhook submission
      const response = await fetch(submission.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Webhook submission failed');
      }
    } else if (submission.formId) {
      // Formspree submission
      const response = await fetch(`https://formspree.io/f/${submission.formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `New Skin Sight Submission: ${data.archetype.name}`,
          name: data.contact.name,
          email: data.contact.email,
          message: data.emailBody,
          _data: JSON.stringify(data)
        })
      });

      if (!response.ok) {
        throw new Error('Formspree submission failed');
      }
    } else {
      // Fallback: just log to console (for testing)
      console.log('Submission data:', data);
      console.log('Email body:\n', data.emailBody);
    }
  }

  // ============================================================
  // PROGRESS PERSISTENCE
  // ============================================================

  function saveProgress() {
    const progress = {
      artistId: currentConfig ? currentConfig.artistId : 'default',
      questionValues,
      currentScreen,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const progress = JSON.parse(saved);

      // Check if same artist and less than 24 hours old
      if (progress.artistId === (currentConfig ? currentConfig.artistId : 'default') &&
          Date.now() - progress.timestamp < 86400000) {

        // Restore question values
        questionValues = progress.questionValues || {};

        // Update question UI (select the saved radio buttons)
        Object.keys(questionValues).forEach(questionId => {
          const value = questionValues[questionId];
          const radio = document.querySelector(`input[name="${questionId}"][value="${value}"]`);
          if (radio) {
            radio.checked = true;
          }
        });

        // Update continue button states
        ['intuition', 'vision', 'style'].forEach(section => {
          checkSectionComplete(section);
        });

        // Navigate to saved screen (but not past reveal without recalculating)
        if (progress.currentScreen && progress.currentScreen !== 'landing') {
          if (['reveal', 'details', 'confirmation'].includes(progress.currentScreen)) {
            // Need to recalculate before showing reveal
            if (Object.keys(questionValues).length === 12) {
              calculateResults();
            }
          }

          // Don't auto-navigate to details or confirmation
          if (!['details', 'confirmation'].includes(progress.currentScreen)) {
            navigateToScreen(progress.currentScreen);
          } else if (progress.currentScreen === 'reveal') {
            navigateToScreen('reveal');
          }
        }
      }
    } catch (e) {
      console.error('Failed to load progress:', e);
    }
  }

  function clearProgress() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function resetQuiz() {
    // Reset state
    questionValues = {};
    calculatedResults = null;
    uploadedFiles = [];

    // Reset all radio buttons
    document.querySelectorAll('.bubble-option input[type="radio"]').forEach(radio => {
      radio.checked = false;
    });

    // Reset continue buttons
    ['intuition', 'vision', 'style'].forEach(section => {
      const btn = document.getElementById(`continue-${section}`);
      if (btn) btn.disabled = true;
    });

    // Reset form
    const form = document.getElementById('details-form');
    if (form) form.reset();

    // Reset file list
    const fileList = document.getElementById('file-list');
    if (fileList) fileList.innerHTML = '';

    // Reset error messages
    const errorContainer = document.getElementById('form-errors');
    if (errorContainer) errorContainer.innerHTML = '';

    // Reset character count
    const noteCount = document.getElementById('note-count');
    if (noteCount) noteCount.textContent = '0';

    // Hide specific date field
    const specificDateField = document.getElementById('specific-date-field');
    if (specificDateField) specificDateField.style.display = 'none';
  }

})();
