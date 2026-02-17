import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Project } from "@/data/profileData";

const ProjectsSection = ({ projects }: { projects: Project[] }) => (
  <section id="projects" className="py-20 px-6 bg-secondary/50">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-foreground">Featured Projects</h2>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        From research tools to production applications
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all group"
          >
            <div className="hero-gradient p-6 flex items-center justify-center text-4xl h-32">
              {project.emoji}
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2 text-card-foreground">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
              <ul className="space-y-1 mb-4">
                {project.features.map((f, j) => (
                  <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>{f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.stack.map((s, j) => (
                  <span key={j} className="text-xs px-2 py-1 bg-secondary rounded-md text-secondary-foreground font-medium">{s}</span>
                ))}
              </div>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:opacity-80 transition"
              >
                <ExternalLink size={14} /> GitHub
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
