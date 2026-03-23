import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import RecognitionsSection from "@/components/RecognitionsSection";
import { getProfileData } from "@/data/profileData";

const RecognitionsPage = () => {
  const data = getProfileData();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar name={data.name} />
      <PageBanner title="Recognition & Impact" subtitle="Awards, achievements, and milestones" />
      <div className="flex-1">
        <RecognitionsSection data={data} />
      </div>
      <Footer />
    </div>
  );
};

export default RecognitionsPage;
