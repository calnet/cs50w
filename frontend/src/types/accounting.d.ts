// Enhanced Customer Types for Sage-style interface
export interface Customer {
    id: number;
    account_reference: string;
    account_name: string;
    account_status: 'active' | 'inactive' | 'on_hold';
    balance: string; // API returns as string
    contact_name: string;
    credit_limit: string; // API returns as string
    telephone_number: string;
    email?: string;
    address_line_1?: string;
    address_line_2?: string;
    city?: string;
    county?: string;
    postal_code?: string;
    country?: string;
    payment_terms?: number;
    discount_percentage?: number;
    tax_code?: string;
    created_at: string;
    updated_at: string;
}

export interface CustomerStatement {
    customer: Customer;
    opening_balance: number;
    closing_balance: number;
    period_start: string;
    period_end: string;
    transactions: CustomerStatementLine[];
}

export interface CustomerStatementLine {
    date: string;
    reference: string;
    description: string;
    debit: number;
    credit: number;
    balance: number;
    transaction_type: string;
}

export interface CustomerAging {
    customer_id: number;
    customer_name: string;
    total_outstanding: number;
    current: number;
    days_30: number;
    days_60: number;
    days_90: number;
    over_90: number;
    oldest_invoice_date?: string;
}

// Supplier Types
export interface Supplier {
    id: number;
    account_reference: string;
    account_name: string;
    account_status: 'active' | 'inactive' | 'on_hold';
    balance: string; // API returns as string
    contact_name: string;
    credit_limit: string; // API returns as string
    telephone_number: string;
    email?: string;
    address_line_1?: string;
    address_line_2?: string;
    city?: string;
    county?: string;
    postal_code?: string;
    country?: string;
    payment_terms?: number;
    tax_code?: string;
    created_at: string;
    updated_at: string;
}

// Bank Account Types
export interface BankAccount {
    id: number;
    account_type: string;
    account_name: string;
    account_number: string;
    account_sort_code: string;
    account_status: 'active' | 'inactive' | 'closed';
    balance: string; // API returns as string
    credit_limit: string; // API returns as string
    currency: string;
    opening_balance: string; // API returns as string
    opening_balance_date: string;
    bank_name?: string;
    branch_name?: string;
    iban?: string;
    swift_code?: string;
    created_at: string;
    updated_at: string;
}

export interface BankStatement {
    bank_account: BankAccount;
    statement_date: string;
    opening_balance: number;
    closing_balance: number;
    total_debits: number;
    total_credits: number;
    transactions: BankStatementLine[];
}

export interface BankStatementLine {
    date: string;
    description: string;
    reference: string;
    debit: number;
    credit: number;
    balance: number;
    reconciled: boolean;
    reconciled_date?: string;
}

// Chart of Accounts Types
export interface NominalCode {
    id: number;
    nominal_code: string;
    nominal_name: string;
    layout: number;
    layout_name?: string;
    nominal_type: number;
    type_name?: string;
    created_at: string;
    updated_at: string;
}

export interface TrialBalance {
    nominal_code: string;
    account_name: string;
    debit_balance: number;
    credit_balance: number;
    account_type: string;
}

// Reporting Types
export interface ReportPeriod {
    start_date: string;
    end_date: string;
    period_type: 'month' | 'quarter' | 'year' | 'custom';
}

export interface PeriodComparison {
    current_period: ReportPeriod;
    previous_period: ReportPeriod;
    variance_amount: number;
    variance_percentage: number;
}

// Navigation and UI Types
export interface QuickAction {
    id: string;
    title: string;
    description: string;
    icon: string;
    url: string;
    color: string;
    count?: number;
}

export interface DashboardWidget {
    id: string;
    title: string;
    type: 'chart' | 'table' | 'summary' | 'alert';
    size: 'small' | 'medium' | 'large';
    data: any;
    refreshInterval?: number;
}

// Form Validation Types
export interface ValidationError {
    field: string;
    message: string;
}

export interface FormState<T> {
    data: T;
    errors: ValidationError[];
    isLoading: boolean;
    isDirty: boolean;
    isValid: boolean;
}

// Search and Filter Types
export interface SearchFilters {
    query?: string;
    status?: string;
    type?: string;
    date_from?: string;
    date_to?: string;
    amount_from?: number;
    amount_to?: number;
    customer_id?: number;
    supplier_id?: number;
    bank_account_id?: number;
}

export interface SortOption {
    field: string;
    direction: 'asc' | 'desc';
    label: string;
}

// Export Types
export interface ExportOptions {
    format: 'pdf' | 'excel' | 'csv';
    include_headers: boolean;
    date_range?: ReportPeriod;
    filters?: SearchFilters;
}

// User Preferences
export interface UserPreferences {
    default_currency: string;
    date_format: string;
    decimal_places: number;
    show_zero_balances: boolean;
    dashboard_layout: string[];
    theme: 'light' | 'dark' | 'sage';
}
