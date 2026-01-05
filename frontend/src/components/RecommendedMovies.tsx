import React from "react";
import type { Recommendation } from "../services/movieApi";

interface RecommendedMoviesProps {
  recommendations: Recommendation[];
  onMovieClick: (title: string) => void;
}

export const RecommendedMovies: React.FC<RecommendedMoviesProps> = ({
  recommendations,
  onMovieClick,
}) => {
  if (!Array.isArray(recommendations) || recommendations.length === 0) {
    return null;
  }

  return (
    <section
      className="px-8 py-10"
      style={{ backgroundColor: "#0a0f13a7" }}
    >
      <h2 className="text-2xl font-semibold mb-6">
        Recommended Movies
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recommendations.map((movie) => {
          const image = movie.backdrop || movie.poster;

          return (
            <button
              key={movie.id}
              onClick={() => onMovieClick(movie.title)}
              className="group relative rounded-lg overflow-hidden hover:scale-105 transition-transform"
            >
              {image ? (
                <img
                  src={image}
                  alt={movie.title}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-40 bg-muted flex items-center justify-center text-xs text-muted-foreground">
                  No Image
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                <p className="text-sm text-white font-medium">
                  {movie.title}
                </p>
                <p className="text-xs text-white/70">
                  {movie.year} • ⭐ {movie.rating.toFixed(1)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
