'use strict';
import React, {
  AsyncStorage,
  AppRegistry,
  Component,
  LinkingIOS,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';

class singleBird extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Single Bird",
      name: 'Sparrow',
      species: 'Birdy',
      country: 'english',
      loc: 'english',
      rectype: 'english',
      reclength: 56,
      recordist: "billy"
    };
  }
  getWiki(){
    return LinkingIOS.openURL(
      'https://en.wikipedia.org/wiki/'+this.state.name);
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.lineOne}>
          <Image
            style={styles.singleBirdImage1}
            source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          />
          <Image
            style={styles.singleBirdImage2}
            source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          />
        </View>
        <View>
          <Text style={styles.headerOne}>
            English Name: {this.state.name}
          </Text>
          <Text style={styles.wikiLink} onPress={this.getWiki.bind(this)}>
            Wiki
          </Text>
          <Text style={styles.birdInfo}>
            Species: {this.state.species}
          </Text>
          <Text style={styles.birdInfo}>
            Country: {this.state.country}
          </Text>
          <Text style={styles.birdInfo}>
            Location: {this.state.loc}
          </Text>
          <Text style={styles.birdInfo}>
            Type of recording: {this.state.rectype}
          </Text>
          <Text style={styles.birdInfo}>
            Length of recording: {this.state.reclength}
          </Text>
          <Text style={styles.birdInfo}>
            Recorded by: {this.state.recordist}
          </Text>
        </View>
        <View style={styles.lastLine}>
          <TouchableHighlight style={styles.addToListButton} underlayColor='#99d9f4' onPress={this.addToSavedList}>
            <Text style={styles.buttonText}>Add to saved list</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.twitterButton} underlayColor='#99d9f4' onPress={this.twitterButton}>
            <Image
              style={styles.twitterImage}
              source={{uri: 'http://designshack.net/wp-content/uploads/larrybird-2.jpg'}}
            />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wikiLink: {
    fontSize: 12,
  },
  headerOne: {
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
  },
  lineOne: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastLine: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  twitterImage: {
    width: 50,
    height: 50,
    paddingTop: 100,
  },
  singleBirdImage1: {
    width: 50,
    paddingTop: 100,
  },
  singleBirdImage2: {
    width: 50,
    paddingTop: 100,
  },
  welcome: {
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
    margin: 36,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
  },
  button: {
    height: 36,
    width: 36,
    flex: 1,
    backgroundColor: '#48BBEC ',
    borderColor: '#48BBEC ',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = singleBird
