import { useLinking } from "@react-navigation/native";
import { Linking } from "expo";

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl("/universe/")],
    config: {
      Root: {
        path: "/universe/",
        screens: {
          Home: "",
          Control: "",
          Links: "",
          Settings: ""
        }
      }
    }
  });
}
