import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import TeachingSection from "@/components/TeachingSection";
import { useProfileData } from "@/hooks/useProfileData";
import { Loader2 } from "lucide-react";

const TeachingPage = () => {
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
      <PageBanner title="Teaching & Experience" subtitle="Academic roles, mentorship, and professional experience" />
      <div className="flex-1">
        <TeachingSection teaching={data.teaching} techStack={data.techStack} />
      </div>
      <Footer />
    </div>
  );
};

export default TeachingPage;
