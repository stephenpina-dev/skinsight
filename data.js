// ============================================================
// SKIN SIGHT DATA FILE
// Config-driven architecture - ALL detection logic lives here
// ============================================================

const SKIN_SIGHT_DATA = {

  // Version for cache busting
  version: "2.0.0",

  // Scale definition (so detection logic is portable)
  scale: {
    low: 2,
    mid: 5,
    high: 9
  },

  // ============================================================
  // QUESTIONS (12 total, 3 options each)
  // ============================================================

  questions: {
    intuition: [
      {
        id: "incubation",
        label: "How long has this idea been living with you?",
        options: [
          { value: 2, text: "It just found me" },
          { value: 5, text: "It's been brewing for a while" },
          { value: 9, text: "Years. It's part of me now." }
        ]
      },
      {
        id: "permanence_comfort",
        label: "How do you feel about forever?",
        options: [
          { value: 2, text: "Honestly, it's a big word" },
          { value: 5, text: "I'm getting more comfortable with it" },
          { value: 9, text: "I trust my choices to last" }
        ]
      },
      {
        id: "body_intuition",
        label: "How well do you know what your body can handle?",
        options: [
          { value: 2, text: "Still learning" },
          { value: 5, text: "I have a decent sense" },
          { value: 9, text: "I know my limits" }
        ]
      },
      {
        id: "canvas_state",
        label: "Your skin so far...",
        options: [
          { value: 2, text: "Blank page" },
          { value: 5, text: "A few pieces" },
          { value: 9, text: "Already telling stories" }
        ]
      }
    ],
    vision: [
      {
        id: "inner_vision",
        label: "When you picture it...",
        options: [
          { value: 2, text: "I feel it more than see it" },
          { value: 5, text: "I have a rough sense" },
          { value: 9, text: "I see it clearly" }
        ]
      },
      {
        id: "reference_harmony",
        label: "The images you're drawn to...",
        options: [
          { value: 2, text: "All over the place" },
          { value: 5, text: "Starting to find a thread" },
          { value: 9, text: "Share a common thread" }
        ]
      },
      {
        id: "density_appetite",
        label: "Your visual taste...",
        options: [
          { value: 2, text: "Breathing room. Less is more." },
          { value: 5, text: "Somewhere in the middle" },
          { value: 9, text: "Every inch alive" }
        ]
      },
      {
        id: "certainty",
        label: "How sure are you?",
        options: [
          { value: 2, text: "Still exploring" },
          { value: 5, text: "Getting clearer" },
          { value: 9, text: "Completely decided" }
        ]
      }
    ],
    style: [
      {
        id: "creative_handoff",
        label: "When it comes to the design...",
        options: [
          { value: 2, text: "I want to guide it" },
          { value: 5, text: "Collaborate with me" },
          { value: 9, text: "Surprise me" }
        ]
      },
      {
        id: "iteration_comfort",
        label: "Your comfort with back and forth...",
        options: [
          { value: 2, text: "I'd rather get it right the first time" },
          { value: 5, text: "A few rounds is fine" },
          { value: 9, text: "Refining is part of the process" }
        ]
      },
      {
        id: "openness_to_influence",
        label: "If the artist suggests a different direction...",
        options: [
          { value: 2, text: "I'd rather stay the course" },
          { value: 5, text: "I'll hear them out" },
          { value: 9, text: "I'm here for their perspective" }
        ]
      },
      {
        id: "articulation",
        label: "Putting your vision into words...",
        options: [
          { value: 2, text: "It's hard to explain" },
          { value: 5, text: "I can get the gist across" },
          { value: 9, text: "I can paint the picture" }
        ]
      }
    ]
  },

  // ============================================================
  // ARCHETYPES (12 total) with EXECUTABLE detection functions
  // Priority: lower number = checked first
  // ============================================================

  archetypes: [
    {
      id: "debut",
      priority: 1,
      detect: (v, s) => v.canvas_state <= s.low,
      detectionDesc: "canvas_state <= low (first tattoo)",
      name: "The Debut",
      oneLiner: "My first mark. The beginning of something.",
      revealCopy: "Every collection starts with one. You're standing at the edge of something new, and whether you feel nervous, excited, or both, you're here. That says enough. Your skin has been waiting for this moment. The first mark isn't just a tattoo. It's a door. And you're ready to walk through it.",
      artistNote: {
        summary: "First tattoo. No frame of reference.",
        whatToExpect: "Questions. Nerves. Possibly unrealistic expectations about pain, healing, or pricing. They may have researched obsessively or barely at all. Either way, this is new territory for them and they're looking to you for guidance.",
        howToWork: "Take time to educate. Walk them through the process before the day. Explain aftercare like they've never heard it before, because they haven't. Be patient with questions that seem obvious. This experience shapes how they feel about tattoos forever. Make it good.",
        watchFor: "Pain anxiety, decision paralysis at the last minute, unrealistic size or placement ideas. If Impulse Alert flag is also triggered, slow everything down."
      }
    },
    {
      id: "compass",
      priority: 2,
      detect: (v, s) => v.reference_harmony <= s.low && v.certainty <= s.mid && v.inner_vision <= s.mid,
      detectionDesc: "reference_harmony <= low AND certainty <= mid AND inner_vision <= mid",
      name: "The Compass",
      oneLiner: "I'm not lost. I'm navigating.",
      revealCopy: "You're drawn to many directions right now, and that's not confusion. That's curiosity. You're gathering ideas, sitting with possibilities, letting things marinate. The right artist won't rush you to decide. They'll help you find the thread that connects what you're feeling to what belongs on your skin. You're not lost. You're finding your way.",
      artistNote: {
        summary: "Still exploring. Hasn't landed on a direction.",
        whatToExpect: "Scattered references, multiple ideas, maybe some contradictions. They're not being difficult. They're genuinely in discovery mode. The right piece hasn't clicked yet.",
        howToWork: "Guide, don't push. This is a consultation client, not a booking client. Help them narrow down by asking what they don't want. Show range from your portfolio. Let them react rather than decide. They need a mirror more than a menu.",
        watchFor: "Pressure to book before they're ready. If they push to schedule, make sure it's genuine certainty and not just eagerness to please. The Compass can become a cancellation if rushed."
      }
    },
    {
      id: "canvas",
      priority: 3,
      detect: (v, s) => v.certainty <= s.low && v.articulation <= s.mid && v.creative_handoff >= s.mid,
      detectionDesc: "certainty <= low AND articulation <= mid AND creative_handoff >= mid",
      name: "The Canvas",
      oneLiner: "I don't know yet. Help me find it.",
      revealCopy: "You know something wants to come through. You just can't name it yet. That's not a problem. That's an invitation. You're open, receptive, ready to discover what fits. The right artist won't need you to have all the answers. They'll ask the right questions. Together, you'll find what your skin has been waiting for. The image is coming. You just need help seeing it.",
      artistNote: {
        summary: "Needs guidance to discover what they want.",
        whatToExpect: "Low clarity, low articulation, but openness to guidance. They know something wants to come through but they can't name it. They need you to help them see. This is collaborative discovery, not order taking.",
        howToWork: "Ask more questions than usual. Start with broad strokes: what do you not want? What feels wrong? Sketch loose concepts before refining. Show range. Let them eliminate until something clicks. Be patient. This takes longer but builds trust.",
        watchFor: "Ghost Handoff flag. If they can't see it, can't say it, and also won't give you freedom, this becomes very difficult. Make sure they're genuinely open, not just stuck."
      }
    },
    {
      id: "spark",
      priority: 4,
      detect: (v, s) => v.incubation <= s.low && v.permanence_comfort >= s.mid,
      detectionDesc: "incubation <= low AND permanence_comfort >= mid",
      name: "The Spark",
      oneLiner: "When I know, I know.",
      revealCopy: "Some people need years. You need a feeling. When something clicks, you don't hesitate. That's not impulsive. That's instinct. You trust your gut because your gut has earned it. The idea found you and you're ready to move. Momentum is part of how you create. Don't let anyone slow you down if the fire is real.",
      artistNote: {
        summary: "Fast decision. Gut driven.",
        whatToExpect: "They decided quickly and they're ready to move. That's their style. It doesn't automatically mean regret risk. Some people just know fast. The question is whether the 'why' behind the idea is solid.",
        howToWork: "Ask what drew them to this idea. If the answer has depth, trust it. If it's vague or reactive, slow down. Their energy is exciting but make sure it's grounded. Don't mistake speed for certainty.",
        watchFor: "Impulse Alert flag. Low incubation plus low permanence comfort is a red flag. High incubation plus high permanence comfort with quick booking is fine. Context matters."
      }
    },
    {
      id: "architect",
      priority: 5,
      detect: (v, s) => v.creative_handoff <= s.low && v.articulation >= s.high && v.inner_vision >= s.high,
      detectionDesc: "creative_handoff <= low AND articulation >= high AND inner_vision >= high",
      name: "The Architect",
      oneLiner: "I see it clearly. Let's build it together.",
      revealCopy: "You've already done the work in your head. You can see it, describe it, maybe even sketch it. You're not here to hand it off and hope for the best. You want to build this together, step by step, with input at every stage. That's not control. That's care. This is your body, your vision, your story. You want to be part of how it comes to life.",
      artistNote: {
        summary: "Clear vision. Wants involvement.",
        whatToExpect: "They've thought about this. They can describe it, maybe sketch it, definitely have references. They want to be part of the process, not just receive the result. Expect questions, feedback, and collaboration at every stage.",
        howToWork: "Show progress early and often. Get sign off before moving forward. Don't surprise them with creative choices. They're not controlling, they're invested. Treat them as a partner in the build. Communicate clearly and frequently.",
        watchFor: "If Perfectionist Loop or One Shot Pressure flags are triggered, set revision limits upfront. Their investment can tip into anxiety if not managed."
      }
    },
    {
      id: "muse",
      priority: 6,
      detect: (v, s) => v.creative_handoff >= s.high && v.openness_to_influence >= s.high && v.canvas_state < s.high,
      detectionDesc: "creative_handoff >= high AND openness_to_influence >= high AND canvas_state < high",
      name: "The Muse",
      oneLiner: "I came to be moved. Surprise me.",
      revealCopy: "You're here to be transformed. Not by your own vision, but by someone else's eye. You trust artists to see something in you that you might not see yourself. That's not passive. That's generous. You're offering real creative collaboration, not just permission. The best piece you'll ever get might be one you never could have imagined alone.",
      artistNote: {
        summary: "Handing you creative control.",
        whatToExpect: "They want to be moved. They're not coming with a locked vision. They're coming with trust. This is exciting but it's also responsibility. They're giving you room to create something they couldn't have imagined alone.",
        howToWork: "Bring options. Show your thinking. Don't coast on 'they said do whatever.' That trust deserves your best ideas. Present concepts, explain your choices, let them respond. Make it a collaboration even if they're giving you the lead.",
        watchFor: "Control Paradox flag. Some clients say 'surprise me' but resist anything unexpected. Confirm their openness is real before going too far with a concept."
      }
    },
    {
      id: "mythmaker",
      priority: 7,
      detect: (v, s) => v.inner_vision <= s.mid && v.certainty >= s.high && v.articulation >= s.mid,
      detectionDesc: "inner_vision <= mid AND certainty >= high AND articulation >= mid",
      name: "The Mythmaker",
      oneLiner: "I'm writing my own legend.",
      revealCopy: "For you, tattoos aren't decoration. They're documentation. Each piece is a marker, a symbol, a chapter in a story only you fully understand. You're not just getting ink. You're building a mythology on your skin. The meaning came before the image. The image is just how you make the meaning visible to the world.",
      artistNote: {
        summary: "Meaning driven. Narrative first.",
        whatToExpect: "The story matters more than the style. They're not starting with an image. They're starting with what it represents. Memorial work, milestone markers, symbols that carry weight. The design should emerge from the meaning, not the other way around.",
        howToWork: "Lead with 'what does this represent?' before 'what do you want it to look like?' Let them tell the story. Then help translate that into visual form. They need to feel understood before they can trust your design.",
        watchFor: "Emotional weight. This might be a grief piece, a trauma piece, a celebration piece. Be present. Don't rush the conversation. The consultation is part of the experience for them."
      }
    },
    {
      id: "visionary",
      priority: 8,
      detect: (v, s) => v.inner_vision >= s.high && v.reference_harmony >= s.high && v.certainty >= s.mid && v.canvas_state < s.high,
      detectionDesc: "inner_vision >= high AND reference_harmony >= high AND certainty >= mid AND canvas_state < high",
      name: "The Visionary",
      oneLiner: "I see what I want. Beauty, line, form.",
      revealCopy: "You're led by your eye. Composition, balance, how light hits the skin. You know what looks good and you trust that knowing. Meaning matters, but beauty matters too. You want something that lives well on your body and moves well through the world. The right artist will understand that for you, aesthetics aren't shallow. They're the whole point.",
      artistNote: {
        summary: "Visual first. Aesthetic driven.",
        whatToExpect: "They know what looks good. Composition, placement, flow. They have a strong eye and they trust it. Meaning might be secondary or might be absent entirely. That's valid. They want something beautiful on their body. Full stop.",
        howToWork: "Show, don't tell. They respond to images more than explanations. Bring visual options, let them react. Trust their eye. They'll know it when they see it. Don't oversell meaning if they're not asking for it.",
        watchFor: "If Precision modifiers are present, they may be highly specific about execution. Get clarity on exactly what they're envisioning. Their 'beautiful' might be very particular."
      }
    },
    {
      id: "deliberate",
      priority: 9,
      detect: (v, s) => v.incubation >= s.high && v.reference_harmony >= s.high && v.iteration_comfort >= s.high && v.canvas_state < s.high,
      detectionDesc: "incubation >= high AND reference_harmony >= high AND iteration_comfort >= high AND canvas_state < high",
      name: "The Deliberate",
      oneLiner: "I didn't rush this. Good things take time.",
      revealCopy: "You've been thinking about this for a while. Saving references, imagining placement, letting the idea mature. You don't move fast because you don't need to. Permanence deserves patience. When you finally book, it won't be a leap of faith. It'll be a decision you've already made a hundred times in your mind. You're not slow. You're sure.",
      artistNote: {
        summary: "Long consideration. Ready when they book.",
        whatToExpect: "They've been thinking about this for months or years. References are tight. Vision is clear. They're not here to explore. They're here to execute something they've already decided.",
        howToWork: "Respect their process. They've done the work most clients skip. Don't try to reinvent their idea. They may want refinement, not reimagination. Listen carefully and execute faithfully.",
        watchFor: "They may be attached to a vision that doesn't translate well technically. If their idea needs adjustment, explain why clearly. They'll appreciate the honesty if you frame it as serving their vision, not overriding it."
      }
    },
    {
      id: "collector",
      priority: 10,
      detect: (v, s) => v.canvas_state >= s.high && v.certainty >= s.high && v.reference_harmony >= s.high,
      detectionDesc: "canvas_state >= high AND certainty >= high AND reference_harmony >= high",
      name: "The Collector",
      oneLiner: "My skin tells stories. This is the next one.",
      revealCopy: "You've done this before. Your body already holds ink, memory, meaning. You know the process, you know the healing, you know what you like. This isn't your first chapter and it won't be your last. You're not here to figure anything out. You're here to add the next piece to something you've been building for a while.",
      artistNote: {
        summary: "Experienced client. Knows the process.",
        whatToExpect: "Minimal hand holding needed. They've sat through sessions, they've healed pieces, they know what they like. They're not here to be educated. They're here to add to their collection.",
        howToWork: "Trust their instincts. They've earned their opinions. Focus on execution, not explanation. Respect their time and their experience. If they have feedback, listen. They know what works on their body.",
        watchFor: "May have strong preferences from past artists. Ask about what's worked and what hasn't. Don't assume your process is their favorite process."
      }
    },
    {
      id: "rhythm",
      priority: 11,
      detect: (v, s) => v.canvas_state >= s.mid && v.creative_handoff >= s.mid && v.openness_to_influence >= s.high && v.iteration_comfort >= s.mid,
      detectionDesc: "canvas_state >= mid AND creative_handoff >= mid AND openness_to_influence >= high AND iteration_comfort >= mid",
      name: "The Rhythm",
      oneLiner: "I know this dance. Let's go again.",
      revealCopy: "The chair, the buzz, the healing. It's familiar to you now. You're not here for the novelty. You're here because this is part of how you mark your life. Getting tattooed isn't an event anymore. It's a practice. A rhythm. You know what to expect and you're ready to do it again. No drama. Just ink.",
      artistNote: {
        summary: "Repeat client energy. Knows the process.",
        whatToExpect: "Comfortable. Easy. No drama. They've done this before and they're doing it again. Tattooing is part of their life rhythm, not a special event. They know what to expect and they're ready.",
        howToWork: "Focus on execution. Skip the education. Keep it smooth and professional. They're probably low maintenance but don't mistake ease for indifference. They still care about quality.",
        watchFor: "Assumptions. They may have habits from other artists that don't match your process. Quick alignment conversation at the start avoids surprises."
      }
    },
    {
      id: "attuned",
      priority: 12,
      detect: (v, s) => true, // Default fallback - always matches if nothing else does
      detectionDesc: "DEFAULT fallback when no other archetype matches",
      name: "The Attuned",
      oneLiner: "Everything aligned. I'm ready.",
      revealCopy: "You've done your homework. You know yourself, you know what you want, and you know how you like to work. There's no confusion, no second guessing, no chaos. Just clarity. You're not here to figure anything out. You're here to make it happen. The right artist will feel this energy immediately. You're the session everyone hopes for.",
      artistNote: {
        summary: "Green light client. Everything aligned.",
        whatToExpect: "Rare. Clear vision, good communicator, flexible, realistic expectations. No red flags, no contradictions. They've done their homework and they're ready to make it happen. This is the smooth session.",
        howToWork: "Don't overcomplicate it. They're ready. Confirm details, execute well, deliver. They'll appreciate efficiency and professionalism. Save the extra consultations for clients who need them.",
        watchFor: "Nothing. Prioritize this booking. These clients often become repeat clients and referral sources. Make it excellent."
      }
    }
  ],

  // ============================================================
  // INK PROFILES (8 total) with EXECUTABLE detection functions
  // ============================================================

  inkProfiles: [
    {
      id: "still_unfolding",
      priority: 1,
      detect: (v, s) => v.certainty <= s.low && v.reference_harmony <= s.mid,
      detectionDesc: "certainty <= low AND reference_harmony <= mid",
      name: "Still Unfolding",
      tagline: "The right thing hasn't found you yet.",
      clientCopy: "You're not undecided. You're open. You'll know it when you see it. The search is part of the process. Don't rush what's still revealing itself.",
      artistCopy: "Not ready to commit to a style. Consultation should include showing range. Help them narrow by asking what they DON'T want. This is discovery, not execution.",
      styleMatches: [],
      artistTags: [
        "Consultation first",
        "Show portfolio range",
        "Ask elimination questions",
        "May need multiple sessions to land"
      ]
    },
    {
      id: "artists_hand",
      priority: 2,
      detect: (v, s) => v.creative_handoff >= s.high && v.inner_vision <= s.mid && v.openness_to_influence >= s.high,
      detectionDesc: "creative_handoff >= high AND inner_vision <= mid AND openness_to_influence >= high",
      name: "The Artist's Hand",
      tagline: "I came for your vision.",
      clientCopy: "You're not here to dictate. You're here to collaborate. You trust the artist to see something you might not. The best piece is one you couldn't have imagined alone.",
      artistCopy: "Open brief. Wants your creative input. Bring concepts, not just questions. This is permission to lead. Don't waste it. Confirm before executing, but push the boundaries.",
      styleMatches: [
        "Custom / artist driven",
        "Signature style pieces",
        "Illustrative",
        "Experimental",
        "Flash with interpretation"
      ]
    },
    {
      id: "light_touch",
      priority: 3,
      detect: (v, s) => v.density_appetite <= s.low && v.certainty >= s.mid,
      detectionDesc: "density_appetite <= low AND certainty >= mid",
      name: "Light Touch",
      tagline: "Space is part of the design.",
      clientCopy: "You're drawn to restraint. Fine lines, breathing room, pieces that whisper instead of shout. For you, what's left out matters as much as what's there.",
      artistCopy: "Fine line, single needle, minimalist, micro work. Client values negative space. Less is more. Don't oversell complexity.",
      styleMatches: [
        "Fine line",
        "Single needle",
        "Minimalist",
        "Micro tattoos",
        "Delicate script"
      ]
    },
    {
      id: "full_canvas",
      priority: 4,
      detect: (v, s) => v.density_appetite >= s.high && v.reference_harmony >= s.mid && v.certainty >= s.mid,
      detectionDesc: "density_appetite >= high AND reference_harmony >= mid AND certainty >= mid",
      name: "Full Canvas",
      tagline: "Every inch alive.",
      clientCopy: "You want presence. Saturation, detail, work that commands attention. Your skin isn't a notebook. It's a mural.",
      artistCopy: "Wants impact. Heavy saturation, bold lines, full coverage. Likely interested in sleeves, large panels, statement pieces. Budget and time conversation early.",
      styleMatches: [
        "Blackwork",
        "Heavy traditional",
        "Japanese (full coverage)",
        "Ornamental",
        "Neo traditional (saturated)"
      ]
    },
    {
      id: "precision",
      priority: 5,
      detect: (v, s) => v.inner_vision >= s.high && v.certainty >= s.high && v.density_appetite === s.mid,
      detectionDesc: "inner_vision >= high AND certainty >= high AND density_appetite === mid",
      name: "Precision",
      tagline: "Every line intentional.",
      clientCopy: "You see it clearly. You know what you want and you want it executed exactly. Clean geometry, sharp edges, no accidents.",
      artistCopy: "Detail oriented, specific vision. Technical execution matters. Good candidate for realism, geometric, or highly rendered work. Manage if perfectionist flags also triggered.",
      styleMatches: [
        "Geometric",
        "Realism / hyperrealism",
        "Dotwork (precise)",
        "Architectural",
        "Clean blackwork"
      ]
    },
    {
      id: "soft_edge",
      priority: 6,
      detect: (v, s) => v.inner_vision <= s.mid && v.creative_handoff >= s.mid && v.density_appetite >= s.low && v.density_appetite <= s.mid,
      detectionDesc: "inner_vision <= mid AND creative_handoff >= mid AND density_appetite between low and mid",
      name: "Soft Edge",
      tagline: "Flowing, not forced.",
      clientCopy: "You like movement. Pieces that feel organic, that follow the body instead of fighting it. Hard lines feel too rigid for what you're carrying.",
      artistCopy: "Drawn to organic flow, soft transitions. Good for freehand placement. Watercolor, illustrative, brushstroke styles resonate. Let the body guide the composition.",
      styleMatches: [
        "Watercolor",
        "Brushstroke",
        "Freehand",
        "Organic illustrative",
        "Abstract"
      ]
    },
    {
      id: "bold_classic",
      priority: 7,
      detect: (v, s) => v.density_appetite >= s.mid && v.reference_harmony >= s.high && v.inner_vision >= s.mid && v.certainty >= s.high,
      detectionDesc: "density_appetite >= mid AND reference_harmony >= high AND inner_vision >= mid AND certainty >= high",
      name: "Bold Classic",
      tagline: "Timeless. Proven. Unapologetic.",
      clientCopy: "You're drawn to work that lasts. Visually and culturally. Strong lines, solid color, designs that age well. Trends don't interest you. Legacy does.",
      artistCopy: "Appreciates traditional foundations. American traditional, Japanese, or neo traditional likely. Values craftsmanship and longevity. Not experimental. Wants proven execution.",
      styleMatches: [
        "American traditional",
        "Neo traditional",
        "Japanese traditional",
        "Bold blackwork",
        "Classic lettering"
      ]
    },
    {
      id: "living_story",
      priority: 8,
      detect: (v, s, archetype) => archetype && archetype.id === 'mythmaker' || true, // Fallback
      detectionDesc: "archetype === mythmaker OR default fallback",
      name: "Living Story",
      tagline: "The meaning moves with you.",
      clientCopy: "Your tattoos aren't decorations. They're chapters. Symbols, scenes, pieces that hold weight. The narrative is the art.",
      artistCopy: "Meaning driven. Lead with 'what does this represent?' Illustrative, narrative work lands well. Make sure design serves the story, not the other way around.",
      styleMatches: [
        "Illustrative",
        "Neo traditional",
        "Symbolic / iconographic",
        "Memorial work",
        "Custom narrative pieces"
      ]
    }
  ],

  // ============================================================
  // FLAGS (18 total) with EXECUTABLE detection functions
  // ============================================================

  flags: {
    intuition: [
      {
        id: "impulse_alert",
        detect: (v, s) => v.incubation <= s.low && v.permanence_comfort <= s.low,
        detectionDesc: "incubation <= low AND permanence_comfort <= low",
        label: "Impulse Alert",
        severity: "high",
        artistNote: "Decided recently AND nervous about permanence. High regret risk. Slow this down."
      },
      {
        id: "pain_blind",
        detect: (v, s) => v.body_intuition >= s.high && v.canvas_state <= s.low,
        detectionDesc: "body_intuition >= high AND canvas_state <= low",
        label: "Pain Blind",
        severity: "medium",
        artistNote: "Claims to know their limits but never been tattooed. Prep them for reality."
      },
      {
        id: "fresh_but_certain",
        detect: (v, s) => v.canvas_state <= s.low && v.certainty >= s.high,
        detectionDesc: "canvas_state <= low AND certainty >= high",
        label: "Fresh but Certain",
        severity: "low",
        artistNote: "First tattoo but completely certain. Could be solid or uninformed confidence. Verify."
      },
      {
        id: "rushed_timeline",
        detect: (v, s) => v.incubation <= s.low && v.density_appetite >= s.high,
        detectionDesc: "incubation <= low AND density_appetite >= high",
        label: "Rushed Timeline",
        severity: "medium",
        artistNote: "New idea + wants complex work. Recipe for regret. Ask why the rush."
      }
    ],
    vision: [
      {
        id: "pinterest_storm",
        detect: (v, s) => v.reference_harmony <= s.low && v.certainty >= s.high,
        detectionDesc: "reference_harmony <= low AND certainty >= high",
        label: "Pinterest Storm",
        severity: "medium",
        artistNote: "Thinks they know what they want but references are chaos. Editing session needed."
      },
      {
        id: "fog_vision",
        detect: (v, s) => v.inner_vision <= s.low && v.certainty >= s.high,
        detectionDesc: "inner_vision <= low AND certainty >= high",
        label: "Fog Vision",
        severity: "medium",
        artistNote: "Can't picture it but says they're sure. Contradiction. Dig deeper."
      },
      {
        id: "size_vs_detail",
        detect: (v, s, archetype, details) => v.density_appetite >= s.high && details && (details.size === 'tiny' || details.size === 'small'),
        detectionDesc: "density_appetite >= high AND size is tiny or small",
        label: "Size vs Detail",
        severity: "medium",
        artistNote: "Wants intricate detail at small scale. Won't work. Manage expectations early."
      },
      {
        id: "complexity_unclear",
        detect: (v, s) => v.density_appetite === s.mid && v.certainty <= s.low,
        detectionDesc: "density_appetite === mid AND certainty <= low",
        label: "Complexity Unclear",
        severity: "low",
        artistNote: "Doesn't know if they want simple or complex. Needs consultation to decide."
      }
    ],
    style: [
      {
        id: "control_paradox",
        detect: (v, s) => v.creative_handoff >= s.high && v.openness_to_influence <= s.low,
        detectionDesc: "creative_handoff >= high AND openness_to_influence <= low",
        label: "Control Paradox",
        severity: "high",
        artistNote: "Says 'surprise me' but won't accept changes. Clarify before starting."
      },
      {
        id: "silent_director",
        detect: (v, s) => v.articulation <= s.low && v.creative_handoff <= s.low,
        detectionDesc: "articulation <= low AND creative_handoff <= low",
        label: "Silent Director",
        severity: "high",
        artistNote: "Wants control but can't explain what they want. Many check ins needed."
      },
      {
        id: "perfectionist_loop",
        detect: (v, s) => v.iteration_comfort >= s.high && v.articulation <= s.low,
        detectionDesc: "iteration_comfort >= high AND articulation <= low",
        label: "Perfectionist Loop",
        severity: "medium",
        artistNote: "Expects many revisions but can't say what's wrong. Set revision limits upfront."
      },
      {
        id: "one_shot_pressure",
        detect: (v, s) => v.iteration_comfort <= s.low && v.articulation <= s.mid,
        detectionDesc: "iteration_comfort <= low AND articulation <= mid",
        label: "One Shot Pressure",
        severity: "medium",
        artistNote: "Wants it perfect first try but struggles to communicate. High pressure session."
      },
      {
        id: "yes_then_no",
        detect: (v, s) => v.openness_to_influence >= s.high && v.iteration_comfort <= s.low,
        detectionDesc: "openness_to_influence >= high AND iteration_comfort <= low",
        label: "Yes Then No",
        severity: "medium",
        artistNote: "Open to ideas but wants it right immediately. Will agree then regret. Confirm twice."
      }
    ],
    cross: [
      {
        id: "champagne_beer",
        detect: (v, s, archetype, details) => v.density_appetite >= s.high && details && details.budget === 'under_200',
        detectionDesc: "density_appetite >= high AND budget === under_200",
        label: "Champagne / Beer",
        severity: "medium",
        artistNote: "Complex taste, simple budget. Have the money talk before sketching."
      },
      {
        id: "ghost_handoff",
        detect: (v, s) => v.inner_vision <= s.low && v.creative_handoff <= s.low && v.articulation <= s.low,
        detectionDesc: "inner_vision <= low AND creative_handoff <= low AND articulation <= low",
        label: "Ghost Handoff",
        severity: "high",
        artistNote: "Can't see it, can't say it, won't let you lead. Difficult combo. Tread carefully."
      },
      {
        id: "experienced_but_lost",
        detect: (v, s) => v.canvas_state >= s.high && v.certainty <= s.low && v.reference_harmony <= s.low,
        detectionDesc: "canvas_state >= high AND certainty <= low AND reference_harmony <= low",
        label: "Experienced but Lost",
        severity: "low",
        artistNote: "Has tattoos but doesn't know what they want this time. Different from newbie confusion. Life transition?"
      },
      {
        id: "ready_but_rushed",
        detect: (v, s, archetype) => archetype && archetype.id === 'attuned' && v.incubation <= s.low,
        detectionDesc: "archetype === attuned AND incubation <= low",
        label: "Ready but Rushed",
        severity: "low",
        artistNote: "Everything else aligned but idea is brand new. Almost green light. Just verify the why."
      },
      {
        id: "timeline_crunch",
        detect: (v, s, archetype, details) => v.incubation <= s.low && details && details.timeline === 'asap',
        detectionDesc: "incubation <= low AND timeline === asap",
        label: "Timeline Crunch",
        severity: "medium",
        artistNote: "New idea + wants it now. Red flag for regret. Ask what's driving the urgency."
      }
    ]
  },

  // ============================================================
  // MODIFIERS (8 total)
  // ============================================================

  modifiers: [
    {
      id: "low_certainty",
      detect: (v, s) => v.certainty <= s.low,
      detectionDesc: "certainty <= low",
      icon: "⚡",
      label: "Low Certainty",
      artistNote: "Matched a profile but still exploring. Show options within this direction."
    },
    {
      id: "scattered_references",
      detect: (v, s) => v.reference_harmony <= s.low,
      detectionDesc: "reference_harmony <= low",
      icon: "🔀",
      label: "Scattered References",
      artistNote: "Drawn to this style but references are all over. Help them edit."
    },
    {
      id: "locked_in",
      detect: (v, s) => v.certainty >= s.high && v.reference_harmony >= s.high,
      detectionDesc: "certainty >= high AND reference_harmony >= high",
      icon: "🎯",
      label: "Locked In",
      artistNote: "Knows exactly what they want. Execute, don't reinvent."
    },
    {
      id: "eclectic_taste",
      detect: (v, s) => v.reference_harmony <= s.low && v.density_appetite >= s.high,
      detectionDesc: "reference_harmony <= low AND density_appetite >= high",
      icon: "🌀",
      label: "Eclectic Taste",
      artistNote: "Wants impact but hasn't narrowed. Maximalist with no focus yet."
    },
    {
      id: "feeling_over_image",
      detect: (v, s) => v.inner_vision <= s.low,
      detectionDesc: "inner_vision <= low",
      icon: "💭",
      label: "Feeling Over Image",
      artistNote: "Feels it more than sees it. Lead with mood boards, not mockups."
    },
    {
      id: "image_over_feeling",
      detect: (v, s) => v.inner_vision >= s.high && v.articulation >= s.high,
      detectionDesc: "inner_vision >= high AND articulation >= high",
      icon: "⬜",
      label: "Image Over Feeling",
      artistNote: "Sees it precisely. Wants technical execution. Listen carefully."
    },
    {
      id: "true_middle",
      detect: (v, s) => v.inner_vision === s.mid && v.reference_harmony === s.mid && v.density_appetite === s.mid && v.certainty === s.mid,
      detectionDesc: "ALL vision questions === mid",
      icon: "⚖️",
      label: "True Middle",
      artistNote: "No strong pull in any direction. Genuine blank slate. Discovery mode."
    },
    {
      id: "style_curious",
      detect: (v, s) => (v.density_appetite >= s.high || v.density_appetite <= s.low) && v.certainty <= s.mid,
      detectionDesc: "(density_appetite >= high OR density_appetite <= low) AND certainty <= mid",
      icon: "🔁",
      label: "Style Curious",
      artistNote: "Knows how much ink, not what style. Show variety within their weight class."
    }
  ],

  // ============================================================
  // POSITIVE FLAGS (3 total)
  // ============================================================

  positiveFlags: [
    {
      id: "dream_client",
      detect: (v, s, archetype, flagCount) => {
        const intuitionAvg = (v.incubation + v.permanence_comfort + v.body_intuition + v.canvas_state) / 4;
        const visionAvg = (v.inner_vision + v.reference_harmony + v.density_appetite + v.certainty) / 4;
        const styleAvg = (v.creative_handoff + v.iteration_comfort + v.openness_to_influence + v.articulation) / 4;
        return intuitionAvg >= 7 && visionAvg >= 7 && styleAvg >= 7 && flagCount === 0;
      },
      detectionDesc: "ALL section averages >= 7 AND flagCount === 0",
      label: "Dream Client",
      icon: "✨",
      artistNote: "Rare. Clear vision, good communicator, flexible. Prioritize this booking."
    },
    {
      id: "smooth_repeat",
      detect: (v, s, archetype, flagCount) => v.canvas_state >= s.mid && archetype && archetype.id === 'rhythm' && flagCount === 0,
      detectionDesc: "canvas_state >= mid AND archetype === rhythm AND flagCount === 0",
      label: "Smooth Repeat",
      icon: "🔄",
      artistNote: "Knows the process, comfortable, easy. Low maintenance session."
    },
    {
      id: "trust_given",
      detect: (v, s, archetype) => archetype && archetype.id === 'muse' && v.openness_to_influence >= s.high && v.creative_handoff >= s.high,
      detectionDesc: "archetype === muse AND openness_to_influence >= high AND creative_handoff >= high",
      label: "Trust Given",
      icon: "🤝",
      artistNote: "Genuinely handing you creative control. Don't waste it. Bring your best."
    }
  ],

  // ============================================================
  // SIGNAL CLARITY
  // ============================================================

  signalClarity: [
    { id: "clear", min: 0, max: 0, label: "Clear", icon: "✓", display: "Clean read. No contradictions." },
    { id: "some_noise", min: 1, max: 2, label: "Some Noise", icon: "⚡", display: "Minor friction points. See flags." },
    { id: "mixed", min: 3, max: 4, label: "Mixed", icon: "⚠️", display: "Contradictory answers. Consultation needed before booking." },
    { id: "chaotic", min: 5, max: 99, label: "Chaotic", icon: "🚩", display: "Answers don't cohere. Either didn't take seriously or genuinely scattered. Proceed with caution." }
  ],

  // ============================================================
  // DETAILS SECTION OPTIONS
  // ============================================================

  detailsOptions: {
    placement: {
      groups: [
        { name: "Arm", options: ["Inner forearm", "Outer forearm", "Upper arm (inner)", "Upper arm (outer)", "Full sleeve", "Half sleeve"] },
        { name: "Leg", options: ["Thigh (front)", "Thigh (back/side)", "Calf", "Shin", "Ankle", "Full leg"] },
        { name: "Torso", options: ["Chest", "Ribs", "Stomach", "Back (upper)", "Back (full)", "Side/flank"] },
        { name: "Other", options: ["Neck", "Hand", "Finger", "Foot", "Behind ear", "Face"] },
        { name: "Undecided", options: ["Not sure yet"] }
      ]
    },
    size: [
      { value: "tiny", label: "Tiny", description: "Coin sized (< 2 in)" },
      { value: "small", label: "Small", description: "Palm sized (2 to 4 in)" },
      { value: "medium", label: "Medium", description: "Hand sized (4 to 6 in)" },
      { value: "large", label: "Large", description: "Full area (6 to 10 in)" },
      { value: "xlarge", label: "Extra Large", description: "Multi session (10+ in)" },
      { value: "unsure", label: "Not sure yet", description: "" }
    ],
    budget: [
      { value: "under_200", label: "Under $200" },
      { value: "200_500", label: "$200 to $500" },
      { value: "500_1000", label: "$500 to $1,000" },
      { value: "1000_2500", label: "$1,000 to $2,500" },
      { value: "2500_plus", label: "$2,500+" },
      { value: "discuss", label: "Let's discuss" }
    ],
    timeline: [
      { value: "asap", label: "Ready now" },
      { value: "1_month", label: "Within 1 month" },
      { value: "1_3_months", label: "1 to 3 months" },
      { value: "3_6_months", label: "3 to 6 months" },
      { value: "flexible", label: "Flexible / no rush" },
      { value: "specific", label: "Specific date (event)" }
    ]
  }
};

// ============================================================
// TEST PRESETS
// ============================================================

const TEST_PRESETS = {
  dream_client: {
    name: "Dream Client",
    values: {
      incubation: 9, permanence_comfort: 9, body_intuition: 9, canvas_state: 9,
      inner_vision: 9, reference_harmony: 9, density_appetite: 5, certainty: 9,
      creative_handoff: 5, iteration_comfort: 9, openness_to_influence: 9, articulation: 9
    },
    expected: { archetype: "collector", signal: "clear", flagCount: 0 }
  },
  ghost_handoff: {
    name: "Ghost Handoff",
    values: {
      incubation: 5, permanence_comfort: 5, body_intuition: 5, canvas_state: 5,
      inner_vision: 2, reference_harmony: 5, density_appetite: 5, certainty: 5,
      creative_handoff: 2, iteration_comfort: 5, openness_to_influence: 5, articulation: 2
    },
    expected: { flags: ["ghost_handoff", "silent_director"], signal: "chaotic" }
  },
  first_timer_nervous: {
    name: "First Timer (Nervous)",
    values: {
      incubation: 2, permanence_comfort: 2, body_intuition: 2, canvas_state: 2,
      inner_vision: 5, reference_harmony: 5, density_appetite: 5, certainty: 5,
      creative_handoff: 5, iteration_comfort: 5, openness_to_influence: 5, articulation: 5
    },
    expected: { archetype: "debut", flags: ["impulse_alert"], signal: "some_noise" }
  },
  the_muse: {
    name: "The Muse",
    values: {
      incubation: 5, permanence_comfort: 9, body_intuition: 5, canvas_state: 5,
      inner_vision: 5, reference_harmony: 5, density_appetite: 5, certainty: 5,
      creative_handoff: 9, iteration_comfort: 5, openness_to_influence: 9, articulation: 5
    },
    expected: { archetype: "muse", positiveFlags: ["trust_given"] }
  },
  control_paradox: {
    name: "Control Paradox",
    values: {
      incubation: 9, permanence_comfort: 9, body_intuition: 9, canvas_state: 5,
      inner_vision: 9, reference_harmony: 9, density_appetite: 5, certainty: 9,
      creative_handoff: 9, iteration_comfort: 5, openness_to_influence: 2, articulation: 9
    },
    expected: { flags: ["control_paradox"], severity: "high" }
  },
  collector: {
    name: "The Collector",
    values: {
      incubation: 9, permanence_comfort: 9, body_intuition: 9, canvas_state: 9,
      inner_vision: 9, reference_harmony: 9, density_appetite: 5, certainty: 9,
      creative_handoff: 5, iteration_comfort: 5, openness_to_influence: 5, articulation: 9
    },
    expected: { archetype: "collector" }
  },
  all_low: {
    name: "All Low",
    values: {
      incubation: 2, permanence_comfort: 2, body_intuition: 2, canvas_state: 2,
      inner_vision: 2, reference_harmony: 2, density_appetite: 2, certainty: 2,
      creative_handoff: 2, iteration_comfort: 2, openness_to_influence: 2, articulation: 2
    },
    expected: { archetype: "debut", signal: "chaotic" }
  },
  all_mid: {
    name: "All Middle",
    values: {
      incubation: 5, permanence_comfort: 5, body_intuition: 5, canvas_state: 5,
      inner_vision: 5, reference_harmony: 5, density_appetite: 5, certainty: 5,
      creative_handoff: 5, iteration_comfort: 5, openness_to_influence: 5, articulation: 5
    },
    expected: { archetype: "attuned", modifiers: ["true_middle"] }
  },
  all_high: {
    name: "All High",
    values: {
      incubation: 9, permanence_comfort: 9, body_intuition: 9, canvas_state: 9,
      inner_vision: 9, reference_harmony: 9, density_appetite: 9, certainty: 9,
      creative_handoff: 9, iteration_comfort: 9, openness_to_influence: 9, articulation: 9
    },
    expected: { archetype: "collector", signal: "clear" }
  }
};
