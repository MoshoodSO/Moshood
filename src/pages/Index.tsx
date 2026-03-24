import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import RecognitionsSection from "@/components/RecognitionsSection";
import TeachingSection from "@/components/TeachingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useProfileData } from "@/hooks/useProfileData";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data, loading } = useProfileData();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar name={data.name} />
      <HeroSection data={data} />
      <SkillsSection skills={data.skills} />
      <ProjectsSection projects={data.projects} />
      <RecognitionsSection data={data} />
      <TeachingSection teaching={data.teaching} techStack={data.techStack} />
      <ContactSection data={data} />
      <Footer />
    </div>
  );
};

export default Index;
