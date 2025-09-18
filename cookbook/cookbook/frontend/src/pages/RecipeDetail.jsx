import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMealById } from '../api';
import Timer from '../components/Timer';

export default function RecipeDetail({ theme, setTheme }) {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    async function load() {
      const d = await getMealById(id);
      if (d.meals && d.meals[0]) setMeal(d.meals[0]);
    }
    load();
  }, [id]);

  if (!meal) return <div style={{ padding: 20 }}>Loading...</div>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal['strIngredient' + i];
    const mea = meal['strMeasure' + i];
    if (ing && ing.trim()) {
      ingredients.push(`${mea ? mea.trim() : ''} ${ing.trim()}`.trim());
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <h1 style={{ fontSize: 32, margin: 0 }}>{meal.strMeal}</h1>
        <p style={{ margin: '6px 0 0', color: '#ccc' }}>{meal.strArea} • {meal.strCategory}</p>
      </div>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '80%', maxWidth: 520, borderRadius: 12 }} />
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <section style={{ flex: 1 }}>
          <h3>Ingredients</h3>
          <ul style={{ lineHeight: 1.8 }}>
            {ingredients.map((it, idx) => <li key={idx}>{it}</li>)}
          </ul>
        </section>

        <section style={{ flex: 2 }}>
          <h3>Instructions</h3>
          <p style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>{meal.strInstructions}</p>
        </section>
      </div>

      {/* Floating timer placed bottom-right */}
      <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 999 }}>
        <Timer />
      </div>
    </div>
  );
}
