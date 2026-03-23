import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import RecognitionsSection from "@/components/RecognitionsSection";
import TeachingSection from "@/components/TeachingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getProfileData, ProfileData } from "@/data/profileData";

const Index = () => {
  const [data, setData] = useState<ProfileData>(getProfileData());

  useEffect(() => {
    const handleStorage = () => setData(getProfileData());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar name={data.name} />
      <HeroSection data={data} />
      <SkillsSection skills={data.skills} />
      <ProjectsSection projects={data.projects} />
      <RecognitionsSection data={data} />
      <TeachingSection teaching={data.teaching} techStack={data.techStack} />
      <ContactSection data={data} />
    </div>
  );
};

export default Index;
