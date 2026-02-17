import { motion } from "framer-motion";
import { TeachingRole } from "@/data/profileData";

const TeachingSection = ({ teaching, techStack }: { teaching: TeachingRole[]; techStack: string[] }) => (
  <section id="teaching" className="py-20 px-6 bg-secondary/50">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-foreground">Teaching & Experience</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {teaching.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-6 border border-border shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{t.emoji}</span>
              <div>
                <h3 className="font-bold text-card-foreground">{t.title}</h3>
                <p className="text-xs text-primary font-medium mb-2">{t.period}</p>
                <p className="text-sm text-muted-foreground">{t.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <h3 className="text-xl font-bold text-center mb-6 text-foreground">Tech Stack</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {techStack.map((tech, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            className="px-4 py-2 bg-card rounded-lg text-sm font-medium text-card-foreground border border-border shadow-sm"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </div>
  </section>
);

export default TeachingSection;
