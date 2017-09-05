import React,{Component} from 'react'
import{
  Image,
  TouchableHighlight,
  View,
  StyleSheet,
  Text,
  Modal
}from 'react-native'
import ListViewComponent from '../component/listViewComponent'
import Dimensions from 'Dimensions'
import moment from 'moment'
import ImageViewer from 'react-native-image-zoom-viewer'
export default class homeTab extends Component{
  constructor(){
    super()
    this.state = {images:[],isShow:false}
  }
  render(){
    const type = this.props.type
    var that = this
    return(
      <View>
      <Modal animationType='fade' transparent={true} visible={this.state.isShow}>
      <ImageViewer imageUrls={this.state.images} onClick={()=>{
        that.setState({isShow:false,images:[]})
      }}/>
      </Modal>
      <ListViewComponent url={this.getUrl(type)} renderRow={this.getRow(type).bind(this)}/>
      </View>
      )
  }
  _rendItem(rowData,sectionId,rowId){
    let width = Dimensions.get('window').width/2
    var that = this
    return (<TouchableHighlight onPress={()=>{
      that.setState({isShow:true,images:[{url:rowData.url}]})
    }}>
      <Image resizeMode={'cover'} style={{width:width,height:width}} source={{uri:rowData.url+'?imageView2/0/w/'+width+'/h/'+width}}>
      </Image>
      </TouchableHighlight>)
  }
  _rendIosItem(rowData,sectionId,rowId){
    return this._renderItemByImage(rowData)
  }

  _renderItemByImage(rowData){
    var that = this
    let width = Dimensions.get('window').width
    return(<TouchableHighlight onPress={()=>{
      that.props.navigation.navigate('details',{url:rowData.url,who:rowData.who})}}>
     <View style={{width:width,backgroundColor:'white'}}>
      <View style={styles.content}>
      <View style={styles.item}>
      <View style={{flex:1}}>
      <Text style={styles.title} numberOfLines={2}>{rowData.desc}</Text>
      <Text style={{marginTop:5,fontSize:14,color:'#999999'}}>{rowData.who+"·"+rowData.source+'·'+moment(rowData.publishedAt).endOf('day').fromNow()}</Text>
      </View>
      {that._hideImage(rowData)}
      </View>
      </View>
      <View style={styles.space}></View>
      </View>
     </TouchableHighlight>
    )
  }

  _hideImage(rowData){
    if(this.isHaveImage(rowData)){
      return(<Image
      style={{width:70,height:70,marginLeft:20}}
      source={{uri:rowData.images[0]+'?imageView2/0/w/100/h/100'}}>
      </Image>)
    }
    return null
  }

  isHaveImage(rowData){
    return typeof(rowData.images)!='undefined'
  }

  getUrl(type){
    switch (type) {
      case 'meizhi':
        return 'data/福利';
      case 'ios':
        return 'data/iOS';
      case 'android':
        return 'data/Android';
      case 'rmd':
        return 'data/拓展资源';
      default:
        return 'data/福利'
    }
  }

  getRow(type){
    switch (type) {
      case 'meizhi':
        return this._rendItem.bind(this);
      case 'ios':
        return this._rendIosItem.bind(this);
      case 'android':
        return this._rendIosItem.bind(this);
      case 'rmd':
        return this._rendIosItem.bind(this);
      default:
        return this._rendItem.bind(this);
    }
  }
}
const styles = StyleSheet.create({
  iosItem:{
    flexDirection: 'column',
    width:Dimensions.get('window').width
  },
  content:{
    margin:8
  },
  item:{
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  title:{
    color:'#333333',
    fontSize:16,
    fontWeight:'bold',
  },
  space:{
    height:8,
    backgroundColor:'#eeeeee'
  },
  iconTip:{
    width:70,
    height:70,
    marginLeft:20
  }
})
