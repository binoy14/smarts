/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Tabs,
  Tab,
  Icon,
} from "react-native-elements";
import News from "./components/News"
import Weather from "./components/Weather";
import Calendar from "./components/Calendar";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'weather'
    }
  }

  changeTab(selectedTab) {
    this.setState({selectedTab});
  }

  render() {

    const {selectedTab} = this.state;
    return (
      <Tabs>
        <Tab
          selected={selectedTab === 'weather'}
          title="Weather"
          renderIcon={() => <Icon name="md-sunny" size={26} type="ionicon" />}
          onPress={() => this.changeTab('weather')}
        >
          <Weather />
        </Tab>
        <Tab
          selected={selectedTab === 'calendar'}
          title="Calendar"
          renderIcon={() => <Icon name="md-calendar" size={26} type="ionicon" />}
          onPress={() => this.changeTab('calendar')}
        >
          <Calendar />
        </Tab>
        <Tab
          selected={selectedTab === 'news'}
          title="News"
          renderIcon={() => <Icon name="md-book" size={26} type="ionicon" />}
          onPress={() => this.changeTab('news')}
        >
          <News />
        </Tab>
      </Tabs>
    );
  }
}
