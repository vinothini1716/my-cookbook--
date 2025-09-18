import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMeal, getRandomMeal } from '../api';

export default function Header({ theme, setTheme }) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!q) return;
    const data = await searchMeal(q);
    // if result found, navigate to first match detail or show results on Home (simple: go to first)
    if (data.meals && data.meals[0]) {
      navigate(`/recipe/${data.meals[0].idMeal}`);
    } else {
      alert('No results found');
    }
  };

  const handleSurprise = async () => {
    const data = await getRandomMeal();
    if (data.meals && data.meals[0]) {
      navigate(`/recipe/${data.meals[0].idMeal}`);
    }
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <img src="/logo.png" alt="logo" className="logo"/>
        <h1 className="title">My Cookbook</h1>
      </div>
      <div className="header-center">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search meal by name..."/>
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleSurprise}>Surprise Me</button>
      </div>
      <div className="header-right">
        <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? '🌙' : ''}
        </button>
        <button className="fav-btn">❤️</button>
      </div>
    </header>
  );
}
