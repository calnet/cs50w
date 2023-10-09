import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const Dashboard = Loadable(lazy(() => import('../views/dashboard')));

//utilities routing
const Utilities = Loadable(lazy(() => import('../views/utilities')));
const BasicTable = Loadable(lazy(() => import('../views/utilities/BasicTable')));
const DataTable = Loadable(lazy(() => import('../views/utilities/DataTable')));
const DenseTable = Loadable(lazy(() => import('../views/utilities/DenseTable')));
const EnhancedTable = Loadable(lazy(() => import('../views/utilities/EnhancedTable')));
const StickyHeadTable = Loadable(lazy(() => import('../views/utilities/StickyHeadTable')));

// banking page routing
const Banking = Loadable(lazy(() => import('../views/banking/Banking')));
const BankingReconciliation = Loadable(lazy(() => import('../views/banking/BankingReconciliation')));
const BankingStatements = Loadable(lazy(() => import('../views/banking/BankingStatements')));

// customer page routing
const Customers = Loadable(lazy(() => import('../views/customers/Customers')));
const CustomerInvoices = Loadable(lazy(() => import('../views/customers/CustomerInvoices')));
const CustomerSalesOrders = Loadable(lazy(() => import('../views/customers/CustomerSalesOrders')));

// supplier page routing
const Suppliers = Loadable(lazy(() => import('../views/suppliers/Suppliers')));
const SupplierInvoices = Loadable(lazy(() => import('../views/suppliers/SupplierInvoices')));
const SupplierPurchaseOrders = Loadable(lazy(() => import('../views/suppliers/SupplierPurchaseOrders')));

// chart of accounts page routing
const Layouts = Loadable(lazy(() => import('../views/coa/Layouts')));
const CoaLayout = Loadable(lazy(() => import('../views/coa/CoaLayout')));
const CoaCategories = Loadable(lazy(() => import('../views/coa/CoaCategories')));
const NominalTypes = Loadable(lazy(() => import('../views/coa/NominalTypes')));
const NominalCodes = Loadable(lazy(() => import('../views/coa/NominalCodes')));
const CoaControlAccounts = Loadable(lazy(() => import('../views/coa/CoaControlAccounts')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes: RouteObject = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'dashboard',
            children: [
                {
                    path: '',
                    element: <Dashboard />,
                },
            ],
        },
        {
            path: 'utilities',
            children: [
                {
                    path: '',
                    element: <Utilities />,
                },
                {
                    path: '/utilities/basic-table',
                    element: <BasicTable />,
                },
                {
                    path: '/utilities/data-table',
                    element: <DataTable />,
                },
                {
                    path: '/utilities/dense-table',
                    element: <DenseTable />,
                },
                {
                    path: '/utilities/enhanced-table',
                    element: <EnhancedTable />,
                },
                {
                    path: '/utilities/sticky-head-table',
                    element: <StickyHeadTable />,
                },
            ],
        },
        {
            path: 'customers',
            children: [
                {
                    path: '',
                    element: <Customers />,
                },
                {
                    path: 'invoices',
                    element: <CustomerInvoices />,
                },
                {
                    path: 'sales_orders',
                    element: <CustomerSalesOrders />,
                },
            ],
        },
        {
            path: 'suppliers',
            children: [
                {
                    path: '',
                    element: <Suppliers />,
                },
                {
                    path: 'invoices',
                    element: <SupplierInvoices />,
                },
                {
                    path: 'purchase_orders',
                    element: <SupplierPurchaseOrders />,
                },
            ],
        },
        {
            path: 'banking',
            children: [
                {
                    path: '',
                    element: <Banking />,
                },
                {
                    path: 'statements',
                    element: <BankingStatements />,
                },
                {
                    path: 'reconciliation',
                    element: <BankingReconciliation />,
                },
            ],
        },
        {
            path: 'coa',
            children: [
                {
                    path: 'layouts',
                    element: <Layouts />,
                },
                {
                    path: 'coa_layout',
                    element: <CoaLayout />,
                },
                {
                    path: 'coa_categories',
                    element: <CoaCategories />,
                },
                {
                    path: 'nominal_types',
                    element: <NominalTypes />,
                },
                {
                    path: 'nominal_codes',
                    element: <NominalCodes />,
                },
                {
                    path: 'control_accounts',
                    element: <CoaControlAccounts />,
                },
            ],
        },
    ],
};

export default MainRoutes;
