import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

interface FooterToolbarProps {
  onScrollToTop: () => void;
}

export function FooterToolbar({ onScrollToTop }: FooterToolbarProps) {
  return (
    <footer id="footer" className="bg-surface py-8 px-8 lg:px-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-body text-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => {
                const details = document.getElementById("movie-details");
                details?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-body text-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
            >
              Discover
            </button>
            <button
              onClick={() => {
                const footer = document.getElementById("footer");
                footer?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-body text-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Copyright */}
          <div className="text-body text-muted text-center lg:text-left">
            © Made with ❤️ Atharva Jadhav.
          </div>

          {/* Scroll to Top Button */}
          <Button
            onClick={onScrollToTop}
            size="icon"
            className="bg-primary text-primary-foreground hover:bg-[hsl(0,100%,60%)] rounded-full w-12 h-12"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" strokeWidth={2} />
          </Button>
        </div>
      </div>
    </footer>
  );
}
