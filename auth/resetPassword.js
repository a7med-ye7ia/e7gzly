// resetPassword.js
import { updatePassword } from "firebase/auth";
import { auth } from "../services/config";

export const resetPassword = async (newPassword) => {
    try {
        const user = auth.currentUser;

        if (!user) {
            console.error("No authenticated user found.");
        }

        await updatePassword(user, newPassword);

        return { success: true, error: null };
    } catch (error) {
        console.error("❌ Reset Error:", error.code, error.message);
        return { success: false, error };
    }
};
