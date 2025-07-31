import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';

export interface IDashboardDataType {
    name: string;
    color: string;
    description: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    subViews?: string[];
    title?: string;
    url: string;
}

export interface IModuleView extends IDashboardDataType {
    hiddden?: boolean;
}

export interface IQuickAction extends IDashboardDataType {}

export interface ISystemMetric {
    change: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    label: string;
    trend: string;
    value: string;
}

export interface IDashboardCompoonentTypes {
    systemMetrics: ISystemMetric[];
    coreModules: IModuleView[];
    quickActions: IQuickAction[];
    utilityViews: IModuleView[];
}
