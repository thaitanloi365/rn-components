import React from "react";
import TextInput from "./TextInput";

/**
 * @typedef {import("rn-components").TextareaProps} props
 * @extends {React.PureComponent<props>}
 */
class Textarea extends React.PureComponent {
  _inputRef = React.createRef();

  setNativeProps = props => {
    if (this._inputRef.current) {
      this._inputRef.current.setNativeProps(props);
    }
  };

  blur = () => {
    if (this._inputRef.current) this._inputRef.current.blur();
  };

  focus = () => {
    if (this._inputRef.current) this._inputRef.current.focus();
  };

  clearText = () => {
    if (this._inputRef.current) this._inputRef.current.clear();
  };

  getText = () => {
    if (this._inputRef.current) return this._inputRef.current.getText();
    return "";
  };

  render() {
    const { style, ...rest } = this.props;

    return (
      <TextInput
        ref={this._inputRef}
        style={[{ height: 120 }, style]}
        underlineColor="transparent"
        underlineWidth={0}
        multiline
        {...rest}
      />
    );
  }
}

export default Textarea;
