import { createContext } from 'react';

type SidebarContextType = {
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    // old_NavSections: Old_NavSectionProps[];
};

// Create the SidebarContext
export const SidebarContext = createContext<SidebarContextType>({
    drawerOpen: false,
    setDrawerOpen: () => {},
    // old_NavSections: [],
});
