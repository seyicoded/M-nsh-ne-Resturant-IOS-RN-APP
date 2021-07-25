import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {MoonAppContext} from './MoonAppContext'
import AsyncStorage from '@react-native-community/async-storage'
import Welcom_slide from './Screens/Welcom_slide'
import { set } from 'react-native-reanimated'
import AppContainer from './Screens/AppContainer'
import FullCategory from './Screens/FullCategory'
import FullItemUnderCategory from './Screens/FullItemUnderCategory'
import ItemDetails from './Screens/ItemDetails'
import Login from './Screens/Login'
import Register from './Screens/Register'
import OTP_PAGE from './Screens/OTP_PAGE'
import ForgotPassword from './Screens/ForgotPassword'
import SearchScreen from './Screens/SearchScreen'

export default function MainNavigator() {
    //AsyncStorage.clear()
    //state defination
    // [value, setvalue] from state
    const [isStartFetching, setisStartFetching] = useState(true);
    const [FirstTimeOpeningApp, setFirstTimeOpeningApp] = useState('true');
    const [isSignedIn, setisSignedIn] = useState('false');
    const [username, setusername] = useState('false');
    const [email, setemail] = useState('false');
    const [mobile, setmobile] = useState('false');
    const [id, setid] = useState('false');
    const [password, setpassword] = useState('false');

    const [context, setContext] = useState([
      {FirstTimeOpeningApp,isSignedIn,username, email, mobile, id, password},
      {setFirstTimeOpeningApp,setisSignedIn,setusername, setemail, setmobile,setid,setpassword}
    ])

    useEffect(() => {
      //get data from async storage
      const getDataFromAsync = async () =>{
        //get
        // await AsyncStorage.setItem('user_id',id+'')
        // await AsyncStorage.setItem('user_email',email+'')
        // await AsyncStorage.setItem('user_mobile',mobile+'')
        // await AsyncStorage.setItem('user_name',name+'')
        // await AsyncStorage.setItem('user_password',password+'')
        const ASS_FirstTimeOpeningApp = await AsyncStorage.getItem('FirstTimeOpeningApp')
        const ASS_user_id = await AsyncStorage.getItem('user_id')
        const ASS_user_email = await AsyncStorage.getItem('user_email')
        const ASS_user_mobile = await AsyncStorage.getItem('user_mobile')
        const ASS_user_name = await AsyncStorage.getItem('user_name')
        const ASS_user_password = await AsyncStorage.getItem('user_password')

        //setState
        setFirstTimeOpeningApp( (ASS_FirstTimeOpeningApp != null) ? 'false': 'true')
        setisSignedIn( (ASS_user_id != null) ? 'true': 'false')
        setusername( (ASS_user_name != null) ? ASS_user_name: 'false')
        setemail( (ASS_user_email != null) ? ASS_user_email: 'false')
        setmobile( (ASS_user_mobile != null) ? ASS_user_mobile: 'false')
        setpassword( (ASS_user_password != null) ? ASS_user_password: 'false')
        setid( (ASS_user_id != null) ? ASS_user_id: 'false')
        setisStartFetching(false)
        setContext([
          {FirstTimeOpeningApp,isSignedIn,username, email, mobile, id, password},
          {setFirstTimeOpeningApp,setisSignedIn,setusername, setemail, setmobile,setid,setpassword}
        ])
      }

      //call the checker
      getDataFromAsync()
    }, [isSignedIn, FirstTimeOpeningApp ,username, email, mobile, id, password])

    const StackNav = createStackNavigator()

    return (
        <>
          <MoonAppContext.Provider value={context}>
            <NavigationContainer>
              {
                (isStartFetching) ? 
                <>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator />
                  </View>
                </>
                :
                <StackNav.Navigator headerMode={false}>
                  {
                    ( (FirstTimeOpeningApp == 'true') ? 
                    <StackNav.Screen name="welcome" component={Welcom_slide}/> 
                    :
                    <>
                      <StackNav.Screen name="AppContainer" component={AppContainer}/>
                      
                      <StackNav.Screen name="stack_full_catgory" component={FullCategory}/>
                      <StackNav.Screen name="stack_full_item_under_catgory" component={FullItemUnderCategory}/>
                      <StackNav.Screen name="stack_full_item_details" component={ItemDetails}/>
                      <StackNav.Screen name="stack_screen_otp_page" component={OTP_PAGE}/>
                      <StackNav.Screen name="stack_screen_search" component={SearchScreen}/>
                      {(isSignedIn == 'false') ? 
                        <>
                          <StackNav.Screen name="stack_screen_login" component={Login}/>
                          <StackNav.Screen name="stack_screen_register" component={Register}/>
                          <StackNav.Screen name="stack_screen_forgot_password" component={ForgotPassword}/>
                        </>
                        :
                        <></>
                      }
                    </>
                    )
                  }
                </StackNav.Navigator> 
              }
            </NavigationContainer>
          </MoonAppContext.Provider>  
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  
