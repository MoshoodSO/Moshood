import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/MoshLogo.png";

interface NavbarProps {
  name: string;
}

const navLinks = [
  { label: "Skills", path: "/skills" },
  { label: "Projects", path: "/projects" },
  { label: "Recognitions", path: "/recognitions" },
  { label: "Certificates", path: "/certificates" },
  { label: "Teaching", path: "/teaching" },
  { label: "Contact", path: "/contact" },
];

const Navbar = ({ name }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navbar">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-navbar-foreground font-bold text-lg tracking-tight">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          {name.split(" ")[0]}
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium capitalize transition-colors ${
                location.pathname === link.path
                  ? "text-navbar-foreground"
                  : "text-navbar-foreground/70 hover:text-navbar-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-navbar-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-navbar border-t border-navbar-foreground/10 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`block text-sm font-medium capitalize ${
                location.pathname === link.path
                  ? "text-navbar-foreground"
                  : "text-navbar-foreground/70 hover:text-navbar-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
