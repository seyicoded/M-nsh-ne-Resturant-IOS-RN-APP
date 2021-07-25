import React, {useEffect, useState, useContext} from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, ImageBackground, TouchableOpacity, TextInput } from 'react-native'
import {Image} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Feather'
//import GridList from 'react-native-grid-list';
import axios from 'axios'

import Header from './DrawerScreens/Header'
import {BASE_URL} from '../CONFIG'
import {MoonAppContext} from '../MoonAppContext'
import {MoonAlert, MoonLoader} from './MoonAlerts'

export default function ItemDetails({navigation, route}) {

    const context = useContext(MoonAppContext);

    const [search_text, setsearch_text] = useState('')
    const [ItemDetails, setItemDetails] = useState([])
    const [new_dishesgrid, setnew_dishesgrid] = useState(2)
    const [isLoading, setisLoading] = useState(false)
    const [showError, setshowError] = useState(false)
    const [showMessage, setshowMessage] = useState(false)
    const [AlertMessage, setAlertMessage] = useState('Network Error')

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
            setAlertMessage(error.response.data.message)
            setshowError(true)
        return error;
    });

    const searcher_ = (text)=>{
        setisLoading(true)
        const asyncLoader = async (text)=> {
            
            //get specific item
            const fd = new FormData();
            fd.append('keyword',text)
            const fetchItemDetailsData = await axios.post(BASE_URL+'searchitem',fd)
            //console.log(fetchItemDetailsData)
            if(fetchItemDetailsData.data.status || fetchItemDetailsData.data.status == 1){
                setItemDetails(fetchItemDetailsData.data.data.data)
                //console.log(fetchItemDetailsData.data.data.data)
                setisLoading(false)
            }else{
                setAlertMessage(fetchItemDetailsData.data.message)
                setshowError(true)
                setisLoading(false)
            }
            //showContent
        }

        if(search_text.length == 0){
            return false
        }
        asyncLoader(text).catch((err)=>{
            setshowError(true)
            //setAlertMessage('Network Error')
            console.log(err)
        })
    }
    useEffect(()=>{
        //loadAllDatas()
        //console.log(ItemDetails)
    }, [ItemDetails])
    return (
        <View style={styles.container}>
            

            <View style={styles_1.container}>
                <View style={styles_1.container2}>
                    <View style={styles_1.innercontainer1}>
                        <Icon name="ios-arrow-back" size={30} color="rgba(0,0,255,0.5)" onPress={()=> navigation.goBack()}/>
                    </View>
                    <View style={{...styles_1.innercontainer1, flex: 1}}>
                        <TextInput style={styles_1.search_box_design} placeholder="Enter Item Name, desc....." returnKeyType="search" onChangeText={(text)=>{setsearch_text(text);searcher_(text);}}/>
                    </View>
                </View>
            </View>
            {
                (showError) ? <MoonAlert type="error" message={AlertMessage} hideModal={setshowError} /> : <></>
            }
            {
                (showMessage) ? <MoonAlert type="success" message={AlertMessage} hideModal={setshowMessage} /> : <></>
            }
            <ScrollView>
                {
                    (isLoading) ? <MoonLoader /> : <></>
                }
                <View>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', padding: 15}}>
                        <Text style={styles.linker_title_text}>Items</Text>
                        <Icon name="ios-grid" size={24} onPress={()=>{ ((new_dishesgrid == 2) ? setnew_dishesgrid(1) : setnew_dishesgrid(2)) }} style={styles.linker_text} />
                    </View>
                    <FlatList
                        data={ItemDetails}
                        renderItem={({ item }) => (
                            <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                margin: 10,
                                ...styles.category_card
                            }}>
                            <TouchableOpacity onPress={()=>{ navigation.navigate('stack_full_item_details', {item_id: item.id}) }}>
                                {/* <Text>{item.id}</Text> */}
                                <View style={{width: '100%', flex:1, ...styles.lastestimagecontainers}}>
                                    <Image source={{ uri: item.itemimage.image}} style={styles.lastestitemImage} PlaceholderContent={<ActivityIndicator />} />
                                    <Text numberOfLines={1} style={{...styles.newlastest_price, ...styles.newlastest_image_item_design}}>₦ {(new Intl.NumberFormat().format( Number(item.item_price) ))}.00</Text>
                                    <Icon name={ (item.is_favorite == 0) ? 'ios-heart-outline':'ios-heart' } size={19} numberOfLines={1} style={{...styles.newlastest_fav, ...styles.newlastest_image_item_design}} />
                                </View>
                                <View style={{alignItems: 'center', marginTop: 9}}>
                                    <Text numberOfLines={1} style={styles.category_title}>{item.item_name}</Text>
                                </View>
                                <Text></Text>
                            </TouchableOpacity>
                            </View>
                        )}
                        //Setting the number of column
                        numColumns={new_dishesgrid}
                        key={new_dishesgrid}
                        keyExtractor={(item, index) => index.toString()}
                        />
                        <Text>{ItemDetails.length}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    categoryImage: {
        width: '70%',
        marginLeft: '15%',
        marginTop: '10%',
        height: 50,
        borderRadius: 4
    },
    category_card: {
        // borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.3)',
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 1,
        shadowRadius: 4,
        borderRadius: 4,
        backgroundColor: 'white',
        
    },
    category_title: {
        alignItems: 'center'
    },
    linker_text: {
        color: 'darkblue'
    },
    linker_title_text: {
        fontWeight: '600'
    },
    lastestitemImage: {
        width: '90%',
        marginLeft: '5%',
        marginTop: '5%',
        height: 150,
        borderRadius: 4,
    },
    lastestimagecontainers: {
        position: 'relative',
        height: 160,
    },
    newlastest_fav: {
        top: '13%',
    },
    newlastest_price: {
        bottom: '7%',
    },
    newlastest_image_item_design: {
        position: 'absolute',
        right: '9%',
        zIndex: 99,
        backgroundColor: 'rgba(50,50,255,0.7)',
        fontWeight: '600',
        padding: 3,
        borderRadius: 5,
        overflow: 'hidden',
        color: 'white',
    }
})

const styles_1 = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '100%',
        backgroundColor: 'rgba(50,50,250,0.2)',
        height: '10%',
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    innercontainer1: {
        justifyContent: 'center',
        paddingHorizontal: 9,
    },
    innercontainer2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 9,
    },
    Textcolor: {
        color: 'rgba(0,0,255,0.5)',
        fontWeight: '900',
        fontSize: 19,
    },
    search_box_design: {
        flex: 1,
        width: '100%'
    }
})
