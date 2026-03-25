import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Award, ShieldCheck, Loader2, Search, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import { useProfileData } from "@/hooks/useProfileData";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CertificatesPage = () => {
  const { data, loading } = useProfileData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const allCategories = useMemo(() => {
    const cats = new Set(data.certificates.map((c) => c.category || "Other"));
    return Array.from(cats).sort();
  }, [data.certificates]);

  const allYears = useMemo(() => {
    const yrs = new Set(data.certificates.map((c) => c.year));
    return Array.from(yrs).sort((a, b) => b.localeCompare(a));
  }, [data.certificates]);

  const filtered = useMemo(() => {
    return data.certificates.filter((cert) => {
      const matchesSearch =
        !searchQuery ||
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || (cert.category || "Other") === selectedCategory;
      const matchesYear = selectedYear === "all" || cert.year === selectedYear;
      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [data.certificates, searchQuery, selectedCategory, selectedYear]);

  const categories = filtered.reduce<Record<string, typeof data.certificates>>((acc, cert) => {
    const cat = cert.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(cert);
    return acc;
  }, {});

  const sortedCategories = Object.entries(categories)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([cat, certs]) => [cat, [...certs].sort((a, b) => b.year.localeCompare(a.year))] as const);

  const hasActiveFilters = searchQuery || selectedCategory !== "all" || selectedYear !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedYear("all");
  };

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
      <PageBanner title="Licenses & Certifications" subtitle="Professional certifications and completed training programs" />

      <div className="flex-1">
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Filter Bar */}
            <div className="mb-10 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or issuer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {allCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {allYears.map((yr) => (
                    <SelectItem key={yr} value={yr}>{yr}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition">
                  <X size={14} /> Clear
                </button>
              )}
            </div>

            {hasActiveFilters && (
              <div className="mb-6 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground">Showing {filtered.length} of {data.certificates.length}:</span>
                {searchQuery && <Badge variant="secondary" className="text-xs">&quot;{searchQuery}&quot;</Badge>}
                {selectedCategory !== "all" && <Badge variant="secondary" className="text-xs">{selectedCategory}</Badge>}
                {selectedYear !== "all" && <Badge variant="secondary" className="text-xs">{selectedYear}</Badge>}
              </div>
            )}

            {sortedCategories.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg font-medium">No certificates match your filters</p>
                <button onClick={clearFilters} className="mt-2 text-primary text-sm hover:underline">Clear filters</button>
              </div>
            )}

            {sortedCategories.map(([category, certs]) => (
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
                <h2 className="text-2xl font-extrabold text-center mb-4 text-foreground">Badges</h2>
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
