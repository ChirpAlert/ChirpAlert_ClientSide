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


class NextPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: this.props.message
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>
                    A message to you: {this.props.message}!
                </Text>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: "center"
    },
    heading: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: "center",
        color: "#656565"
    },
    subheading: {
        color: "#cccccc"
    }
});
module.exports = NextPage;
