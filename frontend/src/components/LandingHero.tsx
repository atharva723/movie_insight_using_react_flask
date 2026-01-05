import { useState } from "react";
import bgVideo from "../assests/bg-video.mp4";

interface LandingHeroProps {
  onSearch: (query: string) => void;
}

export function LandingHero({ onSearch }: LandingHeroProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        
      >
        <source src="/public/videos/hero-video.mp4" type="video/mp4" />
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Center Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">
          Discover Movies That Match Your Taste
        </h1>

        <form onSubmit={handleSubmit} className="w-full max-w-xl">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="w-full px-6 py-4 rounded-full text-lg bg-black/70 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </form>

        <p className="mt-6 text-sm text-white/60">
          Scroll to explore • AI-powered recommendations
        </p>
      </div>
    </section>
  );
}
