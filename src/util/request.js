import axios from 'axios'
const request = axios.create({
  url:''
})
request.$post = function (url,){
  console.lot(url)
}
export default request