#!/usr/bin/env node

/**
 * Generate Placeholder Frames for Scroll Animation
 *
 * Creates 192 placeholder frames as PNG images with smooth gradient transitions.
 * These simulate an Apple-style product reveal animation.
 *
 * Usage:
 *   node scripts/generate-placeholder-frames.js
 *
 * Output:
 *   public/frames/frame-001.webp through frame-192.webp (as PNG, rename extension for real WebP)
 *
 * For production:
 *   Replace these with real frames extracted from your video using ffmpeg:
 *   ffmpeg -i your-video.mp4 -vf "scale=1920:1080" -q:v 80 public/frames/frame-%03d.webp
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const TOTAL_FRAMES = 192;
const WIDTH = 1920;
const HEIGHT = 1080;
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'frames');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Easing function
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// HSL to RGB helper
function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

console.log(`Generating ${TOTAL_FRAMES} placeholder frames...`);
console.log(`Output: ${OUTPUT_DIR}`);
console.log('');

for (let i = 0; i < TOTAL_FRAMES; i++) {
  const progress = i / (TOTAL_FRAMES - 1);
  const eased = easeInOutCubic(progress);

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Phase 1 (0-30%): Dark to purple gradient reveal
  // Phase 2 (30-70%): Product showcase / feature highlights
  // Phase 3 (70-100%): Final hero shot / fade

  // Background
  const bgHue = 260 + eased * 20; // Purple range
  const bgSat = 20 + eased * 40;
  const bgLight = 5 + eased * 12;
  const [bgR, bgG, bgB] = hslToRgb(bgHue, bgSat, bgLight);
  ctx.fillStyle = `rgb(${bgR}, ${bgG}, ${bgB})`;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Radial gradient overlay
  const gradient = ctx.createRadialGradient(
    WIDTH / 2, HEIGHT / 2, 0,
    WIDTH / 2, HEIGHT / 2, Math.max(WIDTH, HEIGHT) * 0.6
  );

  const glowIntensity = Math.sin(progress * Math.PI) * 0.4;
  gradient.addColorStop(0, `rgba(108, 60, 224, ${glowIntensity})`);
  gradient.addColorStop(0.5, `rgba(155, 115, 245, ${glowIntensity * 0.3})`);
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Central element (simulated product)
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;

  // Product reveal animation
  if (progress > 0.05) {
    const revealProgress = Math.min((progress - 0.05) / 0.4, 1);
    const reveal = easeInOutCubic(revealProgress);

    const productSize = 150 + reveal * 200;
    const productAlpha = reveal;

    // Glow behind product
    const productGlow = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, productSize * 2
    );
    productGlow.addColorStop(0, `rgba(108, 60, 224, ${productAlpha * 0.3})`);
    productGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = productGlow;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Product rectangle (simulating a device)
    ctx.save();
    ctx.globalAlpha = productAlpha;

    const rectW = productSize * 0.4;
    const rectH = productSize * 1.2;
    const rx = 20;

    // Rounded rectangle
    ctx.beginPath();
    ctx.moveTo(centerX - rectW / 2 + rx, centerY - rectH / 2);
    ctx.lineTo(centerX + rectW / 2 - rx, centerY - rectH / 2);
    ctx.quadraticCurveTo(centerX + rectW / 2, centerY - rectH / 2, centerX + rectW / 2, centerY - rectH / 2 + rx);
    ctx.lineTo(centerX + rectW / 2, centerY + rectH / 2 - rx);
    ctx.quadraticCurveTo(centerX + rectW / 2, centerY + rectH / 2, centerX + rectW / 2 - rx, centerY + rectH / 2);
    ctx.lineTo(centerX - rectW / 2 + rx, centerY + rectH / 2);
    ctx.quadraticCurveTo(centerX - rectW / 2, centerY + rectH / 2, centerX - rectW / 2, centerY + rectH / 2 - rx);
    ctx.lineTo(centerX - rectW / 2, centerY - rectH / 2 + rx);
    ctx.quadraticCurveTo(centerX - rectW / 2, centerY - rectH / 2, centerX - rectW / 2 + rx, centerY - rectH / 2);
    ctx.closePath();

    const deviceGrad = ctx.createLinearGradient(centerX - rectW / 2, centerY - rectH / 2, centerX + rectW / 2, centerY + rectH / 2);
    deviceGrad.addColorStop(0, '#2a1a4a');
    deviceGrad.addColorStop(1, '#1a0a3a');
    ctx.fillStyle = deviceGrad;
    ctx.fill();

    // Device screen
    ctx.strokeStyle = `rgba(108, 60, 224, ${0.5 + Math.sin(progress * Math.PI * 4) * 0.3})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Screen content (ECG-like line)
    if (revealProgress > 0.3) {
      const screenProgress = Math.min((revealProgress - 0.3) / 0.5, 1);
      ctx.beginPath();
      ctx.strokeStyle = `rgba(155, 115, 245, ${screenProgress})`;
      ctx.lineWidth = 2;
      const screenLeft = centerX - rectW / 2 + 15;
      const screenRight = centerX + rectW / 2 - 15;
      const screenMid = centerY;

      for (let x = screenLeft; x <= screenLeft + (screenRight - screenLeft) * screenProgress; x += 2) {
        const t = (x - screenLeft) / (screenRight - screenLeft);
        const wave = Math.sin(t * Math.PI * 6 + progress * 20) * 15;
        const spike = t > 0.4 && t < 0.6 ? Math.sin((t - 0.4) / 0.2 * Math.PI) * 40 : 0;
        const y = screenMid + wave + spike;
        if (x === screenLeft) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    ctx.restore();
  }

  // Feature labels that appear over time
  if (progress > 0.35) {
    const features = ['Seizure Detection', 'Fall Detection', 'Heart Rate', 'AI Powered'];
    const featureSpacing = 60;
    const featureStartY = centerY + 250;

    features.forEach((feature, fi) => {
      const featureDelay = 0.35 + fi * 0.12;
      if (progress > featureDelay) {
        const featureProgress = Math.min((progress - featureDelay) / 0.15, 1);
        const featureEased = easeInOutCubic(featureProgress);

        ctx.save();
        ctx.globalAlpha = featureEased;
        ctx.font = '600 22px sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.textAlign = 'center';
        ctx.fillText(feature, centerX, featureStartY + fi * featureSpacing + (1 - featureEased) * 30);
        ctx.restore();
      }
    });
  }

  // Particles / floating dots
  for (let p = 0; p < 15; p++) {
    const px = (Math.sin(p * 1.7 + progress * Math.PI * 2) * 0.5 + 0.5) * WIDTH;
    const py = (Math.cos(p * 2.3 + progress * Math.PI * 1.5) * 0.5 + 0.5) * HEIGHT;
    const ps = 2 + Math.sin(p + progress * 10) * 1.5;
    const pa = 0.1 + Math.sin(p * 0.5 + progress * 5) * 0.1;
    ctx.beginPath();
    ctx.arc(px, py, ps, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(155, 115, 245, ${pa})`;
    ctx.fill();
  }

  // Frame counter (dev overlay)
  ctx.save();
  ctx.globalAlpha = 0.15;
  ctx.font = '14px monospace';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'right';
  ctx.fillText(`Frame ${i + 1}/${TOTAL_FRAMES}`, WIDTH - 30, HEIGHT - 20);
  ctx.restore();

  // Write file
  const padded = String(i + 1).padStart(3, '0');
  const filename = `frame-${padded}.webp`;
  const filepath = path.join(OUTPUT_DIR, filename);

  // Save as PNG (rename to .webp for the component — or convert with sharp/cwebp)
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filepath, buffer);

  // Progress indicator
  if ((i + 1) % 20 === 0 || i === 0 || i === TOTAL_FRAMES - 1) {
    const pct = Math.round(((i + 1) / TOTAL_FRAMES) * 100);
    process.stdout.write(`\r  Progress: ${pct}% (${i + 1}/${TOTAL_FRAMES})`);
  }
}

console.log('\n\nDone! Placeholder frames generated.');
console.log(`\nTo convert to actual WebP for smaller file sizes:`);
console.log(`  for f in public/frames/frame-*.webp; do cwebp "$f" -o "$f" -q 80; done`);
console.log(`\nFor production, extract frames from your video:`);
console.log(`  ffmpeg -i your-video.mp4 -vf "scale=1920:1080" public/frames/frame-%03d.webp`);
