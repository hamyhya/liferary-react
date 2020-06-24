import axios from 'axios'

export default (token=null)=>{
  if(token){
    return axios.create({
      headers: {
        'Authorization': 'Bearer '.concat(token)
      }
    })
  } else {
    return axios
  }
}