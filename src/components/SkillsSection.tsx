import { motion } from "framer-motion";
import { Brain, Calculator, GraduationCap, Sparkles } from "lucide-react";
import { SkillCategory } from "@/data/profileData";

const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  calculator: Calculator,
  "graduation-cap": GraduationCap,
  sparkles: Sparkles,
};

const colorClasses = [
  "bg-success text-success-foreground",
  "bg-info text-info-foreground",
  "bg-primary text-primary-foreground",
  "bg-warning text-warning-foreground",
];

const SkillsSection = ({ skills }: { skills: SkillCategory[] }) => (
  <section id="skills" className="py-20 px-6">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-foreground">What I Do</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill, i) => {
          const Icon = iconMap[skill.icon] || Sparkles;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 text-center shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className={`w-14 h-14 rounded-xl ${colorClasses[i % colorClasses.length]} flex items-center justify-center mx-auto mb-4`}>
                <Icon size={26} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-card-foreground">{skill.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default SkillsSection;
