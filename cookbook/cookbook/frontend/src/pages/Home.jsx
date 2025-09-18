import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { getRandomMeal, getFavourites } from '../api';

export default function Home({ theme, setTheme }) {
  const [meals, setMeals] = useState([]);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // load 8 random meals
    let mounted = true;
    async function load() {
      const arr = [];
      for (let i = 0; i < 24; i++) {
        try {
          const d = await getRandomMeal();
          if (d.meals && d.meals[0]) arr.push(d.meals[0]);
        } catch (e) {
          // ignore
        }
      }
      if (mounted) setMeals(arr);
    }
    load();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    // fetch favourites for the demo user 'guest'
    async function loadFavs() {
      try {
        const data = await getFavourites('guest'); // change userId if you have a user system
        setFavourites(data || []);
      } catch (e) {
        console.error('Failed to load favourites', e);
      }
    }
    loadFavs();
  }, []);

  return (
    <div>
      <Header theme={theme} setTheme={setTheme} />
      <main className="container">
        {favourites && favourites.length > 0 && (
          <section style={{ marginBottom: 20 }}>
            <h2 style={{ margin: '8px 0', fontSize: 20 }}>My Favourites</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {favourites.map((f) => {
                // favourites saved have mealId and name and image
                const mealLike = {
                  idMeal: f.mealId,
                  strMeal: f.name,
                  strMealThumb: f.image,
                  strArea: f.origin
                };
                return <RecipeCard key={f._id || f.mealId} meal={mealLike} />;
              })}
            </div>
          </section>
        )}

        <section>
          <h2 style={{ margin: '18px 0 8px', fontSize: 20 }}>Discover</h2>
          <div className="grid">
            {meals.map((m) => (
              <RecipeCard key={m.idMeal} meal={m} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
