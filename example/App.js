import React, { Component } from "react";
import { Platform, View } from "react-native";
import {
  Touchable,
  Row,
  Col,
  StyleSheet,
  Text,
  Header,
  Button,
  Icon,
  ScrollView,
  TextInput,
  InputGroup,
  Textarea
} from "rn-components";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android: "Double tap R on your keyboard to reload,\n" + "Shake or press menu button for dev menu"
});

export default class App extends Component {
  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Header title="Home" />
        <ScrollView keyboardShouldPersistTaps="handled">
          <Touchable style={{ backgroundColor: "#eee", height: 200, width: 300 }}>
            <Text style={styles.welcome} text="Text inside touchable" />
            <Text style={styles.welcome} text="Welcome to React Native!" />
            <Text style={styles.instructions} text="To get started, edit App.js" />
            <Text style={styles.instructions} text={instructions} />
          </Touchable>

          <Row onPress={() => {}} style={{ marginTop: 20, backgroundColor: "#fff" }}>
            <Text style={styles.welcome} text="Text inside row" />
            <Text style={styles.instructions} text="To get started, edit App.js" />
            <Text style={styles.instructions} text={instructions} />
          </Row>

          <Col style={{ backgroundColor: "#eee" }}>
            <Text style={styles.welcome} text="Text inside column" />
            <Text style={styles.instructions} text="To get started, edit App.js" />
            <Text style={styles.instructions} text={instructions} />
          </Col>

          <InputGroup numberInputs={4}>
            <TextInput
              placeholder="input 1"
              returnKeyLabel="11"
              inputAccessoryViewID="122"
              InputAccessoryComponent={
                <Row
                  onPress={() => {
                    console.log("asdfasdf");
                  }}
                  alignHorizontal="space-between"
                >
                  <Text onPress={() => console.log("123")} text="asdfasdfa" style={{ color: "red" }} />
                  <Text text="asdfasdfa" style={{ color: "red" }} />
                </Row>
              }
            />
            <TextInput placeholder="input 2" returnKeyLabel="33" />
            <Text />
            <TextInput placeholder="input 3" returnKeyLabel="255522" />
            <TextInput placeholder="input 4" returnKeyLabel="2222" />
            <Textarea style={{ backgroundColor: "gray", height: 120 }} placeholder="input area" returnKeyLabel="2222" />
            <Text />
          </InputGroup>
          <Text />
          <Text onPress={() => console.log("asdfasf")} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    backgroundColor: "black"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
