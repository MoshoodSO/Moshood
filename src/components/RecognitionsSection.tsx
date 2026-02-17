import { motion } from "framer-motion";
import { ProfileData } from "@/data/profileData";

const RecognitionsSection = ({ data }: { data: ProfileData }) => (
  <section id="recognitions" className="py-20 px-6">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-foreground">Recognition & Impact</h2>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
        {data.stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl font-extrabold text-primary">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recognition cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.recognitions.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl p-5 border border-border shadow-sm"
          >
            <div className="text-2xl mb-2">{r.emoji}</div>
            <h3 className="font-bold text-sm text-card-foreground mb-1">{r.title}</h3>
            <p className="text-xs text-muted-foreground">{r.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Quote */}
      {data.quote && (
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center italic text-muted-foreground text-lg max-w-2xl mx-auto border-l-4 border-primary pl-6 text-left"
        >
          "{data.quote}"
        </motion.blockquote>
      )}
    </div>
  </section>
);

export default RecognitionsSection;
