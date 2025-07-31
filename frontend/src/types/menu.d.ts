import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Path } from 'react-router-dom';

/**
 * Navigation menu structure
 */
export interface Menu {
    items: MenuItem[];
}

/**
 * Individual menu item with optional nesting
 */
export interface MenuItem {
    id: string;
    type: 'group' | 'item' | 'collapse';
    title?: string;
    caption?: string;
    url?: string | Partial<Path>;
    icon?: OverridableComponent<SvgIconTypeMap>;
    children?: MenuItem[];
    breadcrumbs?: boolean;
    disabled?: boolean;
    external?: boolean;
    hidden?: boolean;
    target?: string;
    tooltip?: string;
}
