import Main from '../Main/Main';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Statusbar from './Statusbar/Statusbar';

import { NavSectionProps } from './Sidebar/NavSection/NavSection';

export default function Layout() {
    const navSections: NavSectionProps[] = [
        {
            title: 'Section 1',
            items: [
                {
                    title: 'List Item 1',
                    href: '#/list_item_1',
                    icon: '/assets/icons/ic_outline_dashboard.svg',
                    activeIcon: '/assets/icons/ic_solid_dashboard.svg',
                    active: false,
                },
                {
                    title: 'List Item 2',
                    href: '#/list_item_2',
                    icon: '/assets/icons/ic_outline_people.svg',
                    activeIcon: '/assets/icons/ic_solid_people.svg',
                    active: true,
                },
            ],
        },
        {
            title: 'Section 2',
            items: [
                {
                    title: 'List Item 3',
                    href: '#/list_item_3',
                    icon: '/assets/icons/ic_outline_store.svg',
                    activeIcon: '/assets/icons/ic_solid_store.svg',
                    active: false,
                },
                {
                    title: 'List Item 4',
                    href: '#/list_item_4',
                    icon: '/assets/icons/ic_outline_dashboard.svg',
                    activeIcon: '/assets/icons/ic_solid_dashboard.svg',
                    active: false,
                },
            ],
        },
    ];

    // const items: NavItemProps[] = [
    //     {
    //         title: 'Dashboard',
    //         href: '/dashboard',
    //         icon: '/assets/icons/ic_outline_dashboard.svg',
    //         activeIcon: '/assets/icons/ic_solid_dashboard.svg',
    //         active: false,
    //     },
    //     {
    //         title: 'Users',
    //         href: '/users',
    //         icon: '/assets/icons/ic_outline_people.svg',
    //         activeIcon: '/assets/icons/ic_solid_people.svg',
    //         active: true,
    //     },
    //     {
    //         title: 'Products',
    //         href: '/products',
    //         icon: '/assets/icons/ic_outline_store.svg',
    //         activeIcon: '/assets/icons/ic_solid_store.svg',
    //         active: false,
    //     },
    // ];

    return (
        <>
            <Header />
            <Sidebar navSections={navSections} />
            <Main />
            <Statusbar />
        </>
    );
}
