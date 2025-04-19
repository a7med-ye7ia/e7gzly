import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/config';

export const signUpUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { user: userCredential.user, error: null };
    } catch (error) {
        console.error('❌ Firebase error:', error.code, error.message);
        return { user: null, error };
    }
};
