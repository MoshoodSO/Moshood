import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/ProjectsSection";
import { getProfileData } from "@/data/profileData";

const ProjectsPage = () => {
  const data = getProfileData();
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
