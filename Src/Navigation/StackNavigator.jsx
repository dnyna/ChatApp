import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../Screens/SignUp'
import Login from '../Screens/Login'
import BottomTab from './BottomTab'
import GetStarted from '../Screens/GetStarted'
import Chats from '../Screens/Chats'
import Sizes from '../styles/Sizes';
import { useEffect, useState } from 'react';
import Loader from '../Component/Loader'
const Stack = createStackNavigator();
import auth from '@react-native-firebase/auth'

const StackNavigator = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
            setLoading(false)

        })
        return unsubscribe
    }, [])

    //loading screen

    if (loading) {
        return (
            <Loader />

        )
    }


    return (


        <Stack.Navigator>
            {
                user ? (
                    <>
                        <Stack.Screen name='MainTab' component={BottomTab}
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

                        <Stack.Screen name="Chats"
                            component={Chats}
                            options={({ route }) => ({
                                headerStyle: {
                                    height: Sizes.doubleXXL,
                                    backgroundColor: '#67a1f9',
                                },
                                title: route.params?.recieverName
                            })

                            }

                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="GetStarted" component={GetStarted}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen name="Login" component={Login}
                            options={{
                                headerShown: false
                            }} />

                        <Stack.Screen name="SignUp" component={SignUp} options={{
                            headerShown: false
                        }} />
                    </>
                )
            }


        </Stack.Navigator>
    );
}
export default StackNavigator 