import React from "react";
import { StyleSheet } from "react-native";
import Assets from "../Assets";
import Icon from "../Icon/Icon";
import Row from "../Row/Row";
import Text from "../Text/Text";

/**
 * @typedef {import("rn-components-base").CheckBoxProps} Props
 * @extends {React.Component<Props>}
 */

class CheckBox extends React.Component {
  /**
   * @param {Props} props
   */
  constructor(props) {
    super(props);
    const { checked = false } = props;
    this.state = {
      checked
    };
  }

  static defaultProps = {
    textPosition: "right"
  };

  toggle = onToggle => {
    const { checked } = this.state;
    const newState = !checked;
    this.setState({ checked: newState }, () => {
      if (this.props.onStateChanged) {
        this.props.onStateChanged(newState);
      }
      if (typeof onToggle === "function") {
        onToggle(newState);
      }
    });
  };

  onPress = () => {
    const { onPress, onStateChanged } = this.props;
    if (onPress) {
      onPress();
    } else {
      this.toggle(onStateChanged);
    }
  };

  renderTextLeft = () => {
    const { textPosition, text } = this.props;
    if (textPosition !== "left" || text === undefined) return null;
    const {
      deactiveTextStyle = styles.deactiveText,
      activeTextStyle = styles.activeText
    } = this.props;
    const checked = this.state.checked;
    const style = checked ? activeTextStyle : deactiveTextStyle;

    return <Text style={style} text={text} />;
  };

  renderTextRight = () => {
    const { textPosition, text } = this.props;
    if (textPosition !== "right" || text === undefined) return null;
    const {
      deactiveTextStyle = styles.deactiveText,
      activeTextStyle = styles.activeText
    } = this.props;
    const checked = this.state.checked;
    const style = checked ? activeTextStyle : deactiveTextStyle;

    return <Text style={style} text={text} />;
  };

  render() {
    const { checked } = this.state;
    const {
      style,
      activeTintColor = Assets.colors.primary,
      activeImageSource = Assets.images.checkBoxChecked,
      activeImageStyle,
      deactiveTintColor = Assets.colors.primary,
      deactiveImageSource = Assets.images.checkBoxUncheck,
      deactiveImageStyle,
      hitSlop = { top: 10, left: 10, right: 10, bottom: 10 }
    } = this.props;
    const source = checked ? activeImageSource : deactiveImageSource;
    const tintColor = checked ? activeTintColor : deactiveTintColor;
    const iconStyle = checked ? activeImageStyle : deactiveImageStyle;

    return (
      <Row alignVertical="center" style={style}>
        {this.renderTextLeft()}
        <Icon
          hitSlop={hitSlop}
          onPress={this.onPress}
          style={styles.container}
          iconSource={source}
          iconStyle={[iconStyle, { tintColor }]}
        />
        {this.renderTextRight()}
      </Row>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  deactiveText: {
    fontSize: 16,
    color: "black"
  },
  activeText: {
    fontSize: 16,
    color: Assets.colors.primary
  }
});

export default CheckBox;
