import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/Login';
import Recipes from './components/Recipes';

function App() {
  return (
    <Routes>
      <Route path="/" Component={ LoginForm } />
      <Route path="/meals" Component={ Recipes } />
    </Routes>
  );
}

export default App;
