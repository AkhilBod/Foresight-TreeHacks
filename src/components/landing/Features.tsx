import { motion } from "framer-motion";

const features = [
  { 
    title: "Ambient AI Vision", 
    desc: "Observe  routines like washing dishes without soap rand identify when essentials are running low without being intrusive.",
    color: "accent",
    visual: (
      <div className="relative w-full h-full min-h-[180px] bg-gradient-to-br from-accent/10 to-muted/5 rounded-lg overflow-hidden">
        <img 
          src="https://i.ibb.co/Jw5fT24C/image.png" 
          alt="AI Vision Detection" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute top-3 left-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm border border-accent/30">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span className="text-xs font-semibold text-white">Live Detection</span>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between px-3 py-2 bg-card/95 backdrop-blur-sm rounded-lg border border-accent/30">
            <span className="text-xs text-muted-foreground">Confidence</span>
            <span className="text-xs font-bold text-accent">98.5%</span>
          </div>
        </div>
      </div>
    )
  },
  { 
    title: "Predictive Reordering", 
    desc: "Machine learning algorithms analyze consumption patterns and automatically trigger Visa payments to reorder products before you run out.",
    color: "accent",
    visual: (
      <div className="relative w-full h-full min-h-[180px] bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-4 flex items-center justify-center">
        <div className="space-y-3 w-full">
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30">
              <span className="text-xs font-semibold text-accent">Smart Analytics</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
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
    title: "Smart Budget Analytics", 
    desc: "Track household spending patterns, get insights on consumption habits, and receive recommendations to optimize recurring purchases.",
    color: "accent",
    visual: (
      <div className="relative w-full h-full min-h-[180px] bg-gradient-to-br from-accent/10 to-muted/5 rounded-lg p-4 flex items-center justify-center">
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
                className="flex-1 bg-gradient-to-t from-accent to-muted/50 rounded-t"
              ></motion.div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="text-muted-foreground">Spending</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-muted"></div>
              <span className="text-muted-foreground">Budget</span>
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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
          <span className="text-accent font-semibold text-sm">Features</span>
        </div>
        <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
          Powerful Features for <br/>
          <span className="bg-gradient-to-r from-accent via-accent to-muted bg-clip-text text-transparent">
            Behavior-Driven Commerce
          </span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need for autonomous, secure, and intelligent home shopping powered by Visa's trusted infrastructure.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10"
          >
            {/* Visual Preview */}
            <div className="relative overflow-hidden">
              {f.visual}
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">{f.title}</h3>
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
        <div className="relative group p-8 rounded-xl bg-card border border-border hover:border-accent/30 transition-all overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-accent to-muted bg-clip-text text-transparent mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground font-medium">Detection Accuracy</div>
            <div className="mt-2 text-xs text-muted-foreground/70">Powered by advanced computer vision</div>
          </div>
        </div>
        <div className="relative group p-8 rounded-xl bg-card border border-border hover:border-accent/30 transition-all overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-accent to-muted bg-clip-text text-transparent mb-2">3 Days</div>
            <div className="text-sm text-muted-foreground font-medium">Average Prediction Window</div>
            <div className="mt-2 text-xs text-muted-foreground/70">Never run out of essentials</div>
          </div>
        </div>
        <div className="relative group p-8 rounded-xl bg-card border border-border hover:border-success/30 transition-all overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-accent to-muted bg-clip-text text-transparent mb-2">$0</div>
            <div className="text-sm text-muted-foreground font-medium">Setup Fees</div>
            <div className="mt-2 text-xs text-muted-foreground/70">Start with your existing Visa card</div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Features;
