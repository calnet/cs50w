// Transaction Types
export interface TransactionType {
    id: number;
    name: string;
    code: string;
    description: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface TransactionLine {
    id?: number;
    line_number: number;
    nominal_code: number;
    nominal_code_name?: string;
    description: string;
    entry_type: 'debit' | 'credit';
    amount: number;
    tax_code?: string;
    tax_rate: number;
    tax_amount: number;
}

export interface Transaction {
    id?: number;
    transaction_number: string;
    transaction_type: number;
    transaction_type_name?: string;
    reference?: string;
    description: string;
    gross_amount: number;
    net_amount: number;
    tax_amount: number;
    transaction_date: string;
    due_date?: string;
    customer?: number;
    customer_name?: string;
    supplier?: number;
    supplier_name?: string;
    bank_account?: number;
    bank_account_name?: string;
    status: 'draft' | 'posted' | 'cancelled' | 'reversed';
    created_by: number;
    created_by_name?: string;
    posted_by?: number;
    posted_date?: string;
    created_at: string;
    updated_at: string;
    lines?: TransactionLine[];
}

export interface PaymentMethod {
    id: number;
    name: string;
    code: string;
    is_active: boolean;
    requires_reference: boolean;
    created_at: string;
}

export interface RecurringTransaction {
    id: number;
    name: string;
    transaction_type: number;
    transaction_type_name?: string;
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
    description_template: string;
    amount: number;
    start_date: string;
    end_date?: string;
    next_due_date: string;
    customer?: number;
    customer_name?: string;
    supplier?: number;
    supplier_name?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// Dashboard Types
export interface DashboardSummary {
    total_transactions: number;
    draft_transactions: number;
    posted_transactions: number;
    total_value: number;
    recent_transactions: Transaction[];
}

// Form Types
export interface TransactionFormData {
    transaction_type: number;
    reference?: string;
    description: string;
    gross_amount: number;
    net_amount: number;
    tax_amount: number;
    transaction_date: string;
    due_date?: string;
    customer?: number;
    supplier?: number;
    bank_account?: number;
    lines: TransactionLine[];
}

// Filter Types
export interface TransactionFilters {
    status?: string;
    transaction_type?: number;
    customer?: number;
    supplier?: number;
    date_from?: string;
    date_to?: string;
    search?: string;
}

// API Response Types
export interface ApiResponse<T> {
    results: T[];
    count: number;
    next?: string;
    previous?: string;
}

export interface TransactionStats {
    total_invoices: number;
    total_payments: number;
    outstanding_invoices: number;
    overdue_invoices: number;
    total_revenue: number;
    total_expenses: number;
}

// Sage-style Report Types
export interface AgedDebtorsReport {
    customer_id: number;
    customer_name: string;
    total_outstanding: number;
    current: number;
    days_30: number;
    days_60: number;
    days_90: number;
    days_over_90: number;
}

export interface ProfitLossReport {
    revenue: {
        sales: number;
        other_income: number;
        total_revenue: number;
    };
    expenses: {
        cost_of_sales: number;
        operating_expenses: number;
        total_expenses: number;
    };
    gross_profit: number;
    net_profit: number;
    period_start: string;
    period_end: string;
}

export interface BalanceSheetReport {
    assets: {
        current_assets: {
            cash: number;
            debtors: number;
            stock: number;
            total: number;
        };
        fixed_assets: {
            property: number;
            equipment: number;
            total: number;
        };
        total_assets: number;
    };
    liabilities: {
        current_liabilities: {
            creditors: number;
            accruals: number;
            total: number;
        };
        long_term_liabilities: {
            loans: number;
            total: number;
        };
        total_liabilities: number;
    };
    equity: {
        share_capital: number;
        retained_earnings: number;
        total_equity: number;
    };
    as_at_date: string;
}
