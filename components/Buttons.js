import React, { useState, useEffect, useRef } from "react";
import { View, Button } from "react-native";

export default function Buttons(props) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    let s = new WebSocket("ws://192.168.1.6:3000");
    s.onopen = () => {
      s.send(
        JSON.stringify({ event: "ask", sensor: "universe", state: "lights" })
      );
    };
    s.onclose = () => {
      console.log("disconnected");
      //socket = new WebSocket("ws://192.168.1.6:3000");
    };
    setSocket(s);
  }, []);
  return (
    <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <Button
          title="Press me"
          onPress={() => {
            socket.send(
              JSON.stringify({
                event: "button",
                sensor: "red",
                state: "on",
                time: Date.now()
              })
            );
            socket.send(
              JSON.stringify({
                event: "button",
                sensor: "red",
                state: "off",
                time: Date.now()
              })
            );
          }}
        />
      </View>
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <Button
          title="Press me"
          onPress={() => {
            socket.send(
              JSON.stringify({
                event: "button",
                sensor: "blue",
                state: "on",
                time: Date.now()
              })
            );
            socket.send(
              JSON.stringify({
                event: "button",
                sensor: "blue",
                state: "off",
                time: Date.now()
              })
            );
          }}
        />
      </View>
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <Button
          title="Press me"
          onPress={() => {
            socket.send(
              JSON.stringify({
                event: "button",
                sensor: "green",
                state: "on",
                time: Date.now()
              })
            );
            socket.send(
              JSON.stringify({
                event: "button",
                sensor: "green",
                state: "off",
                time: Date.now()
              })
            );
          }}
        />
      </View>
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <Button
          title="Press me"
          onPress={() => {
            socket.send(
              JSON.stringify({
                event: "button",
                sensor: "black",
                state: "on",
                time: Date.now()
              })
            );
            socket.send(
              JSON.stringify({
                event: "button",
                sensor: "black",
                state: "off",
                time: Date.now()
              })
            );
          }}
        />
      </View>
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <Button
          title="Press me"
          onPress={() => {
            socket.send(
              JSON.stringify({
                event: "button",
                sensor: "white",
                state: "on",
                time: Date.now()
              })
            );
            socket.send(
              JSON.stringify({
                event: "button",
                sensor: "white",
                state: "off",
                time: Date.now()
              })
            );
          }}
        />
      </View>
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <Button
          title="Press me"
          onPress={() => {
            socket.send(
              JSON.stringify({
                event: "button",
                sensor: "yellow",
                state: "on",
                time: Date.now()
              })
            );
            socket.send(
              JSON.stringify({
                event: "button",
                sensor: "yellow",
                state: "off",
                time: Date.now()
              })
            );
          }}
        />
      </View>
    </View>
  );
}
