import { useState, useEffect } from "react";
import { HeaderBar } from "./components/HeaderBar";
import { HeroMovieHighlight } from "./components/HeroMovieHighlight";
import { MovieInfoPanel } from "./components/MovieInfoPanel";
import { RecommendedMovies } from "./components/RecommendedMovies";
import { FooterToolbar } from "./components/FooterToolbar";
import { SimpleSearchModal } from "./components/SimpleSearchModal";
import { LandingHero } from "./components/LandingHero";

import { fetchMovie } from "./services/movieApi";
import type { Movie, Recommendation } from "./services/movieApi";

function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  /* 🔹 Cmd/Ctrl + K shortcut */
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  /* 🔹 Fetch movie */
  const loadMovie = async (title: string) => {
    try {
      setLoading(true);
      const data = await fetchMovie(title);
      setMovie(data.movie);
      setRecommendations(data.recommendations || []);
      setCommandOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToDetails = () => {
    document
      .getElementById("movie-details")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeaderBar onSearchClick={() => setCommandOpen(true)} />

      <main>
        {/* 🎥 CINEMATIC LANDING */}
        {!movie && !loading && (
          <LandingHero onSearch={loadMovie} />
        )}

        {/* ⏳ INITIAL LOADING */}
        {loading && !movie && (
          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        )}

        {/* 🎬 MOVIE CONTENT */}
        {movie && (
          <>
            <HeroMovieHighlight
              category="MOVIE"
              title={movie.title}
              year={movie.release_date?.slice(0, 4) || ""}
              genres={movie.genres}
              runtime={movie.runtime ? `${movie.runtime} min` : ""}
              heroImage={movie.backdrop || ""}
              trailerUrl={movie.trailerUrl}
              watchUrl={movie.watchUrl}
              onScrollClick={scrollToDetails}
            />

            <div id="movie-details">
              <MovieInfoPanel
                poster={movie.poster || ""}
                studioLogo={null}
                studioName={null}
                releaseDate={movie.release_date || ""}
                runtime={movie.runtime ? `${movie.runtime} min` : ""}
                description={movie.overview || ""}
                cast={movie.cast}
                genres={movie.genres}
              />
            </div>

            {recommendations.length > 0 && (
              <RecommendedMovies
                recommendations={recommendations}
                onMovieClick={loadMovie}
              />
            )}
          </>
        )}
      </main>

      <FooterToolbar onScrollToTop={scrollToTop} />

      {/* 🔍 SEARCH MODAL */}
      <SimpleSearchModal
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onSearch={loadMovie}
      />
    </div>
  );
}

export default App;
