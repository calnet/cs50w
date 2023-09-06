import { createTheme } from '@mui/material/styles';

export let theme = createTheme();

// const unstable_sxConfig = {
//     unstable_sxConfig: {
//         border: {
//             themeKey: 'borders',
//         },
//         borderTop: {
//             themeKey: 'borders',
//         },
//         borderRight: {
//             themeKey: 'borders',
//         },
//         borderBottom: {
//             themeKey: 'borders',
//         },
//         borderLeft: {
//             themeKey: 'borders',
//         },
//         borderColor: {
//             themeKey: 'palette',
//         },
//         borderTopColor: {
//             themeKey: 'palette',
//         },
//         borderRightColor: {
//             themeKey: 'palette',
//         },
//         borderBottomColor: {
//             themeKey: 'palette',
//         },
//         borderLeftColor: {
//             themeKey: 'palette',
//         },
//         borderRadius: {
//             themeKey: 'shape.borderRadius',
//         },
//         color: {
//             themeKey: 'palette',
//         },
//         bgcolor: {
//             themeKey: 'palette',
//             cssProperty: 'backgroundColor',
//         },
//         backgroundColor: {
//             themeKey: 'palette',
//         },
//         p: {},
//         pt: {},
//         pr: {},
//         pb: {},
//         pl: {},
//         px: {},
//         py: {},
//         padding: {},
//         paddingTop: {},
//         paddingRight: {},
//         paddingBottom: {},
//         paddingLeft: {},
//         paddingX: {},
//         paddingY: {},
//         paddingInline: {},
//         paddingInlineStart: {},
//         paddingInlineEnd: {},
//         paddingBlock: {},
//         paddingBlockStart: {},
//         paddingBlockEnd: {},
//         m: {},
//         mt: {},
//         mr: {},
//         mb: {},
//         ml: {},
//         mx: {},
//         my: {},
//         margin: {},
//         marginTop: {},
//         marginRight: {},
//         marginBottom: {},
//         marginLeft: {},
//         marginX: {},
//         marginY: {},
//         marginInline: {},
//         marginInlineStart: {},
//         marginInlineEnd: {},
//         marginBlock: {},
//         marginBlockStart: {},
//         marginBlockEnd: {},
//         displayPrint: {
//             cssProperty: false,
//         },
//         display: {},
//         overflow: {},
//         textOverflow: {},
//         visibility: {},
//         whiteSpace: {},
//         flexBasis: {},
//         flexDirection: {},
//         flexWrap: {},
//         justifyContent: {},
//         alignItems: {},
//         alignContent: {},
//         order: {},
//         flex: {},
//         flexGrow: {},
//         flexShrink: {},
//         alignSelf: {},
//         justifyItems: {},
//         justifySelf: {},
//         gap: {},
//         rowGap: {},
//         columnGap: {},
//         gridColumn: {},
//         gridRow: {},
//         gridAutoFlow: {},
//         gridAutoColumns: {},
//         gridAutoRows: {},
//         gridTemplateColumns: {},
//         gridTemplateRows: {},
//         gridTemplateAreas: {},
//         gridArea: {},
//         position: {},
//         zIndex: {
//             themeKey: 'zIndex',
//         },
//         top: {},
//         right: {},
//         bottom: {},
//         left: {},
//         boxShadow: {
//             themeKey: 'shadows',
//         },
//         width: {},
//         maxWidth: {},
//         minWidth: {},
//         height: {},
//         maxHeight: {},
//         minHeight: {},
//         boxSizing: {},
//         fontFamily: {
//             themeKey: 'typography',
//         },
//         fontSize: {
//             themeKey: 'typography',
//         },
//         fontStyle: {
//             themeKey: 'typography',
//         },
//         fontWeight: {
//             themeKey: 'typography',
//         },
//         letterSpacing: {},
//         textTransform: {},
//         lineHeight: {},
//         textAlign: {},
//         typography: {
//             cssProperty: false,
//             themeKey: 'typography',
//         },
//     },
// };

const args = [
    {
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
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '12px',
                        textTransform: 'none',
                    },
                    sizeSmall: {
                        padding: '6px 16px',
                    },
                    sizeMedium: {
                        padding: '8px 20px',
                    },
                    sizeLarge: {
                        padding: '11px 24px',
                    },
                    textSizeSmall: {
                        padding: '7px 12px',
                    },
                    textSizeMedium: {
                        padding: '9px 16px',
                    },
                    textSizeLarge: {
                        padding: '12px 16px',
                    },
                },
            },
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
            MuiCheckbox: {
                defaultProps: {
                    checkedIcon: {
                        type: 'svg',
                        key: null,
                        ref: null,
                        props: {
                            fill: 'none',
                            height: '24',
                            viewBox: '0 0 24 24',
                            width: '24',
                            xmlns: 'http://www.w3.org/2000/svg',
                            children: {
                                type: 'path',
                                key: null,
                                ref: null,
                                props: {
                                    clipRule: 'evenodd',
                                    d: 'M9 3.5C5.68629 3.5 3 6.18629 3 9.5V15.5C3 18.8137 5.68629 21.5 9 21.5H15C18.3137 21.5 21 18.8137 21 15.5V9.5C21 6.18629 18.3137 3.5 15 3.5H9ZM16.7179 10.1961C17.1024 9.79966 17.0926 9.16657 16.6961 8.7821C16.2997 8.39763 15.6666 8.40737 15.2821 8.80385L10.6667 13.5635L8.7179 11.5539C8.33343 11.1574 7.70034 11.1476 7.30385 11.5321C6.90737 11.9166 6.89763 12.5497 7.2821 12.9461L9.94877 15.6961C10.1371 15.8904 10.3961 16 10.6667 16C10.9372 16 11.1962 15.8904 11.3846 15.6961L16.7179 10.1961Z',
                                    fill: 'currentColor',
                                    fillRule: 'evenodd',
                                },
                                _owner: null,
                            },
                        },
                        _owner: null,
                    },
                    color: 'primary',
                    icon: {
                        type: 'svg',
                        key: null,
                        ref: null,
                        props: {
                            fill: 'none',
                            height: '24',
                            viewBox: '0 0 24 24',
                            width: '24',
                            xmlns: 'http://www.w3.org/2000/svg',
                            children: {
                                type: 'rect',
                                key: null,
                                ref: null,
                                props: {
                                    height: '16',
                                    rx: '5',
                                    stroke: 'currentColor',
                                    strokeWidth: '2',
                                    width: '16',
                                    x: '4',
                                    y: '4.5',
                                },
                                _owner: null,
                            },
                        },
                        _owner: null,
                    },
                    indeterminateIcon: {
                        type: 'svg',
                        key: null,
                        ref: null,
                        props: {
                            fill: 'none',
                            height: '24',
                            viewBox: '0 0 24 24',
                            width: '24',
                            xmlns: 'http://www.w3.org/2000/svg',
                            children: {
                                type: 'path',
                                key: null,
                                ref: null,
                                props: {
                                    clipRule: 'evenodd',
                                    d: 'M9 5.5H15C17.2091 5.5 19 7.29086 19 9.5V15.5C19 17.7091 17.2091 19.5 15 19.5H9C6.79086 19.5 5 17.7091 5 15.5V9.5C5 7.29086 6.79086 5.5 9 5.5ZM3 9.5C3 6.18629 5.68629 3.5 9 3.5H15C18.3137 3.5 21 6.18629 21 9.5V15.5C21 18.8137 18.3137 21.5 15 21.5H9C5.68629 21.5 3 18.8137 3 15.5V9.5ZM8 11.5C7.44772 11.5 7 11.9477 7 12.5C7 13.0523 7.44772 13.5 8 13.5H16C16.5523 13.5 17 13.0523 17 12.5C17 11.9477 16.5523 11.5 16 11.5H8Z',
                                    fill: 'currentColor',
                                    fillRule: 'evenodd',
                                },
                                _owner: null,
                            },
                        },
                        _owner: null,
                    },
                },
            },
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
                    '#root, #__next': {
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        height: '100%',
                        width: '100%',
                    },
                    '#nprogress': {
                        pointerEvents: 'none',
                    },
                    '#nprogress .bar': {
                        height: 3,
                        left: 0,
                        position: 'fixed',
                        top: 0,
                        width: '100%',
                        zIndex: 2000,
                        backgroundColor: '#6366F1',
                    },
                    '.slick-dots li button': {
                        '&:before': {
                            fontSize: 10,
                            color: '#6366F1',
                        },
                    },
                    '.slick-dots li.slick-active button': {
                        '&:before': {
                            color: '#6366F1',
                        },
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    sizeSmall: {
                        padding: 4,
                    },
                },
            },
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
                    root: {
                        padding: '15px 16px',
                        borderBottomColor: '#F2F4F7',
                    },
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
                            backgroundColor: '#F8F9FA',
                            color: '#2F3746',
                        },
                        '& .MuiTableCell-paddingCheckbox': {
                            paddingTop: 4,
                            paddingBottom: 4,
                        },
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
            MuiTimelineConnector: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#F2F4F7',
                    },
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        backdropFilter: 'blur(6px)',
                        background: 'rgba(17, 25, 39, 0.8)',
                    },
                },
            },
        },
    },
    {
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
            grey: {
                '50': '#fafafa',
                '100': '#f5f5f5',
                '200': '#eeeeee',
                '300': '#e0e0e0',
                '400': '#bdbdbd',
                '500': '#9e9e9e',
                '600': '#757575',
                '700': '#616161',
                '800': '#424242',
                '900': '#212121',
                A100: '#f5f5f5',
                A200: '#eeeeee',
                A400: '#bdbdbd',
                A700: '#616161',
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
            contrastThreshold: 3,
            tonalOffset: 0.2,
            text: {
                primary: '#111927',
                secondary: '#6C737F',
                disabled: 'rgba(17, 25, 39, 0.38)',
            },
            divider: '#F2F4F7',
            background: {
                paper: '#fff',
                default: '#fff',
            },
            action: {
                active: '#6C737F',
                // hover: 'rgba(17, 25, 39, 0.04)',
                hover: 'var(--nav-item-hover-bg)',
                hoverOpacity: 0.04,
                selected: 'rgba(17, 25, 39, 0.12)',
                selectedOpacity: 0.08,
                disabled: 'rgba(17, 25, 39, 0.38)',
                disabledBackground: 'rgba(17, 25, 39, 0.12)',
                disabledOpacity: 0.38,
                focus: 'rgba(17, 25, 39, 0.16)',
                focusOpacity: 0.12,
                activatedOpacity: 0.12,
            },
            /* define custom nav colour variables */
            nav: {
                '--nav-bg': '#1C2536',
                '--nav-color': '#fff',
                '--nav-border-color': 'transparent',
                '--nav-logo-border': '#2F3746',
                '--nav-section-title-color': '#9DA4AE',
                '--nav-item-bg': 'transparent',
                '--nav-item-color': '#9DA4AE',
                '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
                '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
                '--nav-item-active-color': '#fff',
                '--nav-item-disabled-color': '#6C737F',
                '--nav-item-icon-color': '#9DA4AE',
                '--nav-item-icon-active-color': '#6366F1',
                '--nav-item-icon-disabled-color': '#6C737F',
                '--nav-item-chevron-color': '#4D5761',
                '--nav-scrollbar-color': '#9DA4AE',
            },
        },
    },
    {
        typography: {
            fontFamily:
                '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            body1: {
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.5,
                fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            },
            body2: {
                fontSize: '0.875rem',
                fontWeight: 400,
                lineHeight: 1.57,
                fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            },
            button: {
                fontWeight: 600,
                fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                fontSize: '0.875rem',
                lineHeight: 1.75,
                textTransform: 'uppercase',
            },
            caption: {
                fontSize: '0.75rem',
                fontWeight: 400,
                lineHeight: 1.66,
                fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            },
            subtitle1: {
                fontSize: '1rem',
                fontWeight: 500,
                lineHeight: 1.57,
                fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            },
            subtitle2: {
                fontSize: '0.875rem',
                fontWeight: 500,
                lineHeight: 1.57,
                fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            },
            overline: {
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.5px',
                lineHeight: 2.5,
                textTransform: 'uppercase',
                fontFamily:
                    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            },
            h1: {
                // fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '2.25rem',
                lineHeight: 1.2,
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
                // fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '2rem',
                lineHeight: 1.2,
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
                // fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '1.625rem',
                lineHeight: 1.2,
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
                // fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '1.5rem',
                lineHeight: 1.2,
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
                // fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '1.25rem',
                lineHeight: 1.2,
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
                // fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontFamily: 'inherit',
                fontWeight: 700,
                fontSize: '1.0625rem',
                lineHeight: 1.2,
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
                backgroundColor: theme.palette.background.default,
                width: '100%',
                minHeight: 'calc(100vh - 88px)',
                flexGrow: 1,
                padding: '20px',
                marginTop: '88px',
                marginRight: '20px',
                borderRadius: `${theme?.shape?.borderRadius}px`,
            },
            menuCaption: {
                fontSize: '0.875rem',
                fontWeight: 500,
                color: theme.palette.grey[600],
                // padding: '6px',
                textTransform: 'capitalize',
                // marginTop: '10px',
            },
            subMenuCaption: {
                fontSize: '0.6875rem',
                fontWeight: 500,
                color: theme.palette.text.secondary,
                textTransform: 'capitalize',
            },
            menuGroup: {
                mx: 'auto',
                fontSize: '0.875rem',
                fontWeight: '700',
                // paddingLeft: 4,
                // color: 'var(--nav-section-title-color)',
            },
            commonAvatar: {
                cursor: 'pointer',
                borderRadius: '8px',
            },
            smallAvatar: {
                width: '22px',
                height: '22px',
                fontSize: '1rem',
            },
            mediumAvatar: {
                width: '34px',
                height: '34px',
                fontSize: '1.2rem',
            },
            largeAvatar: {
                width: '44px',
                height: '44px',
                fontSize: '1.5rem',
            },
            inherit: {
                fontFamily: 'inherit',
                fontWeight: 'inherit',
                fontSize: 'inherit',
                lineHeight: 'inherit',
                letterSpacing: 'inherit',
            },

            htmlFontSize: 16,
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
        },
    },
    {
        mixins: {
            toolbar: {
                minHeight: 56,
                '@media (min-width:0px)': {
                    '@media (orientation: landscape)': {
                        minHeight: 48,
                    },
                },
                '@media (min-width:600px)': {
                    minHeight: 64,
                },
            },
        },
    },
    {
        shape: {
            borderRadius: 8,
        },
    },
    {
        shadows: [
            'none',
            '0px 1px 2px rgba(0, 0, 0, 0.08)',
            '0px 1px 5px rgba(0, 0, 0, 0.08)',
            '0px 1px 8px rgba(0, 0, 0, 0.08)',
            '0px 1px 10px rgba(0, 0, 0, 0.08)',
            '0px 1px 14px rgba(0, 0, 0, 0.08)',
            '0px 1px 18px rgba(0, 0, 0, 0.08)',
            '0px 2px 16px rgba(0, 0, 0, 0.08)',
            '0px 3px 14px rgba(0, 0, 0, 0.08)',
            '0px 3px 16px rgba(0, 0, 0, 0.08)',
            '0px 4px 18px rgba(0, 0, 0, 0.08)',
            '0px 4px 20px rgba(0, 0, 0, 0.08)',
            '0px 5px 22px rgba(0, 0, 0, 0.08)',
            '0px 5px 24px rgba(0, 0, 0, 0.08)',
            '0px 5px 26px rgba(0, 0, 0, 0.08)',
            '0px 6px 28px rgba(0, 0, 0, 0.08)',
            '0px 6px 30px rgba(0, 0, 0, 0.08)',
            '0px 6px 32px rgba(0, 0, 0, 0.08)',
            '0px 7px 34px rgba(0, 0, 0, 0.08)',
            '0px 7px 36px rgba(0, 0, 0, 0.08)',
            '0px 8px 38px rgba(0, 0, 0, 0.08)',
            '0px 8px 40px rgba(0, 0, 0, 0.08)',
            '0px 8px 42px rgba(0, 0, 0, 0.08)',
            '0px 9px 44px rgba(0, 0, 0, 0.08)',
            '0px 9px 46px rgba(0, 0, 0, 0.08)',
        ],
    },
    {
        transitions: {
            easing: {
                easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
                easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
                easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
                sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
            },
            duration: {
                shortest: 150,
                shorter: 200,
                short: 250,
                standard: 300,
                complex: 375,
                enteringScreen: 225,
                leavingScreen: 195,
            },
        },
    },
    {
        zIndex: {
            mobileStepper: 1000,
            fab: 1050,
            speedDial: 1050,
            appBar: 1100,
            drawer: 1200,
            modal: 1300,
            snackbar: 1400,
            tooltip: 1500,
        },
    },
];

theme = createTheme(undefined, ...args);
