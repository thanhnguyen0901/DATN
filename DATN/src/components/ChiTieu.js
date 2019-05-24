import React, {Component} from "react";
import {View, Text, StyleSheet, Picker, Dimensions, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const width = Dimensions.get('window').width;

export default class ChiTieu extends React.Component{
  render(){
    return(
      <View style={styles.total}>
        <View style={styles.head}>
          <TouchableOpacity style={{flex:1/4, textAlign: 'center', justifyContent:'center', alignItems:'center'}}>
            <Icon name="flag" color="white" size={20}></Icon>
            <Text style={{fontSize:10, color:'white'}}>Thống kê</Text>
          </TouchableOpacity>
          <Picker
            style={[styles.picker]}
            itemTextStyle={{ color: '#0081C7' }}
            textStyle={{ color: '#0081C7' }}
            mode="dropdown"
          >
              <Picker.Item label="Chi Tiêu" value="Chi Tiêu" />
              <Picker.Item label="Thu Nhập" value="Thu Nhập" />
              <Picker.Item label="Chuyển Khoản" value="Chuyển Khoản" />
              <Picker.Item label="Điều Chỉnh Số Dư" value="Điều Chỉnh Số Dư" />
          </Picker>

          <TouchableOpacity style={{flex:1/4, textAlign: 'center', justifyContent:'center', alignItems:'center'}}>
            <Icon name="check" color="white" size={20}></Icon>
            <Text style={{fontSize:10, color:'white'}}>Ghi</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.center}>

        </View>

        <View style={styles.foot}>
          <TouchableOpacity style={{flex:1, textAlign: 'center', justifyContent:'center', alignItems:'center'}}>
            <Icon name="home" color="black" size={20}></Icon>
            <Text style={{fontSize:10}}>Tổng quan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{flex:1, textAlign: 'center', justifyContent:'center', alignItems:'center'}}>
            <Icon name="money" color="black" size={20}></Icon>
            <Text style={{fontSize:10}}>Tài khoản</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{justifyContent:'center'}}>
            <Icon name="plus-circle" color="#4267B2" size={40} style={{textAlign: 'center'}}></Icon>
          </TouchableOpacity>

          <TouchableOpacity style={{flex:1, textAlign: 'center', justifyContent:'center', alignItems:'center'}}>
            <Icon name="filter" color="black" size={20}></Icon>
            <Text style={{fontSize:10}}>Hạn mức chi</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{flex:1, textAlign: 'center', justifyContent:'center', alignItems:'center'}}>
            <Icon name="ellipsis-h" color="black" size={20}></Icon>
            <Text style={{fontSize:10}}>Khác</Text>
          </TouchableOpacity>
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
    flexDirection:'row',
    paddingTop:5,
    paddingLeft:5,
    paddingRight:5,
    alignItems: 'center',
    textAlign:'center'
  },
  center:{
    flex:14,
    backgroundColor:"#dee5ef"
  },
  foot:{
    flex:1,
    backgroundColor:"white",
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  picker: {
    color: 'white',
    flex: 2/4,
    textAlign: 'center'
    //backgroundColor: '#4267B2'
  }
});
