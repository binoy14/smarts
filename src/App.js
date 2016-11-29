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
import Photos from "./components/Photos";
import Traffic from "./components/Traffic";

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
      <Tabs
        tabBarStyle={{backgroundColor: "#F9FDFF"}}
      >
        <Tab
          selected={selectedTab === 'weather'}
          title="Weather"
          renderIcon={() => <Icon color="#659CB3" name="md-sunny" size={26} type="ionicon" />}
          renderSelectedIcon={() => <Icon color="#E1493F" name="md-sunny" size={26} type="ionicon" />}
          selectedTitleStyle={{color: "#E1493F"}}
          onPress={() => this.changeTab('weather')}
        >
          <Weather />
        </Tab>
        <Tab
          selected={selectedTab === 'calendar'}
          title="Calendar"
          renderIcon={() => <Icon color="#659CB3" name="md-calendar" size={26} type="ionicon" />}
          renderSelectedIcon={() => <Icon color="#E1493F" name="md-calendar" size={26} type="ionicon" />}
          selectedTitleStyle={{color: "#E1493F"}}
          onPress={() => this.changeTab('calendar')}
        >
          <Calendar />
        </Tab>
        <Tab
          selected={selectedTab === 'news'}
          title="News"
          renderIcon={() => <Icon color="#659CB3" name="md-book" size={26} type="ionicon" />}
          renderSelectedIcon={() => <Icon color="#E1493F" name="md-book" size={26} type="ionicon" />}
          selectedTitleStyle={{color: "#E1493F"}}
          onPress={() => this.changeTab('news')}
        >
          <News />
        </Tab>
        <Tab
          selected={selectedTab === 'traffic'}
          title="Traffic"
          renderIcon={() => <Icon color="#659CB3" name="md-car" size={26} type="ionicon" />}
          renderSelectedIcon={() => <Icon color="#E1493F" name="md-car" size={26} type="ionicon" />}
          selectedTitleStyle={{color: "#E1493F"}}
          onPress={() => this.changeTab('traffic')}
        >
          <Traffic />
        </Tab>
        <Tab
          selected={selectedTab === 'photos'}
          title="Photos"
          renderIcon={() => <Icon color="#659CB3" name="md-image" size={26} type="ionicon" />}
          renderSelectedIcon={() => <Icon color="#E1493F" name="md-image" size={26} type="ionicon" />}
          selectedTitleStyle={{color: "#E1493F"}}
          onPress={() => this.changeTab('photos')}
        >
          <Photos />
        </Tab>
      </Tabs>
    );
  }
}
