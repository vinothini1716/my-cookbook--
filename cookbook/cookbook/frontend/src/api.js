const BASE_URL = "https://www.themealdb.com/api/json/v1/1";
const BACKEND = "http://localhost:5000/favourites";

export async function searchMeal(name) {
  const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`);
  return res.json();
}

export async function getRandomMeal() {
  const res = await fetch(`${BASE_URL}/random.php`);
  return res.json();
}

export async function getMealById(id) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  return res.json();
}

export async function addFavourite(data) {
  const res = await fetch(BACKEND, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getFavourites(userId='guest') {
  const res = await fetch(`${BACKEND}/${userId}`);
  return res.json();
}

export async function deleteFavourite(id) {
  const res = await fetch(`${BACKEND}/${id}`, { method: 'DELETE' });
  return res.json();
}
