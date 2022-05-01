import React, {Component} from 'react';
import {Text, View, StyleSheet, SafeAreaView, Button, TouchableHighlight, Image} from 'react-native';
import data from "../assets/data/memories";
import MemoryContext from './contexts/MemoryContext';
// const RNFS = require('react-native-fs');
import * as FileSystem from 'expo-file-system';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';

class LandingScreen extends Component{
    constructor(props){
        super(props)
        // console.log(this.context)
        this.state = {
            memories : data,
            cur_memories: data
        }
        this.willFocusSubscription = this.props.navigation.addListener(
            'focus',
            () => {
                console.log("Will Focus")
              this.fetchData(this.state.cur_memories);
            }
        );
    }

    updateMemory = async (id, action) =>{
        let memories = this.state.memories
        for(let i = 0; i < memories.length; i++){
            if(memories[i].id == id){
                if(action == "throw"){
                    memories[i].popularity[0] += 5
                }
                else{
                    memories[i].popularity[0] += 10
                }
            }
        }
        // data = memories
        this.setState({
            cur_memories: memories
        })
        console.log(memories)
        let fileUri = FileSystem.documentDirectory + "memories.json";
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(memories), { encoding: FileSystem.EncodingType.UTF8 });
        console.log(fileUri)
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
    }

    fetchData = async (cur_memories) =>{
        let fileUri = FileSystem.documentDirectory + "memories.json";
        let content = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
        // console.log(content)
        // data = data.map(d => d.image = require(d.imageUrl))
        this.setState({memories: JSON.parse(content)});
        // console.log(this.state.memories)
    }

    // componentWillUnmount() {
    //     this.willFocusSubscription();
    // }

    componentDidMount(){
        this.fetchData(data);
    }

    // componentDidUpdate(){
    //     this.forceUpdate();
    // }

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.arview}>
                    <Text>AR View</Text>
                </View>
                <View style={styles.map}>
                    <TouchableHighlight underlayColor='none' onPress={() => this.props.navigation.navigate("Map View", {memories: this.state.memories, updateMemory: this.updateMemory})}>
                        <View>
                            {/* <FontAwesome5 name="map-marked-alt" size={54} color="black" /> */}
                            <Image
                                source={require('../assets/map.png')}
                                fadeDuration={5}
                                style={{ width: 80, height: 80, borderRadius: 10, borderColor: "black", borderWidth: 1}}
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

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: "100%",
        alignContent: 'center'
    },
    arview:{
        flex: 7
    },
    map: {
        flex: 1,
        paddingLeft: 20
    }
})

LandingScreen.contextType = MemoryContext;

export default LandingScreen;