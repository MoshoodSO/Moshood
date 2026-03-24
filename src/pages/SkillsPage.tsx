import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import SkillsSection from "@/components/SkillsSection";
import { useProfileData } from "@/hooks/useProfileData";
import { Loader2 } from "lucide-react";

const SkillsPage = () => {
  const { data, loading } = useProfileData();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar name={data.name} />
      <PageBanner title="What I Do" subtitle="Core competencies and areas of expertise" />
      <div className="flex-1">
        <SkillsSection skills={data.skills} />
      </div>
      <Footer />
    </div>
  );
};

export default SkillsPage;
