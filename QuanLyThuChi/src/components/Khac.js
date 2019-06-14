// Import thư viện
import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, Alert, Platform } from "react-native";
import { Button, Body, Card, CardItem, Container, Content, DatePicker, Footer, FooterTab, Header, Input, InputGroup, Item, Left, Right } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";

// Database:
let SQLite = require("react-native-sqlite-storage");

// Const & Variable:
const { height, width } = Dimensions.get("window");
var db;

export default class KHAC extends Component {
  render() {
    const { navigation } = this.props;
    return(
      <Container>
        <Header style={{backgroundColor: "#3a455c",height: 40,borderBottomColor: "#757575"}}>
          <Left style={{flex:2}}>
            <Button transparent>
              <Icon name="bars" style={{ color: "white", fontSize: 18 }} />
            </Button>
          </Left>
          <Body style={{flex:8}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>KHÁC</Text>
          </Body>
          <Right style={{flex:2}}></Right>
        </Header>

        <Content style={{ positon: "absolute", left: 0, right: 0, height: height - 104, backgroundColor: "#F1F1F1" }}>
          
        </Content>

        <Footer style={{ backgroundColor: "#3a455c", height: 40, color: "white" }}>
          <FooterTab style={{ backgroundColor: "#3a455c", height: 40, color: "white" }}>
            <Button vertical onPress={() => navigation.navigate('TongQuan')}>
              <Icon name="home" style={{ color: "white", fontSize: 18 }} />
              <Text style={{color: "white",fontSize: 10,fontFamily: "Times New Roman"}}>
                Tổng quan
              </Text>
            </Button>
            <Button vertical onPress={() => navigation.navigate('TaiKhoan')}>
              <Icon name="credit-card" style={{ color: "white", fontSize: 18 }}/>
              <Text style={{ color: "white", fontSize: 10, fontFamily: "Times New Roman"}}>
                Tài khoản
              </Text>
            </Button>
            <Button vertical onPress={() => navigation.navigate('ThemMoi')}>
              <Icon name="plus-circle" style={{ color: "white", fontSize: 30 }} />
            </Button>
            <Button vertical onPress={() => navigation.navigate('HanMucChi')}>
              <Icon name="filter" style={{ color: "white", fontSize: 18 }} />
              <Text style={{ color: "white", fontSize: 10, fontFamily: "Times New Roman" }}>
                Hạn mức chi
              </Text>
            </Button>
            <Button vertical onPress={() => navigation.navigate('Khac')}>
              <Icon name="ellipsis-h" style={{ color: "white", fontSize: 18 }}/>
              <Text
                style={{ color: "white", fontSize: 10, fontFamily: "Times New Roman" }}>
                Khác
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}