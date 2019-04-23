import React from "react";
import { View } from "react-native";
import Touchable from "../Touchable/Touchable";
import Row from "../Row/Row";

const chunk = (arr, n) =>
  Array.from(Array(Math.ceil(arr.length / n)), (_, i) => arr.slice(i * n, i * n + n));

const prepareData = (data, itemsPerRow) => {
  const rows = chunk(data, itemsPerRow);
  if (rows.length) {
    const lastRow = rows[rows.length - 1];
    for (let i = 0; lastRow.length < itemsPerRow; i += 1) {
      lastRow.push(null);
    }
  }
  return rows;
};

class Grid extends React.Component {
  render() {
    const { style, children, numCols = 1, onPress, stretchVertical, rowStyle } = this.props;
    if (numCols === 1) {
      return <View style={style}>{children}</View>;
    }

    const rows = prepareData(this.props.children, numCols);
    const stretchVStyle = stretchVertical
      ? {
          height: `${100 / rows.length}%`
        }
      : {};

    const items = rows.map((item, index) => {
      return (
        <Row style={[rowStyle, stretchVStyle]} key={index}>
          {React.Children.map(item, it => {
            return it;
          })}
        </Row>
      );
    });

    if (onPress && typeof onPress === "function") {
      return (
        <Touchable style={style} onPress={onPress}>
          <View>{items}</View>
        </Touchable>
      );
    }
    return <View style={style}>{items}</View>;
  }
}

export default Grid;
