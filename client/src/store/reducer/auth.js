import socket from "../../utils/socketConn";
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR,LOADER_TRUE,LOADER_FALSE, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED } from "../constants/actionTypes";

const INIT_STATE = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null
};

export default (state = INIT_STATE, action) => {

    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem("isAthenticated", "true");
            return { ...state, ...action.payload, isAuthenticated: true, loading: false };

        case REGISTER_FAIL:
        case LOADER_FALSE:
            return {...state, loading: false}
        case LOADER_TRUE:
            return {...state, loading: true}
        case LOGIN_FAIL:
            return {...state, loading: false}
        case LOGOUT:
            localStorage.removeItem("isAthenticated");
            localStorage.removeItem("localproject");
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            socket._instance?.connected && socket.getInstance().disconnect();
            // console.log("logout reducer matched")
            return { ...state, token: null, isAuthenticated: false, loading: false };

        case USER_LOADED:
            return { ...state, isAuthenticated: true, loading: false, user: action.payload }

        default:
            return state;
    }
}