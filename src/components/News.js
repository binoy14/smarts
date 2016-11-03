import React, { Component } from 'react';
import { API_KEY } from '../../config';
import axios from 'axios';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import {
  Spinner,
  List,
  ListItem,
  Thumbnail,
  Text,
  Button,
  Container,
  Content,
} from 'native-base';

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

export class News extends Component {
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
    console.log(this.state.articles);
    if (this.state.articles.length === 0) {
      return <Spinner color="yellow" />;
    }

    return (
      <Content>
        <List>
          {this.state.articles.map(article =>
             (
               <ListItem key={article.publishedAt} style={styles.listItem}>
                 <Thumbnail square size={80} source={{ uri: article.urlToImage }} />
                 <Text>{article.title}</Text>
                 <Text note>{article.author}</Text>
                 <Text>{article.description}</Text>
               </ListItem>
            )
          )}
        </List>
      </Content>
    );
  }
}
