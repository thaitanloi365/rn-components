import { LayoutAnimation, Platform, UIManager } from "react-native";

/**
 * @typedef {import("react-native").LayoutAnimationConfig} config
 */
function enableAndroidLayoutAnimation() {
  if (Platform.OS == "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/**
 * @type {config}
 */
const Keyboard = {
  duration: 250,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut
  }
};

/**
 * @type {config}
 */
const Toast = {
  duration: 250,
  create: {
    delay: 500,
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  delete: {
    type: LayoutAnimation.Types.easeOut,
    property: LayoutAnimation.Properties.opacity
  }
};

/**
 * @type {config}
 */
const ListItem = {
  duration: 250,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.7
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  }
};

/**
 *
 * @param {config} config
 * @param {() => void} [callback]
 */
function setLayoutAnimation(config, callback) {
  if (config) {
    LayoutAnimation.configureNext(config, callback);
  } else {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear, callback);
  }
}

const PresetEaseInOut = LayoutAnimation.Presets.easeInEaseOut;
const PresetLinear = LayoutAnimation.Presets.linear;
const PresetSpring = LayoutAnimation.Presets.spring;
export default {
  enableAndroidLayoutAnimation,
  setLayoutAnimation,
  Toast,
  ListItem,
  Keyboard,
  PresetEaseInOut,
  PresetLinear,
  PresetSpring
};
