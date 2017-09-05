import React,{Component} from 'react'
import{
  StyleSheet
}from 'react-native'
import ScrollableTabView,{ScrollableTabBar}from 'react-native-scrollable-tab-view'
import HomeTab from './homeTab'
export default class home extends Component{
  static navigationOptions = {
   tabBarLabel: '首页',
   title:'首页'
 }
  render(){
    var that = this
    return(<ScrollableTabView
      locked={true}
      tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
      tabBarActiveTextColor="#007fff"
      tabBarInactiveTextColor="#909090"
      tabBarBackgroundColor="white"
       renderTabBar={() => <ScrollableTabBar />}
      >
        <HomeTab type="meizhi" tabLabel="妹纸" navigation={that.props.navigation} />
        <HomeTab type="ios" tabLabel="IOS" navigation={that.props.navigation} />
        <HomeTab type="android" tabLabel="Android" navigation={that.props.navigation}/>
      </ScrollableTabView>)
  }
}

const styles = StyleSheet.create({
  tabBarUnderlineStyle:{
    backgroundColor:'#007fff',
    height:3
  }
})
