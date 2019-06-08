import React from "react";
import { Text as RNText, TouchableOpacity } from "react-native";

/**
 * @param {import("rn-components").TextProps} props
 */
const Text = props => {
  const { text, children, style, onPress, activeOpacity = 0.7, disabled, containerStyle, ...other } = props;
  const c = children || text;
  const renderText = () => (
    <RNText style={style} {...other}>
      {c}
    </RNText>
  );

  if (typeof onPress === "function") {
    return (
      <TouchableOpacity onPress={onPress} style={containerStyle} disabled={disabled} activeOpacity={activeOpacity}>
        {renderText()}
      </TouchableOpacity>
    );
  }

  return renderText();
};

Text.defaultProps = {
  text: ""
};

Text.displayName = "Custom Text";

export default Text;
