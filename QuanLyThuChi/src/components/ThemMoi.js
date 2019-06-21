// Import thư viện
import React, { Component } from "react";
import { Text, StyleSheet, Dimensions, Alert, Platform } from "react-native";
import {
  Button,
  Body,
  Card,
  CardItem,
  Container,
  Content,
  DatePicker,
  Footer,
  FooterTab,
  Header,
  Input,
  InputGroup,
  Item,
  Left,
  Right
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import MyFooter from './../MyFooter';

// Database:
let SQLite = require("react-native-sqlite-storage");

// Const & Variable:
const { height, width } = Dimensions.get("window");
var db;

export default class ThemMoi extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{ flex: 2 }}>
            <Button transparent>
              <Icon name="bars" style={{ color: "white", fontSize: 18 }} />
            </Button>
          </Left>
          <Body style={{ flex: 8 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>THÊM</Text>
          </Body>
          <Right style={{ flex: 2 }} />
        </Header>

        <Content
          style={styles.content}
        >
          <Button
            onPress={() => navigation.navigate("ChiTieu")}
            block
            info
            style={styles.buttonCardItem}
          >
            <Text style={styles.textButton}>Chi tiêu</Text>
          </Button>

          <Button
            onPress={() => navigation.navigate("ThuNhap")}
            block
            info
            style={styles.buttonCardItem}
          >
            <Text style={styles.textButton}>Thu nhập</Text>
          </Button>

          <Button
            onPress={() => navigation.navigate("ChuyenKhoan")}
            block
            info
            style={styles.buttonCardItem}
          >
            <Text style={styles.textButton}>Chuyển khoản</Text>
          </Button>

          <Button
            onPress={() => navigation.navigate("DieuChinhSoDu")}
            block
            info
            style={styles.buttonCardItem}
          >
            <Text style={styles.textButton}>
              Điều chỉnh số dư
            </Text>
          </Button>
        </Content>
        <MyFooter navigation={this.props.navigation}></MyFooter>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  iconHeader: {
    color: "white",
    fontSize: 18
  },
  header: {
    backgroundColor: "rgb(76,171,242)",
    height: 40,
    borderBottomColor: "#757575",
    marginBottom: 2
  },
  content: {
    // position: 'absolute',
    left: 0,
    right: 0,
    height: height - 104,
    backgroundColor: "#ffffff"
  },
  buttonCardItem: {
    height: 40,
    backgroundColor: "rgb(76,171,242)",
    marginBottom: 2,
    borderBottomEndRadius: 20
  },
  textButton: {
    color: "white",
    marginLeft: 5
  }
});