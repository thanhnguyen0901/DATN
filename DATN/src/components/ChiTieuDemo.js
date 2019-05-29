import React, {Component} from "react";
import {View, Text, StyleSheet, Picker, Dimensions, TouchableOpacity, TextInput} from "react-native";
import {Card, DatePicker, Button, Item, Input, Container, Header, Content} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import { CalculatorInput } from 'react-native-calculator'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const width = Dimensions.get('window').width;

export default class ChiTieuDemo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      soTien: '0',
      hangMuc: '',
      moTa: '',
      ngayChi: '',
      taiKhoan: '',
      nguoiChi: ''
    };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
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
          <Card>
            <View>
              <Text style={styles.titleText}> Số tiền </Text>
              <TextInput style={styles.inputMoney} placeholderTextColor="red" keyboardType="numeric" placeholder="0" onChangeText={(value) => this.setState({ soTien: value })} underlineColorAndroid="transparent" />
            </View>
          </Card>

          <Card>
            <Text style={styles.titleText}>Chọn hạng mục</Text>
            <View style={[styles.inputWrap, {
                alignItems: "center", borderColor: '#4267B2',
                borderRadius: 4, justifyContent: "center", borderWidth: 1, marginLeft: 14, marginRight: 14
            }]}>
                <Picker
                    style={{color: 'black', flex: 1, textAlign: 'center'}}
                    itemTextStyle={{ color: 'black' }}
                    textStyle={{ color: 'black' }}
                    mode="dropdown"
                    //iosIcon={<Icon name="ios-arrow-down-outline" style={{ color: '#0081C7' }} />}
                    //selectedValue={this.state.loai_nha_thau}
                    //onValueChange={(value) => this.set_state_loai_nha_thau(value)}
                >
                    <Picker.Item label="Chọn hạng mục" value="Chọn hạng mục" />
                    <Picker.Item label="Ăn uống" value="Ăn uống" />
                    <Picker.Item label="Khác" value="Khác" />
                </Picker>
            </View>
            <TextInput
              style={styles.input}
              placeholderTextColor="#d3d3d3"
              placeholder="Mô tả"
              //onChangeText={(text) => this.setState({text})}
              //value={this.state.text}
            />

            <DatePicker
              locale={"vn"}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Ngày chi: "
              textStyle={{ color: "black" }}
              placeHolderTextStyle={{ color: "grey" }}
              onDateChange={this.setDate}
              disabled={false}
            />
            <Text style={styles.titleText}>
              Ngày chi: {this.state.chosenDate.toString().substr(4, 12)}
            </Text>

            <Text style={styles.titleText}>Tài khoản</Text>
            <View style={[styles.inputWrap, {
                alignItems: "center", borderColor: '#4267B2',
                borderRadius: 4, justifyContent: "center", borderWidth: 1, marginLeft: 14, marginRight: 14
            }]}>
                <Picker
                    style={{color: 'black', flex: 1, textAlign: 'center'}}
                    itemTextStyle={{ color: 'black' }}
                    textStyle={{ color: 'black' }}
                    mode="dropdown"
                    //iosIcon={<Icon name="ios-arrow-down-outline" style={{ color: '#0081C7' }} />}
                    //selectedValue={this.state.loai_nha_thau}
                    //onValueChange={(value) => this.set_state_loai_nha_thau(value)}
                >
                    <Picker.Item label="Chọn hạng mục" value="Chọn hạng mục" />
                    <Picker.Item label="Ăn uống" value="Ăn uống" />
                    <Picker.Item label="Khác" value="Khác" />
                </Picker>
            </View>
            <Text style={styles.titleText}>Người chi</Text>
            <View style={[styles.inputWrap, {
                alignItems: "center", borderColor: '#4267B2',
                borderRadius: 4, justifyContent: "center", borderWidth: 1, marginLeft: 14, marginRight: 14
            }]}>
                <Picker
                    style={{color: 'black', flex: 1, textAlign: 'center'}}
                    itemTextStyle={{ color: 'black' }}
                    textStyle={{ color: 'black' }}
                    mode="dropdown"
                    //iosIcon={<Icon name="ios-arrow-down-outline" style={{ color: '#0081C7' }} />}
                    //selectedValue={this.state.loai_nha_thau}
                    //onValueChange={(value) => this.set_state_loai_nha_thau(value)}
                >
                    <Picker.Item label="Chọn hạng mục" value="Chọn hạng mục" />
                    <Picker.Item label="Ăn uống" value="Ăn uống" />
                    <Picker.Item label="Khác" value="Khác" />
                </Picker>
            </View>
          </Card>
          <Button style={{height:30, width:60, justifyContent:'center', textAlign:'center', alignItems:'center', marginLeft:170}}>
            <Text>Ghi</Text>
          </Button>
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
  },
  inputWrap: {
    marginVertical: 5,
    height: 45,
    backgroundColor: "transparent",
    paddingHorizontal: 15,
  },
  input: {
      margin:12,
      height: 45,
      color: 'black',
      textAlign:'right',
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      fontSize: 20
    },
    inputMoney:{
      margin:12,
      height: 45,
      color: 'red',
      textAlign:'right',
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      fontSize: 20
    },
    titleText:{
      color: '#4267B2',
      fontSize: 15,
      fontFamily: 'Times New Roman'
    }
});
