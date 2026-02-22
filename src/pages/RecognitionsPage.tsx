import Navbar from "@/components/Navbar";
import RecognitionsSection from "@/components/RecognitionsSection";
import { getProfileData } from "@/data/profileData";

const RecognitionsPage = () => {
  const data = getProfileData();
  return (
    <div className="min-h-screen bg-background">
      <Navbar name={data.name} />
      <div className="pt-20">
        <RecognitionsSection data={data} />
      </div>
    </div>
  );
};

export default RecognitionsPage;
