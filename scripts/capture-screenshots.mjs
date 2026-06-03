import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = new URL('../verification-screenshots/', import.meta.url);
const port = 9222;
const baseUrl = 'http://localhost:3000';

const shots = [
  { name: 'footer', path: '/', selector: 'footer' },
  { name: 'about-legal-operator', path: '/about', selectorText: 'Company Information' },
  { name: 'privacy-top-section', path: '/privacy-policy', selectorText: 'Operator Information' },
  { name: 'terms-top-section', path: '/terms-of-service', selectorText: 'Company Information' },
  { name: 'data-deletion-page', path: '/data-deletion', selectorText: 'Data Deletion Request' },
];

await mkdir(outputDir, { recursive: true });

const chrome = spawn(chromePath, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  '--disable-gpu',
  '--hide-scrollbars',
  '--window-size=1440,1100',
  '--user-data-dir=.chrome-screenshot-profile',
  'about:blank',
], { stdio: 'ignore' });

async function requestJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  }
  return response.json();
}

async function waitForChrome() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      return await requestJson(`http://127.0.0.1:${port}/json/version`);
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw new Error('Chrome did not start in time.');
}

function createCdpClient(webSocketDebuggerUrl) {
  const socket = new WebSocket(webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) {
        reject(new Error(message.error.message));
      } else {
        resolve(message.result);
      }
    }
  });

  return new Promise((resolve, reject) => {
    socket.addEventListener('open', () => {
      resolve({
        send(method, params = {}) {
          id += 1;
          socket.send(JSON.stringify({ id, method, params }));
          return new Promise((resolveCommand, rejectCommand) => {
            pending.set(id, { resolve: resolveCommand, reject: rejectCommand });
          });
        },
        close() {
          socket.close();
        },
      });
    });
    socket.addEventListener('error', reject);
  });
}

async function captureShot(shot) {
  const target = await requestJson(`http://127.0.0.1:${port}/json/new?${encodeURIComponent('about:blank')}`, {
    method: 'PUT',
  });
  const client = await createCdpClient(target.webSocketDebuggerUrl);

  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('Page.navigate', { url: `${baseUrl}${shot.path}` });

  for (let attempt = 0; attempt < 40; attempt += 1) {
    const ready = await client.send('Runtime.evaluate', {
      expression: `document.readyState === 'complete' && location.href.startsWith(${JSON.stringify(`${baseUrl}${shot.path}`)})`,
      returnByValue: true,
    });
    if (ready.result.value === true) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  if (shot.selectorText) {
    await client.send('Runtime.evaluate', {
      expression: `
        (() => {
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
          let node = document.body;
          while (node) {
            if (node.textContent && node.textContent.includes(${JSON.stringify(shot.selectorText)})) {
              node.scrollIntoView({ block: 'start' });
              window.scrollBy(0, -90);
              return true;
            }
            node = walker.nextNode();
          }
          return false;
        })()
      `,
      returnByValue: true,
    });
  } else if (shot.selector) {
    await client.send('Runtime.evaluate', {
      expression: `
        (() => {
          const element = document.querySelector(${JSON.stringify(shot.selector)});
          if (!element) return false;
          window.scrollTo(0, Math.max(0, element.getBoundingClientRect().top + window.scrollY - 80));
          return true;
        })()
      `,
      returnByValue: true,
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  const image = await client.send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: true,
  });
  await writeFile(new URL(`${shot.name}.png`, outputDir), Buffer.from(image.data, 'base64'));
  await client.close();
}

try {
  await waitForChrome();
  for (const shot of shots) {
    await captureShot(shot);
  }
} finally {
  chrome.kill();
}
