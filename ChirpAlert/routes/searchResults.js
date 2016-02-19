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
        <View style={styles.lineOne}>
          <Text style={styles.headerOne}> {rowData.en} </Text>
          <Text style={styles.subHeader}> {rowData.en} </Text>
						<TouchableHighlight
	            onPress={this.getSound.bind(this, rowID)}>
	           <Image
	             style={styles.image}
	             source={require('../play.png')}>
	           </Image>
	         </TouchableHighlight>
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
  wikiLink: {
    fontSize: 12,
  },
  headerOne: {
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subHeader: {
    flex: 1,
  },
  birdInfo: {
    padding: 10,
  },
  birdPic: {
    width: 50,
    height: 50
  },
  playIcon: {
    width: 50,
    height: 50
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
    borderColor: 'lightgrey',
    borderStyle: 'solid',
    borderWidth: 1,
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



module.exports = searchResults
