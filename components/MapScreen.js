import * as React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import MemoryContext from "./contexts/MemoryContext";
import Slider from "@react-native-community/slider";
// import CameraComponent from "./CameraScreen"

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    const { height, width } = Dimensions.get("window");
    const LATITUDE = 37.231994317618074;
    const LONGITUDE = -80.4181124594997;
    const LATITUDE_DELTA = 0.01;
    const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
    this.state = {
      LATITUDE,
      LONGITUDE,
      LATITUDE_DELTA,
      LONGITUDE_DELTA,
      memories: this.props.route.params.memories,
      currentMonth: 0,
    };
  }

  componentDidMount() {
    const memories = this.props.route.params.memories;
    this.setState({
      ...this,
      memories: memories,
    });
  }

  sliderChanged = (e) => {
    this.setState({
      currentMonth: e,
    });
  };
  render() {
    return (
      <View key={Date.now()}>
        <MapView
          zoomEnabled={true}
          provider={PROVIDER_DEFAULT}
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: 37.231994317618074,
            longitude: -80.4181124594997,
            latitudeDelta: this.state.LATITUDE_DELTA,
            longitudeDelta: this.state.LONGITUDE_DELTA,
          }}
          key={Date.now()}
        >
          {this.state &&
            this.state.memories &&
            this.state.memories.map((memory, i) => (
              <View
                key={this.state.memories.id}
                onPress={() =>
                  this.props.navigation.navigate("Related Memories", {
                    memories: this.state.memories,
                    memory: memory,
                    updateMemory: this.props.route.params.updateMemory,
                  })
                }
              >
                <Marker
                  style={{
                    width: memory.popularity[this.state.currentMonth],
                    height: memory.popularity[this.state.currentMonth],
                  }}
                  key={this.state.memories.id}
                  title={memory.name}
                  description={memory.location}
                  coordinate={{
                    latitude: memory.latitude,
                    longitude: memory.longitude,
                  }}
                >
                  {/* <TouchableOpacity onPress={() => this.props.navigation.navigate("Related Memories", {memory: memory})}> */}
                  <Image
                    key={this.state.memories.id}
                    source={{ uri: memory.image }}
                    style={{
                      width: memory.popularity[this.state.currentMonth],
                      height: memory.popularity[this.state.currentMonth],
                      resizeMode: "contain",
                      borderRadius: 20,
                    }}
                  />
                  {/* </TouchableOpacity> */}
                </Marker>
              </View>
            ))}
        </MapView>
        <View style={styles.container}>
          <FontAwesome name="search" size={25} />
          <TextInput style={styles.input} placeholder="Search Memories" />
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            // style={styles.slider}
            step={1}
            minimumValue={0}
            maximumValue={5}
            onSlidingComplete={this.sliderChanged}
            // vertical
            // minimumTrackTintColor="bl"
            // maximumTrackTintColor="#000000"
          />
        </View>
        <View style={styles.cameraContainer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Camera", {
                navigation: this.props.navigation,
              })
            }
          >
            <Image
              style={styles.cameraButtonStyling}
              source={require("../assets/capturebutton.png")}
            />
          </TouchableOpacity>
          {/* <CameraComponent/> */}
        </View>
      </View>
    );
  }
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    marginTop: 40,
    marginHorizontal: 25,
    flexDirection: "row",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    elevation: 10,
    shadowOpacity: 1,
    padding: 15,
    borderRadius: 20,
  },
  input: {
    fontSize: 20,
    marginLeft: 20,
    width: "85%",
  },
  sliderContainer: {
    position: "absolute",
    top: "60%",
    width: 300,
    height: 100,
    left: "60%",
    marginRight: 0,
    transform: [{ rotate: "270deg" }],
  },
  cameraButtonStyling: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  cameraContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "80%",
    left: "40%",
    // borderRadius: 100
  },
});

MapScreen.contextType = MemoryContext;
