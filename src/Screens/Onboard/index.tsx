import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation, NavigationProp } from '@react-navigation/native'
import Intro1 from '../../../img/Intro1.png'
import Intro2 from '../../../img/Intro2.png'
import Intro3 from '../../../img/Intro3.png'

const Onboard = () => {
    const navigation = useNavigation<NavigationProp<any>>()

    return (
        <View style={styles.container}>
            <Onboarding
                onSkip={() => navigation.replace('Login')}
                onDone={() => navigation.replace('Login')}
                pages={[
                    {
                        title: '',
                        backgroundColor: 'white',
                        image: <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Text style={styles.uppertext}>The app has all the basic features of a ticket booking app</Text>
                            <Image source={Intro1} style={styles.image
                            } resizeMode='contain' />
                            <Text style={styles.lowertext}>Which means users can check the tickes availability, price and demand</Text>
                        </View>,
                        subtitle: '',
                    },
                    {
                        title: '',
                        backgroundColor: 'white',
                        image: <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Text style={styles.uppertext}>Additionally, they can book snacks to increase their movie-watching experience</Text>
                            <Image source={Intro2} style={styles.image
                            } resizeMode='contain' />
                            <Text style={styles.lowertext}>Although the information displayed on a includes certain facts like the below</Text>
                        </View>,
                        subtitle: '',
                    },
                    {
                        title: '',
                        backgroundColor: 'white',
                        image: <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Text style={styles.uppertext}>This platform provides details such as what time a movie will be played</Text>
                            <Image source={Intro3} style={styles.image
                            } resizeMode='contain' />
                            <Text style={styles.lowertext}>An online movie ticketing system is a digital platform that allows customers to access the services of a business, reserve seats and buy tickets</Text>
                        </View>,
                        subtitle: '',
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    image: {
        height: "50%",
        width: "50%",
        marginTop: 50,
    },
    uppertext: {
        position: "absolute",
        top: '15%',
        fontSize: 20,
        textAlign: 'center',
        color: 'black',
        fontWeight: '700',
        marginLeft: 30
    },
    lowertext: {
        position: "absolute",
        bottom: '10%',
        display: 'flex',
        textAlign: 'center',
        color: 'black',
        marginLeft: 30
    },
});

export default Onboard;