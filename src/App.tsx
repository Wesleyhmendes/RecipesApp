import DrinkProvider from './context/apiContext/DrinkProvider';
import MealsProvider from './context/apiContext/MealProvider';
import UserInfoProvider from './context/UserInfo/UserInfoProvider';
import RoutesApp from './routes/RoutesApp';

export default function App() {
  return (
    <DrinkProvider>
      <UserInfoProvider>
      <MealsProvider>
        <RoutesApp />
      </MealsProvider>
     </UserInfoProvider>
    </DrinkProvider>
  );
}
