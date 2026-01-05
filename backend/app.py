import os
from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

# ==============================
# TMDB CONFIG
# ==============================
# ==============================
# TMDB CONFIG
# ==============================
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_BASE_URL = "https://api.themoviedb.org/3"
TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original"

if not TMDB_API_KEY:
    raise RuntimeError("TMDB_API_KEY is missing. Check your .env file.")


# ==============================
# LOAD AI MODEL
# ==============================
print("Loading sentence transformer model...")
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
print("✓ Model loaded successfully")

# ==============================
# CACHE FOR RECOMMENDATIONS
# ==============================
popular_movies = []
popular_embeddings = []

# ==============================
# FETCH POPULAR MOVIES
# ==============================
def fetch_popular_movies():
    global popular_movies, popular_embeddings

    if popular_movies:
        return

    print("Fetching popular movies for recommendations...")
    movies = []

    for page in range(1, 6):
        try:
            res = requests.get(
                f"{TMDB_BASE_URL}/movie/popular",
                params={"api_key": TMDB_API_KEY, "page": page},
                timeout=10
            )
            if res.status_code == 200:
                movies.extend(res.json().get("results", []))
        except:
            continue

    movies = [m for m in movies if m.get("overview")]

    texts = [f"{m['title']} {m['overview']}" for m in movies]
    popular_embeddings = model.encode(texts, show_progress_bar=False)
    popular_movies = movies

    print(f"✓ Cached {len(popular_movies)} movies")

# ==============================
# SEARCH MOVIE
# ==============================
def search_movie(title):
    res = requests.get(
        f"{TMDB_BASE_URL}/search/movie",
        params={"api_key": TMDB_API_KEY, "query": title},
        timeout=10
    )
    results = res.json().get("results", [])
    return results[0] if results else None

# ==============================
# GET MOVIE DETAILS
# ==============================
def get_movie_details(movie_id):
    res = requests.get(
        f"{TMDB_BASE_URL}/movie/{movie_id}",
        params={
            "api_key": TMDB_API_KEY,
            "append_to_response": "credits,watch/providers,videos"
        },
        timeout=10
    )
    return res.json() if res.status_code == 200 else None

# ==============================
# EXTRACT TRAILER
# ==============================
def extract_trailer(details):
    for v in details.get("videos", {}).get("results", []):
        if v.get("type") == "Trailer" and v.get("site") == "YouTube":
            return f"https://www.youtube.com/watch?v={v['key']}"
    return None

# ==============================
# EXTRACT WATCH LINK
# ==============================
def extract_watch_link(details, country="IN"):
    providers = details.get("watch/providers", {}).get("results", {})
    if country in providers:
        return providers[country].get("link")
    return None

# ==============================
# AI RECOMMENDATIONS
# ==============================
def get_similar_movies(movie):
    if not popular_movies:
        return []

    input_text = f"{movie['title']} {movie.get('overview', '')}"
    input_embedding = model.encode([input_text])

    similarities = cosine_similarity(input_embedding, popular_embeddings)[0]
    top_indices = similarities.argsort()[::-1]

    recommendations = []
    for i in top_indices:
        m = popular_movies[i]
        if m["id"] == movie["id"]:
            continue
        if similarities[i] < 0.25:
            continue

        recommendations.append({
            "id": m["id"],
            "title": m["title"],
            "poster": f"{TMDB_IMAGE_BASE}{m['poster_path']}" if m.get("poster_path") else None,
            "backdrop": f"{TMDB_IMAGE_BASE}{m['backdrop_path']}" if m.get("backdrop_path") else None,
            "rating": m.get("vote_average", 0),
            "year": m.get("release_date", "")[:4],
            "similarity": round(float(similarities[i]) * 100, 1)
        })

        if len(recommendations) == 6:
            break

    return recommendations

# ==============================
# FORMAT RESPONSE
# ==============================
def format_response(details, recommendations):
    cast = [
        {
            "name": a.get("name"),
            "character": a.get("character"),
            "profile_path": f"{TMDB_IMAGE_BASE}{a['profile_path']}" if a.get("profile_path") else None
        }
        for a in details.get("credits", {}).get("cast", [])[:5]
    ]

    trailer_url = extract_trailer(details)
    watch_url = extract_watch_link(details)

    return {
        "movie": {
            "id": details["id"],
            "title": details["title"],
            "overview": details.get("overview", ""),
            "poster": f"{TMDB_IMAGE_BASE}{details['poster_path']}" if details.get("poster_path") else None,
            "backdrop": f"{TMDB_IMAGE_BASE}{details['backdrop_path']}" if details.get("backdrop_path") else None,
            "genres": [g["name"] for g in details.get("genres", [])],
            "runtime": details.get("runtime"),
            "release_date": details.get("release_date"),
            "rating": details.get("vote_average"),
            "language": details.get("original_language", "").upper(),
            "cast": cast,

            # ⭐ NEW
            "trailerUrl": trailer_url,
            "watchUrl": watch_url
        },
        "recommendations": recommendations
    }

# ==============================
# API ROUTE
# ==============================
@app.route("/api/movie", methods=["POST"])
def get_movie():
    data = request.get_json()
    title = data.get("title")

    if not title:
        return jsonify({"error": "Movie title required"}), 400

    movie = search_movie(title)
    if not movie:
        return jsonify({"error": "Movie not found"}), 404

    details = get_movie_details(movie["id"])
    recommendations = get_similar_movies(movie)

    return jsonify(format_response(details, recommendations))

@app.route("/api/health")
def health():
    return jsonify({"status": "OK", "cached_movies": len(popular_movies)})

# ==============================
# START SERVER
# ==============================
if __name__ == "__main__":
    fetch_popular_movies()
    print("🎬 Movie Insight API running on port 5000")
    app.run(port=5000, debug=True)
