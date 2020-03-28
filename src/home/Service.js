import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    Image,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
import Button from 'react-native-button';

const {width} = Dimensions.get('window');
const s = width / 640 ;

const lists = [
    {
        key:10,
        title: '居家维修保养',
        img: require('../../img/service01.png')
    },
    {
        key:20,
        title: '住宿优惠',
        img: require('../../img/service02.png')
    },
    {
        key:30,
        title: '出行接送',
        img: require('../../img/service03.png')
    },
    {
        key:40,
        title: 'E族活动',
        img: require('../../img/service04.png')
    },
]

const styles = StyleSheet.create({
    header:{
        height: 76*s,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#f23030',
        flexDirection: 'row'
    },
    search:{
        width: 500*s,
        height: 50*s,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input:{
        opacity:0.7,
        width: 480*s,
        height: 50*s,
        backgroundColor:'#fff',
        borderRadius:25*s,
        paddingLeft:70*s,
        paddingTop:0,
        paddingBottom:0
    },
    icon:{
        position:'absolute',
        left:20*s
    },
    swiper:{
        width:'100%',
        height:273*s
    },
    wrapper: {
        
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slideImage: {
        width:'100%',
        resizeMode:'cover'
    },
    list:{
        width:'100%',
        height:120*s,
        backgroundColor:'#fff',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:15*s
    },
    listImage:{
        height:'80%',
        resizeMode:'contain',
    },
    listText:{
        position:'absolute',
        left:170*s,
        fontSize:20,
        color:'#333'
    },
    listIcon:{
        position:'absolute',
        right:30*s,
        color:'#d8d8d8'
    },
    button:{
        width:'90%',
        height: 70*s,
        borderRadius: 10*s,
        textAlignVertical: 'center',
        backgroundColor:'#f23030',
        color: '#fff',
        marginTop:20*s,
        marginLeft:'5%'
    },
    bottom:{
        position:'absolute',
        bottom:0,
        left:'38%'
    },
    bottomText:{
        color:'#8b8b8b'
    }
});

const Service = () =>  {

    return (
        <View style={{flex:1}}>
            <View style={styles.header}>
                <View style={styles.search}>
                    <Icon name='search1' size={20} style={styles.icon} color='#fff'/>
                    <TextInput 
                        placeholder="请输入商品名称"
                        style={styles.input}
                    />
                </View>
                <Icon name='shoppingcart' size={30} color='#fff'/>
            </View>
            <View style={styles.swiper}>
                <Swiper
                    style={styles.wrapper}
                    showsButtons={false}
                    autoplay={true}
                    dotColor='#fff'
                    activeDotColor='#fd0304'
                >
                    <View style={styles.slide}>
                        <Image source={require('../../img/lb01.jpg')} style={styles.slideImage}/>
                    </View>
                    <View style={styles.slide}>
                        <Image source={require('../../img/lb02.jpg')} style={styles.slideImage}/>
                    </View>
                    <View style={styles.slide}>
                        <Image source={require('../../img/lb03.jpg')} style={styles.slideImage}/>
                    </View>
                </Swiper>
            </View>
            <View>
                <FlatList
                    data={lists}
                    renderItem={({item})=>(
                        <View style={styles.list}>
                            <Image source={item.img} style={styles.listImage}/>
                            <Text style={styles.listText}>{item.title}</Text>
                            <Icon name='right' style={styles.listIcon} size={20}/>
                        </View>
                    )}
                />
            </View>
            <View>
                <Button 
                    style={styles.button}
                >发布需求</Button>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.bottomText}>©E族之家 版权所有</Text>
            </View>
        </View>
    )
}

export default Service;