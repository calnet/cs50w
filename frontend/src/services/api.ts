import axios, { AxiosError, AxiosResponse } from 'axios';

// Types
interface ApiResponse<T = any> {
    status: 'success' | 'error';
    data?: T;
    message?: string;
    errors?: Record<string, string[]>;
    count?: number;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
    next?: string;
    previous?: string;
    count: number;
    results: T[];
}

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (
        import.meta.env.NODE_ENV === 'production' 
            ? 'https://your-api-domain.com/api' 
            : `http://${window.location.hostname}:8000/api`
    ),
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as any;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const response = await axios.post('/auth/token/refresh/', {
                        refresh: refreshToken
                    });
                    
                    const newToken = response.data.access;
                    localStorage.setItem('access_token', newToken);
                    
                    // Retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed, redirect to login
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
        }
        
        return Promise.reject(error);
    }
);

// API Methods
export const apiService = {
    // Generic CRUD operations
    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        const response = await api.get(endpoint, { params });
        return response.data;
    },

    async post<T>(endpoint: string, data: any): Promise<T> {
        const response = await api.post(endpoint, data);
        return response.data;
    },

    async put<T>(endpoint: string, data: any): Promise<T> {
        const response = await api.put(endpoint, data);
        return response.data;
    },

    async patch<T>(endpoint: string, data: any): Promise<T> {
        const response = await api.patch(endpoint, data);
        return response.data;
    },

    async delete<T>(endpoint: string): Promise<T> {
        const response = await api.delete(endpoint);
        return response.data;
    },

    // Specific entity methods
    customers: {
        getAll: (params?: { search?: string; status?: string; page?: number }) =>
            apiService.get<PaginatedResponse<any>>('/customers/', params),
        
        getById: (id: number) =>
            apiService.get<ApiResponse>(`/customers/${id}/`),
        
        create: (data: any) =>
            apiService.post<ApiResponse>('/customers/', data),
        
        update: (id: number, data: any) =>
            apiService.patch<ApiResponse>(`/customers/${id}/`, data),
        
        delete: (id: number) =>
            apiService.delete<ApiResponse>(`/customers/${id}/`),
        
        getStatement: (id: number, params?: { start_date?: string; end_date?: string }) =>
            apiService.get<ApiResponse>(`/customers/${id}/statement/`, params),
        
        getAging: (params?: { as_at_date?: string }) =>
            apiService.get<ApiResponse>('/customers/aging/', params),
    },

    suppliers: {
        getAll: (params?: { search?: string; status?: string; page?: number }) =>
            apiService.get<PaginatedResponse<any>>('/suppliers/', params),
        
        getById: (id: number) =>
            apiService.get<ApiResponse>(`/suppliers/${id}/`),
        
        create: (data: any) =>
            apiService.post<ApiResponse>('/suppliers/', data),
        
        update: (id: number, data: any) =>
            apiService.patch<ApiResponse>(`/suppliers/${id}/`, data),
        
        delete: (id: number) =>
            apiService.delete<ApiResponse>(`/suppliers/${id}/`),
    },

    transactions: {
        getAll: (params?: { 
            search?: string; 
            status?: string; 
            transaction_type?: number;
            customer?: number;
            supplier?: number;
            date_from?: string;
            date_to?: string;
            page?: number;
            ordering?: string;
        }) =>
            apiService.get<PaginatedResponse<any>>('/transactions/', params),
        
        getById: (id: number) =>
            apiService.get<ApiResponse>(`/transactions/${id}/`),
        
        create: (data: any) =>
            apiService.post<ApiResponse>('/transactions/', data),
        
        update: (id: number, data: any) =>
            apiService.patch<ApiResponse>(`/transactions/${id}/`, data),
        
        delete: (id: number) =>
            apiService.delete<ApiResponse>(`/transactions/${id}/`),
        
        post: (id: number, data: any) =>
            apiService.post<ApiResponse>(`/transactions/${id}/post_transaction/`, data),
        
        getDashboardSummary: () =>
            apiService.get<ApiResponse>('/transactions/dashboard_summary/'),
        
        getTypes: () =>
            apiService.get<PaginatedResponse<any>>('/transaction-types/'),
    },

    banking: {
        getAccounts: (params?: { page?: number }) =>
            apiService.get<PaginatedResponse<any>>('/banking/', params),
        
        getById: (id: number) =>
            apiService.get<ApiResponse>(`/banking/${id}/`),
        
        createAccount: (data: any) =>
            apiService.post<ApiResponse>('/banking/', data),
        
        updateAccount: (id: number, data: any) =>
            apiService.patch<ApiResponse>(`/banking/${id}/`, data),
        
        getStatement: (id: number, params?: { start_date?: string; end_date?: string }) =>
            apiService.get<ApiResponse>(`/banking/${id}/statement/`, params),
        
        reconcile: (id: number, data: any) =>
            apiService.post<ApiResponse>(`/banking/${id}/reconcile/`, data),
    },

    reports: {
        getProfitLoss: (params: { start_date: string; end_date: string; comparison?: boolean }) =>
            apiService.get<ApiResponse>('/reports/profit-loss/', params),
        
        getBalanceSheet: (params: { as_at_date: string; comparison?: boolean }) =>
            apiService.get<ApiResponse>('/reports/balance-sheet/', params),
        
        getTrialBalance: (params: { as_at_date: string }) =>
            apiService.get<ApiResponse>('/reports/trial-balance/', params),
        
        getAgedDebtors: (params?: { as_at_date?: string }) =>
            apiService.get<ApiResponse>('/reports/aged-debtors/', params),
        
        getAgedCreditors: (params?: { as_at_date?: string }) =>
            apiService.get<ApiResponse>('/reports/aged-creditors/', params),
        
        getCashFlow: (params: { start_date: string; end_date: string }) =>
            apiService.get<ApiResponse>('/reports/cash-flow/', params),
    },

    chartOfAccounts: {
        getLayouts: () =>
            apiService.get<PaginatedResponse<any>>('/coa_layout/'),
        
        getNominalCodes: (params?: { layout?: number; active_only?: boolean }) =>
            apiService.get<PaginatedResponse<any>>('/nominal_codes/', params),
        
        getCategories: () =>
            apiService.get<PaginatedResponse<any>>('/coa_categories/'),
        
        getNominalTypes: () =>
            apiService.get<PaginatedResponse<any>>('/nominal_types/'),
    },

    auth: {
        login: async (email: string, password: string) => {
            const response = await api.post('/auth/token/', { email, password });
            const { access, refresh } = response.data;
            
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            
            return response.data;
        },

        logout: () => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        },

        register: (userData: any) =>
            apiService.post<ApiResponse>('/auth/register/', userData),
    },
};

export default api;
