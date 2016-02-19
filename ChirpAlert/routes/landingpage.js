/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
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

var MyButton = React.createClass({
  render () {
    return (
      <View>
        <Text>{this.props.label}</Text>
      </View>
    )
  },
});

var savedBirdList = require('./savedBirdList');

var searchResults = require('./searchResults');

class LandingPage extends Component {
	constructor(props) {
        super(props);
        this.state = {
            pun: ""
        };
    }
  componentDidMount() {
    LinkingIOS.addEventListener('url', this._handleOpenURL);
    fetch('http://127.0.0.1:3000/pun').then(function(pun){
      this.setState({pun: pun._bodyText});
    }.bind(this));
  }
  componentWillUnmount() {
    LinkingIOS.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL(event) {
    var token = event.url.replace('chirpalert://&token=', '');
    AsyncStorage.setItem("token", token);
  }
  _onPressButton() {
    LinkingIOS.openURL(
      'http://127.0.0.1:3000/auth/login/twitter'
    );
  }
  _onPressOtherButton() {
    AsyncStorage.getItem("token").then(function(token){
      console.log(token);
      fetch('http://127.0.0.1:3000/test', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => console.log(response))
      .catch((error) => {
        console.warn(error);
      });
    });
  }
  _onSaveListButton(){
    AsyncStorage.getItem("token").then(function(token){
      if(token){
        fetch('http://127.0.0.1:3000/users/getbirdlist', {
          method: 'GET',
          headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }).then((data) => data.json())
          .then((responseData) => {
            console.log(responseData);
            this.props.navigator.push({
              title: "Saved Birds",
              component: savedBirdList,
              passProps: {birdData: responseData},
            });
          }).catch((error) => {
            console.warn(error);
          });
        } else {
        LinkingIOS.openURL(
          'http://127.0.0.1:3000/auth/login/twitter'
        );
      }
    }.bind(this));
  }

  _onLocateButton(){
		navigator.geolocation.getCurrentPosition(
			(position) => {
				//console.log(position);
				fetch('http://127.0.0.1:3000/search/location', {
					method: 'POST',
					headers: {
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					body: JSON.stringify(
						{
							latitude: position.coords.latitude,
							longitude: position.coords.longitude
						})
				}).then((data) => data.json())
          .then((responseData) => {
            this.props.navigator.push({
              title: "Search Results",
              component: searchResults,
              passProps: {birdData: responseData},
            });
				})
			},
			(error) => {
				console.log(error.message)
			},
			{enableHighAccuracy:true, timeout: 20000, maximumAge: 1000}
		);
	}

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../header.png')}>
        </Image>
        <Text style={styles.pun}>{this.state.pun}</Text>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={this._onLocateButton.bind(this)}>
            <Image
  						style={styles.image}
      				source={require('../bird_search.png')}>
      			</Image>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this._onSaveListButton.bind(this)}>
            <Image
              style={styles.image}
              source={require('../my_birds.png')}>
            </Image>
          </TouchableHighlight>
        </View>
      </View>
    );
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
    alignItems: 'center',
    backgroundColor: '#913991',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
	image: {

	},
  header: {
    color: 'white',
    fontSize: 60,
  },
  buttonText: {
    color: 'white',
  },
  button: {
    height: 200,
    width: 200,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pun: {
    fontFamily: 'Amatic-Bold',
    color: 'white',
    fontSize: 32,
    marginTop: 15
  }
});
AppRegistry.registerComponent('LandingPage', () => LandingPage);
module.exports = LandingPage;
