import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/config';

export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, error: null };
    } catch (error) {
        console.error('❌ Reset Error:', error.code, error.message);
        return { success: false, error };
    }
};
