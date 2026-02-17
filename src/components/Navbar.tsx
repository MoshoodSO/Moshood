import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  name: string;
}

const Navbar = ({ name }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navbar">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-navbar-foreground font-bold text-lg tracking-tight">
          {name.split(" ")[0]}
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {["skills", "projects", "recognitions", "teaching", "contact"].map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="text-navbar-foreground/70 hover:text-navbar-foreground text-sm font-medium capitalize transition-colors"
            >
              {s}
            </button>
          ))}
          <Link
            to="/admin"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Admin
          </Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-navbar-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-navbar border-t border-navbar-foreground/10 px-6 py-4 space-y-3">
          {["skills", "projects", "recognitions", "teaching", "contact"].map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="block w-full text-left text-navbar-foreground/70 hover:text-navbar-foreground text-sm font-medium capitalize"
            >
              {s}
            </button>
          ))}
          <Link to="/admin" className="block text-sm font-medium text-primary" onClick={() => setOpen(false)}>
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
