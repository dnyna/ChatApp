import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatList from '../Screens/ChatList';
import Chats from '../Screens/Chats'
import IonIcons from 'react-native-vector-icons/Ionicons'
const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="ChatList" component={ChatList}
                options={{
                    tabBarIcon: ({ size, color }) => {
                        return (<IonIcons name="people-crcle-outline" size={size} color={color} ></IonIcons>)

                    }
                }}


            />
            <Tab.Screen name="Chats" component={Chats}
                options={{
                    tabBarIcon: ({ size, color }) => {
                        return (<IonIcons name="chatbubble-outline" size={size} color={color}></IonIcons>)

                    }
                }} />
        </Tab.Navigator>

    );
}
export default BottomTab