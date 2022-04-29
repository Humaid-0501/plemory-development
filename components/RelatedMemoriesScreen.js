import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
// const isCarousel = React.useRef(null)
import MemoryContext from "./contexts/MemoryContext";

const SLIDER_WIDTH = Dimensions.get("window").width + 20;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
let propsGlobal = {};

const { width: screenWidth } = Dimensions.get("window");

const CarouselCardItem = ({ item, index }, parallaxProps) => {
  return (
    <TouchableOpacity
      onPress={() =>
        propsGlobal.navigation.navigate("Memory View", {
          memory: item,
          updateMemory: propsGlobal.route.params.updateMemory,
        })
      }
    >
      <View style={CarouselStyles.container} key={index}>
        <Image source={{ uri: item.image }} style={CarouselStyles.image} />
        <Text style={CarouselStyles.header}>{item.name}</Text>
        {/* <Text style={CarouselStyles.body}>{item.body}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

class RelatedMemoriesScreen extends React.Component {
  constructor(props) {
    super(props);
    let memories = this.props.route.params.memories;
    propsGlobal = this.props;
    // memories = memories.map(m => m.navigation = this.props.navigation)
    this.state = {
      memories: memories,
      colocatedCurrentIndex: Number(this.props.route.params.memory.id),
      relatedCurrentIndex: 0,
    };
    this.isCoCarousel = React.createRef(null);
    this.isRelatedCarousel = React.createRef(null);
  }

  changePage(nextIndex) {
    this.setState({ colocatedCurrentIndex: nextIndex });
  }

  render() {
    return (
      <View style={{ backgroundColor: "black", height: "100%" }}>
        <View style={{ marginTop: 30 }}>
          <Text style={{ textAlign: "center", color: "white" }}>
            Co-located Memories
          </Text>
          <Carousel
            layout="default"
            layoutCardOffset={9}
            firstItem={this.state.colocatedCurrentIndex}
            onSnapToItem={(index) => this.changePage(index)}
            ref={this.isCoCarousel}
            data={this.state.memories}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            inactiveSlideShift={0}
            useScrollView={true}
          />
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={{ textAlign: "center", color: "white" }}>
            Related Memories
          </Text>
          {this.state &&
          this.state.memories[this.state.colocatedCurrentIndex].related &&
          this.state.memories[this.state.colocatedCurrentIndex].related.length >
            0 ? (
            <Carousel
              layout="default"
              layoutCardOffset={9}
              ref={this.isRelatedCarousel}
              data={
                this.state.memories[this.state.colocatedCurrentIndex].related
              }
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              inactiveSlideShift={0}
              useScrollView={true}
            />
          ) : (
            <Text
              style={{ textAlign: "center", color: "white", marginTop: 30 }}
            >
              No related Memories available for this memory
            </Text>
          )}
          {/* <Carousel
                        layout="default"
                        layoutCardOffset={9}
                        ref={this.isRelatedCarousel}
                        data={this.state.memories[this.state.colocatedCurrentIndex].related}
                        renderItem={CarouselCardItem}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        inactiveSlideShift={0}
                        useScrollView={true}
                    /> */}
        </View>
      </View>

      // <TouchableOpacity onPress={() => this.props.navigation.navigate("Memory View", {memory: this.state.memory})}>
      //      <Image
      //         source={{uri: "https://picsum.photos/200/300"}}
      //         style={{
      //           width: this.state.memory.popularity,
      //           height: this.state.memory.popularity,
      //           resizeMode: "contain",
      //         }}
      //       />
      // </TouchableOpacity>
    );
  }
}

const CarouselStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 40,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: "black",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200,
    marginLeft: 40,
    // alignContent: "center"
  },
  header: {
    color: "white",
    fontSize: 16,
    // fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 10,
    textAlign: "center",
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

RelatedMemoriesScreen.contextType = MemoryContext;

export default RelatedMemoriesScreen;
