import { AuthState } from '../context/authContext';
import * as ACTIONS from '../constants/actions';

export const AuthReducer = (state: AuthState, action: any) => {
    switch (action.type) {
        case ACTIONS.VERIFY:
            return {
                ...state,
                loading: true,
                isLoggedIn: false,
            };
        case ACTIONS.LOGIN:
            return {
                ...state,
                isLoggedIn: false,
            };
        case ACTIONS.VERIFY_SUCCESS:
        case ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isLoggedIn: true,
                loading: false,
            };
        case ACTIONS.VERIFY_FAILED:
        case ACTIONS.LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
            };
        case ACTIONS.VERIFY_ERROR:
        case ACTIONS.LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.errors,
            };
        case ACTIONS.LOGOUT:
            return {
                ...state,
                currentUser: {},
                isLoggedIn: false,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
