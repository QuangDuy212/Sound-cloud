'use client'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useSession } from 'next-auth/react';
import { sendRequest } from '@/utils/api';
import { Fragment, useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import CreatePlaylist from './components/modal.create.playlist';
import AddTracks from './components/modal.add.track';
import { v4 as uuidv4 } from 'uuid';
import DetailATrack from './components/detail.track';
import { Box } from '@mui/material';


const MainPlayList = () => {
    //STATE: 
    const [playlist, setPlaylist] = useState<IPlayList[] | null>([])

    const [isOpenCreatePlaylist, setIsOpenCreatePlaylist] = useState<boolean>(false);
    const [addTrack, setAddTrack] = useState<boolean>(false);
    //LIBRARY: 
    const { data: session } = useSession();

    //METHOD: 

    useEffect(() => {
        fetchPlayList();
    }, [session]);

    const fetchPlayList = async () => {
        if (session?.access_token) {
            const getUserPlayList = await sendRequest<IBackendRes<IModelPaginate<IPlayList>>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists/by-user`,
                method: "POST",
                queryParams: {
                    current: 1,
                    pageSize: 100
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
                nextOption: {
                    next: { tags: ['playlist-by-user'] }
                }
            })
            if (getUserPlayList?.data) {
                setPlaylist(getUserPlayList?.data?.result)
            }
        }
    }



    return (
        <>
            <Box
                sx={{
                    display: { md: "flex", lg: "flex", xl: "flex", xs: "block", sm: "block" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}>
                <div style={{}}>
                    Playlist:
                </div>
                <div>
                    <Button variant="outlined"
                        onClick={() => setIsOpenCreatePlaylist(true)}
                        sx={{
                            width: { md: "100%", sm: "100%", xs: "100%", lg: "unset" },

                        }}
                    >Add Playlist</Button>
                    <Button
                        variant="outlined"
                        sx={{
                            marginLeft: { sm: 0, xs: 0, lg: "20px" },
                            width: { md: "100%", sm: "100%", xs: "100%", lg: "unset" },
                            marginTop: { sm: "10px", xs: "10px", lg: 0 }

                        }}
                        onClick={() => setAddTrack(true)}
                    >Add Tracks</Button>
                </div>

            </Box>
            <Divider />
            <div style={{ marginTop: "20px" }}>
                {playlist?.map((item, index) => {
                    return (
                        <Accordion key={uuidv4()} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                {item?.title}
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>

                                {!item?.tracks?.length &&
                                    <span>No data.</span>
                                }
                                {item?.tracks?.map(track => {
                                    return (
                                        <Fragment key={uuidv4()}>
                                            <Divider sx={{ marginTop: "10px" }} />
                                            {/* @ts-ignore */}
                                            <DetailATrack track={track} />
                                        </Fragment>
                                    )
                                })}
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </div>

            <CreatePlaylist
                open={isOpenCreatePlaylist}
                setOpen={setIsOpenCreatePlaylist}
                fetchPlayList={fetchPlayList}
            />

            <AddTracks
                open={addTrack}
                setOpen={setAddTrack}
                playlist={playlist}
                fetchPlayList={fetchPlayList}
            />
        </>
    );
}
export default MainPlayList;