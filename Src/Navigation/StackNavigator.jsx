import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../Screens/SignUp'
import Login from '../Screens/Login'
import BottomTab from './BottomTab'
const Stack = createStackNavigator();

const StackNavigator = () => {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name='MainTab' component={BottomTab} />
        </Stack.Navigator>
    );
}
export default StackNavigator