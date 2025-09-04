import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Music, Image, Heart, User, Home, LogIn, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, loading } = useAuth();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/music", label: "Music", icon: Music },
    { href: "/gallery", label: "Gallery", icon: Image },
    { href: "/tributes", label: "Tributes", icon: Heart },
    { href: "/about", label: "About", icon: User },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-display text-xl font-bold text-foreground hover:text-accent transition-gentle"
          >
            James Baker
            <span className="text-accent ml-1 text-sm">(ReKaB)</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} to={href}>
                <Button
                  variant={isActive(href) ? "default" : "ghost"}
                  size="sm"
                  className={`transition-gentle ${
                    isActive(href) 
                      ? "bg-accent text-accent-foreground hover:bg-accent/90" 
                      : "text-foreground hover:bg-accent/10 hover:text-accent"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Button>
              </Link>
            ))}
            
            {/* Auth Button */}
            {!loading && (
              user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-foreground hover:bg-accent/10 hover:text-accent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Link to="/auth">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground hover:bg-accent/10 hover:text-accent"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-foreground hover:bg-accent/10 hover:text-accent"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-border bg-card/50"
            >
              <div className="py-4 space-y-2">
                {navItems.map(({ href, label, icon: Icon }) => (
                  <Link key={href} to={href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start transition-gentle ${
                        isActive(href)
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-accent/10 hover:text-accent"
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {label}
                    </Button>
                  </Link>
                ))}
                
                {/* Mobile Auth Button */}
                {!loading && (
                  user ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="w-full justify-start text-foreground hover:bg-accent/10 hover:text-accent"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  ) : (
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-foreground hover:bg-accent/10 hover:text-accent"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;