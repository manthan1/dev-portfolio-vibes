
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [{
  label: "Home",
  href: "#home"
}, {
  label: "About",
  href: "#about"
}, {
  label: "Projects",
  href: "#projects"
}, {
  label: "Our Process",
  href: "#skills"
}, {
  label: "Contact",
  href: "#contact"
}];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine scroll direction and apply visibility based on rules
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up or at top - show navbar
        setIsVisible(true);
      }

      // Close mobile menu when scrolling
      if (mobileMenuOpen && currentScrollY > 20) {
        setMobileMenuOpen(false);
      }

      // Update background style based on scroll position
      setIsScrolled(currentScrollY > 20);

      // Update last scroll position
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const handleNavigation = (href: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      // Add a small delay to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-3 glass" : "py-5 bg-transparent"} ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="container max-w-[95%] mx-auto flex items-center justify-between">
        {/* Logo on left with less padding */}
        <a 
          href="#home" 
          className="flex items-center font-bold font-display pl-1"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("#home");
          }}
        >
          <img 
            alt="PhazeAI Logo" 
            src="/lovable-uploads/948e89d2-a6b7-4de3-af06-8130d4feb947.jpg" 
            className="h-7 md:h-8 w-auto object-cover" 
          />
        </a>

        {/* Desktop Navigation on right with less padding */}
        <nav className="hidden md:flex items-center pr-1">
          <ul className="flex items-center gap-6">
            {navItems.map(item => (
              <li key={item.label}>
                <a 
                  href={item.href} 
                  className="font-medium text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.href);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="p-1 bg-background rounded-md backdrop-blur-sm border border-border/30" 
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="opacity-100" /> : <Menu className="opacity-100" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="glass absolute top-full left-0 right-0 py-4 px-6 md:hidden animate-fade-in">
          <ul className="flex flex-col gap-4">
            {navItems.map(item => (
              <li key={item.label}>
                <a 
                  href={item.href} 
                  className="block font-medium py-2 text-muted-foreground hover:text-foreground transition-colors" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.href);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
