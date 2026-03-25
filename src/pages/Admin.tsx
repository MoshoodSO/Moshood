import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2, LogOut, Loader2, ChevronUp, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ProfileData, defaultProfileData } from "@/data/profileData";
import { useProfileData, saveProfileToDb } from "@/hooks/useProfileData";
import ImageUpload from "@/components/ImageUpload";

const Admin = () => {
  const { data: fetchedData, loading } = useProfileData();
  const [data, setData] = useState<ProfileData>(defaultProfileData);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) setData(fetchedData);
  }, [loading, fetchedData]);

  const update = (field: keyof ProfileData, value: any) => setData((d) => ({ ...d, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveProfileToDb(data);
      toast({ title: "Saved!", description: "Profile updated successfully and is now live." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to save.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setSaving(true);
    try {
      await saveProfileToDb(defaultProfileData);
      setData(defaultProfileData);
      toast({ title: "Reset", description: "Profile reset to defaults." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to reset.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-navbar px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-navbar-foreground hover:opacity-80 transition"><ArrowLeft size={20} /></Link>
          <h1 className="text-navbar-foreground font-bold text-lg">Admin Panel</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-navbar-foreground/70 hover:text-navbar-foreground gap-1"><LogOut size={14} /> Logout</Button>
          <Button variant="outline" size="sm" onClick={handleReset} disabled={saving} className="text-xs">Reset</Button>
          <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-6 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="recognition">Recognition</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="teaching">Teaching</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card className="p-6 space-y-4">
              <h2 className="font-bold text-lg text-card-foreground">Profile Info</h2>
              <Field label="Name" value={data.name} onChange={(v) => update("name", v)} />
              <Field label="Title" value={data.title} onChange={(v) => update("title", v)} />
              <div>
                <label className="text-sm font-medium text-foreground">Bio</label>
                <Textarea value={data.bio} onChange={(e) => update("bio", e.target.value)} rows={4} />
              </div>
              <Field label="Email" value={data.email} onChange={(v) => update("email", v)} />
              <Field label="GitHub" value={data.github} onChange={(v) => update("github", v)} />
              <Field label="LinkedIn" value={data.linkedin} onChange={(v) => update("linkedin", v)} />
              <Field label="Twitter" value={data.twitter} onChange={(v) => update("twitter", v)} />
              <Field label="Kaggle" value={data.kaggle} onChange={(v) => update("kaggle", v)} />
              <Field label="DataCamp" value={data.datacamp} onChange={(v) => update("datacamp", v)} />
              <ImageUpload label="Profile Image" value={data.profileImage} onChange={(v) => update("profileImage", v)} folder="profile" />
              <Field label="Quote" value={data.quote} onChange={(v) => update("quote", v)} />
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="font-bold text-lg text-card-foreground">Stats</h2>
              {data.stats.map((s, i) => (
                <div key={i} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Label</label>
                    <Input value={s.label} onChange={(e) => {
                      const stats = [...data.stats];
                      stats[i] = { ...stats[i], label: e.target.value };
                      update("stats", stats);
                    }} />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Value</label>
                    <Input value={s.value} onChange={(e) => {
                      const stats = [...data.stats];
                      stats[i] = { ...stats[i], value: e.target.value };
                      update("stats", stats);
                    }} />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => update("stats", data.stats.filter((_, j) => j !== i))}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => update("stats", [...data.stats, { label: "", value: "" }])} className="gap-1">
                <Plus size={14} /> Add Stat
              </Button>
            </Card>

            <Card className="p-6 space-y-4">
              <h2 className="font-bold text-lg text-card-foreground">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {data.techStack.map((t, i) => (
                  <div key={i} className="flex items-center gap-1 bg-secondary rounded-lg px-2 py-1">
                    <Input value={t} onChange={(e) => {
                      const ts = [...data.techStack];
                      ts[i] = e.target.value;
                      update("techStack", ts);
                    }} className="w-24 h-6 text-xs border-0 bg-transparent p-0" />
                    <button onClick={() => update("techStack", data.techStack.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive">
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={() => update("techStack", [...data.techStack, ""])} className="gap-1">
                <Plus size={14} /> Add
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            {data.skills.map((skill, i) => (
              <Card key={i} className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-card-foreground">Skill {i + 1}</h3>
                  <Button variant="ghost" size="icon" onClick={() => update("skills", data.skills.filter((_, j) => j !== i))}><Trash2 size={14} /></Button>
                </div>
                <Field label="Title" value={skill.title} onChange={(v) => {
                  const s = [...data.skills]; s[i] = { ...s[i], title: v }; update("skills", s);
                }} />
                <div>
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <Textarea value={skill.description} onChange={(e) => {
                    const s = [...data.skills]; s[i] = { ...s[i], description: e.target.value }; update("skills", s);
                  }} rows={2} />
                </div>
                <Field label="Icon (brain, calculator, graduation-cap, sparkles)" value={skill.icon} onChange={(v) => {
                  const s = [...data.skills]; s[i] = { ...s[i], icon: v }; update("skills", s);
                }} />
              </Card>
            ))}
            <Button variant="outline" onClick={() => update("skills", [...data.skills, { title: "", description: "", icon: "sparkles" }])} className="gap-1">
              <Plus size={14} /> Add Skill
            </Button>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            {data.projects.map((project, i) => (
              <Card key={i} className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-card-foreground">Project {i + 1}</h3>
                    <div className="flex gap-1">
                      <Button variant="outline" size="icon" className="h-6 w-6" disabled={i === 0} onClick={() => {
                        const arr = [...data.projects]; [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; update("projects", arr);
                      }}><ChevronUp size={12} /></Button>
                      <Button variant="outline" size="icon" className="h-6 w-6" disabled={i === data.projects.length - 1} onClick={() => {
                        const arr = [...data.projects]; [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; update("projects", arr);
                      }}><ChevronDown size={12} /></Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => update("projects", data.projects.filter((_, j) => j !== i))}><Trash2 size={14} /></Button>
                </div>
                <Field label="Title" value={project.title} onChange={(v) => {
                  const p = [...data.projects]; p[i] = { ...p[i], title: v }; update("projects", p);
                }} />
                <ImageUpload label="Project Image/GIF (Upload)" value={project.emoji} onChange={(v) => {
                  const p = [...data.projects]; p[i] = { ...p[i], emoji: v }; update("projects", p);
                }} folder={`projects/${i}`} />
                <Field label="Or paste Image/GIF URL" value={project.emoji.startsWith("http") ? project.emoji : ""} onChange={(v) => {
                  const p = [...data.projects]; p[i] = { ...p[i], emoji: v }; update("projects", p);
                }} />
                <div>
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <Textarea value={project.description} onChange={(e) => {
                    const p = [...data.projects]; p[i] = { ...p[i], description: e.target.value }; update("projects", p);
                  }} rows={2} />
                </div>
                <Field label="Features (comma-separated)" value={project.features.join(", ")} onChange={(v) => {
                  const p = [...data.projects]; p[i] = { ...p[i], features: v.split(",").map((s) => s.trim()) }; update("projects", p);
                }} />
                <Field label="Stack (comma-separated)" value={project.stack.join(", ")} onChange={(v) => {
                  const p = [...data.projects]; p[i] = { ...p[i], stack: v.split(",").map((s) => s.trim()) }; update("projects", p);
                }} />
                <Field label="Repo URL" value={project.repoUrl} onChange={(v) => {
                  const p = [...data.projects]; p[i] = { ...p[i], repoUrl: v }; update("projects", p);
                }} />
              </Card>
            ))}
            <Button variant="outline" onClick={() => update("projects", [...data.projects, { title: "", emoji: "🚀", description: "", features: [], stack: [], repoUrl: "" }])} className="gap-1">
              <Plus size={14} /> Add Project
            </Button>
          </TabsContent>

          <TabsContent value="recognition" className="space-y-4">
            {data.recognitions.map((r, i) => (
              <Card key={i} className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-card-foreground">Recognition {i + 1}</h3>
                  <Button variant="ghost" size="icon" onClick={() => update("recognitions", data.recognitions.filter((_, j) => j !== i))}><Trash2 size={14} /></Button>
                </div>
                <Field label="Title" value={r.title} onChange={(v) => {
                  const rs = [...data.recognitions]; rs[i] = { ...rs[i], title: v }; update("recognitions", rs);
                }} />
                <Field label="Description" value={r.description} onChange={(v) => {
                  const rs = [...data.recognitions]; rs[i] = { ...rs[i], description: v }; update("recognitions", rs);
                }} />
                <Field label="Year" value={r.year} onChange={(v) => {
                  const rs = [...data.recognitions]; rs[i] = { ...rs[i], year: v }; update("recognitions", rs);
                }} />
                <Field label="Emoji" value={r.emoji} onChange={(v) => {
                  const rs = [...data.recognitions]; rs[i] = { ...rs[i], emoji: v }; update("recognitions", rs);
                }} />
              </Card>
            ))}
            <Button variant="outline" onClick={() => update("recognitions", [...data.recognitions, { title: "", description: "", year: "", emoji: "🏆" }])} className="gap-1">
              <Plus size={14} /> Add Recognition
            </Button>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-4">
            <h2 className="font-bold text-lg text-card-foreground">Certificates</h2>
            {data.certificates.map((c, i) => (
              <Card key={i} className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-card-foreground">Certificate {i + 1}</h3>
                  <Button variant="ghost" size="icon" onClick={() => update("certificates", data.certificates.filter((_, j) => j !== i))}><Trash2 size={14} /></Button>
                </div>
                <Field label="Title" value={c.title} onChange={(v) => {
                  const cs = [...data.certificates]; cs[i] = { ...cs[i], title: v }; update("certificates", cs);
                }} />
                <Field label="Issuer" value={c.issuer} onChange={(v) => {
                  const cs = [...data.certificates]; cs[i] = { ...cs[i], issuer: v }; update("certificates", cs);
                }} />
                <Field label="Year" value={c.year} onChange={(v) => {
                  const cs = [...data.certificates]; cs[i] = { ...cs[i], year: v }; update("certificates", cs);
                }} />
                <Field label="Category (e.g. Data Science, Educational, Generative AI & Prompt Engineering)" value={c.category || ""} onChange={(v) => {
                  const cs = [...data.certificates]; cs[i] = { ...cs[i], category: v }; update("certificates", cs);
                }} />
                <Field label="URL" value={c.url} onChange={(v) => {
                  const cs = [...data.certificates]; cs[i] = { ...cs[i], url: v }; update("certificates", cs);
                }} />
              </Card>
            ))}
            <Button variant="outline" onClick={() => update("certificates", [...data.certificates, { title: "", issuer: "", year: "", url: "", category: "" }])} className="gap-1">
              <Plus size={14} /> Add Certificate
            </Button>

            <div className="border-t border-border pt-6 mt-6">
              <h2 className="font-bold text-lg text-card-foreground mb-4">Badges</h2>
              {(data.badges || []).map((b, i) => (
                <Card key={i} className="p-6 space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm text-card-foreground">Badge {i + 1}</h3>
                    <Button variant="ghost" size="icon" onClick={() => update("badges", data.badges.filter((_, j) => j !== i))}><Trash2 size={14} /></Button>
                  </div>
                  <Field label="Title" value={b.title} onChange={(v) => {
                    const bs = [...data.badges]; bs[i] = { ...bs[i], title: v }; update("badges", bs);
                  }} />
                  <Field label="Issuer" value={b.issuer} onChange={(v) => {
                    const bs = [...data.badges]; bs[i] = { ...bs[i], issuer: v }; update("badges", bs);
                  }} />
                  <ImageUpload label="Badge Image" value={b.imageUrl} onChange={(v) => {
                    const bs = [...data.badges]; bs[i] = { ...bs[i], imageUrl: v }; update("badges", bs);
                  }} folder={`badges/${i}`} />
                  <Field label="URL" value={b.url} onChange={(v) => {
                    const bs = [...data.badges]; bs[i] = { ...bs[i], url: v }; update("badges", bs);
                  }} />
                </Card>
              ))}
              <Button variant="outline" onClick={() => update("badges", [...(data.badges || []), { title: "", issuer: "", imageUrl: "", url: "" }])} className="gap-1">
                <Plus size={14} /> Add Badge
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="teaching" className="space-y-4">
            {data.teaching.map((t, i) => (
              <Card key={i} className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-card-foreground">Role {i + 1}</h3>
                  <Button variant="ghost" size="icon" onClick={() => update("teaching", data.teaching.filter((_, j) => j !== i))}><Trash2 size={14} /></Button>
                </div>
                <Field label="Title" value={t.title} onChange={(v) => {
                  const ts = [...data.teaching]; ts[i] = { ...ts[i], title: v }; update("teaching", ts);
                }} />
                <Field label="Description" value={t.description} onChange={(v) => {
                  const ts = [...data.teaching]; ts[i] = { ...ts[i], description: v }; update("teaching", ts);
                }} />
                <Field label="Period" value={t.period} onChange={(v) => {
                  const ts = [...data.teaching]; ts[i] = { ...ts[i], period: v }; update("teaching", ts);
                }} />
                <Field label="Emoji" value={t.emoji} onChange={(v) => {
                  const ts = [...data.teaching]; ts[i] = { ...ts[i], emoji: v }; update("teaching", ts);
                }} />
              </Card>
            ))}
            <Button variant="outline" onClick={() => update("teaching", [...data.teaching, { title: "", description: "", period: "", emoji: "🎓" }])} className="gap-1">
              <Plus size={14} /> Add Role
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <div>
    <label className="text-sm font-medium text-foreground">{label}</label>
    <Input value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

export default Admin;
