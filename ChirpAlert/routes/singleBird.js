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
      bird_id: '',
      title: "Single Bird",
      image: '',
      name: '',
      species: '',
      country: '',
      loc: '',
      recording: 'http:\/\/www.xeno-canto.org\/134880\/download',
      rectype: 'english',
      reclength: 56,
      recordist: "billy"
    };
  }
  componentDidMount(){
    LinkingIOS.addEventListener('url', this._handleOpenURL);
     
    this.setState({
      bird_id: this.props.bird.id,
      name: this.props.bird.en,
      species: this.props.bird.gen + " " + this.props.bird.sp,
      country: this.props.bird.cnt,
      loc: this.props.bird.loc,
      recording: this.props.bird.file,
      rectype: this.props.bird.type,
      recordist: this.props.bird.rec
    })
    fetch('http://127.0.0.1:3000/birds', {
      method: 'POST',
      headers: {
             'Accept' : 'application/json',
             'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        gen: this.props.bird.gen,
        species: this.props.bird.sp
      })
    })
      .then(response => this.setState({
        image: response._bodyText 
      })
      )
      .catch((error) => {
        console.warn(error)
      })
    }
  componentWillUnmount() {
    LinkingIOS.removeEventListener('url', this._handleOpenURL);
  }
  getSound(){
    return LinkingIOS.openURL(this.state.recording);
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
        })
        .then(response => console.log(response))
        .catch((error) => {
          console.warn(error);
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
  }
  _onShareButton(){
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: 'http://chirpalert.com',
      message: 'I heard this bird on #chirpalert',
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
        <View style={styles.lineOne}>
          <Image
            style={styles.singleBirdImage1}
            source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
            />
          <TouchableHighlight style={styles.button} underlayColor='#99d9f4 ' onPress={this.getSound.bind(this)}>
           <Text style={styles.buttonText}>Play sound</Text>
         </TouchableHighlight>
        </View>
        <View>
          <Text style={styles.headerOne}>
            {this.state.name}
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
            Recorded by: {this.state.recordist}
          </Text>
        </View>
        <View style={styles.lastLine}>
          <TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this._onSaveButton.bind(this)}>
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontSize: 60,
  },
  buttonText: {
    color: 'white',
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
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  birdInfo: {
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 40,
    color: 'white'
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
});

module.exports = singleBird
