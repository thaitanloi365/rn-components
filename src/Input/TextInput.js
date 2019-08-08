import React from "react";
import { View, TextInput as RNTextInput, Platform, StyleSheet, InputAccessoryView } from "react-native";
import Text from "../Text/Text";
import RenderNode from "../Utils/RenderNode";

/**
 * @typedef {import("rn-components").TextInputProps} Props
 * @extends {React.Component<Props>}
 */
class TextInput extends React.Component {
  textInputRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      text: props.defaultValue || ""
    };
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
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
    if (typeof this.props.onPress === "function") {
      this.props.onPress();
    }
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
      onEndEditing,
      inputAccessoryViewID,
      inputAccessoryContainerStyle,
      InputAccessoryComponent,
      onKeyPress,
      onFocus,
      editable,
      numberOfLines,
      scrollEnabled,
      autoCapitalize,
      inputContainerStyle,
      LeftComponent,
      RightComponent,
      value
    } = this.props;

    const hiddenUnderline = multiline || underlineWidth == 0;
    const underlineStyle = hiddenUnderline
      ? {}
      : {
          borderBottomColor: underlineWidth ? underlineColor || "black" : undefined,
          borderBottomWidth: underlineWidth || StyleSheet.hairlineWidth
        };

    /**
     * @type {import("react-native").TextStyle}
     */
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

    const inputAccessoryStyle = [
      {
        backgroundColor: "#EFF0F1",
        borderTopWidth: 1,
        borderTopColor: "rgba(0,0,0,0.1)",
        paddingVertical: 12
      },
      inputAccessoryContainerStyle
    ];
    /**
     * @type {import("react-native").ViewStyle}
     */
    const inputContainer = StyleSheet.flatten([{ flexDirection: "row", alignItems: "center" }, inputContainerStyle]);

    const isValidInputAccessoryViewID = typeof inputAccessoryViewID === "string" && inputAccessoryViewID !== "";

    return (
      <View style={[style, underlineStyle]} onStartShouldSetResponder={this.onStartShouldSetResponder}>
        {helperText && <Text text={helperText} style={helperStyle} />}
        <View style={inputContainer}>
          {RenderNode(View, LeftComponent)}
          <RNTextInput
            ref={this.textInputRef}
            inputAccessoryViewID={inputAccessoryViewID}
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
            onEndEditing={onEndEditing}
            underlineColorAndroid="transparent"
            autoCapitalize={autoCapitalize || "none"}
            autoCorrect={false}
            editable={editable}
            multiline={multiline}
            numberOfLines={numberOfLines}
            scrollEnabled={scrollEnabled}
            value={value}
          />
          {RenderNode(View, RightComponent)}
        </View>
        {isValidInputAccessoryViewID && Platform.OS === "ios" && (
          <InputAccessoryView nativeID={inputAccessoryViewID}>
            <View style={inputAccessoryStyle}>{RenderNode(View, InputAccessoryComponent)}</View>
          </InputAccessoryView>
        )}
      </View>
    );
  }
}

export default TextInput;
