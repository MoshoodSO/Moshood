import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { useProfileData } from "@/hooks/useProfileData";
import { Loader2 } from "lucide-react";

const ContactPage = () => {
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
      <PageBanner title="Get in Touch" subtitle="Open to collaborations, mentorship, and research opportunities" />
      <div className="flex-1">
        <ContactSection data={data} />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
