import { motion } from "framer-motion";
import { CameraIcon, BrainIcon, CartIcon, CardIcon } from "@/components/icons";

const steps = [
  { icon: CameraIcon, title: "Observe", desc: "Ambient cameras detect your daily routines and track when essentials run low." },
  { icon: BrainIcon, title: "Analyze", desc: "AI processes usage patterns to predict exactly when you'll need a refill." },
  { icon: CartIcon, title: "Suggest", desc: "Smart recommendations appear in your dashboard with prices and confidence scores." },
  { icon: CardIcon, title: "Purchase", desc: "Approved items are securely purchased and delivered to your door automatically." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-surface">
    <div className="mx-auto max-w-7xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">How It Works</h2>
        <p className="mt-3 text-muted-foreground">Four simple steps from observation to delivery.</p>
      </motion.div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="group relative rounded-xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/30"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
              <step.icon size={28} />
            </div>
            <div className="mb-1 font-display text-xs font-semibold uppercase tracking-widest text-primary">
              Step {i + 1}
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
