import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckIcon, ArrowRightIcon } from "@/components/icons";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    period: "14-day trial",
    features: ["1 camera", "Basic AI detection", "Manual approvals", "Email support"],
    recommended: false,
  },
  {
    name: "Standard",
    price: "$19",
    period: "/month",
    features: ["Up to 5 cameras", "Advanced AI patterns", "Spending controls", "Auto-reordering", "Priority support"],
    recommended: true,
  },
  {
    name: "Premium",
    price: "$49",
    period: "/month",
    features: ["Unlimited cameras", "Full AI suite", "Custom budgets", "Family accounts", "Dedicated support", "API access"],
    recommended: false,
  },
];

const Pricing = () => (
  <section id="pricing" className="py-24">
    <div className="mx-auto max-w-7xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Pricing</h2>
        <p className="mt-3 text-muted-foreground">Simple, transparent pricing for every household.</p>
      </motion.div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className={`relative flex flex-col rounded-xl border p-8 transition-all hover:-translate-y-1 ${
              tier.recommended
                ? "border-primary bg-card gold-glow"
                : "border-border bg-card"
            }`}
          >
            {tier.recommended && (
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                Recommended
              </span>
            )}
            <h3 className="font-display text-xl font-bold text-foreground">{tier.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold text-foreground">{tier.price}</span>
              <span className="text-sm text-muted-foreground">{tier.period}</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckIcon size={16} className="text-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/dashboard"
              className={`mt-8 inline-flex h-10 items-center justify-center gap-2 rounded-md text-sm font-medium transition-all ${
                tier.recommended
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "border border-border text-foreground hover:bg-secondary"
              }`}
            >
              Get Started
              <ArrowRightIcon size={14} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
