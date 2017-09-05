import React from 'react'

const BASE_URL = "http://gank.io/api/"
const _JSON = "application/json"
const URL_FORM_ECODER = "application/x-www-form-urlencoded"

const httpClient = {
  get:function(url,params){
    return request(url,'GET',params)
  },
  post:function(url,params){
    return request(url,'POST',params)
  },
  put:function(url,params){
    return request(url,'PUT',params)
  },
  delete:function(url,params){return request(url,'DELETE',params)}
}

function request(url,method,params){
return new Promise((resolve,reject)=>{
    var requestUrl = BASE_URL+url
    const header = {
      'content-type':_JSON
    }
    var init = {
      method:method,
      headers:header
    }
    if (method === 'POST' || method === 'PUT') {
      init.body = JSON.stringify(params)
    }else{
      requestUrl += "?"+getUrlFormParams(params)
    }
    var request = new Request(BASE_URL+url,init)
    console.log('请求url:'+request.url);
    //console.log('请求参数:'+params);
    fetch(request).
    then((response) => response.json()).
    then((responseJson)=>{
      console.log('返回数据JSON:'+JSON.stringify(responseJson));
      resolve(responseJson)
    }).catch((error)=>{
      console.log(error);
      reject(error)
    })
  })
}

//post 请求参数
function getUrlFormParams(params){
  if (typeof(params) === 'undefined') {
    return ''
  }
  var strParams = ''
  for(var key in params){
    strParams = strParams + key+'='+params[key]+'&'
  }
  return strParams
}


export default httpClient
