import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const screenshotDir = path.resolve('docs/screenshots/seo-phase-2')
const artifactDir = path.resolve('C:/Users/ebadk/.gemini/antigravity/brain/bffe6cc7-9149-406b-bb1d-b3908f04653d')

const files = [
  'homepage_desktop_light.png',
  'homepage_desktop_dark.png',
  'homepage_mobile_light.png',
  'homepage_mobile_dark.png',
  'pricing_desktop_light.png',
  'pricing_desktop_dark.png',
  'pricing_mobile_light.png',
  'pricing_mobile_dark.png',
  'whatsapp_ordering_desktop_light.png',
  'whatsapp_ordering_desktop_dark.png',
  'whatsapp_ordering_mobile_light.png',
  'whatsapp_ordering_mobile_dark.png',
  'qr_table_ordering_desktop_light.png',
  'qr_table_ordering_desktop_dark.png',
  'qr_table_ordering_mobile_light.png',
  'qr_table_ordering_mobile_dark.png',
  'online_ordering_desktop_light.png',
  'online_ordering_desktop_dark.png',
  'online_ordering_mobile_light.png',
  'online_ordering_mobile_dark.png',
]

const galleryHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OrderPilot Marketing Website — Full-Page Visual Review</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 2rem; }
    h1 { margin-bottom: 0.5rem; }
    p.sub { color: #94a3b8; margin-top: 0; margin-bottom: 2rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
    .card { background: #1e293b; border-radius: 8px; overflow: hidden; border: 1px solid #334155; }
    .card-header { padding: 0.75rem 1rem; font-weight: 600; font-size: 0.9rem; background: #0f172a; border-bottom: 1px solid #334155; }
    .thumb-wrap { max-height: 480px; overflow-y: auto; background: #020617; text-align: center; }
    img { width: 100%; height: auto; display: block; }
    a.link { display: block; padding: 0.5rem 1rem; color: #38bdf8; text-decoration: none; font-size: 0.8rem; border-top: 1px solid #334155; background: #1e293b; }
    a.link:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>OrderPilot Content Refinement — Visual Review Gallery</h1>
  <p class="sub">20 Full-Page High-Resolution Captures (Desktop 1440px / Mobile 390px @2x, Light & Dark)</p>
  <div class="grid">
` + files.map(f => `    <div class="card">
      <div class="card-header">${f.replace('.png', '').replace(/_/g, ' ').toUpperCase()}</div>
      <div class="thumb-wrap"><img src="${f}" alt="${f}" loading="lazy" /></div>
      <a class="link" href="${f}" target="_blank">Open Full-Resolution Image &rarr;</a>
    </div>`).join('\n') + `
  </div>
</body>
</html>`

fs.writeFileSync(path.join(screenshotDir, 'index.html'), galleryHtml)
fs.writeFileSync(path.join(artifactDir, 'index.html'), galleryHtml)
console.log('index.html written to both directories.')

// Zip creation using PowerShell Compress-Archive
const zipPathDocs = path.resolve('docs/screenshots/orderpilot_seo_phase2_review.zip')
const zipPathArtifact = path.join(artifactDir, 'orderpilot_seo_phase2_review.zip')

console.log('Creating ZIP archive...')
execSync(`powershell -Command "Compress-Archive -Path '${screenshotDir}/*' -DestinationPath '${zipPathDocs}' -Force"`)
fs.copyFileSync(zipPathDocs, zipPathArtifact)
console.log(`ZIP created successfully at:
- ${zipPathDocs}
- ${zipPathArtifact}`)

