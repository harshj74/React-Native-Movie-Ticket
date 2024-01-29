import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Home';
import CustomDrawer from '../CustomDrawer';
import Profile from '../Profile';
import Help from '../Help';
import FAQ from '../FAQ';
import Reviews from '../Reviews';

const Drawer = createDrawerNavigator();
const MyDrawer = () => {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}initialRouteName='Home' screenOptions={{headerShown: false}}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Help" component={Help} />
            <Drawer.Screen name="FAQ" component={FAQ} />
            <Drawer.Screen name="Reviews" component={Reviews} />
        </Drawer.Navigator>
    );
}

export default MyDrawer;