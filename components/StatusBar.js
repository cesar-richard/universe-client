import React, { useRef, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import WS from "react-native-websocket";
export default function() {
  const [uptimes, setUptimes] = useState([]);
  const wsRef = useRef(null);

  return (
    <View style={styles.tabBarInfoContainer}>
      <WS
        ref={wsRef}
        url="ws://192.168.1.29:3000"
        onOpen={() => {}}
        onMessage={event => {
          const data = JSON.parse(event.data);
          switch (data.event) {
            case "heartbeat":
              const time = Math.floor(data.time / 1000);
              setUptimes([
                {
                  name: data.macAddress,
                  time: Math.floor(time / 60) + "min " + (time % 60) + "s"
                },
                ...uptimes.filter(({ name }) => {
                  return name !== data.macAddress;
                })
              ]);
              break;
            case "button":
            case "ask":
            case "answer":
              break;
            default:
              console.warn("Unknown event", data.event);
          }
        }}
        onError={console.log}
        onClose={console.log}
        reconnect
      />
      {uptimes.map(e => (
        <Text style={styles.tabBarInfoText} key={e.name}>
          {e.name}:{e.time}
        </Text>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  }
});
