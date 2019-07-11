import React from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import Device from "../Utils/Device";
import LayoutAnimations from "../Utils/LayoutAnimations";

class KeyboardSpacer extends React.Component {
  static defaultProps = {
    keyboardTopOffset: 0
  };

  state = {
    keyboardSpace: 0,
    isOpenned: false
  };
  componentDidMount() {
    const updateListener = Device.isAndroid() ? "keyboardDidShow" : "keyboardWillShow";
    const resetListener = Device.isAndroid() ? "keyboardDidHide" : "keyboardWillHide";
    this.listeners = [
      Keyboard.addListener(updateListener, this.updateKeyboardSpace),
      Keyboard.addListener(resetListener, this.resetKeyboardSpace)
    ];
  }

  componentWillUnmount() {
    if (this.listeners) this.listeners.forEach(listener => listener.remove());
  }

  updateKeyboardSpace = event => {
    if (!event.endCoordinates || this.state.isOpenned) {
      return;
    }
    let animationConfig = LayoutAnimations.PresetEaseInOut;
    if (Device.isIOS()) {
      animationConfig = LayoutAnimations.Keyboard;
    }
    LayoutAnimations.setLayoutAnimation(animationConfig);

    const screenHeight = Device.getScreenSize().height;

    const { keyboardTopOffset, onShow } = this.props;
    const keyboardTop = event.endCoordinates.screenY;
    const keyboardSpace = screenHeight - keyboardTop + keyboardTopOffset;

    this.setState({ keyboardSpace, isOpenned: true }, () => {
      if (onShow) onShow(keyboardSpace, keyboardTop);
    });
  };

  resetKeyboardSpace = event => {
    if (!this.state.isOpenned) return;
    let animationConfig = LayoutAnimations.PresetEaseInOut;
    if (Device.isIOS()) {
      animationConfig = LayoutAnimations.Keyboard;
    }
    LayoutAnimations.setLayoutAnimation(animationConfig);
    this.setState({ keyboardSpace: 0, isOpenned: false }, () => {
      if (this.props.onHide) this.props.onHide();
    });
  };

  render() {
    const height = { height: this.state.keyboardSpace };
    const { style, ...other } = this.props;
    return <View style={[styles.container, height, style]} {...other} />;
  }
}

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default KeyboardSpacer;
