import React,{useState,useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    Image,
    FlatList,
    AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import Button from 'react-native-button';

const {width} = Dimensions.get('window');
const s = width / 640 ;

const flatlist1 = [
    {
        key:21,
        icon:'setting',
        tit:'账户管理',
    },
    {
        key:22,
        icon:'enviromento',
        tit:'收货地址',
    },
    {
        key:23,
        icon:'idcard',
        tit:'我的信息',
    },
    {
        key:24,
        icon:'profile',
        tit:'我的订单',
    },
    {
        key:25,
        icon:'qrcode',
        tit:'我的二维码',
    },
    {
        key:26,
        icon:'bank',
        tit:'我的积分',
    },
    {
        key:27,
        icon:'staro',
        tit:'我的收藏',
    },
]
const flatlist2 = [
    {
        key:31,
        icon:'tool',
        tit:'居家维修保养'
    },
    {
        key:32,
        icon:'car',
        tit:'出行接送'
    },
    {
        key:33,
        icon:'woman',
        tit:'我的受赠人'
    },
    {
        key:34,
        icon:'skin',
        tit:'我的住宿优惠'
    },
    {
        key:35,
        icon:'rocket1',
        tit:'我的活动'
    },
    {
        key:36,
        icon:'form',
        tit:'我的发布'
    },
]
const options = {
    title: '请选择上传头像的方式',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    takePhotoButtonTitle:'相机拍照',
    chooseFromLibraryButtonTitle:'从相册选取',
    cancelButtonTitle:'退出',
    rotation:0,
    permissionDenied:{
        title:'授权允许',
        text:'是否允许调用摄像机或从相册中读取照片',
        reTryTitle:'去授权',
        okTitle:'退出'
    },
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

const styles = StyleSheet.create({
    header:{
        width:'100%',
        height:340*s,
        backgroundColor:'#f23030',
        alignItems:'center',
        justifyContent:'center'
    },
    headerImage:{
        width:150*s,
        height:150*s,
        resizeMode:'cover',
        borderRadius:75*s,
        borderColor:'#fff',
        borderWidth:3*s
    },
    headerText:{
        color:'#fff',
        fontSize:24,
        marginTop:30*s
    },
    box:{
        height:495*s,
        backgroundColor:'#fff',
        marginBottom:10*s
    },
    div:{
        flexDirection: 'row',
        height:80*s,
        alignItems:'center',
        borderBottomWidth:1/3,
        borderBottomColor:'#eee'
    },
    divIcon:{
        color:'#c3c3c3',
        marginLeft:30*s,
        marginRight:30*s
    },
    divText:{
        fontSize:18,
        color:'#4f4e4e'
    },
    list:{
        width:'33%',
        height:138*s,
        alignItems:'center',
        justifyContent:'center'
    },
    listIcon:{
        color:'#b8b8b8'
    },
    listText:{
        fontSize:16,
        color:'#4f4e4e',
        marginTop:20*s
    },
    box2:{
        height:360*s,
        backgroundColor:'#fff'
    },
    bottom:{
        height:100*s,
        alignItems:'center',
        justifyContent:'center'
    },
    bottomText:{
        color:'#8b8b8b'
    }
});

const Personal = () =>  {
    let[img,setimg] = useState(require('../../img/lb03.jpg'));
    useEffect(() => {
        AsyncStorage.getItem('wow').then((res)=>{
            // console.log(JSON.parse(res));
            setimg(JSON.parse(res));
        });
        return () => {
            AsyncStorage.getItem('wow').then((res)=>{
                // console.log(JSON.parse(res));
                setimg(JSON.parse(res));
            });
        }
    }, [])
    fun = (num)=>{
        if(num === 36)
            Actions.myup();
    }
    takeimg = ()=>{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else { 
              const source = { uri: response.uri };
              AsyncStorage.setItem('wow',JSON.stringify(source),()=>console.log('wow!'));
              setimg(source);
            }
          });
    }
    unload = ()=>{
        AsyncStorage.removeItem('user');
        Actions.login();
    }
    return (      
        <ScrollView>
            <View style={styles.header}>
                <Button  onPress={()=>{takeimg()}}>
                    <Image source={img?img:require('../../img/lb03.jpg')} style={styles.headerImage}/>
                </Button>
                <Text style={styles.headerText}>BINNU DHILLON</Text>
            </View>
            <View style={styles.box}>
                <View style={styles.div}>
                    <Icon name='smileo' size={30} color='black' style={styles.divIcon}/>
                    <Text style={styles.divText}>我的个人中心</Text>
                </View>
                <FlatList
                    data={flatlist1}
                    numColumns={3}
                    renderItem={({item})=>(
                        <View style={styles.list}>
                            <Icon name={item.icon} size={30} color='black' style={styles.listIcon}/>
                            <Text  style={styles.listText}>{item.tit}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.box2}>
                <View style={styles.div}>
                    <Icon name='tago' size={30} color='black' style={styles.divIcon}/>
                    <Text style={styles.divText}>E族活动</Text>
                </View>
                <FlatList
                    data={flatlist2}
                    numColumns={3}
                    renderItem={({item})=>(
                        <View style={styles.list}>
                            <Icon name={item.icon} size={30} color='black' style={styles.listIcon}/>
                            <Text onPress={()=>fun(item.key)} style={styles.listText}>{item.tit}</Text>
                        </View>
                    )}
                />
            </View>
            <View style ={styles.bottom}>
                <Text onPress={()=>unload()} style ={styles.bottomText}>BINNU DHILLON | 退出登陆</Text>
            </View>         
        </ScrollView>
    )
}

export default Personal;
