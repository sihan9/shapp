import React, { Component } from 'react';
import { View, Text} from 'react-native';

interface Props{
    name:string;
    data:{
        id:string,
        title:string
    }
}
interface State{
    title:string
}


export default class Listitem extends Component<Props,State> {
    constructor(props:Props){
        super(props);
        this.state = {
            title:'100'
        }
    }
    render() {
        return (
            <View>
                <Text
                    style={{fontSize:20}}
                >
                    这里是listitem
                </Text>
            </View>
        )
    }
}