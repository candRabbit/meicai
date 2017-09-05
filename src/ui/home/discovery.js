import React,{Component} from 'react'
import{
  View,
  TextInput,
  StyleSheet,
  Platform,
  Color
}from 'react-native'
import HomeTab from './homeTab'
export default class discovery extends Component{
  static navigationOptions = {
   tabBarLabel: '发现',
   title:'发现'
 }
 render(){
   var that = this
   return (
     <View style={styles.content}>
     <TextInput style={styles.search}
     placeholder='搜索'
     clearButtonMode='while-editing'
     underlineColorAndroid='transparent'
     returnKeyType={Platform.os=='ios'?'go':'search'}
     >
     </TextInput>
    <HomeTab type="rmd" navigation={that.props.navigation} />
     </View>)
 }
}
const styles = StyleSheet.create({
  content:{
    backgroundColor:'white',
    flex:1,
    flexDirection:'column'
  },
  search:{
    marginBottom:2,
    paddingLeft:10,
    paddingRight:10,
    height:50,
    backgroundColor:'white',
    elevation:5,
    shadowOffset:{width:0,height:1},
    shadowOpacity: 0.5
  }
})
