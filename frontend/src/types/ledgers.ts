// export type BankAccount = {
//     id: number;
//     account_type: string;
//     account_name: string;
//     account_number: number;
//     account_sort_code: string;
//     account_status: string;
//     balance: number;
//     credit_limit: number;
//     currency: string;
//     opening_balance: number;
//     opening_balance_date: string;
//     created_at: string;
//     updated_at: string;
// };

export type CoaCategoryType = {
    id: number;
    category_name: string;
    created_at: string;
    updated_at: string;
};

export type CoaLayoutType = {
    id: number;
    layout: number;
    nominal_type: number;
    layout_name: string;
    nominal_type_name: string;
    nominal_code_min: number;
    nominal_code_max: number;
    created_at: string;
    updated_at: string;
};

type LayoutType = {
    id: number;
    layout_name: string;
    description: string;
    created_at: string;
    updated_at: string;
};

export type NominalType = {
    id: number;
    type_name: string;
    category_name: string;
    created_at: string;
    updated_at: string;
};

export type SupplierType = {
    id: number;
    account_reference: string;
    account_name: string;
    account_status: string;
    balance: number;
    contact_name: string;
    credit_limit: number;
    telephone_number: string;
    created_at: string;
    updated_at: string;
};
