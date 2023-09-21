import DrinkProvider from './context/apiContext/DrinkProvider';
import MealsProvider from './context/apiContext/MealProvider';
import RoutesApp from './routes/RoutesApp';

export default function App() {
  return (
    <DrinkProvider>
      <MealsProvider>
        <RoutesApp />
      </MealsProvider>
    </DrinkProvider>
  );
}
