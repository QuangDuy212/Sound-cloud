'use client'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';
import { sendRequest } from '@/utils/api';
import { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useToast } from '@/utils/toast';

export interface SimpleDialogProps {
    open: boolean;
    setOpen: (v: boolean) => void;
}

const CreatePlaylist = (props: SimpleDialogProps) => {
    //PROPS: 
    const { setOpen, open } = props;

    //STATE: 
    const [title, setTitle] = useState<string>("");
    const [isPublic, setIsPublic] = useState<boolean>(true);
    const [errorText, setErrorText] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    //LIBRARY: 
    const { data: session } = useSession();
    const toast = useToast();

    //METHODS: 
    const createEmptyPlayList = async () => {
        if (!title) {
            setIsError(true);
            setErrorText("Please fill title for playlist!");
            return;
        }
        const create = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists/empty`,
            method: "POST",
            body: { title, isPublic },
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            }
        })
        if (create?.data) {
            await sendRequest<IBackendRes<any>>({
                url: `/api/revalidate`,
                method: "POST",
                queryParams: {
                    tag: "playlist-by-user",
                    secret: "DuySoundCloud" // fix in api/revalidate/route to protect secret
                }
            });
            toast.success(create?.message);
            handleOnClose()
        }
    }

    const handleOnClose = () => {
        setIsError(false)
        setErrorText("");
        setOpen(false);
        setTitle("");
        setIsPublic(true);
    }


    return (
        <Dialog
            open={open}
            fullWidth
        >
            <DialogTitle>Add track to playlist</DialogTitle>
            <DialogContent dividers>
                <FormGroup >
                    <TextField
                        label="Title"
                        error={isError}
                        helperText={errorText}
                        variant="outlined" fullWidth
                        sx={{ marginTop: "10px" }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Switch checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)} />}
                        label={isPublic ? "Public" : "Private"}
                        sx={{ marginTop: "10px" }}
                    />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOnClose}>Cancel</Button>
                <Button onClick={() => createEmptyPlayList()} autoFocus>
                    SAVE
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default CreatePlaylist;

