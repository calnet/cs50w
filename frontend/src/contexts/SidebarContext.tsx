import { createContext } from 'react';
import { NavSectionProps } from '../layout/MainLayout/Sidebar/NavSection/NavSection';

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
