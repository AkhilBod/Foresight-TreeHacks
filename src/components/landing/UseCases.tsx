import { motion } from "framer-motion";
import { Utensils, Droplets, Lightbulb, Baby, Coffee, Sparkles } from "lucide-react";

const useCases = [
  {
    icon: Droplets,
    title: "Kitchen Essentials",
    scenario: "Washing dishes without soap",
    detection: "Camera notices empty soap dispenser during routine dish washing",
    action: "Reorders preferred brand automatically",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Utensils,
    title: "Cooking Supplies",
    scenario: "Cooking without oil",
    detection: "AI observes you reaching for missing cooking oil multiple times",
    action: "Triggers reorder before your next cooking session",
    color: "from-orange-500/20 to-amber-500/20"
  },
  {
    icon: Coffee,
    title: "Beverages",
    scenario: "Morning coffee routine",
    detection: "Tracks daily coffee consumption patterns",
    action: "Predicts depletion 3 days ahead and reorders",
    color: "from-amber-700/20 to-yellow-600/20"
  },
  {
    icon: Baby,
    title: "Baby Products",
    scenario: "Diaper supply low",
    detection: "Monitors diaper usage frequency and remaining quantity",
    action: "Ensures you never run out of critical baby items",
    color: "from-pink-500/20 to-rose-500/20"
  },
  {
    icon: Sparkles,
    title: "Cleaning Supplies",
    scenario: "Laundry detergent empty",
    detection: "Recognizes washing machine usage without detergent",
    action: "Reorders detergent pods before laundry day",
    color: "from-purple-500/20 to-violet-500/20"
  },
  {
    icon: Lightbulb,
    title: "Household Items",
    scenario: "Light bulbs burned out",
    detection: "Identifies bulb failures through ambient lighting changes",
    action: "Orders replacement bulbs with correct specifications",
    color: "from-yellow-500/20 to-orange-500/20"
  }
];

const UseCases = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent"></div>
    <div className="mx-auto max-w-7xl px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
          <Sparkles size={16} className="text-accent" />
          <span className="text-accent font-semibold text-sm">Use Cases</span>
        </div>
        <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
          Real-World Scenarios
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          See how Visa Smart Home Commerce detects needs and automatically handles reordering across different household scenarios.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((useCase, i) => (
          <motion.div
            key={useCase.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10"
          >
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-all group-hover:scale-110">
                  <useCase.icon size={24} />
                </div>
                <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">
                  AI Detected
                </span>
              </div>
              
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {useCase.title}
              </h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                    Scenario
                  </div>
                  <div className="text-muted-foreground">
                    {useCase.scenario}
                  </div>
                </div>
                
                <div>
                  <div className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">
                    Detection
                  </div>
                  <div className="text-muted-foreground">
                    {useCase.detection}
                  </div>
                </div>
                
                <div>
                  <div className="text-xs font-semibold text-success uppercase tracking-wide mb-1">
                    Action
                  </div>
                  <div className="text-muted-foreground">
                    {useCase.action}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/30">
          <h3 className="font-display text-2xl font-bold text-foreground mb-3">
            Any Routine, Any Product
          </h3>
          <p className="text-muted-foreground max-w-2xl">
            Our AI continuously learns and adapts to your household's unique patterns, 
            expanding coverage to any consumable product over time.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default UseCases;
