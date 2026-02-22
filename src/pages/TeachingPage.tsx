import Navbar from "@/components/Navbar";
import TeachingSection from "@/components/TeachingSection";
import { getProfileData } from "@/data/profileData";

const TeachingPage = () => {
  const data = getProfileData();
  return (
    <div className="min-h-screen bg-background">
      <Navbar name={data.name} />
      <div className="pt-20">
        <TeachingSection teaching={data.teaching} techStack={data.techStack} />
      </div>
    </div>
  );
};

export default TeachingPage;
