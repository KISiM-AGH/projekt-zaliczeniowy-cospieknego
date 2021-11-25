import { AuthState } from '../context/auth';
import * as ACTIONS from '../constants/actions';

export const AuthReducer = (state: AuthState, action: any) => {
    switch (action.type) {
        case ACTIONS.VERIFY:
        case ACTIONS.LOGIN:
            return {
                ...state,
                loading: true,
            };
        case ACTIONS.VERIFY_SUCCESS:
        case ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isLoggedIn: true,
                loading: false,
            };
        case ACTIONS.VERIFY_ERROR:
        case ACTIONS.LOGIN_ERROR:
            return {
                ...state,
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
