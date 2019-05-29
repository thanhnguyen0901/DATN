import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import { Container, Content, Header, Left, Right, Icon } from "native-base"


export default class ChiTieuDemo extends React.Component {
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
      return();
    }
  }

  var styles = StyleSheet.create({

  });
