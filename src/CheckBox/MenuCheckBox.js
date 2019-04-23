import React from "react";
import Grid from "../Grid/Grid";

class MenuCheckBox extends React.Component {
  checkBoxRefs = [];

  constructor(props) {
    super(props);
    const { initialSelectedIndex = 0, children } = props;
    const length = children.length;
    this.state = {
      currentIndex: initialSelectedIndex,
      //@ts-ignore
      selectedIndexs: Array.from(Array(length).keys()).map(index => {
        return {
          index,
          checked: index === 0
        };
      })
    };
  }

  static defaultProps = {
    multipleSelect: true,
    children: []
  };

  onPress = index => {
    const { currentIndex } = this.state;
    const { multipleSelect } = this.props;
    const checkBox = this.checkBoxRefs[index];
    if (!checkBox) return;

    if (multipleSelect) {
      checkBox.toggle(checked => {
        let temp = [...this.state.selectedIndexs];
        temp[index].checked = checked;
        const checkedItems = temp.filter(item => item.checked);
        this.setState({ selectedIndexs: temp }, () => {
          const { onItemsSelected } = this.props;
          if (onItemsSelected) {
            onItemsSelected(checkedItems);
          }
        });
      });
    } else {
      if (currentIndex === index) {
        checkBox.toggle();
      } else {
        const currentCheckBox = this.checkBoxRefs[currentIndex];
        if (currentCheckBox) {
          currentCheckBox.toggle(() => {
            this.setState({
              currentIndex: index
            });
          });
        }
        checkBox.toggle();
      }
      if (this.props.onItemSelected) {
        this.props.onItemSelected(index);
      }
    }
  };

  render() {
    const { style, children, numCols, multipleSelect } = this.props;
    if (multipleSelect) {
    }

    const items = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          checked: !multipleSelect && index === this.state.currentIndex,
          onPress: () => this.onPress(index),
          ref: node => {
            if (node) this.checkBoxRefs.push(node);
          }
        });
      }

      return null;
    });
    return (
      <Grid style={style} numCols={numCols}>
        {items}
      </Grid>
    );
  }
}

export default MenuCheckBox;
