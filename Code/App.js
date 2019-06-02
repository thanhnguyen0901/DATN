import React, {Component} from 'react';
import {Platform, Text, StyleSheet, View} from 'react-native';

import ChiTieu from "./src/components/ChiTieu.js";
import ThuNhap from "./src/components/ThuNhap.js";
import ChuyenKhoan from "./src/components/ChuyenKhoan.js"
import DieuChinhSoDu from "./src/components/DieuChinhSoDu.js"

export default class DATN extends Component{
  render(){
    return(
      <DieuChinhSoDu />
    );
  }
}
