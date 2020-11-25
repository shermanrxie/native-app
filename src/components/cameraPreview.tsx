import CameraRoll from '@react-native-community/cameraroll';
import React, { Component } from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';

import Button from 'react-native-button';
import { RNCamera, TakePictureResponse } from 'react-native-camera';

interface Props { }

interface camera {
  type: any;
  flashMode: any;
  orientation: any;
}

interface State {
  camera: camera;
  videoUri: string;
  isRecording: boolean;
}

class CameraPreview extends Component<Props, State> {
  camera: RNCamera;
  constructor(props: Props) {
    super(props);

    this.camera = undefined;

    this.state = {
      videoUri: '',
      camera: {
        type: RNCamera.Constants.Type.back,
        orientation: RNCamera.Constants.Orientation.auto,
        flashMode: RNCamera.Constants.FlashMode.auto,
      },
      isRecording: false,
    };
  }

  takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      this.camera
        .takePictureAsync(options)
        .then((data: TakePictureResponse) =>
          CameraRoll.save(data.uri, { type: 'photo' }),
        )
        .catch((err: any) => console.error(err));
    }
  }

  takeVideo() {
    this.state.isRecording ? this.stopRecording() : this.startRecording();
    this.state.isRecording
      ? this.setState({ isRecording: false })
      : this.setState({ isRecording: true });
  }

  async startRecording() {
    if (this.camera) {
      const options = { maxDuration: 10 };
      this.camera.recordAsync(options).then((data) => {
        this.setState({ videoUri: data.uri });
        console.log('FILE', data.uri);
      });
    }
  }

  async stopRecording() {
    if (this.camera) {
      this.camera.stopRecording();
      if (this.state.videoUri && this.state.videoUri.length > 0) {
        await CameraRoll.save(this.state.videoUri, { type: 'video' });
      }
      this.setState({
        isRecording: false,
      });
    }
  }

  switchType() {
    let newType;
    const { back, front } = RNCamera.Constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  switchFlash() {
    let newFlashMode;
    const { auto, on, off } = RNCamera.Constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  render() {
    const {
      preview,
      overlay,
      topOverlay,
      bottomOverlay,
      buttonsSpace,
      captureButton,
      typeButton,
      flashButton,
    } = styles;
    const { type, flashMode } = this.state.camera;
    return (
      <View style={{ flex: 1 }}>
        <RNCamera
          ref={(cam: any) => {
            this.camera = cam;
          }}
          style={preview}
          type={type}
          captureAudio={true}
          flashMode={flashMode}
          notAuthorizedView={
            <View>
              <Button
                onPress={async () => {
                  await this.camera.refreshAuthorizationStatus();
                }}>
                YOU ARE NOT AUTHORIZED TO USE THE CAMERA
              </Button>
            </View>
          }
        />
        <View style={[overlay, topOverlay]}>
          <Button style={typeButton} onPress={this.switchType.bind(this)}>
            type
          </Button>
          <Button style={flashButton} onPress={this.switchFlash.bind(this)}>
            flash
          </Button>
        </View>
        <View style={[overlay, bottomOverlay]}>
          {(!this.state.isRecording && (
            <Button style={captureButton} onPress={this.takePicture.bind(this)}>
              pic
            </Button>
          )) ||
            null}
          <View style={buttonsSpace} />
          {(!this.state.isRecording && (
            <Button style={captureButton} onPress={this.takeVideo.bind(this)}>
              record
            </Button>
          )) || (
              <Button style={captureButton} onPress={this.takeVideo.bind(this)}>
                stop
              </Button>
            )}
        </View>
      </View>
    );
  }
}

export default CameraPreview;

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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  } as ViewStyle,
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  } as ViewStyle,
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  } as ViewStyle,
  typeButton: {
    padding: 5,
  } as ViewStyle,
  flashButton: {
    padding: 5,
  } as ViewStyle,
  buttonsSpace: {
    width: 10,
  } as ViewStyle,
});
