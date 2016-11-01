import React, {Component} from "react";

import {
  StyleSheet,
  View,
  Text
} from "react-native";
import {Grid, Col, Row} from "react-native-easy-grid";
import moment from "moment";
import {Icon} from "native-base";

const shadow = {
  textShadowOffset: {
      width: 3,
      height: 3
    },
    textShadowRadius: 1,
    textShadowColor: '#FF2713'
};

const iconStyle = {
  color: "white",
  ...shadow,
  textShadowColor: '#82CDC1'
};

const bottomTextStyles = {
  color: '#FFFCB8',
  fontWeight: "700",
  ...shadow,
  textAlign: "center",
  textShadowColor: "#BC1D0E"
}

const styles = StyleSheet.create({
  timeText: {
    fontSize: 145,
    fontWeight: "700",
    color: '#FFFCB8',
    ...shadow,
  },
  dateText: {
    fontSize: 50,
    fontWeight: "600",
    color: "white",
    ...shadow,
  },
  mainIcon: {
    ...iconStyle,
    fontSize: 250,
  },
  tempText: {
    ...shadow,
    fontSize: 80,
    color: '#FFFCB8',
    fontWeight: "700"
  },
  warningText: {
    fontSize: 50,
    color: '#FFFCB8',
    fontWeight: "700"
  },
  weatherContainer: {
    marginLeft: 50,
  },
  timeContainer: {
    marginTop: 80
  },
  bottomWeatherCols: {
    backgroundColor: '#DB563B',
    margin: 1,
    padding: 10,
  },
  bottomWeatherInfoTextTemp: {
    ...bottomTextStyles,
    fontSize: 50,
    color: "white",
  },
  bottomWeatherInfoTextWarning: {
    ...bottomTextStyles,
    fontSize: 20,
    color: "white",
  },
  bottomWeatherIcon: {
    ...iconStyle,
    fontSize: 150,
  },
  bottomWeatherDay: {
    ...bottomTextStyles,
    fontSize: 40,

  },
  bottomWeatherInfoWrapper: {
    flexDirection: "row"
  },
  bottomWeatherTextWrapper: {
    margin: 20,
    marginLeft: 40,
  }
});

const BottomWeatherComponent = () => (
  <View>
    <Text style={styles.bottomWeatherDay}>Friday</Text>
    <View style={styles.bottomWeatherInfoWrapper}>
      <Icon name="ios-cloud" style={styles.bottomWeatherIcon}/>
      <View style={styles.bottomWeatherTextWrapper}>
        <Text style={styles.bottomWeatherInfoTextTemp}>
          75°F
        </Text>
        <Text style={styles.bottomWeatherInfoTextWarning}>
          60% Rain
        </Text>
      </View>
    </View>
  </View>
);

export class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("LT"),
      date: `${moment().format("dddd")}, ${moment().format("LL")}`
    }
  }

  componentWillUnmount() {
    if(this.timeoutFunction) {
      clearTimeout(this.timeoutFunction);
    }
  }
  
  componentDidMount() {
    this.timeoutFunction = setInterval(() => {
      this.setState({
        time: moment().format("LT"),
        date: `${moment().format("dddd")}, ${moment().format("LL")}`
      });
    }, 1000);
  }

  render() {
    return (
      <Grid>
        <Row size={65}>
          <Col size={40}>
            <View style={styles.weatherContainer}>
              <Icon name="ios-cloud" style={styles.mainIcon} />
              <View>
                <Text style={styles.tempText}>
                  75°F
                </Text>
                <Text style={styles.warningText}>
                  60% Rain
                </Text>
              </View>
            </View>
          </Col>
          <Col size={60}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                {this.state.time}
              </Text>
              <Text style={styles.dateText}>
                {this.state.date}
              </Text>
            </View>
          </Col>
        </Row>
        <Row size={35}>
          <Col style={styles.bottomWeatherCols}>
            <BottomWeatherComponent />
          </Col>
          <Col style={styles.bottomWeatherCols}>
            <BottomWeatherComponent />
          </Col>
          <Col style={styles.bottomWeatherCols}>
            <BottomWeatherComponent />
          </Col>
        </Row>
      </Grid>
    );
  }
}
