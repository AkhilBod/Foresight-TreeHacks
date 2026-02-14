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
  const [isActive, setIsActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const GEMINI_API_KEY = "REMOVED_API_KEY";

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

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
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      // Call Gemini API - using Gemini 2.0 Flash
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
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
                    text: `You are a household item depletion detection AI for Visa Smart Home Commerce.

YOUR TASK: Analyze this image and identify items that are LOW, EMPTY, or MISSING from their expected location.

CRITICAL RULES:
1. Identify what area/fixture is visible (toilet, sink, shower, counter, etc.)
2. For THAT specific area, check if expected items are present and stocked
3. Flag items as Empty if they should be visible in their typical spot but aren't
4. Flag items as Low if visible containers are less than 25% full
5. ONLY check for items relevant to the visible fixture/area
6. DO NOT flag items for fixtures/areas that aren't visible in the image

CONTEXT-BASED DETECTION:

TOILET VISIBLE:
- Check for: Toilet Paper (on holder or nearby shelf)
- If toilet paper holder is empty or no toilet paper visible near toilet → Flag "Toilet Paper" as Empty
- Optionally check: Bathroom Cleaner (if storage area visible)

BATHROOM SINK VISIBLE:
- Check for: Hand Soap (dispenser or bottle at/near sink)
- If no soap visible at the sink → Flag "Hand Soap" as Empty
- If soap bottle is less than 25% full → Flag "Hand Soap" as Low

KITCHEN SINK VISIBLE:
- Check for: Dish Soap (at/near sink), Hand Soap (if sink area)
- If no dish soap visible → Flag "Dish Soap" as Empty
- Check for: Sponges (at sink area)

SHOWER/TUB VISIBLE:
- Check for: Shampoo, Conditioner, Body Wash (on caddy/shelf/ledge)
- If shower area is visible but item is missing → Flag as Empty
- If bottle is nearly empty → Flag as Low

KITCHEN COUNTER VISIBLE:
- Check for: Paper Towels (on holder), Cooking Oil (near stove)
- If paper towel holder is empty → Flag "Paper Towels" as Empty

DETECTION GUIDELINES:
✓ Toilet visible but NO toilet paper on holder or nearby → "Toilet Paper" Empty
✓ Sink visible but NO soap dispenser/bottle → "Hand Soap" Empty  
✓ Empty paper towel holder on counter → "Paper Towels" Empty
✓ Shower visible but no shampoo bottles → "Shampoo" Empty
✓ Visible bottle/container less than 25% full → Item "Low"

Return ONLY a JSON array. Examples:
Toilet visible, no toilet paper: [{"name":"Toilet Paper","status":"Empty"}]
Bathroom sink with no soap: [{"name":"Hand Soap","status":"Empty"}]
Kitchen sink with low dish soap bottle: [{"name":"Dish Soap","status":"Low"}]
Shower with no shampoo bottles: [{"name":"Shampoo","status":"Empty"}]
Toilet with toilet paper present: []

IMPORTANT: Only check for items that should be present in the VISIBLE fixture/area. If you see a toilet, check for toilet paper. If you see a shower, check for shower items. Do NOT check for shower items if only a toilet is visible.`,
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
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const text = data.candidates[0].content.parts[0].text;
        console.log("Gemini response text:", text);
        
        // Extract JSON from the response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          console.log("Extracted JSON:", jsonMatch[0]);
          const items = JSON.parse(jsonMatch[0]);
          console.log("Parsed items:", items);
          const timestamp = new Date().toLocaleTimeString();
          
          const formattedItems = items.map((item: any) => ({
            name: item.name,
            status: item.status,
            timestamp,
          }));
          
          console.log("Formatted items:", formattedItems);
          setDetectedItems(formattedItems);
          
          // Add to recent activities - all detected items should be low/empty based on our prompt
          if (formattedItems.length > 0) {
            console.log("Adding to activities:", formattedItems.length, "items");
            const newActivities = formattedItems.map((item: DetectedItem) => ({
              message: `${item.name} needs refilling (${item.status})`,
              time: "Just now",
            }));
            
            setRecentActivities(prev => [...newActivities, ...prev].slice(0, 15));
          } else {
            // No items need restocking
            const noItemsActivity = {
              message: "All household items adequately stocked",
              time: "Just now",
            };
            setRecentActivities(prev => [noItemsActivity, ...prev].slice(0, 15));
          }
        }
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      throw error;
    }
  };

  const captureAndAnalyze = async () => {
    setIsAnalyzing(true);
    
    if (uploadedImage) {
      console.log("Analyzing uploaded image...");
      try {
        const base64Image = uploadedImage.split(",")[1];
        console.log("Base64 length:", base64Image.length);
        await analyzeImageWithGemini(base64Image);
      } catch (error) {
        console.error("Error analyzing uploaded image:", error);
        alert("Error analyzing image. Please try again.");
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
      alert("Error analyzing image. Please try again.");
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
                    onClick={captureAndAnalyze}
                    disabled={isAnalyzing}
                    className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? "Detecting Depletion..." : "Detect Items"}
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
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  <span className="text-xs font-semibold text-white">
                    {uploadedImage ? "Image Loaded" : "Vision Active"}
                  </span>
                </div>
              </div>
            )}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white font-semibold">Detecting depletion patterns...</p>
                  <p className="text-white/70 text-sm mt-2">Powered by Gemini 2.0</p>
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
