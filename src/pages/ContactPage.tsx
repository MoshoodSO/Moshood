import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import { getProfileData } from "@/data/profileData";

const ContactPage = () => {
  const data = getProfileData();
  return (
    <div className="min-h-screen bg-background">
      <Navbar name={data.name} />
      <div className="pt-20">
        <ContactSection data={data} />
      </div>
    </div>
  );
};

export default ContactPage;
