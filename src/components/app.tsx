import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Button from 'react-native-button';
import {Header, Card, CardSection} from './common';
import CameraPreview from './cameraPreview';

interface Props {}

interface State {
  showCamera: boolean;
}

export default class App extends Component<Props, State> {
  state: State = {
    showCamera: false,
  };

  showCamera() {
    if (this.state.showCamera) {
      return <CameraPreview />;
    }
    return (
      <Button onPress={() => this.setState({showCamera: true})}>
        SHOW CAMERA
      </Button>
    );
  }

  render() {
    const {container, welcome} = styles;
    return (
      <View style={{flex: 1}}>
        <Header headerText="CAMERA DEMO" />
        {this.showCamera()}
        <View style={container}>
          <Card>
            <CardSection>
              <Text style={welcome}>Welcome to DS Camera POC</Text>
            </CardSection>
          </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  } as ViewStyle,

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  } as TextStyle,

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  } as TextStyle,
});
