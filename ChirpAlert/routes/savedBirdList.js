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

class savedBirdList extends Component {
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
      dataSource:this.state.dataSource.cloneWithRows(this.state.birdData,),
    });
  }

	getSound(rowID){
		var birdId = this.state.dataSource._dataBlob.s1[rowID].bird.id;
		var recordingString = 'http:\/\/www.xeno-canto.org\/' + birdId + '\/download';
		console.log(recordingString);
		return LinkingIOS.openURL(recordingString);
	}

	  _goToBird(rowID) {
			var queryString = 'http://127.0.0.1:3000/bird/' + this.state.dataSource._dataBlob.s1[rowID].bird.id;
			console.log(queryString);
	    fetch(queryString)
				.then(function(birdData){
					this.props.navigator.push({
			      component: singleBird,
			      passProps: {bird: JSON.parse(birdData._bodyText)}
			    });
			}.bind(this)).catch(function(err) {
				console.warn(err);
			});
	  }

  renderRow(rowData, sectionID, rowID) {
    return (
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
		      <TouchableHighlight
					 onPress={this._goToBird.bind(this, rowID)}>
						<View style={styles.infoContainer}>
							<View style={styles.columnContainer}>
				        <View style={styles.birdInfo}>
				          <Text style={styles.headerText}>{rowData.bird.name}</Text>
								</View>
								<View style={styles.birdInfo}>
				          <Text style={styles.birdText}>{rowData.bird.loc}</Text>
								</View>
								<View style={styles.birdInfo}>
									<Text style={styles.birdText}>{new Date(rowData.bird.time).toString()}</Text>
								</View>
							</View>
						</View>
		      </TouchableHighlight>
				</View>
			</View>
    );
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
		borderColor: '#2a092a',
		backgroundColor: '#913991',
		padding: 3,
		flexDirection: 'row'
	},
	infoContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		paddingBottom: 20
	},
  headerText: {
    color: '#FFEDB8',
    fontSize: 40,
		fontFamily: 'Amatic-Bold',
  },
  buttonText: {
    color: 'white',
		fontFamily: 'Amatic-Bold',
		fontSize: 24,
  },
	birdText: {
		color: 'white',
		fontSize: 15
	},
  button: {
    height: 50,
    width: 50,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
	columnContainer: {
		flex: 3,
		flexDirection: 'column',
		flexWrap: 'wrap'
	},
  birdInfo: {
		width: 350,
		paddingLeft: 3,
		paddingRight: 3,
		flexWrap: 'wrap',
  },
  playButton: {
    alignSelf: 'center'
  }
});



module.exports = savedBirdList
