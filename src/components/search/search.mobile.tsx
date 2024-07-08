'use client'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import ClientSearch from './client.search';
import { Fragment, useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { sendRequest } from '@/utils/api';
import { Box, Divider } from '@mui/material';
import SearchATrack from './result.atrack';

interface IProps {
    open: boolean;
    setOpen: (v: boolean) => void;
}



export default function SearchMobile(props: IProps) {
    //PROPS: 
    const { open, setOpen } = props;

    //LIBRARY: 
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();

    //STATE: 
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [valueSearch, setValueSearch] = useState<string>("");
    const [tracks, setTracks] = useState<ITrackTop[] | null>([]);

    //METHODS: 
    useEffect(() => {
        setIsSearching(false);
        setValueSearch("");
        setTracks([]);
    }, [open])

    const handleSearch = async (query: string) => {
        const res = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/search`,
            method: "POST",
            body: {
                title: query,
                current: 1,
                pageSize: 100,
            },
            nextOption: {
                next: { tags: ['search-track-by-name'] }
            }
        })
        if (res?.data) {
            setTracks(res?.data?.result);
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e: any) => {
        if (valueSearch) {
            // e.stopPropagation();
            setIsSearching(true);
            //search -> set track
            handleSearch(valueSearch);
        }
    }





    return (
        < >
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                sx={{ zIndex: 5 }}
            >
                <DialogTitle sx={{ marginTop: "60px", display: "flex" }}>
                    <div style={{ position: "relative", width: "100%" }}>
                        <TextField label="Search" variant="outlined" fullWidth
                            value={valueSearch}
                            onChange={(e) => setValueSearch(e?.target?.value)}
                            onKeyDown={(e: any) => {
                                if (e.key === 'Enter') {
                                    handleSubmit(e)
                                }
                            }
                            }
                        />
                        <div
                            style={{
                                display: "flex", justifyContent: "center",
                                alignItems: "center",
                                position: "absolute", top: 0, right: 0, height: "100%", padding: "10px", zIndex: 6
                            }}
                            onClick={(e: any) => handleSubmit(e)}
                        >

                            <SendIcon />
                        </div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    {!tracks?.length && isSearching &&
                        <div>
                            Not found in search name
                        </div>
                    }
                    {tracks && tracks.length > 0 && isSearching &&
                        <div>
                            <div style={{ fontSize: "14px", color: "#333", fontWeight: 600 }}>
                                TOP RESULT
                            </div>
                            <Divider sx={{ margin: "10px 0" }} />
                            <Box sx={{ marginTop: "10px", marginBottom: "50px" }}>
                                <SearchATrack data={tracks} />
                            </Box>
                        </div>

                    }
                </DialogContent>
            </Dialog>
        </>
    );
}
