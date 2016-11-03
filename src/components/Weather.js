import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import moment from 'moment';
import { Icon, Spinner } from 'native-base';
import getForecast from '../forecast';

const shadow = {
  textShadowOffset: {
    width: 3,
    height: 3,
  },
  textShadowRadius: 1,
  textShadowColor: '#FF2713',
};

const iconStyle = {
  color: 'white',
  ...shadow,
  textShadowColor: '#82CDC1',
};

const bottomTextStyles = {
  color: '#FFFCB8',
  fontWeight: '700',
  ...shadow,
  textAlign: 'center',
  textShadowColor: '#BC1D0E',
};

const styles = StyleSheet.create({
  timeText: {
    fontSize: 145,
    fontWeight: '700',
    color: '#FFFCB8',
    ...shadow,
  },
  dateText: {
    fontSize: 50,
    fontWeight: '600',
    color: 'white',
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
    fontWeight: '700',
    textAlign: 'center',
  },
  warningText: {
    fontSize: 50,
    color: '#FFFCB8',
    fontWeight: '700',
    textAlign: 'center',
  },
  weatherContainer: {
    marginLeft: 50,
    marginTop: 50,
  },
  timeContainer: {
    marginTop: 80,
  },
  bottomWeatherCols: {
    backgroundColor: '#DB563B',
    margin: 1,
    padding: 10,
  },
  bottomWeatherInfoTextTemp: {
    ...bottomTextStyles,
    fontSize: 50,
    color: 'white',
  },
  bottomWeatherInfoTextWarning: {
    ...bottomTextStyles,
    fontSize: 20,
    color: 'white',
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
    flexDirection: 'row',
    marginTop: 20,
  },
  bottomWeatherTextWrapper: {
    marginTop: 20,
  },
});

const BottomWeatherComponent = ({ day, temperature, rain }) => (
  <View>
    <Text style={styles.bottomWeatherDay}>{day}</Text>
    <View style={styles.bottomWeatherInfoWrapper}>
      <Image source={require('../../assets/cloud.png')} style={{ width: 210, height: 155 }} />
      <View style={styles.bottomWeatherTextWrapper}>
        <Text style={styles.bottomWeatherInfoTextTemp}>
          {temperature}
        </Text>
        <Text style={styles.bottomWeatherInfoTextWarning}>
          {rain} Rain
        </Text>
      </View>
    </View>
  </View>
);

export class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: [],
      time: moment().format('LT'),
      date: `${moment().format('dddd')}, ${moment().format('LL')}`,
    };
  }

  componentWillUnmount() {
    if (this.timeoutFunction) {
      clearTimeout(this.timeoutFunction);
    }
  }

  componentDidMount() {
    getForecast()
      .then((forecast) => {
        this.setState({ forecast });
      })
      .catch(error => console.error(error));

    this.timeoutFunction = setInterval(() => {
      this.setState({
        time: moment().format('LT'),
        date: `${moment().format('dddd')}, ${moment().format('LL')}`,
      });
    }, 1000);
  }

  render() {
    if (this.state.forecast.length === 0) {
      return <Spinner color="yellow" />;
    }

    return (
      <Grid>
        <Row size={60}>
          <Col size={40}>
            <View style={styles.weatherContainer}>
              <Image source={require('../../assets/cloud.png')} style={{ width: 280, height: 200 }} />
              <View>
                <Text style={styles.tempText}>
                  {this.state.forecast[0].temperature}°F
                </Text>
                <Text style={styles.warningText}>
                  {this.state.forecast[0].rain}% Rain
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
        <Row size={40}>
          <Col style={styles.bottomWeatherCols}>
            <BottomWeatherComponent day={moment().add(1, 'day').format('dddd')}
                                    temperature={this.state.forecast[1].temperature}
                                    rain={this.state.forecast[1].rain} />
          </Col>
          <Col style={styles.bottomWeatherCols}>
            <BottomWeatherComponent day={moment().add(2, 'day').format('dddd')}
                                    temperature={this.state.forecast[2].temperature}
                                    rain={this.state.forecast[2].rain} />
          </Col>
          <Col style={styles.bottomWeatherCols}>
            <BottomWeatherComponent day={moment().add(3, 'day').format('dddd')}
                                    temperature={this.state.forecast[3].temperature}
                                    rain={this.state.forecast[3].rain} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
