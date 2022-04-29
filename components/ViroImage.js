import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroImage,
} from "@viro-community/react-viro";
import React from "react";
// import {StyleSheet} from 'react-native';
import { handleTrackingUpdated } from "../utils/handleTrackingUpdated";

import { Text, View, StyleSheet, SafeAreaView, Button } from "react-native";
import data from "../assets/data/memories.json";
import MemoryContext from "./contexts/MemoryContext";

const HelloWorldSceneAR = () => {
  return (
    <ViroARScene onTrackingUpdated={handleTrackingUpdated}>
      <ViroImage
        source={require("../assets/memories/snowball.png")}
        width={0.5}
        height={0.5}
        position={[1, 1, -2]}
      />

      <ViroImage
        source={require("../assets/memories/flag.png")}
        width={0.5}
        height={0.5}
        position={[0, 0, -2]}
      />

      <ViroImage
        source={require("../assets/memories/graduation.png")}
        width={0.25}
        height={0.25}
        position={[2, 0.5, -2]}
      />

      <ViroImage
        source={require("../assets/memories/national.png")}
        width={0.2}
        height={0.2}
        position={[-1, 0.25, -2]}
      />

      <ViroImage
        source={require("../assets/memories/halloween.png")}
        width={0.25}
        height={0.25}
        position={[-3.5, 1, -2]}
      />
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
