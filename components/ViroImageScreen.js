import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroImage,
} from "@viro-community/react-viro";
import React from "react";
import data from "../assets/data/memories";
// import {StyleSheet} from 'react-native';
import { handleTrackingUpdated } from "../utils/handleTrackingUpdated";

import { Text, View, StyleSheet, SafeAreaView, Button } from "react-native";
// import data from "../assets/data/memories.json";
import MemoryContext from "./contexts/MemoryContext";

import Slider from "@react-native-community/slider";

// const Coordinates = (props) =>{
//     return(
//       <ViroARScene onTrackingUpdated={handleTrackingUpdated}>
//       {props.memories.map(memories,i) => (
//           <ViroImage
//           source={{uri: memories.image}}
//           width={memories.ARsize}
//           height={memories.ARsize}
//           position={memories.popularity[props.currentMonth]}
//         />
//       )}
//       </ViroARScene>
//     );
// }

class HelloWorldSceneAR extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    // console.log(this.props.data.memories);
  }

  componentDidUpdate() {
    console.log(this.props.arSceneNavigator.viroAppProps);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={handleTrackingUpdated} key={1}>
        {this.props &&
          this.props.arSceneNavigator &&
          this.props.arSceneNavigator.viroAppProps &&
          this.props.arSceneNavigator.viroAppProps.memories &&
          this.props.arSceneNavigator.viroAppProps.memories.map((memory, i) => (
            <ViroImage
              key={memory.id}
              source={{ uri: memory.image }}
              width={memory.ARsize}
              height={memory.ARsize}
              position={
                memory.ARpopularity[
                  this.props.arSceneNavigator.viroAppProps.currentMonth
                ]
              }
              rotation={memory.ARrotation}
              // rotationPivot={[6, 6, 1]}
            />
          ))}
        {/* <ViroImage
          source={require("../assets/memories/snowball.png")}
          width={0.5}
          height={0.5}
          position={[1, 1, -2]}
        />

        <ViroImage
          source={require("../assets/memories/flag.png")}
          width={0.5}
          height={0.5}
          position={[0, 0, -2.5]}
        />

        <ViroImage
          source={require("../assets/memories/graduation.png")}
          width={0.25}
          height={0.25}
          position={[2, 0.5, -3]}
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
          position={[-3.5, 1, -3]}
        /> */}
      </ViroARScene>
    );
  }
}

export default class ViroImageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: 0,
      memories: data,
    };
  }
  sliderChanged = (e) => {
    this.setState({
      currentMonth: e,
    });
    console.log("Printing e:" + e);
  };
  render() {
    return (
      <View style={styles.f1}>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            step={1}
            minimumValue={0}
            maximumValue={5}
            onSlidingComplete={this.sliderChanged}
            // vertical
            // minimumTrackTintColor="bl"
            // maximumTrackTintColor="#000000"
          />
        </View>
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{
            scene: HelloWorldSceneAR,
            // passProps: { data: this.state },
          }}
          viroAppProps={this.state}
          style={styles.f1}
          data={this.state}
        />
        {/* <ViroARScene onTrackingUpdated={handleTrackingUpdated}>
            
          </ViroARScene> */}
        {/* </ViroARSceneNavigator> */}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
  sliderContainer: {
    position: "absolute",
    top: "50%",
    left: "60%",
    width: 200,
    height: 40,
    right: 0,
    transform: [{ rotate: "270deg" }],
    zIndex: 100,
    // display: "none",
  },
});
