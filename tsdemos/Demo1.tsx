import React, { Component } from 'react';
import { View, Text} from 'react-native';
import Listitem from './Listitem';
import Dec from './Dec';

//类型断言：可以确定的指定一个值的类型
//形式：
//<Type>值 在jsx中不能用
//值 as 类型

// interface Person{
//     name:string;
//     age:number;
// }

// let user1:Person = {name:'a',age:12}
// let user2:Person = {} as Person;
// user2.name = 'liu';
// user2.age = 18;

//联合类型 或者 any
// function getLength(p1:string|number):number{
//     return (p1 as string).length
// }

// 类定义
// 用 es5方式：  创建一个Person类，有name和age属性，调用的时候传入
// function Person(name:string,age:number){
//     this.name = name;
//     this.age = age;
// }
// let user = new Person('zhang',20);
// console.log(user);

// class Person {
//     name:string;
//     age:number;
//     constructor(name:string,age:number){
//         this.age = age;
//         this.name = name;
//     }
//     sayName(){

//     }
// }
// let user =  new Person('zhangsan',18);
// console.log(user);

// class Worker extends Person{
//     static money:number;//静态属性
//     job:string;
//     constructor(name:string,age:number,job:string){
//         super(name,age);
//         this.job = job;
//     }
// }
// Worker.money = 1000;
// let user1 =  new Worker('zhangsan',19,'程序员');
// console.log(user1);

// function getMsg<T>(msg:T):T[]{
//     return [msg];
// }
// console.log(getMsg(100));

import SplashScreen from 'react-native-splash-screen'

export default class Demo1 extends Component {
    constructor(props:any){
        super(props);
        this.state = {
            title:'100'
        }
    }
    componentDidMount() {
        SplashScreen.hide();
    }
    render() {
        return (
            <View>
                <Text
                    style={{fontSize:20}}
                >
                    这里是hhhh
                </Text>
                <View style={{width:500,height:600,backgroundColor:'red'}}></View>
                <Listitem name={'ddd'} data={{id:'stringh',title:'ddd'}}/>
                <Dec/>
            </View>
        )
    }
}
