import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Content, Icon } from 'native-base';

export default class ChonHangMuc extends Component {
  // Title Navigation:
  static navigationOptions = {
    title: 'Chọn Hạng Mục',
  }

  render() {
    return (
      <Container>
        <View>
          <Text>
            Chọn hạng mục.
          </Text>
        </View>
      </Container>
    );
  }
}