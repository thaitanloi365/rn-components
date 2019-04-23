import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Platform, Animated } from "react-native";

class Overlay extends React.Component {
  static defaultProps = {
    overlayColor: "rgba(35,36,38,0.8)",
    animated: true,
    duration: 250
  };
  state = {
    visible: false,
    animatedOpacity: new Animated.Value(0)
  };

  show = onShow => {
    const { animated, duration = 200 } = this.props;
    if (!animated) {
      this.state.animatedOpacity.setValue(1);
      this.setState({ visible: true }, onShow);
    } else {
      this.setState({ visible: true }, () => {
        Animated.timing(this.state.animatedOpacity, {
          toValue: 1,
          useNativeDriver: true,
          duration
        }).start(onShow);
      });
    }
  };

  hide = onHide => {
    const { animated, duration = 200 } = this.props;
    if (!animated) {
      this.state.animatedOpacity.setValue(0);
      this.setState({ visible: false }, onHide);
    } else {
      Animated.timing(this.state.animatedOpacity, {
        toValue: 0,
        useNativeDriver: true,
        duration
      }).start(() => this.setState({ visible: false }, onHide));
    }
  };

  onPressOutside = () => {
    const { onPressOutside } = this.props;
    if (onPressOutside) {
      this.hide(onPressOutside);
    }
  };

  render() {
    const { style, children, animated, overlayColor } = this.props;
    const { visible, animatedOpacity } = this.state;
    if (!visible) return null;
    let animationStyle = {};

    if (animated) {
      const opacity = animatedOpacity.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.7, 1],
        extrapolate: "clamp"
      });
      animationStyle = { opacity };
    }

    return (
      <TouchableWithoutFeedback onPress={this.onPressOutside}>
        <View style={[styles.modal, { overlayColor }]}>
          <Animated.View style={[styles.fill, animationStyle, { overlayColor }]}>
            <TouchableWithoutFeedback>
              <View style={[styles.container, style]}>{children}</View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    ...StyleSheet.absoluteFillObject,
    ...Platform.select({
      ios: { zIndex: 6 },
      android: { elevation: 6 }
    }),
    backgroundColor: "rgba(35,36,38,0.5)"
  },
  fill: {
    flex: 1,
    backgroundColor: "rgba(35,36,38,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  }
});

export default Overlay;
