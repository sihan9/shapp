import React, { Component } from 'react'
import { Text, View,Image,StyleSheet, ScrollView, AsyncStorage,TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'

export default class SwiperPage extends Component {
    start = ()=>{
        console.log("start");
        AsyncStorage.setItem('isIntsall','true',()=>{
            this.props.afterInstall();
        });
    }
    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={false}>
                <View style={styles.slide1}>
                    <Image style={styles.img} source={require('../../img/kp01.jpg')}/>
                </View>
                <View style={styles.slide1}>
                    <Image style={styles.img} source={require('../../img/kp02.png')}/>
                    <TouchableOpacity style={styles.start} onPress={this.start}>
                        <Text style={styles.startText}>开始体验</Text>
                    </TouchableOpacity>
                </View>
            </Swiper>
        )
    }
}
const styles = StyleSheet.create({
    wrapper:{},
    img:{
        height:'100%',
        width:'100%'
    },
    slide1:{
        flex:1,
        width:'100%',
        height:'100%'
    },
    start:{
        position:'absolute',
        bottom:150,
        left:'35%',
        width:"30%",
        height:40,
        backgroundColor:'#f23030',
        borderRadius:20,
        alignItems: 'center',
        justifyContent:'center',
    },
    startText:{
        fontSize:18,
        color:'#fff',
    }
})