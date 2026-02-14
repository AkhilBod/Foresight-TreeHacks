import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How does the camera detect what I need?", a: "Our AI uses computer vision to identify products on shelves, counters, and in cabinets. It learns your usage patterns over time and predicts when items will run low based on historical consumption data." },
  { q: "Can I set spending limits?", a: "Yes. You can set a monthly budget, per-category limits, and an auto-approve threshold. Any purchase above your threshold requires manual approval in the app." },
  { q: "Is my video data stored?", a: "No raw video is ever stored or transmitted. The AI processes frames locally on the device and only sends anonymized product detection data to the cloud." },
  { q: "What devices are supported?", a: "Foresight works with any standard IP camera, plus our own Foresight Cam hardware. The dashboard is accessible via web browser on desktop and mobile." },
  { q: "Can I cancel anytime?", a: "Absolutely. There are no long-term contracts. You can cancel your subscription at any time from your account settings." },
  { q: "How are payments secured?", a: "All payments use tokenized card processing with enterprise-grade encryption. Your card details are never stored on our servers." },
];

const FAQ = () => (
  <section id="faq" className="py-24 bg-surface">
    <div className="mx-auto max-w-3xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Frequently Asked Questions</h2>
        <p className="mt-3 text-muted-foreground">Everything you need to know about Foresight.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-12"
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-lg border border-border bg-card px-5"
            >
              <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQ;
