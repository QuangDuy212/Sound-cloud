'use client'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import { fetchDefaultImages } from '@/utils/api';
import Image from 'next/image';
import ActiveLink from './active.link';
import DrawerMenu from './drawer.menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchMobile from '../search/search.mobile';
import CloseIcon from '@mui/icons-material/Close';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            // width: '20ch',
            width: '450px',
        },
    },
}));

interface IProps {
    isMobile: boolean;
}

const AppHeader = (props: IProps) => {
    //PROPS: 
    const { isMobile } = props;

    //STATE:
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isOpenMenuMobile, setIsOpenMenuMobile] = React.useState<boolean>(false);
    const [isOpenSearchMobile, setIsOpenSearchMobile] = React.useState<boolean>(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    //LIBRARY:
    const router = useRouter();
    const { data: session } = useSession();


    //FUNCTION:
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleRedirectHome = (e: any) => {
        e.preventDefault();
        router.push('/');
    }

    const menuId = 'primary-search-account-menu';

    //STYLE FOR :
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem >
                <Link href={`/profile/${session?.user._id}`}
                    style={{
                        color: "unset",
                        textDecoration: "unset"
                    }}

                >
                    Profile
                </Link>
            </MenuItem>
            <MenuItem
                onClick={() => {
                    handleMobileMenuClose();
                    signOut();
                }}
            >Log out</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            id={mobileMenuId}
            keepMounted
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem>
                <p>Playlists</p>
            </MenuItem>
            <MenuItem>
                <p>Likes</p>
            </MenuItem>
            <MenuItem>
                <p>Upload</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,

                }}
            >
                <AppBar
                    position="fixed"
                    sx={{
                        backgroundColor: "#415161",
                        top: 0,
                        zIndex: 10
                    }}
                >
                    <Container >
                        <Toolbar
                            sx={{
                                padding: { xs: 0 }
                            }}
                        >
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ display: { xs: 'block', sm: 'block', md: "none" }, }}
                                onClick={() => setIsOpenMenuMobile(true)}
                            >
                                <MenuIcon sx={{ height: "24px", width: "24px" }} />
                            </IconButton>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{
                                    display: { xs: 'block', sm: 'block' },
                                    cursor: "pointer",
                                    margin: { xs: "0 auto", lg: 0 }
                                }}
                                onClick={(e) => handleRedirectHome(e)}
                            >
                                SOUNDCLOUD
                            </Typography>
                            <Search sx={{ display: { xs: 'none', sm: 'none', lg: "block" }, }}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onKeyDown={(e: any) => {
                                        if (e.key === 'Enter') {
                                            if (e?.target?.value) {
                                                router.push(`/search?q=${e?.target?.value}`)
                                            }
                                        }
                                    }}
                                />
                            </Search>
                            <Box sx={{ flexGrow: { xs: 0, sm: 0, lg: 1 } }} />
                            <Box
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    gap: "20px",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    "> a": {
                                        color: "unset",
                                        textDecoration: "unset",
                                        padding: "5px",
                                        "&.active": {
                                            background: "#3b4a59",
                                            color: "#cefaff",
                                            borderRadius: "5px"
                                        }
                                    }
                                }}>
                                {
                                    session ?
                                        <>
                                            <ActiveLink href="/playlist">Playlists</ActiveLink>
                                            <ActiveLink href="/like">Likes</ActiveLink>
                                            <ActiveLink href="/track/upload">Upload</ActiveLink>

                                            <IconButton
                                                size="large"
                                                edge="end"
                                                aria-label="account of current user"
                                                aria-controls={menuId}
                                                aria-haspopup="true"
                                                onClick={handleProfileMenuOpen}
                                                color="inherit"
                                            >
                                                {/* <Avatar sx={{ bgcolor: deepOrange[500] }}>QD</Avatar> */}
                                                <Image
                                                    src={fetchDefaultImages(session?.user?.type)}
                                                    style={{
                                                        cursor: "pointer",
                                                        borderRadius: "50%"
                                                    }}
                                                    alt='avatar'
                                                    width={40}
                                                    height={40}
                                                />
                                            </IconButton>
                                        </>
                                        :
                                        <>
                                            <Link href="/auth/signin"
                                            // onClick={() => signIn()}
                                            >Login</Link>
                                        </>
                                }

                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                {/* <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton> */}
                                {!isOpenSearchMobile
                                    ?
                                    <SearchIcon sx={{ height: "30px", width: "30px" }}
                                        onClick={() => setIsOpenSearchMobile(true)}
                                    />
                                    :
                                    <CloseIcon sx={{ height: "30px", width: "30px" }}
                                        onClick={() => setIsOpenSearchMobile(false)}
                                    />
                                }
                                {session ?
                                    <Image
                                        src={fetchDefaultImages(session?.user?.type)}
                                        style={{
                                            cursor: "pointer",
                                            borderRadius: "50%",
                                            marginLeft: "5px"
                                        }}
                                        alt='avatar'
                                        width={30}
                                        height={30}
                                        onClick={() => setIsOpenMenuMobile(true)}
                                    />
                                    :
                                    <AccountCircleIcon
                                        sx={{ height: "30px", width: "30px", marginLeft: "5px" }}
                                        onClick={() => setIsOpenMenuMobile(true)}
                                    />
                                }
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </Box>
            <DrawerMenu
                open={isOpenMenuMobile}
                setOpen={setIsOpenMenuMobile}
            />
            <SearchMobile
                open={isOpenSearchMobile}
                setOpen={setIsOpenSearchMobile}
            />
        </>
    );
}


export default AppHeader;