import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import SkillsSection from "@/components/SkillsSection";
import { getProfileData } from "@/data/profileData";

const SkillsPage = () => {
  const data = getProfileData();
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
