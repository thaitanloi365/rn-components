import { StyleSheet as RNStyleSheet } from "react-native";

function create(styles) {
  return RNStyleSheet.create(styles);
}

function flatten(style) {
  return RNStyleSheet.flatten(style);
}

const absoluteFill = RNStyleSheet.absoluteFill;
const absoluteFillObject = RNStyleSheet.absoluteFillObject;
const hairlineWidth = RNStyleSheet.hairlineWidth;

export default {
  create,
  flatten,
  absoluteFill,
  absoluteFillObject,
  hairlineWidth
};
