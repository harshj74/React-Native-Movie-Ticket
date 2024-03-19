import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation, NavigationProp } from '@react-navigation/native'
import Intro1 from '../../../img/Intro1.png'
import Intro2 from '../../../img/Intro2.png'
import Intro3 from '../../../img/Intro3.png'
import { getAnimatedStyle } from 'react-native-reanimated';

const Onboard = () => {
    const [text, settext] = useState('sda');
    const navigation = useNavigation<NavigationProp<any>>()
    return (
        <View style={styles.container}>
            <Onboarding
                onSkip={() => navigation.replace('Login')}
                onDone={() => navigation.replace('Login')}
                pages={[
                    {
                        backgroundColor: 'white',
                        titleStyles: {
                            fontSize: 15,
                            color: 'black',
                            backgroundColor: 'white'
                        },
                        title: 'Which means users can check the ticket availability, price and demand',
                        image:
                            <View>
                                <Text style={{
                                    alignSelf:'center', fontSize: 20,  fontWeight: '700', 
                                    color: 'black', bottom: '30%', textAlign: 'center', paddingHorizontal: 10
                                }}>The app has all the basic features of a ticket booking app</Text>
                                <Image style={styles.image} source={Intro1} />
                            </View>,
                        subtitle: '',
                    },
                    {
                        backgroundColor: 'white',
                        titleStyles: {
                            fontSize: 15,
                            color: 'black',
                            backgroundColor: 'white'
                        },
                        title: 'Although the information displayed on a include certain facts like the below',
                        image:
                            <View>
                                <Text style={{
                                    alignSelf: 'center', fontSize: 20, fontWeight: '700',
                                    color: 'black', bottom: '30%', textAlign: 'center', paddingHorizontal:10
                                }}>Additionally, they can book snacks to increase their watching experience</Text>
                                <Image style={styles.image} source={Intro2} />
                            </View>,
                        subtitle: '',
                    },
                    {
                        backgroundColor: 'white',
                        titleStyles: {
                            fontSize: 15,
                            color: 'black',
                            backgroundColor: 'white'
                        },
                        title: 'It is a platform that allows customers to access the services of a bussiness, reserve seats and buy tickets',
                        image:
                            <View>
                                <Text style={{
                                    alignSelf: 'center', fontSize: 20, fontWeight: '700',
                                    color: 'black', bottom: '30%', textAlign: 'center', paddingHorizontal: 10
                                }}>Platform provides details such as what time a movie will be played</Text>
                                <Image style={styles.image} source={Intro3} />
                            </View>,
                        subtitle: '',
                    },

                ]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'blue'
    },
    image: {
        height: 250,
        width: 250,
        alignSelf: 'center'
    },
});

export default Onboard;