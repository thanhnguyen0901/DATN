import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Container, Content, Header, Footer, FooterTab, Button, Left, Body, Right, InputGroup, Input, Card, CardItem, Item, DatePicker} from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');

export default class DieuChinhSoDu extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        soTien: 0,
        hangMuc: 'Chọn hạng mục',
        moTa: 'Điều chỉnh số dư tài khoản',
        ngayChi: new Date(),
        taiKhoan: 'Chọn tài khoản',
      };
      this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
      this.setState({ ngayChi: newDate });
    }

    render(){
      const { navigation } = this.props;
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
          </Card>

          <Card>
            <CardItem>
                <Item>
                    <Left style={{flex:4}}>
                        <Text style={{fontWeight:'bold', color:'black'}}>Số dư trên tài khoản</Text>
                    </Left>
                    <Body style={{flex:0}}></Body>
                    <Right style={{flex:6}}>
                        <Text style={{fontWeight:'bold', color:'black'}}>0 VNĐ</Text>
                    </Right>
                </Item>
            </CardItem>

            <CardItem header>
              <Text style={{fontWeight:'bold', color:'black'}}>Số dư thực tế</Text>
            </CardItem>
            <CardItem>
              <InputGroup borderType="underline" >
                  <Icon name="money" style={{color:'#3a455c', fontSize: 18, fontWeight:'bold'}}/>
                  <Input placeholder="0" style={{fontSize:20, color:'#3a455c', textAlign:'right', fontWeight:'bold'}} placeholderTextColor='#3a455c' keyboardType="numeric"/>
                  <Text style={{fontSize: 18, color:'#3a455c', fontWeight:'bold'}}>VNĐ</Text>
              </InputGroup>
            </CardItem>

            <CardItem>
                <Item>
                    <Left>
                        <Text style={{fontWeight:'bold', color:'black'}}>Chênh lệch</Text>
                    </Left>
                    <Body></Body>
                    <Right>
                        <Text style={{fontWeight:'bold', color:'red'}}>0 VNĐ</Text>
                    </Right>
                </Item>
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
                <Input placeholder='Điều chỉnh số dư tài khoản' placeholderTextColor='grey' style={{flex: 9, borderBottomWidth: 0.1}}/>
              </Item>
            </CardItem>

            <Button block info style={{height:40, backgroundColor:'#3a455c'}}>
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
