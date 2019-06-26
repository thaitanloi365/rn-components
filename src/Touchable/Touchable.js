import React from "react";
import { View, Platform, TouchableOpacity, TouchableNativeFeedback, StyleSheet } from "react-native";
import Device from "../Utils/Device";

const isAndroid = Device.isAndroid();
const version = Platform.Version;

const TouchableComponent = props => {
  const { children, useForeground, ...other } = props;
  if (isAndroid) {
    const _useForeground = useForeground && TouchableNativeFeedback.canUseNativeForeground();
    return (
      <TouchableNativeFeedback {...other} useForeground={_useForeground}>
        {children}
      </TouchableNativeFeedback>
    );
  }
  return <TouchableOpacity {...other}>{children}</TouchableOpacity>;
};

/**
 * @typedef {import("rn-components").TouchableProps} Props
 * @extends {React.Component<Props>}
 */

class Touchable extends React.Component {
  static defaultProps = {
    activeOpacity: 0.7,
    boundedRipple: true,
    linearProps: {
      start: { x: 0, y: 0.5 },
      end: { x: 1, y: 0.5 },
      colors: ["red", "blue"],
      locations: [0, 1]
    }
  };

  render() {
    const {
      style,
      onLayout,
      hitSlop,
      background: bg,
      ViewComponent = View,
      linearProps: lnProps,
      contentStyle,
      children,
      boundedRipple,
      ...other
    } = this.props;

    const linearProps = ViewComponent === View ? {} : lnProps;

    const background = isAndroid
      ? version >= 21
        ? bg || TouchableNativeFeedback.Ripple("ThemeAttrAndroid", !boundedRipple)
        : bg || TouchableNativeFeedback.SelectableBackground()
      : null;

    const isFixedHeight = style && StyleSheet.flatten(style).height > 0;

    return (
      <View style={style} onLayout={onLayout} hitSlop={hitSlop}>
        <TouchableComponent {...other} background={background}>
          <ViewComponent {...linearProps} style={[{ height: isFixedHeight ? "100%" : "auto" }, contentStyle]}>
            {children}
          </ViewComponent>
        </TouchableComponent>
      </View>
    );
  }
}

export default Touchable;
