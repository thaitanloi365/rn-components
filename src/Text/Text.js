import React from "react";
import { Text as RNText, TouchableOpacity } from "react-native";

const Text = props => {
  const { text, children, style, onPress, activeOpacity = 0.7, disabled, containerStyle } = props;
  const c = children || text;
  const renderText = () => <RNText style={style}>{c}</RNText>;

  if (onPress) {
    return (
      <TouchableOpacity style={containerStyle} disabled={disabled} activeOpacity={activeOpacity}>
        {renderText()}
      </TouchableOpacity>
    );
  }

  return renderText();
};

Text.defaultProps = {
  text: "Custom Text"
};

Text.displayName = "Custom Text";

export default Text;
