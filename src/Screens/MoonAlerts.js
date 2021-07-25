import React from 'react'
import { View, Image, Text,StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import Iconi from 'react-native-vector-icons/Ionicons';
import Icona from 'react-native-vector-icons/AntDesign';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function MoonLoader() {

    return (
        <View style={{...styles.modal_cover,width: windowWidth,height: windowHeight,zIndex: 10000,}}>
            <View>
                {/* <ActivityIndicator size='large' color='blue'/> */}
                <Image source={require('../../assets/moonshine/loader1.gif')}/>
            </View>
        </View>
    )
}

export function MoonAlert(props){
    //type: error::success::message
    //console.log(props)

    return (
        <View style={{...styles.modal_cover,width: windowWidth,height: windowHeight,zIndex: 1000,}}>
            <View style={styles.card}>
                {
                    (props.type == 'error') ? (
                        <Icon name="circle-with-cross" size={ ((Platform.OS == 'android') ? 70:90) } color="red" />
                    ) : (
                        
                        (props.type == 'success') ? (
                            <Iconi name="md-checkmark-circle" size={108} color="rgba(9,229,15,0.9)" />
                        ) : (
                            <Icona name="message1" size={91} color="black" />
                        )
                        
                    )
                }
                <Text></Text>
                <Text style={styles.card_message}>{props.message}</Text>
                {
                    (props.type !== 'success') ? (
                        <TouchableOpacity onPress={()=>{
                            const dism = props.hideModal
                            dism(false)
                        }}>
                            <Text style={styles.card_dismiss}>DISMISS</Text>
                        </TouchableOpacity>
                    ) : (<></>)
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modal_cover: {
        position: 'absolute',
        flex: 1,
        
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.4)'
    },
    card: {
        backgroundColor: 'rgb(255,250,250)',
        paddingVertical: 25,
        paddingHorizontal: 25,
        borderRadius: 10,
        width: '70%',
        alignItems: 'center',
        shadowColor: 'rgba(10,30,210,0.2)',
        shadowOffset: {width: 6, height: 10},
        shadowRadius: 4,
        shadowOpacity: 1,
        elevation: 110
    },
    card_message: {
        fontSize: 18,
        ...Platform.select({
            android: {
                fontSize: 14
            }
        }),
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black'
    },
    card_dismiss: {
        padding: 15,
        paddingHorizontal: 22,
        marginTop: 25,
        backgroundColor: 'blue',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        overflow: 'hidden',
        borderRadius: 8,
        ...Platform.select({
            android: {
                fontSize: 18,
                backgroundColor: 'rgb(50,55,210)'
            }
        }),
    }
    
})