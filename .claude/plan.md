# G1 Band Section Improvements Plan

## Changes Overview

### 1. Watch Screen Branding
- Add "MOZEK" logo text on the watch screen with animated glow
- Add animated data readouts that cycle (HR → SpO2 → Temp → Steps)
- Create a sleek OLED-style screen with Mozek branding

### 2. Scroll-Triggered Screen Info
- As user scrolls through the section, the watch screen shows different data
- Stage 1: Mozek logo + heartbeat
- Stage 2: SpO2 reading + waveform
- Stage 3: Temperature + alert status
- Stage 4: Seizure detection active indicator

### 3. Improved Exploding Parts with Colors
- Add distinct colored gradients to each part when exploded
- Strap top: teal/cyan glow
- Strap bottom: purple glow
- Body: golden/amber glow border
- Screen: bright purple radiant glow
- Add particle burst effect during explode

### 4. Enhanced Visual Effects
- Pulsing ring animation around the watch
- Improved glow with color cycling
- Better shadow depth on parts
- Connection lines from labels to parts during explode

### 5. More Product Information
- Add tech specs (Battery: 7 days, Water: IP68, Weight: 38g, Display: 1.47" AMOLED)
- Add a "Powered by AI" indicator
- Enhanced feature descriptions

### Files to Modify
- `app/page.js` - Update JSX for watch screen content + new info elements
- `app/globals.css` - New styles for branding, colors, effects
- `hooks/useGSAPAnimations.js` - Enhanced scroll-triggered screen data + colored explode
