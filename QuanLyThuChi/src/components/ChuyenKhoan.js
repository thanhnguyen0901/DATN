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

export default class ChuyenKhoan extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        soTien: "",
        phiChuyenKhoan: "",
        moTa: '',
        ngayChuyenKhoan: new Date(),
        taiKhoanNguon: '',
        tenTaiKhoanNguon: 'Từ tài khoản',
        taiKhoanDich: '',
        tenTaiKhoanDich: 'Tới tài khoản',
        soTienTrongVi: 0,
        soTienTrongViNguon: 0,
        soTienTrongViDich: 0
      };
      this.setDate = this.setDate.bind(this);
      this.phatSinhMaChiTieu = this.phatSinhMaChiTieu.bind(this);
      this.phatSinhMaChuyenKhoan = this.phatSinhMaChuyenKhoan.bind(this);
      this.buttonOnClick = this.buttonOnClick.bind(this);
      this.formatMoney = this.formatMoney.bind(this);
      this.formatPhiChuyenKhoan = this.formatPhiChuyenKhoan.bind(this);
    }

      // Function
    componentDidMount() {
      if (Platform.OS === 'ios')
        db = SQLite.openDatabase({ name: '_myDB.db', createFromLocation: '~www/myDB.db', location: 'Library' }, this.openCB, this.errorCB);
      else
        db = SQLite.openDatabase({ name: '_myDB.db', createFromLocation: '~myDB.db' }, this.openCB, this.errorCB);
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

    formatMoney(money) {
      var x = money.replace(/,/g, "");
      var y = x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      this.setState({ soTien: y });
      return y;
    }

    formatPhiChuyenKhoan(money) {
      var x = money.replace(/,/g, "");
      var y = x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      this.setState({ phiChuyenKhoan: y });
      return y;
    }

    setDate(newDate) {
      this.setState({ ngayChuyenKhoan: newDate });
    }

    phatSinhMaChuyenKhoan() {
      let query = "SELECT * FROM chuyenkhoan;";
      return new Promise((resolve, reject) =>
        db.transaction(tx => {
          tx.executeSql(query, [], (tx, results) => {
            var soDong = results.rows.length;
            if (soDong == 0) {
              resolve("ck0001");
            } else {
              let soHienTai;
              let data;
              let maCK = "ck";
              db.transaction(tx => {
                tx.executeSql("SELECT ma_chuyen_khoan FROM chuyenkhoan WHERE ma_chuyen_khoan like (SELECT MAX(ma_chuyen_khoan) FROM chuyenkhoan)", [], (tx, results) => {
                  data = results.rows.item(0).ma_chi_tieu;
                  soHienTai = parseInt(data.slice(2, 6), 10) + 1;
                  let str = "" + soHienTai;
                  let pad = "0000";
                  maCK = maCK + pad.substring(0, pad.length - str.length) + str;
                  resolve(maCK);
                });
              });
            }
          },
            function (tx, error) {
              reject(error);
            });
        })
      );
    }

    phatSinhMaChiTieu() {
      let query = "SELECT * FROM chitieu;";
      return new Promise((resolve, reject) =>
        db.transaction(tx => {
          tx.executeSql(query, [], (tx, results) => {
            var soDong = results.rows.length;
            if (soDong == 0) {
              resolve("ct0001");
            } else {
              let soHienTai;
              let data;
              let maCT = "ct";
              db.transaction(tx => {
                tx.executeSql("SELECT ma_chi_tieu FROM chitieu WHERE ma_chi_tieu like (SELECT MAX(ma_chi_tieu) FROM chitieu)", [], (tx, results) => {
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
            function (tx, error) {
              reject(error);
            });
        })
      );
    }

    async buttonOnClick() {
      // Kiểm tra đầy đủ:
      if (this.state.soTien == "") {
        Alert.alert(
          'Thông báo',
          'Bạn chưa nhập số tiền!',
          [
            {
              text: 'Ok',
            },
          ],
          { cancelable: false }
        );
      } else if (this.state.taiKhoanNguon == "") {
        Alert.alert(
          'Thông báo',
          'Bạn chưa chọn tài khoản nguồn!',
          [
            {
              text: 'Ok',
            },
          ],
          { cancelable: false }
        );
      } else if (this.state.taiKhoanDich == "") {
        Alert.alert(
          'Thông báo',
          'Bạn chưa chọn tài khoản đích!',
          [
            {
              text: 'Ok',
            },
          ],
          { cancelable: false }
        );
      } else  if (this.state.taiKhoanDich == this.state.taiKhoanNguon){
        Alert.alert(
          'Thông báo',
          'Bạn không thể chuyển khoản trong cùng 1 tài khoản',
          [
            {
              text: 'Ok',
            },
          ],
          { cancelable: false }
        );
      } else {
        let machuyenkhoan = "";
        machuyenkhoan = await this.phatSinhMaChuyenKhoan();
        let mataikhoannguon = this.state.taiKhoanNguon;
        let mataikhoandich = this.state.taiKhoanDich;
        let moneyTmp = this.state.soTien.replace(/,/g, "");
        let sotien = Number(moneyTmp);
        let ngay = moment(this.state.ngayChuyenKhoan).format("YYYY-MM-DD HH:mm:ss");
        let mota = this.state.moTa;
        // Thêm chuyển khoản vào bảng chuyển khoản
        db.transaction(function (tx) {
          tx.executeSql(
            "INSERT INTO chuyenkhoan(ma_chuyen_khoan, ma_tai_khoan_nguon, ma_tai_khoan_dich, so_tien, ngay, mo_ta) VALUES (?,?,?,?,?,?)",
            [machuyenkhoan, mataikhoannguon, mataikhoandich, sotien, ngay, mota],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Thành công',
                  'Bạn đã chuyển khoản thành công!',
                  [
                    {
                      text: 'Ok',
                    },
                  ],
                  { cancelable: false }
                );
              } else {
                Alert.alert(
                  'Thất bại',
                  'Bạn đã chuyển khoản không thành công!',
                  [
                    {
                      text: 'Ok',
                    },
                  ],
                  { cancelable: false }
                );
              }
            });
        });

        // Trừ tiền trong ví nguồn
        let soTienViNguon = await new Promise((resolve, reject) => {
          db.transaction((tx) => {
            tx.executeSql('SELECT * FROM taikhoan WHERE ma_tai_khoan like ?', [this.state.taiKhoanNguon], (tx, results) => {
              let soTienTrongViNguon = results.rows.item(0).so_tien;
              resolve(soTienTrongViNguon);
            });
          });
        });
        soTienViNguon -= sotien;
        this.setState({ soTienTrongViNguon: soTienViNguon });
        db.transaction((tx) => {
          tx.executeSql(
            'UPDATE taikhoan set so_tien=? where ma_tai_khoan like ?',
            [soTienViNguon, this.state.taiKhoanNguon])
        });

        // Thêm tiền trong ví đích
        let soTienViDich = await new Promise((resolve, reject) => {
          db.transaction((tx) => {
            tx.executeSql('SELECT * FROM taikhoan WHERE ma_tai_khoan like ?', [this.state.taiKhoanDich], (tx, results) => {
              let soTienTrongViDich = results.rows.item(0).so_tien;
              resolve(soTienTrongViDich);
            });
          });
        });
        soTienViDich += sotien;
        this.setState({ soTienTrongViDich: soTienViDich });
        db.transaction((tx) => {
          tx.executeSql(
            'UPDATE taikhoan set so_tien=? where ma_tai_khoan like ?',
            [soTienViDich, this.state.taiKhoanDich])
        });

        // Phí chuyển khoản
        if(this.state.soTien != ""){
          let machitieu = "";
          machitieu = await this.phatSinhMaChiTieu();
          let mataikhoan = this.state.taiKhoanNguon;
          let phiCKTmp = this.state.phiChuyenKhoan.replace(/,/g, "");
          let phiCK = Number(phiCKTmp);
          let sotien = phiCK;
          let mahangmucchi = 'hmc0004';
          let ngay = moment(this.state.ngayChuyenKhoan).format("YYYY-MM-DD HH:mm:ss");
          let mota = 'Phí chuyển khoản từ tài khoản ' + this.state.tenTaiKhoanNguon + ' đến tài khoản ' + this.state.tenTaiKhoanDich;

          db.transaction(function (tx) {
            tx.executeSql(
              "INSERT INTO chitieu(ma_chi_tieu, ma_tai_khoan, so_tien, ma_hang_muc_chi, ngay, mo_ta, ma_chuyen_khoan) VALUES (?,?,?,?,?,?,?)",
              [machitieu, mataikhoan, sotien, mahangmucchi, ngay, mota, machuyenkhoan])});

          let duLieu = await new Promise((resolve, reject) => {
            db.transaction((tx) => {
              tx.executeSql('SELECT * FROM taikhoan WHERE ma_tai_khoan like ?', [this.state.taiKhoanNguon], (tx, results) => {
                let soTienTrongVi = results.rows.item(0).so_tien;
                resolve(soTienTrongVi);
              });
            });
          });
          duLieu -= sotien;
          this.setState({ soTienTrongVi: duLieu });
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE taikhoan set so_tien=? where ma_tai_khoan like ?',
              [duLieu, this.state.taiKhoanNguon])});
          }
        }
    }

    returnDataTaiKhoanNguon(taiKhoanNguon, tenTaiKhoanNguon) {
      this.setState({ taiKhoanNguon: taiKhoanNguon, tenTaiKhoanNguon: tenTaiKhoanNguon });
    }

    returnDataTaiKhoanDich(taiKhoanDich, tenTaiKhoanDich) {
      this.setState({ taiKhoanDich: taiKhoanDich, tenTaiKhoanDich: tenTaiKhoanDich });
    }


    render(){
      const { navigation } = this.props;
      const { params } = this.props.navigation.state;
      return(
        <Container>
          <Header style={{ backgroundColor: '#3a455c', height: 40, borderBottomColor:'#757575' }}>
            <Left style={{ flexDirection:'row'}}>
              <Button transparent>
                <Icon name="bars" style={{color:'white', fontSize: 18}}/>
              </Button>
            </Left>
            <Right>
            <Button transparent>
              <Icon name="check" style={{color:'white', fontSize: 18}}/>
            </Button>
            </Right>
          </Header>

          <Content style={{ positon:'absolute', left: 0, right: 0, height:height-104, backgroundColor: '#F1F1F1' }}>
          <Card>
            <CardItem header>
              <Text style={{fontWeight:'bold', color:'black'}}>Số tiền</Text>
            </CardItem>
            <CardItem>
              <InputGroup borderType="underline" >
                  <Icon name="money" style={{color:'#3a455c', fontSize: 18, fontWeight:'bold'}}/>
                  <Input placeholder="0" style={{fontSize:20, color:'#3a455c', textAlign:'right', fontWeight:'bold'}} 
                         placeholderTextColor='#3a455c' 
                         keyboardType="numeric"
                         onChangeText={this.formatMoney}
                         value={this.state.soTien}
                  />
                  <Text style={{fontSize: 18, color:'#3a455c', fontWeight:'bold'}}>VNĐ</Text>
              </InputGroup>
            </CardItem>
          </Card>

          <Card>
            <CardItem button onPress={() => navigation.navigate('ChonTaiKhoanNguon', { returnDataTaiKhoanNguon: this.returnDataTaiKhoanNguon.bind(this) })}
                      style={{borderColor:'grey', borderBottomWidth: 0.7, height: 50}}>
              <Left style={{flex: 1}}>
                <Icon name="credit-card" style={{fontSize: 18, color:'#3a455c'}}/>
              </Left>
              <Body style={{flex:8}}>
                <Text style={{fontSize: 15, color: 'black'}}>
                  {this.state.tenTaiKhoanNguon}
                </Text>
              </Body>
              <Right style={{flex: 1}}>
                <Icon name="chevron-circle-right" style={{fontSize: 18, color:'#3a455c'}} />
              </Right>
            </CardItem>

            <CardItem button onPress={() => navigation.navigate('ChonTaiKhoanDich', { returnDataTaiKhoanDich: this.returnDataTaiKhoanDich.bind(this) })} 
                      style={{borderColor:'grey', borderBottomWidth: 0.7, height: 50}}>
              <Left style={{flex: 1}}>
                <Icon name="credit-card" style={{fontSize: 18, color:'#3a455c'}}/>
              </Left>
              <Body style={{flex:8}}>
                <Text style={{fontSize: 15, color: 'black'}}>
                  {this.state.tenTaiKhoanDich}
                </Text>
              </Body>
              <Right style={{flex: 1}}>
                <Icon name="chevron-circle-right" style={{fontSize: 18, color:'#3a455c'}} />
              </Right>
            </CardItem>
        </Card>
        
        <Card>
            <CardItem style={{borderColor:'grey', borderBottomWidth: 0.7, height: 50}}>
              <Item>
                <Icon active name='comments' style={{fontSize: 18, color:'#3a455c', flex: 1}} />
                <Input placeholder='Mô tả' placeholderTextColor='grey' style={{flex: 9, borderBottomWidth: 0.1}}/>
              </Item>
            </CardItem>

            <CardItem style={{borderColor:'grey', borderBottomWidth: 0.7}}>
              <Left style={{flex: 1}}>
                <Icon active name='calendar' style={{fontSize: 18, color:'#3a455c'}} />
              </Left>
              <Body style={{flex: 8}}>
                <DatePicker
                  animationType={"fade"}
                  androidMode={"default"}
                  defaultDate={this.state.ngayChuyenKhoan}
                  onDateChange={this.setDate}
                  disabled={false}
                  />
              </Body>
              <Right style={{flex: 1}}></Right>
            </CardItem>
            <CardItem header>
              <Text style={{fontWeight:'bold', color:'black'}}>Phí chuyển khoản</Text>
            </CardItem>
            <CardItem>
              <InputGroup borderType="underline" >
                  <Icon name="money" style={{color:'#3a455c', fontSize: 18, fontWeight:'bold'}}/>
                  <Input placeholder="0" style={{fontSize:20, color:'red', textAlign:'right', fontWeight:'bold'}} 
                         placeholderTextColor='red' 
                         keyboardType="numeric"
                         onChangeText={this.formatPhiChuyenKhoan}
                         value={this.state.phiChuyenKhoan}
                         />
                  <Text style={{fontSize: 18, color:'#3a455c', fontWeight:'bold'}}>VNĐ</Text>
              </InputGroup>
            </CardItem>

            <Button block info style={{height:40, backgroundColor:'#3a455c'}} onPress={this.buttonOnClick}>
              <Icon name="save" style={{fontSize:18, color:'white'}}/>
              <Text style={{color:'white', marginLeft: 5}}>Ghi</Text>
            </Button>
          </Card>
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
