import React, { useContext , useState, useEffect} from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, SafeAreaView, TextInput, Platform, StyleSheet, ImageBackground, TouchableOpacity, } from 'react-native'
import {Image} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage'
//import GridList from 'react-native-grid-list';
import axios from 'axios'

import Header from './DrawerScreens/Header'
import {BASE_URL} from '../CONFIG'
import {MoonAppContext} from '../MoonAppContext'
import {MoonAlert, MoonLoader} from './MoonAlerts'
import { StatusBar } from 'expo-status-bar'
import {validateEmail} from './FormValidator'

export default function ForgotPassword({navigation}) {
    const context = useContext(MoonAppContext);
    
    const [email, setemail] = useState('')
    const [showError, setshowError] = useState(false)
    const [showMessage, setshowMessage] = useState(false)
    const [AlertMessage, setAlertMessage] = useState('Network Error')
    const [isLoading, setisLoading] = useState(false)
    const [loading, setloading] = useState(false)

    axios.interceptors.response.use(response => {
        //console.log(response+"")
        return response;
        }, error => {
            if (error.response.status === 422) {
                //place your reentry code
                //console.log(error.response)
                console.log(error.response)
                //showerror(error.response.data.detail)
            }
            if (error.response.status === 400) {
                //place your reentry code
                //console.log(error.response)
                console.log(error.response)
                //showerror(error.response.data.detail)
            }
            setisLoading(false)
            setloading(false)
            setAlertMessage(error.response.data.message)
            setshowError(true)
        return error;
    });

    const ResendPassword = ()=>{
        setisLoading(true)
        setloading(true)
        const asyncLoader = async ()=> {
            setisLoading(true)
            if(validateEmail(email)){
                if(true){
                    setisLoading(true)
                    const fd = {"email": email}
                    //console.log(fd)
                    const fetchLoginRequestData = await axios.post(BASE_URL+'forgotPassword',fd)
                    console.log(fetchLoginRequestData)
                    if(fetchLoginRequestData.data.status || fetchLoginRequestData.data.status == 1){

                        setshowMessage(true)
                        setAlertMessage('New Password Sent to Email')
                        setTimeout(()=>{
                            setshowMessage(false)
                            navigation.goBack()
                        },2000)
                        setisLoading(false)
                        setloading(false)
                    }else{
                        setisLoading(false)
                        setloading(false)
                        setAlertMessage(fetchLoginRequestData.data.message)
                        setshowError(true)
                    }
                }else{
                    setisLoading(false)
                    setloading(false)
                    setAlertMessage('Password is invalid')
                    setshowError(true)
                }
            }else{
                setisLoading(false)
                setloading(false)
                setAlertMessage('OTP is invalid')
                setshowError(true)
            }
            //get specific item
            // const fd = new FormData();
            // fd.append('item_id',item_id)
            // const fetchItemDetailsData = await axios.post(BASE_URL+'itemdetails',fd)
            // //console.log(fetchItemDetailsData)
            // setItemDetails(fetchItemDetailsData.data.data)
            // //showContent
            // setisLoading(false)
        }
        setisLoading(true)
        asyncLoader().catch((err)=>{
            setshowError(true)
            setloading(false)
            setAlertMessage('Network Error')
            console.log(err)
        })
        setisLoading(false)
    }
    useEffect(()=>{
        //loadAllDatas()
        
    }, [isLoading])

    return (
        <View style={{flex: 1}}>
            <StatusBar hidden={false} translucent={true}/>
            <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? 'padding' : undefined } style={{flex: 1}}>
                <ImageBackground source={require('../../assets/moonshine/b22.jpg')} style={{flex: 1}}>
                    <View style={{flex: 1, backgroundColor: 'rgba(255,255,255,0.5)', marginTop: 20}}>
                        {
                            (isLoading) ? <MoonLoader /> : <></>
                        }
                        {
                            (loading) ? <MoonLoader /> : <></>
                        }
                        {
                            (showError) ? <MoonAlert type="error" message={AlertMessage} hideModal={setshowError} /> : <></>
                        }
                        {
                            (showMessage) ? <MoonAlert type="success" message={AlertMessage} hideModal={setshowMessage} /> : <></>
                        }
                        <ScrollView style={{flex: 1}}>
                        <View style={styles.container}>
                            <View style={styles.logoCOntainer}>
                                <Image source={require('../../assets/moonshine/blue-1.png')} style={styles.logo}/>
                            </View>
                            <View style={styles.content_holder}>
                                <Text style={styles.title}>FORGOT YOUR PASSWORD</Text>

                                <Text/>
                                
                                <Text style={{color: 'white'}}>
                                    Enter Your Email to get a new password
                                </Text>

                                <View style={{width: '90%'}}>
                                    
                                    <View>
                                        <Icon1 name="key" color="darkblue" style={styles.form_text_image}/>
                                        <TextInput value={email} autoCapitalize="none" returnKeyType='done' placeholder="Enter your email" textContentType="emailAddress" keyboardType="email-address" placeholderTextColor='rgba(255,255,255,0.7)' onChangeText={(txt=>setemail(txt))} style={{...styles.input_design}}/>
                                    </View>

                                    <Text />

                                    <Text />

                                    <TouchableOpacity onPress={()=>{setisLoading(true);ResendPassword();}}>
                                        <Text style={styles.form_submit}>REQUEST</Text>
                                    </TouchableOpacity>
                                    
                                    <Text />
                                    
                                    <Text />

                                </View>
                                
                            </View>
                        </View>
                        </ScrollView>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logoCOntainer: {
        width: '100%',
        marginTop: 50,
        marginBottom: '8%',
        height: 70,
        alignItems: 'center'
    },
    logo: {
        //position: 'absolute',
        //top: '10%',
        width: 60,
        height: 65,
    },
    content_holder: {
        width: '80%',
        backgroundColor: 'rgba(0,0,255,0.2)',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: 'blue',
        shadowOpacity: 0.9,
        shadowOffset: {width: 2, height: 2},
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(20,20,240,0.5)'
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        textShadowColor: 'darkblue',
        textShadowOffset: {width: 6, height: 5},
        textShadowRadius: 4
    },
    input_design: {
        backgroundColor: 'lightblue',
        marginTop: 24,
        marginBottom: 19,
        fontSize: 16,
        paddingHorizontal: 13,
        paddingVertical: 6,
        borderRadius: 4,
        overflow: 'hidden',
        color: 'white',
    },
    form_submit: {
        backgroundColor: 'rgba(90,255,250,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingVertical: 15,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        borderRadius:35,
        overflow: 'hidden',
        fontWeight: 'bold',
        ...Platform.select({
            ios: {
                borderRadius:30
            }
        })  
    },
    form_text_image: {
        position: 'absolute',
        right: 10,
        top: 30,
        ...Platform.select({
            android: {
                top: 35,
            }
        }),
        zIndex: 5,
        fontSize: 17,
    },
})
