import { Dimensions, Platform, StatusBar, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

let _baseWidth = 375;
let _baseHeight = 812;

const hs = shortDimension / _baseWidth;
const vs = longDimension / _baseHeight;

const _isAndroid = Platform.OS == "android";

const _pixelDensity = PixelRatio.get();
const _adjustedWidth = width * _pixelDensity;
const _adjustedHeight = height * _pixelDensity;

function isAndroid() {
  return _isAndroid;
}

function isIOS() {
  return !_isAndroid;
}

function getScreenSize() {
  return { width, height };
}

function isIphoneX() {
  return Platform.OS === "ios" && (height === 812 || width === 812 || (height === 896 || width === 896));
}

function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight
  });
}

function getHeaderHeight() {
  const headerHeight = Platform.OS == "android" ? 56 : 44;
  return headerHeight;
}

function deviceType() {
  let type = "Phone";
  if (_pixelDensity < 2 && (_adjustedWidth >= 1000 || _adjustedHeight >= 1000)) {
    type = "Tablet";
  } else if (_pixelDensity === 2 && (_adjustedWidth >= 1920 || _adjustedHeight >= 1920)) {
    type = "Tablet";
  }
  return type;
}

function getStatusBarStyle() {
  // @ts-ignore
  const statusBarProps = StatusBar.prototype._defaultProps;
  if (statusBarProps && statusBarProps.barStyle && statusBarProps.barStyle.value) {
    return statusBarProps.barStyle.value;
  }
  return null;
}

function setBaseSize(width, height) {
  _baseWidth = width;
  _baseHeight = height;
}

export default {
  getScreenSize,
  isAndroid,
  isIOS,
  getStatusBarHeight,
  getHeaderHeight,
  width,
  height,
  isIphoneX,
  ifIphoneX,
  deviceType,
  hs,
  vs,
  getStatusBarStyle,
  setBaseSize
};
