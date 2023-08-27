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
            items: [
                {
                    title: 'Dashboard',
                    href: '/dashboard',
                    icon: '/assets/icons/ic_outline_store.svg',
                    activeIcon: '/assets/icons/ic_solid_store.svg',
                    active: true,
                },
            ],
        },
        {
            title: 'Banking',
            items: [
                {
                    title: 'Account List',
                    href: '/bank/account_list',
                },
                {
                    title: 'Statements',
                    href: '/bank/statements',
                    active: false,
                },
                {
                    title: 'Reconcilliation',
                    href: '/bank/reconcilliation',
                },
            ],
        },
        {
            title: 'Chart of Accounts',
            items: [
                {
                    title: 'Control Accounts',
                    href: '/coa/control_accounts',
                },
            ],
        },
        {
            title: 'Customers',
            items: [
                {
                    title: 'Sales Orders',
                    href: '/customers/sales_orders',
                },
                {
                    title: 'Invoices',
                    href: '/customers/invoices',
                },
            ],
        },
        {
            title: 'Suppliers',
            items: [
                {
                    title: 'Purchase Orders',
                    href: '/suppliers/purchase_orders',
                },
                {
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
