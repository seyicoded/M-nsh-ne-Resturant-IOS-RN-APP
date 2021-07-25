import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import Carousel, {Pagination} from 'react-native-snap-carousel'
import {StatusBar} from 'expo-status-bar'
import {MoonAppContext} from '../MoonAppContext'
import AsyncStorage from '@react-native-community/async-storage'

const deviceWidth = Dimensions.get('screen').width
const deviceHeight = Dimensions.get('screen').height

export default function Welcom_slide() {
    const context = React.useContext(MoonAppContext);
    const _renderItem = ({item, index}) => {

        const get_started = (index == 4) ? 
            <View style={styles.getStartedCover}>
                <TouchableOpacity onPress={ (e)=> { 
                        AsyncStorage.setItem('FirstTimeOpeningApp','false')
                        context[1].setFirstTimeOpeningApp('false')
                    }}>
                    <Text style={styles.getStarted}>GET STARTED</Text>
                </TouchableOpacity>
            </View>
        :<></>
        return (
            <View style={styles.slide}>
                <Image style={styles.img} source={item.img} />
                {get_started}
            </View>
        );
    }

    const entries = [
        {img: require('../../assets/moonshine/compressed_1/food.png')},
        {img: require('../../assets/moonshine/compressed_1/drink.png')},
        {img: require('../../assets/moonshine/compressed_1/pastries.png')},
        {img: require('../../assets/moonshine/compressed_1/delivery.png')},
        {img: require('../../assets/moonshine/compressed_1/payment.png')}
    ]

    const[ activeSlide, setactiveSlide ] = React.useState(0);

    const pagination = 
            <Pagination
              dotsLength={entries.length}
              activeDotIndex={activeSlide}
              containerStyle={{  }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />

    const sliderWidth = deviceWidth;
    const itemWidth = deviceWidth;

    return (
        <View style={styles.container}>
            <StatusBar hidden={true}/>
            <Carousel
              style={{flex: 1, backgroundColor:'green', width: "100%"}}
              data={entries}
              renderItem={_renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              onSnapToItem={(index) => setactiveSlide(index)}
            />
            <View style={{position: 'absolute', zIndex: 9, justifyContent: 'center', width: '100%', bottom: 30}}>
                { pagination }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    slide: {
        flex: 1,
        width: "100%",
        height: "100%",
        position: 'relative'
    },
    img: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    getStarted: {
        backgroundColor: 'blue',
        color: 'white',
        overflow: 'hidden',
        borderRadius: 25,
        paddingHorizontal: 99,
        paddingVertical: 15,
        textAlign: 'center',
        fontWeight: '900',
    },
    getStartedCover: {
        position: 'absolute',
        top: ((deviceHeight * 60) / 100 ),
        width: '100%',
        alignItems: 'center',
    }
});