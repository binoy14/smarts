import React, {Component} from "react";
import {
  Container,
  Content, 
  Footer, 
  FooterTab, 
  Button,
  Icon
} from "native-base";
import Dimensions from "Dimensions";
import {
	Text,
	StyleSheet,
} from "react-native";

import {Weather, Calendar, News} from "./components";
import {Grid, Col} from "react-native-easy-grid";


const styles = StyleSheet.create({

});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.showNews = this.showNews.bind(this); 
    this.showCalendar = this.showCalendar.bind(this);
    this.showWeather = this.showWeather.bind(this);
    this.scene;
    this.state = {
      activeScene : 0,
    };
  }

  showNews() {
    this.scene = <News />
  }

  showCalendar() {
    this.scene = <Calendar />
  };

  showWeather() {
    this.scene = <Weather />
  }

  render() {
    const {activeScene} = this.state;

    switch(activeScene) {
      case 0:
        this.showWeather();
        break;
      case 1:
        this.showCalendar();
        break;
      case 2:
        this.showNews();
        break;
    }

    return (
      <Container style={styles.container}>
          <Content>
            <Grid>
              <Col style={{backgroundColor: '#FF6445', height: Dimensions.get('window').height}}>
                {this.scene}
              </Col>
            </Grid>
          </Content>
        <Footer>
          <FooterTab>
            <Button 
              active={(activeScene === 0) ? true : false} 
              onPress={() => { this.setState({activeScene: 0})}}>
                Weather
              <Icon name="md-sunny" size={30} color="#900" />
            </Button>
            <Button 
              active={(activeScene === 1) ? true : false} 
              onPress={() => { this.setState({activeScene: 1})}}>
                Calendar
              <Icon name="md-calendar" size={30} color="#900" />
            </Button>
            <Button 
              active={(activeScene === 2) ? true : false} 
              onPress={() => { this.setState({activeScene: 2})}}>
                Weather
              <Icon name="md-book" size={30} color="#900" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
