import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatList from '../Screens/ChatList';
import Setting from '../Screens/Setting'
import IonIcons from 'react-native-vector-icons/Ionicons'
const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="ChatList" component={ChatList}
                options={{
                    tabBarIcon: ({ size, color }) => {
                        return (<IonIcons name="people-outline" size={size} color={color} ></IonIcons>)
                    }
                }}


            />
            <Tab.Screen name="Setting" component={Setting}
                options={{
                    tabBarIcon: ({ size, color }) => {
                        return (<IonIcons name="settings" size={size} color={color}></IonIcons>)
                    }
                }} />
        </Tab.Navigator>

    );
}
export default BottomTab