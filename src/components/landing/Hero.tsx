import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => (
  <section className="relative overflow-hidden pt-20 pb-32 min-h-screen flex items-center">
    {/* Subtle gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
    
    <div className="mx-auto max-w-7xl px-6 relative w-full">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
        

          {/* Main Headline */}
          <h1 className="font-display text-6xl font-bold leading-tight tracking-tight text-foreground mb-6">
            Smart home inventory
            <br />
            <span className="text-muted-foreground">for your household</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
            Never run out of essentials again. AI vision detects low supplies and auto-orders before you need them.
          </p>

          {/* CTA Buttons - Visa Colors */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link
              to="/dashboard"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary text-primary-foreground px-8 text-sm font-semibold transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
            >
              Try for Free
            </Link>
            <button className="inline-flex h-12 items-center gap-2 rounded-lg border border-primary/30 bg-transparent px-6 text-sm font-medium text-foreground transition-all hover:bg-surface hover:border-primary/50">
              Preview
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="8" fill="hsl(45 100% 51%)"/>
                <path d="M6 5L10 8L6 11V5Z" fill="hsl(225 30% 8%)"/>
              </svg>
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
            </div>
          </div>
        </motion.div>

        {/* Right Column - Dashboard Screenshot */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          {/* Main Dashboard Card with Screenshot */}
          <div className="relative rounded-3xl bg-surface-elevated border border-border overflow-hidden shadow-2xl">
            {/* Header with traffic lights */}
            <div className="flex items-center justify-between p-4 bg-surface border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>

            {/* Actual Dashboard Screenshot */}
            <div className="relative">
              <img 
                src="https://i.ibb.co/4gPY40hH/image.png" 
                alt="Foresight Dashboard"
                className="w-full h-auto"
              />
              
              {/* Subtle overlay to integrate with design */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;
