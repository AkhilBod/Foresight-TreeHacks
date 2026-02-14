import { motion } from "framer-motion";
import { ShieldIcon, LockIcon, EyeIcon, CardIcon } from "@/components/icons";
import { Shield, Lock, Eye, CreditCard, AlertTriangle, CheckCircle } from "lucide-react";

const points = [
  { 
    icon: Shield, 
    title: "Visa Fraud Protection", 
    desc: "Built on Visa's enterprise fraud detection infrastructure with real-time monitoring and zero-liability protection for unauthorized transactions.",
    stat: "99.97%"
  },
  { 
    icon: Lock, 
    title: "Encrypted Transactions", 
    desc: "Bank-grade AES-256 encryption for all data, with tokenized payments ensuring your card details are never exposed or stored.",
    stat: "256-bit"
  },
  { 
    icon: Eye, 
    title: "Full User Control", 
    desc: "Set spending limits per category, require approval for purchases over custom thresholds, and pause autonomous ordering anytime.",
    stat: "100%"
  },
  { 
    icon: CreditCard, 
    title: "Secure Infrastructure", 
    desc: "PCI DSS compliant payment processing with multi-factor authentication and biometric verification for high-value purchases.",
    stat: "Level 1"
  },
];

const Security = () => (
  <section id="security" className="py-24 bg-surface relative">
    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
    <div className="mx-auto max-w-7xl px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 mb-4">
          <ShieldIcon size={16} className="text-success" />
          <span className="text-success font-semibold text-sm">Security & Trust</span>
        </div>
        <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
          Protected by Visa's <br/>
          <span className="text-primary">Global Security Network</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Every autonomous purchase is safeguarded with the same enterprise-grade security that protects billions of Visa transactions worldwide.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative rounded-xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:border-success/30 hover:shadow-lg hover:shadow-success/10"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-success/10 border border-success/20 text-success transition-all group-hover:scale-110 group-hover:bg-success/20">
              <p.icon size={28} />
            </div>
            <div className="mb-3 text-3xl font-bold text-success">{p.stat}</div>
            <h3 className="font-display font-bold text-lg text-foreground mb-2">{p.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-20 p-8 rounded-2xl bg-card border border-border"
      >
        <div className="max-w-4xl mx-auto">
          <h3 className="font-display text-2xl font-bold text-center text-foreground mb-8">
            Compliance & Certifications
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 mb-3">
                <CheckCircle className="text-primary" size={32} />
              </div>
              <div className="text-sm font-semibold text-foreground">PCI DSS</div>
              <div className="text-xs text-muted-foreground">Level 1 Certified</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 mb-3">
                <CheckCircle className="text-primary" size={32} />
              </div>
              <div className="text-sm font-semibold text-foreground">SOC 2</div>
              <div className="text-xs text-muted-foreground">Type II Compliant</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 mb-3">
                <CheckCircle className="text-primary" size={32} />
              </div>
              <div className="text-sm font-semibold text-foreground">GDPR</div>
              <div className="text-xs text-muted-foreground">Privacy Ready</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 mb-3">
                <CheckCircle className="text-primary" size={32} />
              </div>
              <div className="text-sm font-semibold text-foreground">ISO 27001</div>
              <div className="text-xs text-muted-foreground">Security Certified</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Zero Liability Promise */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Shield className="text-primary" size={24} />
          <h4 className="font-display text-xl font-bold text-foreground">Visa Zero Liability Protection</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          You're never responsible for unauthorized purchases. If fraud occurs, Visa's Zero Liability policy protects you.
        </p>
      </motion.div>
    </div>
  </section>
);

export default Security;
