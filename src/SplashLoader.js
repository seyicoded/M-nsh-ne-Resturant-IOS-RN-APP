import React from 'react'
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator, Image, SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default function SplashLoader() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <ImageBackground style={styles.container} source={require('../assets/moonshine/moonshine_delivery_background-min.png')}>
                    <View style={styles.loader}>
                        <View style={styles.Conatinerimage}>
                            <Image style={styles.image} source={require('../assets/moonshine/moonshine.png')}/>
                        </View>
                        <ActivityIndicator size="large" color="yellow"/>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative'
    },
    Conatinerimage: {
        width: '100%',
        height: 150,
        padding: 8,
        alignItems: 'center',
        marginBottom: 20
    },
    image :{
        width: '80%',
        height: 150,
    },
    loader: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        justifyContent: 'center'
        
    }
  });
  