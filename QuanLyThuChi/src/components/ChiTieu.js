// Import thư viện
import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Alert, Platform } from "react-native";
import { Button, Body, Card, CardItem, Container, Content, DatePicker, Footer, FooterTab, Header, Input, InputGroup, Item, Left, Right } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";

// Database:
let SQLite = require("react-native-sqlite-storage");
// iOS
// const db = SQLite.openDatabase({name: '_myDB.db', createFromLocation :'~www/myDB.db', location: 'Library'}, this.openCB, this.errorCB);
// Android
// const db = SQLite.openDatabase({name: '_myDB.db', createFromLocation :'~myDB.db'}, this.openCB, this.errorCB);
var db;
// Const:
const { height, width } = Dimensions.get("window");
export default class ChiTieu extends React.Component {
  static navigationOptions = {
    title: 'Chi Tiêu',
  }

  constructor(props) {
    super(props);
    this.state = {
      soTien: "",
      hangMuc: "Chọn hạng mục",
      moTa: "",
      ngayChi: new Date(),
      taiKhoan: "test",
      nguoiChi: "Chi cho ai", 
      sotientrongvi: 0
    };
    this.setDate = this.setDate.bind(this);
    this.buttonOnClick = this.buttonOnClick.bind(this);
    this.formatMoney = this.formatMoney.bind(this);
    this.phatSinhMaChiTieu = this.phatSinhMaChiTieu.bind(this);
    this.showDB = this.showDB.bind(this);
    this.testSoTien = this.testSoTien.bind(this);
  }
  componentDidMount(){
    if(Platform.OS === 'ios')
      db = SQLite.openDatabase({name: '_myDB.db', createFromLocation :'~www/myDB.db', location: 'Library'}, this.openCB, this.errorCB);
    else
      db = SQLite.openDatabase({name: '_myDB.db', createFromLocation :'~myDB.db'}, this.openCB, this.errorCB);
  }

  formatMoney(money) {
    var x = money.replace(/,/g, "");
    var y = x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    this.setState({ soTien: y });
    return y;
  }

  errorCB(err) {
    console.log("SQL Error: " + err);
  }

  successCB() {
    console.log("SQL executed fine");
  }

  openCB() {
    console.log("Database OPENED");
  }

  setDate(newDate) {
    this.setState({ ngayChi: newDate });
  }

  phatSinhMaChiTieu() {
    query = "SELECT * FROM chitieu;";
    return new Promise((resolve, reject) =>
      db.transaction(tx => {tx.executeSql(query,[],(tx, results) => {
        var soDong = results.rows.length;
        if (soDong == 0) {
          resolve("ct0001");
        } else {
          let soHienTai;
          let data;
          let maCT = "ct";
          db.transaction(tx => {
            tx.executeSql("SELECT ma_chi_tieu FROM chitieu WHERE ma_chi_tieu like (SELECT MAX(ma_chi_tieu) FROM CHITIEU)",[],(tx, results) => {
              data = results.rows.item(0).ma_chi_tieu;
              soHienTai = parseInt(data.slice(2, 6), 10) + 1;
              let str = "" + soHienTai;
              let pad = "0000";
              maCT = maCT + pad.substring(0, pad.length - str.length) + str;
              resolve(maCT);
            });
          });
        }
      },
      function(tx, error) {
        reject(error);
      });
    })
    );
  }

  async showDB(){
    let query = "SELECT * FROM chitieu";
    db.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        var len = results.rows.length;
        if(len == 0){
          console.log('Không có dòng nào trong DB');
        }
        else{
          console.log('Có ', len, ' dòng trong DB');
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            console.log(row);
          }
        }
      });
    });
  };

  testSoTien() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM taikhoan WHERE ma_tai_khoan like ?', [this.state.taiKhoan], (tx, results) => {
          //console.log('result 111111: ', results.rows.item(0).so_tien);
          Alert.alert(
            'Thông báo',
            'Số tiền trong ví hiện tại là: ',
            [
              {
                text: results.rows.item(0).so_tien,
              },
            ],
            { cancelable: false }
          );
        });
    });


  }

  async buttonOnClick() {
    let machitieu = "";
    machitieu = await this.phatSinhMaChiTieu();
    console.log('Mã chi tiêu: ',  machitieu);
    let mataikhoan = 'test';
    let moneyTmp = this.state.soTien.replace(/,/g, "");
    let sotien = Number(moneyTmp);
    let mahangmucchi = this.state.hangMuc;
    let ngay = moment(this.state.ngayChi).format("YYYY-MM-DD HH:mm:ss");
    let manguoichi = this.state.nguoiChi;
    let mota = this.state.moTa;
    // Thêm chi tiêu vào bảng chitieu
    db.transaction(function(tx) {
      tx.executeSql(
        "INSERT INTO chitieu(ma_chi_tieu, ma_tai_khoan, so_tien, ma_hang_muc_chi,ngay,ma_nguoi_chi,mo_ta) VALUES (?,?,?,?,?,?,?)",
        [machitieu, mataikhoan, sotien, mahangmucchi, ngay, manguoichi, mota],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Thành công',
              'Bạn đã thêm thành công',
              [
                {
                  text: 'Ok',
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Bạn đã thêm không thành công');
          }
          });
      });

    // Thêm tiền vào ví.
    let duLieu = await new Promise((resolve, reject) =>{
      db.transaction((tx) => {
      tx.executeSql('SELECT * FROM taikhoan WHERE ma_tai_khoan like ?', [this.state.taiKhoan], (tx, results) => {
          let soTienTrongVi = results.rows.item(0).so_tien;
          resolve(soTienTrongVi);
        });
      });
    });
    duLieu -= sotien;
    this.setState({sotientrongvi: duLieu});
    db.transaction((tx)=> {
      tx.executeSql(
        'UPDATE taikhoan set so_tien=? where ma_tai_khoan like ?',
        [duLieu, this.state.taiKhoan])});

    Alert.alert(
      'Thông báo',
      'Số tiền trong ví hiện tại là: ',
      [
        {
          text: this.state.sotientrongvi,
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    console.log(this.state.sotientrongvi);
    return (
      <Container>
        <Header style={{backgroundColor: "#3a455c",height: 40,borderBottomColor: "#757575"}}>
          <Left style={{ flexDirection: "row" }}>
            <Button transparent>
              <Icon name="bars" style={{ color: "white", fontSize: 18 }} />
            </Button>
          </Left>
          <Body>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="check" style={{ color: "white", fontSize: 18 }} />
            </Button>
          </Right>
        </Header>

        <Content style={{ positon: "absolute", left: 0, right: 0, height: height - 104, backgroundColor: "#F1F1F1" }}>
          <Card>
            <CardItem header>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                Số tiền
              </Text>
            </CardItem>
            <CardItem>
              <InputGroup borderType="underline">
                <Icon name="money" style={{ color: "#3a455c", fontSize: 18, fontWeight: "bold" }}/>
                <Input placeholder="0" style={{fontSize: 20,color: "red",textAlign: "right",fontWeight: "bold"}}
                  placeholderTextColor="red"
                  keyboardType="numeric"
                  onChangeText={this.formatMoney}
                  value={this.state.soTien}
                />
                <Text style={{ fontSize: 18, color: "#3a455c", fontWeight: "bold" }}>VNĐ</Text>
              </InputGroup>
            </CardItem>
          </Card>

          <Card>
            <CardItem button onPress={() => alert("Chọn hạng mục")} style={{ borderColor: "grey", borderBottomWidth: 0.7, height: 50}}>
              <Left style={{ flex: 1 }}>
                <Icon name="question-circle" style={{ fontSize: 18, color: "#3a455c" }}/>
              </Left>
              <Body style={{ flex: 8 }}>
                <Text style={{ fontSize: 20, color: "grey" }}>
                  {this.state.hangMuc}
                </Text>
              </Body>
              <Right style={{ flex: 1 }}>
                <Icon name="chevron-circle-right" style={{ fontSize: 18, color: "#3a455c" }}/>
              </Right>
            </CardItem>

            <CardItem style={{ borderColor: "grey", borderBottomWidth: 0.7, height: 50 }}>
              <Item>
                <Icon active name="comments" style={{ fontSize: 18, color: "#3a455c", flex: 1 }}/>
                <Input placeholder="Mô tả" placeholderTextColor="grey" style={{ flex: 9, borderBottomWidth: 0.1 }} onChangeText={moTa => this.setState({ moTa })} />
              </Item>
            </CardItem>

            <CardItem style={{ borderColor: "grey", borderBottomWidth: 0.7 }}>
              <Left style={{ flex: 1 }}>
                <Icon active name="calendar" style={{ fontSize: 18, color: "#3a455c" }}/>
              </Left>
              <Body style={{ flex: 8 }}>
                <DatePicker
                  animationType={"fade"}
                  androidMode={"default"}
                  defaultDate={this.state.ngayChi}
                  // placeHolderText="Chọn ngày"
                  // placeHolderTextStyle={{ fontSize: 20, color: "grey" }}
                  // textStyle={{ color: "#3a455c", fontSize: 20 }}
                  // placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onDateChange={this.setDate}
                  disabled={false}
                />
              </Body>
              <Right style={{ flex: 1 }} />
            </CardItem>

            <CardItem button onPress={() => alert("Chọn tài khoản")} style={{ borderColor: "grey", borderBottomWidth: 0.7, height: 50 }}>
              <Left style={{ flex: 1 }}>
                <Icon name="credit-card" style={{ fontSize: 18, color: "#3a455c" }} />
              </Left>
              <Body style={{ flex: 8 }}>
                <Text style={{ fontSize: 15, color: "grey" }}>
                  {this.state.taiKhoan}
                </Text>
              </Body>
              <Right style={{ flex: 1 }}>
                <Icon name="chevron-circle-right" style={{ fontSize: 18, color: "#3a455c" }} />
              </Right>
            </CardItem>

            <CardItem button onPress={() => alert("Chọn người chi")} style={{borderColor: "grey",borderBottomWidth: 0.7,height: 50}}>
              <Left style={{ flex: 1 }}>
                <Icon name="user" style={{ fontSize: 18, color: "#3a455c" }} />
              </Left>
              <Body style={{ flex: 8 }}>
                <Text style={{ fontSize: 15, color: "grey" }}>
                  {this.state.nguoiChi}
                </Text>
              </Body>
              <Right style={{ flex: 1 }}>
                <Icon name="chevron-circle-right" style={{ fontSize: 18, color: "#3a455c" }}/>
              </Right>
            </CardItem>

            <Button block info style={{ height: 40, backgroundColor: "#3a455c" }} onPress={this.buttonOnClick}>
              <Icon name="save" style={{ fontSize: 18, color: "white" }} />
              <Text style={{ color: "white", marginLeft: 5 }}>Ghi</Text>
            </Button>
          </Card>
        </Content>

        <Footer style={{ backgroundColor: "#3a455c", height: 40, color: "white" }}>
          <FooterTab style={{ backgroundColor: "#3a455c", height: 40, color: "white" }}>
            <Button vertical onPress={this.showDB}>
              <Icon name="home" style={{ color: "white", fontSize: 18 }} />
              <Text style={{color: "white",fontSize: 10,fontFamily: "Times New Roman"}}>
                Tổng quan
              </Text>
            </Button>
            <Button vertical onPress={this.testSoTien}>
              <Icon name="credit-card" style={{ color: "white", fontSize: 18 }}/>
              <Text style={{ color: "white", fontSize: 10, fontFamily: "Times New Roman"}}>
                Tài khoản
              </Text>
            </Button>
            <Button vertical>
              <Icon name="plus-circle" style={{ color: "white", fontSize: 30 }} />
            </Button>
            <Button vertical>
              <Icon name="filter" style={{ color: "white", fontSize: 18 }} />
              <Text style={{ color: "white", fontSize: 10, fontFamily: "Times New Roman" }}>
                Hạn mức chi
              </Text>
            </Button>
            <Button vertical>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
