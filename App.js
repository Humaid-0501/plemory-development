import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import LandingScreen from './components/LandingScreen';
import MapScreen from './components/MapScreen';
import RelatedMemoriesScreen from './components/RelatedMemoriesScreen';
import MemoryViewScreen from './components/MemoryViewScreen';
import data from "./assets/data/memories";
import MemoryContext from "./components/contexts/MemoryContext"
import CameraScreen from './components/CameraScreen';
import ImageCaptureScreen from './components/ImageCaptureScreen';
import * as FileSystem from 'expo-file-system';

const Stack = createNativeStackNavigator();


// import './shim.js'


class App extends React.Component {
  constructor(props){
    super(props)
    // console.log(data)
  }

  componentDidMount(){
    this.createFile()
  }

  createFile = async () =>{
    let fileUri = FileSystem.documentDirectory + "memories.json";
    let file = await FileSystem.getInfoAsync(fileUri);
    if(!file.exists){
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data), { encoding: FileSystem.EncodingType.UTF8 });
      console.log(fileUri)
    }
    let content = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
    console.log(content)


  }

  render(){
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={LandingScreen} />
            <Stack.Screen name="Map View" component={MapScreen} />
            <Stack.Screen name="Related Memories" component={RelatedMemoriesScreen} />
            <Stack.Screen name="Memory View" component={MemoryViewScreen} />
            <Stack.Screen name="Upload Memory" component={ImageCaptureScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />

          </Stack.Navigator>
        </NavigationContainer>      
      // <View style={styles.container}>
      //   <LandingScreen/>
      //   {/* <MapScreen/>
      //   <StatusBar style="auto" /> */}
      // </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default () => {
  return (
    <MemoryContext.Provider value = {{name: "hello"}}>
      <App />
    </MemoryContext.Provider>
  );
};
