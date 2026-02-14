import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/icons";
import HeroDashboardMockup from "./HeroDashboardMockup";

const Hero = () => (
  <section className="relative overflow-hidden pt-32 pb-20 grid-pattern">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
    <div className="mx-auto max-w-7xl px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <span className="text-primary font-semibold text-sm">Powered by Visa</span>
          <span className="text-muted-foreground text-sm">•</span>
          <span className="text-accent font-semibold text-sm">Smart Commerce</span>
        </div>
        <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-7xl">
          Predictive Commerce, <br/>
          <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Before You Run Out
          </span>
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto">
          Visa Smart Home Commerce uses ambient AI cameras to observe your daily routines—automatically 
          reordering essentials like dish soap before you run out. Secure, controlled, and intelligent.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            Get Started
            <ArrowRightIcon size={16} />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex h-12 items-center gap-2 rounded-lg border-2 border-accent/50 px-8 text-sm font-semibold text-accent transition-all hover:bg-accent/10 hover:border-accent"
          >
            Request a Demo
          </a>
        </div>
        
        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success"></div>
            <span>AI-Powered Detection</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <span>Visa Secure Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent"></div>
            <span>Full Control</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-16"
      >
        <HeroDashboardMockup />
      </motion.div>
    </div>
  </section>
);

export default Hero;
