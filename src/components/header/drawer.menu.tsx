import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { signOut, useSession } from 'next-auth/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import Image from 'next/image';
import { fetchDefaultImages } from '@/utils/api';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

interface IProps {
    open: boolean;
    setOpen: (v: boolean) => void;
}

const DrawerMenu = (props: IProps) => {
    //PROPS: 
    const { open, setOpen } = props;

    //LIBRARY: 
    const { data: session } = useSession();

    //METHOD: 
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    function TextAbstract(text: string, length: number) {
        if (text == null) {
            return "";
        }
        if (text.length <= length) {
            return text;
        }
        text = text.substring(0, length);
        const last = text.lastIndexOf(" ");
        text = text.substring(0, last);
        return text + "...";
    }

    const DrawerList = (
        <Box sx={{ width: 300, position: "relative" }} role="presentation" onClick={toggleDrawer(false)}>
            <div
                style={{ position: "absolute", top: 0, right: 0, padding: "10px" }}
                onClick={() => toggleDrawer(false)}
            >
                <CloseIcon fontSize={"large"} />
            </div>
            <div style={{ padding: "16px", marginTop: "10px" }}>
                {!session ?
                    <Link href="/auth/signin" style={{ textDecoration: "none", color: "unset" }}>
                        <div
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <AccountCircleIcon sx={{ height: "60px", width: "60px" }} />
                            <span style={{ marginLeft: "12px", fontSize: "16px", fontWeight: 600 }}>Sigin</span>
                        </div>
                    </Link>
                    :
                    <div
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <Image
                            src={fetchDefaultImages(session?.user?.type)}
                            style={{
                                cursor: "pointer",
                                borderRadius: "50%"
                            }}
                            alt='avatar'
                            width={60}
                            height={60}
                        />
                        <span style={{ marginLeft: "12px", fontSize: "16px", fontWeight: 600 }}>{TextAbstract(session?.user?.username, 22)}</span>
                    </div>
                }
            </div>
            <Divider />
            <List>
                <ListItem disablePadding >
                    <Link
                        href={`/`}
                        style={{
                            color: "unset",
                            textDecoration: "unset"
                        }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText >
                                <span style={{ fontSize: "16px", fontWeight: 500 }}>HOME</span>
                            </ListItemText>
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link
                        href={session ? `/playlist` : "/auth/signin"}
                        style={{
                            color: "unset",
                            textDecoration: "unset"
                        }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <PlaylistPlayIcon />
                            </ListItemIcon>
                            <ListItemText >
                                <span style={{ fontSize: "16px", fontWeight: 500 }}>PLAYLIST</span>
                            </ListItemText>
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link
                        href={session ? `/like` : "/auth/signin"}
                        style={{
                            color: "unset",
                            textDecoration: "unset"
                        }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <FavoriteIcon />
                            </ListItemIcon>
                            <ListItemText >
                                <span style={{ fontSize: "16px", fontWeight: 500 }}>LIKED</span>
                            </ListItemText>
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link
                        href={session ? `/track/upload` : "/auth/signin"}
                        style={{
                            color: "unset",
                            textDecoration: "unset"
                        }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <CloudUploadIcon />
                            </ListItemIcon>
                            <ListItemText >
                                <span style={{ fontSize: "16px", fontWeight: 500 }}>UPLOAD</span>
                            </ListItemText>
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link
                        href={session ? `/profile/${session?.user._id}` : "/auth/signin"}
                        style={{
                            color: "unset",
                            textDecoration: "unset"
                        }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText >
                                <span style={{ fontSize: "16px", fontWeight: 500 }}>PROFILE</span>
                            </ListItemText>
                        </ListItemButton>
                    </Link>
                </ListItem>
                {session &&
                    <ListItem disablePadding
                        onClick={() => signOut()}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText >
                                <span style={{ fontSize: "16px", fontWeight: 500 }}>LOGOUT</span>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                }
            </List>
            <Divider />
            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>Open drawer</Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
export default DrawerMenu;
