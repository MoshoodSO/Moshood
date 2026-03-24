import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import RecognitionsSection from "@/components/RecognitionsSection";
import { useProfileData } from "@/hooks/useProfileData";
import { Loader2 } from "lucide-react";

const RecognitionsPage = () => {
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
      <PageBanner title="Recognition & Impact" subtitle="Awards, achievements, and milestones" />
      <div className="flex-1">
        <RecognitionsSection data={data} />
      </div>
      <Footer />
    </div>
  );
};

export default RecognitionsPage;
