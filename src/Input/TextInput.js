import React from "react";
import { View, TextInput as RNTextInput, Platform, StyleSheet } from "react-native";
import Text from "../Text/Text";
import RenderNode from "../Utils/RenderNode";

class TextInput extends React.Component {
  textInputRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      text: props.defaultValue || ""
    };
  }

  setNativeProps = props => {
    if (this.textInputRef.current) {
      this.textInputRef.current.setNativeProps(props);
    }
  };

  blur = () => {
    if (this.textInputRef.current) this.textInputRef.current.blur();
  };

  focus = () => {
    if (this.textInputRef.current) {
      if (!this.textInputRef.current.isFocused()) {
        this.textInputRef.current.focus();
      }
    }
  };

  clearText = () => {
    this.setState({ text: "" }, () => {
      if (this.textInputRef.current) this.textInputRef.current.clear();
    });
  };

  getText = () => {
    return this.state.text;
  };

  onTextChanged = text => {
    this.setState({ text }, () => {
      if (this.props.onChangeText) {
        this.props.onChangeText(text);
      }
    });
  };

  onStartShouldSetResponder = e => {
    this.focus();
    return true;
  };

  render() {
    const {
      style,
      inputStyle,
      helperText,
      helperStyle,
      underlineColor,
      underlineWidth,
      returnKeyLabel,
      returnKeyType,
      defaultValue,
      placeholder,
      placeholderTextColor,
      keyboardType,
      secureTextEntry,
      multiline,
      maxLength,
      onSubmitEditing,
      onKeyPress,
      onFocus,
      editable,
      numberOfLines,
      scrollEnabled,
      autoCapitalize,
      inputContainerStyle,
      LeftComponent,
      RightComponent
    } = this.props;

    const hiddenUnderline = multiline || underlineWidth == 0;
    const underlineStyle = hiddenUnderline
      ? {}
      : {
          borderBottomColor: underlineWidth ? underlineColor || "black" : undefined,
          borderBottomWidth: underlineWidth || StyleSheet.hairlineWidth
        };

    const defaultStyle = {
      paddingBottom: 4,
      fontSize: 16,
      flex: 1,
      ...Platform.select({
        android: {
          paddingVertical: 0,
          textAlignVertical: multiline ? "top" : "auto"
        }
      })
    };

    const inputContainer = [{ flexDirection: "row", alignItems: "center" }, inputContainerStyle];

    return (
      <View
        style={[style, underlineStyle]}
        onStartShouldSetResponder={this.onStartShouldSetResponder}
      >
        {helperText && <Text text={helperText} style={helperStyle} />}
        <View style={inputContainer}>
          {RenderNode(View, LeftComponent)}
          <RNTextInput
            ref={this.textInputRef}
            style={[defaultStyle, inputStyle]}
            returnKeyLabel={returnKeyLabel}
            returnKeyType={returnKeyType}
            defaultValue={defaultValue}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            maxLength={maxLength}
            onChangeText={this.onTextChanged}
            onSubmitEditing={onSubmitEditing}
            onKeyPress={onKeyPress}
            onFocus={onFocus}
            underlineColorAndroid="transparent"
            autoCapitalize={autoCapitalize || "none"}
            autoCorrect={false}
            editable={editable}
            multiline={multiline}
            numberOfLines={numberOfLines}
            scrollEnabled={scrollEnabled}
          />
          {RenderNode(View, RightComponent)}
        </View>
      </View>
    );
  }
}

export default TextInput;
