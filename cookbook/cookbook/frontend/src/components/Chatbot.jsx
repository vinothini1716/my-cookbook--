import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { searchMeal, getRandomMeal, getMealById } from '../api';

function formatIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) list.push(`${measure ? measure.trim() : ''} ${ing.trim()}`.trim());
  }
  return list;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi 👋 I can fetch recipes. Ask: "Show me chicken curry", "random", or "id 52772".' }
  ]);
  const [input, setInput] = useState('');

  const pushMessage = (msg) => setMessages((m) => [...m, msg]);

  const handleQuery = async (text) => {
    text = text.trim();
    if (!text) return;

    pushMessage({ from: 'user', text });

    try {
      // "random" -> random meal
      if (text.toLowerCase() === 'random') {
        const data = await getRandomMeal();
        const meal = data.meals && data.meals[0];
        if (meal) displayMealResponse(meal);
        else pushMessage({ from: 'bot', text: "Couldn't fetch a random meal right now." });
        return;
      }

      // "id 52772" or "52772"
      const idMatch = text.match(/(?:id\\s*)?(\\d{4,7})$/i);
      if (idMatch) {
        const id = idMatch[1];
        const d = await getMealById(id);
        const meal = d.meals && d.meals[0];
        if (meal) displayMealResponse(meal);
        else pushMessage({ from: 'bot', text: `No recipe found for id ${id}.` });
        return;
      }

      // else treat the input as a meal name search
      const res = await searchMeal(text);
      if (res.meals && res.meals.length > 0) {
        // choose best match (first)
        displayMealResponse(res.meals[0]);
      } else {
        pushMessage({ from: 'bot', text: `I couldn't find "${text}". Try a different name or 'random'.` });
      }
    } catch (err) {
      console.error(err);
      pushMessage({ from: 'bot', text: 'Error while searching. Try again.' });
    }
  };

  const displayMealResponse = (meal) => {
    // basic overview
    pushMessage({
      from: 'bot',
      text: `Found: ${meal.strMeal} (${meal.strArea || meal.strCategory || 'Unknown origin'})`
    });
    // image (bot message carries image URL)
    pushMessage({ from: 'bot', image: meal.strMealThumb, text: '' });

    // ingredients
    const ingredients = formatIngredients(meal);
    pushMessage({
      from: 'bot',
      text: `Ingredients:\n- ${ingredients.join('\n- ')}`
    });

    // instructions
    pushMessage({
      from: 'bot',
      text: `Instructions:\n${meal.strInstructions || 'No instructions provided.'}`
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    handleQuery(input);
    setInput('');
  };

  return (
    <Draggable handle=".chat-header">
      <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 9999 }}>
        {!open ? (
          <button className="chat-btn" onClick={() => setOpen(true)}>
            <img src="/chatbot-logo.png" alt="bot" style={{ width: 48, height: 48 }} />
          </button>
        ) : (
          <div className="chat-window">
            <div className="chat-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 600 }}>Cookbook Bot</div>
              <div>
                <button onClick={() => setOpen(false)} style={{ marginRight: 6 }}>_</button>
                <button onClick={() => setOpen(false)}>✖</button>
              </div>
            </div>

            <div className="chat-body">
              {messages.map((m, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  {m.from === 'bot' ? (
                    <div className="bot-msg">
                      {m.text && <div style={{ whiteSpace: 'pre-line' }}>{m.text}</div>}
                      {m.image && <img src={m.image} alt="" style={{ width: '100%', borderRadius: 8, marginTop: 8 }} />}
                    </div>
                  ) : (
                    <div className="user-msg">{m.text}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Ask: "Show me masala dosa" or "random" or "id 52772"'
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
}
