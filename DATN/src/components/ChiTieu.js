import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
export default class ChiTieu extends React.Component{
  render(){
    let data = [{
      value: 'Chi Tiêu',
    }, {
      value: 'Thu Nhập',
    }, {
      value: 'Chuyển Khoản',
    }, {
      value: 'Điều Chỉnh Số Dư'
    }];
    return(
      <View style={styles.total}>
        <View style={styles.head}>
          <Icon name="rocket" color="white" size={20}></Icon>
          <Icon name="rocket" color="white" size={20}></Icon>
          <Icon name="rocket" color="white" size={20}></Icon>
        </View>
        <View style={styles.center}>

        </View>
        <View style={styles.foot}>

        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  total:{
    flex: 1
  },
  head:{
    flex: 1,
    backgroundColor:"#4267B2",
    justifyContent:'center',
    flexDirection:'row',
    paddingTop:5
  },
  center:{
    flex:14,
    backgroundColor:"white"
  },
  foot:{
    flex:1,
    backgroundColor:"#4267B2"
  }
});
