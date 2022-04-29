import React, { Component, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableHighlight,
  Image,
} from "react-native";
import data from "../assets/data/memories";
import MemoryContext from "./contexts/MemoryContext";
// const RNFS = require('react-native-fs');
import * as FileSystem from "expo-file-system";
import ViroImage from "./ViroImage";

class LandingScreen extends Component {
  constructor(props) {
    super(props);
    // console.log(this.context)
    this.state = {
      memories: data,
    };
  }

  updateMemory = async (id, action) => {
    let memories = this.state.memories;
    for (let i = 0; i < memories.length; i++) {
      if (memories[i].id == id) {
        if (action == "throw") {
          memories[i].popularity += 10;
        } else {
          memories[i].popularity += 30;
        }
      }
    }
    this.setState({
      memories,
    });
    // console.log(memories)
    // fs.writeFile('../assets/data/memories".json', JSON.stringify(memories), (err) => {
    //     if (err) console.log('Error writing file:', err);
    // })
    // await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'memories.json', JSON.stringify(memories), { encoding: FileSystem.EncodingType.UTF8 });
    // , () =>{
    //     this.setState({
    //         memories: memories
    //     })
    // });
    // RNFS.writeFile('../assets/data/memories".json', JSON.stringify(memories), 'utf8')
    // .then((success) => {
    //     console.log('FILE WRITTEN!');
    //     this.setState({
    //         memories: memories
    //     })
    // })
    // .catch((err) => {
    //     console.log(err.message);
    // });
  };

  fetchData = () => {
    // data = data.map(d => d.image = require(d.imageUrl))
    this.setState({ memories: data });
    // console.log(this.state.memories)
  };

  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.arview}>
          <RenderScene />
        </View>
        <View style={styles.map}>
          <TouchableHighlight
            underlayColor="none"
            onPress={() =>
              this.props.navigation.navigate("Map View", {
                memories: this.state.memories,
                updateMemory: this.updateMemory,
              })
            }
          >
            <View>
              {/* <FontAwesome5 name="map-marked-alt" size={54} color="black" /> */}
              <Image
                source={require("../assets/map.png")}
                fadeDuration={5}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 10,
                  borderColor: "black",
                  borderWidth: 1,
                }}
              />
              {/* <Ionicons name="md-checkmark-circle" size={32} color="green" /> */}
              {/* <Text>Map View</Text> */}
            </View>
          </TouchableHighlight>
          {/* <Button title="Map View" onPress={() => this.props.navigation.navigate("Map View", {memories: this.state.memories, updateMemory: this.updateMemory}) } /> */}
        </View>
      </SafeAreaView>
    );
  }
}

// const handleClickGitHubLink = (id: string) => {
//   Linking.openURL(`https://github.com/ViroCommunity/viro/issues/${id}`);
// };

// const handleClickDiscordLink = (link: any) => {
//   Linking.openURL(link);
// };

const viro_tests = [
  // "Viro360Image",
  // "Viro360Video",
  // "Viro3DObject",
  // "ViroAnimatedImage",
  // Is this not working due to GVR removed? what should this look like?
  // "ViroAmbientLight",
  // "ViroARImageMarker",
  // TODO: Couldn't get a good scan of an object marker to work with AR Scanner
  // https://developer.apple.com/documentation/arkit/content_anchors/scanning_and_detecting_3d_objects?preferredLanguage=occ
  // 'ViroARObjectMarker',
  // "ViroARPlane",
  // "ViroARPlaneSelector",
  // "ViroBox",
  // "ViroButton",
  // TODO: Need VR camera to test this
  // "ViroController",
  // TODO: Need VR camera to test this
  // "ViroDirectionalLight",
  // "ViroFlexView",
  // "ViroGeometry",
  // "ViroLightingEnvironment",
  "ViroImage",
  // TODO: Viro materials doesn't seem to be working.
  // The current lead is that metro is not resolving an asset embedded in the material.
  // I think what is happening is the asset resolver for the .obj files is using the
  // absolute path on my computer, and not the resolved path in the bundle.
  // "ViroMaterials",
  // TODO: Didn't see anything, but didn't crash. Might need VR to test this.
  // "ViroMaterialVideo",
  // TODO: Didn't see anything, but didn't crash. Might need VR to test this.
  // "ViroOmniLight",
  // "ViroOrbitCamera",
  // "ViroParticleEmitter",
  // "ViroPolygon",
  // "ViroPolyline",
  // "ViroPortal",
  // "ViroQuad",
  // "ViroSkyBox",
  // TODO: Sound doesn't seem to be working.
  // "ViroSound",
  // TODO: Crash with Unrecognized selector sent to instance
  // "ViroSoundField",
  // TODO: Crash with Unrecognized selector sent to instance
  // "ViroSpatialSound",
  // "ViroSphere",
  // "ViroSpinner",
  // TODO: Didn't see anything, but didn't crash. Might need VR to test this.
  // "ViroSpotLight",
  // "ViroText",
  // TODO: Crash with Unrecognized selector sent to instance
  // "ViroVideo",
];

const RenderScene = () => {
  //   switch (view) {
  // case "Viro360Image":
  //   return <Viro360Image />;
  // case "Viro360Video":
  //   return <Viro360Video />;
  // case "Viro3DObject":
  //   return <Viro3DObject />;
  // case "ViroAnimatedImage":
  //   return <ViroAnimatedImage />;
  // case "ViroAmbientLight":
  //   return <ViroAmbientLight />;
  // case "ViroARImageMarker":
  //   return <ViroARImageMarker />;

  // case 'ViroARObjectMarker':
  //   return <ViroARObjectMarker />;

  // case "ViroARPlane":
  //   return <ViroARPlane />;
  // case "ViroARPlaneSelector":
  //   return <ViroARPlaneSelector />;
  // case "ViroBox":
  //   return <ViroBox />;
  // case "ViroButton":
  //   return <ViroButton />;
  // case "ViroController":
  //   return <ViroController />;
  // case "ViroDirectionalLight":
  //   return <ViroDirectionalLight />;
  // case "ViroFlexView":
  //   return <ViroFlexView />;
  // case "ViroGeometry":
  //   return <ViroGeometry />;
  // case "ViroLightingEnvironment":
  //   return <ViroLightingEnvironment />;

  // case "ViroImage":
  return <ViroImage />;

  // case "ViroMaterials":
  //   return <ViroMaterials />;
  // case "ViroMaterialVideo":
  //   return <ViroMaterialVideo />;
  // case "ViroOmniLight":
  //   return <ViroOmniLight />;
  // case "ViroOrbitCamera":
  //   return <ViroOrbitCamera />;
  // case "ViroParticleEmitter":
  //   return <ViroParticleEmitter />;
  // case "ViroPolygon":
  //   return <ViroPolygon />;
  // case "ViroPolyline":
  //   return <ViroPolyline />;
  // case "ViroPortal":
  //   return <ViroPortal />;
  // case "ViroQuad":
  //   return <ViroQuad />;
  // case "ViroSkyBox":
  //   return <ViroSkyBox />;
  // case "ViroSound":
  //   return <ViroSound />;
  // case "ViroSoundField":
  //   return <ViroSoundField />;
  // case "ViroSpatialSound":
  //   return <ViroSpatialSound />;
  // case "ViroSphere":
  //   return <ViroSphere />;
  // case "ViroSpinner":
  //   return <ViroSpinner />;
  // case "ViroSpotLight":
  //   return <ViroSpotLight />;
  // case "ViroText":
  //   return <ViroText />;
  // case "ViroVideo":
  //   return <ViroVideo />;

  // Demos
  // case "AR":
  //   return <AR />;

  // case "VR":
  //   return <VR />;

  // Discord Issues
  // case "OGSnowE01292022":
  //   return <OGSnowE01292022 />;
  // case "CheethKeeth_01252022":
  //   return <CheethKeeth01252022 />;
  // case "CheethKeeth_12202021":
  //   return <CheethKeeth12202021 />;
  // case "VV_12202021":
  //   return <VV12202021 />;

  // GitHub Issues
  // case "24":
  //   return <Issue24 />;
  // case "31":
  //   return <Issue31 />;
  // case "41":
  //   return <Issue41 />;
  // case "58":
  //   return <Issue58 />;
  // case "62":
  //   return <Issue62 />;
  // case "74":
  //   return <Issue74 />;
  // case "75":
  //   return <Issue75 />;
  // case "75":
  //   return <Issue75 />;
  // default:
  //   return (
  //     <ScrollView style={styles.home} contentContainerStyle={styles.content}>
  //       {/* <View style={styles.header}>
  //           <Text style={styles.headerText}>Viro Test App</Text>
  //           <Text>
  //             Viro Version:{" "}
  //             {(
  //               packageJson.dependencies[
  //                 "@viro-community/react-viro"
  //               ] as string
  //             ).replace("^", "")}
  //           </Text>
  //         </View>
  //         <Pressable
  //           onPress={() => Linking.openURL("https://github.com/NS-BOBBY-C")}
  //           style={styles.bobbyButton}
  //         >
  //           <Text style={styles.buttonText}>Built by NS-BOBBY-C</Text>
  //         </Pressable> */}
  //       {/* General Demos */}
  //       <View style={styles.header}>
  //         <Text style={styles.subheaderText}>
  //           Plemory: Creating Places with Memories
  //         </Text>
  //       </View>
  //       {viro_tests.map((demo) => (
  //         <Pressable
  //           key={demo}
  //           onPress={() => setView(demo)}
  //           style={styles.viroTestButton}
  //         >
  //           <Text style={styles.buttonText}>AR Veiw</Text>
  //         </Pressable>
  //       ))}

  //       {/* General Demos */}
  //       {/* <View style={styles.header}>
  //           <Text style={styles.subheaderText}>General Usage</Text>
  //         </View>
  //         {demos.map((demo) => (
  //           <Pressable
  //             key={demo.id}
  //             onPress={() => setView(demo.id)}
  //             style={styles.button}
  //           >
  //             <Text style={styles.buttonText}>{demo.title}</Text>
  //           </Pressable>
  //         ))} */}

  //       {/* Issues from GitHub */}
  //       {/* <View style={styles.header}>
  //           <Text style={styles.subheaderText}>GitHub Issues</Text>
  //         </View>
  //         {github_issues.map((issue) => (
  //           <View key={issue} style={styles.issue}>
  //             <Pressable onPress={() => setView(issue)} style={styles.button}>
  //               <Text style={styles.buttonText}>Issue #{issue}</Text>
  //             </Pressable>
  //             <Pressable
  //               onPress={() => handleClickGitHubLink(issue)}
  //               style={styles.link}
  //             >
  //               <Text style={styles.buttonText}>GitHub Link</Text>
  //             </Pressable>
  //           </View>
  //         ))} */}

  //       {/* Discord Issues */}
  //       {/* <View style={styles.header}>
  //           <Text style={styles.subheaderText}>Discord Issues</Text>
  //         </View>
  //         {discord_issues.map((issue) => (
  //           <View key={issue.id} style={styles.issue}>
  //             <Pressable
  //               onPress={() => setView(issue.id)}
  //               style={styles.button}
  //             >
  //               <Text style={styles.buttonText}>{issue.title}</Text>
  //             </Pressable>
  //             <Pressable
  //               onPress={() => handleClickDiscordLink(issue.link)}
  //               style={styles.discordLink}
  //             >
  //               <Text style={styles.buttonText}>Message</Text>
  //             </Pressable>
  //           </View>
  //         ))} */}
  //     </ScrollView>
  //   );
  //   }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arview: {
    flex: 7,
  },
  map: {
    flex: 1,
  },
});

LandingScreen.contextType = MemoryContext;

export default LandingScreen;
