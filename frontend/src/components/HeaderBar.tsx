import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Menu, X, Search } from "lucide-react";

interface HeaderBarProps {
  onSearchClick: () => void;
}

export function HeaderBar({ onSearchClick }: HeaderBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-surface backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <span id="logozz" style={{ fontFamily: "var(--font-heading)", fontSize: "45px", fontWeight: "bold", color: "var(--color-primary)",textTransform: "none" }}>CINEPLEX</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <NavigationMenu>
                <NavigationMenuList className="flex gap-8">
                  <NavigationMenuItem>
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="text-body text-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
                    >
                      Home
                    </button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <button
                      onClick={() => {
                        const details = document.getElementById("movie-details");
                        details?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-body text-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
                    >
                      Discover
                    </button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <button
                      onClick={() => {
                        const footer = document.getElementById("footer");
                        footer?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-body text-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
                    >
                      About
                    </button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={onSearchClick}
                className="bg-transparent text-foreground hover:bg-surface hover:text-primary"
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={2} />
              </Button>

              <Button className="bg-primary text-primary-foreground hover:bg-[hsl(0,100%,60%)]">
                SUBSCRIBE
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="bg-transparent text-foreground hover:bg-surface"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" strokeWidth={2} />
                ) : (
                  <Menu className="w-6 h-6" strokeWidth={2} />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-16 right-0 w-64 h-[calc(100vh-4rem)] bg-surface p-8">
            <NavigationMenu orientation="vertical" className="w-full">
              <NavigationMenuList className="flex flex-col gap-6 w-full">
                <NavigationMenuItem className="w-full">
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setMobileMenuOpen(false);
                    }}
                    className="text-body text-foreground hover:text-primary transition-colors duration-200 cursor-pointer w-full text-left"
                  >
                    Home
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem className="w-full">
                  <button
                    onClick={() => {
                      const details = document.getElementById("movie-details");
                      details?.scrollIntoView({ behavior: "smooth" });
                      setMobileMenuOpen(false);
                    }}
                    className="text-body text-foreground hover:text-primary transition-colors duration-200 cursor-pointer w-full text-left"
                  >
                    Discover
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem className="w-full">
                  <button
                    onClick={() => {
                      const footer = document.getElementById("footer");
                      footer?.scrollIntoView({ behavior: "smooth" });
                      setMobileMenuOpen(false);
                    }}
                    className="text-body text-foreground hover:text-primary transition-colors duration-200 cursor-pointer w-full text-left"
                  >
                    About
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem className="w-full">
                  <Button
                    onClick={onSearchClick}
                    variant="ghost"
                    className="bg-transparent text-foreground hover:bg-background hover:text-primary w-full justify-start"
                  >
                    <Search className="w-5 h-5 mr-3" strokeWidth={2} />
                    Search
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem className="w-full mt-4">
                  <Button className="bg-primary text-primary-foreground hover:bg-[hsl(0,100%,60%)] w-full">
                    SUBSCRIBE
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      )}
    </>
  );
}
