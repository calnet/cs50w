import { grey } from '@mui/material/colors';
import { ThemeOptions, createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import type {} from '@mui/x-data-grid/themeAugmentation';

const options: ThemeOptions = {
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: 0,
                    backgroundColor: '#E5E7EB',
                    color: '#000',
                },
            },
        },
        // MuiButton: {
        //     styleOverrides: {
        //         root: {
        //             borderRadius: '12px',
        //             textTransform: 'none',
        //         },
        //         sizeSmall: {
        //             padding: '6px 16px',
        //         },
        //         sizeMedium: {
        //             padding: '8px 20px',
        //         },
        //         sizeLarge: {
        //             padding: '11px 24px',
        //         },
        //         textSizeSmall: {
        //             padding: '7px 12px',
        //         },
        //         textSizeMedium: {
        //             padding: '9px 16px',
        //         },
        //         textSizeLarge: {
        //             padding: '12px 16px',
        //         },
        //     },
        // },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    '&.MuiPaper-elevation1': {
                        boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
                    },
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '32px 24px',
                    '&:last-child': {
                        paddingBottom: '32px',
                    },
                },
            },
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: {
                    variant: 'h6',
                },
                subheaderTypographyProps: {
                    variant: 'body2',
                },
            },
            styleOverrides: {
                root: {
                    padding: '32px 24px 16px',
                },
            },
        },
        // MuiCheckbox: {},
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    borderColor: '#E5E7EB',
                },
                icon: {
                    color: '#6C737F',
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    boxSizing: 'border-box',
                },
                html: {
                    MozOsxFontSmoothing: 'grayscale',
                    WebkitFontSmoothing: 'antialiased',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%',
                },
                body: {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%',
                },
                '#root': {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                columnHeader: {
                    backgroundColor: grey[400],
                },
                columnHeaderTitle: {
                    fontWeight: 600,
                    fontSize: '12px',
                    lineHeight: 'inherit',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                },
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    '&.MuiTypography-root': {
                        fontSize: 30,
                    },
                },
            },
        },

        // MuiIconButton: {
        //     styleOverrides: {
        //         sizeSmall: {
        //             padding: 4,
        //         },
        //     },
        // },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    '&::placeholder': {
                        opacity: 1,
                        color: '#6C737F',
                    },
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '24px',
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    overflow: 'hidden',
                    transition: 'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    '&:before': {
                        display: 'none',
                    },
                    '&:after': {
                        display: 'none',
                    },
                    borderColor: '#E5E7EB',
                    '&:hover': {
                        backgroundColor: 'rgba(17, 25, 39, 0.04)',
                    },
                    '&.Mui-disabled': {
                        backgroundColor: 'transparent',
                    },
                    '&.Mui-focused': {
                        backgroundColor: 'transparent',
                        borderColor: '#6366F1',
                        boxShadow: '#6366F1 0 0 0 2px',
                    },
                    '&.Mui-error': {
                        borderColor: '#F04438',
                        boxShadow: '#F04438 0 0 0 2px',
                    },
                },
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '24px',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '24px',
                },
                notchedOutline: {
                    transition: 'border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    borderColor: '#E5E7EB',
                },
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(17, 25, 39, 0.04)',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#E5E7EB',
                        },
                    },
                    '&.Mui-focused': {
                        backgroundColor: 'transparent',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#6366F1',
                            borderWidth: '3px',
                        },
                    },
                    '&.Mui-error': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#F04438',
                            borderWidth: '3px',
                        },
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 500,
                    '&.MuiInputLabel-filled': {
                        transform: 'translate(12px, 18px) scale(1)',
                    },
                    '&.MuiInputLabel-shrink': {
                        '&.MuiInputLabel-standard': {
                            transform: 'translate(0, -1.5px) scale(0.85)',
                        },
                        '&.MuiInputLabel-filled': {
                            transform: 'translate(12px, 6px) scale(0.85)',
                        },
                        '&.MuiInputLabel-outlined': {
                            transform: 'translate(14px, -9px) scale(0.85)',
                        },
                    },
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    borderRadius: 3,
                    overflow: 'hidden',
                },
            },
        },
        MuiLink: {
            defaultProps: {
                underline: 'hover',
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    marginRight: '16px',
                    minWidth: 'unset',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiPopover: {
            defaultProps: {
                elevation: 16,
            },
        },
        MuiRadio: {
            defaultProps: {
                color: 'primary',
            },
        },
        MuiSwitch: {
            defaultProps: {
                color: 'primary',
            },
            styleOverrides: {
                switchBase: {
                    color: '#6C737F',
                },
                track: {
                    backgroundColor: '#9DA4AE',
                    opacity: 1,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: 1.71,
                    minWidth: 'auto',
                    paddingLeft: 0,
                    paddingRight: 0,
                    textTransform: 'none',
                    '& + &': {
                        marginLeft: 24,
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {},
                sizeSmall: {},
                sizeMedium: {},
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    borderBottom: 'none',

                    '& .MuiTableCell-root': {
                        borderBottom: 'none',
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 1,
                        letterSpacing: 0.5,
                        textTransform: 'uppercase',
                        backgroundColor: 'inherit',
                        color: 'inherit',
                    },

                    '& .MuiTableCell-paddingCheckbox': {
                        paddingTop: 4,
                        paddingBottom: 4,
                    },
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                head: {
                    backgroundColor: 'inherit',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'filled',
            },
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    '&:not(.MuiBackdrop-invisible)': {
                        backgroundColor: 'rgba(17, 25, 39, 0.75)',
                    },
                },
            },
        },
        // MuiTimelineConnector: {
        //     styleOverrides: {
        //         root: {
        //             backgroundColor: '#F2F4F7',
        //         },
        //     },
        // },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backdropFilter: 'blur(6px)',
                    background: 'rgba(17, 25, 39, 0.8)',
                },
            },
        },
    },

    palette: {
        mode: 'light',
        common: {
            black: '#000',
            white: '#fff',
        },
        primary: {
            main: '#6366F1',
            light: '#EBEEFE',
            dark: '#4338CA',
            contrastText: '#FFFFFF',
            lightest: '#F5F7FF',
            darkest: '#312E81',
            alpha4: 'rgba(99, 102, 241, 0.04)',
            alpha8: 'rgba(99, 102, 241, 0.08)',
            alpha12: 'rgba(99, 102, 241, 0.12)',
            alpha30: 'rgba(99, 102, 241, 0.3)',
            alpha50: 'rgba(99, 102, 241, 0.5)',
        },
        secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2',
            contrastText: '#fff',
        },
        error: {
            main: '#F04438',
            light: '#FEE4E2',
            dark: '#B42318',
            contrastText: '#FFFFFF',
            lightest: '#FEF3F2',
            darkest: '#7A271A',
            alpha4: 'rgba(240, 68, 56, 0.04)',
            alpha8: 'rgba(240, 68, 56, 0.08)',
            alpha12: 'rgba(240, 68, 56, 0.12)',
            alpha30: 'rgba(240, 68, 56, 0.3)',
            alpha50: 'rgba(240, 68, 56, 0.5)',
        },
        warning: {
            main: '#F79009',
            light: '#FEF0C7',
            dark: '#B54708',
            contrastText: '#FFFFFF',
            lightest: '#FFFAEB',
            darkest: '#7A2E0E',
            alpha4: 'rgba(247, 144, 9, 0.04)',
            alpha8: 'rgba(247, 144, 9, 0.08)',
            alpha12: 'rgba(247, 144, 9, 0.12)',
            alpha30: 'rgba(247, 144, 9, 0.3)',
            alpha50: 'rgba(247, 144, 9, 0.5)',
        },
        info: {
            main: '#06AED4',
            light: '#CFF9FE',
            dark: '#0E7090',
            contrastText: '#FFFFFF',
            lightest: '#ECFDFF',
            darkest: '#164C63',
            alpha4: 'rgba(6, 174, 212, 0.04)',
            alpha8: 'rgba(6, 174, 212, 0.08)',
            alpha12: 'rgba(6, 174, 212, 0.12)',
            alpha30: 'rgba(6, 174, 212, 0.3)',
            alpha50: 'rgba(6, 174, 212, 0.5)',
        },
        success: {
            main: '#10B981',
            light: '#3FC79A',
            dark: '#0B815A',
            contrastText: '#FFFFFF',
            lightest: '#F0FDF9',
            darkest: '#134E48',
            alpha4: 'rgba(16, 185, 129, 0.04)',
            alpha8: 'rgba(16, 185, 129, 0.08)',
            alpha12: 'rgba(16, 185, 129, 0.12)',
            alpha30: 'rgba(16, 185, 129, 0.3)',
            alpha50: 'rgba(16, 185, 129, 0.5)',
        },
        neutral: {
            '50': '#F8F9FA',
            '100': '#F3F4F6',
            '200': '#E5E7EB',
            '300': '#D2D6DB',
            '400': '#9DA4AE',
            '500': '#6C737F',
            '600': '#4D5761',
            '700': '#2F3746',
            '800': '#1C2536',
            '900': '#111927',
        },
        text: {
            primary: '#111927',
            secondary: '#6C737F',
            disabled: 'rgba(17, 25, 39, 0.38)',
        },
        divider: grey[800],
        background: {
            paper: '#fff',
            default: '#fff',
        },
        action: {
            active: '#6C737F',
            // hover: 'rgba(17, 25, 39, 0.04)',
            hoverOpacity: 0.04,
            selected: 'rgba(17, 25, 39, 0.12)',
            selectedOpacity: 0.08,
            disabled: 'rgba(17, 25, 39, 0.38)',
            disabledBackground: 'rgba(17, 25, 39, 0.12)',
            // disabledOpacity: 0.38,
            focus: 'rgba(17, 25, 39, 0.16)',
            // focusOpacity: 0.12,
            activatedOpacity: 0.12,
        },
        /* define custom nav colour variables */
        nav: {
            background: '#1C2536',
            color: '#fff',
            borderColor: 'transparent',
            logoBorder: '#2F3746',
            groupTitleColor: '#9DA4AE',
            item: {
                background: 'transparent',
                color: '#9DA4AE',
                hoverBackground: 'rgba(255, 255, 255, 0.04)',
                activeBackground: 'rgba(255, 255, 255, 0.04)',
                activeColor: '#fff',
                disabledColor: '#6C737F',
                icon: {
                    color: '#9DA4AE',
                    activeColor: '#6366F1',
                    disabledColor: '#6C737F',
                },
                chevronColor: '#4D5761',
            },
            scrollbarColor: '#9DA4AE',
        },
    },

    typography: {
        fontFamily:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5,
            fontFamily: 'inherit',
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.57,
            fontFamily: 'inherit',
        },
        button: {
            fontSize: '0.875rem',
            fontWeight: 600,
            lineHeight: 1.75,
            fontFamily: 'inherit',
        },
        caption: {
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: 1.66,
            fontFamily: 'inherit',
        },
        subtitle1: {
            fontFamily: 'inherit',
        },
        subtitle2: {
            fontFamily: 'inherit',
        },
        overline: {
            fontFamily: 'inherit',
        },
        h1: {
            fontWeight: 700,
            fontSize: '2.25rem',
            lineHeight: 1.2,
            fontFamily: 'inherit',
            '@media (min-width:600px)': {
                fontSize: '2.9167rem',
            },
            '@media (min-width:900px)': {
                fontSize: '3.125rem',
            },
            '@media (min-width:1200px)': {
                fontSize: '3.5417rem',
            },
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 700,
            lineHeight: 1.2,
            fontFamily: 'inherit',
            '@media (min-width:600px)': {
                fontSize: '2.5rem',
            },
            '@media (min-width:900px)': {
                fontSize: '2.7083rem',
            },
            '@media (min-width:1200px)': {
                fontSize: '2.9167rem',
            },
        },
        h3: {
            fontSize: '1.625rem',
            fontWeight: 700,
            lineHeight: 1.2,
            fontFamily: 'inherit',
            '@media (min-width:600px)': {
                fontSize: '1.875rem',
            },
            '@media (min-width:900px)': {
                fontSize: '2.0833rem',
            },
            '@media (min-width:1200px)': {
                fontSize: '2.2917rem',
            },
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
            fontFamily: 'inherit',
            '@media (min-width:600px)': {
                fontSize: '1.6667rem',
            },
            '@media (min-width:900px)': {
                fontSize: '1.875rem',
            },
            '@media (min-width:1200px)': {
                fontSize: '2.0833rem',
            },
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 700,
            lineHeight: 1.2,
            fontFamily: 'inherit',
            '@media (min-width:600px)': {
                fontSize: '1.4583rem',
            },
            '@media (min-width:900px)': {
                fontSize: '1.4583rem',
            },
            '@media (min-width:1200px)': {
                fontSize: '1.4583rem',
            },
        },
        h6: {
            fontSize: '1.0625rem',
            fontWeight: 700,
            lineHeight: 1.2,
            fontFamily: 'inherit',
            '@media (min-width:600px)': {
                fontSize: '1.0417rem',
            },
            '@media (min-width:900px)': {
                fontSize: '1.0417rem',
            },
            '@media (min-width:1200px)': {
                fontSize: '1.0417rem',
            },
        },
        mainContent: {
            // backgroundColor: theme.palette.background.default,
            width: '100%',
            minHeight: 'calc(100vh - 88px)',
            flexGrow: 1,
            padding: '20px',
            marginTop: '88px',
            marginRight: '20px',
            // borderRadius: `${theme.shape.borderRadius}px`,
        },
        menuCaption: {
            fontSize: '0.875rem',
            fontWeight: 500,
            color: grey[600],
            // padding: '6px',
            textTransform: 'capitalize',
            // marginTop: '10px',
        },
        subMenuCaption: {
            fontSize: '0.6875rem',
            fontWeight: 500,
            // color: theme.palette.text.secondary,
            textTransform: 'capitalize',
        },
        menuGroup: {
            fontWeight: '500',
            // color: 'var(--nav-color)',
            padding: 1,
        },
        commonAvatar: {
            cursor: 'pointer',
            borderRadius: '8px',
        },
        smallAvatar: {
            width: '24px',
            height: '24px',
            fontSize: '1rem',
        },
        mediumAvatar: {
            width: '32px',
            height: '32px',
            fontSize: '1.2rem',
        },
        largeAvatar: {
            width: '40px',
            height: '40px',
            fontSize: '1.5rem',
        },
    },
    shape: {
        borderRadius: 8,
    },
};

const dependantOptions: ThemeOptions = {
    palette: {
        action: {
            hover: options.palette?.nav?.item?.hoverBackground,
        },
    },
    typography: {
        mainContent: {
            backgroundColor: options.palette?.background?.default,
            borderRadius: `${options.shape?.borderRadius}px`,
        },
        subMenuCaption: {
            color: options.palette?.text?.secondary,
        },
        menuGroup: {
            color: options.palette?.nav?.color,
        },
    },
};

export const theme = createTheme(deepmerge(options, dependantOptions));
