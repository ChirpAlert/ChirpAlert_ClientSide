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
          passProps: ""
      };
  }

  render(){
    return(
      <View style={styles.box}>
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
            English Name
          </Text>
          <Text style={styles.wikiLink}>
            //LinkingIOS.openURL(url) with TouchableHighlight
            bird at wiki
          </Text>
          <Text style={styles.birdInfo}>
            Species:
          </Text>
          <Text style={styles.birdInfo}>
            Country:
          </Text>
          <Text style={styles.birdInfo}>
            Location:
          </Text>
          <Text style={styles.birdInfo}>
            Type of recording:
          </Text>
          <Text style={styles.birdInfo}>
            Length of recording:
          </Text>
          <Text style={styles.birdInfo}>
            Recorded by:
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
