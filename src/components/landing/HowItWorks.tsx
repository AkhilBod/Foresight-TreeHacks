import { motion } from "framer-motion";
import { CameraIcon, BrainIcon, CartIcon, CardIcon } from "@/components/icons";
import { ArrowRight } from "lucide-react";

const steps = [
  { 
    icon: CameraIcon, 
    title: "AI Vision Observes", 
    desc: "Ambient cameras detect you washing dishes without soap, or cooking without oil—identifying usage patterns non-intrusively.",
    example: "🧼 Dish soap: 85% empty",
    visual: (
      <div className="relative w-full h-48 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 flex items-center justify-center border border-primary/20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-xs font-semibold text-primary">Camera Active</span>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 bg-card/50 rounded-lg p-2 border border-border">
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-xs">🧼</div>
              <div className="text-left flex-1">
                <div className="text-xs font-semibold text-foreground">Dish Soap</div>
                <div className="text-xs text-muted-foreground">Dawn Ultra</div>
              </div>
              <div className="text-xs font-bold text-amber-500">15%</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  { 
    icon: BrainIcon, 
    title: "Predictive Analysis", 
    desc: "Machine learning models calculate when you'll run out based on historical usage, predicting 3-5 days before depletion.",
    example: "📊 Reorder in 3 days",
    visual: (
      <div className="relative w-full h-48 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-4 flex items-center justify-center border border-accent/20">
        <div className="w-full">
          <div className="text-center mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30">
              <span className="text-xs font-semibold text-accent">AI Processing</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="flex-1 h-2 bg-card rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent w-[75%]"></div>
              </div>
              <span className="text-muted-foreground font-mono">75%</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex-1 h-2 bg-card rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent w-[45%]"></div>
              </div>
              <span className="text-muted-foreground font-mono">45%</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex-1 h-2 bg-card rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-accent w-[90%]"></div>
              </div>
              <span className="text-muted-foreground font-mono">90%</span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <div className="inline-block px-3 py-1.5 rounded-lg bg-success/20 text-success text-xs font-semibold border border-success/30">
              Prediction: 3 days until depletion
            </div>
          </div>
        </div>
      </div>
    )
  },
  { 
    icon: CartIcon, 
    title: "Smart Notification", 
    desc: "You receive a mobile notification with product details, pricing, and the option to approve, modify, or reject the order.",
    example: "✅ Approve $12.99",
    visual: (
      <div className="relative w-full h-48 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 flex items-center justify-center border border-primary/20">
        <div className="w-full max-w-[200px] bg-card rounded-xl shadow-xl border border-border p-3">
          <div className="flex items-start gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-lg">🧼</div>
            <div className="flex-1">
              <div className="text-xs font-bold text-foreground">Dawn Dish Soap</div>
              <div className="text-xs text-muted-foreground">Ultra Concentrate</div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Price</span>
            <span className="text-sm font-bold text-foreground">$12.99</span>
          </div>
          <div className="flex gap-1.5">
            <button className="flex-1 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold">
              Approve
            </button>
            <button className="px-2 py-1.5 rounded-md border border-border text-xs">
              ✕
            </button>
          </div>
        </div>
      </div>
    )
  },
  { 
    icon: CardIcon, 
    title: "Visa Secure Payment", 
    desc: "Once approved, Visa processes the payment with fraud protection and the product is delivered to your door automatically.",
    example: "🔒 Visa secured",
    visual: (
      <div className="relative w-full h-48 bg-gradient-to-br from-success/10 to-success/5 rounded-lg p-4 flex items-center justify-center border border-success/20">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/20 border border-success/30">
            <div className="w-3 h-3 rounded-full bg-success flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
            <span className="text-xs font-bold text-success">Payment Secured</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between px-3 py-2 bg-card/50 rounded-lg border border-border">
              <span className="text-xs text-muted-foreground">Visa •••• 4242</span>
              <span className="text-xs font-bold text-success">✓</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-card/50 rounded-lg border border-border">
              <span className="text-xs text-muted-foreground">Fraud Check</span>
              <span className="text-xs font-bold text-success">✓</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-card/50 rounded-lg border border-border">
              <span className="text-xs text-muted-foreground">Order Placed</span>
              <span className="text-xs font-bold text-success">✓</span>
            </div>
          </div>
          
          <div className="inline-block px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-xs font-semibold border border-primary/30">
            🚚 Delivery: 2 days
          </div>
        </div>
      </div>
    )
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-surface relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background"></div>
    
    {/* Decorative Elements */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
    
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

      <div className="mt-20 space-y-24">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`flex flex-col lg:flex-row items-center gap-12 ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Visual Preview */}
            <div className="flex-1 w-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {step.visual}
                
                {/* Connecting Arrow (except for last item) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="text-primary/30 rotate-90" size={24} />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex-1 w-full">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary border border-primary/30">
                  <step.icon size={28} />
                </div>
                <div className="inline-block px-3 py-1.5 rounded-full bg-primary/10 font-display text-xs font-bold uppercase tracking-widest text-primary border border-primary/20">
                  Step {i + 1}
                </div>
              </div>
              
              <h3 className="font-display text-3xl font-bold text-foreground mb-4">
                {step.title}
              </h3>
              
              <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                {step.desc}
              </p>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent text-sm font-mono font-semibold border border-accent/20">
                <span>{step.example}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Use Case Example */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-24 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="relative max-w-3xl mx-auto text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Real-World Example</h3>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="text-sm font-bold text-primary">Mon</span>
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground leading-relaxed">
                  You're washing dishes and the camera notices you're not using dish soap.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center border border-accent/30">
                <span className="text-sm font-bold text-accent">Tue</span>
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground leading-relaxed">
                  The AI confirms the pattern and predicts you'll run out by Thursday.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="text-sm font-bold text-primary">Wed</span>
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground leading-relaxed">
                  You get a notification to approve reordering your preferred brand.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center border border-success/30">
                <span className="text-sm font-bold text-success">Thu</span>
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground leading-relaxed">
                  <span className="text-accent font-semibold">New dish soap arrives at your door</span> via Visa secure payment—before you even notice you ran out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HowItWorks;
