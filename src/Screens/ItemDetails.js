import React, {useEffect, useState, useContext} from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, ImageBackground, TouchableOpacity, TextInput } from 'react-native'
import {Image} from 'react-native-elements'
import Icon1 from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Feather'
//import GridList from 'react-native-grid-list';
import axios from 'axios'

import Header from './DrawerScreens/Header'
import {BASE_URL} from '../CONFIG'
import {MoonAppContext} from '../MoonAppContext'
import {MoonAlert, MoonLoader} from './MoonAlerts'

export default function ItemDetails({navigation, route}) {

    const item_id = route.params.item_id;

    if((route.params.item_id).length == 0){
    navigation.goBack()
    }

    const context = useContext(MoonAppContext);

    const [quantity, setquantity] = useState(1)
    const [ItemDetails, setItemDetails] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [showError, setshowError] = useState(false)
    const [showMessage, setshowMessage] = useState(false)
    const [AlertMessage, setAlertMessage] = useState('Network Error')

    const loadAllDatas = ()=>{
        const asyncLoader = async ()=> {
            
            //get specific item
            const fd = new FormData();
            fd.append('item_id',item_id)
            const fetchItemDetailsData = await axios.post(BASE_URL+'itemdetails',fd)
            //console.log(fetchItemDetailsData)
            setItemDetails(fetchItemDetailsData.data.data)
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
            <Header title="" navigation={navigation}/>
            {
                (showError) ? <MoonAlert type="error" message={AlertMessage} hideModal={setshowError} /> : <></>
            }
            {
                (showMessage) ? <MoonAlert type="success" message={AlertMessage} hideModal={setshowMessage} /> : <></>
            }

            {

            }
            {
                (isLoading) ? <MoonLoader /> : 
                <>
                    <ScrollView style={{...styles.container}}>
                        <View>
                            <Image style={{width: '100%', height: 210}} source={{uri: ItemDetails.images[0].itemimage}} PlaceholderContent={<ActivityIndicator />}/>
                        </View>

                        <View style={styles.icontainer_card}>
                            <View>
                                <Text style={{fontWeight: '600'}}>{ItemDetails.item_name}</Text>
                                <Text></Text>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{opacity: 0.4}}>{ItemDetails.category_name}</Text>
                                    <Text>{ItemDetails.delivery_time}</Text>
                                </View>
                                <Text></Text>
                                <Text style={{textAlign: 'right', color: 'rgba(30,30,250,0.7)'}}>₦ {(new Intl.NumberFormat().format( Number(ItemDetails.item_price) ))}.00</Text>
                            </View>
                        </View>

                        <View style={styles.icontainer_card}>
                            <View>
                                <Text style={{fontWeight: '600'}}>Details</Text>
                                <Text></Text>
                                <Text style={{opacity: 0.4}}>{ItemDetails.item_description}</Text>
                                <Text></Text>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{opacity: 0.4}}>Add-Ons</Text>
                                    <Text><Icon1 name="plus-square" size={18} color={((ItemDetails.addons).length != 0) ? 'black' : 'grey'}/></Text>
                                </View>
                                <View>
                                    {
                                        ((ItemDetails.addons).length != 0) ?
                                        <View>
                                            {
                                                ((ItemDetails.addons)).map((item)=>{
                                                    <Text>{item}</Text>
                                                })
                                            }
                                        </View>
                                        :
                                        <View style={{flex:1, alignItems: 'center', paddingVertical: 30}}>
                                            <Text>No Add - Ons Found</Text>
                                        </View>
                                    }
                                </View>
                                <Text style={{fontWeight: '500'}}>Notes</Text>
                                <TextInput textContentType="streetAddressLine1" multiline={true} style={{backgroundColor: 'rgba(0,0,0,0.1)', marginVertical:5, padding: 4, height: 70, borderRadius: 4, maxHeight: 120}} placeholder="Write Notes"/>
                                <View>
                                    {
                                        ((ItemDetails.ingredients).length != 0) ?
                                        <View>
                                            {
                                                ((ItemDetails.ingredients)).map((item)=>{
                                                    <Text>{item}</Text>
                                                })
                                            }
                                        </View>
                                        :
                                        <View style={{flex:1, alignItems: 'center', paddingVertical: 30}}>
                                            <Text>No Data Ingredients</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.FooterDesign}>
                        <Icon2 name="minus-circle" size={24}/>
                        <Text>{quantity}</Text>
                        <Icon2 name="plus-circle" size={24}/>
                        <TouchableOpacity>
                            <Text style={styles.add_button}>Add To Cart ₦{(new Intl.NumberFormat().format( Number(ItemDetails.item_price) ))}.00</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icontainer_card: {
        margin: 15,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 4,
        shadowOpacity: 1,
        flex: 1,
        // borderWidth: 1,
        borderRadius: 4,
        borderColor: 'rgba(0,0,0,0.5)',
        backgroundColor: 'white',
        padding: 7
    },
    FooterDesign: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 1,
        padding: 7,
        paddingVertical: 7,
        justifyContent: 'space-between',
        height: 60
    },
    add_button: {
        flex: 1,
        backgroundColor: 'rgba(20,20,245,0.8)',
        color: 'white',
        width: '100%',
        paddingHorizontal: '10%',
        paddingVertical: 15,
        fontWeight: '800',
        borderRadius: 25,
        overflow: 'hidden',
    }
})