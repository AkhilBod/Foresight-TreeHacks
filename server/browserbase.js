import express from 'express';
import cors from 'cors';
import { chromium } from 'playwright-core';
import Browserbase from '@browserbasehq/sdk';

const app = express();
app.use(cors());
app.use(express.json());

const BROWSERBASE_API_KEY = 'bb_live_s9hWIOg3unpQPZ4BXOLF-a0lY2E';
const BROWSERBASE_PROJECT_ID = 'c3948bfc-711f-424d-9685-13fc8db362d7';

const bb = new Browserbase({
  apiKey: BROWSERBASE_API_KEY,
});

app.post('/api/add-to-cart', async (req, res) => {
  const { itemName, brand } = req.body;

  if (!itemName || !brand) {
    return res.status(400).json({ error: 'Missing itemName or brand' });
  }

  try {
    console.log(`Starting Browserbase automation for: ${itemName} (${brand})`);
    
    // Create a new session using the SDK
    const session = await bb.sessions.create({
      projectId: BROWSERBASE_PROJECT_ID,
    });
    console.log('Browserbase session created:', session.id);

    // Get Live View URL
    const liveViewLinks = await bb.sessions.debug(session.id);
    const liveViewUrl = `${liveViewLinks.debuggerFullscreenUrl}&navbar=false`;
    console.log('Live View URL:', liveViewUrl);

    // Send the live view URL immediately so the frontend can show it
    res.json({ 
      success: true, 
      message: `Starting purchase for ${itemName}`, 
      sessionId: session.id,
      liveViewUrl: liveViewUrl
    });

    // Connect to the session using Playwright connectOverCDP
    console.log('Connecting via CDP:', session.connectUrl);
    const browser = await chromium.connectOverCDP(session.connectUrl);

    // Get the default context and page (ensures session recording)
    const defaultContext = browser.contexts()[0];
    const page = defaultContext.pages()[0];

    // Navigate to Amazon
    console.log('Navigating to Amazon...');
    await page.goto('https://www.amazon.com', { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Search for the item
    const searchQuery = `${brand} ${itemName}`;
    console.log(`Searching for: ${searchQuery}`);
    await page.waitForSelector('#twotabsearchtextbox, input[name="field-keywords"]', { timeout: 10000 });
    await page.fill('#twotabsearchtextbox, input[name="field-keywords"]', searchQuery);
    await page.keyboard.press('Enter');
    
    // Wait for search results
    console.log('Waiting for search results...');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    // Click the first product link
    console.log('Clicking first search result...');
    const firstProductLink = page.locator('.s-main-slot .s-result-item h2 a, [data-component-type="s-search-result"] h2 a').first();
    await firstProductLink.waitFor({ timeout: 10000 });
    await firstProductLink.click();
    
    // Wait for product page to load
    console.log('Loading product page...');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
    
    // Add to cart
    console.log('Adding to cart...');
    const addToCartButton = page.locator('#add-to-cart-button');
    try {
      await addToCartButton.waitFor({ timeout: 10000 });
      await addToCartButton.click();
      console.log('Clicked Add to Cart!');
      await page.waitForTimeout(3000);
      console.log(`Successfully added "${itemName}" to Amazon cart!`);
    } catch (e) {
      console.log('Add to cart button not found, item may require options selection');
    }
    
    console.log(`View session replay: https://browserbase.com/sessions/${session.id}`);
    
    // Close
    await page.close();
    await browser.close();
    
  } catch (error) {
    console.error('Error in automation:', error.message);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Browserbase API server running on http://localhost:${PORT}`);
});
