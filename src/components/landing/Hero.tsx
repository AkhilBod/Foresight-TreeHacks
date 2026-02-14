import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@/components/icons";
import HeroDashboardMockup from "./HeroDashboardMockup";

const Hero = () => (
  <section className="relative overflow-hidden pt-32 pb-20 grid-pattern">
    <div className="mx-auto max-w-7xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mx-auto max-w-2xl text-center"
      >
        <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
          The Future of <span className="text-primary">Shopping</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          AI-powered cameras observe your daily routines and automatically reorder essentials 
          before you run out. You stay in control with spending limits and purchase approvals.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Get Started
            <ArrowRightIcon size={16} />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Request a Demo
          </a>
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
