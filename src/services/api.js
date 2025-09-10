const API_KEY = "cc9cdb701b104d00a98b6e22a9eab28e"
const BASE_URL = "https://rawg.io/api";

export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/games?key=${API_KEY}&ordering=-added&page_size=25`
  );
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/games?token&key=${API_KEY}&search=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};
