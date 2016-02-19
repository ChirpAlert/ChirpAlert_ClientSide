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
// var savedBirds = [
//   {
//     twitterId: 'technocat-Danny',
//     bird: {
//       id: 299580,
//       englishName: 'Red-throated Loon',
//       loc: 'Richmond, Contra Costa County, California',
//       date: '2016-01-16',
// 			time: '10:00',
//       imageUrl: 'http://phylopic.org/assets/images/submissions/ae2506e3-b97d-45d7-a3f9-1bfb1567e1b1.thumb.png',
//       audioUrl: 'http://www.xeno-canto.org/299580/download'
//     }
//   },
// 	{
//     twitterId: 'technocat-Danny',
//     bird: {
//       id: 299530,
//       englishName: 'Horned Grebe',
//       loc: 'Richmond, Contra Costa County, California',
//       date: '2016-01-16',
// 			time: '10:34',
//       imageUrl: 'http://phylopic.org/assets/images/submissions/59be555f-7a96-4608-ab71-35ab4f5e77e1.thumb.png',
//       audioUrl: 'http://www.xeno-canto.org/299530/download'
//     }
//   },
// 	{
// 		twitterId: 'technocat-Danny',
// 		bird: {
// 			id: 244669,
// 			englishName: 'Great Horned Owl',
// 			loc: 'Arvada, Jefferson County, Colorado',
// 			date: '2016-02-14',
// 			time: '22:48',
// 			imageUrl: 'http://phylopic.org/assets/images/submissions/919a6f91-cb0b-4646-9ec2-b6a8b5e4b024.thumb.png',
// 			audioUrl: 'http://www.xeno-canto.org/244669/download'
// 		}
// 	},
// 	{
// 		twitterId: 'technocat-Danny',
// 		bird: {
// 			id: 29370,
// 			englishName: 'Hooded Merganser',
// 			loc: 'Marston Reservoir, Denver Co., Colorado',
// 			date: '2016-01-28',
// 			time: '15:15',
// 			imageUrl: 'http://phylopic.org/assets/images/submissions/6db76232-0ff7-4599-a8c8-0070fd7dd51c.thumb.png',
// 			audioUrl: 'http://www.xeno-canto.org/29370/download'
// 		}
// 	},
// 	{
// 		twitterId: 'technocat-Danny',
// 		bird: {
// 			id: 270526,
// 			englishName: 'Northern Raven',
// 			loc: '897 Panoramic Hwy Bootjack Parking Lot (near  Mill Valley), Marin County, California',
// 			date: '2016-01-17',
// 			time: '00:22',
// 			imageUrl: 'http://phylopic.org/assets/images/submissions/36f21978-8394-47b3-9602-b7a41113103b.thumb.png',
// 			audioUrl: 'http://www.xeno-canto.org/270526/download'
// 		}
// 	},
// 	{
//     twitterId: 'technocat-Danny',
//     bird: {
//       id: 170170,
//       englishName: 'Common Poorwill',
//       loc: 'Richmond, Contra Costa County, California',
//       date: '2016-01-16',
// 			time: '12:10',
//       imageUrl: 'http://phylopic.org/assets/images/submissions/b99fb786-7aa3-4344-aa41-eee1dbca1186.thumb.png',
//       audioUrl: 'http://www.xeno-canto.org/170170/download'
//     }
//   }
// ];

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
      dataSource:this.state.dataSource.cloneWithRows(this.state.birdData),
    });
  }
	// getSound(){
  //   return LinkingIOS.openURL(rowData.bird.audioUrl);
  // }

  renderRow(rowData, sectionID, rowID) {
    return (
			<View style={styles.container}>
				<View style={styles.lineOne}>
		      <TouchableHighlight style={styles.picAndInfo}
					 onPress={this._goToBird.bind(this, rowID)}>
						<View>
							<View>
								<Image style={styles.birdPic}
									source={{uri:rowData.bird.image}}/>
							</View>
							<View style={styles.birdInfo}>
				        <View>
				          <Text style={styles.header}>{rowData.bird.name}</Text>
								</View>
								<View>
				          <Text style={styles.subHeader}>Location: {rowData.bird.loc}</Text>
								</View>
								<View>
									<Text style={styles.subHeader}>Date: {rowData.bird.time}</Text>
								</View>
							</View>
						</View>
		      </TouchableHighlight>
					<View>
						<TouchableHighlight style={styles.button}>
							<Text style={styles.buttonText}>Play
							</Text>
						</TouchableHighlight>
					</View>
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
    backgroundColor: '#527FE4',
    borderColor: '#000033',
    borderWidth: 1,
    // paddingTop: 75,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#913991',
		flexDirection: 'row'
  },
	picAndInfo: {
		flexDirection: 'row',
	},
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontSize: 24,
  },
  buttonText: {
    color: 'white',
  },
  button: {
    height: 50,
    width: 50,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
		textAlign: 'center'
  },
  pun: {
    color: 'white',
    marginBottom: 10
  },
  // wikiLink: {
  //   fontSize: 12,
  // },
  // headerOne: {
  //   flex: 2,
  //   fontSize: 20,
  //   textAlign: 'center',
  //   fontWeight: 'bold',
  // },
  // subHeader: {
  //   flex: 1,
  // },
  birdInfo: {
		color: 'white',
		fontSize: 12
  },
  birdPic: {
    width: 50,
    height: 50,
		margin: 5
  },
  playIcon: {
    width: 100,
    height: 100,
		margin: 5
  },
  lineOne: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  // lastLine: {
  //   justifyContent: 'space-around',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // twitterImage: {
  //   width: 100,
  //   height: 100,
  // },
  // singleBirdImage1: {
  //   width: 100,
  //   paddingTop: 100,
  // },
  // singleBirdImage2: {
  //   width: 100,
  //   paddingTop: 100,
  // },
  // welcome: {
  //   flex: 2,
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 36,
  // },
  // instructions: {
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 5,
  // },
  // buttonText: {
  //   color: 'white',
  //   textAlign: 'center',
  // },
  // addToListButton: {
  //   height: 36,
  //   width: 150,
  //   backgroundColor: '#48BBEC ',
  //   borderColor: '#48BBEC ',
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   marginBottom: 10,
  //   alignSelf: 'stretch',
  //   justifyContent: 'center'
  // }
});



module.exports = savedBirdList
