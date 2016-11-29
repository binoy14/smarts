import React, {Component} from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import {
  Card,
  Button,
} from "react-native-elements";
import axios from "axios";

import {GOOGLE_API_KEY} from "../../config";
import {Loading} from "./Loading";
const {width} = Dimensions.get("window");

export default class Traffic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      predictions: null,
      lat: "",
      long: "",
      destinations: ["285 Fulton St, New York, NY 10007", "940 Main St, Hackensack, NJ 07601", "106 Sussex Ave, Newark, NJ 07103", "206 Springfield Ave, Newark, NJ 07103"],
    };

    this.getTitle = this.getTitle.bind(this);
    this.openMaps = this.openMaps.bind(this);
  }

  componentDidMount() {
    let lat, long
    navigator.geolocation.getCurrentPosition((pos) => {
      lat = pos.coords.latitude;
      long = pos.coords.longitude;
      this.setState({lat, long});

      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${lat},${long}&destinations=940+Main+St,+Hackensack,+NJ+07601|285+Fulton+St,+New+York,+NY+10007|106+Sussex+Ave,+Newark,+NJ+07103|206+Springfield+Ave,+Newark,+NJ+07103&key=${GOOGLE_API_KEY}`;
      axios.get(url)
        .then((response) => {
          this.setState({
            predictions: response.data.rows,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },(err) => {
      console.log(err);
    }, {enableHighAccuracy: true});
  }

  getTitle(index) {
    switch(index) {
      case 0:
        return "Work";
      case 1:
        return "School";
      case 2:
        return "Church";
      case 3:
        return "Supermarket"
    }
  }

  openMaps(lat, long, destination) {
    const url = `comgooglemaps://?saddr=${lat},${long}&daddr=${destination}`
    Linking.canOpenURL(url)
      .then(supported => {
        if(supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Google Maps is not installed');
        }
      })
  }

  render() {
    const {predictions, destinations, lat, long} = this.state;
    if(!predictions) {
      return <Loading />;
    }
    return (
      <ScrollView>
        <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
          {predictions[0].elements.map((prediction, i) => {
            return (
              <Card 
                key={`${prediction.distance.value}-${prediction.duration.value}`}
                containerStyle={{width: width/2.5, height: 210, margin: 30}}
                title={this.getTitle(i)}
              >
                <View style={{flexDirection: "row",}}>
                  <Text style={{fontSize: 18, width: width/5, marginTop: 10, marginRight: 40,}}>{destinations[i]}</Text>
                  <View style={{flex: 1}}>
                    <Text style={{fontSize: 30}}>{prediction.duration.text}</Text>
                    <Text style={{fontSize: 30}}>{prediction.distance.text}</Text>
                  </View>
                </View>
                <Button
                  icon={{name: 'md-pin', type: 'ionicon'}}
                  backgroundColor='#03A9F4'
                  onPress={() => {this.openMaps(lat, long, destinations[i])}}
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 10,}}
                  title='Open in Maps' />
              </Card>
            )
          })}
        </View>
      </ScrollView>
    );
  }
}
