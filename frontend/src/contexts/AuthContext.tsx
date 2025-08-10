import React, { createContext, ReactNode, useContext, useReducer, useEffect } from 'react';
import { apiService } from '../services/api';

// Types
interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isStaff: boolean;
    first_name?: string;
    last_name?: string;
    is_staff?: boolean;
    is_superuser?: boolean;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

type AuthAction =
    | { type: 'LOGIN_START' }
    | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
    | { type: 'LOGIN_FAILURE'; payload: string }
    | { type: 'LOGOUT' }
    | { type: 'CLEAR_ERROR' }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'CHECK_AUTH_SUCCESS'; payload: { user: User; token: string } };

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    clearError: () => void;
}

// Initial state
const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('access_token'),
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                error: null,
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null,
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };
        case 'CHECK_AUTH_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };
        default:
            return state;
    }
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Check authentication status on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        const token = localStorage.getItem('access_token');
        const userInfo = localStorage.getItem('user_info');

        if (token && userInfo) {
            try {
                // Check if token is still valid
                const tokenData = JSON.parse(atob(token.split('.')[1]));
                const currentTime = Date.now() / 1000;

                if (tokenData.exp > currentTime) {
                    // Token is still valid
                    const user = JSON.parse(userInfo);
                    dispatch({
                        type: 'CHECK_AUTH_SUCCESS',
                        payload: { user, token }
                    });
                } else {
                    // Token expired, clear data
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    localStorage.removeItem('user_info');
                }
            } catch (error) {
                console.error('Token validation failed:', error);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('user_info');
            }
        }
        dispatch({ type: 'SET_LOADING', payload: false });
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        dispatch({ type: 'LOGIN_START' });

        try {
            const response = await apiService.auth.login(email, password);

            if (response.access) {
                localStorage.setItem('access_token', response.access);
                localStorage.setItem('refresh_token', response.refresh);

                // Normalize user data
                let user = response.user;
                if (user) {
                    // Convert Django user format to our format
                    const normalizedUser = {
                        id: user.id,
                        email: user.email,
                        firstName: user.first_name || user.firstName || '',
                        lastName: user.last_name || user.lastName || '',
                        isStaff: user.is_staff || user.isStaff || false,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        is_staff: user.is_staff,
                        is_superuser: user.is_superuser
                    };
                    localStorage.setItem('user_info', JSON.stringify(normalizedUser));
                    user = normalizedUser;
                } else {
                    // Create minimal user object if not provided
                    user = {
                        id: 1,
                        email,
                        firstName: '',
                        lastName: '',
                        isStaff: false,
                        first_name: '',
                        last_name: '',
                        is_staff: false,
                        is_superuser: false
                    };
                    localStorage.setItem('user_info', JSON.stringify(user));
                }

                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        user,
                        token: response.access,
                    },
                });

                return true;
            } else {
                throw new Error('No access token received');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.detail ||
                error.response?.data?.non_field_errors?.[0] ||
                error.message ||
                'Login failed';

            dispatch({
                type: 'LOGIN_FAILURE',
                payload: errorMessage,
            });
            return false;
        }
    };

    const logout = () => {
        // Clear local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_info');

        // Optional: Call logout API endpoint
        try {
            apiService.auth.logout();
        } catch (error) {
            console.error('Logout API call failed:', error);
        }

        dispatch({ type: 'LOGOUT' });
    };

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    const value: AuthContextType = {
        ...state,
        login,
        logout,
        clearError,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
