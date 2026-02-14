import { motion } from "framer-motion";

const steps = [
  { 
    title: "AI Vision Observes", 
    desc: "Ambient cameras detect you washing dishes without soap, or cooking without oil—identifying usage patterns non-intrusively.",
    example: "Dish soap: 15% empty",
    visual: (
      <div className="relative max-w-md mx-auto h-96 bg-gradient-to-br from-accent/10 to-muted/5 rounded-lg overflow-hidden border border-accent/20 flex items-center justify-center">
        <img 
          src="https://i.ibb.co/8nWqdg74/image.png" 
          alt="Dawn Dish Soap Detection" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute top-3 left-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm border border-accent/30">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span className="text-xs font-semibold text-white">Camera Active</span>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-3 bg-card/95 backdrop-blur-sm rounded-lg p-3 border border-accent/30">
            <div className="text-left flex-1">
              <div className="text-xs font-semibold text-foreground">Dish Soap</div>
              <div className="text-xs text-muted-foreground">Green Soap</div>
            </div>
            <div className="text-sm font-bold text-accent">Not Low</div>
          </div>
        </div>
      </div>
    )
  },
  { 
    title: "Predictive Analysis", 
    desc: "Machine learning models calculate when you'll run out based on historical usage, predicting 3-5 days before depletion.",
    example: "Reorder in 8 days",
    visual: (
      <div className="relative w-full h-64 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-4 border border-accent/20">
        <div className="w-full h-full flex flex-col">
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 border border-accent/30">
              <span className="text-xs font-semibold text-accent">Usage Prediction</span>
            </div>
          </div>
          
          {/* Graph */}
          <div className="flex-1 relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-muted-foreground">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            
            {/* Chart area */}
            <div className="ml-10 mr-2 h-full pb-6 relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pb-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border-t border-border/30"></div>
                ))}
              </div>
              
              {/* Line chart */}
              <svg className="absolute inset-0 w-full h-full pb-6" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  d="M 0 0 L 10 8 L 20 18 L 30 25 L 40 38 L 50 48 L 60 58 L 70 68 L 80 80 L 90 88 L 100 100"
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.7"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="2"
                  fill="hsl(var(--accent))"
                  opacity="0.8"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.3 }}
                />
              </svg>
              
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                <span>Day 1</span>
                <span>Day 2</span>
                <span>Day 3</span>
                <span>Day 4</span>
                <span>Day 5</span>
                <span>Day 6</span>
                <span>Day 7</span>
                <span>Day 8</span>
                <span>Day 9</span>
                <span>Day 10</span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-2">
            <div className="inline-block px-3 py-1.5 rounded-lg bg-destructive/20 text-destructive text-xs font-semibold border border-destructive/30">
              Reorder Alert: 3 days
            </div>
          </div>
        </div>
      </div>
    )
  },
  { 
    title: "Smart Notification", 
    desc: "You receive a mobile notification with product details, pricing, and the option to approve, modify, or reject the order.",
    example: "Approve $12.99",
    visual: (
      <div className="relative w-full h-48 bg-gradient-to-br from-accent/10 to-muted/5 rounded-lg p-4 flex items-center justify-center border border-accent/20">
        <div className="w-full max-w-[200px] bg-card rounded-xl shadow-xl border border-border p-3">
          <div className="flex items-start gap-2 mb-3">
            <div className="flex-1">
              <div className="text-xs font-bold text-foreground">Green Soap</div>
              <div className="text-xs text-muted-foreground">Ultra Concentrate</div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground">Price</span>
            <span className="text-sm font-bold text-foreground">$12.99</span>
          </div>
          <div className="flex gap-1.5">
            <button className="flex-1 py-1.5 rounded-md bg-accent text-accent-foreground text-xs font-semibold">
              Approve
            </button>
            <button className="px-3 py-1.5 rounded-md border border-border text-xs text-muted-foreground">
              Reject
            </button>
          </div>
        </div>
      </div>
    )
  },
  { 
    title: "Visa Secure Payment", 
    desc: "Once approved, Visa processes the payment with fraud protection and the product is delivered to your door automatically.",
    example: "Visa secured",
    visual: (
      <div className="relative w-full h-48 bg-gradient-to-br from-success/10 to-success/5 rounded-lg p-4 flex items-center justify-center border border-success/20">
        <div className="text-center space-y-3 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/20 border border-success/30">
            <div className="w-3 h-3 rounded-full bg-success flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            </div>
            <span className="text-xs font-bold text-success">Payment Secured</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between px-3 py-2 bg-card/50 rounded-lg border border-border">
              <span className="text-xs text-muted-foreground">Visa •••• 4242</span>
              <div className="w-4 h-4 rounded-full bg-success/20 border border-success flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
              </div>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-card/50 rounded-lg border border-border">
              <span className="text-xs text-muted-foreground">Fraud Check</span>
              <div className="w-4 h-4 rounded-full bg-success/20 border border-success flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
              </div>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-card/50 rounded-lg border border-border">
              <span className="text-xs text-muted-foreground">Order Placed</span>
              <div className="w-4 h-4 rounded-full bg-success/20 border border-success flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-success"></div>
              </div>
            </div>
          </div>
          
          <div className="inline-block px-3 py-1.5 rounded-lg bg-accent/20 text-accent text-xs font-semibold border border-accent/30">
            Delivery: 2 days
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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
          <span className="text-accent font-semibold text-sm">How It Works</span>
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
                      className="text-accent/30"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                      </svg>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex-1 w-full">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="inline-block px-3 py-1.5 rounded-full bg-accent/10 font-display text-xs font-bold uppercase tracking-widest text-accent border border-accent/20">
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
    </div>
  </section>
);

export default HowItWorks;
