'use client'
import { AppBar, Container, Toolbar } from "@mui/material";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useHasMounted } from "../../utils/customHook";
import Grid from '@mui/material/Grid';
import { useContext, useEffect, useRef } from "react";
import { TrackContext, useTrackContext } from "@/lib/track.wraper";

const AppFooter = () => {
    //CONTEXT API:
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

    //LIBRARY:
    const playerRef = useRef(null);
    const hasMounted = useHasMounted();

    // console.log(">>> check track: ", currentTrack);

    useEffect(() => {
        //@ts-ignore
        if (currentTrack?.isPlaying) {
            //@ts-ignore
            playerRef?.current?.audio?.current.play();
        } else {
            //@ts-ignore
            playerRef?.current?.audio?.current.pause();
        }
    }, []);

    if (!hasMounted) return (<></>);


    return (
        <>
            <AppBar position="fixed"
                sx={{ top: 'auto', bottom: 0, background: "#f2f2f2", marginTop: "50px" }}
            >
                <Container sx={{ display: "flex" }}>
                    <Grid container
                        alignItems="center"
                    >
                        <Grid item xs={10} sx={{
                            ".rhap_main": {
                                gap: "30px"
                            }
                        }}>
                            <AudioPlayer
                                ref={playerRef}
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
                                volume={0.5}
                                style={{
                                    boxShadow: "unset",
                                    background: '#f2f2f2'
                                }}
                                layout="horizontal-reverse"
                                onPlay={() => { setCurrentTrack({ ...currentTrack, isPlaying: true }) }}
                                onPause={() => { setCurrentTrack({ ...currentTrack, isPlaying: false }) }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <div className="info"
                                style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}
                            >
                                <div style={{ color: "#ccc", fontSize: "15px" }}>{currentTrack?.description}</div>
                                <div style={{ color: "#333" }}>{currentTrack?.title}</div>
                            </div>
                        </Grid>
                    </Grid>


                </Container>
            </AppBar>
            <Toolbar />
        </>
    )
}

export default AppFooter;