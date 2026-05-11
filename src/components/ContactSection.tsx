import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Twitter, ExternalLink, Globe, Phone, type LucideIcon } from "lucide-react";
import { ProfileData } from "@/data/profileData";

const ICONS: Record<string, LucideIcon> = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
  external: ExternalLink,
  kaggle: ExternalLink,
  globe: Globe,
  phone: Phone,
};

const ContactSection = ({ data }: { data: ProfileData }) => {
  const cfg = data.contact;
  const heading = cfg?.heading || "Let's Connect";
  const intro = cfg?.intro || "Open to research collaborations, mentorship opportunities, tutoring, and data science projects. Let's work together!";
  const methods = cfg?.methods?.length
    ? cfg.methods
    : [
        { icon: "mail", label: "Email", description: "Research & collaboration", href: `mailto:${data.email}` },
        { icon: "linkedin", label: "LinkedIn", description: "Professional network", href: data.linkedin },
        { icon: "github", label: "GitHub", description: "Code & projects", href: data.github },
        { icon: "external", label: "Kaggle", description: "Competitions & datasets", href: data.kaggle },
      ];

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground">{heading}</h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">{intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {methods.map((m, i) => {
              const Icon = ICONS[m.icon?.toLowerCase()] || ExternalLink;
              return (
                <a
                  key={i}
                  href={m.href}
                  target={m.href?.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow text-center block"
                >
                  <Icon size={24} className="mx-auto mb-3 text-primary" />
                  <h3 className="font-bold text-sm text-card-foreground">{m.label}</h3>
                  <p className="text-xs text-muted-foreground">{m.description}</p>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
