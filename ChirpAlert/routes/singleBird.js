'use strict';
import React, {
  ActionSheetIOS,
  AsyncStorage,
  AppRegistry,
  Component,
  LinkingIOS,
  Navigator,
  NavigatorIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
	Image
} from 'react-native';
var audio = {};
audio = require('react-native').NativeModules.RNAudioPlayerURL;

class singleBird extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bird_id: '',
      title: "Single Bird",
      image: require('../no_image.png'),
      name: '',
      species: '',
      country: '',
      loc: '',
      recording: 'http:\/\/www.xeno-canto.org\/134880\/download',
      rectype: 'english',
      reclength: 56,
      recordist: "billy",
    };
  }
  componentDidMount(){
    LinkingIOS.addEventListener('url', this._handleOpenURL);
    fetch(this.props.bird.file, {
      method: 'GET'
    }).then(function(response) {
        audio.initWithURL(response.url)
    }.bind(this))
    this.setState({
      bird_id: this.props.bird.id,
      name: this.props.bird.en,
      species: this.props.bird.gen + " " + this.props.bird.sp,
      country: this.props.bird.cnt,
      loc: this.props.bird.loc,
      recording: this.props.bird.file,
      rectype: this.props.bird.type,
      recordist: this.props.bird.rec,
    })
    console.log('about to fetch image');
    fetch('http://127.0.0.1:3000/birds', {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        gen: this.props.bird.gen,
        sp: this.props.bird.sp
      })
      }).then(function(response) {
        console.log(response._bodyText);
        if (response._bodyText != 'nope') {
          this.setState({
            image: { uri: response._bodyText }
          })
        } else {
          return;
        }
      }.bind(this))
      .catch((error) => {
        console.warn(error)
      })
    }
  componentWillUnmount() {
    LinkingIOS.removeEventListener('url', this._handleOpenURL);
    audio.pause();
  }
  getSound(){
    audio.play()
  }
  getWiki(){
    return LinkingIOS.openURL(
      'https://en.wikipedia.org/wiki/'+this.state.name);
  }

  _onSaveButton(){
    AsyncStorage.getItem("token").then(function(token){
      if(token){
        fetch('http://127.0.0.1:3000/users/savebird', {
          method: 'POST',
          headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            bird_id: Number(this.state.bird_id),
            en: this.state.name,
            loc: this.state.loc,
            date: Date.now(),
            uid: 'something'
          })
        }).then(function(responseData){
        }.bind(this))
        .catch(function(err) {
          console.warn(err);
        });
      }
      else {
        LinkingIOS.openURL(
          'http://127.0.0.1:3000/auth/login/twitter'
        );
      }
    }.bind(this))
      .catch(function(err){
        console.log(err);
      });
  }
  _handleOpenURL(event) {
    var token = event.url.replace('chirpalert://&token=', '');
    AsyncStorage.setItem("token", token);
    this._onSaveButton();
  }
  _onShareButton(){
    var message = 'I identified a ' + this.state.name + ' near ' + this.state.loc + ' with #ChirpAlert!';
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: 'http://www.chirp-alert.com',
      message: message,
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
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../header_sm.png')}>
        </Image>
        <View style={styles.lineOne}>
          <Image
            style={styles.singleBirdImage1}
            source={this.state.image}>
          </Image>
        </View>
        <View>
          <Text style={styles.headerOne}
            onPress={this.getWiki.bind(this)}>
            {this.state.name}
          </Text>
          <TouchableHighlight
            style={styles.playButton}
            onPress={this.getSound.bind(this)}>
           <Image
             style={styles.image}
             source={require('../play.png')}>
           </Image>
         </TouchableHighlight>
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
            Recorded by: {this.state.recordist}
          </Text>
        </View>
        <View style={styles.lastLine}>
          <TouchableHighlight         onPress={this._onSaveButton.bind(this)}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this._onShareButton.bind(this)}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#527FE4',
    borderColor: '#000033',
    borderWidth: 1,
    paddingTop: 75,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#913991',
  },
  image: {
    alignSelf: 'flex-start',
    marginBottom: 20
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontSize: 50,
  },
  buttonText: {
    color: '#57c294',
    fontSize: 42,
    fontFamily: 'Amatic-Bold'
  },
  button: {
    height: 50,
    width: 150,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pun: {
    color: 'white',
    marginBottom: 10
  },
  wikiLink: {
    fontSize: 12,
    color: '#48BBEC',
    textAlign: 'center'
  },
  headerOne: {
    flex: 2,
    fontSize: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffedb8',
    marginBottom: 20,
    fontFamily: 'Amatic-Bold'
  },
  birdInfo: {
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 40,
    color: 'white',
    fontSize: 17
  },
  lineOne: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  lastLine: {
    marginTop: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  singleBirdImage1: {
    alignSelf: 'center',
    width: 64,
    height: 64
  },
  playButton: {
    alignSelf: 'center'
  }
});

module.exports = singleBird
