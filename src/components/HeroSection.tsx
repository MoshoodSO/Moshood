import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { ProfileData } from "@/data/profileData";
import profileImg from "@/assets/moshood-profile.jpg";

const HeroSection = ({ data }: { data: ProfileData }) => {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const img = data.profileImage || profileImg;

  return (
    <section className="hero-gradient min-h-[600px] pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-primary-foreground"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            {data.name}
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-90 mb-6">{data.title}</p>
          <p className="text-base opacity-80 max-w-xl mb-8 leading-relaxed">{data.bio.slice(0, 300)}</p>
          <div className="flex flex-wrap gap-3 mb-8">
            <button onClick={() => scrollTo("projects")} className="px-6 py-3 rounded-lg bg-primary-foreground text-primary font-semibold text-sm hover:opacity-90 transition">
              My Projects
            </button>
            <button onClick={() => scrollTo("skills")} className="px-6 py-3 rounded-lg border border-primary-foreground/40 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition">
              What I Do
            </button>
            <a href={`mailto:${data.email}`} className="px-6 py-3 text-primary-foreground/80 font-semibold text-sm hover:text-primary-foreground transition">
              Get in Touch
            </a>
          </div>
          <div className="flex gap-4">
            {data.github && <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition"><Github size={22} /></a>}
            {data.linkedin && <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition"><Linkedin size={22} /></a>}
            {data.twitter && <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="text-primary-foreground/70 hover:text-primary-foreground transition"><Twitter size={22} /></a>}
            {data.email && <a href={`mailto:${data.email}`} className="text-primary-foreground/70 hover:text-primary-foreground transition"><Mail size={22} /></a>}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-primary-foreground/20 shadow-2xl">
            <img src={img} alt={data.name} className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
