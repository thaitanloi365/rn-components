import React from "react";
import Touchable from "../Touchable/Touchable";
import { View, StyleSheet } from "react-native";

/**
 *
 * @param {import('rn-components-base').ColProps} props
 */
const Column = props => {
  const { children, flex, style, alignHorizontal, alignVertical, alignSelf, onPress } = props;
  /**
   * @type {import("react-native").FlexStyle}
   */
  const flexStyle = {
    justifyContent: alignVertical,
    alignItems: alignHorizontal,
    alignSelf: alignSelf,
    flexDirection: "column",
    flex: flex ? flex : style && StyleSheet.flatten(style).width ? 0 : 0
  };

  if (onPress && typeof onPress === "function") {
    return (
      <Touchable style={style} onPress={onPress}>
        <View style={flexStyle}>{children}</View>
      </Touchable>
    );
  }

  return <View style={[style, flexStyle]}>{children}</View>;
};

export default Column;
