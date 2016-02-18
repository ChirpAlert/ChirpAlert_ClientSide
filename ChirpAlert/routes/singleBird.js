'use strict';
import React, {
  ActionSheetIOS,
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
      recording: 'http:\/\/www.xeno-canto.org\/134880\/download',
      rectype: 'english',
      reclength: 56,
      recordist: "billy"
    };
  }
  getSound(){
    return LinkingIOS.openURL(this.state.recording);
  }
  getWiki(){
    return LinkingIOS.openURL(
      'https://en.wikipedia.org/wiki/'+this.state.name);
  }
  _onShareButton(){
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: 'http://chirpalert.com',
      message: 'I saw a fucking bird #chirpalert',
    },
       (error) => {
         console.error(error);
    },
    (success, method) => {
      if (success) {
        console.log('shared');
      }
    });
  }


  render(){
    return(
      <View style={styles.box}>
        <View style={styles.lineOne}>
          <Image
            style={styles.singleBirdImage1}
            source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
        />
        <TouchableHighlight style={styles.addToListButton} underlayColor='#99d9f4 ' onPress={this.getSound.bind(this)}>
         <Text style={styles.buttonText}>play</Text>
       </TouchableHighlight>
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
          <TouchableHighlight style={styles.twitterButton} underlayColor='#99d9f4' onPress={this._onShareButton}>
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
  birdInfo: {
    padding: 10,

  },
  box: {
    flex: 1,
    backgroundColor: '#527FE4',
    borderColor: '#000033',
    borderWidth: 1,
    paddingTop: 75,
    backgroundColor: '#809C00',
    alignItems: 'stretch',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#809C00',
    paddingTop: 100,
  },
  lineOne: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastLine: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',

  },
  twitterImage: {
    width: 100,
    height: 100,
  },
  singleBirdImage1: {
    width: 100,
    paddingTop: 100,
  },
  singleBirdImage2: {
    width: 100,
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
    textAlign: 'center',
  },
  addToListButton: {
    height: 36,
    width: 150,
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
