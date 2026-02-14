import { motion } from "framer-motion";
import { Camera, ShoppingCart, Smartphone, Shield, TrendingUp, Zap } from "lucide-react";

const features = [
  { 
    icon: Camera, 
    title: "Ambient AI Vision", 
    desc: "Computer vision cameras observe your daily routines—like washing dishes without soap—and identify when essentials are running low without being intrusive.",
    color: "primary",
    visual: (
      <div className="relative w-full h-full min-h-[180px] bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 flex items-center justify-center">
        <div className="space-y-3 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-xs font-semibold text-primary">Live Detection</span>
            </div>
            <Camera className="text-primary/50" size={20} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square rounded-lg bg-card border border-border flex items-center justify-center text-2xl">
              🧼
            </div>
            <div className="aspect-square rounded-lg bg-card border border-border flex items-center justify-center text-2xl opacity-60">
              🍳
            </div>
            <div className="aspect-square rounded-lg bg-card border border-border flex items-center justify-center text-2xl opacity-40">
              ☕
            </div>
          </div>
          <div className="flex items-center justify-between px-3 py-2 bg-card rounded-lg border border-primary/30">
            <span className="text-xs text-muted-foreground">Confidence</span>
            <span className="text-xs font-bold text-primary">98.5%</span>
          </div>
        </div>
      </div>
    )
  },
  { 
    icon: ShoppingCart, 
    title: "Predictive Reordering", 
    desc: "Machine learning algorithms analyze consumption patterns and automatically trigger Visa payments to reorder products before you run out.",
    color: "accent",
    visual: (
      <div className="relative w-full h-full min-h-[180px] bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-4 flex items-center justify-center">
        <div className="space-y-3 w-full">
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30">
              <TrendingUp size={12} className="text-accent" />
              <span className="text-xs font-semibold text-accent">Smart Analytics</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-xs">📊</div>
              <div className="flex-1 h-2 bg-card rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "75%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                ></motion.div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-xs">🎯</div>
              <div className="flex-1 h-2 bg-card rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "90%" }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                ></motion.div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-xs">⚡</div>
              <div className="flex-1 h-2 bg-card rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  { 
    icon: Smartphone, 
    title: "Mobile Control Center", 
    desc: "Set spending limits, approve purchases, view order history, and manage product preferences through an intuitive mobile app.",
    color: "primary",
    visual: (
      <div className="relative w-full h-full min-h-[180px] bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 flex items-center justify-center">
        <div className="w-32 h-48 bg-card rounded-2xl border-2 border-border shadow-xl p-2 flex flex-col">
          <div className="flex-1 bg-background/50 rounded-xl p-2 space-y-1">
            <div className="h-2 w-3/4 bg-primary/30 rounded"></div>
            <div className="h-2 w-1/2 bg-primary/20 rounded"></div>
            <div className="mt-2 space-y-1">
              <div className="h-8 bg-primary/10 rounded flex items-center justify-between px-2">
                <div className="w-4 h-4 rounded bg-primary/30"></div>
                <div className="h-1 w-8 bg-primary/30 rounded"></div>
              </div>
              <div className="h-8 bg-accent/10 rounded flex items-center justify-between px-2">
                <div className="w-4 h-4 rounded bg-accent/30"></div>
                <div className="h-1 w-8 bg-accent/30 rounded"></div>
              </div>
            </div>
          </div>
          <div className="h-1 w-8 mx-auto mt-1 bg-border rounded-full"></div>
        </div>
      </div>
    )
  },
  { 
    icon: Shield, 
    title: "Visa Fraud Protection", 
    desc: "Enterprise-grade Visa security with real-time fraud detection ensures every autonomous transaction is protected with bank-level safeguards.",
    color: "success",
    visual: (
      <div className="relative w-full h-full min-h-[180px] bg-gradient-to-br from-success/10 to-success/5 rounded-lg p-4 flex items-center justify-center">
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 mx-auto mb-3 rounded-xl bg-gradient-to-br from-success/30 to-success/10 border-2 border-success/30 flex items-center justify-center"
          >
            <Shield className="text-success" size={40} />
          </motion.div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-3 py-1.5 bg-card rounded-lg border border-success/30">
              <span className="text-xs text-muted-foreground">Security</span>
              <span className="text-xs font-bold text-success">✓ Active</span>
            </div>
            <div className="flex items-center justify-between px-3 py-1.5 bg-card rounded-lg border border-success/30">
              <span className="text-xs text-muted-foreground">Encryption</span>
              <span className="text-xs font-bold text-success">256-bit</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  { 
    icon: TrendingUp, 
    title: "Smart Budget Analytics", 
    desc: "Track household spending patterns, get insights on consumption habits, and receive recommendations to optimize recurring purchases.",
    color: "accent",
    visual: (
      <div className="relative w-full h-full min-h-[180px] bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-4 flex items-center justify-center">
        <div className="w-full space-y-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">$247</div>
            <div className="text-xs text-muted-foreground">This Month</div>
          </div>
          <div className="flex items-end justify-between h-20 gap-1">
            {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-1 bg-gradient-to-t from-accent to-primary rounded-t"
              ></motion.div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">Spending</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="text-muted-foreground">Budget</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  { 
    icon: Zap, 
    title: "Instant Activation", 
    desc: "Set up in minutes with existing Visa cards. No complex integrations—our AI adapts to your home and learns your preferences automatically.",
    color: "primary",
    visual: (
      <div className="relative w-full h-full min-h-[180px] bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 flex items-center justify-center">
        <div className="space-y-3 w-full">
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 border-2 border-accent/30 mb-2"
            >
              <Zap className="text-accent" size={32} />
            </motion.div>
            <div className="text-sm font-bold text-accent">5 minutes</div>
            <div className="text-xs text-muted-foreground">Setup Time</div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 text-center py-2 rounded-lg bg-success/20 border border-success/30">
              <div className="text-lg font-bold text-success">✓</div>
              <div className="text-xs text-muted-foreground">Link Card</div>
            </div>
            <div className="flex-1 text-center py-2 rounded-lg bg-success/20 border border-success/30">
              <div className="text-lg font-bold text-success">✓</div>
              <div className="text-xs text-muted-foreground">Set Limits</div>
            </div>
            <div className="flex-1 text-center py-2 rounded-lg bg-primary/20 border border-primary/30">
              <div className="text-lg font-bold text-primary">→</div>
              <div className="text-xs text-muted-foreground">Done</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

const Features = () => (
  <section id="features" className="py-24 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
    <div className="mx-auto max-w-7xl px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <span className="text-primary font-semibold text-sm">Features</span>
        </div>
        <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
          Powerful Features for <br/>
          <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Behavior-Driven Commerce
          </span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need for autonomous, secure, and intelligent home shopping powered by Visa's trusted infrastructure.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
          >
            {/* Visual Preview */}
            <div className="relative overflow-hidden">
              {f.visual}
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:scale-110">
                  <f.icon size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-20 grid gap-6 sm:grid-cols-3"
      >
        <div className="relative group p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground font-medium">Detection Accuracy</div>
            <div className="mt-2 text-xs text-muted-foreground/70">Powered by advanced computer vision</div>
          </div>
        </div>
        <div className="relative group p-8 rounded-xl bg-card border border-border hover:border-accent/30 transition-all overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">3 Days</div>
            <div className="text-sm text-muted-foreground font-medium">Average Prediction Window</div>
            <div className="mt-2 text-xs text-muted-foreground/70">Never run out of essentials</div>
          </div>
        </div>
        <div className="relative group p-8 rounded-xl bg-card border border-border hover:border-success/30 transition-all overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">$0</div>
            <div className="text-sm text-muted-foreground font-medium">Setup Fees</div>
            <div className="mt-2 text-xs text-muted-foreground/70">Start with your existing Visa card</div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Features;
