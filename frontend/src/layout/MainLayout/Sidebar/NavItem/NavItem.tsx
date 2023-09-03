import { Box, Button, ListItemIcon, SvgIcon } from '@mui/material';
import { NavLink } from 'react-router-dom';

export type NavItemProps = {
    key: string | number;
    title: string;
    href: string;
    icon?: string;
    activeIcon?: string;
};

// ==============================|| NAV ITEM LAYOUT ||============================== //

function NavItem(props: NavItemProps) {
    return (
        <li>
            <Button
                component={NavLink}
                to={props.href}
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    pl: '16px',
                    pr: '16px',
                    py: '6px',
                    textAlign: 'left',
                    width: '100%',
                    backgroundColor: props.active ? 'var(--nav-item-active-bg)' : '',
                    '&:hover': {
                        backgroundColor: 'var(--nav-item-hover-bg)',
                    },
                }}
            >
                <ListItemIcon
                    sx={{
                        alignItems: 'center',
                        color: props.active ? 'var(--nav-item-icon-active-color)' : 'var(--nav-item-icon-color)',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        mr: 2,
                    }}
                >
                    <SvgIcon fontSize="small">
                        <svg>
                            <path
                                fill="currentColor"
                                d="M3 10.5651c0-.5744 0-.8616.074-1.126a1.9998 1.9998 0 0 1 .318-.6502c.1633-.2208.39-.3971.8434-.7498l6.7823-5.2751c.3513-.2732.527-.4099.721-.4624a.9996.9996 0 0 1 .5226 0c.194.0525.3697.1891.721.4624l6.7823 5.2751c.4534.3527.6801.529.8434.7498.1446.1955.2524.4159.318.6502.074.2644.074.5516.074 1.126V17.8c0 1.1201 0 1.6801-.218 2.108a1.9996 1.9996 0 0 1-.874.874C19.4802 21 18.9201 21 17.8 21H6.2c-1.1201 0-1.6802 0-2.108-.218a1.9997 1.9997 0 0 1-.874-.874C3 19.4801 3 18.9201 3 17.8v-7.2349Z"
                                opacity="0.12"
                            ></path>
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8.126 14c.444 1.7252 2.0102 3 3.874 3s3.4299-1.2748 3.874-3M11.0177 2.764 4.2354 8.0391c-.4534.3527-.68.529-.8434.7498a1.9998 1.9998 0 0 0-.318.6502C3 9.7035 3 9.9907 3 10.565V17.8c0 1.1201 0 1.6801.218 2.108.1917.3763.4977.6823.874.874C4.5198 21 5.08 21 6.2 21h11.6c1.1201 0 1.6802 0 2.108-.218a1.9996 1.9996 0 0 0 .874-.874C21 19.4801 21 18.9201 21 17.8v-7.2349c0-.5744 0-.8616-.074-1.126a2.0016 2.0016 0 0 0-.318-.6502c-.1633-.2208-.39-.3971-.8434-.7498L12.9823 2.764c-.3513-.2732-.527-.4099-.721-.4624a.9996.9996 0 0 0-.5226 0c-.194.0525-.3697.1891-.721.4624Z"
                            ></path>
                        </svg>
                    </SvgIcon>
                </ListItemIcon>
                <Box
                    component={'span'}
                    sx={{
                        // color: props.active ? 'var(--nav-item-active-color)' : 'var(--nav-item-color)',
                        color: props.active ? 'var(--nav-item-active-color)' : 'var(--nav-item-color)',
                        flexGrow: 1,
                        fontFamily: 'fontFamily',
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: '24px',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {props.title}
                </Box>
            </Button>
        </li>
    );
}

export default NavItem;
