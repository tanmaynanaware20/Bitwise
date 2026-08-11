import { chromium } from 'playwright';
import path from 'path';

const targetDir = 'C:\\Users\\tanma\\.gemini\\antigravity\\brain\\5823c2cf-6205-4c2d-aaa7-aa2bf23ed8f5';

const viewports = [
  { width: 375, height: 812, name: 'mobile_375' },
  { width: 390, height: 844, name: 'mobile_390' },
  { width: 430, height: 932, name: 'mobile_430' },
  { width: 768, height: 1024, name: 'tablet_768' },
  { width: 1024, height: 768, name: 'desktop_1024' },
  { width: 1440, height: 900, name: 'desktop_1440' },
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const consoleErrors = [];

  for (const vp of viewports) {
    // Test Light Mode
    const contextLight = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: 'light',
    });
    const pageLight = await contextLight.newPage();
    pageLight.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(`[Light ${vp.name}] ${msg.text()}`);
    });

    await pageLight.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    
    // Check horizontal scrollbar
    const scrollWidthLight = await pageLight.evaluate(() => document.documentElement.scrollWidth);
    const clientWidthLight = await pageLight.evaluate(() => document.documentElement.clientWidth);
    const hasHorizontalScrollLight = scrollWidthLight > clientWidthLight;

    console.log(`[${vp.name} Light] ScrollWidth: ${scrollWidthLight}, ClientWidth: ${clientWidthLight}, Overflow: ${hasHorizontalScrollLight}`);

    const lightShotPath = path.join(targetDir, `bitewise_${vp.name}_light.png`);
    await pageLight.screenshot({ path: lightShotPath, fullPage: false });
    await contextLight.close();

    // Test Dark Mode
    const contextDark = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: 'dark',
    });
    const pageDark = await contextDark.newPage();
    pageDark.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(`[Dark ${vp.name}] ${msg.text()}`);
    });

    await pageDark.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    
    // Toggle theme to dark via theme button if needed
    await pageDark.evaluate(() => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bitewise_theme', 'dark');
    });

    const scrollWidthDark = await pageDark.evaluate(() => document.documentElement.scrollWidth);
    const clientWidthDark = await pageDark.evaluate(() => document.documentElement.clientWidth);
    const hasHorizontalScrollDark = scrollWidthDark > clientWidthDark;

    console.log(`[${vp.name} Dark] ScrollWidth: ${scrollWidthDark}, ClientWidth: ${clientWidthDark}, Overflow: ${hasHorizontalScrollDark}`);

    const darkShotPath = path.join(targetDir, `bitewise_${vp.name}_dark.png`);
    await pageDark.screenshot({ path: darkShotPath, fullPage: false });
    await contextDark.close();
  }

  await browser.close();

  if (consoleErrors.length > 0) {
    console.error('Browser Console Errors found:', consoleErrors);
  } else {
    console.log('Zero console errors detected across all viewports!');
  }
}

run().catch((err) => {
  console.error('Error running screenshot script:', err);
  process.exit(1);
});
