import axios from 'axios'

export default {
    getAPI(URL){
        return axios.get(URL)
        .then(response => {return response;})
        .catch(error => {console.log(error)});
    },
    postAPI(URL,body,content_type){
        return axios.post(URL,body,{headers: {'Content-Type': content_type}})
                .then(response => {return response;})
                .catch(error => console.log(error));
    },
    deleteAPI(URL){
       return axios.delete(URL)
                .then(response => {return response;})
                .catch(error => console.log(error));
    },
    blobPostAPI(URL,body,content_type){
        return axios.post(URL,body, { responseType: 'blob'})
                .then(response => {return response;})
                .catch(error => console.log(error));
    },

    
}