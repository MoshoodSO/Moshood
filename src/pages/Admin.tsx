import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { getProfileData, saveProfileData, ProfileData, defaultProfileData } from "@/data/profileData";

const Admin = () => {
  const [data, setData] = useState<ProfileData>(getProfileData());
  const { toast } = useToast();
  const navigate = useNavigate();

  const update = (field: keyof ProfileData, value: any) => setData((d) => ({ ...d, [field]: value }));

  const handleSave = () => {
    saveProfileData(data);
    toast({ title: "Saved!", description: "Profile updated successfully." });
  };

  const handleReset = () => {
    setData(defaultProfileData);
    saveProfileData(defaultProfileData);
    toast({ title: "Reset", description: "Profile reset to defaults." });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-navbar px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-navbar-foreground hover:opacity-80 transition"><ArrowLeft size={20} /></Link>
          <h1 className="text-navbar-foreground font-bold text-lg">Admin Panel</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-navbar-foreground/70 hover:text-navbar-foreground gap-1"><LogOut size={14} /> Logout</Button>
          <Button variant="outline" size="sm" onClick={handleReset} className="text-xs">Reset</Button>
          <Button size="sm" onClick={handleSave} className="gap-1"><Save size={14} /> Save</Button>
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
              <Field label="Profile Image URL" value={data.profileImage} onChange={(v) => update("profileImage", v)} />
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
                  <h3 className="font-bold text-sm text-card-foreground">Project {i + 1}</h3>
                  <Button variant="ghost" size="icon" onClick={() => update("projects", data.projects.filter((_, j) => j !== i))}><Trash2 size={14} /></Button>
                </div>
                <Field label="Title" value={project.title} onChange={(v) => {
                  const p = [...data.projects]; p[i] = { ...p[i], title: v }; update("projects", p);
                }} />
                <Field label="Emoji" value={project.emoji} onChange={(v) => {
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
                <Field label="URL" value={c.url} onChange={(v) => {
                  const cs = [...data.certificates]; cs[i] = { ...cs[i], url: v }; update("certificates", cs);
                }} />
              </Card>
            ))}
            <Button variant="outline" onClick={() => update("certificates", [...data.certificates, { title: "", issuer: "", year: "", url: "" }])} className="gap-1">
              <Plus size={14} /> Add Certificate
            </Button>
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
