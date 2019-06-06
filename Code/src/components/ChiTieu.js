import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert
} from "react-native";
import { Container, Content, Header, Footer, FooterTab, Button, Left, Body, Right, InputGroup, Input, Card, CardItem, Item, DatePicker} from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from "moment";

const {height, width} = Dimensions.get('window');

let SQLite = require('react-native-sqlite-storage')
let db = SQLite.openDatabase ({name: 'test.db', createFromLocation: '~qltc.db'}, this.openCB, this.errorCB);

export default class ChiTieu extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        soTien: '',
        hangMuc: 'Chọn hạng mục',
        moTa: '',
        ngayChi: new Date(),
        taiKhoan: 'Chọn tài khoản',
        nguoiChi: 'Chi cho ai'
      };
      this.setDate = this.setDate.bind(this);
      this.buttonOnClick = this.buttonOnClick.bind(this);
      this.formatMoney = this.formatMoney.bind(this);
      this.phatSinhMaChiTieu = this.phatSinhMaChiTieu.bind(this);
    }

    formatMoney(money){
      var x = money.replace(/,/g, "");
      var y = x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      this.setState({soTien: y});
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

    phatSinhMaChiTieu = () => {
      var soDong;
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM chitieu', [], (tx, results) => {
          soDong = results.rows.length;
          if(soDong == 0)
          {
            return 'ct0001';
          }
          else{
            var soHienTai;
            var data;
            var maCT = 'ct';
            db.transaction((tx) => {
              tx.executeSql('SELECT ma_chi_tieu FROM chitieu WHERE ma_chi_tieu like (SELECT MAX(ma_chi_tieu) FROM CHITIEU)', [], (tx, results) => {
                data = results.rows.item(0).ma_chi_tieu;
                soHienTai = parseInt(data.slice(2, 6), 10) + 1;
                var str = "" + soHienTai;
                var pad = "0000";
                maCT = maCT + pad.substring(0, pad.length - str.length) + str;
                return maCT;
              });
            });
          }
        });
      });
    };

    buttonOnClick(){
      var machitieu = this.phatSinhMaChiTieu;
      console.log(1, machitieu);
      // var mataikhoan = 1;
      // var moneyTmp = this.state.soTien.replace(/,/g, "");
      // var sotien = Number(moneyTmp);
      // var mahangmucchi = this.state.hangMuc;
      // var ngay = moment(this.state.ngayChi).format("YYYY-MM-DD HH:mm:ss");
      // var manguoichi = this.state.nguoiChi;
      // var mota = this.state.moTa;
      // console.log(machitieu, mataikhoan, sotien, mahangmucchi, ngay, manguoichi, mota);
      // db.transaction(function(tx) {
      //   tx.executeSql('INSERT INTO chitieu(ma_chi_tieu, ma_tai_khoan, so_tien, ma_hang_muc_chi,ngay,ma_nguoi_chi,mo_ta) VALUES (?,?,?,?,?,?,?)', [machitieu, mataikhoan, sotien, mahangmucchi, ngay, manguoichi, mota]);
      //   console.log('them');
      // });
    }

    render(){
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
                  <Input placeholder="0" style={{fontSize:20, color:'red', textAlign:'right', fontWeight:'bold'}} 
                    placeholderTextColor='red' 
                    keyboardType="numeric" 
                    onChangeText={this.formatMoney}
                    value={this.state.soTien}
                  />
                  <Text style={{fontSize: 18, color:'#3a455c', fontWeight:'bold'}}>VNĐ</Text>
              </InputGroup>
            </CardItem>
          </Card>

          <Card>
            <CardItem button onPress={() => alert("Chọn hạng mục")} style={{borderColor:'grey', borderBottomWidth: 0.7, height: 50}}>
              <Left style={{flex: 1}}>
                <Icon name="question-circle" style={{fontSize: 18, color:'#3a455c'}}/>
              </Left>
              <Body style={{flex:8}}>
                <Text style={{fontSize: 20, color: 'grey'}}>
                  {this.state.hangMuc}
                </Text>
              </Body>
              <Right style={{flex: 1}}>
                <Icon name="chevron-circle-right" style={{fontSize: 18, color:'#3a455c'}} />
              </Right>
            </CardItem>

            <CardItem style={{borderColor:'grey', borderBottomWidth: 0.7, height: 50}}>
              <Item>
                <Icon active name='comments' style={{fontSize: 18, color:'#3a455c', flex: 1}} />
                <Input placeholder="Mô tả" placeholderTextColor='grey' style={{flex: 9, borderBottomWidth: 0.1}} onChangeText={moTa => this.setState({moTa})}/>
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
                  placeHolderText="Chọn ngày"
                  placeHolderTextStyle={{fontSize: 20, color:'grey'}}
                  textStyle={{ color: "#3a455c", fontSize: 20}}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onDateChange={this.setDate}
                  disabled={false}
                  />
              </Body>
              <Right style={{flex: 1}}></Right>
            </CardItem>

            <CardItem button onPress={() => alert("Chọn tài khoản")} style={{borderColor:'grey', borderBottomWidth: 0.7, height: 50}}>
              <Left style={{flex: 1}}>
                <Icon name="credit-card" style={{fontSize: 18, color:'#3a455c'}}/>
              </Left>
              <Body style={{flex:8}}>
                <Text style={{fontSize: 15, color: 'grey'}}>
                  {this.state.taiKhoan}
                </Text>
              </Body>
              <Right style={{flex: 1}}>
                <Icon name="chevron-circle-right" style={{fontSize: 18, color:'#3a455c'}} />
              </Right>
            </CardItem>

            <CardItem button onPress={() => alert("Chọn người chi")} style={{borderColor:'grey', borderBottomWidth: 0.7, height: 50}}>
              <Left style={{flex: 1}}>
                <Icon name="user" style={{fontSize: 18, color:'#3a455c'}}/>
              </Left>
              <Body style={{flex:8}}>
                <Text style={{fontSize: 15, color: 'grey'}}>
                  {this.state.nguoiChi}
                </Text>
              </Body>
              <Right style={{flex: 1}}>
                <Icon name="chevron-circle-right" style={{fontSize: 18, color:'#3a455c'}} />
              </Right>
            </CardItem>

            <Button block info style={{height:40, backgroundColor:'#3a455c'}} onPress={this.buttonOnClick}>
              <Icon name="save" style={{fontSize:18, color:'white'}}/>
              <Text style={{color:'white', marginLeft: 5}}>Ghi</Text>
            </Button>
          </Card>
          </Content>

          <Footer style={{ backgroundColor: '#3a455c', height: 40, color: 'white'}}>
            <FooterTab style={{ backgroundColor: '#3a455c', height: 40, color: 'white'}}>
              <Button vertical>
                <Icon name="home" style={{color:'white', fontSize: 18}}/>
                <Text style={{color:'white', fontSize:10, fontFamily:'Times New Roman'}}>Tổng quan</Text>
              </Button>
              <Button vertical>
                <Icon name="credit-card" style={{color:'white', fontSize: 18}}/>
                <Text style={{color:'white', fontSize:10, fontFamily:'Times New Roman'}}>Tài khoản</Text>
              </Button>
              <Button vertical>
                <Icon name="plus-circle" style={{color:'white', fontSize:  30}}/>
              </Button>
              <Button vertical>
                <Icon name="filter" style={{color:'white', fontSize: 18}}/>
                <Text style={{color:'white', fontSize:10, fontFamily:'Times New Roman'}}>Hạn mức chi</Text>
              </Button>
              <Button vertical>
                <Icon name="ellipsis-h" style={{color:'white', fontSize: 18}}/>
                <Text style={{color:'white', fontSize:10, fontFamily:'Times New Roman'}}>Khác</Text>
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
