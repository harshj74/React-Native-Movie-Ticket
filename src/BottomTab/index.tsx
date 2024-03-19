import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyDrawer from '../Screens/MyDrawer';
import { Image } from 'react-native';
import MovieTicket from '../../img/movies.png'
import film from '../../img/film.png'
import tickets from '../../img/tickets.png'
import Cinemas from '../Screens/Cinemas';
import MyBookings from '../Screens/MyBookings';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#ff5492',
                tabBarInactiveTintColor: 'grey',
                tabBarHideOnKeyboard: true,
                tabBarLabelStyle: {
                    display: 'flex',
                    bottom: 5,
                    fontWeight: 'bold'
                }
            }} >
            <Tab.Screen name="Movies" component={MyDrawer}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => {
                        return (
                            <Image tintColor={focused ? '#ff5492' : 'gray'} style={{ height: 22, width: 22 }} source={MovieTicket} />
                        )
                    }
                }} />
            <Tab.Screen name="Cinemas" component={Cinemas}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image tintColor={focused ? '#ff5492' : 'gray'} style={{ height: 22, width: 22 }} source={film} />
                        )
                    }
                }} />
            <Tab.Screen name="My Bookings" component={MyBookings}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image tintColor={focused ? '#ff5492' : 'gray'} style={{ height: 22, width: 22 }} source={tickets} />
                        )
                    }
                }} />

        </Tab.Navigator>
    );
}

export default BottomTab;