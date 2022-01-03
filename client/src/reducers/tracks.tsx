import { AuthState } from '../context/auth';
import * as ACTIONS from '../constants/actions';

export const TracksReducer = (state: AuthState, action: any) => {
    switch (action.type) {
        case ACTIONS.FETCH_INIT:
            return {
                ...state,
                loading: true,
                trackData: null,
            };
        case ACTIONS.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                trackData: action.payload,
            };
        case ACTIONS.FETCH_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.errors,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
