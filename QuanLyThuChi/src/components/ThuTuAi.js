// Import thư viện
import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
  View
} from "react-native";
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
import MyFooter from './../MyFooter'
// Database:
let SQLite = require("react-native-sqlite-storage");

// Const & Variable:
const { height, width } = Dimensions.get("window");
var db;

export default class ChonHangMucChi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      danhSachThu: [],
      soNguoiThu: 0
    };
  }

  // Function
  componentDidMount() {
    if (Platform.OS === "ios")
      db = SQLite.openDatabase(
        {
          name: "_myDB.db",
          createFromLocation: "~www/myDB.db",
          location: "Library"
        },
        this.openCB,
        this.errorCB
      );
    else
      db = SQLite.openDatabase(
        { name: "_myDB.db", createFromLocation: "~myDB.db" },
        this.openCB,
        this.errorCB
      );
    let array = [];
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM danhsachthu", [], (tx, results) => {
        var len = results.rows.length;
        this.setState({ soNguoiThu: len });
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          array.push(row);
        }
        this.setState({ danhSachThu: array });
      });
    });
  }
  render() {
    const { navigation } = this.props;
    const { params } = this.props.navigation.state;
    const { goBack } = this.props.navigation;
    return (
      <Container>
        <Header
          style={{
            backgroundColor: "#3a455c",
            height: 40,
            borderBottomColor: "#757575"
          }}
        >
          <Left style={{ flex: 2 }}>
            <Button transparent>
              <Icon name="bars" style={{ color: "white", fontSize: 18 }} />
            </Button>
          </Left>
          <Body style={{ flex: 8 }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>VỚI AI</Text>
          </Body>
          <Right style={{ flex: 2 }} />
        </Header>

        <Content
          style={{
            // position: 'absolute',
            left: 0,
            right: 0,
            height: height - 104,
            backgroundColor: "#F1F1F1"
          }}
        >
          <Card style={{ marginLeft: 5, marginRight: 5 }}>
            {this.state.danhSachThu.map((item, i) => (
              <CardItem
                key={i}
                button
                onPress={() => {
                  params.returnDataNguoiThu(item.ma_nguoi_chi, item.ten);
                  goBack();
                }}
                style={{
                  borderColor: "grey",
                  borderBottomWidth: 0.7,
                  height: 50,
                  marginTop: 5,
                  backgroundColor: "rgb(76,171,242)"
                }}
              >
                <Left style={{ flex: 1 }}>
                  <Icon name="user" style={{ fontSize: 18, color: "white" }} />
                </Left>
                <Body style={{ flex: 8 }}>
                  <Text
                    style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
                  >
                    {item.ten}
                  </Text>
                </Body>
                <Right style={{ flex: 1 }} />
              </CardItem>
            ))}
          </Card>
        </Content>

        <MyFooter navigation={this.props.navigation}></MyFooter>
      </Container>
    );
  }
}
