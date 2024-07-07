'use client'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
    Box, Button, DialogActions, DialogContent, FormControl,
    FormControlLabel, FormGroup, InputLabel, MenuItem,
    OutlinedInput, Select, SelectChangeEvent, Switch, TextField
} from '@mui/material';
import { sendRequest } from '@/utils/api';
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import Chip from '@mui/material/Chip';
import { Theme, useTheme } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { handleAddTrackToUserPlaylist } from '@/utils/actions/actions';

export interface SimpleDialogProps {
    open: boolean;
    setOpen: (v: boolean) => void;
    playlist: IPlayList[] | null;
    fetchPlayList: () => void;
}

const AddTracks = (props: SimpleDialogProps) => {
    //PROPS: 
    const { setOpen, open, playlist, fetchPlayList } = props;

    //STATE: 
    const [errorText, setErrorText] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const [idPlaylist, setIdPlaylist] = useState<string>("");
    const [listTracks, setListTracks] = useState<ITrackTop[] | []>([]);
    const [tracks, setTracks] = useState<string[]>([]);
    const [tracksDisplay, setTracksDisplay] = useState<string[]>([]);

    //LIBRARY: 
    const { data: session } = useSession();
    const theme = useTheme();


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    //METHODS: 

    useEffect(() => {
        const fetchListTrack = async () => {
            if (session?.access_token) {
                const getListTrack = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks`,
                    method: "GET",
                    queryParams: {
                        current: 1,
                        pageSize: 100
                    },
                    headers: {
                        Authorization: `Bearer ${session?.access_token}`,
                    }
                })
                if (getListTrack?.data) {
                    setListTracks(getListTrack?.data?.result)
                }
            }
        }
        fetchListTrack();
    }, [session]);

    function getStyles(name: string, personName: readonly string[], theme: Theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const addTrackToPlaylist = async () => {
        if (!idPlaylist) {
            toast.error("Please chose a playlist!");
            return;
        }
        if (!tracks.length) {
            toast.error("Please chose a tracks to add!");
            return;
        }
        const chosenPlaylist = playlist?.find(item => item?._id === idPlaylist)
        if (!chosenPlaylist) {
            setIsError(true);
            setErrorText("Please chose playlist!");
            toast.error("please chose playlist and chose track not added!")
            return;
        }
        const update = await handleAddTrackToUserPlaylist(chosenPlaylist, tracks)
        if (update?.statusCode === 200) {
            fetchPlayList();
            toast.success("Add track success!");
            handleOnClose();
        }
    }

    const handleOnClose = () => {
        setIsError(false)
        setErrorText("");
        setOpen(false);
        setTracksDisplay([]);
        setTracks([]);
        setIdPlaylist("");
    }

    const handleChangePlaylist = (event: SelectChangeEvent) => {
        setIdPlaylist(event.target.value as string);
        console.log(">>> check id: ", event.target.value);
    };


    const handleChangeTracks = (event: any) => {
        const {
            target: { value, },
        } = event;
        setTracks(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };



    return (
        <Dialog
            open={open}
            fullWidth
        >
            <DialogTitle>Add tracks to your playlist</DialogTitle>
            <DialogContent dividers>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Playlist</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={idPlaylist}
                        label="Playlist"
                        onChange={handleChangePlaylist}
                        error={isError}
                    >
                        {playlist?.map((item, index) => {
                            return (
                                <MenuItem value={item?._id} key={uuidv4()}>{item?.title}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ marginTop: "20px" }}>
                    <InputLabel id="demo-multiple-chip-label">Tracks</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={tracks}
                        onChange={handleChangeTracks}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {tracksDisplay?.map((value) => (
                                    <Chip key={uuidv4()} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {listTracks.map((item) => (
                            <MenuItem
                                key={uuidv4()}
                                value={item?._id}
                                style={getStyles(item?._id, tracks, theme)}
                                onClick={() => { setTracksDisplay((name) => [...name, item?.title]) }}
                            >
                                {item?.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOnClose}>Cancel</Button>
                <Button autoFocus
                    onClick={() => addTrackToPlaylist()}
                >
                    SAVE
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default AddTracks;

