import React,{useEffect, useState} from 'react';
import {
  Router,
  Scene ,
  Tabs,
  Actions,
  Overlay,
  Modal,
  Lightbox,
  Drawer
} from "react-native-router-flux";
import List from './src/goods/List';
import Service from './src/home/Service';
import Personal from './src/user/Personal';
import Myup from './src/user/Myup';
import Login from './src/home/Login';
import Register from './src/home/Register';
import Icon from 'react-native-vector-icons/AntDesign';
import { BackHandler, ToastAndroid, AsyncStorage, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import SwiperPage from './src/common/SwiperPage';

//不弹出警告提示
console.disableYellowBox = true;


const App = () => {
  //清楚本地名为 user 的缓存
  // AsyncStorage.removeItem('isIntsall');
  // AsyncStorage.removeItem('user');
  let now =0;
  let [isInstall, setInstall] = useState(true);
  let [isLogin, setLogin] = useState(false);
  const init =()=>{
    AsyncStorage.getItem('isIntsall')
    .then(res=>{
      if(res){
        setInstall(false);
      }
      AsyncStorage.getItem('user')
      .then(res=>{
        let user = JSON.parse(res);
        if(!user){
          SplashScreen.hide();
        }
        if(user && user.token){
          setLogin(true);
          SplashScreen.hide();
        }
      })
    })
    
  }
  useEffect(() => {
    init();
  }, [])
  let start = ()=>{
    setInstall(false);
  }
  if(isInstall){
    return <View style={{flex:1}}>
      <SwiperPage afterInstall = {start}/>
    </View>
  }
  return (
    <Router
      backAndroidHandler={()=>{
        // console.log(Actions.currentScene);
        if(Actions.currentScene == 'login'){
          if(new Date().getTime()-now < 2000){
            BackHandler.exitApp();
            return false;
          }else{
            ToastAndroid.show('确定退出吗？',10);
            now = new Date().getTime();
            return true;
          }
        }
        if(Actions.currentScene != '_service'){
          Actions.pop();
          return true;
        }else{
          if(new Date().getTime()-now < 2000){
            BackHandler.exitApp();
            return false;
          }else{
            ToastAndroid.show('确定退出吗？',10);
            now = new Date().getTime();
            return true;
          }
        }
      }}
    >
      <Overlay>
        <Modal key = 'modal' hideNavBar>
          <Lightbox key = "lightbox">
            <Drawer key = "drawer">
              <Scene key="root">
                <Tabs
                  key='tabbar'
                  hideNavBar
                  activeTintColor='#f23030'
                  inactiveTintColor='#9f9f9f'
                  tabBarStyle={{backgroundColor:'#fff'}}
                >
                  <Scene
                    title="首页"
                    key="service" 
                    component={Service} 
                    hideNavBar
                    icon  = {({focused})=><Icon name="home" size={25} color={focused?'#f23030':'#9f9f9f'}/>}
                  />
                  <Scene
                    title="商品分类"
                    key="list" 
                    component={List} 
                    hideNavBar
                    icon  = {({focused})=><Icon name="appstore-o" size={25} color={focused?'#f23030':'#9f9f9f'}/>}
                  />
                  <Scene
                    title="个人中心"
                    key="personal" 
                    component={Personal} 
                    hideNavBar
                    icon  = {({focused})=><Icon name="user" size={25} color={focused?'#f23030':'#9f9f9f'}/>}
                  />
                </Tabs>
                <Scene
                  title="我的发布"
                  key="myup" 
                  component={Myup}
                  hideNavBar
                />
              </Scene>
            </Drawer>
          </Lightbox>
          <Scene initial={!isLogin} key="login" component={Login} />
          <Scene key="register" component={Register} />
        </Modal>
      </Overlay>
      
    </Router>
  );
};

export default App;