import httpClient from './httpClient'

const gankIOApi = {
  getMeiZhi:function(){
    httpClient.get('data/福利/10/1')
  }
}
export {gankIOApi}
