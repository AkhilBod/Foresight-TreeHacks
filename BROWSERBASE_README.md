# Browserbase Server Setup

This server handles the Browserbase automation for adding items to Amazon cart.

## Running the Server

### Terminal 1: Start the Browserbase API Server
```bash
bun run server
```
This starts the Express server on `http://localhost:3001`

### Terminal 2: Start the Frontend
```bash
bun run dev
```
This starts Vite on `http://localhost:8080`

## How It Works

1. **Frontend (Dashboard)**: When you click the checkmark ✓ to approve an item
2. **API Call**: The frontend calls `POST /api/add-to-cart` with item name and brand
3. **Browserbase**: Server creates a Browserbase session and automates:
   - Navigate to Amazon.com
   - Search for the item
   - Click first result
   - Add to cart
4. **Response**: Server returns success/failure to frontend

## Environment Variables

The Browserbase credentials are hardcoded in `server/browserbase.js`:
- API Key: `bb_live_s9hWIOg3unpQPZ4BXOLF-a0lY2E`
- Project ID: `c3948bfc-711f-424d-9685-13fc8db362d7`

## API Endpoints

### POST /api/add-to-cart
Adds an item to Amazon cart using Browserbase automation.

**Request Body:**
```json
{
  "itemName": "Dish Soap",
  "brand": "Dawn Ultra"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Dish Soap added to cart"
}
```

## Demo Flow

1. Start camera detection
2. AI detects items (e.g., "Dish Soap - Dawn Ultra")
3. Items appear in Dashboard pending purchases
4. Click checkmark ✓ 
5. **Amazon animation plays (4s)** - During this time, Browserbase is adding to real Amazon cart
6. **Visa animation plays (3s)** - Confirms the purchase
7. Stats update and item is marked as approved
8. Check your Amazon cart - item is actually there! 🛒

## Troubleshooting

- Make sure both servers are running (port 3001 and 8080)
- Check browser console for API connection errors
- Check server terminal for Browserbase session errors
- Ensure Browserbase API key is valid and has credits
