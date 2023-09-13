// import '@mui/material/styles';
import { ColorPartial } from '@mui/material/styles/createPalette';

// module augmentation
declare module '@mui/material/styles' {
    export interface Palette {
        neutral: ColorPartial;
        nav: NavColorOptions;
    }

    export interface PaletteOptions {
        neutral?: ColorPartial;
        nav?: NavColorOptions;
    }

    export interface PaletteColor {
        lightest: string;
        darkest: string;
        alpha4: string;
        alpha8: string;
        alpha12: string;
        alpha30: string;
        alpha50: string;
    }

    export interface SimplePaletteColorOptions {
        lightest?: string;
        darkest?: string;
        alpha4?: string;
        alpha8?: string;
        alpha12?: string;
        alpha30?: string;
        alpha50?: string;
    }

    export interface NavColorOptions {
        background?: string;
        color?: string;
        borderColor?: string;
        logoBorder?: string;
        groupTitleColor?: string;
        item?: NavItemColorOptions;
        scrollbarColor?: string;
    }

    export interface NavItemColorOptions {
        background?: string;
        color?: string;
        hoverBackground?: string;
        activeBackground?: string;
        activeColor?: string;
        disabledColor?: string;
        icon?: NavItemIconColorOptions;
        chevronColor?: string;
    }

    export interface NavItemIconColorOptions {
        color?: string;
        activeColor?: string;
        disabledColor?: string;
    }

    export interface TypographyVariants {
        mainContent: React.CSSProperties;
        menuCaption: React.CSSProperties;
        subMenuCaption: React.CSSProperties;
        menuGroup: React.CSSProperties;
        commonAvatar: React.CSSProperties;
        smallAvatar: React.CSSProperties;
        mediumAvatar: React.CSSProperties;
        largeAvatar: React.CSSProperties;
    }

    export interface TypographyVariantsOptions {
        mainContent?: React.CSSProperties;
        menuCaption?: React.CSSProperties;
        subMenuCaption?: React.CSSProperties;
        menuGroup?: React.CSSProperties;
        commonAvatar?: React.CSSProperties;
        smallAvatar?: React.CSSProperties;
        mediumAvatar?: React.CSSProperties;
        largeAvatar?: React.CSSProperties;
    }
}

// module augmentation
declare module '@mui/material/Typography' {
    export interface TypographyPropsVariantOverrides {
        mainContent: true;
        menuCaption: true;
        subMenuCaption: true;
        menuGroup: true;
        commonAvatar: true;
        smallAvatar: true;
        mediumAvatar: true;
        largeAvatar: true;
    }
}
