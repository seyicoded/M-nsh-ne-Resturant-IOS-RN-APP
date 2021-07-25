import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MainNavigator from './src/MainNavigator'
import SplashLoader from './src/SplashLoader'

export default function App() {
  const [showSplashScreen, setshowSplashScreen] = useState(true);

  setTimeout( ()=>{
    setshowSplashScreen(false)
  }, 2900)

  return (
    <View style={styles.container}>
      {
        (showSplashScreen) ? <SplashLoader />: <MainNavigator />
      }

      {showSplashScreen}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
