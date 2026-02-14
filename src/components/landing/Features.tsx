import { motion } from "framer-motion";
import { EyeIcon, SlidersIcon, RefreshIcon, ShieldIcon } from "@/components/icons";
import { Camera, ShoppingCart, Smartphone, Lock, TrendingUp, Zap } from "lucide-react";

const features = [
  { 
    icon: Camera, 
    title: "Ambient AI Vision", 
    desc: "Computer vision cameras observe your daily routines—like washing dishes without soap—and identify when essentials are running low without being intrusive.",
    color: "primary"
  },
  { 
    icon: ShoppingCart, 
    title: "Predictive Reordering", 
    desc: "Machine learning algorithms analyze consumption patterns and automatically trigger Visa payments to reorder products before you run out, seamlessly integrated with your preferred retailers.",
    color: "accent"
  },
  { 
    icon: Smartphone, 
    title: "Mobile Control Center", 
    desc: "Set spending limits, approve purchases, view order history, and manage product preferences through an intuitive mobile app—you're always in control.",
    color: "primary"
  },
  { 
    icon: ShieldIcon, 
    title: "Visa Fraud Protection", 
    desc: "Enterprise-grade Visa security with real-time fraud detection ensures every autonomous transaction is protected with the same safeguards as your credit card.",
    color: "success"
  },
  { 
    icon: TrendingUp, 
    title: "Smart Budget Analytics", 
    desc: "Track household spending patterns, get insights on consumption habits, and receive recommendations to optimize your recurring purchases and save money.",
    color: "accent"
  },
  { 
    icon: Zap, 
    title: "Instant Activation", 
    desc: "Set up in minutes with existing Visa cards. No complex integrations—our AI adapts to your home and learns your preferences automatically.",
    color: "primary"
  },
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
          Behavior-Driven Commerce
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
            className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary/20 group-hover:scale-110">
              <f.icon size={24} />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
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
        className="mt-20 grid gap-8 sm:grid-cols-3 text-center"
      >
        <div className="p-6 rounded-xl bg-card border border-border">
          <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">99.9%</div>
          <div className="mt-2 text-sm text-muted-foreground">Detection Accuracy</div>
        </div>
        <div className="p-6 rounded-xl bg-card border border-border">
          <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">3 Days</div>
          <div className="mt-2 text-sm text-muted-foreground">Average Prediction Window</div>
        </div>
        <div className="p-6 rounded-xl bg-card border border-border">
          <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">$0</div>
          <div className="mt-2 text-sm text-muted-foreground">Setup Fees</div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Features;
