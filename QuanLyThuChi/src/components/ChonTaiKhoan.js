import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Content, Icon } from 'native-base';

export default class ChonTaiKhoan extends Component {
  // Title Navigation:
  static navigationOptions = {
    title: 'Chọn Tài Khoản',
  }

  render() {
    return (
      <Container>
        <View>
          <Text>
            Chọn tài khoản.
          </Text>
        </View>
      </Container>
    );
  }
}