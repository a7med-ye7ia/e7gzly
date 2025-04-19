import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/config';

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user, error: null };
    } catch (error) {
        console.error('❌ Login Error:', error.code, error.message);
        return { user: null, error };
    }
};
