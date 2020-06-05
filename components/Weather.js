import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import SocketConfig from "../constants/SocketsConfig";
import { useSocketIO } from "react-use-websocket";

export default function MyButton(props) {
  const [temperature, setTemperature] = useState("N/C");
  const [humidity, setHumidity] = useState("N/C");
  const [heatIndex, setHeatIndex] = useState("N/C");
  const [dewPoint, setDewPoint] = useState("N/C");
  const [comfortStatus, setComfortStatus] = useState("N/C");

  const { sendJsonMessage, readyState } = useSocketIO(SocketConfig.url, {
    onOpen: () => console.log("opened weather"),
    share: () => true,
    shouldReconnect: closeEvent => true,
    onError: e => console.error,
    onClose: e => console.log,
    onMessage: e => {
      const { event, sensor, state } = JSON.parse(e.data);
      if ("weather" === event) {
        switch (sensor) {
          case "temperature":
            setTemperature(state);
            break;
          case "humidity":
            setHumidity(state);
            break;
          case "heatIndex":
            setHeatIndex(state);
            break;
          case "dewPoint":
            setDewPoint(state);
            break;
          case "comfortStatus":
            setComfortStatus(state);
            break;
        }
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
      <View
        style={{
          flex: 1,
          alignSelf: "stretch"
        }}
      >
        <Text style={{ backgroundColor: props.color, textAlign: "center" }}>
          Temperature
        </Text>
        <Text
          style={{
            fontSize: 17,
            lineHeight: 24,
            textAlign: "center"
          }}
        >
          {temperature}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignSelf: "stretch"
        }}
      >
        <Text style={{ backgroundColor: props.color, textAlign: "center" }}>
          Humidity
        </Text>
        <Text
          style={{
            fontSize: 17,
            lineHeight: 24,
            textAlign: "center"
          }}
        >
          {humidity}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignSelf: "stretch"
        }}
      >
        <Text style={{ backgroundColor: props.color, textAlign: "center" }}>
          HeatIndex
        </Text>
        <Text
          style={{
            fontSize: 17,
            lineHeight: 24,
            textAlign: "center"
          }}
        >
          {heatIndex}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignSelf: "stretch"
        }}
      >
        <Text style={{ backgroundColor: props.color, textAlign: "center" }}>
          Dew Point
        </Text>
        <Text
          style={{
            fontSize: 17,
            lineHeight: 24,
            textAlign: "center"
          }}
        >
          {dewPoint}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignSelf: "stretch"
        }}
      >
        <Text style={{ backgroundColor: props.color, textAlign: "center" }}>
          Comfort Status
        </Text>
        <Text
          style={{
            fontSize: 17,
            lineHeight: 24,
            textAlign: "center"
          }}
        >
          {comfortStatus}
        </Text>
      </View>
    </View>
  );
}
