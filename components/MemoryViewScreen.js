import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, SafeAreaView, Button, TouchableOpacity} from 'react-native';
import MemoryContext from './contexts/MemoryContext';

class MemoryViewScreen extends React.Component {
    constructor(props){
        super(props)
        // console.log(this.context)
        this.state = {
            memory : this.props.route.params.memory
        }
    }
    throwMemory = () => {
        this.props.route.params.updateMemory(this.state.memory.id, "throw")
        this.props.navigation.goBack()
    }
    superThrowMemory = () => {
        this.props.route.params.updateMemory(this.state.memory.id, "super_throw")
        this.props.navigation.goBack()
    }
    render(){
        return(
            <View style={styles.FullView}>
                <TouchableOpacity>
                    <Image
                        source={{uri: "https://picsum.photos/200/200"}}
                        style={styles.Image}
                    />
                </TouchableOpacity>
                <View style={styles.Buttons}>
                    <Button title="Throw" onPress={this.throwMemory}/>
                    <Button title="Super Throw" onPress={this.superThrowMemory}/>
                </View>
                
            </View>
           
        )
    }
}

const styles = StyleSheet.create({
    FullView:{
        backgroundColor: "black"
    },
    Image: {
        // flex: 1,
        width: "100%",
        height: "100%",
        // resizeMode: "contain",
       
    },
    Buttons:{
        flexDirection: "row",
        width: "100%",
        alignContent: "space-between",
        color: "white",
        position: "absolute",
        top: "80%",
        justifyContent: "space-between" ,
        fontSize: 30       // left: 20,
        // bottom: 20
    }
})

MemoryViewScreen.contextType = MemoryContext;

export default MemoryViewScreen;