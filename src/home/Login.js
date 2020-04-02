import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity,
AsyncStorage,ImageBackground, Image, Platform, BackHandler, ToastAndroid} from 'react-native';
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
  tip:{
    width: '80%',
    height: 40,
    justifyContent: 'center',
    marginLeft:'20%'
  },
  tipText:{
    color:'red',
    fontSize:20
  },
  btn:{
    width: '80%',
    height: 40,
    backgroundColor: '#f23030',
    marginBottom: 30,
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
    fontSize:18,
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
            tips:'',
            isloading:false
        }
    }
    componentDidMount(){
      if(Platform.OS === 'android'){
        BackHandler.addEventListener('hardwareBackPress',this.onBack);
      }
    }
    componentWillUnmount(){
      if(Platform.OS === 'android'){
        BackHandler.removeEventListener('hardwareBackPress',this.onBack);
      }
    }
    onBack = () =>{
      if(this.lastBackPressed && this.lastBackPressed +2000 >Date.now()){
        BackHandler.exitApp();
        return false;
      }else{
        this.lastBackPressed = Date.now();
        ToastAndroid.show('确定退出吗？',1000);
        return true;
      }
    }
    userhandle = (text)=>{
      this.setState({username:text})
      if(this.state.username != '')
        this.setState({tips:""});
    }
    pwdhandle = (text)=>{
      this.setState({pwd:text})
      if(this.state.pwd != '')
        this.setState({tips:""});
    }
    login = ()=>{
      if(
        this.state.username != '' &&
        this.state.pwd != ''
      ){
        myFetch.post('/login',{
          username:this.state.username,
          pwd:this.state.pwd}
        ).then(res=>{
          if(res.data.islogin == "1"){
            AsyncStorage.setItem('user',JSON.stringify(res.data))
            .then(()=>{
              this.setState({isloading:true},()=>{
                setTimeout(()=>Actions.service(),1000);
              });
            })
          }else{
            this.setState({tips:"用户名/密码不正确 或 未注册"});
          }
        })
      }else{
        this.setState({tips:"请填写登陆信息！"});
      }
    }
    onblur = ()=>{
      if(this.state.username === '')
        this.setState({tips:"用户名不能为空"});
      else if(this.state.pwd === '')
        this.setState({tips:"密码不能为空"});
      else
        this.setState({tips:""});
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
              <TextInput placeholder="用户名:sh or hh" 
                placeholderTextColor="#fff"
                style={styles.inputText}
                onChangeText={this.userhandle}
                onBlur = {this.onblur}
              />
            </View>
            <View style={styles.input}>
              <Icon name="lock1" color="#fff" size={30}/>
              <TextInput 
                  style={styles.inputText}
                  placeholderTextColor="#fff"
                  placeholder="密码:111 or 222" 
                  secureTextEntry={true} 
                  onChangeText={this.pwdhandle}
                  onBlur = {this.onblur}
              />
            </View>
            <View style={styles.tip}>
              <Text style={styles.tipText}>
                {this.state.tips}
              </Text>
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