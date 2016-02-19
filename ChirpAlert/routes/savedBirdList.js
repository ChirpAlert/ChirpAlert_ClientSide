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

var singleBird = require('./singleBird');
var savedBirds = [
  {
    twitterId: 'technocat-Danny',
    bird: {
      id: 299580,
      englishName: 'Red-throated Loon',
      loc: 'Richmond, Contra Costa County, California',
      date: '2016-01-16',
			time: '10:00',
      imageUrl: 'http://phylopic.org/assets/images/submissions/ae2506e3-b97d-45d7-a3f9-1bfb1567e1b1.thumb.png',
      audioUrl: 'http://www.xeno-canto.org/299580/download'
    }
  },
	{
    twitterId: 'technocat-Danny',
    bird: {
      id: 299530,
      englishName: 'Horned Grebe',
      loc: 'Richmond, Contra Costa County, California',
      date: '2016-01-16',
			time: '10:34',
      imageUrl: 'http://phylopic.org/assets/images/submissions/59be555f-7a96-4608-ab71-35ab4f5e77e1.thumb.png',
      audioUrl: 'http://www.xeno-canto.org/299530/download'
    }
  }
]

class savedBirdList extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      birdData: savedBirds,
      dataSource: dataSource
    };
  }
  componentDidMount(){
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(this.state.birdData),
    });
  }

  renderRow(rowData, sectionID, rowID) {
    return (
			<View style={styles.container}>
				<View>
					<TouchableHighlight style={styles.button}>
						<Text style={styles.buttonText}>Play
						</Text>
					</TouchableHighlight>
				</View>
				<View>
		      <TouchableHighlight
					 onPress={this._goToBird.bind(this, rowID)}>
						<View style={styles.infoContainer}>
							<View style={styles.columnContainer}>
				        <View style={styles.birdInfo}>
				          <Text style={styles.headerText}>{rowData.bird.englishName}</Text>
								</View>
							</View>
						</View>
		      </TouchableHighlight>
				</View>
			</View>
    );
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
		marginRight: 10,
		marginLeft: 10
  },
	columnContainer: {
		flex: 3,
		flexDirection: 'column',
	},
  birdInfo: {
		paddingLeft: 3,
		paddingRight: 3,
		flexWrap: 'wrap',
  }
});



module.exports = savedBirdList
