import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Play, ExternalLink } from "lucide-react";

interface HeroMovieHighlightProps {
  category: string;
  title: string;
  year: string;
  genres: string[];
  runtime: string;
  heroImage: string;
  trailerUrl?: string | null;
  watchUrl?: string | null;
  onScrollClick: () => void;
}

export function HeroMovieHighlight({
  category,
  title,
  year,
  genres,
  runtime,
  heroImage,
  trailerUrl,
  watchUrl,
  onScrollClick,
}: HeroMovieHighlightProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover animate-fadeIn"
          loading="eager"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-start justify-end px-8 lg:px-16 pb-24 text-left">
        <div className="max-w-4xl mr-auto">
          {/* Category Label */}
          <div className="mb-4">
            <span className="text-label uppercase text-primary tracking-wider">
              {category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            {title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center justify-start gap-4 mb-8 text-body text-muted">
            <span>{year}</span>
            <span>•</span>
            <span>{genres.join(", ")}</span>
            <span>•</span>
            <span>{runtime}</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 justify-start">
            {/* 🎬 Trailer Button */}
            {trailerUrl ? (
              <a
                href={trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-[hsl(0,100%,60%)] transition-all duration-200 hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" strokeWidth={2} />
                  TRAILER
                </Button>
              </a>
            ) : (
              <Button size="lg" disabled>
                <Play className="w-5 h-5 mr-2" />
                TRAILER
              </Button>
            )}

            {/* 🍿 Watch Now Button */}
            {watchUrl ? (
              <a
                href={watchUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/70 text-white hover:bg-white hover:text-black transition-all duration-200 hover:scale-105"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  WATCH NOW
                </Button>
              </a>
            ) : (
              <Button size="lg" variant="outline" disabled>
                <ExternalLink className="w-5 h-5 mr-2" />
                WATCH NOW
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={onScrollClick}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer bg-transparent border-none"
        aria-label="Scroll to details"
      >
        <ChevronDown className="w-12 h-12 text-foreground" strokeWidth={1} />
      </button>
    </section>
  );
}
