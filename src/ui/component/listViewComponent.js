import React,{Component} from 'react'
import{
  RefreshControl,
  ListView,
  StyleSheet,
  View,
  Platform,
  ProgressBarAndroid,
  ActivityIndicator
} from 'react-native'
import Dimensions from 'Dimensions'
import httpClient from '../../http/httpClient'
export default class listViewCompoent extends Component{

  constructor(props){
    super(props)
    var data = {
        dataArray:[],
        isLoading:false,
        hasMore:false,
        refreshing:false,
        url:props.url,
        page:1,
        count:15,
        isFirstLoading:true
    }
    this.state = data
    this.requestData('normal')
  }
  render(){
    const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2})
    return(
      <View>
      {this.hideLoadingIndicator()}
      <ListView
      refreshControl={
        <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}
        />
      }
      enableEmptySections={true}
      contentContainerStyle={styles.list}
      dataSource = {ds.cloneWithRows(this.state.dataArray)}
      renderRow = {this._renderRow.bind(this)}
      onScroll={this.loadMore.bind(this)}
      renderFooter={this._renderFooter.bind(this)}
      />
      </View>
    )
  }

  hideLoadingIndicator(){
    if (this.state.isFirstLoading) {
      return(<View style={styles.loadingIndicator}>
      <ActivityIndicator/>
      </View>)
    }
    return null
  }

  _renderRow(rowData,sectionId,rowId){
    return this.props.renderRow(rowData,sectionId,rowId)
  }
  _renderFooter(){
    if (this.state.isLoading && this.state.hasMore) {
        return <View style={styles.progressContainer}><ActivityIndicator/></View>
    }
  }

  loadMore(scrollView){
    let nativeEvent = scrollView.nativeEvent
    let contentOffset = nativeEvent.contentOffset
    let contentSize = nativeEvent.contentSize
    let layoutMeasurement = nativeEvent.layoutMeasurement
    if (contentOffset.y+layoutMeasurement.height>=contentSize.height-1 && !this.state.loading) {
      if (!this.state.isLoading&&this.state.hasMore) {
        this.state.page = this.state.page+1
        this.setState({isLoading:true})
        this.requestData('up')
      }
    }
  }
  _onRefresh(){
    this.requestData('pull')
    this.setState({refreshing:true,hasMore:false})
  }


  requestData(action){
    var that = this;
    if( action ==='pull' || action === 'normal'){
      this.state.page = 1
      this.state.dataArray = []
    }
    let url = this.state.url+"/"+this.state.count+"/"+this.state.page
    httpClient.get(url,this.state.params).then((response)=>{
      if (action === 'normal') {
        that.state.isFirstLoading = false
      }
      if (action === 'pull') {
        that.setState({refreshing:false})
      }
      if (action === 'up') {
        that.state.isLoading = false
      }
      if (response.results.length >= this.state.count) {
        that.state.hasMore = true
      }else{
        that.state.hasMore = false
      }
      that.setState({dataArray:this.state.dataArray.concat(response.results)})
    },(error)=>{
      if (action === 'pull') {
        that.setState({refreshing:false})
      }
      if (action === 'up') {
        that.setState({isLoading:false})
      }
    })
  }
}

const styles = StyleSheet.create({
  loadingIndicator:{
    width:Dimensions.get('window').width,
    position:'absolute',
    top:150,
    left:0,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  list: {
  justifyContent: 'space-around',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
},
  progressContainer:{
    width:Dimensions.get('window').width,
    paddingTop:10,
    paddingBottom:10,
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center'
  }
})
