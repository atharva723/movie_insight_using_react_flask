const API_BASE = "http://localhost:5000";

/* ================================
   Types (VERY IMPORTANT)
================================ */

export interface CastMember {
  name: string;
  character: string;
  profile_path?: string | null;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster: string | null;
  backdrop: string | null;
  genres: string[];
  runtime: number;
  release_date: string;
  rating: number;
  language: string;
  cast: CastMember[];

  // ⭐ NEW
  trailerUrl?: string | null;
  watchUrl?: string | null;
}

export interface Recommendation {
  id: number;
  title: string;
  poster: string | null;
  backdrop: string | null;
  rating: number;
  year: string;
  similarity?: number;
}

/* ================================
   API RESPONSE TYPE
================================ */

interface FetchMovieResponse {
  movie: Movie;
  recommendations: Recommendation[];
}

/* ================================
   API CALL
================================ */

export async function fetchMovie(title: string): Promise<FetchMovieResponse> {
  const response = await fetch(`${API_BASE}/api/movie`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Failed to fetch movie");
  }

  return response.json();
}
