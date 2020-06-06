import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { RectButton, ScrollView, Text } from "react-native-gesture-handler";

export default function AboutScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <OptionButton
        icon="md-speedometer"
        label="See the clients GitHub repository"
        onPress={() =>
          WebBrowser.openBrowserAsync(
            "https://github.com/cesar-richard/universe-client"
          )
        }
      />
      <OptionButton
        icon="md-cog"
        label="See the server GitHub repository"
        onPress={() =>
          WebBrowser.openBrowserAsync(
            "https://github.com/cesar-richard/universe"
          )
        }
      />
      <OptionButton
        icon="md-bug"
        label="See the MCU nodes GitHub repository"
        onPress={() =>
          WebBrowser.openBrowserAsync(
            "https://github.com/cesar-richard/universe-mcu"
          )
        }
      />
    </ScrollView>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton
      style={[styles.option, isLastOption && styles.lastOption]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  contentContainer: {
    paddingTop: 15
  },
  optionIconContainer: {
    marginRight: 12
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed"
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1
  }
});
