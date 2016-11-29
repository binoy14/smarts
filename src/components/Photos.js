import React, {Component} from "react";
import {
  View,
  CameraRoll,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import Swiper from "react-native-swiper";
import {Loading} from "./Loading";

const {width} = Dimensions.get("window");

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  image: {
    width,
    flex: 1,
  },
})

export default class Photos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
    };

    this.storePhotos = this.storePhotos.bind(this);
  }

  componentDidMount() {
    CameraRoll.getPhotos({first: 25})
      .then((assets) => {
       this.storePhotos(assets)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  storePhotos(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    this.setState({images});
  }

  logImageError(err) {
    console.log(err);
  }

  render() {
    const {images} = this.state;
    if(images.length === 0) {
      return <Loading />
    }
    return (
      <View>
        <Swiper
          loop={true}
          autoplay={true}
          autoplayTimeout={4}
          loadMinimalLoader={<Loading />}
        >
          {images.map(image => {
            return <View key={image.filename} style={styles.slide}>
              <Image style={styles.image} source={{uri: image.uri}} />
            </View>
          })}          
        </Swiper>
      </View>
    );
  }
}
