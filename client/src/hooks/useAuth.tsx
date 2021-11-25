import { useContext } from 'react';
import { AuthContext } from '../context/auth';

export default function useAuthState() {
    return useContext(AuthContext);
}
