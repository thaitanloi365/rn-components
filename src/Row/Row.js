import React from "react";
import Touchable from "../Touchable/Touchable";
import { View, StyleSheet } from "react-native";

/**
 *
 * @param {import('rn-components').RowProps} props
 */
const Row = props => {
  const { children, flex, style, alignHorizontal, alignVertical, alignSelf, onPress } = props;
  /**
   * @type {import("react-native").FlexStyle}
   */
  const flexStyle = {
    alignItems: alignVertical,
    justifyContent: alignHorizontal,
    alignSelf: alignSelf,
    flexDirection: "row",
    flex: flex ? flex : style && StyleSheet.flatten(style).height ? 0 : 0
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

export default Row;
