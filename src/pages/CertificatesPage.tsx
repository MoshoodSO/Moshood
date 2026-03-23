import { motion } from "framer-motion";
import { ExternalLink, Award, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import { getProfileData } from "@/data/profileData";

const CertificatesPage = () => {
  const data = getProfileData();

  const categories = data.certificates.reduce<Record<string, typeof data.certificates>>((acc, cert) => {
    const cat = cert.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(cert);
    return acc;
  }, {});

  // Sort categories alphabetically and certs by year descending
  const sortedCategories = Object.entries(categories)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([cat, certs]) => [cat, [...certs].sort((a, b) => b.year.localeCompare(a.year))] as const);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar name={data.name} />
      <PageBanner title="Licenses & Certifications" subtitle="Professional certifications and completed training programs" />

      <div className="flex-1">
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {Object.entries(categories).map(([category, certs]) => (
              <div key={category} className="mb-12">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-xl font-bold text-foreground mb-6 flex items-center gap-2"
                >
                  <Award size={22} className="text-primary" />
                  {category}
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certs.map((cert, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-bold text-sm text-card-foreground mb-1">{cert.title}</h4>
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
            ))}

            {data.badges && data.badges.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-extrabold text-center mb-4 text-foreground">
                  Badges
                </h2>
                <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Digital badges earned from various platforms and programs
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {data.badges.map((badge, i) => (
                    <motion.a
                      key={i}
                      href={badge.url || "#"}
                      target={badge.url ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex flex-col items-center gap-3 bg-card rounded-xl p-4 border border-border shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-pointer"
                    >
                      {badge.imageUrl ? (
                        <img src={badge.imageUrl} alt={badge.title} className="w-20 h-20 object-contain rounded-lg" />
                      ) : (
                        <ShieldCheck size={40} className="text-primary" />
                      )}
                      <div className="text-center">
                        <p className="text-xs font-bold text-card-foreground leading-tight">{badge.title}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{badge.issuer}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CertificatesPage;
