import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Path } from 'react-router-dom';

export interface MenuItems {
    items: MenuItemType[];
}

export type MenuItemType = {
    id: string;
    title?: string;
    caption?: string;
    hidden?: boolean;
    type: 'group' | 'item' | 'collapse';
    children?: MenuItemType[];
    url?: string | Partial<Path>;
    icon?: OverridableComponent<SvgIconTypeMap> | JSX.Element;
    breadcrumbs?: boolean;
    external?: boolean;
    target?: string;
    disabled?: boolean;
};
