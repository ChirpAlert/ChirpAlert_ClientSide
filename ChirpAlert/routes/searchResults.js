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
var savedBirds = [
  {
    twitterId: 'bestbird',
    bird: {
      id: 3,
      englishName: 'sparrow',
      loc: 'denver',
      timeSaved: 'this morning',
      imageUrl: 'google it',
      audioUrl: 'google it'
    }
  },
  {
    twitterId: 'yahoobird',
    bird: {
      id: 8,
      englishName: 'cardinal',
      loc: 'hawaii',
      timeSaved: 'this morning',
      imageUrl: 'google it',
      audioUrl: 'google it'
    }
  },
  {
    twitterId: 'worstbird',
    bird: {
      id: 9,
      englishName: 'robin',
      loc: 'fremont',
      timeSaved: 'this morning',
      imageUrl: 'google it',
      audioUrl: 'google it'
    }
  }
];

class searchResults extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
          underlayColor='#dddddd'>
        <View>
          <Text>{savedBirds.bird.englishName}</Text>
          <Text>{rowData.title}</Text>
        </View>
      </TouchableHighlight>
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
//   constructor(props) {
//     super(props);
//     var dataSource = new ListView.DataSource(
//       {rowHasChanged: (r1, r2)=>r1.guid !==r2.guid}
//     );
//     this.state = {
//       dataSource: dataSource.cloneWithRows(this.props.listings)
//     };
//   }
//
//   renderRow(rowData, sectionID, rowID) {
//     return (
//       <TouchableHighlight
//         underlayColor = '#dddddd'>
//         <View>
//           <Text>{newbird.englishName}</Text>
//         </View>
//       </TouchableHighlight>
//     );
//   }
//
  // render() {
  //   return (
  //     <View style={styles.box}>
  //       <Text>
  //         hello there
  //       </Text>
  //     </View>
  //   );
  // }
// }
//
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
  birdInfo: {
    padding: 10,
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
