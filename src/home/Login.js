import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity,
AsyncStorage,ImageBackground, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils';

const styles = StyleSheet.create({
  main:{
    flex: 1,
    justifyContent: 'center'
  },
  mainView:{
    alignItems: 'center'
  },
  input:{
    width: '80%',
    marginRight: 10,
    borderBottomColor: '#fff',
    borderBottomWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  },
  inputText:{
    fontSize:20,
    fontWeight:"bold"
  },
  btn:{
    width: '80%',
    height: 40,
    backgroundColor: '#f23030',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10
  },
  btnText:{
    fontSize:24,
    color:'#fff'
  },
  isloadView:{
    width:"30%",
    height:"30%",
    position:"absolute",
    top:"35%",
    left:"35%"
  },
  isload:{
    width:"100%",
    height:'100%',
    position:"absolute",
    backgroundColor:"#fff",
    top:0,
    left:0,
    opacity:0.8,
  },
  isloadText:{
    fontSize:30,
    color:'#000'
  },
  isloadImage:{
    width:'100%',
    height:"60%"
  }
});

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            isloading:false
        }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    login = ()=>{
      // myFetch.get('/home',{limit:4})
      myFetch.post('/login',{
        username:this.state.username,
        pwd:this.state.pwd}
      ).then(res=>{
        //根据返回状态进行判断，正确的时跳转首页
        AsyncStorage.setItem('user',JSON.stringify(res.data))
        .then(()=>{
            this.setState({isloading:true},()=>{
              setTimeout(()=>Actions.service(),1000);
            });
        })
      })
    } 
  render() {
    return (
      <View style={styles.main}>
        <ImageBackground style={styles.main}
          source={require('../../img/kp05.jpg')}
        >
          <View
            style={styles.mainView}>
            <View style={styles.input}>
              <Icon name="user" color="#fff" size={30}/>
              <TextInput placeholder="用户名" 
                placeholderTextColor="#fff"
                style={styles.inputText}
                onChangeText={this.userhandle}
              />
            </View>
            <View style={styles.input}>
              <Icon name="lock1" color="#fff" size={30}/>
              <TextInput 
                  onChangeText={this.pwdhandle}
                  style={styles.inputText}
                  placeholderTextColor="#fff"
                  placeholder="密码" 
                  secureTextEntry={true} 
              />
            </View>
            <TouchableOpacity 
                style={styles.btn}
                onPress={this.login}>
                <Text style={styles.btnText}>登录</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.btn}
                onPress={()=>{Actions.register()}}>
                <Text style={styles.btnText}>去注册</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {
          this.state.isloading?
          <View style={styles.main,styles.isload}>
            <View style={styles.isloadView}>
              <Image style={styles.isloadImage} source={require('../../img/load.png')}></Image>
              <Text style={styles.isloadText}>正 在 登 陆</Text>
            </View>
          </View>
          :null
        }
      </View>
    );
  }
}