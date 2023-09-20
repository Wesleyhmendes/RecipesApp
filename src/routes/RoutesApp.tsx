import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Recipes from '../pages/Recipes';

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" Component={ Login } />
      <Route path="/meals" Component={ Recipes } />
    </Routes>
  );
}
