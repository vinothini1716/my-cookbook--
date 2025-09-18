import { useEffect, useState } from "react";

export default function FavouritesPage() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/favourites/testuser") // replace with real user ID later
      .then(res => res.json())
      .then(data => setFavs(data));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">My Favourites ❤️</h1>
      <div className="grid grid-cols-4 gap-6">
        {favs.map(f => (
          <div key={f._id} className="border rounded-lg p-4 hover:shadow-lg dark:border-gray-700">
            <img src={f.image} alt={f.name} className="mx-auto rounded-lg" />
            <h2 className="text-lg font-semibold text-center mt-2">{f.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{f.origin}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
