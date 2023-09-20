import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './MyTabs';
import UserStore from './UserStore';

export default function App() {
  return (
    <UserStore>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </UserStore>
  );
}