import React, { useState } from "react";
import { Text, View } from "react-native";
import Switch from "react-switch";
import SocketConfig from "../constants/SocketsConfig";
import useWebSocket from "react-use-websocket";

export default function Toggle(props) {
  const [btnState, setBtnState] = useState("off");
  const { sendJsonMessage, readyState } = useWebSocket(SocketConfig.url, {
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
      <label htmlFor="disabled-switch">
        <Text style={{ textAlign: "center" }}>{props.name}</Text>
        <Switch
          onChange={() => {}}
          checked={btnState === "on"}
          disabled
          className="react-switch"
          id="disabled-switch"
        />
      </label>
    </View>
  );
}
