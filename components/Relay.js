import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Switch from "react-switch";
import SocketConfig from "../constants/SocketsConfig";
import useWebSocket from "react-use-websocket";

export default function MyButton(props) {
  const [relayState, setRelayState] = useState(false);
  const { sendJsonMessage, readyState } = useWebSocket(SocketConfig.url, {
    onOpen: () => console.log("opened " + props.name + " relay"),
    share: () => true,
    shouldReconnect: closeEvent => true,
    onError: e => console.error,
    onClose: e => console.log,
    onMessage: e => {
      const { action, relay, on } = JSON.parse(e.data);
      if ("relay" === action && props.relay === relay) {
        setRelayState(on);
      }
    }
  });
  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch",
        alignItems: "center"
      }}
    >
      <Text style={{ textAlign: "center" }}>{props.name}</Text>
      <Switch
        onChange={v => {
          sendJsonMessage({
            action: "relay",
            relay: props.relay,
            on: !relayState,
            target: props.target,
            time: Date.now()
          });
        }}
        checked={relayState}
      />
    </View>
  );
}
