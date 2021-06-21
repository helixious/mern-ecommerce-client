import axios from "axios";
import proxies from '../config/proxy.config';
// const {REACT_APP_AUTH_API_HOST, REACT_APP_AUTH_API_HOST_PATH} = process.env;
// const API_URL = `${REACT_APP_AUTH_API_HOST}/${REACT_APP_AUTH_API_HOST_PATH}/`;
const path = '/api/user';
const url = proxies['/api/user'];
const API_URL = url+path;


const signUp = (username, email, password) => {
    

    
    return axios.post(API_URL + "/signup", {
        username,
        email,
        password,
    },
    {
        withCredentials: true
    });
};

const signIn = (username, password) => {
    let email = username;    
    return axios
        .post(API_URL + "/signin", {
            email,
            password,
        },
        {
            withCredentials: true
        }
        )
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        }).catch((err) => {
            if(err.response.data.message) {
                return err.response.data;
            } else if(err.response.data.errors) {
                let message = err.response.data.errors.map((t) => t.msg).join(' & ');
                return {message};
            }

            return 'server error';
        })
};


const signOut = () => {
    return new Promise(resolve => {
        axios.post(API_URL + "/signout",null, { 
            withCredentials: true
        }).then((response) => {
            resolve(response);
        }).catch((err) => {
            if(err.response.data) {
                console.log(err.response.data);
            }
            resolve(0);
        })
    });
} 

const profile = (setProfile) => {
    return new Promise(resolve => {
        return axios.get(API_URL + "/profile",null, { 
            withCredentials: true
        }).then(res => {
            if(setProfile) setProfile(res.data);
            resolve(res.data);
        }).catch(e => {
            console.log(e);
            resolve(false);
        })
    });
};

const authServices = {
    signUp,
    signIn,
    signOut,
    profile
};

export default authServices;