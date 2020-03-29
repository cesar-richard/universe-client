import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";
import WS from "react-native-websocket";
import Light from "./Light";

export default function Lights() {
  const [lights, setLights] = useState([]);
  const [toRender, setToRender] = useState([]);
  useEffect(() => {
    let socket = new WebSocket("ws://192.168.1.6:3000");
    socket.onopen = () => {
      socket.send(
        JSON.stringify({ event: "ask", sensor: "universe", state: "lights" })
      );
    };
    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.event == "answer" && data.sensor == "lights") {
        console.log(event.data);
        setLights(JSON.parse(data.state));
      }
    };
    socket.onclose = () => {
      console.log("disconnected");
      //socket = new WebSocket("ws://192.168.1.6:3000");
    };
  }, []);
  useEffect(() => {
    const tmp = [];
    Object.entries(lights).map(l => {
      tmp.push(<Light key={l[0]} datas={l[1]} />);
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
