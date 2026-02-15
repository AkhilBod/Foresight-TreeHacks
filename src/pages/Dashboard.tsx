import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HomeIcon, ActivityIcon, DeviceIcon, SettingsIcon, HelpIcon,
  CheckIcon, XIcon, UserIcon, ArrowRightIcon, MenuIcon, CameraIcon,
} from "@/components/icons";
import Camera from "@/components/dashboard/Camera";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { addToAmazonCart } from "@/lib/browserbase";

// --- Sidebar ---
const sidebarItems = [
  { icon: HomeIcon, label: "Dashboard", path: "/dashboard" },
  { icon: CameraIcon, label: "Camera", path: "/dashboard/camera" },
  { icon: ActivityIcon, label: "Activity", path: "/dashboard/activity" },
  { icon: DeviceIcon, label: "Devices", path: "/dashboard/devices" },
  { icon: SettingsIcon, label: "Settings", path: "/dashboard/settings" },
  { icon: HelpIcon, label: "Support", path: "/dashboard/support" },
];

const Sidebar = ({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) => {
  const location = useLocation();

  return (
    <aside
      className={`flex flex-col border-r border-border bg-sidebar transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <Link to="/" className="font-display text-lg font-bold text-primary">
            Foresight
          </Link>
        )}
        <button onClick={onToggle} className="text-muted-foreground hover:text-foreground">
          <MenuIcon size={18} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {sidebarItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-sidebar-accent text-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-elevated text-muted-foreground">
            <UserIcon size={16} />
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium text-foreground">Alex Chen</p>
              <p className="text-xs text-muted-foreground">Premium</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

// --- Activity items ---
interface ActivityItem {
  time: string;
  text: string;
  status: "pending" | "approved" | "declined";
  timestamp: number;
}

// --- Purchase items ---
const purchaseItems = [
  { name: "Dish Soap", brand: "Dawn Ultra", price: 4.99, confidence: 94 },
  { name: "Paper Towels", brand: "Bounty Select", price: 12.49, confidence: 87 },
  { name: "Laundry Pods", brand: "Tide Original", price: 18.99, confidence: 91 },
  { name: "Hand Soap", brand: "Method Gel", price: 3.99, confidence: 78 },
];

// --- Main Dashboard ---
const Dashboard = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [budget, setBudget] = useState([200]);
  const [autoApprove, setAutoApprove] = useState(true);
  const [autoThreshold, setAutoThreshold] = useState([15]);
  const [purchases, setPurchases] = useState(purchaseItems);
  const [activityItems, setActivityItems] = useState<ActivityItem[]>([]);
  const [buyingItem, setBuyingItem] = useState<string | null>(null);
  const [buyingStage, setBuyingStage] = useState<'amazon' | 'visa' | null>(null);
  const [liveViewUrl, setLiveViewUrl] = useState<string | null>(null);
  const [monthlySpend, setMonthlySpend] = useState(142.30);
  const [itemsOrdered, setItemsOrdered] = useState(23);
  const [chartData, setChartData] = useState([
    { day: "Mon", amount: 12 },
    { day: "Tue", amount: 28 },
    { day: "Wed", amount: 8 },
    { day: "Thu", amount: 45 },
    { day: "Fri", amount: 22 },
    { day: "Sat", amount: 35 },
    { day: "Sun", amount: 15 },
  ]);

  // Helper to format relative time
  const getRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  // Track which items we've already added to activity to prevent duplicates
  const seenItemsRef = useRef<Set<string>>(new Set());

  // Load purchases from localStorage
  useEffect(() => {
    const loadPurchases = () => {
      const stored = localStorage.getItem('pendingPurchases');
      if (stored) {
        try {
          const items = JSON.parse(stored);
          setPurchases(items);
          
          // Add new detections to activity feed (only if not seen before)
          items.forEach((item: any) => {
            const itemKey = `${item.name}-${item.status}-${item.timestamp}`;
            
            // Only add if we haven't seen this exact detection before
            if (!seenItemsRef.current.has(itemKey)) {
              seenItemsRef.current.add(itemKey);
              
              setActivityItems(prev => {
                // Format status text: "Low" stays as "Low", "Missing/Empty" become "Missing"
                const statusText = item.status === "Low" ? "Low" : "Missing";
                const newActivity: ActivityItem = {
                  time: getRelativeTime(item.timestamp),
                  text: `${item.name} - ${statusText}`,
                  status: "pending",
                  timestamp: item.timestamp
                };
                return [newActivity, ...prev].slice(0, 10); // Keep last 10
              });
            }
          });
        } catch (e) {
          console.error('Error loading purchases:', e);
        }
      }
    };
    
    loadPurchases();
    
    // Poll for updates every second
    const interval = setInterval(loadPurchases, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update activity timestamps every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setActivityItems(prev => 
        prev.map(item => ({
          ...item,
          time: getRelativeTime(item.timestamp)
        }))
      );
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleApprove = async (name: string) => {
    // Get the item details before removing it
    const item = purchases.find(p => p.name === name);
    if (!item) return;
    
    const itemPrice = item.price || 0;
    const itemBrand = item.brand || '';
    
    // Start buying process - show live view
    setBuyingItem(name);
    setBuyingStage('amazon');
    setLiveViewUrl(null);
    
    try {
      // Trigger Browserbase automation and get live view URL
      console.log(`Initiating Browserbase automation for ${name}...`);
      const result = await addToAmazonCart(name, itemBrand);
      if (result.liveViewUrl) {
        setLiveViewUrl(result.liveViewUrl);
        console.log('Live view URL received:', result.liveViewUrl);
      }
    } catch (error) {
      console.error('Browserbase automation failed:', error);
    }
    
    // After 15 seconds (enough time for automation), complete the purchase
    setTimeout(() => {
      setBuyingItem(null);
      setBuyingStage(null);
      setLiveViewUrl(null);
      
      // Update stats
      setMonthlySpend(prev => Math.round((prev + itemPrice) * 100) / 100);
      setItemsOrdered(prev => prev + 1);
      
      // Update today's spending in chart (Sunday)
      setChartData(prev => {
        const updated = [...prev];
        updated[6] = { ...updated[6], amount: updated[6].amount + itemPrice };
        return updated;
      });
      
      // Add to activity
      setActivityItems(prev => [{
        time: "Just now",
        text: `${name} approved & added to Amazon cart`,
        status: "approved" as const,
        timestamp: Date.now()
      }, ...prev].slice(0, 10));
      
      setPurchases((prev) => {
        const updated = prev.filter((p) => p.name !== name);
        localStorage.setItem('pendingPurchases', JSON.stringify(updated));
        return updated;
      });
    }, 20000);
  };

  const handleDecline = (name: string) => {
    // Add to activity
    setActivityItems(prev => [{
      time: "Just now",
      text: `${name} suggestion declined`,
      status: "declined" as const,
      timestamp: Date.now()
    }, ...prev].slice(0, 10));
    
    setPurchases((prev) => {
      const updated = prev.filter((p) => p.name !== name);
      localStorage.setItem('pendingPurchases', JSON.stringify(updated));
      return updated;
    });
  };

  const handleApproveAll = () => {
    // Calculate total price of all purchases
    const totalPrice = purchases.reduce((sum, p) => sum + (p.price || 0), 0);
    const itemCount = purchases.length;
    
    // Update stats
    setMonthlySpend(prev => Math.round((prev + totalPrice) * 100) / 100);
    setItemsOrdered(prev => prev + itemCount);
    
    // Update today's spending in chart (Sunday)
    setChartData(prev => {
      const updated = [...prev];
      updated[6] = { ...updated[6], amount: updated[6].amount + totalPrice };
      return updated;
    });
    
    // Add to activity
    setActivityItems(prev => [{
      time: "Just now",
      text: `Approved ${itemCount} items`,
      status: "approved" as const,
      timestamp: Date.now()
    }, ...prev].slice(0, 10));
    
    setPurchases([]);
    localStorage.setItem('pendingPurchases', JSON.stringify([]));
  };

  // Check if we're on the camera page
  const isCameraPage = location.pathname === "/dashboard/camera";

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border px-6">
          <div>
            <h1 className="font-display text-xl font-semibold text-foreground">
              {isCameraPage ? "Camera" : "Dashboard"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {isCameraPage ? "AI Vision Detection System" : "Welcome back, Alex"}
            </p>
          </div>
          <Link
            to="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to site
          </Link>
        </header>

        <div className="p-6 space-y-6">
          {/* Conditionally render Camera or Dashboard content */}
          {isCameraPage ? (
            <Camera />
          ) : (
            <>
              {/* Top Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Monthly Spend", value: `$${monthlySpend.toFixed(2)}`, sub: `of $${budget[0]} budget` },
              { label: "Items Ordered", value: String(itemsOrdered), sub: "this month" },
              { label: "Pending", value: String(purchases.length), sub: "items to review" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-border bg-card p-5"
              >
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="mt-1 font-display text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Spending Chart */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 rounded-xl border border-border bg-card p-5"
            >
              <h2 className="font-display text-sm font-semibold text-foreground mb-4">Weekly Spending</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 14%)" />
                  <XAxis dataKey="day" tick={{ fill: "hsl(220 10% 50%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(220 10% 50%)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(220 18% 7%)",
                      border: "1px solid hsl(220 15% 14%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`$${value}`, "Spent"]}
                  />
                  <Bar dataKey="amount" fill="hsl(42 55% 55%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h2 className="font-display text-sm font-semibold text-foreground mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {activityItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4 text-center">No recent activity</p>
                ) : (
                  activityItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                          item.status === "approved"
                            ? "bg-success"
                            : item.status === "pending"
                            ? "bg-primary"
                            : "bg-destructive"
                        }`}
                      />
                      <div>
                        <p className="text-sm text-foreground">{item.text}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Purchase Approval */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-sm font-semibold text-foreground">Purchase Approval</h2>
              {purchases.length > 1 && (
                <button
                  onClick={handleApproveAll}
                  className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                >
                  Approve All
                  <ArrowRightIcon size={12} />
                </button>
              )}
            </div>
            {purchases.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">No pending purchases</p>
            ) : (
              <div className="space-y-2">
                {purchases.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-lg border border-border bg-surface p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.brand}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">${item.price.toFixed(2)}</p>
                        <p className="text-xs text-primary">{item.confidence}% confidence</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(item.name)}
                          className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 text-primary hover:bg-primary/25 transition-colors"
                        >
                          <CheckIcon size={16} />
                        </button>
                        <button
                          onClick={() => handleDecline(item.name)}
                          className="flex h-8 w-8 items-center justify-center rounded-md bg-destructive/15 text-destructive hover:bg-destructive/25 transition-colors"
                        >
                          <XIcon size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Spending Controls */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <h2 className="font-display text-sm font-semibold text-foreground mb-6">Spending Controls</h2>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-foreground">Monthly Budget</span>
                  <span className="text-sm font-semibold text-primary">${budget[0]}</span>
                </div>
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  max={500}
                  min={50}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">$50</span>
                  <span className="text-xs text-muted-foreground">$500</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-foreground">Auto-Approve Threshold</span>
                  <span className="text-sm font-semibold text-primary">${autoThreshold[0]}</span>
                </div>
                <Slider
                  value={autoThreshold}
                  onValueChange={setAutoThreshold}
                  max={50}
                  min={0}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">$0</span>
                  <span className="text-xs text-muted-foreground">$50</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-4 sm:col-span-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Auto-approve under threshold</p>
                  <p className="text-xs text-muted-foreground">
                    Items under ${autoThreshold[0]} will be automatically approved
                  </p>
                </div>
                <Switch checked={autoApprove} onCheckedChange={setAutoApprove} />
              </div>
            </div>
          </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Buying Modal - Live Browser View */}
      {buyingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-4xl h-[80vh] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#FF9900]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.045 18.02c.072-.116.187-.124.348-.022 2.344 1.47 4.882 2.208 7.6 2.208 2.636 0 5.175-.688 7.607-2.064.256-.144.468-.168.634-.072.168.096.168.264-.008.504-.96 1.32-2.82 2.4-5.58 3.24-2.76.84-5.16.84-7.2 0-2.04-.84-3.528-2.076-3.456-3.672l.055-.122zM12 5.88c-3.18 0-5.76 2.58-5.76 5.76s2.58 5.76 5.76 5.76 5.76-2.58 5.76-5.76S15.18 5.88 12 5.88z"/>
                  </svg>
                  <span className="text-sm font-semibold text-foreground">
                    AI Agent Shopping: {buyingItem}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold text-green-500">Live</span>
                </div>
                <button
                  onClick={() => {
                    setBuyingItem(null);
                    setBuyingStage(null);
                    setLiveViewUrl(null);
                  }}
                  className="p-1.5 rounded-lg hover:bg-surface-elevated transition-colors text-muted-foreground hover:text-foreground"
                >
                  <XIcon size={16} />
                </button>
              </div>
            </div>

            {/* Live Browser View */}
            <div className="flex-1 bg-black relative">
              {liveViewUrl ? (
                <iframe
                  src={liveViewUrl}
                  className="w-full h-full border-0"
                  sandbox="allow-same-origin allow-scripts"
                  allow="clipboard-read; clipboard-write"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-primary/30 rounded-full" />
                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                  <div className="text-center">
                    <p className="text-foreground font-semibold text-lg mb-1">
                      Connecting to AI Shopping Agent...
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Opening browser to purchase {buyingItem}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-border bg-card flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="m7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>Secured by Visa</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Powered by Browserbase
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
