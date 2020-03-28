import React, { Component } from 'react';
import { View, Text, StatusBar} from 'react-native';

//装饰器其实就是一个函数，在函数里可以写一些新的逻辑
//包裹后面修饰的内容，将新的逻辑传递到被修饰的内容中去
//高阶组件--其实就是一个函数，就是装饰器
//@expr 这种语法其实是语法堂

// function helloWord(target: any) {
//     console.log('hello Word!');
// }

// @helloWord
// class HelloWordClass {
//     sayhello(){}
// }

// //定义
// function addUrl(target:any){
//     target.prototype.url = 'https://baidu.com'
// }

// @addUrl
// class HomeServer{
//     getDate(){
//         console.log(this.url);
//     }
// }
// let home = new HomeServer();
// home.getDate();

// class UserServer{
//     url:string | undefined
//     getInfor(){

//     }
// }

// //带参数装饰器 （装饰器工厂）
// function addUrl(url:string){
//     return function(target:any){//这个才是装饰器
//         target.prototype.url = url;
//         return class extends target{
//             name:string = 'hhh'
//         }

//     }
// }

// @addUrl('https://www.baidu.com')
// class HomeServer{
//     url:string | undefined
//     getDate(){
//         console.log(this.url);
//         console.log(this.name);
//     }
// }
// let home = new HomeServer();
// home.getDate();

function setStatusBar(color:string){
    return function(WrapComponent:any){
        return class extends Component{
            render(){
                return (
                    <>
                    <StatusBar backgroundColor='red'/>
                    <Text>{color}</Text>
                    <WrapComponent/>
                    </>
                )
            }
        }

    }
}
// //方法装饰器
// function enumerable(value: boolean) {
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         //target是类原型对象,不是高段函数了
//         //不需要加prototype了
//         target.name = 'liu'
//         console.log(target);
//         console.log(propertyKey);
//         console.log(descriptor);
//         descriptor.enumerable = value;
//     };
// }
// class Greeter {
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//     }

//     @enumerable(false)
//     greet() {
//         return "Hello, " + this.greeting;
//     }
// }
// console.log(new Greeter('hello').name);

function enumerable(value: boolean) {
    console.log('aaa');
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log('bbb');
        descriptor.enumerable = value;
    };
}
function log(target:any,methodName:string,des:PropertyDescriptor){
    console.log('ccc');
    var oldValue = des.value;
    des.value = function(){
        console.log(methodName+'被调用');
        return oldValue.apply(this,[...arguments]);
    }
}
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    @log
    greet(msg:string) {
        return "Hello, " + this.greeting+msg;
    }
}
let msg = new Greeter('hello')
console.log(msg.greet(' greet参数'));

//属性装饰器 以下功能没有实现
// function DefaultValue(value: string) {
//     return function (target: any, propertyName: string) {
//         target[propertyName] = value;
//     }
// }

// class Hello {
//     @DefaultValue("Hello") greeting: any;
// }

// console.log(new Hello().greeting);

@setStatusBar('red')
export default class Dec extends Component {
    render() {
        return (
            <View>
                <StatusBar backgroundColor="transform"/>
                <Text
                    style={{fontSize:20}}
                >
                    Dec
                </Text>
            </View>
        )
    }
}