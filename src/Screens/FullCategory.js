import React, {useEffect, useState, useContext} from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import {Image} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
//import GridList from 'react-native-grid-list';
import axios from 'axios'

import HeaderCat from './DrawerScreens/HeaderCat'
import {BASE_URL} from '../CONFIG'
import {MoonAppContext} from '../MoonAppContext'
import {MoonAlert, MoonLoader} from './MoonAlerts'

export default function FullCategory({navigation}) {
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
            fd.append('user_id','')
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
            <HeaderCat navigation={navigation}/>
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
                        numColumns={2}
                        key={2}
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
        height: 120,
        borderRadius: 4
    },
    category_card: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.3)',
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 1,
        shadowRadius: 4,
        borderRadius: 4,
        backgroundColor: 'white',
        
    },
})