import React from "react";
import { StatusBar as RNStatusBar, View } from "react-native";
import Device from "../Utils/Device";

const statusBarHeight = Device.getStatusBarHeight(true);
const isIOS = Device.isIOS();

const StatusBar = props => {
  if (isIOS) {
    const { style, barStyle, networkActivityIndicatorVisible, showHideTransition, backgroundColor, animated } = props;
    const height = statusBarHeight;
    return (
      <View style={[{ backgroundColor, height }, style]}>
        <RNStatusBar
          animated={animated}
          barStyle={barStyle}
          networkActivityIndicatorVisible={networkActivityIndicatorVisible}
          showHideTransition={showHideTransition}
        />
      </View>
    );
  }

  const { barStyle, translucent, backgroundColor, animated, style } = props;
  if (translucent) {
    return (
      <View style={[{ height: statusBarHeight }, style]}>
        <RNStatusBar translucent barStyle={barStyle} backgroundColor={backgroundColor} animated={animated} />
      </View>
    );
  }

  return (
    <RNStatusBar translucent={translucent} barStyle={barStyle} backgroundColor={backgroundColor} animated={animated} />
  );
};

StatusBar.defaultProps = {
  translucent: true,
  barStyle: "dark-content",
  animated: true
};

export default StatusBar;
