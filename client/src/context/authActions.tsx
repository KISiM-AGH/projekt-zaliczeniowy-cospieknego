import { Dispatch } from 'react';
import * as ACTIONS from '../constants/actions';

interface IUserPromise {
    user?: {
        id: string;
        email: string;
        username: string;
        image_url: string;
        role: string;
        token: string;
    };
    error?: {
        code: string;
        message: string;
    };
}

const API_URL = 'http://localhost:8080/api/v1';

export const authorize = async (
    dispatch: Dispatch<any>,
    token: string
): Promise<void> => {
    try {
        dispatch({ type: ACTIONS.VERIFY });
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

export const login = async (
    dispatch: Dispatch<any>,
    payload: { email: string; password: string; remember: boolean }
): Promise<any> => {
    try {
        dispatch({ type: ACTIONS.LOGIN });
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        const data: IUserPromise = await response.json();

        if (data.user) {
            dispatch({
                type: ACTIONS.LOGIN_SUCCESS,
                payload: data.user,
            });
            localStorage.setItem('authUser', JSON.stringify(data.user));
            return data;
        }

        dispatch({ type: ACTIONS.LOGIN_ERROR, errors: data.user });
        return data;
    } catch (e) {
        dispatch({ type: ACTIONS.LOGIN_ERROR, errors: e });
    }
};

export const signup = async (): Promise<void> => {
    // TEST
    const response = await fetch(`${API_URL}/signup`, {
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
