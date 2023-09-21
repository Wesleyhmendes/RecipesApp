import UserInfoProvider from './context/UserInfo/UserInfoProvider';
import RoutesApp from './routes/RoutesApp';

export default function App() {
  return (
    <UserInfoProvider>
      <RoutesApp />
    </UserInfoProvider>
  );
}
