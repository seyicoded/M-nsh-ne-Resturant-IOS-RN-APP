import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import {Image} from 'react-native-elements'
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer'
import AsyncStorage from '@react-native-community/async-storage'
import {MoonAppContext} from '../MoonAppContext'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios'
import {BASE_URL} from '../CONFIG'

//import drawer screens
import Home from './DrawerScreens/Home'

const DrawNav = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
          <View style={styles.drawerIconContainer}>
            <View style={styles.drawerIconImage_container}>
                {
                    (props.dsContext[0].isSignedIn == 'false') ? 
                    <Image source={require('../../assets/moonshine/moonshine_food_icon.png')} style={{...styles.drawerIcon, backgroundColor:'rgba(0,0,255,0.1)', borderRadius: 100}}/>
                    :
                    ( (props.imageuri != null) ? 
                    <Image source={{uri: props.imageuri}} style={styles.drawerIcon} PlaceholderContent={<ActivityIndicator/>}/>
                    :
                    <Image source={require('../../assets/moonshine/user.png')} style={styles.drawerIcon}/>
                    )
                }
            </View>
            <Text style={{fontWeight: 'bold', color: 'blue', marginVertical: 15}}>{(props.dsContext[0].username == 'false') ? 'Moonshine Cafe' : props.dsContext[0].username}</Text>
            
            {/* <View style={{flex: 1, width: '100%', justifyContent:'center',}}>
                <DrawerItem label="PROFILE" {...props} labelStyle={{fontWeight: 'bold',}} inactiveTintColor="rgba(0,48,174,0.6)" style={{alignItems: 'center',width: '100%',}} onPress={ (props) => {
                    //code
                    //setisLoading(true)
                    console.log(props.navigation)
                    alert('load stack for profile screen')
                }} />
            </View> */}
            
            <Text style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.1)', marginTop: 13, width: '100%'}}></Text>

          </View>
          <DrawerItemList {...props} labelStyle={{fontWeight: 'bold'}}/>

          <Text style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.1)', marginTop: 9, width: '100%'}}></Text>
          
          <View style={{flex: 1, width: '100%', justifyContent:'center'}}>
                {
                    ((props.dsContext[0].isSignedIn) == 'false') ? 
                        <DrawerItem label="SIGN IN" icon={({focused,size})=> (<Icon name={(focused) ? "ios-log-in":"ios-log-in-outline"} size={size} style={focused ? {color: 'blue'} : {color: 'black'}}/>)} labelStyle={{fontWeight: 'bold'}} style={{width: '100%', color: 'black'}} onPress={() => {
                            props.navigation.navigate('stack_screen_login')
                            //code
                            //setisLoading(true)
                            // setTimeout( async ()=>{
                            //     const a = await AsyncStorage.multiRemove(['issignedin', 'username', 'password'])
                            //     props.dsContext[1].setisSignedIn('false')
                            // },1300)
                        }} />   
                    :<>

                        {(props.is_otp_validated == 'not_validated') ? 
                            <DrawerItem label="CONFIRM OTP" icon={({focused,size})=> (<Icon name={(focused) ? "ios-log-in":"ios-log-in-outline"} size={size} style={focused ? {color: 'blue'} : {color: 'black'}}/>)} labelStyle={{fontWeight: 'bold'}} style={{width: '100%', color: 'black'}} onPress={() => {
                                //code
                                //setisLoading(true)
                                //                     const ASS_FirstTimeOpeningApp = await AsyncStorage.getItem('FirstTimeOpeningApp')
                                // const ASS_user_id = await AsyncStorage.getItem('user_id')
                                // const ASS_user_email = await AsyncStorage.getItem('user_email')
                                // const ASS_user_mobile = await AsyncStorage.getItem('user_mobile')
                                // const ASS_user_name = await AsyncStorage.getItem('user_name')
                                // const ASS_user_password = await AsyncStorage.getItem('user_password')
                                setTimeout( async ()=>{
                                    props.navigation.navigate('stack_screen_otp_page')
                                },300)
                            }} />
                            
                            :<></>}

                        <DrawerItem label="LOG OUT" icon={({focused,size})=> (<Icon name={(focused) ? "ios-log-in":"ios-log-in-outline"} size={size} style={focused ? {color: 'blue'} : {color: 'black'}}/>)} labelStyle={{fontWeight: 'bold'}} style={{width: '100%', color: 'black'}} onPress={() => {
                            //code
                            //setisLoading(true)
                            //                     const ASS_FirstTimeOpeningApp = await AsyncStorage.getItem('FirstTimeOpeningApp')
                            // const ASS_user_id = await AsyncStorage.getItem('user_id')
                            // const ASS_user_email = await AsyncStorage.getItem('user_email')
                            // const ASS_user_mobile = await AsyncStorage.getItem('user_mobile')
                            // const ASS_user_name = await AsyncStorage.getItem('user_name')
                            // const ASS_user_password = await AsyncStorage.getItem('user_password')
                            setTimeout( async ()=>{
                                const a = await AsyncStorage.multiRemove(['user_id', 'user_email', 'user_mobile', 'user_name', 'user_password', 'is_otp_validated'])
                                props.dsContext[1].setisSignedIn('false')
                            },1300)
                        }} />
                    </>

                }
          </View>
          
      </DrawerContentScrollView>
    );
  }
  //<DrawerItem label="Help" onPress={() => alert('Link to help')} />

export default function AppContainer({navigation}) {
    const context = React.useContext(MoonAppContext)
    const [ImageUri,setImageUri] = useState(null)
    const [is_otp_validated, setis_otp_validated] = useState(null)
    
    useEffect(()=>{

        const getImageUri = async ()=>{
            const fd = {"user_id": context[0].id}
            console.log(fd)
            const fetchgetProfileData = await axios.post(BASE_URL+'getprofile',fd)
            console.log(fetchgetProfileData)
            setImageUri(fetchgetProfileData.data.data.profile_image)

            setis_otp_validated(await AsyncStorage.getItem('is_otp_validated'))
        }

        if(context[0].isSignedIn == 'true'){
            getImageUri()
        }
    })
    console.log(is_otp_validated)
    //console.log(context)
    return (
        <DrawNav.Navigator drawerContent={props => <CustomDrawerContent {...props} is_otp_validated={is_otp_validated} navigation={navigation} imageuri={ImageUri} dsContext={context}/>}>
            <DrawNav.Screen name="Drawer_Screens_Home" options={{drawerLabel: 'Home', drawerIcon: ({focused,size})=> (<Icon name={(focused) ? "ios-home":"ios-home-outline"} size={size} style={focused ? {color: 'blue'} : {color: 'black'}}/>)}} component={Home}/>
            <DrawNav.Screen name="Drawer_Screens_Favourite" options={{drawerLabel: 'Favourite List', drawerIcon: ({focused,size})=> (<Icon name={(focused) ? "ios-heart":"ios-heart-outline"} size={size} style={focused ? {color: 'blue'} : {color: 'black'}}/>)}} component={Home}/>
            <DrawNav.Screen name="Drawer_Screens_Order" options={{drawerLabel: 'Order History', drawerIcon: ({focused,size})=> (<Icon name={(focused) ? "ios-list":"ios-list-outline"} size={size} style={focused ? {color: 'blue'} : {color: 'black'}}/>)}} component={Home}/>
            <DrawNav.Screen name="Drawer_Screens_Rating" options={{drawerLabel: 'Rating', drawerIcon: ({focused,size})=> (<Icon name={(focused) ? "ios-star":"ios-star-outline"} size={size} style={focused ? {color: 'blue'} : {color: 'black'}}/>)}} component={Home}/>
            <DrawNav.Screen name="Drawer_Screens_Settings" options={{drawerLabel: 'Settings', drawerIcon: ({focused,size})=> (<Icon name={(focused) ? "ios-settings":"ios-settings-outline"} size={size} style={focused ? {color: 'blue'} : {color: 'black'}}/>)}} component={Home}/>
        </DrawNav.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerIconContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 21,
    },
    drawerIconImage_container: {
        height: 180,
    },
    drawerIcon: {
        marginBottom: 15,
        height: 180,
        width: 180,
    }
})