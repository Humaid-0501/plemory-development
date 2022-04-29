import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import MemoryContext from './contexts/MemoryContext';
import Slider from '@react-native-community/slider';



class MapScreen extends React.Component {
  constructor(props){
    super(props)
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
      memories : this.props.route.params.memories
    }
  }

  componentDidMount(){
    const memories = this.props.route.params.memories
    this.setState({
      ...this,
      memories : memories 
    })
  }
  
  // const data2 = [
  //   {
  //     id: "0",
  //     image: require("../assets/memories/snowball.png"),
  //     latitude: 37.228280451984524,
  //     longitude: -80.42063134434545,
  //     name: "VT Snowball Fight",
  //     popularity: 70,
  //     location: "Drillfield",
  //   },

  //   {
  //     id: "1",
  //     image: require("../assets/memories/halloween.png"),
  //     latitude: 37.22943979467079,
  //     longitude: -80.41823015204601,
  //     name: "Halloween Party",
  //     popularity: 50,
  //     location: "Squires Student Center",
  //   },

  //   {
  //     id: "2",
  //     image: require("../assets/memories/flag.png"),
  //     latitude: 37.23037304294517,
  //     longitude: -80.41939130474975,
  //     name: "National Day Flag Raising",
  //     popularity: 45,
  //     location: "Lane Hall",
  //   },

  //   {
  //     id: "3",
  //     image: require("../assets/memories/graduation.png"),
  //     latitude: 37.22948529411306,
  //     longitude: -80.42465473005228,
  //     name: "Graduation Day",
  //     popularity: 55,
  //     location: "Johnston Student Center",
  //   },

  //   {
  //     id: "4",
  //     image: require("../assets/memories/national.png"),
  //     latitude: 37.22858665038255,
  //     longitude: -80.42314988658745,
  //     name: "National Day Flag Raising",
  //     popularity: 40,
  //     location: "Burruss Hall",
  //   },
  // ];
  render(){
    return (
      <View>
        <MapView
          zoomEnabled={true}
          provider={PROVIDER_DEFAULT}
          style={{ width: "100%", height: "96%" }}
          initialRegion={{
            latitude: 37.231994317618074,
            longitude: -80.4181124594997,
            latitudeDelta: this.state.LATITUDE_DELTA,
            longitudeDelta: this.state.LONGITUDE_DELTA,
          }}
        >
          {this.state.memories && this.state.memories.map((memory, i) => (
            <View key={this.state.memories.id} onPress={() => this.props.navigation.navigate("Related Memories", {memories : this.state.memories, memory: memory, updateMemory: this.props.route.params.updateMemory})}>
              <Marker
                style={{
                  width: memory.popularity,
                  height: memory.popularity,
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
                    // key={this.state.memories.id}
                    source={{uri: memory.image}}
                    style={{
                      width: memory.popularity,
                      height: memory.popularity,
                      resizeMode: "contain",
                      borderRadius: 20
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
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          vertical = {true}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
    );
  }
  
};

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
  slider:{
    position: "absolute",
    top: "97%",
  }
});

MapScreen.contextType = MemoryContext;