import React from 'react'
import{StackNavigator,TabNavigator} from 'react-navigation'
import{
  StyleSheet,
  Image
}from 'react-native'
import Home from './ui/home/home'
import Discovery from './ui/home/discovery'
import Mine from './ui/home/mine'
import Details from './ui/home/details'

const main = TabNavigator({
  home:{
    screen:Home,
    navigationOptions:getTabNavigationOptions(require('./assets/home.png'))
  },
  discovery:{
    screen:Discovery,
    navigationOptions:getTabNavigationOptions(require('./assets/discovery.png'))
  },
  mine:{
    screen:Mine,
    navigationOptions:getTabNavigationOptions(require('./assets/mine.png'))
  }
  },{
    //动画失效之后条状不会卡顿
    animationEnabled:false,
    tabBarPosition:'bottom',
    lazy:true,
    //d
    swipeEnabled:false,
    tabBarOptions:{
      indicatorStyle:{
        height:0
      },
      showIcon:true,
      showLabel:false,
      style:{
        backgroundColor:'white',
      },
      activeTintColor:'#007fff',
      inactiveTintColor:'#909090',
      // labelStyle: {fontSize: 11,marginTop:0,marginBottom:0},
      // tabStyle:{height:48}
    }
})

function getTabNavigationOptions(ic){
  const navigationOptions = {
    tabBarIcon:({tintColor})=>(
    <Image
   resizeMode="contain"
   source={ic}
   style={[styles.icon, {tintColor: tintColor}]}
       />
    )
  }
  return navigationOptions
}

const router = StackNavigator({
  main:{
    screen:main,
    navigationOptions: ({navigation}) => ({
     headerStyle:styles.headStyle,
     headerTitleStyle:styles.headerTitleStyle,
   }),
  },
  details:{
    screen:Details,
    navigationOptions: ({navigation}) => ({
     headerStyle:styles.headStyle,
     headerTitleStyle:styles.headerTitleStyle,
     headerTintColor:'white',
   })
  }
})

const styles = StyleSheet.create({
  icon: {
   width:21,
   height:21,
 },
 headStyle:{
   backgroundColor:'#007fff',
   elevation:0
 },
 headerTitleStyle:{
   color:'white'
 },
 tabStyle:{
   height:48
 }
})

export default router
