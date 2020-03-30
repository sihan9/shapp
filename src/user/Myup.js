import React, { useState , useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    FlatList,
    TouchableOpacity,
    ToastAndroid,
    ImageBackground
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';


const {width} = Dimensions.get('window');
const s = width / 640 ;

const styles = StyleSheet.create({
    header:{
        width:'100%',
        height:75*s,
        backgroundColor:'#f23030',
        flexDirection: 'row',
        marginBottom:10*s,
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        fontSize:26,
        color:'#fff'
    },
    iconleft:{
        position:'absolute',
        left:20*s
    },
    iconright:{
        position:'absolute',
        right:20*s
    },
    list:{
        width:'100%',
        height:70*s,
        backgroundColor:'#fff',
        marginBottom:5*s,
        flexDirection: 'row',
        alignItems:'center',
    },
    listText:{
        fontSize:16,
        marginLeft:20*s,
        color:'#333'
    },
    listTimer:{
        position:'absolute',
        right:'20%',
        color:'#333'
    },
    random:{
        position:'absolute',
        right:'3%',
    },
    footer:{
        width:'100%',
        height:125*s,
        backgroundColor:'#fff',
        alignItems:'center',
        flexDirection: 'row',
        justifyContent:'space-evenly'
    },
    page:{
        width:150*s,
        height:50*s,
        backgroundColor:'#f23030',
        borderRadius:25*s,
        alignItems:'center',
        justifyContent:'center'
    },
    pageText:{
        color:'#fff',
        fontSize:18,
    },
    pagetext:{
        color:'#333',
        fontSize:18
    },
    isok:{
        alignItems:'center',
        justifyContent: 'center',
        width:"100%",
        height:200*s,
        backgroundColor:"#f23030",
        marginBottom:10
    },
    isloadText:{
        fontSize:18,
        color:'#fff',
        fontWeight:'bold'
    }
});

const Myup = () => {
    const [data, setdata] = useState([]);
    let [page, setpage] = useState('1');
    let [isok, setOk] = useState(true);
    useEffect(() => {
        // console.log('useffect');
        fetch('https://cnodejs.org/api/v1/topics?page='+page+'&limit=15')
        .then((res)=>res.json())
        .then(res=>{
            setdata(res.data);
            setTimeout(()=>setOk(false),100);
        })
    }, [page]);
    beforepage = ()=>{
        // console.log('上一页:',page);
        if(page == 1){
            ToastAndroid.show('已经是第一页了！',10);
        }else{
            setpage(--page);
        }
    }
    afterpage = ()=>{
        setpage(++page);
        // console.log("下一页"+page);
    }
    return (
        <ScrollView>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconleft} onPress={()=>{Actions.pop()}}>
                    <Icon name='left' size={30} color='#fff'/>
                </TouchableOpacity>
                <Text style={styles.title}>我的发布</Text>
                <Icon name='menuunfold' size={30} color='#fff' style={styles.iconright}/>
            </View>
            {
            isok?
            <View style={styles.isok}>
                <Text style={styles.isloadText}>正在努力加载中ing</Text>
            </View>
            :
            <View>
                <FlatList
                    data={data}
                    renderItem={({item})=>(
                        <View style={styles.list}>
                            <Text style={styles.listText}>{item.title.slice(0,10)}...</Text>
                            <Text style={styles.listTimer}>{item.create_at.slice(0,10)}</Text>
                            {Math.floor(Math.random(0,1)*2)?
                            <Text style={[styles.random,{color:'#333'}]}>已回复</Text>
                            :<Text style={[styles.random,{color:'#f23030'}]}>未回复</Text>}
                        </View>
                    )}
                />
            </View>
            }
            <View style={styles.footer}>
                <TouchableOpacity onPress={beforepage} style={styles.page}>
                    <Text style={styles.pageText}>上一页</Text>
                </TouchableOpacity>
                <Text style={styles.pagetext}>第{page}页</Text>
                <TouchableOpacity onPress={afterpage} style={styles.page}>
                    <Text style={styles.pageText}>下一页</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
export default Myup;