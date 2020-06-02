import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import SocketConfig from "../constants/SocketsConfig";
import { useSocketIO } from "react-use-websocket";

export default function MyButton(props) {
  const [relayState, setRelayState] = useState("off");
  const { sendJsonMessage, readyState } = useSocketIO(SocketConfig.url, {
    onOpen: () => console.log("opened " + props.name + " relay"),
    share: () => true,
    shouldReconnect: closeEvent => true,
    onError: e => console.error,
    onClose: e => console.log,
    onMessage: e => {
      const { event, relay, state } = JSON.parse(e.data);
      if ("relay" === event && props.relay === relay) {
        setRelayState(state);
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
      <Text style={{ textAlign: "center" }}>{props.name}</Text>
      <Text
        style={{
          fontSize: 17,
          lineHeight: 24,
          textAlign: "center",
          backgroundColor: relayState === "on" ? "green" : "red"
        }}
      >
        {relayState}
      </Text>
      <Button
        title="Push"
        onPress={() => {
          sendJsonMessage({
            action: "relay",
            relay: props.relay,
            on: relayState === "on" ? false : true,
            target: props.target,
            time: Date.now()
          });
        }}
      />
    </View>
  );
}
