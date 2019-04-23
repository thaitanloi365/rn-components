import React from "react";

import Touchable from "../Touchable/Touchable";

import { Image, View } from "react-native";

/**
 *
 * @param {import("rn-components-base").IconProps} props
 */
const Icon = props => {
  const { style, iconSource, iconStyle, onPress, hitSlop, disabled, size = 22 } = props;

  /**
   * @type {import("react-native").ViewStyle}
   */
  const containerStyle = {
    width: size * 2,
    height: size * 2,
    borderRadius: size,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  };
  return (
    <Touchable disabled={disabled} onPress={onPress} hitSlop={hitSlop}>
      <View style={[containerStyle, style]}>
        <Image style={iconStyle} source={iconSource} />
      </View>
    </Touchable>
  );
};

export default Icon;
