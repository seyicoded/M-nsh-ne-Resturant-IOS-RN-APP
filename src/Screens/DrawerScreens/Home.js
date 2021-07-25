import React, {useEffect, useState, useContext} from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import {Image} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
//import GridList from 'react-native-grid-list';
import axios from 'axios'

import Header from './Header'
import {BASE_URL} from '../../CONFIG'
import {MoonAppContext} from '../../MoonAppContext'
import {MoonAlert, MoonLoader} from '../MoonAlerts'

export default function Home({navigation, route}) {
    //category
    const context = useContext(MoonAppContext);

    const [categoriesData, setcategoriesData] = useState([])
    const [lastestItemData, setlastestItemData] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [showError, setshowError] = useState(false)
    const [showMessage, setshowMessage] = useState(false)
    const [AlertMessage, setAlertMessage] = useState('Network Error')
    const [new_dishesgrid, setnew_dishesgrid] = useState(2)

    const loadAllDatas = ()=>{
        const asyncLoader = async ()=> {
            //get cat
            const fetchcatData = await axios.get(BASE_URL+'category')
            setcategoriesData(fetchcatData.data.data)

            //get lastest
            const fd = new FormData();
            fd.append('user_id', (((context[0].id) == 'false') ? '': context[0].id) )
            const fetchlastestitemData = await axios.post(BASE_URL+'latestitem',fd)
            setlastestItemData(fetchlastestitemData.data.data.data)
            

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
            <Header navigation={navigation} type="hasDrawer"/>
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
                <View>
                    <Image style={{width: '100%', height: 210}} source={require('../../../assets/moonshine/YK-roasted-squash-chickpeas-threeByTwoSmallAt2X.jpg')} PlaceholderContent={<ActivityIndicator />}/>
                </View>
                <View>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', padding: 15}}>
                        <Text style={styles.linker_title_text}>Categories</Text>
                        <TouchableOpacity onPress={ ()=>{ navigation.navigate('stack_full_catgory')}}>
                            <Text style={styles.linker_text}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={categoriesData}
                        renderItem={({ item }) => (
                            <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                margin: 10,
                                ...styles.category_card
                            }}>
                            {/* <Text>{item.id}</Text> onPress={ ()=>{console.log('item.id')} }*/}
                            <TouchableOpacity onPress={ ()=>{ navigation.navigate('stack_full_item_under_catgory', {category_id: item.id, category_name: item.category_name}) }}>
                                <View style={{width: '100%', flex:1}}>
                                    <Image source={{ uri: item.image}} style={styles.categoryImage} PlaceholderContent={<ActivityIndicator />}/>
                                </View>
                                <View style={{alignItems: 'center', marginTop: 3}}>
                                    <Text numberOfLines={1} style={styles.category_title}>{item.category_name}</Text>
                                </View>
                                <Text></Text>
                            </TouchableOpacity>
                            </View>
                        )}
                        //Setting the number of column
                        numColumns={4}
                        keyExtractor={(item, index) => index.toString()}
                        />
                </View>

                <View>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', padding: 15}}>
                        <Text style={styles.linker_title_text}>Our New Dishes</Text>
                        <Icon name="ios-grid" size={24} onPress={()=>{ ((new_dishesgrid == 2) ? setnew_dishesgrid(1) : setnew_dishesgrid(2)) }} style={styles.linker_text} />
                    </View>
                    <FlatList
                        data={lastestItemData}
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