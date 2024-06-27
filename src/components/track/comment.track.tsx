'use client'
import { fetchDefaultImages, sendRequest } from '@/utils/api';
import { useHasMounted } from '@/utils/customHook';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface IProps {
    track: ITrackTop | null;
    comments: ITrackComment[] | null;
    wavesurfer: WaveSurfer | null;
}

const CommentTrack = (props: IProps) => {
    //PROPS: 
    const { track, comments, wavesurfer } = props;

    //STATE: 
    const [yourComment, setYourComment] = useState<string>("");

    //LIBRARY: 
    dayjs.extend(relativeTime)// for time
    const { data: session } = useSession();
    const router = useRouter();
    const hasMounted = useHasMounted();
    let isMobile = false;
    if (typeof window !== "undefined") {
        isMobile = window?.matchMedia("(max-width: 600px)")?.matches;// check mobile device
    }

    //METHOD: 
    const handleSubmit = async () => {
        const res = await sendRequest<IBackendRes<IAddTrackComment>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/comments`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.access_token}`
            },
            body: {
                content: yourComment,
                moment: Math.round(wavesurfer?.getCurrentTime() ?? 0),
                track: track?._id,
            },
        });

        if (res?.data) {
            setYourComment("");
            router.refresh();
        }
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }

    const handleJumpTrack = (moment: number) => {
        if (wavesurfer) {
            const duration = wavesurfer.getDuration();
            wavesurfer.seekTo(moment / duration);
            wavesurfer.play();
        }
    }
    return (
        <>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container >
                    <Grid item xs={12}>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                label="Comment"
                                variant="standard"
                                fullWidth
                                value={yourComment}
                                onChange={(e) => setYourComment(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleSubmit();
                                    }
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xl={3} lg={3} md={12} sm={12} xs={12}>
                        {!isMobile
                            ?
                            <>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                                    {track &&
                                        <Image
                                            src={fetchDefaultImages(track?.uploader?.type)}
                                            height={150}
                                            width={150}
                                            alt='avatar comment'
                                        />
                                    }
                                </div>
                                <div style={{ fontSize: "15px", textAlign: "center" }}>{track?.uploader?.email}</div>
                            </>
                            :
                            <div style={{ display: "flex" }}>
                                <div>
                                    {track &&
                                        <Image
                                            src={fetchDefaultImages(track?.uploader?.type)}
                                            height={72.4}
                                            width={72.4}
                                            alt='avatar comment'
                                        />
                                    }
                                </div>
                                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", marginLeft: "10px" }}>
                                    <div style={{ fontSize: "14px", color: "#333", fontWeight: "800" }}>{track?.uploader?.email}</div>
                                    <div style={{ fontSize: "14px", color: "#333" }}>{track?.uploader?.name ?? "Người ẩn danh"}</div>
                                </div>
                            </div>
                        }
                    </Grid>
                    <Grid item xl={9} lg={9} md={12} sm={12} xs={12}>
                        {comments?.map((item) => {
                            return (
                                <div
                                    style={{
                                        display: "flex", height: "50px",
                                        justifyContent: "space-between",
                                        marginTop: "20px"
                                    }}
                                    key={item._id}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        {track &&
                                            <Image
                                                src={fetchDefaultImages(track?.uploader?.type)}
                                                width={40}
                                                height={40}
                                                alt='track uploader'
                                            />
                                        }
                                        <div
                                            className='content'
                                            style={{
                                                marginLeft: "20px",
                                                color: "#000",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                lineHeight: "20px"
                                            }}
                                        >
                                            <div>{item?.user?.name}
                                                <span
                                                    style={{
                                                        fontSize: "11px",
                                                        fontWeight: "700",
                                                        lineHeight: "16px",
                                                        color: " #044dd2",
                                                        backgroundColor: "#f3f3f3",
                                                        padding: "1px 4px",
                                                        borderRadius: "100px",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => handleJumpTrack(item?.moment)}
                                                >{formatTime(item?.moment)}</span></div>
                                            <div style={{
                                                fontSize: "14px",
                                                fontWeight: "100",
                                                lineHeight: "20px",
                                                color: "#000"
                                            }}>{item?.content}</div>
                                        </div>
                                    </div>
                                    <div className='time-comment'
                                        style={{
                                            fontSize: "12px", color: "#ccc"
                                        }}>
                                        {hasMounted && dayjs(item?.createdAt).fromNow()}
                                    </div>
                                </div>
                            )
                        })}
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default CommentTrack;