// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/RecipeDetail";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>

      {/* Chatbot is outside Routes → so it shows everywhere */}
      <Chatbot />
    </Router>
  );
}

export default App;
