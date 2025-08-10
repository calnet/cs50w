import { FormField } from '../types/FormField';

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

/**
 * Returns a validation error message for a given field and value, or an empty string if valid.
 * @param field - The form field definition
 * @param value - The value to validate
 * @returns Error message or empty string
 */
export function getFieldError(field: FormField, value: string): string {
    // Trim whitespace for validation
    const trimmedValue = value.trim();

    // Required field validation
    if (field.required && trimmedValue === '') {
        return `${field.label} is required`;
    }

    // Skip other validations if field is empty and not required
    if (trimmedValue === '' && !field.required) {
        return '';
    }

    // Type-specific validations
    switch (field.type) {
        case 'number':
            if (isNaN(Number(trimmedValue))) {
                return 'Please enter a valid number';
            }
            if (Number(trimmedValue) < 0) {
                return 'Number cannot be negative';
            }
            break;

        case 'email':
            if (!EMAIL_REGEX.test(trimmedValue)) {
                return 'Please enter a valid email address';
            }
            break;

        case 'tel':
        case 'phone':
            if (!PHONE_REGEX.test(trimmedValue.replace(/[\s\-\(\)]/g, ''))) {
                return 'Please enter a valid phone number';
            }
            break;

        case 'text':
            if (trimmedValue.length < 2) {
                return `${field.label} must be at least 2 characters long`;
            }
            if (trimmedValue.length > 255) {
                return `${field.label} cannot exceed 255 characters`;
            }
            break;

        case 'url':
            try {
                new URL(trimmedValue);
            } catch {
                return 'Please enter a valid URL';
            }
            break;
    }

    // Field-specific validations based on field ID
    switch (field.id) {
        case 'account_reference':
            if (trimmedValue.length < 3) {
                return 'Account reference must be at least 3 characters';
            }
            break;

        case 'nominal_code':
            if (trimmedValue.length !== 4) {
                return 'Nominal code must be exactly 4 digits';
            }
            break;

        case 'account_number':
            if (trimmedValue.length < 8) {
                return 'Account number must be at least 8 digits';
            }
            break;

        case 'account_sort_code':
            const sortCode = trimmedValue.replace(/[\s\-]/g, '');
            if (sortCode.length !== 6) {
                return 'Sort code must be 6 digits';
            }
            break;
    }

    return '';
}

/**
 * Validates all fields in a form row and returns an object of errors keyed by field id.
 * @param fields - Array of form field definitions
 * @param row - The data object to validate (defaults to empty object)
 * @returns Object of errors keyed by field id
 */
export function validateAllFields(fields: FormField[], row: Record<string, unknown> = {}): Record<string, string> {
    const errors: Record<string, string> = {};

    fields.forEach((field) => {
        const value = row && row[field.id] ? String(row[field.id]) : '';
        const error = getFieldError(field, value);
        if (error) {
            errors[field.id] = error;
        }
    });

    return errors;
}

/**
 * Checks if a form has any validation errors
 * @param fields - Array of form field definitions
 * @param row - The data object to validate
 * @returns Boolean indicating if form is valid
 */
export function isFormValid(fields: FormField[], row: Record<string, unknown> = {}): boolean {
    const errors = validateAllFields(fields, row);
    return Object.keys(errors).length === 0;
}

/**
 * Gets a summary of validation errors for display
 * @param fields - Array of form field definitions
 * @param row - The data object to validate
 * @returns Array of error messages with field labels
 */
export function getValidationSummary(fields: FormField[], row: Record<string, unknown> = {}): string[] {
    const errors = validateAllFields(fields, row);
    return Object.entries(errors).map(([fieldId, error]) => {
        const field = fields.find((f) => f.id === fieldId);
        const label = field ? field.label : fieldId;
        return `${label}: ${error}`;
    });
}
