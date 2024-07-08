'use client'
import { AppBar, Container, Toolbar } from "@mui/material";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useHasMounted } from "../../utils/customHook";
import Grid from '@mui/material/Grid';
import { useContext, useEffect, useRef, useState } from "react";
import { TrackContext, useTrackContext } from "@/lib/track.wraper";
import Image from "next/image";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import FavoriteIcon from '@mui/icons-material/Favorite';

interface ILike {
    d: string;
}

interface IProps {
    isMobile: boolean;
}

const AppFooter = (props: IProps) => {
    //PROPS: 
    // const { isMobile } = props;

    //CONTEXT API:
    const { currentTrack, setCurrentTrack, wavesurferContext,
        setWavesurferContext, setCurrentTimeContext, currentTimeContext } = useTrackContext() as ITrackContext;

    //STATE 
    const [count, setCount] = useState(0);
    const [trackLikes, setTrackLikes] = useState<ITrackLike[] | null>(null);

    //LIBRARY:
    const playerRef = useRef(null);
    const hasMounted = useHasMounted();
    const { data: session } = useSession();
    const router = useRouter();

    let isMobile = false;
    if (typeof window !== "undefined") {
        isMobile = window?.matchMedia("(max-width: 600px)")?.matches;// check mobile device
    }

    //METHODS: 
    useEffect(() => {
        fetchData()
    }, [session]);

    useEffect(() => {
        if (currentTrack?.isPlaying) {
            //@ts-ignore
            playerRef?.current?.audio?.current?.play();
        } else {
            //@ts-ignore
            playerRef?.current?.audio?.current?.pause();
        }
    }, [currentTrack]);

    //setTime when click on the wavetrack
    useEffect(() => {
        //@ts-ignore
        let aud = playerRef?.current?.audio?.current;
        if (aud) {
            aud.currentTime = currentTimeContext;
        }
        //@ts-ignore
    }, [currentTimeContext])

    const fetchData = async () => {
        if (session?.access_token) {
            const res = await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
                method: "GET",
                queryParams: {
                    current: 1,
                    pageSize: 100,
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`
                },
            });
            if (res?.data) {
                setTrackLikes(res?.data?.result);
            }
        }
    }

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

    const handleClickPlayMobile = () => {
        const playing = currentTrack?.isPlaying;
        //@ts-ignore
        if (!playing) {
            //@ts-ignore
            playerRef?.current?.audio?.current.play();
            //@ts-ignore
            setCurrentTrack((prev: IShareTrack) => ({ ...prev, isPlaying: true }))
        } else {
            //@ts-ignore
            playerRef?.current?.audio?.current.pause();
            //@ts-ignore
            setCurrentTrack((prev: IShareTrack) => ({ ...prev, isPlaying: false }))
        }
    }

    const handleLikeTrack = async () => {
        if (currentTrack?._id) {
            const res = await sendRequest<IBackendRes<ILike>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
                method: "POST",
                body: {
                    track: currentTrack?._id,
                    quantity: trackLikes?.some(i => i._id === currentTrack?._id) ? -1 : 1,
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`
                },
            });
            if (res?.data) {
                fetchData();
                router.refresh();
            }
        }
    };


    if (!hasMounted) return (<></>);
    return (
        <>
            {currentTrack._id &&
                <div>
                    <AppBar position="fixed"
                        sx={{ top: 'auto', bottom: 0, background: "#f2f2f2", marginTop: "50px", width: "100vw" }}
                    >
                        {!isMobile
                            ?
                            <Container sx={{ display: "flex" }} disableGutters>
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
                                            onPause={() => { setCurrentTrack({ ...currentTrack, isPlaying: false }); wavesurferContext?.pause(); }}
                                            //@ts-ignore
                                            onSeeking={(e) => wavesurferContext?.seekTo(e?.target?.currentTime / e?.target?.duration)}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div className="info"
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                flexDirection: "column",
                                                width: "220px",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <div
                                                title={currentTrack?.description}
                                                style={{
                                                    color: "#ccc", fontSize: "15px",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden"
                                                }}>{currentTrack?.description}</div>
                                            <div
                                                title={currentTrack?.title}
                                                style={{
                                                    color: "#333",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden"
                                                }}>{currentTrack?.title}</div>
                                        </div>
                                    </Grid>
                                </Grid>


                            </Container>
                            :
                            <div className="miniplayer" style={{ display: "flex" }}>
                                <div>
                                    {currentTrack._id && currentTrack?.imgUrl &&
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${currentTrack?.imgUrl}`}
                                            height={60}
                                            width={60}
                                            alt='avatar comment'
                                        />
                                    }
                                </div>
                                <div style={{ padding: "12px" }}>
                                    <div style={{ color: "#000", fontSize: "13px" }}>
                                        {TextAbstract(currentTrack?.title, 60)}
                                    </div>
                                    <div style={{ color: "#666", fontSize: "13px" }}>
                                        {TextAbstract(currentTrack?.description, 60)}
                                    </div>
                                </div>
                                <div style={{ display: "flex", float: "right", padding: "7px", marginLeft: "auto" }}>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                        onClick={() => handleLikeTrack()}
                                    >
                                        {/* <FavoriteBorderIcon style={{ height: "32px", width: "32px", color: "#000" }} /> */}
                                        {trackLikes?.some(i => i._id === currentTrack?._id)
                                            ?
                                            <FavoriteIcon style={{ height: "32px", width: "32px", color: "#000" }} />
                                            :
                                            <FavoriteBorderIcon style={{ height: "32px", width: "32px", color: "#000" }} />
                                        }
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                                        onClick={() => handleClickPlayMobile()}
                                    >
                                        {!currentTrack?.isPlaying ?
                                            <PlayArrowIcon style={{ height: "40px", width: "40px", color: "#000", padding: "4px" }} />
                                            :
                                            <PauseIcon style={{ height: "40px", width: "40px", color: "#000", padding: "4px" }} />
                                        }
                                    </div>
                                    <AudioPlayer
                                        ref={playerRef}
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
                                        volume={0.5}
                                        style={{
                                            boxShadow: "unset",
                                            background: '#f2f2f2',
                                            display: "none"
                                        }}
                                        layout="horizontal-reverse"
                                        onPlay={() => { setCurrentTrack({ ...currentTrack, isPlaying: true }) }}
                                        onPause={() => { setCurrentTrack({ ...currentTrack, isPlaying: false }) }}
                                    />
                                </div>
                            </div>
                        }
                    </AppBar>
                    <Toolbar />
                </div>
            }
        </>
    )
}

export default AppFooter;