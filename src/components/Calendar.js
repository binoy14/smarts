import React, {Component} from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableHighlight,
} from "react-native";
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import {
  List,
  ListItem,
  Card,
  SocialIcon,
} from "react-native-elements";
import moment from "moment";
import { GOOGLE_API_KEY } from '../../config';
import axios from "axios";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarItems: [],
      calendarIds: [],
      selectedCalendarId: "",
      modalVisible: false,
      user: null,
    };

    this.signIn = this.signIn.bind(this);
    this.onCalendarIdSelect = this.onCalendarIdSelect.bind(this);
  }

  componentWillMount() {
    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
        webclientId: '1060428883192-u88cj85cgkgbufugntnhu3vteukquhbt.apps.googleusercontent.com',
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
        this.setState({user});
        const url = `https://www.googleapis.com/calendar/v3/users/me/calendarList?key=${GOOGLE_API_KEY}`;
        axios.get(url, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          this.setState({
            calendarIds: response.data.items,
            modalVisible: true,
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

  onCalendarIdSelect(calendarId) {
    console.log(calendarId);
    const {user} = this.state;
    const startTime = moment.utc().startOf('day').format();
    const endTime = moment.utc().endOf('day').format();
    const encoded = encodeURIComponent(calendarId);
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encoded}/events?key=${GOOGLE_API_KEY}&timeMin=${startTime}&timeMax=${endTime}`;
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((response) => {
        this.setState({
          calendarItems: response.data.items,
          modalVisible: false,
          calendarIds: [],
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      console.log("Signed out");
    })
    .done();
  }

  render() {
    const {calendarItems, calendarIds} = this.state;
    console.log(calendarIds, calendarItems);
    if(calendarIds.length !== 0) {
      return <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
            <Text>Select Calendar to Display</Text>
            <List>
              {
                calendarIds.map((id) => {
                  return <ListItem
                    key={id.etag}
                    title={id.summary}
                    onPress={() => {this.onCalendarIdSelect(id.id)}}
                    description={id.description}
                  />
                })
              }
            </List>
         </View>
        </Modal>
    }



    if(calendarItems.length !== 0) {
      return (
        <ScrollView>
        {calendarItems.map((item, i) => {
          const num = Math.floor(Math.random() * 5) + 1;
          let location, description;
          if(item.location) {
            location = <Text>Location: {item.location}</Text>
          }
          if(item.description) {
            description = <Text>Description: {item.description}</Text>
          }
          const startTime = <Text>Start Time: {moment(item.start.dateTime).format("LT")}</Text>
          const endTime = <Text>End Time: {moment(item.end.dateTime).format("LT")}</Text>
          switch (num) {
            case 1:
              return (
                <Card
                  key={item.etag}
                  image={require(`../media/1.jpeg`)}
                  title={item.summary}
                >
                  {location}
                  {description}
                  {startTime}
                  {endTime}
                </Card>
              )
            case 2:
              return (
                <Card
                  key={item.etag}
                  image={require(`../media/2.jpeg`)}
                  title={item.summary}
                >
                  {location}
                  {description}
                  {startTime}
                  {endTime}
                </Card>
              )
            case 2:
              return (
                <Card
                  key={item.etag}
                  image={require(`../media/2.jpeg`)}
                  title={item.summary}
                >
                  {location}
                  {description}
                  {startTime}
                  {endTime}
                </Card>
              )
            case 3:
              return (
                <Card
                  key={item.etag}
                  image={require(`../media/3.jpeg`)}
                  title={item.summary}
                >
                  {location}
                  {description}
                  {startTime}
                  {endTime}
                </Card>
              )

            case 4:
              return (
                <Card
                  key={item.etag}
                  image={require(`../media/4.jpeg`)}
                  title={item.summary}
                >
                  {location}
                  {description}
                  {startTime}
                  {endTime}
                </Card>
              )

            default:
              return (
                <Card
                  key={item.etag}
                  image={require(`../media/1.jpeg`)}
                  title={item.summary}
                >
                  {location}
                  {description}
                  {startTime}
                  {endTime}
                </Card>
              )
          }          
        })}
        </ScrollView>
      );
    }
    
    return (
      <View style={styles.container}>
        <SocialIcon 
          type="google-plus-official"
          raised
          button
          style={{paddingLeft: 20, paddingRight: 20}}
          title="Sign in With Google"
          onPress={this.signIn}
        />
      </View>
    );
  }
}
