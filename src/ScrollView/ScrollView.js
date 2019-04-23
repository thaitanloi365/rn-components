import React from "react";
import {
  ScrollView as RNScrollView,
  TextInput,
  UIManager,
  findNodeHandle,
  Platform
} from "react-native";
import KeyboardSpacer from "./KeyboardSpacer";

class ScrollView extends React.Component {
  contentHeight = 0;
  height = 0;
  ref = React.createRef();

  static defaultProps = {
    keyboardTopOffset: 10,
    topOffset: 75
  };

  state = {
    scrollEnable: false,
    keyboardSpacer: 0,
    keyboardTop: 0
  };

  scrollToInput = () => {
    if (Platform.OS === "android" || !this.ref.current) return;
    const currentlyFocusedField = TextInput.State.currentlyFocusedField();
    const responder = this.ref.current.getScrollResponder();

    if (!currentlyFocusedField || !responder) {
      return;
    }

    // @ts-ignore
    UIManager.viewIsDescendantOf(
      currentlyFocusedField,
      responder.getInnerViewNode(),
      isAncestor => {
        if (isAncestor) {
          UIManager.measureInWindow(currentlyFocusedField, (x, y, width, height) => {
            const inputBottom = y + height;
            console.log(inputBottom, this.state.keyboardTop);
            if (inputBottom < this.state.keyboardTop) return;
            const reactNode = findNodeHandle(currentlyFocusedField);
            const { topOffset } = this.props;
            responder.scrollResponderScrollNativeHandleToKeyboard(
              reactNode,
              topOffset + height,
              true
            );
          });
        }
      }
    );
  };

  onContentSizeChange = (w, h) => {
    this.contentHeight = h;
    if (this.height !== 0) {
      this.updateScrollViewEnable();
    }
  };

  onLayout = event => {
    this.height = event.nativeEvent.layout.height;
    if (this.contentHeight != 0) {
      this.updateScrollViewEnable();
    }
  };

  updateScrollViewEnable = () => {
    const scrollEnable = this.contentHeight > this.height;
    if (this.state.scrollEnable != scrollEnable) {
      this.setState({ scrollEnable });
    }
  };

  onShow = (spacer, keyboardTop) => {
    this.setState({ keyboardSpacer: spacer, keyboardTop });
  };

  onHide = () => {
    this.setState({ keyboardSpacer: 0, keyboardTop: 0 });
  };

  render() {
    const { scrollEnable } = this.state;
    const { keyboardTopOffset, ...other } = this.props;
    return (
      <RNScrollView
        {...other}
        ref={this.ref}
        scrollEnabled={scrollEnable}
        onContentSizeChange={this.onContentSizeChange}
        onLayout={this.onLayout}
        automaticallyAdjustContentInsets={false}
      >
        {this.props.children}
        <KeyboardSpacer
          onShow={this.onShow}
          onHide={this.onHide}
          keyboardTopOffset={keyboardTopOffset}
        />
      </RNScrollView>
    );
  }
}

export default ScrollView;
