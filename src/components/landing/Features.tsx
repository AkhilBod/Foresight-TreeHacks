import { motion } from "framer-motion";
import { EyeIcon, SlidersIcon, RefreshIcon, ShieldIcon } from "@/components/icons";

const features = [
  { icon: EyeIcon, title: "AI Vision Detection", desc: "Ambient cameras powered by computer vision identify products and track usage levels in real time." },
  { icon: SlidersIcon, title: "Spending Controls", desc: "Set monthly budgets, per-category limits, and auto-approve thresholds that keep you in charge." },
  { icon: RefreshIcon, title: "Smart Reordering", desc: "Predictive algorithms learn your consumption patterns and reorder before you run out." },
  { icon: ShieldIcon, title: "Secure Payments", desc: "Enterprise-grade encryption and fraud protection ensure every transaction is safe." },
];

const Features = () => (
  <section id="features" className="py-24">
    <div className="mx-auto max-w-7xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Features</h2>
        <p className="mt-3 text-muted-foreground">Everything you need for autonomous, secure home commerce.</p>
      </motion.div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex gap-5 rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
              <f.icon size={24} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
