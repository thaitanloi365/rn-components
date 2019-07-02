import React from "react";
import { ScrollView as RNScrollView, TextInput, UIManager, findNodeHandle, Platform } from "react-native";
import KeyboardSpacer from "./KeyboardSpacer";

/**
 * @typedef {import("rn-components").ScrollViewProps} props
 * @extends {React.Component<props>}
 */
class ScrollView extends React.Component {
  contentHeight = 0;
  height = 0;
  ref = React.createRef();

  static defaultProps = {
    keyboardTopOffset: 10,
    topOffset: 75,
    autoScrollNextInput: false
  };

  state = {
    scrollEnable: false,
    keyboardSpacer: 0,
    keyboardTop: 0
  };

  _scrollToTop = () => {
    if (this.ref.current && typeof this.ref.current.scrollTo === "function") {
      this.ref.current.scrollTo({
        x: 0,
        y: 0,
        animated: true
      });
    }
  };

  componentWillMount() {
    if (this.props.navigation && typeof this.props.navigation.setParams === "function") {
      this.props.navigation.setParams({ scrollToTop: this._scrollToTop });
    }
  }

  /**
   * @param {null | number | React.Component<any, any> | React.ComponentClass<any>} node
   */

  scrollToNode = (node, offset = 75) => {
    if (Platform.OS === "android" || !this.ref.current) return;
    const responder = this.ref.current.getScrollResponder();
    if (!node || !responder) {
      return;
    }
    const reactNode = findNodeHandle(node);

    if (!reactNode) {
      return;
    }

    // @ts-ignore
    UIManager.viewIsDescendantOf(reactNode, responder.getInnerViewNode(), isAncestor => {
      if (isAncestor) {
        UIManager.measureInWindow(reactNode, (x, y, width, height) => {
          const inputBottom = y + height;
          if (inputBottom < this.state.keyboardTop) {
            return;
          }

          const topOffset = offset || this.props.inputBottomOffset;

          responder.scrollResponderScrollNativeHandleToKeyboard(reactNode, topOffset + height, true);
        });
      }
    });
  };

  scrollToCurrentInput(offset = 75) {
    const currentlyFocusedField = TextInput.State.currentlyFocusedField();
    this.scrollToNode(currentlyFocusedField, offset);
  }

  _onContentSizeChange = (w, h) => {
    this.contentHeight = h;
    if (this.height !== 0) {
      this._updateScrollViewEnable();
    }
  };

  _onLayout = event => {
    this.height = event.nativeEvent.layout.height;
    if (this.contentHeight != 0) {
      this._updateScrollViewEnable();
    }
  };

  _updateScrollViewEnable = () => {
    const scrollEnable = this.contentHeight > this.height;
    if (this.state.scrollEnable != scrollEnable) {
      this.setState({ scrollEnable });
    }
  };

  _onShow = (spacer, keyboardTop) => {
    this.props.autoScrollNextInput && this.scrollToCurrentInput();
    this.setState({ keyboardSpacer: spacer, keyboardTop });
  };

  _onHide = () => {
    this.setState({ keyboardSpacer: 0, keyboardTop: 0 });
  };

  render() {
    const { scrollEnable } = this.state;
    const { keyboardTopOffset, ...other } = this.props;
    return (
      <RNScrollView
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustContentInsets={false}
        {...other}
        scrollEnabled={scrollEnable}
        ref={this.ref}
        onContentSizeChange={this._onContentSizeChange}
        onLayout={this._onLayout}
      >
        {this.props.children}
        <KeyboardSpacer onShow={this._onShow} onHide={this._onHide} keyboardTopOffset={keyboardTopOffset} />
      </RNScrollView>
    );
  }
}

export default ScrollView;
