import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE } from "../constants/actionTypes";
import axios from "axios";
import setAuthToken from '../../utils/setAuthToken';
import { getAllProjects } from "./project";




// Load user - this hits the api/auth route that gets the user data like name email gravatar token etc
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({ type: USER_LOADED, payload: res.data });
        dispatch(getAllProjects());
    } catch (err) {
        dispatch({ type: AUTH_ERROR });
    }
}


// Register user
export const register = ({ name, email, password }) => async dispatch => {

    //POST request therefore setting up headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });

    //hitting the route and dispatching the action which saves token in localstorage and isAuthentiated: true
    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        dispatch(loadUser());   //after registration, also load user data

    } catch (err) {
        const errors = err.response.data.errors;    //fetching response from the backend user's post route

        if (errors) {
            //setAlert(msg, alertType, timeout-optional)
            console.error(errors);
        }

        //removes token from localstorage
        dispatch({ type: REGISTER_FAIL });
    }
}


// Login user
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        dispatch(loadUser());   //after logging in, also load user data

    } catch (err) {

        if (err) {
            console.error(err);
        }

        dispatch({ type: LOGIN_FAIL });
    }
}


// Logout user
export const logout = () => dispatch => {
    // console.log("logout action called")
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
}



