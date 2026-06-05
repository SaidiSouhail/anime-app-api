const BASE_URL = "https://api.jikan.moe/v4";

export const getTopAnime = async () => {
  const res = await fetch(`${BASE_URL}/top/anime`);
  const data = await res.json();
  return data;
};

export const getAnimeByGenre = async (genreId) => {
  const res = await fetch(`${BASE_URL}/anime?genres=${genreId}`);
  const data = await res.json();
  return data;
};

export const getAnimeDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/anime/${id}/full`);
  const data = await res.json();
  return data;
};