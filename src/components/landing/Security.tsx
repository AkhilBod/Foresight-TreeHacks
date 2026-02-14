import { motion } from "framer-motion";
import { ShieldIcon, LockIcon, EyeIcon, CardIcon } from "@/components/icons";

const points = [
  { icon: ShieldIcon, title: "Fraud Protection", desc: "AI-powered fraud detection monitors every transaction in real time." },
  { icon: LockIcon, title: "End-to-End Encryption", desc: "All data is encrypted at rest and in transit using industry standards." },
  { icon: EyeIcon, title: "User Approval Controls", desc: "Nothing is purchased without your explicit approval or pre-set rules." },
  { icon: CardIcon, title: "Tokenized Payments", desc: "Card details are never stored. Tokenized transactions keep you safe." },
];

const Security = () => (
  <section id="security" className="py-24 bg-surface">
    <div className="mx-auto max-w-7xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Security & Trust</h2>
        <p className="mt-3 text-muted-foreground">Your safety is built into every layer of the platform.</p>
      </motion.div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 text-primary">
              <p.icon size={22} />
            </div>
            <h3 className="font-display font-semibold text-foreground">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Security;
