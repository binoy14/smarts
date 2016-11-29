import React, { Component } from 'react';
import { API_KEY } from '../../config';
import axios from 'axios';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {
  List,
  ListItem,
  Card,
  Button,
} from 'react-native-elements';
import {Loading} from "./Loading";

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: 'white',
    margin: 10,
    marginTop: 20,
    borderRadius: 5,
    minHeight: 100,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: {
      height: 4,
      width: 2,
    },
    shadowOpacity: 0.5,
  },
});

export default class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    axios.get(`https://newsapi.org/v1/articles?source=the-next-web&apiKey=${API_KEY}`)
      .then((response) => {
        this.setState({
          articles: response.data.articles,
        });
      })
      .catch((error) => { throw error; });
  }

  render() {
    if (this.state.articles.length === 0) {
      return <Loading />;
    }

    return (
      <View>
        <ScrollView>
        {this.state.articles.map(article =>
          (
            <Card
              key={article.publishedAt}
              title={article.title}
              image={{uri: article.urlToImage}}
              imageStyle={{height: 300}}
              containerStyle={{borderRadius: 5}}
              >
              <Text style={{marginBottom: 10, flexDirection: "column", justifyContent: "space-between"}}>
                <Text>{article.description}</Text>
              </Text>
              <Button
                icon={{name: 'md-link', type: 'ionicon'}}
                backgroundColor='#03A9F4'
                onPress={() => {Linking.openURL(article.url)}}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Open' />
            </Card>
          )
        )}
        <Text>Powered by newsapi.org</Text>
        </ScrollView>
      </View>
    );
  }
}
