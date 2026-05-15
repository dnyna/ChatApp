import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../Screens/SignUp'
import Login from '../Screens/Login'
import ChatList from '../Screens/ChatList'
const Stack = createStackNavigator();

const StackNavigator = () => {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ChatList" component={ChatList} />

        </Stack.Navigator>
    );
}
export default StackNavigator