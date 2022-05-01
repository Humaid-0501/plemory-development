import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

export default function CameraScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageUri, setImageUri] = useState(null);
  const [camera, setCamera] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const [galleryPermission, setGalleryPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      let d = await Location.requestForegroundPermissionsAsync();
      console.log(d.status);
      if (d.status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const last = await Location.getLastKnownPositionAsync();
      if (last) setLocation(last);
      else {
        const current = await Location.getCurrentPositionAsync();
        setLocation(current);
      }

      // let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      // const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
      // console.log(imagePermission.status);
      // setGalleryPermission(imagePermission.status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  console.log(text);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({ base64: true, quality: 0 });
      setImageUri(data.uri);
      props.navigation.navigate("Upload Memory", {
        uri: data.uri,
        base64: data.base64,
        location: location,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Image
              style={styles.cameraButtonStyling}
              source={require("../assets/capturebutton.png")}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    // backgroundColor: 'white',
    flexDirection: "row",
    // marginBottom: 100,
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
    // // top: "95%",
    // flexDirection: "row-reverse",
    // flex: 0.1,
    marginBottom: 120,
    // // width: Dimensions.get("window").width,
    marginLeft: 120,

    // // flexDirection: 'row',
    // // backgroundColor: "white",
    // alignContent: "flex-end",
    // // alignItems: 'flex-end',
    // // textAlign: 'center'
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  cameraButtonStyling: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    width: 100,
    height: 100,
    // borderRadius: 100
  },
});
