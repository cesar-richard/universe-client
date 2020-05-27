import React, { useState, useEffect, useRef } from "react";
import { View, Button } from "react-native";
import { useSocketIO } from "react-use-websocket";
import SocketConfig from "../constants/SocketsConfig";
import MyButton from "./Button";

export default function Buttons(props) {
  const [socket, setSocket] = useState(null);
  const {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
    getWebSocket
  } = useSocketIO(SocketConfig.url, {
    onOpen: () => console.log("opened Buttons"),
    share: () => true,
    shouldReconnect: closeEvent => true,
    onError: e => console.error,
    onClose: e => console.log
  });
  return (
    <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
      <MyButton send={sendJsonMessage} sensor="red" />
      <MyButton send={sendJsonMessage} sensor="blue" />
      <MyButton send={sendJsonMessage} sensor="green" />
      <MyButton send={sendJsonMessage} sensor="black" />
      <MyButton send={sendJsonMessage} sensor="white" />
      <MyButton send={sendJsonMessage} sensor="yellow" />
    </View>
  );
}
