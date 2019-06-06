import React from "react";
import { StyleSheet, Platform, View } from "react-native";
import Touchable from "../Touchable/Touchable";
import Text from "../Text/Text";

/**
 * @typedef {import("rn-components").ButtonProps} Props
 * @extends {React.Component<Props>}
 */
class Button extends React.Component {
  render() {
    const { style, rasied, text, textStyle, ...other } = this.props;

    return (
      <Touchable style={StyleSheet.flatten([style, styles.button, rasied && styles.rasied])} {...other}>
        <View style={{ alignSelf: "stretch", flex: 1, justifyContent: "center", alignContent: "center" }}>
          <Text text={text} style={[styles.text, textStyle]} />
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  rasied: {
    backgroundColor: "#fff",
    ...Platform.select({
      android: {
        elevation: 2
      },
      ios: {
        shadowColor: "rgba(0,0,0, .4)",
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
      }
    })
  },
  text: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    color: "white",
    alignSelf: "center"
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007aff",
    borderRadius: 4
  }
});
export default Button;
