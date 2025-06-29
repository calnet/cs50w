import { FormField } from "../types/FormField";

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
/**
 * Returns a validation error message for a given field and value, or an empty string if valid.
 */
export function getFieldError(field: FormField, value: string): string {
    if (field.required && value.trim() === '') {
        return 'This field is required';
    }
    if (field.type === 'number') {
        if (value && isNaN(Number(value))) {
            return 'Please enter a valid number';
        }
        if (value && Number(value) <= 0) {
            return 'Number must be positive';
        }
    }
    
    // Custom email validation
    if (field.type === 'email') {
        if (value && !EMAIL_REGEX.test(value)) {
            return 'Please enter a valid email address';
        }
    }
    
    // Add more field type validations here as needed
    return '';
}

/**
 * Validates all fields in a form row and returns an object of errors keyed by field id.
 */
export function validateAllFieldsWithRow(fields: FormField[], row: Record<string, unknown>): Record<string, string> {
    const errors: Record<string, string> = {};
    fields.forEach((field) => {
        const value = row?.[field.id] ? String(row[field.id]) : '';
        const error = getFieldError(field, value);
        if (error) errors[field.id] = error;
    });
    return errors;
}
