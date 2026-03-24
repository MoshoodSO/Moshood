import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/ProjectsSection";
import { useProfileData } from "@/hooks/useProfileData";
import { Loader2 } from "lucide-react";

const ProjectsPage = () => {
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
      <PageBanner title="Projects" subtitle="Featured projects and open-source contributions" />
      <div className="flex-1">
        <ProjectsSection projects={data.projects} />
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
