export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  email: string;
  linkedin: string;
  twitter: string;
  github: string;
  kaggle: string;
  datacamp: string;
  profileImage: string;
  skills: SkillCategory[];
  projects: Project[];
  recognitions: Recognition[];
  teaching: TeachingRole[];
  certificates: Certificate[];
  badges: BadgeItem[];
  techStack: string[];
  stats: { label: string; value: string }[];
  quote: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  title: string;
  description: string;
  features: string[];
  stack: string[];
  repoUrl: string;
  emoji: string;
}

export interface Recognition {
  title: string;
  description: string;
  year: string;
  emoji: string;
}

export interface TeachingRole {
  title: string;
  description: string;
  period: string;
  emoji: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  url: string;
  category: string;
}

export interface BadgeItem {
  title: string;
  issuer: string;
  imageUrl: string;
  url: string;
}

export const defaultProfileData: ProfileData = {
  name: "Moshood Shoyombo",
  title: "Mathematician | Data Scientist | NLP & Generative AI Researcher",
  bio: "I'm a passionate mathematician and researcher with a strong focus on Data Science, Natural Language Processing, and Generative AI. My work blends rigorous mathematical reasoning with modern computational methods to build intelligent models, analyze complex datasets, and develop innovative language-focused AI systems.",
  email: "shoyombomoshood1@gmail.com",
  linkedin: "https://www.linkedin.com/in/shoyombo-moshood-582003126",
  twitter: "https://twitter.com/horlar_1st",
  github: "https://github.com/MoshoodSO",
  kaggle: "https://www.kaggle.com/moshood12",
  datacamp: "https://www.datacamp.com/portfolio/moshood-8efbc2c2-a9ba-4bb7-a536-0af17a8713fd",
  profileImage: "",
  skills: [
    {
      title: "Data Science & NLP",
      description: "Build ML models for NLP, sentiment analysis, and text processing using Python, scikit-learn, TensorFlow, and HuggingFace.",
      icon: "brain",
    },
    {
      title: "Mathematics & Research",
      description: "Strong foundation in mathematical reasoning, statistics, and theoretical modeling applied to computational challenges.",
      icon: "calculator",
    },
    {
      title: "Teaching & Mentorship",
      description: "Teach and mentor students at all levels in mathematics, statistics, programming, and data science across Nigeria and Africa.",
      icon: "graduation-cap",
    },
    {
      title: "Generative AI",
      description: "Explore and build generative AI systems, prompt engineering applications, and AI-driven research tools.",
      icon: "sparkles",
    },
  ],
  projects: [
    {
      title: "Financial Inclusion App",
      emoji: "🧑🏾‍⚖️",
      description: "A web-based application to help young people track, validate, and manage documents for banking, improve financial literacy, and access youth-friendly financial services.",
      features: ["Banking Document Manager", "Financial Education Hub", "Banking Service Directory"],
      stack: ["Python", "CSS", "TypeScript"],
      repoUrl: "https://github.com/Horlar-1st/Financial-Inclusion-among-Young-People/",
    },
    {
      title: "Research4me - AI Research Assistant",
      emoji: "🤖📚",
      description: "An AI-powered research assistant app for researchers and professionals who need to quickly analyze and extract insights from research documents.",
      features: ["Document Upload & Processing", "AI-Powered Assistant", "Multiple file format support"],
      stack: ["TypeScript", "JavaScript", "Node.js", "Python"],
      repoUrl: "https://github.com/MoshoodSO/AI-Powered-Research-Assistant-App",
    },
    {
      title: "GPA Genius - AI GPA Calculator",
      emoji: "🤖📊",
      description: "A smart web app that helps students calculate GPAs, visualize progress over time, and turn academic data into clear, actionable insights.",
      features: ["GPA per semester", "Grading Scale setting", "Cumulative GPA tracking", "Academic trend visualization"],
      stack: ["TypeScript", "JavaScript", "Node.js"],
      repoUrl: "https://github.com/MoshoodSO/GPA-Calculator",
    },
  ],
  recognitions: [
    { title: "Overall Best MSc Graduate (LASU, 2024)", description: "Graduated with a perfect CGPA (5.00/5.00).", year: "2024", emoji: "🎗" },
    { title: "Best Graduating Student – BSc Mathematics (LASU, 2021)", description: "Top-performing student in the Mathematics department.", year: "2021", emoji: "🥇" },
    { title: "People's Choice Award – AIMS Ghana Quantathon (2025)", description: "Developed TraffiQ, a quantum–AI traffic optimization system.", year: "2025", emoji: "🏅" },
    { title: "Mastercard Foundation Scholar (2024–2025)", description: "Advanced training in leadership, innovation, and academic excellence at AIMS Ghana.", year: "2024", emoji: "🎓" },
    { title: "SPARK Academy Certificate (2025)", description: "Completed training in Medical Imaging and Machine Learning.", year: "2025", emoji: "📜" },
    { title: "LinkedIn Learning Certifications (2025–2026)", description: "AI Projects with Python, TensorFlow, NLTK, Data Visualization, and more.", year: "2025", emoji: "📜" },
  ],
  teaching: [
    { title: "GenAI & Prompt Engineering Assistant", description: "Supporting learners in Generative AI and prompt engineering programs through mentorship and guided projects.", period: "2026–Present", emoji: "🌍" },
    { title: "Graduate Intern – Codeveda", description: "Working on data analysis and software development tasks.", period: "Jan 2026–Present", emoji: "💻" },
    { title: "Assistant Lecturer (Statistics)", description: "Taught undergraduate courses in statistics and mathematics at Ogun State Institute of Technology.", period: "2023–2024", emoji: "🎓" },
    { title: "Da-Google Mathematics Competition", description: "Designed and led a national mathematics competition, mentoring secondary school students.", period: "2021–Present", emoji: "🧠" },
  ],
  certificates: [
    { title: "AI Projects with Python: Generative AI", issuer: "LinkedIn Learning", year: "2025", url: "https://www.linkedin.com/learning/certificates" },
    { title: "TensorFlow for AI Development", issuer: "LinkedIn Learning", year: "2025", url: "https://www.linkedin.com/learning/certificates" },
    { title: "Natural Language Processing with Python", issuer: "LinkedIn Learning", year: "2025", url: "https://www.linkedin.com/learning/certificates" },
    { title: "Data Visualization: Best Practices", issuer: "LinkedIn Learning", year: "2025", url: "https://www.linkedin.com/learning/certificates" },
    { title: "NLTK for Text Processing", issuer: "LinkedIn Learning", year: "2025", url: "https://www.linkedin.com/learning/certificates" },
    { title: "SPARK Academy – Medical Imaging & ML", issuer: "SPARK Academy", year: "2025", url: "" },
    { title: "Mastercard Foundation Scholarship", issuer: "AIMS Ghana", year: "2024", url: "" },
    { title: "Data Science Professional Certificate", issuer: "DataCamp", year: "2024", url: "https://www.datacamp.com/portfolio/moshood-8efbc2c2-a9ba-4bb7-a536-0af17a8713fd" },
  ],
  techStack: ["Python", "R", "SQL", "Julia", "LaTeX", "TensorFlow", "scikit-learn", "Pandas", "NumPy", "HuggingFace", "NLTK", "Gradio", "Git", "Jupyter"],
  stats: [
    { label: "CGPA", value: "5.00/5.00" },
    { label: "Projects", value: "10+" },
    { label: "Certifications", value: "15+" },
    { label: "Awards", value: "5+" },
  ],
  quote: "Mathematics reveals the hidden structure of the universe – and I am passionate about guiding others to see it clearly.",
};

export function getProfileData(): ProfileData {
  const stored = localStorage.getItem("profileData");
  if (stored) {
    try {
      return { ...defaultProfileData, ...JSON.parse(stored) };
    } catch {
      return defaultProfileData;
    }
  }
  return defaultProfileData;
}

export function saveProfileData(data: ProfileData) {
  localStorage.setItem("profileData", JSON.stringify(data));
}
