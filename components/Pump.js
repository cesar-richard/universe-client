import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, Animated, Easing } from "react-native";
import Switch from "react-switch";
import SocketConfig from "../constants/SocketsConfig";
import useWebSocket from "react-use-websocket";

import PumpView from "./PumpView";

export default function Pump({ name, relayPositive, relayNegative, target }) {
  const [active, setActive] = useState(false);
  const [clockWise, setClockWise] = useState(true);
  const { sendJsonMessage, readyState } = useWebSocket(SocketConfig.url, {
    onOpen: () => console.log("opened " + name + " pump"),
    share: () => true,
    shouldReconnect: closeEvent => true,
    onError: e => console.error,
    onClose: e => console.log,
    onMessage: e => {
      const { action: a, name: n, on: o, clockWise: c } = JSON.parse(e.data);
      if ("pump" === a && name === n) {
        setActive(o);
        setClockWise(c);
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
      <Text style={{ textAlign: "center" }}>{name}</Text>
      <Switch
        onChange={v => {
          sendJsonMessage({
            action: "pump",
            name,
            on: v,
            clockWise,
            target,
            time: Date.now()
          });
        }}
        checked={active}
      />
      <Switch
        onChange={v => {
          sendJsonMessage({
            action: "pump",
            name,
            on: active,
            clockWise: v,
            target,
            time: Date.now()
          });
          setClockWise(v);
        }}
        checked={clockWise}
        checkedIcon={<>💦</>}
        uncheckedIcon={<>🔞</>}
      />
      <PumpView active={active} clockWise={clockWise} />
    </View>
  );
}

Pump.protoTypes = {
  name: PropTypes.string.isRequired,
  relayPositive: PropTypes.number.isRequired,
  relayNegative: PropTypes.number.isRequired,
  target: PropTypes.string.isRequired
};
