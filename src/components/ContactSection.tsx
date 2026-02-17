import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react";
import { ProfileData } from "@/data/profileData";

const ContactSection = ({ data }: { data: ProfileData }) => (
  <section id="contact" className="py-20 px-6">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">Let's Connect</h2>
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
          Open to research collaborations, mentorship opportunities, tutoring, and data science projects. Let's work together!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { icon: Mail, label: "Email", desc: "Research & collaboration", href: `mailto:${data.email}` },
            { icon: Linkedin, label: "LinkedIn", desc: "Professional network", href: data.linkedin },
            { icon: Github, label: "GitHub", desc: "Code & projects", href: data.github },
            { icon: ExternalLink, label: "Kaggle", desc: "Competitions & datasets", href: data.kaggle },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow text-center block"
            >
              <item.icon size={24} className="mx-auto mb-3 text-primary" />
              <h3 className="font-bold text-sm text-card-foreground">{item.label}</h3>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
    <div className="text-center text-xs text-muted-foreground mt-16 border-t border-border pt-8">
      © {new Date().getFullYear()} {data.name}. All rights reserved.
    </div>
  </section>
);

export default ContactSection;
