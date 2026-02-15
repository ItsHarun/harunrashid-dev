import React, { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/thinking", label: "Thinking" },
    { href: "/kue", label: "Kue" },
    { href: "/beliefs", label: "Beliefs" },
    { href: "/now", label: "Now" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background font-sans transition-colors duration-500">

      <header className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out px-6 md:px-12",
        scrolled || mobileMenuOpen
          ? "py-4 bg-background/95 backdrop-blur-md border-b border-border/40"
          : "py-6 md:py-12 bg-transparent border-b border-transparent"
      )}>
        <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
          <div className="pointer-events-auto relative z-[110]">
            <Link href="/" className="group block">
              <h1 className="font-mono text-sm tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                Harun Rashid
              </h1>
              {!scrolled && (
                <span className="text-xs text-muted-foreground block mt-1 opacity-0 group-hover:opacity-100 transition-opacity delay-75 duration-300">
                  Builder of Kue
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="pointer-events-auto hidden md:flex items-center gap-8 relative z-[110]">
            <div className="flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-mono text-[10px] tracking-tighter transition-all hover:text-foreground",
                    location === item.href
                      ? "text-foreground font-bold underline underline-offset-4"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden pointer-events-auto relative z-[110] p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[90] bg-background md:hidden transition-all duration-300 ease-in-out flex flex-col items-center justify-center",
        mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      )}>
        <nav className="flex flex-col items-center gap-8 p-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "font-mono text-xl tracking-tight transition-all hover:text-foreground",
                location === item.href
                  ? "text-foreground font-bold underline underline-offset-8"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <main className={cn("pt-48 pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-screen flex flex-col", className)}>
        {children}
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-6 md:p-12 flex justify-between items-end pointer-events-none z-40">
        <div className="font-mono text-[10px] text-muted-foreground/40 pointer-events-auto">
          &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
