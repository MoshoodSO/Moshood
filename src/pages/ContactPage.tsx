import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { getProfileData } from "@/data/profileData";

const ContactPage = () => {
  const data = getProfileData();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar name={data.name} />
      <PageBanner title="Get in Touch" subtitle="Open to collaborations, mentorship, and research opportunities" />
      <div className="flex-1">
        <ContactSection data={data} />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
