import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function StarRating({ rating }) {
  const stars = [];
  const rounded = Math.round(rating * 2) / 2; // round to nearest 0.5

  for (let i = 1; i <= 5; i++) {
    if (rounded >= i) {
      stars.push(<FaStar key={i} color="#ffd700" />);
    } else if (rounded + 0.5 === i) {
      stars.push(<FaStarHalfAlt key={i} color="#ffd700" />);
    } else {
      stars.push(<FaRegStar key={i} color="#ffd700" />);
    }
  }

  return <span style={{ display: "inline-flex", gap: "2px" }}>{stars}</span>;
}

function game_link(game) {
  // 1. Official website if available
  if (game.website) {
    return game.website;
  }

  // 2. If RAWG gives store links
  if (game.stores && game.stores.length > 0 && game.stores[0].store?.domain) {
    return `https://${game.stores[0].store.domain}`;
  }

  // 3. Fallback: Steam search
  const searchQuery = encodeURIComponent(game.name);
  return `https://store.steampowered.com/search/?term=${searchQuery}`;
}


function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    return <div className="movie-card">
        <div className="movie-poster">
            <a href={game_link(movie)} target="_blank" rel="noopener noreferrer">
                <img src={movie.background_image} alt={movie.name} />
            </a>
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.name}</h3>
            <p>{movie.genres?.map(g => g.name).join(", ")}</p>
            <p style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><StarRating rating={movie.rating} /><span>({movie.ratings_count} reviews)</span></p>
            <p>{movie.tags?.some(tag => tag.slug === "free-to-play") ? "Free to play" : "Paid title"}</p>
            <p>{movie.released?.split("-")[0]}</p>
        </div>
    </div>
}

export default MovieCard