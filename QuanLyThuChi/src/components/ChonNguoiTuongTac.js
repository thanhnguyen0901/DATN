import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Header, Content, Icon } from 'native-base';

export default class ChonNguoiTuongTac extends Component {
  // Title Navigation:
  static navigationOptions = {
    title: 'Chọn Người Dùng',
  }

  render() {
    return (
      <Container>
        <View>
          <Text>
            Chọn người tương tác.
          </Text>
        </View>
      </Container>
    );
  }
}