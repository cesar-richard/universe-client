import React, { useState, useRef } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";
import Lights from "../components/Lights";
import StatusBar from "../components/StatusBar";
import Buttons from "../components/Buttons";
import useWebSocket from "react-use-websocket";
import SocketConfig from "../constants/SocketsConfig";
import { MonoText } from "../components/StyledText";

export default function HomeScreen() {
  const [btnRed, setBtnRed] = useState("off");
  const [btnBlue, setBtnBlue] = useState("off");
  const [btnGreen, setBtnGreen] = useState("off");
  const [btnWhite, setBtnWhite] = useState("off");
  const [btnBlack, setBtnBlack] = useState("off");
  const [btnYellow, setBtnYellow] = useState("off");
  const {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
    getWebSocket
  } = useWebSocket(SocketConfig.url, {
    onOpen: () => console.log("opened HomeScreen"),
    share: () => true,
    shouldReconnect: closeEvent => true,
    onError: e => console.error,
    onClose: e => console.log,
    onMessage: event => {
      const data = JSON.parse(event.data);
      switch (data.event) {
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
              console.warn(`Unknown button : ${data.sensor}`);
          }
        default:
          break;
      }
    }
  });
  return (
    <View style={styles.container}>
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
            <Buttons />
          </View>
        </View>
        <Lights />
      </ScrollView>
      <StatusBar />
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

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
