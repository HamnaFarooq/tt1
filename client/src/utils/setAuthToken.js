import axios from 'axios';

//checks for token in local storage and if finds it then sets it as a header parameter through axios else deletes it
const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    }
    else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;