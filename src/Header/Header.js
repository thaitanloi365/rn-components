import React from "react";
import { View, StyleSheet } from "react-native";
import StatusBar from "../StatusBar/StatusBar";
import Text from "../Text/Text";
import Device from "../Utils/Device";
import renderNode from "../Utils/RenderNode";

const headerHeight = Device.getHeaderHeight();
/**
 *
 * @param {import("rn-components").HeaderProps} props
 */
const Header = props => {
  const {
    style,
    headerStyle,
    title = "",
    statusBarProps,
    statusBarVisible,
    LeftComponent,
    RightComponent,
    backgroundColor,
    titleContainerStyle,
    titleStyle,
    leftContainerStyle,
    rightContainerStyle,
    children
  } = props;

  /**
   * @typedef {import("react-native").ViewStyle} ViewStyle
   * @typedef {import("react-native").TextStyle} TextStyle
   */

  /**
   * @type {ViewStyle}
   */
  const defaultStyle = {
    backgroundColor: "transparent",
    height: headerHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  };

  /**
   * @type {TextStyle}
   */
  const textStyle = {
    fontSize: 18,
    color: "black"
  };

  /**
   * @type {ViewStyle}
   */
  const titleContainer = {
    flex: 3,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  };

  /**
   * @type {ViewStyle}
   */
  const buttonCornor = {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center"
  };

  return (
    <View style={[{ backgroundColor }, style]}>
      {statusBarVisible && <StatusBar {...statusBarProps} />}
      <View style={[defaultStyle, headerStyle]}>
        <View style={[{ flex: 1 }, rightContainerStyle]}>
          {renderNode(View, LeftComponent, {
            style: StyleSheet.flatten([buttonCornor, leftContainerStyle])
          })}
        </View>

        <View style={[titleContainer, titleContainerStyle]}>
          <Text style={[textStyle, titleStyle]} text={title} />
        </View>

        <View style={[{ flex: 1 }, rightContainerStyle]}>
          {renderNode(View, RightComponent, {
            style: StyleSheet.flatten([buttonCornor, rightContainerStyle])
          })}
        </View>
      </View>
      {children}
    </View>
  );
};

Header.defaultProps = {
  LeftComponent: View,
  RightComponent: View,
  statusBarVisible: true,
  statusBarColor: "transparent",
  statusBarStyle: "light-content",
  backgroundColor: "white"
};

export default Header;
