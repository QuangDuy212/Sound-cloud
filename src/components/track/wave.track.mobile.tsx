'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useWavesurfer } from "@/utils/customHook";
import { WaveSurferOptions } from 'wavesurfer.js';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import './wave.scss';
import Tooltip from "@mui/material/Tooltip";
import { fetchDefaultImages, sendRequest } from "@/utils/api";
import { useTrackContext } from "@/lib/track.wraper";
import Grid from '@mui/material/Grid';
import CommentTrack from "./comment.track";
import LikeTrack from "./like.track";
import Image from "next/image";
import Box from '@mui/material/Box';
import dayjs from "dayjs";
import CommentTrackMobile from "./comment.track.mobile";

interface IProps {
    track: ITrackTop | null;
    comments: ITrackComment[] | null;
    countComments: number | undefined;
}

const WaveTrackMobile = (props: IProps) => {
    //PROPS: 
    const { track, comments, countComments } = props;

    //params from link
    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio');

    //REF: 
    const containerRef = useRef<HTMLDivElement>(null);
    const hoverRef = useRef<HTMLDivElement>(null);
    const firstViewRef = useRef<boolean>(true);

    //STATE: 
    const [time, setTime] = useState<string>("0:00");
    const [duration, setDuration] = useState<string>("0:00");

    //LIBRARY: 
    const router = useRouter();


    //CONTEXT API:
    const { currentTrack, setCurrentTrack, wavesurferContext, setWavesurferContext, setCurrentTimeContext, currentTimeContext } = useTrackContext() as ITrackContext;






    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    //METHOD: 


    // Initialize wavesurfer when the container mounts
    // or any of the props change





    useEffect(() => {
        if (track?._id && !currentTrack?._id) {
            setCurrentTrack({ ...track, isPlaying: false })
        }
    }, [track]);

    // On play button click


    const handleClickOnMobile = () => {
        const tmp = isPlaying;
        if (track) {
            setCurrentTrack({ ...track, isPlaying: !tmp })
            setIsPlaying(!tmp);
        }
    }

    // On play increase view
    const handleIncreaseView = async () => {
        if (firstViewRef.current) {
            await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/increase-view`,
                method: "POST",
                body: {
                    trackId: track?._id,
                }
            });

            await sendRequest<IBackendRes<any>>({
                url: `/api/revalidate`,
                method: "POST",
                queryParams: {
                    tag: "track-by-id",
                    secret: "DuySoundCloud" // fix in api/revalidate/route to protect secret
                }
            });

            router.refresh();
            firstViewRef.current = false;
        }
    }



    // number abbreviation
    const formatNumber = (number: number | undefined) => {
        if (!number) return 0;
        return new Intl.NumberFormat('en-US', {
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(number);
    };

    const [mounted, setMounted] = useState<boolean>(false);
    useEffect(() => {
        setMounted(true);
    }, [])

    // render
    return (
        <>
            {mounted &&
                <div style={{ marginTop: 64 }} className="track">
                    <div>
                        <div style={{ width: "100%" }}>
                            {track?.imgUrl && mounted &&
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track?.imgUrl}`}
                                    alt="image track"
                                    width={300}
                                    height={300}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            }
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <div style={{ fontSize: "22px", fontWeight: "700", margin: 0 }}>
                                    {track?.title}
                                </div>
                                <div style={{ fontSize: "22px", fontWeight: "700", margin: 0, color: "#666666" }}>
                                    {track?.description}
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div className="playbtn"
                                    style={{ height: "64px", width: "64px" }}
                                    onClick={() => {
                                        if (track) {
                                            handleIncreaseView();
                                            handleClickOnMobile();
                                        }
                                    }}

                                >
                                    {currentTrack?.isPlaying === true && track?._id === currentTrack?._id
                                        ?
                                        <PauseIcon
                                            sx={{ fontSize: 30, color: "white" }}
                                        />
                                        :
                                        <PlayArrowIcon
                                            sx={{ fontSize: 30, color: "white" }}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className='count-play'
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "100%",
                                        color: "#777474"
                                    }}>
                                    <div style={{ display: "flex", alignItems: "center", fontSize: "13px", }}
                                    >
                                        <PlayArrowIcon style={{ height: "14px", width: "14px" }} />{formatNumber(track?.countPlay)}
                                    </div>
                                    <div style={{ fontSize: "13px", display: "flex", alignItems: "center", color: "#666666" }}
                                        className="info-track-mobile"
                                    >
                                        <div >
                                            {duration}
                                        </div>
                                    </div>
                                    <div style={{ fontSize: "13px", display: "flex", alignItems: "center", color: "#666666" }}
                                        className="info-track-mobile"
                                    >
                                        <div>
                                            {dayjs(track?.updatedAt).format('MMM DD,YYYY')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="like-track" style={{ marginTop: "20px" }}>
                        <LikeTrack
                            track={track}
                            countComments={countComments}
                        />
                    </div>
                    <div className="comment" style={{ marginTop: "10px" }}>
                        <CommentTrackMobile
                            track={track}
                            comments={comments}
                        />
                    </div>
                </div >
            }
        </>
    )
}

export default WaveTrackMobile;