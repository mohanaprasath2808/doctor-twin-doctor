export const validateEmail = (email: string) => {
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const NAME_MIN_LENGTH = 1;
const PHONE_MIN_DIGITS = 10;

export const validateRequiredName = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) {
        return "This field is required";
    }
    if (trimmed.length < NAME_MIN_LENGTH) {
        return `Must be at least ${NAME_MIN_LENGTH} characters`;
    }
    if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
        return "Only letters, spaces, hyphens, and apostrophes are allowed";
    }
    return null;
};

export const validatePhone = (phone: string): string | null => {
    const trimmed = phone.trim();
    if (!trimmed) {
        return "Phone number is required";
    }
    const digits = trimmed.replace(/\D/g, "");
    if (digits.length < PHONE_MIN_DIGITS) {
        return `Enter at least ${PHONE_MIN_DIGITS} digits`;
    }
    return null;
};

export const validateEmailField = (email: string): string | null => {
    const trimmed = email.trim();
    if (!trimmed) {
        return "Email is required";
    }
    if (!validateEmail(trimmed)) {
        return "Enter a valid email address";
    }
    return null;
};

export type StaffFormFieldErrors = {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    password?: string;
    dob?: string;
    role?: string;
};

export type StaffFormValues = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    dob: Date | null;
    role: string | null;
};

export const validateStaffForm = (
    values: StaffFormValues,
    isEdit: boolean,
): StaffFormFieldErrors => {
    const errors: StaffFormFieldErrors = {};

    const firstNameError = validateRequiredName(values.firstName);
    if (firstNameError) {
        errors.firstName = firstNameError;
    }

    const lastNameError = validateRequiredName(values.lastName);
    if (lastNameError) {
        errors.lastName = lastNameError;
    }

    const phoneError = validatePhone(values.phone);
    if (phoneError) {
        errors.phone = phoneError;
    }

    const emailError = validateEmailField(values.email);
    if (emailError) {
        errors.email = emailError;
    }

    if (!isEdit) {
        if (!values.password.trim()) {
            errors.password = "Password is required";
        } else {
            const passwordError = getPasswordValidationError(values.password);
            if (passwordError) {
                errors.password = passwordError;
            }
        }
    }

    if (!values.dob) {
        errors.dob = "Date of birth is required";
    }

    if (!values.role) {
        errors.role = "Role is required";
    }

    return errors;
};

const PASSWORD_MIN_LENGTH = 8;

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