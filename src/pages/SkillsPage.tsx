import Navbar from "@/components/Navbar";
import SkillsSection from "@/components/SkillsSection";
import { getProfileData } from "@/data/profileData";

const SkillsPage = () => {
  const data = getProfileData();
  return (
    <div className="min-h-screen bg-background">
      <Navbar name={data.name} />
      <div className="pt-20">
        <SkillsSection skills={data.skills} />
      </div>
    </div>
  );
};

export default SkillsPage;
