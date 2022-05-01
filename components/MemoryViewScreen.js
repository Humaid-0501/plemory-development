import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import MemoryContext from "./contexts/MemoryContext";

class MemoryViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.moveup = new Animated.Value(0);
    // this.state.delay = 0

    this.state = {
      memory: this.props.route.params.memory,
      delay: 0,
    };
  }

  // startShake = () => {
  //     Animated.sequence([
  //       Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
  //       Animated.timing(this.shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
  //       Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
  //       Animated.timing(this.shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
  //     ]).start();
  //  }

  handleSuperThrowAnimation = () => {
    // clearTimeout(this.state.delay);

    // A loop is needed for continuous animation
    Animated.loop(
      //   // Animation consists of a sequence of steps
      Animated.sequence([
        // start rotation in one direction (only half the time is needed)
        Animated.timing(this.animatedValue, {
          toValue: 2.0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // rotate in other direction, to minimum value (= twice the duration of above)
        Animated.timing(this.animatedValue, {
          toValue: -2.0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // return to begin position
        Animated.timing(this.animatedValue, {
          toValue: 2.0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // rotate in other direction, to minimum value (= twice the duration of above)
        Animated.timing(this.animatedValue, {
          toValue: -2.0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // return to begin position
        Animated.timing(this.animatedValue, {
          toValue: 0.0,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }),

        Animated.timing(this.moveup, {
          toValue: -Dimensions.get("window").height,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(this.moveup, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(this.animatedValue, {
          toValue: 0.0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: 1,
      }
    ).start(() => {
      this.props.route.params.updateMemory(this.state.memory.id, "super_throw");
      // this.props.navigation.goBack()
    });
  };

  handleThrowAnimation = () => {
    // A loop is needed for continuous animation
    Animated.loop(
      //   // Animation consists of a sequence of steps
      Animated.sequence([
        Animated.timing(this.moveup, {
          toValue: -Dimensions.get("window").height,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(this.moveup, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: 1,
      }
    ).start(() => {
      this.props.route.params.updateMemory(this.state.memory.id, "throw");
      // this.props.navigation.goBack()
    });
  };

  throwMemory = () => {
    this.handleThrowAnimation();
  };
  superThrowMemory = () => {
    this.handleSuperThrowAnimation();
  };
  render() {
    return (
      <View style={styles.FullView}>
        <TouchableHighlight>
          <Animated.Image
            source={{ uri: this.state.memory.image }}
            // resizeMode='contain'
            style={{
              ...styles.Image,
              transform: [
                {
                  rotate: this.animatedValue.interpolate({
                    inputRange: [-1, 1],
                    outputRange: ["-0.1rad", "0.1rad"],
                  }),
                },
                {
                  translateY: this.moveup,
                },
              ],
            }}
          />
          {/* <Animated.View style={{ transform: [{translateX: this.shakeAnimation}] }}>  
                        <Image
                            source={{uri: "https://picsum.photos/200/200"}}
                            style={styles.Image}
                        />
                    </Animated.View> */}
        </TouchableHighlight>
        <View style={styles.Buttons}>
          <TouchableHighlight
            style={{
              borderColor: "black",
              borderRadius: 40,
              borderWidth: 2,
              padding: 10,
              backgroundColor: "white",
            }}
          >
            <Entypo
              name="cloud"
              size={50}
              color="black"
              onPress={this.throwMemory}
            />
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              borderColor: "black",
              borderRadius: 40,
              borderWidth: 2,
              padding: 10,
              backgroundColor: "white",
            }}
          >
            <Entypo
              name="thunder-cloud"
              size={50}
              color="black"
              onPress={this.superThrowMemory}
            />
          </TouchableHighlight>

          {/* <Button title="Throw" onPress={this.throwMemory}/>
                    <Button title="Super Throw" onPress={this.superThrowMemory}/> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  FullView: {
    backgroundColor: "black",
  },
  Image: {
    // flex: 1,
    width: "100%",
    height: "100%",
    // borderRadius: 0,
    // resizeMode: "center",
  },
  Buttons: {
    flexDirection: "row",
    width: "100%",
    alignContent: "space-between",
    color: "white",
    position: "absolute",
    top: "80%",
    justifyContent: "space-between",
    padding: 30,
    fontSize: 30,
    // borderColor: "blue"
    // left: 20,
    // bottom: 20
  },
});

MemoryViewScreen.contextType = MemoryContext;

export default MemoryViewScreen;
