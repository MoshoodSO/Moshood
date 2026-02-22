import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import { getProfileData } from "@/data/profileData";

const ProjectsPage = () => {
  const data = getProfileData();
  return (
    <div className="min-h-screen bg-background">
      <Navbar name={data.name} />
      <div className="pt-20">
        <ProjectsSection projects={data.projects} />
      </div>
    </div>
  );
};

export default ProjectsPage;
