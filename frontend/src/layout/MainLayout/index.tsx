import { useState } from 'react';

// context imports
import { SidebarContext } from '../../contexts/SidebarContext';

// layout imports
import Header from './Header/Header';
import Main from './Main/Main';
import Sidebar from './Sidebar/Sidebar';
import Statusbar from './Statusbar/Statusbar';

// ==============================|| MAIN LAYOUT ||============================== //

function MainLayout() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <SidebarContext.Provider value={{ drawerOpen, setDrawerOpen }}>
                <Header />
                <Sidebar />
                <Main />
                <Statusbar />
            </SidebarContext.Provider>
        </>
    );
}

export default MainLayout;
