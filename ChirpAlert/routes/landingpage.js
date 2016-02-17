/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
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

var nextpage = require('./nextpage');

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
  _OnPressThird(){
    this.props.navigator.push({
            title: "Next Page",
            component: nextpage,
            passProps: {message: 'work'},
        });
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
      <Text style={styles.instructions}>
      To get started, edit index.ios.js
      </Text>
      <Text style={styles.instructions}>
      Press Cmd+R to reload,{'\n'}
      Cmd+D or shake for dev menu
        </Text>
        <TouchableOpacity onPress={this._OnPressThird.bind(this)} style={styles.button}>
          <MyButton label="Press Me!"/>
        </TouchableOpacity>
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
