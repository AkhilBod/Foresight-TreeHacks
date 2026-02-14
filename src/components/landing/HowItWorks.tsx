import { motion } from "framer-motion";
import { CameraIcon, BrainIcon, CartIcon, CardIcon } from "@/components/icons";

const steps = [
  { 
    icon: CameraIcon, 
    title: "AI Vision Observes", 
    desc: "Ambient cameras detect you washing dishes without soap, or cooking without oil—identifying usage patterns non-intrusively.",
    example: "🧼 Dish soap: 85% empty"
  },
  { 
    icon: BrainIcon, 
    title: "Predictive Analysis", 
    desc: "Machine learning models calculate when you'll run out based on historical usage, predicting 3-5 days before depletion.",
    example: "📊 Reorder in 3 days"
  },
  { 
    icon: CartIcon, 
    title: "Smart Notification", 
    desc: "You receive a mobile notification with product details, pricing, and the option to approve, modify, or reject the order.",
    example: "✅ Approve $12.99"
  },
  { 
    icon: CardIcon, 
    title: "Visa Secure Payment", 
    desc: "Once approved, Visa processes the payment with fraud protection and the product is delivered to your door automatically.",
    example: "🔒 Visa secured"
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-surface relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background"></div>
    <div className="mx-auto max-w-7xl px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <span className="text-primary font-semibold text-sm">How It Works</span>
        </div>
        <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
          From Detection to Delivery
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Seamless autonomous shopping in four intelligent steps, powered by AI vision and Visa's secure payment infrastructure.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
        {/* Connection Lines */}
        <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="group relative rounded-xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary transition-all group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 border border-primary/30">
              <step.icon size={32} />
            </div>
            <div className="mb-2 inline-block px-3 py-1 rounded-full bg-primary/10 font-display text-xs font-bold uppercase tracking-widest text-primary">
              Step {i + 1}
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-3">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground mb-4">{step.desc}</p>
            <div className="inline-block px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-mono font-semibold border border-accent/20">
              {step.example}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Use Case Example */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/30"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-display text-2xl font-bold text-foreground mb-4">Real-World Example</h3>
          <p className="text-muted-foreground leading-relaxed">
            <span className="text-foreground font-semibold">Monday Morning:</span> You're washing dishes and the camera notices you're not using dish soap. 
            <span className="text-foreground font-semibold"> Tuesday:</span> The AI confirms the pattern and predicts you'll run out by Thursday. 
            <span className="text-foreground font-semibold"> Wednesday:</span> You get a notification to approve reordering your preferred brand. 
            <span className="text-accent font-semibold"> Thursday:</span> New dish soap arrives at your door via Visa secure payment—before you even notice you ran out.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HowItWorks;
