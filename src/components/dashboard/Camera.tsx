import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DetectedItem {
  name: string;
  status: string;
  timestamp: string;
  price?: number;
  brand?: string;
}

interface Activity {
  message: string;
  time: string;
}

// Expected items by household area


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

  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

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

  const analyzeImageWithOpenAI = async (base64Image: string) => {
    try {
      // Call OpenAI API - using GPT-4 Vision
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: `You are an AI shopping assistant analyzing images to detect household items that need restocking.

Analyze this image and identify items that appear to be missing, low in stock, or could be recommended for purchase.

For each item you identify, provide:
- name: The item name
- brand: A suggested brand (e.g., "Bounty", "Tide", "Charmin")  
- price: Estimated price in dollars
- status: One of "Missing", "Low", or "Needed"

Only recommend items if you have reasonable confidence they would be useful for the area / space based on its sorrounding but make sure ur atleast returning ATLEAST one thing AT ALL TIMES.

Return your response as a JSON array of objects. Example:
[
  {"name": "Paper Towels", "brand": "Bounty Select-A-Size", "price": 8.99, "status": "Low"},
  {"name": "Dish Soap", "brand": "Dawn Ultra", "price": 4.99, "status": "Missing"}
]

If no items are detected, return an empty array: []`
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: `data:image/jpeg;base64,${base64Image}`
                    }
                  }
                ]
              }
            ],
            max_tokens: 500
          }),
        }
      );

      const data = await response.json();
      console.log("OpenAI API response:", JSON.stringify(data, null, 2));
      
      // Handle rate limit errors
      if (data.error) {
        if (data.error.code === 'rate_limit_exceeded') {
          console.warn("Rate limit exceeded, skipping this analysis cycle");
          return; // Skip this cycle silently
        }
        throw new Error(data.error.message || "API error");
      }
      
      if (data.choices && data.choices[0]?.message?.content) {
        const text = data.choices[0].message.content;
        console.log("OpenAI response text:", text);
        
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
            timestamp,
            price: item.price || 0,
            brand: item.brand || "Generic"
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
          
          // Stack new items with existing ones (no duplicates based on name)
          if (confirmedItems.length > 0) {
            setDetectedItems(prev => {
              // Filter out duplicates - keep existing items that aren't in new detections
              const existingUnique = prev.filter(existing => 
                !confirmedItems.some(newItem => newItem.name === existing.name)
              );
              // Add new items to the top of the stack
              return [...confirmedItems, ...existingUnique];
            });
            
            // Save to localStorage for Dashboard access
            const existingPurchases = JSON.parse(localStorage.getItem('pendingPurchases') || '[]');
            const newPurchases = confirmedItems.filter(item => {
              return !existingPurchases.some((p: any) => p.name === item.name);
            }).map(item => ({
              ...item,
              confidence: Math.floor(Math.random() * (100 - 70 + 1)) + 70 // Random confidence 70-100
            }));
            
            if (newPurchases.length > 0) {
              localStorage.setItem('pendingPurchases', JSON.stringify([...newPurchases, ...existingPurchases]));
              
              // Add to recent activities only for brand new items (not duplicates)
              console.log("Adding to activities:", newPurchases.length, "new items");
              const newActivities = newPurchases.map((item: DetectedItem) => ({
                message: `${item.name} detected - ${item.status}`,
                time: "Just now",
              }));
              
              setRecentActivities(prev => [...newActivities, ...prev].slice(0, 15));
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
        await analyzeImageWithOpenAI(base64Image);
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
      await analyzeImageWithOpenAI(base64Image);
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
              Detected Items
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              AI-detected items sent to Dashboard for review
            </p>
            <div className="space-y-3">
              {detectedItems.map((item, index) => (
                <motion.div
                  key={`${item.name}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm font-bold text-primary">${item.price?.toFixed(2)}</p>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          item.status.toLowerCase() === "low"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : item.status.toLowerCase() === "empty"
                            ? "bg-red-500/20 text-red-500"
                            : item.status.toLowerCase() === "missing"
                            ? "bg-orange-500/20 text-orange-500"
                            : "bg-blue-500/20 text-blue-500"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 text-xs text-muted-foreground">
                    → Dashboard
                  </div>
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
