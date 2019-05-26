import React from "react";

import Touchable from "../Touchable/Touchable";

import { Image, View } from "react-native";

/**
 *
 * @param {import("rn-components").IconProps} props
 */
const Icon = props => {
  const { style, iconSource, iconStyle, onPress, hitSlop, disabled, iconContainerStyle, size = 24 } = props;

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
    <Touchable
      style={[containerStyle, style]}
      boundedRipple={false}
      disabled={disabled}
      onPress={onPress}
      hitSlop={hitSlop}
      useForeground
    >
      <View style={[containerStyle, iconContainerStyle]}>
        <Image resizeMode="contain" style={iconStyle} source={iconSource} />
      </View>
    </Touchable>
  );
};

export default Icon;
