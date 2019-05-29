import React, {Component} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Container, Content, Header, Footer, FooterTab, Button, Left, Right} from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');

export default class ChiTieuDemo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        chosenDate: new Date(),
        soTien: '0',
        hangMuc: '',
        moTa: '',
        ngayChi: '',
        taiKhoan: '',
        nguoiChi: ''
      };
      this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
      this.setState({ chosenDate: newDate });
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

          <Content style={{ positon:'absolute', left: 0, right: 0, height:height-104, backgroundColor: 'white' }}>
            
          </Content>

          <Footer style={{ backgroundColor: '#3a455c', height: 40, color: 'white'}}>
            <FooterTab style={{ backgroundColor: '#3a455c', height: 40, color: 'white'}}>
              <Button vertical>
                <Icon name="home" style={{color:'white', fontSize: 18}}/>
                <Text style={{color:'white', fontSize:10, fontFamily:'Times New Roman'}}>Tổng quan</Text>
              </Button>
              <Button vertical>
                <Icon name="money" style={{color:'white', fontSize: 18}}/>
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
