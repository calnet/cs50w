
import { GridValidRowModel } from '@mui/x-data-grid';
import { formatTimestamp, pad4 } from './formatUtils';

export function formatDialogFormRow(row: GridValidRowModel | null, dialog: string) {
    if (!row) return row;
    switch (dialog) {
        case 'BankingAccountListDialog':
            return {
                ...row,
                opening_balance_date: formatTimestamp(row.opening_balance_date),
                created_at: formatTimestamp(row.created_at),
                updated_at: formatTimestamp(row.updated_at),
            };
        case 'CoaLayoutDialog':
            return {
                ...row,
                nominal_code_min: pad4(row.nominal_code_min),
                nominal_code_max: pad4(row.nominal_code_max),
                created_at: formatTimestamp(row.created_at),
                updated_at: formatTimestamp(row.updated_at),
            };
        case 'NominalCodeDialog':
            return {
                ...row,
                nominal_code: pad4(row.nominal_code),
                created_at: formatTimestamp(row.created_at),
                updated_at: formatTimestamp(row.updated_at),
            };
        case 'CoaCategoryDialog':
        case 'NominalTypeDialog':
        case 'CustomerDialog':
        case 'SupplierDialog':
            return {
                ...row,
                created_at: formatTimestamp(row.created_at),
                updated_at: formatTimestamp(row.updated_at),
            };
        default:
            return row;
    }
}
