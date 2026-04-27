// Render the brand card to public/og-image.png (1200x630)
// and rasterize public/favicon.svg into PNGs at 16/32/180/192/512.
//
// Usage: node scripts/render-assets.mjs
// Requires: npx playwright install chromium

import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { readFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

const FAVICON_SVG_PATH = resolve(repoRoot, "public", "favicon.svg");
const BRAND_CARD_PATH = resolve(__dirname, "brand-card.html");

const PNG_SIZES = [
  { size: 16, file: "favicon-16.png" },
  { size: 32, file: "favicon-32.png" },
  { size: 180, file: "apple-touch-icon.png" },
  { size: 192, file: "android-chrome-192.png" },
  { size: 512, file: "android-chrome-512.png" },
];

async function rasterizeFaviconPngs(browser) {
  const svg = readFileSync(FAVICON_SVG_PATH, "utf8");
  for (const { size, file } of PNG_SIZES) {
    const ctx = await browser.newContext({
      viewport: { width: size, height: size },
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    const html = `<!DOCTYPE html>
<html><head><style>
  html,body { margin:0; padding:0; width:${size}px; height:${size}px; overflow:hidden; background:transparent; }
  svg { width:${size}px; height:${size}px; display:block; }
</style></head><body>${svg}</body></html>`;
    await page.setContent(html, { waitUntil: "networkidle" });
    const out = resolve(repoRoot, "public", file);
    await page.screenshot({ path: out, omitBackground: true, type: "png" });
    await ctx.close();
    console.log(`  wrote ${file} (${size}x${size})`);
  }
}

async function renderOgImage(browser) {
  const ctx = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(`file://${BRAND_CARD_PATH.replace(/\\/g, "/")}`, {
    waitUntil: "networkidle",
  });
  // Give web fonts a beat to settle
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  });
  const out = resolve(repoRoot, "public", "og-image.png");
  await page.screenshot({
    path: out,
    type: "png",
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  });
  await ctx.close();
  console.log(`  wrote og-image.png (1200x630)`);
}

(async () => {
  const browser = await chromium.launch();
  try {
    console.log("rasterizing favicon PNGs:");
    await rasterizeFaviconPngs(browser);
    console.log("rendering OG brand card:");
    await renderOgImage(browser);
  } finally {
    await browser.close();
  }
})();
