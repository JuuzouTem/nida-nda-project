## 1. Project Overview
This project is an interactive, romantic, web-based mini-game/story designed as a gift. It combines molecular biology (DNA/RNA transcription) with a personal love story. The experience is divided into four phases:
1. **Tutorial:** Teaching standard DNA base pairing (A-T, G-C) via a simple drag-and-drop interface.
2. **The Mutation (Story Transition):** A cinematic transition explaining how the rules of biology changed on "March 28, 2026", mutating the bases into the couple's names (N-I-D-A and B for Behlül).
3. **The Mini-Game:** A custom mRNA transcription puzzle where the user must pair the new bases (e.g., 'N' must pair with 'B').
4. **The Finale:** A highly romantic, scientific conclusion text appearing with a glowing animation and background music.

## 2. Tech Stack & Dependencies
*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Animations:** Framer Motion (Crucial for smooth DNA helix animations and romantic scene transitions)
*   **Drag and Drop:** `@dnd-kit/core` and `@dnd-kit/sortable` (for the base pairing mini-game)
*   **Audio Handling:** HTML5 Audio API (for background music like *Dangerously Yours Masquerade* or *Kikuo*, and "ding" sound effects)
*   **Deployment:** Vercel

## 3. Directory Structure
```text
nida-dna-project/
├── public/
│   ├── assets/
│   │   ├── music/
│   │   │   └── dangerously-yours.mp3
│   │   └── sfx/
│   │       └── ding.mp3
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── DNAHelixAnimation.tsx
│   │   ├── DragDropBoard.tsx
│   │   ├── DraggableBase.tsx
│   │   ├── DroppableSlot.tsx
│   │   ├── StoryTransition.tsx
│   │   └── AudioPlayer.tsx
│   ├── lib/
│   │   ├── constants.ts (Stores the biological and romantic texts)
│   │   └── types.ts
│   └── hooks/
│       └── useGameLogic.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 4. Development Rules
*   **TypeScript Strictness:** Use strict interfaces for game states (e.g., `type GamePhase = 'TUTORIAL' | 'TRANSITION' | 'MINI_GAME' | 'FINALE'`).
*   **Mobile-First Design:** The UI must be perfectly playable on mobile screens, as the target user will likely view it on a phone. Touch events for drag-and-drop must be flawless.
*   **Aesthetic & UI:** Use a dark, romantic clinic/laboratory theme. Deep navy blues, soft neon greens, and glowing ambers (Genshin Impact style 5-star glow for the finale).
*   **Naming Conventions:** No generic variable names. Use context-specific names like `standardDnaPairs`, `mutatedRomanticPairs`, `handleBaseDrop`, `triggerMutationSequence`.
*   **Audio Autoplay:** Browsers block autoplay. Implement a subtle "Begin Experiment" or "Start" button on the very first screen to initialize audio context legitimately.

## 5. Roadmap & Status

- [ ] **Phase 1: Setup & Architecture**
  - [ ] Initialize Next.js 14 project with Tailwind and TypeScript.
  - [ ] Install Framer Motion and dnd-kit.
  - [ ] Setup global CSS and define color palette (Dark Lab/Romantic theme).
  - [ ] Create the basic `AudioPlayer` component for background music handling.

- [ ] **Phase 2: Tutorial Stage (Standard Biology)**
  - [ ] Build `DragDropBoard` with standard A-T, G-C logic.
  - [ ] Add `DraggableBase` and `DroppableSlot` components.
  - [ ] Implement validation: Only correct pairs snap into place.
  - [ ] Add success state and "ding" sound effect.

- [ ] **Phase 3: The Mutation & Story Transition**
  - [ ] Create `StoryTransition` component using Framer Motion.
  - [ ] Animate standard letters (A, T, G, C) morphing into N, İ, D, A.
  - [ ] Display the storyline text about the "March 28, 2026" mutation and the rule where 'N' pairs with 'B'.

- [ ] **Phase 4: Romantic Mini-Game & Finale**
  - [ ] Update drag-and-drop logic for the custom mRNA transcription (N-B, İ-N, D-A, etc.).
  - [ ] Add the glowing 5-star reveal animation upon completion.
  - [ ] Display the final romantic letter.
  - [ ] Test interactions on mobile devices.
  - [ ] Deploy to Vercel.