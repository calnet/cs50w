import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';

export interface DashboardData {
    name: string;
    color: string;
    description: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    subViews?: string[];
    title?: string;
    url: string;
}

export interface ModuleView extends DashboardData {
    hiddden?: boolean;
}

export interface QuickAction extends DashboardData {}

export interface SystemMetric {
    change: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    label: string;
    trend: string;
    value: string;
}

export interface DashboardComponent {
    systemMetrics: SystemMetric[];
    coreModules: ModuleView[];
    quickActions: QuickAction[];
    utilityViews: ModuleView[];
}
