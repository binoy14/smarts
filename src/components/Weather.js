import React, {Component} from "react";
import {
	View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import moment from "moment";
import {
  Card,
  Button,
  Icon,
} from "react-native-elements";
import getForecast from "../util/forecast";
import {Loading} from "./Loading";
import {styles} from "./weatherStyles";

const NextWeatherCard = (props) => {
  return (
    <View>
      <Text style={styles.nextWeatherDay}>{props.day}</Text>
      <View style={styles.nextWeatherContainer}>
        {props.icon}
        <Text style={styles.nextWeatherText}>{props.temperature}°</Text>
      </View>
    </View>
  )
};

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [],
      time: moment().format('LT'),
      date: `${moment().format('dddd')}, ${moment().format('LL')}`,
    };

    this.renderIcon = this.renderIcon.bind(this);
  }

  // componentWillUnmount() {
  //   if (this.timeoutFunction) {
  //     clearTimeout(this.timeoutFunction);
  //   }
  // }

  componentWillMount() {
    getForecast()
      .then((forecast) => {
        this.setState({ forecast });
      })
      .catch(error => console.error(error));

    // this.timeoutFunction = setInterval(() => {
    //   this.setState({
    //     time: moment().format('LT'),
    //     date: `${moment().format('dddd')}, ${moment().format('LL')}`,
    //   });
    // }, 1000);
  }

  componentWillReceiveProps() {
    getForecast()
      .then((forecast) => {
        this.setState({ forecast });
      })
      .catch(error => console.error(error));
  }

  renderIcon(forecast, size, color) {
    const {icon} = forecast;

    if(icon.includes("rain")) {
      return <Icon type="ionicon" name="md-rainy" size={size} color={color}/>;
    }

    if(icon.includes("sun")) {
      return <Icon type="ionicon" name="md-sunny" size={size} color={color}/>;
    }
    
    if(icon === "partlycloudy"){
      return <Icon type="ionicon" name="md-partly-sunny" size={size} color={color}/>;
    }

    if(icon.includes("snow")){
      return <Icon type="ionicon" name="md-snow" size={size} color={color}/>;
    }
    
    return <Icon type="ionicon" name="md-sunny" size={size} color={color}/>;
  }

  render() {
    const {forecast} = this.state;
    if (forecast.length === 0) {
      return <Loading />;
    }

    let nextForecast = forecast;
    nextForecast = nextForecast.splice(1, 4);

    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.iconContainer}>
            {this.renderIcon(forecast[0], 250, "#DEECF0")}
            <Text style={styles.iconText}>{forecast[0].rain}%</Text>
          </View>
          <View style={styles.temperatureContainer}> 
            <Text style={styles.temperatureText}>{forecast[0].temperature}°</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          {nextForecast.map(newForecast => 
            <NextWeatherCard 
              key={`${newForecast.temperature}-${newForecast.rain}`}
              temperature={newForecast.temperature}
              day={newForecast.day}
              icon={this.renderIcon(newForecast, 119, "#B9D1EA")} 
            />
          )}
        </View>
      </View>
    );
  }
}
