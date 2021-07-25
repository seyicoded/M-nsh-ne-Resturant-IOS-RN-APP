import React, {useEffect, useState, useContext} from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import {Image} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
//import GridList from 'react-native-grid-list';
import axios from 'axios'

import Header from './DrawerScreens/Header'
import {BASE_URL} from '../CONFIG'
import {MoonAppContext} from '../MoonAppContext'
import {MoonAlert, MoonLoader} from './MoonAlerts'

export default function Design({navigation, route}) {

    // const input1 = route.params.input1;

    // if((route.params.input1).length == 0){
    //     navigation.goBack()
    // }

    const context = useContext(MoonAppContext);

    const [isLoading, setisLoading] = useState(true)
    const [showError, setshowError] = useState(false)
    const [showMessage, setshowMessage] = useState(false)
    const [AlertMessage, setAlertMessage] = useState('Network Error')

    const loadAllDatas = ()=>{
        const asyncLoader = async ()=> {
            
            //get specific item
            // const fd = new FormData();
            // fd.append('cat_id',cat_id)
            // const fetchspecifyitemData = await axios.post(BASE_URL+'item',fd)
            // setSpecifyItemData(fetchspecifyitemData.data.data.data)
            // setcurrency(fetchspecifyitemData.data.data.currency)

            //showContent
            setisLoading(false)
        }

        asyncLoader().catch((err)=>{
            setshowError(true)
            setAlertMessage('Network Error')
            console.log(err)
        })
    }
    useEffect(()=>{
        loadAllDatas()
    }, [])

    return (
        <View style={styles.container}>
            <Header title={cat_name} navigation={navigation}/>
            {
                (isLoading) ? <MoonLoader /> : <></>
            }
            {
                (showError) ? <MoonAlert type="error" message={AlertMessage} hideModal={setshowError} /> : <></>
            }
            {
                (showMessage) ? <MoonAlert type="success" message={AlertMessage} hideModal={setshowMessage} /> : <></>
            }
            <ScrollView>

            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})