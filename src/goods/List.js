import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TextInput,
    Image,
    Dimensions,
    Statusbar
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const goods = [
    {
        key:0,
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '36.00',
        img: require('../../img/shj.png')
    },
    {
        key:1,
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '36.00',
        img: require('../../img/sp.png')
    },
    {
        key:2,
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '36.00',
        img: require('../../img/shj.png')
    },
    {
        key:3,
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '36.00',
        img: require('../../img/sp.png')
    },
    {
        key:4,
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '36.00',
        img: require('../../img/shj.png')
    },
    {
        key:5,
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '36.00',
        img: require('../../img/sp.png')
    },
]
const {width,height} = Dimensions.get('window');
const s = width / 640 ;

const styles = StyleSheet.create({
    header:{
        height: 70*s,
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1/3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    search:{
        width: 544*s,
        height: 50*s,
        backgroundColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius:5
    },
    input:{
        width: 490*s,
        height: 50*s,
        backgroundColor:'#eee',
        borderRadius:5,
        paddingLeft:30*s,
        paddingTop:0,
        paddingBottom:0,
    },
    bar:{
        height: 73*s,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    barText0:{
        fontSize:20,
        color:"#f23030"
    },
    barText1:{
        fontSize:20,
        color:'#333'
    },
    list:{
        backgroundColor:'#fff',
        width:'46%',
        marginTop:10,
        marginLeft:18*s
    },
    listImg1:{
        resizeMode:'contain',
        width:width*0.3,
        marginTop:'10%',
        marginLeft:'15%',
        marginBottom:'10%'
    },
    listImg2:{  
        resizeMode:'contain',
        width:width*0.35,
        marginTop:'10%',
        marginLeft:'12%',
        marginBottom:'10%'
    },
    listText1:{
        fontSize:14,
        color:'#333',
        marginLeft:'5%',
        marginRight:'5%',
        marginBottom:'10%'
    },
    listText2:{
        fontSize:14,
        color:'#f23030',
        marginLeft:'5%',
        marginRight:'5%',
        marginBottom:'10%'
    }
});

const List = () =>  {
    return (
        <View>
            {/* <Statusbar backgroundColor="red" /> */}
            <View style={{backgroundColor: '#fff'}}>
                <View style={styles.header}>
                    <View style={styles.search}>
                        <TextInput 
                            placeholder="请输入商品名称"
                            style={styles.input}
                        />
                        <Icon name='search1' size={20}/>
                    </View>
                </View>
                <View style={styles.bar}>
                    <Text style={styles.barText0}>综合</Text>
                    <Text style={styles.barText1}>销量</Text>
                    <Text style={styles.barText1}>新品</Text>
                    <Text style={styles.barText1}>价格</Text>
                    <Text style={styles.barText1}>信用</Text>
                </View>
            </View>
            <View  style={{height:height-230*s}}>
                <FlatList
                    data={goods}
                    numColumns={2}
                    renderItem={({item})=>(
                        <View style={styles.list}>
                            <Image 
                                source={item.img}
                                style={styles.listImg1}
                            />
                            <Text style={styles.listText1}>{item.title}</Text>
                            <Text style={styles.listText2}>{item.price}</Text>
                        </View>
                    )}
                />
            </View>
        </View>  
    )
}

export default List;