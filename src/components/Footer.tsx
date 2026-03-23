import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { getProfileData } from "@/data/profileData";
import logo from "@/assets/MoshLogo.png";

const Footer = () => {
  const data = getProfileData();

  const socialLinks = [
    { icon: Github, href: data.github, label: "GitHub" },
    { icon: Linkedin, href: data.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: data.twitter, label: "Twitter" },
    { icon: Mail, href: `mailto:${data.email}`, label: "Email" },
  ].filter((l) => l.href);

  const navLinks = [
    { label: "Skills", path: "/skills" },
    { label: "Projects", path: "/projects" },
    { label: "Recognitions", path: "/recognitions" },
    { label: "Certificates", path: "/certificates" },
    { label: "Teaching", path: "/teaching" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-navbar text-navbar-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <span className="font-bold text-lg">{data.name}</span>
            </Link>
            <p className="text-sm text-navbar-foreground/60 leading-relaxed max-w-xs">
              {data.title}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-navbar-foreground/80">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-navbar-foreground/60 hover:text-navbar-foreground transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-navbar-foreground/80">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 rounded-lg bg-navbar-foreground/10 flex items-center justify-center text-navbar-foreground/70 hover:text-navbar-foreground hover:bg-navbar-foreground/20 transition"
                >
                  <link.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-navbar-foreground/10 pt-6 text-center text-xs text-navbar-foreground/40">
          © {new Date().getFullYear()} {data.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
