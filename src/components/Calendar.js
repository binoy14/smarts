import React, { Component } from 'react';
import moment from 'moment';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';
import axios from 'axios';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { List, ListItem } from 'native-base';
import { GOOGLE_API_KEY } from '../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarItems: [],
    };

    this.signIn = this.signIn.bind(this);
  }

  componentWillMount() {
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
        iosClientId: '1060428883192-3ig74dfv5882k58a61m8pkqt1kgj83ej.apps.googleusercontent.com',
      });
    })
    .catch((err) => {
      console.log("Play services error", err.code, err.message);
    });
  }

  signIn() {

    GoogleSignin.signIn()
      .then((user) => {
        const startTime = moment.utc().startOf('day').format();
        const endTime = moment.utc().endOf('day').format();
        const url = `https://www.googleapis.com/calendar/v3/calendars/binoypatel14%40gmail.com/events?key=${GOOGLE_API_KEY}&timeMin=${startTime}&timeMax=${endTime}`;
        axios.get(url, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
          .then((response) => {
            console.log(response.data.items);
            this.setState({
              calendarItems: response.data.items,
            });
          })
          .catch((e) => {
            console.log(e.message);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // _signOut() {
  //   GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
  //     console.log("Signed out");
  //   })
  //   .done();
  // }

  render() {
    if(this.state.calendarItems.length !== 0) {
      return (
        <View>
          <List
            dataArray={this.state.calendarItems}
            renderRow={(item) =>
              <ListItem>
                <Text>{moment(item.start.dateTime).format("LT")} - {moment(item.end.dateTime).format("LT")} : {item.summary}</Text>
              </ListItem>
            }>
          </List>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <GoogleSigninButton
            style={{width: 120, height: 48}}
            size={GoogleSigninButton.Size.Icon}
            color={GoogleSigninButton.Color.Light}
            onPress={this.signIn}
            >
          </GoogleSigninButton>
          <TouchableHighlight onPress={this.signIn}>
            <Text>Sign in With Google</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }
}
