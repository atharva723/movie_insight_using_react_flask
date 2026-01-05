import React from "react";
import { GenreChips } from "./GenreChips";
import { CastList } from "./CastList";

/* ------------------ Types ------------------ */

interface CastMember {
  name: string;
  character: string;
  profile_path?: string | null;
}

interface MovieInfoPanelProps {
  poster: string;
  studioLogo?: string | null;
  studioName?: string | null;
  releaseDate: string;
  runtime: string;
  description: string;
  cast: CastMember[];
  genres: string[];
}

/* ------------------ Component ------------------ */

export function MovieInfoPanel({
  poster,
  studioLogo,
  studioName,
  releaseDate,
  runtime,
  description,
  cast,
  genres,
}: MovieInfoPanelProps) {
  return (
    <section
      id="movie-details"
      className="bg-[hsl(0,0%,5%)] py-16 lg:py-24 px-8 lg:px-16"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* ---------- Left Column : Poster ---------- */}
          <div className="lg:col-span-4">
            <div className="relative group">
              <img
                src={poster}
                alt={studioName || "Movie Poster"}
                className="w-full h-auto rounded-sm shadow-lg transition-transform duration-200 group-hover:-translate-y-1 animate-fadeIn"
                loading="lazy"
                style={{ aspectRatio: "2 / 3" }}
              />
            </div>
          </div>

          {/* ---------- Right Column : Info ---------- */}
          <div className="lg:col-span-8 flex flex-col gap-8">

            {/* Studio / Production */}
            {studioName && (
              <div className="flex items-center gap-4">
                {studioLogo && (
                  <img
                    src={studioLogo}
                    alt={studioName}
                    className="w-16 h-16 object-contain animate-fadeIn"
                    loading="lazy"
                  />
                )}
                <h2 className="text-h2 text-foreground">
                  {studioName}
                </h2>
              </div>
            )}

            {/* Release & Runtime */}
            <div className="flex flex-wrap gap-6 text-body text-muted">
              <div>
                <span className="text-label uppercase text-muted block mb-1">
                  Release Date
                </span>
                <span className="text-foreground">
                  {releaseDate}
                </span>
              </div>

              <div>
                <span className="text-label uppercase text-muted block mb-1">
                  Runtime
                </span>
                <span className="text-foreground">
                  {runtime}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-h3 text-foreground mb-4">
                Description
              </h3>
              <p className="text-body text-muted leading-relaxed">
                {description}
              </p>
            </div>

            {/* Cast */}
            {cast.length > 0 && (
              <div>
                <h3 className="text-h3 text-foreground mb-4">
                  Cast
                </h3>
                <CastList cast={cast} />
              </div>
            )}

            {/* Genres */}
            {genres.length > 0 && (
              <div>
                <h3 className="text-h3 text-foreground mb-4">
                  Genres
                </h3>
                <GenreChips genres={genres} />
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
