import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatList from '../Screens/ChatList';
import Setting from '../Screens/Setting'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { Background } from 'react-native-keyboard-controller/lib/typescript/components/KeyboardToolbar/compound/components';
const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: 'transparent',
                elevation: 0
            }
        }}>
            <Tab.Screen name="contacts" component={ChatList}
                options={{

                    tabBarIcon: ({ size, color }) => {
                        return (<IonIcons name="people-outline" size={size} color={color} ></IonIcons>)
                    }
                }}


            />
            <Tab.Screen name="More" component={Setting}
                options={{
                    tabBarIcon: ({ size, color }) => {
                        return (<IonIcons name="settings" size={size} color={color}></IonIcons>)
                    }
                }} />
        </Tab.Navigator>

    );
}
export default BottomTab