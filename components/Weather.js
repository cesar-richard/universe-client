import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import SocketConfig from "../constants/SocketsConfig";
import { useSocketIO } from "react-use-websocket";

export default function Weather(props) {
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
    <View style={{ flex: 1, paddingTop: "1em", flexDirection: "row" }}>
      <View
        style={{
          alignItems: "center",
          flex: 1
        }}
      >
        <Text>Temperature</Text>
        <Text>{temperature}°C</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flex: 1
        }}
      >
        <Text>Humidity</Text>
        <Text>{humidity}%</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flex: 1
        }}
      >
        <Text>HeatIndex</Text>
        <Text>{heatIndex}</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flex: 1
        }}
      >
        <Text>Dew Point</Text>
        <Text>{dewPoint}</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flex: 1
        }}
      >
        <Text>Comfort Status</Text>
        <Text>{comfortStatus}</Text>
      </View>
    </View>
  );
}
