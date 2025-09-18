import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addFavourite } from '../api';

export default function RecipeCard({ meal }) {
  const navigate = useNavigate();

  const handleCook = () => {
    navigate(`/recipe/${meal.idMeal || meal.id}`);
  };

  const handleFav = async (e) => {
    e.stopPropagation();
    try {
      await addFavourite({
        userId: 'guest',
        mealId: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        origin: meal.strArea
      });
      alert('Saved to favourites');
    } catch (err) {
      console.error(err);
      alert('Failed to save favourite');
    }
  };

  return (
    <div className="recipe-card" onClick={handleCook}>
      <div className="card-img" style={{ backgroundImage: `url(${meal.strMealThumb})` }} />
      <div className="card-body">
        <h3 style={{ margin: 0 }}>{meal.strMeal}</h3>
        <p className="origin" style={{ margin: '6px 0', color: '#bbb' }}>{meal.strArea}</p>
        <div className="card-actions">
          <button onClick={handleFav}>❤️</button>
          <button onClick={handleCook}>Let's Cook</button>
        </div>
      </div>
    </div>
  );
}
