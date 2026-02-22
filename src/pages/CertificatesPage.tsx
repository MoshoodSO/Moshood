import { motion } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getProfileData } from "@/data/profileData";

const CertificatesPage = () => {
  const data = getProfileData();

  return (
    <div className="min-h-screen bg-background">
      <Navbar name={data.name} />
      <div className="pt-20">
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-foreground">
              Licenses & Certifications
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Professional certifications and completed training programs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.certificates.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <Award size={28} className="text-primary mb-3" />
                  <h3 className="font-bold text-sm text-card-foreground mb-1">{cert.title}</h3>
                  <p className="text-xs text-muted-foreground mb-1">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground mb-3">{cert.year}</p>
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:opacity-80 transition"
                    >
                      <ExternalLink size={12} /> View Certificate
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CertificatesPage;
