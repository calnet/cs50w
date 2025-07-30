import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Path } from 'react-router-dom';

export interface MenuItems {
    items: MenuItemType[];
}

export type MenuItemType = {
    id: string;
    breadcrumbs?: boolean;
    caption?: string;
    children?: MenuItemType[];
    disabled?: boolean;
    external?: boolean;
    hidden?: boolean;
    icon?: OverridableComponent<SvgIconTypeMap> | JSX.Element;
    target?: string;
    title?: string;
    tooltip?: string;
    type: 'group' | 'item' | 'collapse';
    url?: string | Partial<Path>;
};
