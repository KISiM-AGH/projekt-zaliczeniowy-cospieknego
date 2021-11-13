import { Dispatch } from 'react';
import * as ACTIONS from '../constants/actions';

const API_URL = 'http://localhost:8080/api/v1/';

export const authorize = async (dispatch: Dispatch<any>, token: string) => {
    try {
        const response = await fetch(`${API_URL}/auth`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();

        if (data.id) {
            dispatch({ type: ACTIONS.VERIFY_SUCCESS, payload: data });
            return;
        }

        dispatch({ type: ACTIONS.VERIFY_ERROR, payload: data });
        return;
    } catch (e) {
        dispatch({ type: ACTIONS.VERIFY_ERROR, error: e });
    }
};

export const login = async (dispatch: Dispatch<any>) => {
    // TEST
    try {
        const input = { email: 'test@gmail.com', password: '1234' };
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });
        const data = await response.json();

        if (data.id) {
            dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: data });
            localStorage.setItem('authUser', JSON.stringify(data));
            return;
        }

        dispatch({ type: ACTIONS.LOGIN_ERROR, error: data });
        return;
    } catch (e) {
        dispatch({ type: ACTIONS.LOGIN_ERROR, error: e });
    }
};

export const register = async () => {
    // TEST
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'test@gmail.com',
            password: '1234',
        }),
    });
    const authUser = await response.json();
    localStorage.setItem('authUser', JSON.stringify(authUser));
};

export const logout = async (dispatch: Dispatch<any>) => {
    dispatch({ type: ACTIONS.LOGOUT });
    localStorage.removeItem('authUser');
};
