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
  View
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
            title: "",
            component: "",
            passProps: ""
        };
    }
  componentDidMount() {
    LinkingIOS.addEventListener('url', this._handleOpenURL);
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
	_punTime() {
		fetch('http://127.0.0.1:3000/pun').then(function(pun){
			console.log(pun._bodyText);
		});
	}
//  _OnPressThird(){
//    this.props.navigator.push({
//            title: "Next Page",
//            component: nextpage,
//            passProps: {message: 'work'},
//        });
//    }
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

  _onLocateButton(){
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log(position);
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
				}).then(function(data) {
					console.log(data);
				}).catch(function(error) {
					console.log(error);
				});
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
      <Text style={styles.welcome}>
      Welcome to React Native!
      </Text>
      <TouchableHighlight style={styles.button}
      underlayColor='#99d9f4' onPress={this._onPressButton}>
      <Text style={styles.buttonText}>Go</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button}
      underlayColor='#99d9f4' onPress={this._onPressOtherButton}>
      <Text style={styles.buttonText}>Go</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button}
      underlayColor='#99d9f4' onPress={this._onShareButton}>
      <Text style={styles.buttonText}>Share</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button}
			underlayColor='#99d9f4' onPress={this._onLocateButton}>
			<Text style={styles.buttonText}>Find yourself</Text>
			</TouchableHighlight>
      <TouchableHighlight style={styles.button}
			underlayColor='#99d9f4' onPress={this._punTime}>
			<Text style={styles.buttonText}>Get Pun</Text>
			</TouchableHighlight>
      <Text style={styles.instructions}>
      To get started, edit index.ios.js
      </Text>
      <Text style={styles.instructions}>
      Press Cmd+R to reload,{'\n'}
      Cmd+D or shake for dev menu
        </Text>
       {/*<TouchableOpacity onPress={this._OnPressThird.bind(this)} style={styles.button}>
          <MyButton label="Press Me!"/>
        </TouchableOpacity>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
AppRegistry.registerComponent('LandingPage', () => LandingPage);
module.exports = LandingPage;
