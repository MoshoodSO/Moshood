import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import TeachingSection from "@/components/TeachingSection";
import { getProfileData } from "@/data/profileData";

const TeachingPage = () => {
  const data = getProfileData();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar name={data.name} />
      <PageBanner title="Teaching & Experience" subtitle="Academic roles, mentorship, and professional experience" />
      <div className="flex-1">
        <TeachingSection teaching={data.teaching} techStack={data.techStack} />
      </div>
      <Footer />
    </div>
  );
};

export default TeachingPage;
