'use strict';
import React, {
	AsyncStorage,
  AppRegistry,
  DataSource,
  Component,
  LinkingIOS,
  StyleSheet,
  Image,
  ListView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var singleBird = require('./singleBird');

class searchResults extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      birdData: this.props.birdData,
      dataSource: dataSource
    };
  }
  componentDidMount(){
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(this.state.birdData),
    })
  }

	getSound(rowID){
		var birdId = this.state.dataSource._dataBlob.s1[rowID].id;
		var recordingString = 'http:\/\/www.xeno-canto.org\/' + birdId + '\/download';
		return LinkingIOS.openURL(recordingString);
	}

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
          underlayColor='#dddddd' onPress={this._goToBird.bind(this, rowData)}>
				<View style={styles.container}>
					<View>
						<TouchableHighlight
	            onPress={this.getSound.bind(this, rowID)}>
	           <Image
	             style={styles.image}
	             source={require('../play.png')}>
	           </Image>
	         </TouchableHighlight>
					</View>
					<View>
	          <Text style={styles.headerText}> {rowData.en} </Text>
	        </View>
				</View>
      </TouchableHighlight>
    );
  }
  _goToBird(rowData) {
//    console.log(rowID);
    this.props.navigator.push({
      component: singleBird,
      passProps: {bird: rowData}
    })
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderColor: '#000033',
		borderWidth: 1,
		backgroundColor: '#913991',
		padding: 3,
		flexDirection: 'row'
	},
	infoContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start'
	},
  headerText: {
    color: '#FFEDB8',
    fontSize: 32,
		fontFamily: 'Amatic-Bold',
  },
  buttonText: {
    color: 'white',
		fontFamily: 'Amatic-Bold',
		fontSize: 24,
  },
	birdText: {
		color: 'white',
		fontSize: 12,
	},
  button: {
    height: 50,
    width: 50,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
		marginLeft: 10,
		marginRight: 10
  },
	columnContainer: {
		flex: 3,
		flexDirection: 'column',
		flexWrap: 'wrap'
	},
  birdInfo: {
		paddingLeft: 3,
		paddingRight: 3,
		flexWrap: 'wrap',
  }
});


module.exports = searchResults
