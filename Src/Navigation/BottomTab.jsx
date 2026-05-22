import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatList from '../Screens/ChatList';
import Setting from '../Screens/Setting'
import IonIcons from 'react-native-vector-icons/Ionicons'
import Sizes from '../styles/Sizes';
import Colors from '../styles/Colors';
const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Colors.skyBlue,
                height: Sizes.doubleExtraL,
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
                    },
                }} />
        </Tab.Navigator>

    );
}
export default BottomTab