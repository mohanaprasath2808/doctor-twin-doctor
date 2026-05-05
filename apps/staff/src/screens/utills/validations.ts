export const validateEmail = (email: string) => {
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const PASSWORD_MIN_LENGTH = 12;

/** Returns a message for toast if invalid; `null` if the password meets rules. */
export const getPasswordValidationError = (password: string): string | null => {
    if (password.length < PASSWORD_MIN_LENGTH) {
        return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
    }
    if (!/[a-zA-Z]/.test(password)) {
        return "Password must include at least one letter";
    }
    if (!/\d/.test(password)) {
        return "Password must include at least one number";
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
        return "Password must include at least one special character";
    }
    return null;
};