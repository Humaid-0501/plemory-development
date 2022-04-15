import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";

const MapScreen = () => {
  const { height, width } = Dimensions.get("window");
  const LATITUDE = 37.231994317618074;
  const LONGITUDE = -80.4181124594997;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
  const data = [
    {
      id: "0",
      image: require("../assets/memories/snowball.png"),
      latitude: 37.228280451984524,
      longitude: -80.42063134434545,
      name: "VT Snowball Fight",
      popularity: 70,
      location: "Drillfield",
    },

    {
      id: "1",
      image: require("../assets/memories/halloween.png"),
      latitude: 37.22943979467079,
      longitude: -80.41823015204601,
      name: "Halloween Party",
      popularity: 50,
      location: "Squires Student Center",
    },

    {
      id: "2",
      image: require("../assets/memories/flag.png"),
      latitude: 37.23037304294517,
      longitude: -80.41939130474975,
      name: "National Day Flag Raising",
      popularity: 45,
      location: "Lane Hall",
    },

    {
      id: "3",
      image: require("../assets/memories/graduation.png"),
      latitude: 37.22948529411306,
      longitude: -80.42465473005228,
      name: "Graduation Day",
      popularity: 55,
      location: "Johnston Student Center",
    },

    {
      id: "4",
      image: require("../assets/memories/national.png"),
      latitude: 37.22858665038255,
      longitude: -80.42314988658745,
      name: "National Day Flag Raising",
      popularity: 40,
      location: "Burruss Hall",
    },
  ];
  return (
    <View>
      <MapView
        zoomEnabled={true}
        provider={PROVIDER_GOOGLE}
        style={{ width: "100%", height: "100%" }}
        initialRegion={{
          latitude: 37.231994317618074,
          longitude: -80.4181124594997,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {data.map((memory, i) => (
          <Marker
            style={{
              width: memory.popularity,
              height: memory.popularity,
            }}
            key={i}
            title={memory.name}
            description={memory.location}
            coordinate={{
              latitude: memory.latitude,
              longitude: memory.longitude,
            }}
          >
            {/* <TouchableOpacity> */}
            <Image
              source={memory.image}
              style={{
                width: memory.popularity,
                height: memory.popularity,
                resizeMode: "contain",
              }}
            />
            {/* </TouchableOpacity> */}
          </Marker>
        ))}
      </MapView>
      <View style={styles.container}>
        <FontAwesome name="search" size={25} />
        <TextInput style={styles.input} placeholder="Search Memories" />
      </View>
    </View>
  );
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
    borderRadius: 40,
  },
  input: {
    fontSize: 20,
    marginLeft: 20,
    width: "85%",
  },
});
