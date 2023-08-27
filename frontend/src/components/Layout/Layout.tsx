import { createContext, useState } from 'react';

import Main from '../Main/Main';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Statusbar from './Statusbar/Statusbar';

import { NavSectionProps } from './Sidebar/NavSection/NavSection';

type SidebarContextType = {
    mobileOpen: boolean;
    setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
    navSections: NavSectionProps[];
};

// Create the SidebarContext
export const SidebarContext = createContext<SidebarContextType>({
    mobileOpen: false,
    setMobileOpen: () => {},
    navSections: [],
});

function Layout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const navSections: NavSectionProps[] = [
        {
            key: 'root',
            items: [
                {
                    key: '/dashboard',
                    title: 'Dashboard',
                    href: '/dashboard',
                    icon: '/assets/icons/ic_outline_store.svg',
                    activeIcon: '/assets/icons/ic_solid_store.svg',
                    active: true,
                },
            ],
        },
        {
            key: 'banking',
            title: 'Banking',
            items: [
                {
                    key: '/bank/account_list',
                    title: 'Account List',
                    href: '/bank/account_list',
                },
                {
                    key: '/bank/statements',
                    title: 'Statements',
                    href: '/bank/statements',
                    active: false,
                },
                {
                    key: '/bank/reconcilliation',
                    title: 'Reconcilliation',
                    href: '/bank/reconcilliation',
                },
            ],
        },
        {
            key: 'chartOfAccounts',
            title: 'Chart of Accounts',
            items: [
                {
                    key: '/coa/control_accounts',
                    title: 'Control Accounts',
                    href: '/coa/control_accounts',
                },
            ],
        },
        {
            key: 'customers',
            title: 'Customers',
            items: [
                {
                    key: '/customers/sales_orders',
                    title: 'Sales Orders',
                    href: '/customers/sales_orders',
                },
                {
                    key: '/customers/invoices',
                    title: 'Invoices',
                    href: '/customers/invoices',
                },
            ],
        },
        {
            key: 'suppliers',
            title: 'Suppliers',
            items: [
                {
                    key: '/suppliers/purchase_orders',
                    title: 'Purchase Orders',
                    href: '/suppliers/purchase_orders',
                },
                {
                    key: '/suppliers/invoices',
                    title: 'Invoices',
                    href: '/suppliers/invoices',
                },
            ],
        },
    ];

    return (
        <>
            <SidebarContext.Provider
                value={{ mobileOpen, setMobileOpen, navSections }}
            >
                <Header />
                <Sidebar />
                <Main />
                <Statusbar />
            </SidebarContext.Provider>
        </>
    );
}

export default Layout;
