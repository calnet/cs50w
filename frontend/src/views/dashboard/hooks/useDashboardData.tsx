import {
    AccountBalance as BankIcon,
    Business as BusinessIcon,
    Calculate as CalculatorIcon,
    CreditCard as CreditCardIcon,
    Dashboard as DashboardIcon,
    Message as MessageIcon,
    People as PeopleIcon,
    PersonAdd as PersonAddIcon,
    TableView as TableIcon,
    LocalShipping as TruckIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material';

export const useDashboardData = () => {
    const theme = useTheme();

    // Core business modules based on your actual views
    const coreModules = [
        {
            name: "Banking",
            description: "Manage bank accounts and reconciliation",
            icon: BankIcon,
            url: "/banking",
            color: theme.palette.primary.main,
            subViews: [
                "Banking Accounts",
                "Banking Reconciliation",
                "Banking Statements"
            ]
        },
        {
            name: "Chart of Accounts",
            description: "Manage COA structure and nominal codes",
            icon: CalculatorIcon,
            url: "/coa",
            color: theme.palette.success.main,
            subViews: [
                "Layouts",
                "COA Categories",
                "COA Layout",
                "Nominal Types",
                "Nominal Codes",
                "COA Control Accounts"
            ]
        },
        {
            name: "Customers",
            description: "Customer account management",
            icon: PeopleIcon,
            url: "/customers",
            color: theme.palette.secondary.main,
            subViews: [
                "Customer List",
                "Customer Invoices",
                "Customer Sales Orders"
            ]
        },
        {
            name: "Suppliers",
            description: "Supplier account management",
            icon: TruckIcon,
            url: "/suppliers",
            color: theme.palette.warning.main,
            subViews: [
                "Supplier List",
                "Supplier Invoices",
                "Supplier Purchase Orders"
            ]
        }
    ];

    // Utility and development views
    const utilityViews = [
        {
            name: "Utilities",
            description: "Table components and UI utilities",
            icon: TableIcon,
            url: "/utilities",
            color: theme.palette.info.main,
            subViews: [
                "Basic Table",
                "Data Table",
                "Dense Table",
                "Enhanced Table",
                "Sticky Head Table"
            ]
        },
        {
            name: "Dialogs",
            description: "Form and draggable dialog components",
            icon: MessageIcon,
            url: "/utilities/dialogs",
            color: theme.palette.error.main,
            subViews: [
                "Form Dialog",
                "Draggable Dialog"
            ]
        }
    ];

    // Quick action buttons for common tasks
    const quickActions = [
        {
            name: "Dashboard",
            description: "Main overview",
            icon: DashboardIcon,
            url: "/dashboard",
            color: theme.palette.grey[700]
        },
        {
            name: "New Customer",
            description: "Add customer account",
            icon: PersonAddIcon,
            url: "/customers/new",
            color: theme.palette.success.main
        },
        {
            name: "New Supplier",
            description: "Add supplier account",
            icon: BusinessIcon,
            url: "/suppliers/new",
            color: theme.palette.warning.main
        },
        {
            name: "Bank Account",
            description: "Add bank account",
            icon: CreditCardIcon,
            url: "/banking/new",
            color: theme.palette.info.main
        }
    ];

    // Sample metrics for the accounting system
    const systemMetrics = [
        { label: "Bank Accounts", value: "12", change: "+2", trend: "up", icon: BankIcon },
        { label: "Active Customers", value: "247", change: "+18", trend: "up", icon: PeopleIcon },
        { label: "Active Suppliers", value: "89", change: "+5", trend: "up", icon: TruckIcon },
        { label: "Nominal Codes", value: "156", change: "+8", trend: "up", icon: CalculatorIcon }
    ];

    return {
        coreModules,
        utilityViews,
        quickActions,
        systemMetrics
    };
};

export default useDashboardData;
