import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import SignUp from '../Screens/SignUp'
import Login from '../Screens/Login'
import BottomTab from './BottomTab'
import GetStarted from '../Screens/GetStarted'
import Chats from '../Screens/Chats'
const Stack = createStackNavigator();

const StackNavigator = () => {
    return (

        <Stack.Navigator>
            <Stack.Screen name="GetStarted" component={GetStarted}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="SignUp" component={SignUp} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Login" component={Login}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name='MainTab' component={BottomTab}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="Chats"
                component={Chats}
                options={({ route }) => ({
                    headerStyle: {
                        height: 80,
                        backgroundColor: '#67a1f9',
                    },
                    title: route.params?.recieverName
                })

                }

            />

        </Stack.Navigator>
    );
}
export default StackNavigator 