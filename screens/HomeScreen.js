import React, { useState, useRef } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";
import WS from "react-native-websocket";
import Lights from "../components/Lights";

import { MonoText } from "../components/StyledText";

export default function HomeScreen() {
  const [uptime, setUptime] = useState("Offline");
  const [btnRed, setBtnRed] = useState("off");
  const [btnBlue, setBtnBlue] = useState("off");
  const [btnGreen, setBtnGreen] = useState("off");
  const [btnWhite, setBtnWhite] = useState("off");
  const [btnBlack, setBtnBlack] = useState("off");
  const [btnYellow, setBtnYellow] = useState("off");
  const wsRef = useRef(null);
  return (
    <View style={styles.container}>
      <WS
        ref={wsRef}
        url="ws://192.168.1.6:3000"
        onOpen={() => {
          console.log("Open!");
          //            this.ws.send("Hello");
        }}
        onMessage={event => {
          const data = JSON.parse(event.data);
          switch (data.event) {
            case "heartbeat":
              const time = Math.floor(data.time / 1000);
              /*setUptime(
                "Uptime : " + Math.floor(time / 60) + "min " + (time % 60) + "s"
              );*/
              break;
            case "button":
              switch (data.sensor) {
                case "red":
                  setBtnRed(data.state);
                  break;
                case "blue":
                  setBtnBlue(data.state);
                  break;
                case "green":
                  setBtnGreen(data.state);
                  break;
                case "black":
                  setBtnBlack(data.state);
                  break;
                case "white":
                  setBtnWhite(data.state);
                  break;
                case "yellow":
                  setBtnYellow(data.state);
                  break;
                default:
                  console.warn("Unknown sensor", data.sensor);
              }
              break;
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
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.getStartedContainer}>
          <View
            style={{
              flex: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}
            >
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "red"
                }}
              >
                <Text style={styles.getStartedText}>Red</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "blue"
                }}
              >
                <Text style={styles.getStartedText}>Blue</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "green"
                }}
              >
                <Text style={styles.getStartedText}>Green</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "black"
                }}
              >
                <Text style={styles.getStartedText}>Black</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "white"
                }}
              >
                <Text style={styles.getStartedText}>White</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "stretch",
                  backgroundColor: "yellow"
                }}
              >
                <Text style={styles.getStartedText}>Yellow</Text>
              </View>
            </View>
            <View
              style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}
            >
              <View style={{ flex: 1, alignSelf: "stretch" }}>
                <Text
                  style={{
                    fontSize: 17,
                    lineHeight: 24,
                    textAlign: "center",
                    backgroundColor: btnRed === "on" ? "green" : "red"
                  }}
                >
                  {btnRed}
                </Text>
              </View>
              <View style={{ flex: 1, alignSelf: "stretch" }}>
                <Text
                  style={{
                    fontSize: 17,
                    lineHeight: 24,
                    textAlign: "center",
                    backgroundColor: btnBlue === "on" ? "green" : "red"
                  }}
                >
                  {btnBlue}
                </Text>
              </View>
              <View style={{ flex: 1, alignSelf: "stretch" }}>
                <Text
                  style={{
                    fontSize: 17,
                    lineHeight: 24,
                    textAlign: "center",
                    backgroundColor: btnGreen === "on" ? "green" : "red"
                  }}
                >
                  {btnGreen}
                </Text>
              </View>
              <View style={{ flex: 1, alignSelf: "stretch" }}>
                <Text
                  style={{
                    fontSize: 17,
                    lineHeight: 24,
                    textAlign: "center",
                    backgroundColor: btnBlack === "on" ? "green" : "red"
                  }}
                >
                  {btnBlack}
                </Text>
              </View>
              <View style={{ flex: 1, alignSelf: "stretch" }}>
                <Text
                  style={{
                    fontSize: 17,
                    lineHeight: 24,
                    textAlign: "center",
                    backgroundColor: btnWhite === "on" ? "green" : "red"
                  }}
                >
                  {btnWhite}
                </Text>
              </View>
              <View style={{ flex: 1, alignSelf: "stretch" }}>
                <Text
                  style={{
                    fontSize: 17,
                    lineHeight: 24,
                    textAlign: "center",
                    backgroundColor: btnYellow === "on" ? "green" : "red"
                  }}
                >
                  {btnYellow}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Lights />
      </ScrollView>
      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>{uptime}</Text>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
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
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
