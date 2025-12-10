// ============================================================
// SKIN SIGHT DATA FILE
// Complete system: questions, archetypes, ink profiles,
// modifiers, flags, signal clarity, details, design system
// ============================================================

// ============================================================
// QUESTIONS (12 total, 3 options each)
// ============================================================

const questions = {

  // SECTION 1: YOUR INTUITION
  // "Do I know myself?"

  intuition: [
    {
      id: "incubation",
      section: "intuition",
      order: 1,
      label: "How long has this idea been living with you?",
      options: [
        { value: 2, text: "It just found me" },
        { value: 5, text: "It's been brewing for a while" },
        { value: 9, text: "Years. It's part of me now." }
      ],
      artistRead: "Decision maturity. Low = impulse risk, high = considered."
    },
    {
      id: "permanence_comfort",
      section: "intuition",
      order: 2,
      label: "How do you feel about forever?",
      options: [
        { value: 2, text: "Honestly, it's a big word" },
        { value: 5, text: "I'm getting more comfortable with it" },
        { value: 9, text: "I trust my choices to last" }
      ],
      artistRead: "Regret risk indicator. Low = needs reassurance, high = at peace with permanent."
    },
    {
      id: "body_intuition",
      section: "intuition",
      order: 3,
      label: "How well do you know what your body can handle?",
      options: [
        { value: 2, text: "Still learning" },
        { value: 5, text: "I have a decent sense" },
        { value: 9, text: "I know my limits" }
      ],
      artistRead: "Pain expectation realism. Cross reference with canvas state."
    },
    {
      id: "canvas_state",
      section: "intuition",
      order: 4,
      label: "Your skin so far...",
      options: [
        { value: 2, text: "Blank page" },
        { value: 5, text: "A few pieces" },
        { value: 9, text: "Already telling stories" }
      ],
      artistRead: "Experience level. Low = virgin canvas, high = collector."
    }
  ],

  // SECTION 2: YOUR VISION
  // "Do I know what I want?"

  vision: [
    {
      id: "inner_vision",
      section: "vision",
      order: 5,
      label: "When you picture it...",
      options: [
        { value: 2, text: "I feel it more than see it" },
        { value: 5, text: "I have a rough sense" },
        { value: 9, text: "I see it clearly" }
      ],
      artistRead: "Concept clarity. Low = needs discovery, high = ready to execute."
    },
    {
      id: "reference_harmony",
      section: "vision",
      order: 6,
      label: "The images you're drawn to...",
      options: [
        { value: 2, text: "All over the place" },
        { value: 5, text: "Starting to find a thread" },
        { value: 9, text: "Share a common thread" }
      ],
      artistRead: "Reference coherence. Low = editing session needed, high = clear direction."
    },
    {
      id: "density_appetite",
      section: "vision",
      order: 7,
      label: "Your visual taste...",
      options: [
        { value: 2, text: "Breathing room. Less is more." },
        { value: 5, text: "Somewhere in the middle" },
        { value: 9, text: "Every inch alive" }
      ],
      artistRead: "Complexity preference. Affects pricing, time, placement conversations."
    },
    {
      id: "certainty",
      section: "vision",
      order: 8,
      label: "How sure are you?",
      options: [
        { value: 2, text: "Still exploring" },
        { value: 5, text: "Getting clearer" },
        { value: 9, text: "Completely decided" }
      ],
      artistRead: "Conviction level. Cross reference with other vision questions for contradictions."
    }
  ],

  // SECTION 3: YOUR STYLE
  // "Do I know how I work?"

  style: [
    {
      id: "creative_handoff",
      section: "style",
      order: 9,
      label: "When it comes to the design...",
      options: [
        { value: 2, text: "I want to guide it" },
        { value: 5, text: "Collaborate with me" },
        { value: 9, text: "Surprise me" }
      ],
      artistRead: "Control vs trust. Low = high involvement needed, high = creative freedom."
    },
    {
      id: "iteration_comfort",
      section: "style",
      order: 10,
      label: "Your comfort with back and forth...",
      options: [
        { value: 2, text: "I'd rather get it right the first time" },
        { value: 5, text: "A few rounds is fine" },
        { value: 9, text: "Refining is part of the process" }
      ],
      artistRead: "Revision expectations. Set limits if high, manage pressure if low."
    },
    {
      id: "openness_to_influence",
      section: "style",
      order: 11,
      label: "If the artist suggests a different direction...",
      options: [
        { value: 2, text: "I'd rather stay the course" },
        { value: 5, text: "I'll hear them out" },
        { value: 9, text: "I'm here for their perspective" }
      ],
      artistRead: "Flexibility. Cross reference with creative handoff for contradictions."
    },
    {
      id: "articulation",
      section: "style",
      order: 12,
      label: "Putting your vision into words...",
      options: [
        { value: 2, text: "It's hard to explain" },
        { value: 5, text: "I can get the gist across" },
        { value: 9, text: "I can paint the picture" }
      ],
      artistRead: "Communication ease. Low + low handoff = difficult combo."
    }
  ]
};


// ============================================================
// ARCHETYPES (12 total)
// ============================================================

const archetypes = [
  {
    id: "debut",
    name: "The Debut",
    oneLiner: "My first mark. The beginning of something.",

    detection: {
      priority: 1,
      logic: "canvas_state < 2"
    },

    revealCopy: "Every collection starts with one. You're standing at the edge of something new, and whether you feel nervous, excited, or both, you're here. That says enough. Your skin has been waiting for this moment. The first mark isn't just a tattoo. It's a door. And you're ready to walk through it.",

    artistNote: {
      summary: "First tattoo. No frame of reference.",
      whatToExpect: "Questions. Nerves. Possibly unrealistic expectations about pain, healing, or pricing. They may have researched obsessively or barely at all. Either way, this is new territory for them and they're looking to you for guidance.",
      howToWork: "Take time to educate. Walk them through the process before the day. Explain aftercare like they've never heard it before, because they haven't. Be patient with questions that seem obvious. This experience shapes how they feel about tattoos forever. Make it good.",
      watchFor: "Pain anxiety, decision paralysis at the last minute, unrealistic size or placement ideas. If Impulse Alert flag is also triggered, slow everything down."
    }
  },

  {
    id: "collector",
    name: "The Collector",
    oneLiner: "My skin tells stories. This is the next one.",

    detection: {
      priority: 10,
      logic: "canvas_state > 7 AND certainty > 7 AND reference_harmony > 6"
    },

    revealCopy: "You've done this before. Your body already holds ink, memory, meaning. You know the process, you know the healing, you know what you like. This isn't your first chapter and it won't be your last. You're not here to figure anything out. You're here to add the next piece to something you've been building for a while.",

    artistNote: {
      summary: "Experienced client. Knows the process.",
      whatToExpect: "Minimal hand holding needed. They've sat through sessions, they've healed pieces, they know what they like. They're not here to be educated. They're here to add to their collection.",
      howToWork: "Trust their instincts. They've earned their opinions. Focus on execution, not explanation. Respect their time and their experience. If they have feedback, listen. They know what works on their body.",
      watchFor: "May have strong preferences from past artists. Ask about what's worked and what hasn't. Don't assume your process is their favorite process."
    }
  },

  {
    id: "compass",
    name: "The Compass",
    oneLiner: "I'm not lost. I'm navigating.",

    detection: {
      priority: 2,
      logic: "reference_harmony < 4 AND certainty < 5 AND inner_vision < 5"
    },

    revealCopy: "You're drawn to many directions right now, and that's not confusion. That's curiosity. You're gathering ideas, sitting with possibilities, letting things marinate. The right artist won't rush you to decide. They'll help you find the thread that connects what you're feeling to what belongs on your skin. You're not lost. You're finding your way.",

    artistNote: {
      summary: "Still exploring. Hasn't landed on a direction.",
      whatToExpect: "Scattered references, multiple ideas, maybe some contradictions. They're not being difficult. They're genuinely in discovery mode. The right piece hasn't clicked yet.",
      howToWork: "Guide, don't push. This is a consultation client, not a booking client. Help them narrow down by asking what they don't want. Show range from your portfolio. Let them react rather than decide. They need a mirror more than a menu.",
      watchFor: "Pressure to book before they're ready. If they push to schedule, make sure it's genuine certainty and not just eagerness to please. The Compass can become a cancellation if rushed."
    }
  },

  {
    id: "architect",
    name: "The Architect",
    oneLiner: "I see it clearly. Let's build it together.",

    detection: {
      priority: 5,
      logic: "creative_handoff < 4 AND articulation > 6 AND inner_vision > 6"
    },

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
    name: "The Muse",
    oneLiner: "I came to be moved. Surprise me.",

    detection: {
      priority: 6,
      logic: "creative_handoff > 7 AND openness_to_influence > 7"
    },

    revealCopy: "You're here to be transformed. Not by your own vision, but by someone else's eye. You trust artists to see something in you that you might not see yourself. That's not passive. That's generous. You're offering real creative collaboration, not just permission. The best piece you'll ever get might be one you never could have imagined alone.",

    artistNote: {
      summary: "Handing you creative control.",
      whatToExpect: "They want to be moved. They're not coming with a locked vision. They're coming with trust. This is exciting but it's also responsibility. They're giving you room to create something they couldn't have imagined alone.",
      howToWork: "Bring options. Show your thinking. Don't coast on 'they said do whatever.' That trust deserves your best ideas. Present concepts, explain your choices, let them respond. Make it a collaboration even if they're giving you the lead.",
      watchFor: "Control Paradox flag. Some clients say 'surprise me' but resist anything unexpected. Confirm their openness is real before going too far with a concept."
    }
  },

  {
    id: "spark",
    name: "The Spark",
    oneLiner: "When I know, I know.",

    detection: {
      priority: 4,
      logic: "incubation < 3 AND permanence_comfort > 5"
    },

    revealCopy: "Some people need years. You need a feeling. When something clicks, you don't hesitate. That's not impulsive. That's instinct. You trust your gut because your gut has earned it. The idea found you and you're ready to move. Momentum is part of how you create. Don't let anyone slow you down if the fire is real.",

    artistNote: {
      summary: "Fast decision. Gut driven.",
      whatToExpect: "They decided quickly and they're ready to move. That's their style. It doesn't automatically mean regret risk. Some people just know fast. The question is whether the 'why' behind the idea is solid.",
      howToWork: "Ask what drew them to this idea. If the answer has depth, trust it. If it's vague or reactive, slow down. Their energy is exciting but make sure it's grounded. Don't mistake speed for certainty.",
      watchFor: "Impulse Alert flag. Low incubation plus low permanence comfort is a red flag. High incubation plus high permanence comfort with quick booking is fine. Context matters."
    }
  },

  {
    id: "deliberate",
    name: "The Deliberate",
    oneLiner: "I didn't rush this. Good things take time.",

    detection: {
      priority: 9,
      logic: "incubation > 7 AND reference_harmony > 7 AND iteration_comfort > 6"
    },

    revealCopy: "You've been thinking about this for a while. Saving references, imagining placement, letting the idea mature. You don't move fast because you don't need to. Permanence deserves patience. When you finally book, it won't be a leap of faith. It'll be a decision you've already made a hundred times in your mind. You're not slow. You're sure.",

    artistNote: {
      summary: "Long consideration. Ready when they book.",
      whatToExpect: "They've been thinking about this for months or years. References are tight. Vision is clear. They're not here to explore. They're here to execute something they've already decided.",
      howToWork: "Respect their process. They've done the work most clients skip. Don't try to reinvent their idea. They may want refinement, not reimagination. Listen carefully and execute faithfully.",
      watchFor: "They may be attached to a vision that doesn't translate well technically. If their idea needs adjustment, explain why clearly. They'll appreciate the honesty if you frame it as serving their vision, not overriding it."
    }
  },

  {
    id: "mythmaker",
    name: "The Mythmaker",
    oneLiner: "I'm writing my own legend.",

    detection: {
      priority: 7,
      logic: "inner_vision < 5 AND certainty > 6 AND articulation > 5"
    },

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
    name: "The Visionary",
    oneLiner: "I see what I want. Beauty, line, form.",

    detection: {
      priority: 8,
      logic: "inner_vision > 7 AND reference_harmony > 6 AND certainty > 5"
    },

    revealCopy: "You're led by your eye. Composition, balance, how light hits the skin. You know what looks good and you trust that knowing. Meaning matters, but beauty matters too. You want something that lives well on your body and moves well through the world. The right artist will understand that for you, aesthetics aren't shallow. They're the whole point.",

    artistNote: {
      summary: "Visual first. Aesthetic driven.",
      whatToExpect: "They know what looks good. Composition, placement, flow. They have a strong eye and they trust it. Meaning might be secondary or might be absent entirely. That's valid. They want something beautiful on their body. Full stop.",
      howToWork: "Show, don't tell. They respond to images more than explanations. Bring visual options, let them react. Trust their eye. They'll know it when they see it. Don't oversell meaning if they're not asking for it.",
      watchFor: "If Precision modifiers are present, they may be highly specific about execution. Get clarity on exactly what they're envisioning. Their 'beautiful' might be very particular."
    }
  },

  {
    id: "canvas",
    name: "The Canvas",
    oneLiner: "I don't know yet. Help me find it.",

    detection: {
      priority: 3,
      logic: "certainty < 4 AND articulation < 5 AND creative_handoff > 5"
    },

    revealCopy: "You know something wants to come through. You just can't name it yet. That's not a problem. That's an invitation. You're open, receptive, ready to discover what fits. The right artist won't need you to have all the answers. They'll ask the right questions. Together, you'll find what your skin has been waiting for. The image is coming. You just need help seeing it.",

    artistNote: {
      summary: "Needs guidance to discover what they want.",
      whatToExpect: "Low clarity, low articulation, but openness to guidance. They know something wants to come through but they can't name it. They need you to help them see. This is collaborative discovery, not order taking.",
      howToWork: "Ask more questions than usual. Start with broad strokes: what do you not want? What feels wrong? Sketch loose concepts before refining. Show range. Let them eliminate until something clicks. Be patient. This takes longer but builds trust.",
      watchFor: "Ghost Handoff flag. If they can't see it, can't say it, and also won't give you freedom, this becomes very difficult. Make sure they're genuinely open, not just stuck."
    }
  },

  {
    id: "rhythm",
    name: "The Rhythm",
    oneLiner: "I know this dance. Let's go again.",

    detection: {
      priority: 11,
      logic: "canvas_state > 5 AND creative_handoff > 5 AND openness_to_influence > 6 AND iteration_comfort > 5"
    },

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
    name: "The Attuned",
    oneLiner: "Everything aligned. I'm ready.",

    detection: {
      priority: 12,
      logic: "DEFAULT when all sections score 6 to 8 AND flag_count < 2"
    },

    revealCopy: "You've done your homework. You know yourself, you know what you want, and you know how you like to work. There's no confusion, no second guessing, no chaos. Just clarity. You're not here to figure anything out. You're here to make it happen. The right artist will feel this energy immediately. You're the session everyone hopes for.",

    artistNote: {
      summary: "Green light client. Everything aligned.",
      whatToExpect: "Rare. Clear vision, good communicator, flexible, realistic expectations. No red flags, no contradictions. They've done their homework and they're ready to make it happen. This is the smooth session.",
      howToWork: "Don't overcomplicate it. They're ready. Confirm details, execute well, deliver. They'll appreciate efficiency and professionalism. Save the extra consultations for clients who need them.",
      watchFor: "Nothing. Prioritize this booking. These clients often become repeat clients and referral sources. Make it excellent."
    }
  }
];


// ============================================================
// INK PROFILES (8 total)
// ============================================================

const inkProfiles = [
  {
    id: "light_touch",
    name: "Light Touch",
    tagline: "Space is part of the design.",

    detection: {
      priority: 3,
      logic: "density_appetite < 4 AND certainty > 5"
    },

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
    name: "Full Canvas",
    tagline: "Every inch alive.",

    detection: {
      priority: 4,
      logic: "density_appetite > 7 AND reference_harmony > 5 AND certainty > 5"
    },

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
    name: "Precision",
    tagline: "Every line intentional.",

    detection: {
      priority: 5,
      logic: "inner_vision > 7 AND certainty > 6 AND density_appetite >= 4 AND density_appetite <= 7"
    },

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
    id: "living_story",
    name: "Living Story",
    tagline: "The meaning moves with you.",

    detection: {
      priority: 8,
      logic: "archetype == 'mythmaker' OR (inner_vision >= 4 AND inner_vision <= 7 AND certainty > 5 AND density_appetite >= 4 AND density_appetite <= 7)"
    },

    clientCopy: "Your tattoos aren't decorations. They're chapters. Symbols, scenes, pieces that hold weight. The narrative is the art.",

    artistCopy: "Meaning driven. Lead with 'what does this represent?' Illustrative, narrative work lands well. Make sure design serves the story, not the other way around.",

    styleMatches: [
      "Illustrative",
      "Neo traditional",
      "Symbolic / iconographic",
      "Memorial work",
      "Custom narrative pieces"
    ]
  },

  {
    id: "soft_edge",
    name: "Soft Edge",
    tagline: "Flowing, not forced.",

    detection: {
      priority: 6,
      logic: "inner_vision < 5 AND creative_handoff > 5 AND density_appetite >= 3 AND density_appetite <= 6"
    },

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
    id: "artists_hand",
    name: "The Artist's Hand",
    tagline: "I came for your vision.",

    detection: {
      priority: 2,
      logic: "creative_handoff > 7 AND inner_vision < 5 AND openness_to_influence > 6"
    },

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
    id: "bold_classic",
    name: "Bold Classic",
    tagline: "Timeless. Proven. Unapologetic.",

    detection: {
      priority: 7,
      logic: "density_appetite > 5 AND reference_harmony > 6 AND inner_vision > 5 AND certainty > 6"
    },

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
    id: "still_unfolding",
    name: "Still Unfolding",
    tagline: "The right thing hasn't found you yet.",

    detection: {
      priority: 1,
      logic: "certainty < 4 AND reference_harmony < 5"
    },

    clientCopy: "You're not undecided. You're open. You'll know it when you see it. The search is part of the process. Don't rush what's still revealing itself.",

    artistCopy: "Not ready to commit to a style. Consultation should include showing range. Help them narrow by asking what they DON'T want. This is discovery, not execution.",

    styleMatches: [],

    artistTags: [
      "Consultation first",
      "Show portfolio range",
      "Ask elimination questions",
      "May need multiple sessions to land"
    ]
  }
];


// ============================================================
// MODIFIERS (8 total)
// Artist eyes only. Adds nuance to Ink Profile.
// ============================================================

const modifiers = [
  {
    id: "low_certainty",
    icon: "\u26A1",
    label: "Low Certainty",
    detection: "certainty < 4",
    artistNote: "Matched a profile but still exploring. Show options within this direction."
  },
  {
    id: "scattered_references",
    icon: "\uD83D\uDD00",
    label: "Scattered References",
    detection: "reference_harmony < 4",
    artistNote: "Drawn to this style but references are all over. Help them edit."
  },
  {
    id: "locked_in",
    icon: "\uD83C\uDFAF",
    label: "Locked In",
    detection: "certainty > 8 AND reference_harmony > 7",
    artistNote: "Knows exactly what they want. Execute, don't reinvent."
  },
  {
    id: "eclectic_taste",
    icon: "\uD83C\uDF00",
    label: "Eclectic Taste",
    detection: "reference_harmony < 4 AND density_appetite > 6",
    artistNote: "Wants impact but hasn't narrowed. Maximalist with no focus yet."
  },
  {
    id: "feeling_over_image",
    icon: "\uD83D\uDCAD",
    label: "Feeling Over Image",
    detection: "inner_vision < 4",
    artistNote: "Feels it more than sees it. Lead with mood boards, not mockups."
  },
  {
    id: "image_over_feeling",
    icon: "\u2B1C",
    label: "Image Over Feeling",
    detection: "inner_vision > 7 AND articulation > 6",
    artistNote: "Sees it precisely. Wants technical execution. Listen carefully."
  },
  {
    id: "true_middle",
    icon: "\u2696\uFE0F",
    label: "True Middle",
    detection: "ALL vision sliders between 4 and 6",
    artistNote: "No strong pull in any direction. Genuine blank slate. Discovery mode."
  },
  {
    id: "style_curious",
    icon: "\uD83D\uDD01",
    label: "Style Curious",
    detection: "density_appetite > 7 OR density_appetite < 3 AND certainty < 5",
    artistNote: "Knows how much ink, not what style. Show variety within their weight class."
  }
];


// ============================================================
// FLAGS (18 total)
// Artist eyes only. Contradictions and risk patterns.
// ============================================================

const flags = {

  // INTUITION FLAGS (4)

  intuition: [
    {
      id: "impulse_alert",
      label: "Impulse Alert",
      severity: "high",
      detection: "incubation < 3 AND permanence_comfort < 4",
      artistNote: "Decided recently AND nervous about permanence. High regret risk. Slow this down."
    },
    {
      id: "pain_blind",
      label: "Pain Blind",
      severity: "medium",
      detection: "body_intuition > 7 AND canvas_state < 2",
      artistNote: "Claims to know their limits but never been tattooed. Prep them for reality."
    },
    {
      id: "fresh_but_certain",
      label: "Fresh but Certain",
      severity: "low",
      detection: "canvas_state < 2 AND certainty > 8",
      artistNote: "First tattoo but completely certain. Could be solid or uninformed confidence. Verify."
    },
    {
      id: "rushed_timeline",
      label: "Rushed Timeline",
      severity: "medium",
      detection: "incubation < 3 AND density_appetite > 7",
      artistNote: "New idea + wants complex work. Recipe for regret. Ask why the rush."
    }
  ],

  // VISION FLAGS (4)

  vision: [
    {
      id: "pinterest_storm",
      label: "Pinterest Storm",
      severity: "medium",
      detection: "reference_harmony < 4 AND certainty > 6",
      artistNote: "Thinks they know what they want but references are chaos. Editing session needed."
    },
    {
      id: "fog_vision",
      label: "Fog Vision",
      severity: "medium",
      detection: "inner_vision < 4 AND certainty > 6",
      artistNote: "Can't picture it but says they're sure. Contradiction. Dig deeper."
    },
    {
      id: "size_vs_detail",
      label: "Size vs Detail",
      severity: "medium",
      detection: "density_appetite > 7 AND placement_size == 'small'",
      artistNote: "Wants intricate detail at small scale. Won't work. Manage expectations early."
    },
    {
      id: "complexity_unclear",
      label: "Complexity Unclear",
      severity: "low",
      detection: "density_appetite >= 4 AND density_appetite <= 6 AND certainty < 4",
      artistNote: "Doesn't know if they want simple or complex. Needs consultation to decide."
    }
  ],

  // STYLE FLAGS (5)

  style: [
    {
      id: "control_paradox",
      label: "Control Paradox",
      severity: "high",
      detection: "creative_handoff > 7 AND openness_to_influence < 4",
      artistNote: "Says 'surprise me' but won't accept changes. Clarify before starting."
    },
    {
      id: "silent_director",
      label: "Silent Director",
      severity: "high",
      detection: "articulation < 4 AND creative_handoff < 4",
      artistNote: "Wants control but can't explain what they want. Many check ins needed."
    },
    {
      id: "perfectionist_loop",
      label: "Perfectionist Loop",
      severity: "medium",
      detection: "iteration_comfort > 7 AND articulation < 4",
      artistNote: "Expects many revisions but can't say what's wrong. Set revision limits upfront."
    },
    {
      id: "one_shot_pressure",
      label: "One Shot Pressure",
      severity: "medium",
      detection: "iteration_comfort < 3 AND articulation < 5",
      artistNote: "Wants it perfect first try but struggles to communicate. High pressure session."
    },
    {
      id: "yes_then_no",
      label: "Yes Then No",
      severity: "medium",
      detection: "openness_to_influence > 7 AND iteration_comfort < 3",
      artistNote: "Open to ideas but wants it right immediately. Will agree then regret. Confirm twice."
    }
  ],

  // CROSS SECTION FLAGS (5)

  cross: [
    {
      id: "champagne_beer",
      label: "Champagne / Beer",
      severity: "medium",
      detection: "density_appetite > 7 AND budget == 'low'",
      artistNote: "Complex taste, simple budget. Have the money talk before sketching."
    },
    {
      id: "ghost_handoff",
      label: "Ghost Handoff",
      severity: "high",
      detection: "inner_vision < 4 AND creative_handoff < 4 AND articulation < 4",
      artistNote: "Can't see it, can't say it, won't let you lead. Difficult combo. Tread carefully."
    },
    {
      id: "experienced_but_lost",
      label: "Experienced but Lost",
      severity: "low",
      detection: "canvas_state > 6 AND certainty < 4 AND reference_harmony < 4",
      artistNote: "Has tattoos but doesn't know what they want this time. Different from newbie confusion. Life transition?"
    },
    {
      id: "ready_but_rushed",
      label: "Ready but Rushed",
      severity: "low",
      detection: "archetype == 'attuned' AND incubation < 3",
      artistNote: "Everything else aligned but idea is brand new. Almost green light. Just verify the why."
    },
    {
      id: "timeline_crunch",
      label: "Timeline Crunch",
      severity: "medium",
      detection: "incubation < 3 AND timeline == 'asap'",
      artistNote: "New idea + wants it now. Red flag for regret. Ask what's driving the urgency."
    }
  ]
};


// ============================================================
// POSITIVE FLAGS (3 total)
// Green lights. Good signs.
// ============================================================

const positiveFlags = [
  {
    id: "dream_client",
    label: "Dream Client",
    icon: "\u2728",
    detection: "ALL sections 7+ AND flag_count == 0",
    artistNote: "Rare. Clear vision, good communicator, flexible. Prioritize this booking."
  },
  {
    id: "smooth_repeat",
    label: "Smooth Repeat",
    icon: "\uD83D\uDD04",
    detection: "canvas_state > 5 AND archetype == 'rhythm' AND flag_count == 0",
    artistNote: "Knows the process, comfortable, easy. Low maintenance session."
  },
  {
    id: "trust_given",
    label: "Trust Given",
    icon: "\uD83E\uDD1D",
    detection: "archetype == 'muse' AND openness_to_influence > 7 AND creative_handoff > 7",
    artistNote: "Genuinely handing you creative control. Don't waste it. Bring your best."
  }
];


// ============================================================
// SIGNAL CLARITY
// Summary of flag count. Artist dashboard indicator.
// ============================================================

const signalClarity = {
  levels: [
    {
      id: "clear",
      label: "Clear",
      icon: "\u2713",
      detection: "flag_count == 0",
      display: "Clean read. No contradictions."
    },
    {
      id: "some_noise",
      label: "Some Noise",
      icon: "\u26A1",
      detection: "flag_count >= 1 AND flag_count <= 2",
      display: "Minor friction points. See flags."
    },
    {
      id: "mixed",
      label: "Mixed",
      icon: "\u26A0\uFE0F",
      detection: "flag_count >= 3 AND flag_count <= 4",
      display: "Contradictory answers. Consultation needed before booking."
    },
    {
      id: "chaotic",
      label: "Chaotic",
      icon: "\uD83D\uDEA9",
      detection: "flag_count >= 5 OR (ghost_handoff AND silent_director)",
      display: "Answers don't cohere. Either didn't take seriously or genuinely scattered. Proceed with caution."
    }
  ]
};


// ============================================================
// DETAILS SECTION
// Post quiz client intake fields.
// ============================================================

const detailsSection = {

  placement: {
    label: "Placement",
    type: "dropdown",
    required: true,
    groups: [
      {
        name: "Arm",
        options: [
          "Inner forearm",
          "Outer forearm",
          "Upper arm (inner)",
          "Upper arm (outer)",
          "Full sleeve",
          "Half sleeve"
        ]
      },
      {
        name: "Leg",
        options: [
          "Thigh (front)",
          "Thigh (back/side)",
          "Calf",
          "Shin",
          "Ankle",
          "Full leg"
        ]
      },
      {
        name: "Torso",
        options: [
          "Chest",
          "Ribs",
          "Stomach",
          "Back (upper)",
          "Back (full)",
          "Side/flank"
        ]
      },
      {
        name: "Other",
        options: [
          "Neck",
          "Hand",
          "Finger",
          "Foot",
          "Behind ear",
          "Face"
        ]
      },
      {
        name: "Undecided",
        options: [
          "Not sure yet"
        ]
      }
    ]
  },

  size: {
    label: "Size",
    type: "radio",
    required: true,
    options: [
      { value: "tiny", label: "Tiny", description: "Coin sized (< 2 in)" },
      { value: "small", label: "Small", description: "Palm sized (2 to 4 in)" },
      { value: "medium", label: "Medium", description: "Hand sized (4 to 6 in)" },
      { value: "large", label: "Large", description: "Full area (6 to 10 in)" },
      { value: "xlarge", label: "Extra Large", description: "Multi session (10+ in)" },
      { value: "unsure", label: "Not sure yet", description: "" }
    ]
  },

  budget: {
    label: "Budget",
    type: "radio",
    required: true,
    configurable: true,
    defaultOptions: [
      { value: "under_200", label: "Under $200" },
      { value: "200_500", label: "$200 to $500" },
      { value: "500_1000", label: "$500 to $1,000" },
      { value: "1000_2500", label: "$1,000 to $2,500" },
      { value: "2500_plus", label: "$2,500+" },
      { value: "discuss", label: "Let's discuss" }
    ]
  },

  timeline: {
    label: "Timeline",
    type: "radio",
    required: true,
    options: [
      { value: "asap", label: "Ready now" },
      { value: "1_month", label: "Within 1 month" },
      { value: "1_3_months", label: "1 to 3 months" },
      { value: "3_6_months", label: "3 to 6 months" },
      { value: "flexible", label: "Flexible / no rush" },
      { value: "specific", label: "Specific date (event)", hasTextField: true }
    ]
  },

  references: {
    label: "References",
    type: "mixed",
    required: false,
    fields: [
      { type: "url", label: "Pinterest link", placeholder: "Paste your Pinterest board URL" },
      { type: "upload", label: "Upload images", maxFiles: 5, acceptedTypes: ["image/jpeg", "image/png", "image/webp"] }
    ]
  },

  note: {
    label: "Anything else?",
    type: "textarea",
    required: false,
    placeholder: "Anything else you want the artist to know?",
    maxLength: 500
  },

  contact: {
    label: "Contact",
    fields: [
      { id: "name", label: "Name", type: "text", required: true },
      { id: "email", label: "Email", type: "email", required: true },
      { id: "instagram", label: "Instagram", type: "text", required: false, configurable: true },
      { id: "phone", label: "Phone", type: "tel", required: false, configurable: true }
    ]
  }
};


// ============================================================
// DETECTION PRIORITY ORDER
// How archetypes and profiles are matched.
// ============================================================

const detectionOrder = {

  archetypes: [
    // Priority 1: Virgin canvas overrides everything
    "debut",

    // Priority 2-3: Needs help, catch early
    "compass",
    "canvas",

    // Priority 4: Impulse check
    "spark",

    // Priority 5-6: Specific collaboration styles
    "architect",
    "muse",

    // Priority 7-8: Content driven
    "mythmaker",
    "visionary",

    // Priority 9-10: High prep / experienced
    "deliberate",
    "collector",

    // Priority 11: Process comfortable
    "rhythm",

    // Priority 12: Default positive fallback
    "attuned"
  ],

  inkProfiles: [
    // Priority 1: Catch explorers first
    "still_unfolding",

    // Priority 2: High handoff + low vision
    "artists_hand",

    // Priority 3: Low density + certain
    "light_touch",

    // Priority 4: High density + aligned
    "full_canvas",

    // Priority 5: High inner vision + certain
    "precision",

    // Priority 6: Organic flow signals
    "soft_edge",

    // Priority 7: Traditional foundations
    "bold_classic",

    // Priority 8: Default for mid range with meaning
    "living_story"
  ]
};
