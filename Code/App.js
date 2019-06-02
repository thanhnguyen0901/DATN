import React, {Component} from 'react';
import {Platform, Text, StyleSheet, View} from 'react-native';

import ChiTieu from "./src/components/ChiTieu";
import ThuNhap from "./src/components/ThuNhap";
import ChuyenKhoan from "./src/components/ChuyenKhoan"
import DieuChinhSoDu from "./src/components/DieuChinhSoDu"
import ChonHangMuc from "./src/components/ChonHangMuc"

export default class DATN extends Component{
  render(){
    return(
      <ChonHangMuc />
    );
  }
}
