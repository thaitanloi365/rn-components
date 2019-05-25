import React from "react";
import { View, StyleSheet } from "react-native";
import TextInput from "./TextInput";

/**
 * @typedef {import("rn-components").InputGroupProps} Props
 * @extends {React.Component<Props>}
 */
class InputGroup extends React.Component {
  constructor(props) {
    super(props);
    this.inputRefs = [];
  }

  scrollToInput = () => {
    const { scrollViewRef } = this.props;
    if (scrollViewRef && scrollViewRef.current) {
      scrollViewRef.current.scrollToCurrentInput();
    }
  };

  onFocus = index => {
    this.scrollToInput();
  };

  onInputSubmmitEditing = index => {
    const { onInputSubmit, onInputFocus } = this.props;
    const length = this.inputRefs.length;

    if (index === length - 1) {
      if (typeof onInputSubmit === "function") {
        onInputSubmit();
      }
    } else {
      const textInput = this.inputRefs[index + 1];
      if (textInput) {
        textInput.focus();
        if (typeof onInputFocus === "function") {
          onInputFocus(index);
        }
      }
    }
  };

  clearText(atIndex) {
    const textInput = this.inputRefs[atIndex];
    if (textInput) {
      textInput.clearText();
    }
  }

  getText(atIndex) {
    const textInput = this.inputRefs[atIndex];
    if (textInput) {
      return textInput.getText();
    }
    return null;
  }

  getAllText() {
    const texts = this.inputRefs.map(input => {
      if (input) {
        return input.getText();
      }
      return "";
    });
    return texts;
  }

  focus(atIndex) {
    const textInput = this.inputRefs[atIndex];
    if (textInput) {
      textInput.focus();
    }
  }

  render() {
    const { children, style, spacing, numberInputs } = this.props;
    let inputs = null;

    if (Array.isArray(children) && children.length > 0) {
      const totalInputs = numberInputs || children.length;
      inputs = React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;
        const { style } = child.props;
        const marginTop = index === 0 ? 0 : (style && StyleSheet.flatten(style).marginTop) || spacing;

        if (child.type === TextInput) {
          const lastIndex = index === totalInputs - 1;
          const returnKeyType = child.props.returnKeyType ? child.props.returnKeyType : lastIndex ? "done" : "next";

          return React.cloneElement(child, {
            style: StyleSheet.flatten([{ marginTop }, child.props.style]),
            returnKeyType: returnKeyType,
            onSubmitEditing: () => this.onInputSubmmitEditing(index),
            onFocus: () => this.onFocus(index),
            ref: node => {
              if (node && this.inputRefs.length !== children.length) {
                this.inputRefs.push(node);
              }
            }
          });
        }
        return child;
      });
    } else {
      inputs = children;
    }

    return <View style={style}>{inputs}</View>;
  }
}

export default InputGroup;
