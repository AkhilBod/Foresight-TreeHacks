import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DetectedItem {
  name: string;
  status: string;
  timestamp: string;
}

interface Activity {
  message: string;
  time: string;
}

// Expected items by household area
const HOUSEHOLD_CONTEXTS = {
  kitchen: [
    "Dish Soap", "Hand Soap", "Paper Towels", "Sponges", "Dish Detergent",
    "Cooking Oil", "Olive Oil", "Salt", "Pepper", "All-Purpose Cleaner",
    "Trash Bags", "Aluminum Foil", "Plastic Wrap", "Coffee", "Coffee Filters"
  ],
  bathroom: [
    "Hand Soap", "Toilet Paper", "Paper Towels", "Shampoo", "Conditioner",
    "Body Wash", "Toothpaste", "Facial Tissues", "Bathroom Cleaner",
    "Hand Sanitizer", "Cotton Swabs", "Cotton Balls"
  ],
  laundry: [
    "Laundry Detergent", "Fabric Softener", "Dryer Sheets", "Stain Remover",
    "Bleach", "Laundry Pods"
  ],
  general: [
    "Hand Sanitizer", "Disinfecting Wipes", "Glass Cleaner", "Multi-Surface Cleaner",
    "Air Freshener", "Light Bulbs", "Batteries"
  ]
};

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const analysisIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const itemHistoryRef = useRef<Map<string, { status: string; count: number; lastSeen: number }>>(new Map());
  const [isActive, setIsActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [autoAnalyze, setAutoAnalyze] = useState(true);

  const GEMINI_API_KEY = "AIzaSyCH2Vk-MY551p7-3Or0mSJhA-kyAWKdXwk";

  useEffect(() => {
    return () => {
      stopCamera();
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
    };
  }, []);

  // Auto-analysis effect for live camera feed
  useEffect(() => {
    if (isActive && autoAnalyze && !uploadedImage) {
      // Start analyzing every 5 seconds (respects rate limits)
      analysisIntervalRef.current = setInterval(() => {
        captureAndAnalyze();
      }, 5000);

      // Also run analysis immediately when camera starts
      const initialTimeout = setTimeout(() => {
        captureAndAnalyze();
      }, 1000);

      return () => {
        if (analysisIntervalRef.current) {
          clearInterval(analysisIntervalRef.current);
        }
        clearTimeout(initialTimeout);
      };
    } else {
      // Clear interval when camera is stopped or auto-analyze is disabled
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
        analysisIntervalRef.current = null;
      }
    }
  }, [isActive, autoAnalyze, uploadedImage]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
    setUploadedImage(null);
    // Clear history when stopping camera
    itemHistoryRef.current.clear();
    setDetectedItems([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Clear history when uploading new image
    itemHistoryRef.current.clear();
    setDetectedItems([]);

    // Stop camera if active
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsActive(false);
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      console.log("Image uploaded, setting state:", imageUrl.substring(0, 50));
      setUploadedImage(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImageWithGemini = async (base64Image: string) => {
    try {
      // Call Gemini API - using Gemini 1.5 Flash (better paid tier support)
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a smart shopping assistant AI for Visa Smart Home Commerce. Analyze images and recommend products that could be useful based on what you see.

YOUR TASK: Look at this image and recommend products that might be needed, running low, or would be useful in this context.

STATUS DEFINITIONS:
- "Low" = Item is visible but running low (container less than 25% full)
- "Empty" = Container is visible but completely depleted
- "Missing" = Item would be useful here but is not visible
- "Recommended" = Item would enhance this space/activity

BE FLEXIBLE AND SMART:
1. Identify the scene/context (bathroom, kitchen, bedroom, living room, closet, pantry, etc.)
2. Look for items that are low, empty, or missing
3. Recommend products that would be useful based on the visible context
4. Think broadly - household items, food, snacks, drinks, clothes, accessories, etc.
5. Be practical and helpful, not overly aggressive

WHAT TO DETECT:

BATHROOMS:
- Essentials: Toilet Paper, Hand Soap, Shampoo, Conditioner, Body Wash, Toothpaste
- Nice-to-haves: Tissues, Lotion, Air Freshener, Cleaning Supplies, Cotton Swabs
- Empty/low containers, missing items

KITCHEN:
- Essentials: Dish Soap, Sponges, Paper Towels, Trash Bags
- Food/Drinks: Coffee, Tea, Cooking Oil, Salt, Pepper, Spices
- Snacks: Chips, Cookies, Granola Bars (if pantry/counter visible)
- Fresh items: Milk, Eggs, Bread (if fridge/counter visible and empty spots)
- Empty containers, low supplies, bare shelves

BEDROOM/CLOSET:
- Laundry: Detergent, Fabric Softener, Dryer Sheets, Stain Remover
- Clothing: If hangers are empty or closet sparse, suggest basics (t-shirts, socks, etc.)
- Bedding: If bed visible, note if sheets/pillows look worn

LIVING ROOM/OFFICE:
- Supplies: Batteries, Light Bulbs, Tissues, Cleaning Wipes
- Snacks: If coffee table/desk visible, suggest snacks or drinks
- Organization: Storage bins if clutter visible

PANTRY/FRIDGE:
- Look for empty shelves or sparse areas
- Recommend staples: Pasta, Rice, Canned Goods, Snacks, Drinks
- Note visibly empty containers or low stock

ANY SCENE:
- Be observant and creative
- If you see clutter → recommend storage/organization
- If you see empty spaces → recommend what typically goes there
- If items look worn/old → recommend replacements
- Consider user convenience and lifestyle

DETECTION EXAMPLES:
✓ Empty toilet paper holder → "Toilet Paper" status: "Empty"
✓ Sparse pantry shelf → "Pasta" status: "Missing", "Canned Soup" status: "Missing"
✓ Nearly empty shampoo bottle → "Shampoo" status: "Low"
✓ Empty fruit bowl on counter → "Fresh Fruit" status: "Recommended"
✓ Coffee maker with no coffee → "Coffee" status: "Missing"
✓ Messy desk → "Desk Organizer" status: "Recommended"
✓ Empty snack drawer → "Granola Bars" status: "Missing", "Chips" status: "Missing"
✓ Low laundry detergent → "Laundry Detergent" status: "Low"
✓ Sparse closet → "T-Shirts" status: "Recommended"

Return ONLY a JSON array with name and status. Be helpful but reasonable (3-8 items typically):

Examples:
Bathroom with empty soap: [{"name":"Hand Soap","status":"Empty"},{"name":"Toilet Paper","status":"Low"}]
Sparse pantry: [{"name":"Pasta","status":"Missing"},{"name":"Canned Soup","status":"Missing"},{"name":"Rice","status":"Missing"},{"name":"Snacks","status":"Recommended"}]
Kitchen counter: [{"name":"Paper Towels","status":"Empty"},{"name":"Dish Soap","status":"Low"},{"name":"Coffee","status":"Missing"}]
Empty fridge shelf: [{"name":"Milk","status":"Missing"},{"name":"Eggs","status":"Missing"},{"name":"Fresh Vegetables","status":"Recommended"}]
Bedroom with laundry: [{"name":"Laundry Detergent","status":"Low"},{"name":"Dryer Sheets","status":"Missing"}]
Office desk: [{"name":"Pens","status":"Low"},{"name":"Sticky Notes","status":"Missing"},{"name":"Desk Organizer","status":"Recommended"}]
Well-stocked area: []

IMPORTANT: Be practical and helpful. Focus on what would genuinely be useful. Don't over-recommend.`,
                  },
                  {
                    inline_data: {
                      mime_type: "image/jpeg",
                      data: base64Image,
                    },
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("Gemini API response:", JSON.stringify(data, null, 2));
      
      // Handle rate limit errors
      if (data.error) {
        if (data.error.code === 429) {
          console.warn("Rate limit exceeded, skipping this analysis cycle");
          return; // Skip this cycle silently
        }
        throw new Error(data.error.message || "API error");
      }
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const text = data.candidates[0].content.parts[0].text;
        console.log("Gemini response text:", text);
        
        // Extract JSON from the response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          console.log("Extracted JSON:", jsonMatch[0]);
          const items = JSON.parse(jsonMatch[0]);
          console.log("Parsed items:", items);
          
          // Process items with status tracking to reduce flickering
          const currentTimestamp = Date.now();
          const history = itemHistoryRef.current;
          const timestamp = new Date().toLocaleTimeString();
          
          // Build confirmed items list from current detection
          const confirmedItems: DetectedItem[] = items.map((item: any) => ({
            name: item.name,
            status: item.status,
            timestamp
          }));
          
          // Update history for status tracking (used to smooth transitions)
          confirmedItems.forEach((item) => {
            const key = item.name;
            const existing = history.get(key);
            
            if (existing && existing.status === item.status) {
              // Same status detected again, increment count
              history.set(key, {
                status: item.status,
                count: existing.count + 1,
                lastSeen: currentTimestamp
              });
            } else {
              // New item or status changed
              history.set(key, {
                status: item.status,
                count: 1,
                lastSeen: currentTimestamp
              });
            }
          });
          
          // Clean up old items (not seen in last 30 seconds)
          const itemsToDelete: string[] = [];
          history.forEach((value, key) => {
            const stillDetected = confirmedItems.find(item => item.name === key);
            if (!stillDetected && currentTimestamp - value.lastSeen > 30000) {
              itemsToDelete.push(key);
            }
          });
          itemsToDelete.forEach(key => history.delete(key));
          
          console.log("Detected items:", confirmedItems);
          
          // Only update if there's a meaningful change
          const hasChanged = 
            confirmedItems.length !== detectedItems.length ||
            confirmedItems.some(item => {
              const existing = detectedItems.find(d => d.name === item.name);
              return !existing || existing.status !== item.status;
            });
          
          if (hasChanged) {
            setDetectedItems(confirmedItems);
            
            // Add to recent activities only for newly confirmed items
            if (confirmedItems.length > 0) {
              const newlyConfirmed = confirmedItems.filter(item => {
                const wasConfirmed = detectedItems.find(d => d.name === item.name && d.status === item.status);
                return !wasConfirmed;
              });
              
              if (newlyConfirmed.length > 0) {
                console.log("Adding to activities:", newlyConfirmed.length, "newly confirmed items");
                const newActivities = newlyConfirmed.map((item: DetectedItem) => ({
                  message: `${item.name} needs refilling (${item.status})`,
                  time: "Just now",
                }));
                
                setRecentActivities(prev => [...newActivities, ...prev].slice(0, 15));
              }
            } else if (detectedItems.length > 0) {
              // All items cleared
              const noItemsActivity = {
                message: "All household items adequately stocked",
                time: "Just now",
              };
              setRecentActivities(prev => [noItemsActivity, ...prev].slice(0, 15));
            }
          }
        }
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      throw error;
    }
  };

  const captureAndAnalyze = async (silent: boolean = false) => {
    setIsAnalyzing(true);
    
    if (uploadedImage) {
      console.log("Analyzing uploaded image...");
      try {
        const base64Image = uploadedImage.split(",")[1];
        console.log("Base64 length:", base64Image.length);
        await analyzeImageWithGemini(base64Image);
      } catch (error) {
        console.error("Error analyzing uploaded image:", error);
        if (!silent) {
          alert("Error analyzing image. Please try again.");
        }
      } finally {
        setIsAnalyzing(false);
      }
      return;
    }
    
    if (!videoRef.current || !canvasRef.current) {
      setIsAnalyzing(false);
      return;
    }

    // Capture frame from video
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    // Make sure video has loaded
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      setIsAnalyzing(false);
      return;
    }
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) {
      setIsAnalyzing(false);
      return;
    }
    
    ctx.drawImage(video, 0, 0);
    
    // Convert canvas to base64
    const imageData = canvas.toDataURL("image/jpeg", 0.8);
    const base64Image = imageData.split(",")[1];

    try {
      await analyzeImageWithGemini(base64Image);
    } catch (error) {
      console.error("Error analyzing image:", error);
      if (!silent) {
        alert("Error analyzing image. Please try again.");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Camera View - Left/Center */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-display font-bold text-foreground">
                Smart Home Vision System
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                AI-powered depletion detection for autonomous commerce
              </p>
            </div>
            <div className="flex gap-2">
              {!isActive && !uploadedImage ? (
                <>
                  <button
                    onClick={startCamera}
                    className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-semibold"
                  >
                    Start Camera
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                  >
                    Upload Image
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </>
              ) : (
                <>
                  <button
                    onClick={() => setAutoAnalyze(!autoAnalyze)}
                    className={`px-4 py-2 rounded-lg transition-colors font-semibold ${
                      autoAnalyze 
                        ? 'bg-accent text-white hover:bg-accent/90' 
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    {autoAnalyze ? "Auto-Analyze: ON" : "Auto-Analyze: OFF"}
                  </button>
                  <button
                    onClick={() => captureAndAnalyze(false)}
                    disabled={isAnalyzing}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Now"}
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                  >
                    Stop
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Video/Image Display */}
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="Uploaded"
                className="w-full h-full object-contain"
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            )}
            {(isActive || uploadedImage) && (
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm border border-accent/30">
                  <div className={`w-2 h-2 rounded-full bg-white ${isAnalyzing ? 'animate-pulse' : ''}`}></div>
                  <span className="text-xs font-semibold text-white">
                    {uploadedImage ? "Image Loaded" : isAnalyzing ? "Analyzing..." : autoAnalyze ? "Auto-Detection Active" : "Vision Active"}
                  </span>
                </div>
              </div>
            )}
            {!isActive && !uploadedImage && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Start camera or upload an image</p>
                  <p className="text-xs text-muted-foreground">AI will detect depleted household essentials</p>
                </div>
              </div>
            )}
          </div>

          {/* Hidden canvas for capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Detected Items */}
        {detectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h3 className="text-lg font-display font-bold text-foreground mb-4">
              Items Needing Replenishment
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Detected household essentials running low or depleted
            </p>
            <div className="space-y-3">
              {detectedItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border"
                >
                  <div>
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status.toLowerCase() === "low"
                        ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
                        : item.status.toLowerCase() === "empty"
                        ? "bg-red-500/20 text-red-500 border border-red-500/30"
                        : "bg-green-500/20 text-green-500 border border-green-500/30"
                    }`}
                  >
                    {item.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Recent Activity - Right Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-card border border-border rounded-xl p-6 sticky top-6">
          <h3 className="text-lg font-display font-bold text-foreground mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivities.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No activity yet. Start analyzing to see detections here.
              </p>
            ) : (
              <AnimatePresence>
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pb-3 border-b border-border last:border-0"
                  >
                    <p className="text-sm text-foreground font-medium mb-1">
                      {activity.message}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camera;
