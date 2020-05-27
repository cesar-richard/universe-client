import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";
import { useSocketIO } from "react-use-websocket";
import SocketConfig from "../constants/SocketsConfig";

export default function Light(props) {
  const {
    name,
    state: { on, bri }
  } = props;
  return (
    <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
      <View
        style={{
          flex: 1,
          alignSelf: "stretch"
        }}
      >
        <Text>{name}</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignSelf: "stretch"
        }}
      >
        <Text
          style={on ? { backgroundColor: "green" } : { backgroundColor: "red" }}
        >
          {on ? "true" : "false"}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignSelf: "stretch"
        }}
      >
        <Text>{Math.round((bri * 100) / 255, 2)}%</Text>
      </View>
    </View>
  );
}

Light.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 30
  }
});
