import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import SocketConfig from "../constants/SocketsConfig";
import { useSocketIO } from "react-use-websocket";

export default function Toggle(props) {
  const [btnState, setBtnState] = useState("off");
  const { sendJsonMessage, readyState } = useSocketIO(SocketConfig.url, {
    onOpen: () => console.log("opened " + props.name + " toggle"),
    share: () => true,
    shouldReconnect: closeEvent => true,
    onError: e => console.error,
    onClose: e => console.log,
    onMessage: e => {
      const { event, sensor, state } = JSON.parse(e.data);
      if ("button" === event && props.sensor === sensor) {
        setBtnState(state);
      }
    }
  });
  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch"
      }}
    >
      <Text style={{ textAlign: "center", paddingTop: "1em" }}>
        {props.name}
      </Text>
      <Text
        style={{
          fontSize: 17,
          lineHeight: 24,
          textAlign: "center",
          backgroundColor: btnState === "on" ? "green" : "red"
        }}
      >
        {btnState}
      </Text>
    </View>
  );
}
