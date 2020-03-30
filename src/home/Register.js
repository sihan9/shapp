import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity,
AsyncStorage,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils';

const styles = StyleSheet.create({
  main:{
    flex: 1
  },
  mainView:{
    marginTop:50,
    alignItems: 'center'
  },
  input:{
    width: '80%',
    marginRight: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop:20,
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
  }
});

export default class Register extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            samepwd:'',
            tips:'',
            isregister:false,
            pwdissame:false
        }
    }
    userhandle = (text)=>{
        this.setState({username:text});
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text});
    }
    samepwdhandle = (text)=>{
        this.setState({samepwd:text},()=>{
          if(this.state.samepwd === this.state.pwd){
            this.setState({tips:''});
            this.setState({pwdissame:true});
          }else{
            this.setState({tips:'密码不一致'});
          }
        });
    }
    register = ()=>{
      if(
        this.state.username != '' &&
        this.state.pwd != '' &&
        this.state.samepwd != '' &&
        this.state.pwdissame
      ){
        myFetch.post('/register',{
          username:this.state.username,
          pwd:this.state.pwd
        }).then(res=>{
          if(res.data.isregister )
            Actions.login();
          else
            this.setState({tips:'该用户名已注册，注册失败'})
        })
      }else{
        this.setState({tips:'确认密码不正确 或 注册信息未填写！'})
      }
    }
    onblur = ()=>{
      if(this.state.username === '')
        this.setState({tips:"用户名不能为空"});
      else if(this.state.pwd === '')
        this.setState({tips:"密码不能为空"});
      else if(this.state.samepwd === '')
        this.setState({tips:"确认密码不能为空"});
      else
        this.setState({tips:""});
    }

  render() {
    return (
      <ImageBackground style={styles.main}
        source={require('../../img/kp03.jpeg')}
      >
        <View style={styles.mainView}>
          <View style={styles.input}>
            <Icon name="user" color="#ccc" size={30}/>
            <TextInput placeholder="用户名" 
              placeholderTextColor="#ccc"
              style={styles.inputText}
              onChangeText={this.userhandle}
              onBlur = {this.onblur}
            />
          </View>
          <View style={styles.input}>
            <Icon name="lock1" color="#ccc" size={30}/>
            <TextInput 
              placeholder="密码"  
              placeholderTextColor="#ccc"
              style={styles.inputText}
              secureTextEntry={true} 
              onChangeText={this.pwdhandle}
              onBlur = {this.onblur}
            />
          </View>
          <View style={styles.input}>
            <Icon name="lock1" color="#ccc" size={30}/>
            <TextInput  
              placeholderTextColor="#ccc"
              style={styles.inputText}
              placeholder="确认密码" 
              secureTextEntry={true} 
              onChangeText={this.samepwdhandle}
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
              onPress={()=>this.register()}>
              <Text style={styles.btnText}>注册账号</Text>
          </TouchableOpacity>
          <TouchableOpacity  
              style={styles.btn}
              onPress={()=>{Actions.login()}}>
              <Text style={styles.btnText}>返回登录</Text>
          </TouchableOpacity>
         
        </View>
      </ImageBackground>
    );
  }
}