import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Default')));

// banking page routing
const BankingAccountList = Loadable(lazy(() => import('../views/banking/BankingAccountList')));
const BankingReconciliation = Loadable(lazy(() => import('../views/banking/BankingReconciliation')));
const BankingStatements = Loadable(lazy(() => import('../views/banking/BankingStatements')));

// customer page routing
const CustomerInvoices = Loadable(lazy(() => import('../views/customers/CustomerInvoices')));
const CustomerSalesOrders = Loadable(lazy(() => import('../views/customers/CustomerSalesOrders')));

// supplier page routing
const SupplierInvoices = Loadable(lazy(() => import('../views/suppliers/SupplierInvoices')));
const SupplierPurchaseOrders = Loadable(lazy(() => import('../views/suppliers/SupplierPurchaseOrders')));

// chart of accounts page routing
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
            path: 'customers',
            children: [
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
            path: 'bank',
            children: [
                {
                    path: 'account_list',
                    element: <BankingAccountList />,
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
                    path: 'control_accounts',
                    element: <CoaControlAccounts />,
                },
            ],
        },
    ],
};

export default MainRoutes;
