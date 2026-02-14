import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HomeIcon, ActivityIcon, DeviceIcon, SettingsIcon, HelpIcon,
  CheckIcon, XIcon, UserIcon, ArrowRightIcon, MenuIcon,
} from "@/components/icons";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

// --- Sidebar ---
const sidebarItems = [
  { icon: HomeIcon, label: "Dashboard", path: "/dashboard" },
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

// --- Spending Chart Data ---
const chartData = [
  { day: "Mon", amount: 12 },
  { day: "Tue", amount: 28 },
  { day: "Wed", amount: 8 },
  { day: "Thu", amount: 45 },
  { day: "Fri", amount: 22 },
  { day: "Sat", amount: 35 },
  { day: "Sun", amount: 15 },
];

// --- Activity items ---
const activityItems = [
  { time: "2 min ago", text: "Detected low dish soap in kitchen", status: "pending" },
  { time: "1 hr ago", text: "Paper towels auto-ordered", status: "approved" },
  { time: "3 hr ago", text: "Laundry detergent approved", status: "approved" },
  { time: "5 hr ago", text: "Coffee pods suggestion declined", status: "declined" },
  { time: "Yesterday", text: "Weekly grocery order completed", status: "approved" },
];

// --- Purchase items ---
const purchaseItems = [
  { name: "Dish Soap", brand: "Dawn Ultra", price: 4.99, confidence: 94 },
  { name: "Paper Towels", brand: "Bounty Select", price: 12.49, confidence: 87 },
  { name: "Laundry Pods", brand: "Tide Original", price: 18.99, confidence: 91 },
  { name: "Hand Soap", brand: "Method Gel", price: 3.99, confidence: 78 },
];

// --- Main Dashboard ---
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [budget, setBudget] = useState([200]);
  const [autoApprove, setAutoApprove] = useState(true);
  const [autoThreshold, setAutoThreshold] = useState([15]);
  const [purchases, setPurchases] = useState(purchaseItems);

  const handleApprove = (name: string) => {
    setPurchases((prev) => prev.filter((p) => p.name !== name));
  };

  const handleDecline = (name: string) => {
    setPurchases((prev) => prev.filter((p) => p.name !== name));
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border px-6">
          <div>
            <h1 className="font-display text-xl font-semibold text-foreground">Dashboard</h1>
            <p className="text-xs text-muted-foreground">Welcome back, Alex</p>
          </div>
          <Link
            to="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to site
          </Link>
        </header>

        <div className="p-6 space-y-6">
          {/* Top Stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Monthly Spend", value: "$142.30", sub: "of $200 budget" },
              { label: "Items Ordered", value: "23", sub: "this month" },
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
                {activityItems.map((item, i) => (
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
                ))}
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
                  onClick={() => setPurchases([])}
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
