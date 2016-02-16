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
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class ChirpAlert extends Component {
	componentDidMount() {
	  LinkingIOS.addEventListener('url', this._handleOpenURL);
	}
	componentWillUnmount() {
	  LinkingIOS.removeEventListener('url', this._handleOpenURL);
	}
	_handleOpenURL(event) {
	  var sessionId = event.url.replace('chirpalert://&session=', '');
		AsyncStorage.setItem("session_id", sessionId).then(function() {
			var whatever = AsyncStorage.getItem("session_id");
			whatever.then(function(someshit){
				console.log(someshit);
			});
		});
	}
  _onPressButton() {
    LinkingIOS.openURL(
     'http://127.0.0.1:3000/login/twitter'
    );
   }
//   fetch('http://127.0.0.1:3000/login/twitter')  
//      .then(response => console.log(response))
//      .catch((error) => {
//        console.warn(error);
//      });
  
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
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
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

AppRegistry.registerComponent('ChirpAlert', () => ChirpAlert);
