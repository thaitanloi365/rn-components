import React from "react";
import { View, StyleSheet } from "react-native";
import TextInput from "./TextInput";

class InputGroup extends React.Component {
  constructor(props) {
    super(props);
    this.inputRefs = [];
  }
  onInputSubmmitEditing = index => {
    const length = this.inputRefs.length;

    if (index === length - 1) {
      if (this.props.onInputSubmit) {
        this.props.onInputSubmit();
      }
    } else {
      const textInput = this.inputRefs[index + 1];
      if (textInput) {
        textInput.focus();
        if (this.props.onInputFocus) {
          this.props.onInputFocus(index);
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
    const { children, style, spacing } = this.props;
    let inputs = null;
    if (Array.isArray(children) && children.length > 0) {
      inputs = React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;
        const { style } = child.props;
        const marginTop = index === 0 ? 0 : (style && StyleSheet.flatten(style).marginTop) || spacing;
        const lastIndex = index === children.length - 1;
        const returnKeyType = child.props.returnKeyType ? child.props.returnKeyType : lastIndex ? "done" : "next";
        if (child.type === TextInput) {
          return React.cloneElement(child, {
            style: StyleSheet.flatten([child.props.style, { marginTop }]),
            returnKeyType: returnKeyType,
            onSubmitEditing: () => this.onInputSubmmitEditing(index),
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
