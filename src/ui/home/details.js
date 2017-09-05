import React,{Component} from 'react'
import{
  WebView,
  BackHandler,
  Platform,
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
  AsyncStorage
}from 'react-native'
export default class details extends Component{


  static navigationOptions = ({navigation}) =>{
    return{
      title:`${navigation.state.params.who}`,
      headerLeft:<TouchableHighlight underlayColor='transparent' onPress={()=>{navigation._popBack()}} style={{paddingLeft:8,paddingRight:8,alignItems:'center'}}><Image source={require('../../assets/back-icon.android.png')}/></TouchableHighlight>
      ,headerRight:<TouchableHighlight underlayColor='transparent' onPress={()=>{navigation._likeHandler()}} style={{paddingLeft:8,paddingRight:8,alignItems:'center'}}><Image source={require('../../assets/love_white.png')}/></TouchableHighlight>
    }
    }

  constructor(){
    super()
    this.state = {canGoBack:false}
    if(Platform.OS === 'android'){
      BackHandler.addEventListener('hardwareBackPress',()=>{
      if (this.state.canGoBack) {
        this.refs._webView.goBack()
        return true
      }
        return false;
      })
    }
  }

  _popBack(){
    if (this.state.canGoBack) {
      this.refs._webView.goBack()
    }else{
      this.props.navigation.goBack()
    }
  }
  _likeHandler(){
    AsyncStorage.setItem('like',this.props.navigation.state.params.url,(error,result)=>{
      console.log(error);
      console.log(result);
    })
  }

  render(){
    return(<WebView ref="_webView"
    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
    source={{uri:this.props.navigation.state.params.url}}>
    </WebView>)
  }

  onNavigationStateChange(e){
    this.state = {canGoBack:e.canGoBack}
  }
   componentDidMount(){
     AsyncStorage.getItem('like',(error,result)=>{
       console.log(result);
     })
   this.props.navigation._popBack = this._popBack.bind(this)
   this.props.navigation._likeHandler = this._likeHandler.bind(this)
  }
}
const styles = StyleSheet.create({
  button:{

  }
})
