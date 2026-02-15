// Browserbase automation for adding items to Amazon cart via API

const API_URL = 'http://localhost:3001';

interface BrowserbaseResult {
  success: boolean;
  message: string;
  sessionId?: string;
  liveViewUrl?: string;
}

export async function addToAmazonCart(itemName: string, brand: string): Promise<BrowserbaseResult> {
  try {
    console.log(`Requesting Browserbase automation for: ${itemName} (${brand})`);
    
    const response = await fetch(`${API_URL}/api/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemName,
        brand,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add item to cart');
    }

    const result = await response.json();
    console.log('Browserbase automation started:', result);
    return result;
    
  } catch (error) {
    console.error('Error calling Browserbase API:', error);
    throw error;
  }
}
