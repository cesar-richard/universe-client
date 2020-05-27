import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";
import { useSocketIO } from "react-use-websocket";
import SocketConfig from "../constants/SocketsConfig";
import Light from "./Light";

export default function Lights() {
  const [lights, setLights] = useState([]);
  const [toRender, setToRender] = useState([]);

  const {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
    getWebSocket
  } = useSocketIO(SocketConfig.url, {
    onOpen: () => console.log("opened Lights"),
    share: () => true,
    shouldReconnect: closeEvent => true,
    onError: e => console.error,
    onClose: e => console.log,
    onMessage: event => {
      const data = JSON.parse(event.data);
      if (data.event == "answer" && data.sensor == "lights") {
        setLights(data.state);
      }
    }
  });

  useEffect(
    () =>
      sendJsonMessage({ event: "ask", sensor: "universe", state: "lights" }),
    []
  );

  useEffect(() => {
    const tmp = [];
    lights.map(l => {
      tmp.push(<Light key={l.id} name={l.nalme} state={l.state} />);
    });
    setToRender(tmp);
  }, [lights]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                alignSelf: "stretch"
              }}
            >
              <Text>Nom</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: "stretch"
              }}
            >
              <Text>On</Text>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: "stretch"
              }}
            >
              <Text>Power</Text>
            </View>
          </View>
          {toRender}
        </View>
      </ScrollView>
    </View>
  );
}

Lights.navigationOptions = {
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
