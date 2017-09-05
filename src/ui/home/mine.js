import React,{Component}from 'react'
import{
  ListView,
  TouchableHighlight,
  Image,
  Text,
  StyleSheet,
  View
}from 'react-native'
export default class mine extends Component{
  static navigationOptions = {
   tabBarLabel: '我的',
   title:'我的'
 }
constructor(){
  super()
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    dataSource:
    ds.cloneWithRows([
    {ic:require('../../assets/love.png'),text:'我喜欢的'},
    {ic:require('../../assets/read.png'),text:'阅读过的文章'}])
  };
  }
  render(){
    return(<ListView
      style={{paddingTop:20}}
      dataSource={this.state.dataSource}
      renderRow={this.renderItem}>
      </ListView>)
  }

  renderItem(rowData,sectionID,rowID){
    return(<TouchableHighlight>
       <View style={styles.item}>
       <Image source={rowData.ic}></Image>
       <Text style={styles.text}>{rowData.text}</Text>
       </View>
      </TouchableHighlight>)
  }
}
const styles = StyleSheet.create({
  item:{
    paddingLeft:10,
    paddingRight:10,
    height:40,
    backgroundColor:'white',
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth:0.5,
    borderBottomColor:'#eeeeee'
  },
  text:{
    marginLeft:8,
    fontSize:14,
    color:'#333333'
  }
})
