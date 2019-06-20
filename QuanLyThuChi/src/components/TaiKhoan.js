// Import thư viện
import React, { Component } from "react";
import { Text, StyleSheet, Dimensions, Platform } from "react-native";
import {
  Button,
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Left,
  Right
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

// Database:
let SQLite = require("react-native-sqlite-storage");

// Const & Variable:
const { height, width } = Dimensions.get("window");
var db;

export default class TaiKhoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taiKhoanDangSuDung: [],
      taiKhoanNgungSuDung: [],
      soTaiKhoanDangSuDung: 0,
      soTaiKhoanNgungSuDung: 0,
      tongTienTaiKhoanDangSuDung: 0,
      tongTienTaiKhoanNgungSuDung: 0
    };
    this.formatMoney = this.formatMoney.bind(this);
  }
  componentDidMount() {
    console.log("renderTaiKhoan");
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
    this.props.navigation.addListener("didFocus", payload => {
      console.log("Focus_Taikhoan");
      let taiKhoanDangSuDung = [];
      let taiKhoanNgungSuDung = [];
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM taikhoan WHERE dang_su_dung like 'y' and xoa like 'n'",
          [],
          (tx, results) => {
            var len = results.rows.length;
            this.setState({ soTaiKhoanDangSuDung: len });
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              let tongTienTaiKhoanDangSuDung =
                this.state.tongTienTaiKhoanDangSuDung + row.so_tien;
              this.setState({
                tongTienTaiKhoanDangSuDung: tongTienTaiKhoanDangSuDung
              });
              taiKhoanDangSuDung.push(row);
            }
            this.setState({ taiKhoanDangSuDung: taiKhoanDangSuDung });
          }
        );
      });
      db.transaction(tx => {
        tx.executeSql(
          "SELECT * FROM taikhoan WHERE dang_su_dung like 'n' and xoa like 'n'",
          [],
          (tx, results) => {
            var len = results.rows.length;
            this.setState({ soTaiKhoanNgungSuDung: len });
            for (let i = 0; i < len; i++) {
              let row = results.rows.item(i);
              let tongTienTaiKhoanNgungSuDung =
                this.state.tongTienTaiKhoanNgungSuDung + row.so_tien;
              this.setState({
                tongTienTaiKhoanNgungSuDung: tongTienTaiKhoanNgungSuDung
              });
              taiKhoanNgungSuDung.push(row);
            }
            this.setState({ taiKhoanNgungSuDung: taiKhoanNgungSuDung });
          }
        );
      });
    });
  }

  // Function
  formatMoney(money) {
    money = money + "";
    var x = money.replace(/,/g, "");
    var y = x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return y;
  }

  render() {
    const { navigation } = this.props;
    const { params } = this.props.navigation.state;
    return (
      <Container>
        <Header style={styles.header}>
          <Left style={{ flex: 2 }} />
          <Body style={{ flex: 8 }}>
            <Text style={styles.textHeader}>TÀI KHOẢN</Text>
          </Body>
          <Right style={{ flex: 2 }}>
            <Button transparent onPress={() => navigation.push("ThemTaiKhoan")}>
              <Icon name="plus" style={styles.iconHeader} />
            </Button>
          </Right>
        </Header>

        <Content style={styles.content}>
          <Card>
            <CardItem style={styles.cardItem}>
              <Text
                style={{
                  ...styles.titleContent,
                  color:
                    this.state.tongTienTaiKhoanDangSuDung +
                      this.state.tongTienTaiKhoanNgungSuDung >=
                    0
                      ? "black"
                      : "red"
                }}
              >
                Tổng tiền:{" "}
                {this.formatMoney(
                  this.state.tongTienTaiKhoanDangSuDung +
                    this.state.tongTienTaiKhoanNgungSuDung
                )}
                đ
              </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem style={styles.cardItem}>
              <Text
                style={{
                  ...styles.titleContent,
                  color:
                    this.state.tongTienTaiKhoanDangSuDung >= 0 ? "black" : "red"
                }}
              >
                Đang sử dụng:{" "}
                {this.formatMoney(this.state.tongTienTaiKhoanDangSuDung)}đ
              </Text>
            </CardItem>
            {this.state.taiKhoanDangSuDung.map((item, i) => (
              <CardItem
                key={i}
                button
                onPress={() => {}}
                style={styles.cardItem}
              >
                <Left style={{ flex: 1 }}>
                  <Icon name="credit-card" style={styles.icon} />
                </Left>
                <Body style={{ flex: 6 }}>
                  <Text style={styles.textContent}>{item.ten_tai_khoan}</Text>
                </Body>
                <Right
                  style={{
                    flex: 6,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      ...styles.textContentMoney,
                      color: item.so_tien >= 0 ? "#3a455c" : "red"
                    }}
                  >
                    {this.formatMoney(item.so_tien)}đ
                  </Text>
                  <Button style={{ backgroundColor: "white" }}>
                    <Icon
                      name="ellipsis-v"
                      style={{
                        ...styles.icon,
                        marginLeft: 5
                      }}
                    />
                  </Button>
                </Right>
              </CardItem>
            ))}
          </Card>
          <Card>
            <CardItem style={styles.cardItem}>
              <Text
                style={{
                  ...styles.titleContent,
                  color:
                    this.state.tongTienTaiKhoanNgungSuDung >= 0
                      ? "black"
                      : "red"
                }}
              >
                Ngưng sử dụng:{" "}
                {this.formatMoney(this.state.tongTienTaiKhoanNgungSuDung)}đ
              </Text>
            </CardItem>
            {this.state.taiKhoanNgungSuDung.map((item, i) => (
              <CardItem
                key={i}
                button
                onPress={() => {}}
                style={styles.cardItem}
              >
                <Left style={{ flex: 1 }}>
                  <Icon name="credit-card" style={styles.icon} />
                </Left>
                <Body style={{ flex: 6 }}>
                  <Text style={styles.textContent}>{item.ten_tai_khoan}</Text>
                </Body>
                <Right
                  style={{
                    flex: 6,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      ...styles.textContentMoney,
                      color: item.so_tien >= 0 ? "#3a455c" : "red"
                    }}
                  >
                    {this.formatMoney(item.so_tien)}đ
                  </Text>
                  <Button style={{ backgroundColor: "white" }}>
                    <Icon
                      name="ellipsis-v"
                      style={{
                        ...styles.icon,
                        marginLeft: 5
                      }}
                    />
                  </Button>
                </Right>
              </CardItem>
            ))}
          </Card>
        </Content>

        <Footer style={styles.footer}>
          <FooterTab style={styles.footer}>
            <Button vertical onPress={() => navigation.navigate("TongQuan")}>
              <Icon name="home" style={styles.iconHeader} />
              <Text style={styles.textFooter}>Tổng quan</Text>
            </Button>
            <Button vertical onPress={() => navigation.navigate("TaiKhoan")}>
              <Icon name="credit-card" style={styles.iconHeader} />
              <Text style={styles.textFooter}>Tài khoản</Text>
            </Button>
            <Button vertical onPress={() => navigation.navigate("ThemMoi")}>
              <Icon name="plus-circle" style={styles.iconPlusCircle} />
            </Button>
            <Button vertical onPress={() => navigation.navigate("HanMucChi")}>
              <Icon name="filter" style={styles.iconHeader} />
              <Text style={styles.textFooter}>Hạn mức chi</Text>
            </Button>
            <Button vertical onPress={() => navigation.navigate("Khac")}>
              <Icon name="ellipsis-h" style={styles.iconHeader} />
              <Text style={styles.textFooter}>Khác</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonCardItem: {
    backgroundColor: "#3a455c",
    borderBottomWidth: 0.7,
    borderColor: "grey",
    height: 50,
    marginTop: 5
  },
  card: {
    marginLeft: 5,
    marginRight: 5
  },
  cardItem: {
    borderColor: "grey",
    borderBottomWidth: 1,
    height: 50,
    marginTop: 5
  },
  content: {
    backgroundColor: "#F1F1F1",
    height: height - 104,
    left: 0,
    // position: "absolute",
    right: 0
  },
  footer: {
    backgroundColor: "#3a455c",
    color: "white",
    height: 40
  },
  header: {
    backgroundColor: "#3a445c",
    borderBottomColor: "#757575",
    height: 40
  },
  icon: {
    color: "#3a455c",
    fontSize: 18
  },
  iconHeader: {
    color: "white",
    fontSize: 18
  },
  iconPlusCircle: {
    color: "white",
    fontSize: 30
  },
  input: {
    color: "#3a455c",
    fontSize: 20,
    textAlign: "right"
  },
  textContent: {
    color: "#3a455c",
    fontSize: 20,
    paddingLeft: 10
  },
  textContentMoney: {
    color: "#3a455c",
    fontSize: 20
  },
  textHeader: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold"
  },
  textFooter: {
    color: "white",
    fontSize: 10,
    fontFamily: "Times New Roman"
  },
  titleContent: { fontWeight: "bold", color: "black" }
});
