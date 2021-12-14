import socket from "../../utils/socketConn";
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, ACCOUNT_DELETED } from "../constants/actionTypes";

const INIT_STATE = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default (state = INIT_STATE, action) => {

    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return { ...state, ...action.payload, isAuthenticated: true, loading: false };

        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
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