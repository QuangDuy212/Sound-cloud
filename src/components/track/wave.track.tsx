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

interface IProps {
    track: ITrackTop | null;
    comments: ITrackComment[] | null;
    countComments: number | undefined;
}

const WaveTrack = (props: IProps) => {
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
    let isMobile = false;
    if (typeof window !== "undefined") {
        isMobile = window?.matchMedia("(max-width: 600px)")?.matches;// check mobile device
    }

    //CONTEXT API:
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

    // fake data
    const arrComments = [
        {
            id: 1,
            avatar: `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/chill1.png`,
            moment: 10,
            user: "username 1",
            content: "just a comment1"
        },
        {
            id: 2,
            avatar: `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/chill1.png`,
            moment: 30,
            user: "username 2",
            content: "just a comment3"
        },
        {
            id: 3,
            avatar: `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/chill1.png`,
            moment: 50,
            user: "username 3",
            content: "just a comment3"
        },
    ]


    const optionsMemo = useMemo((): Omit<WaveSurferOptions, 'container'> => {
        let gradient, progressGradient;
        if (typeof window !== "undefined") {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            // Define the waveform gradient
            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
            gradient.addColorStop(0, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
            gradient.addColorStop(1, '#B1B1B1') // Bottom color

            // Define the progress gradient
            progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
            progressGradient.addColorStop(0, '#EE772F') // Top color
            progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926') // Top color
            progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094') // Bottom color
            progressGradient.addColorStop(1, '#F6B094') // Bottom color
        }

        return {
            waveColor: gradient,
            progressColor: progressGradient,
            height: 100,
            barWidth: 3,
            url: `/api?audio=${fileName}`,
        }
    }, []);
    const wavesurfer = useWavesurfer(containerRef, optionsMemo);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    //METHOD: 


    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
        if (!wavesurfer) return;
        setIsPlaying(false);

        const hover = hoverRef.current!;
        const waveform = containerRef.current!;
        waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))

        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),
            wavesurfer.on('decode', (duration) => {
                setDuration(formatTime(duration));
            }),
            wavesurfer.on('timeupdate', (currentTime) => {
                setTime(formatTime(currentTime));
            }),
            wavesurfer.once('interaction', () => {
                wavesurfer.play()
            })
        ]

        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
    }, [wavesurfer]);

    useEffect(() => {
        if (wavesurfer && currentTrack.isPlaying) {
            wavesurfer.pause();
        }

    }, [currentTrack]);

    useEffect(() => {
        if (track?._id && !currentTrack?._id) {
            setCurrentTrack({ ...track, isPlaying: false })
        }
    }, [track]);

    // On play button click
    const onPlayClick = useCallback(() => {
        if (wavesurfer) {
            wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
        }
    }, [wavesurfer]);

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

    // format time to HH/mm
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }

    //calc to percent to desigin 
    const calLeft = (moment: number) => {
        const hardCodeDuration = wavesurfer?.getDuration() ?? 0;
        const percent = (moment / hardCodeDuration) * 100;
        return `${percent}%`
    }

    // number abbreviation
    const formatNumber = (number: number | undefined) => {
        if (!number) return 0;
        return new Intl.NumberFormat('en-US', {
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(number);
    };

    // render
    return (
        <div style={{ marginTop: 64 }} className="track">
            {isMobile
                ?
                <div>
                    <div style={{ width: "100%" }}>
                        {track?.imgUrl &&
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
                :
                <div className="track-container" >
                    <div className="left">
                        <div className="info">
                            <div>
                                <div className="playbtn"
                                    onClick={() => {
                                        if (track && wavesurfer) {
                                            setCurrentTrack({ ...track, isPlaying: false })
                                            onPlayClick();
                                            handleIncreaseView();
                                        }
                                    }}
                                >
                                    {isPlaying === true ?
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
                            <div className="info__container">
                                <div className="info__container--name">
                                    {track?.title}
                                </div>
                                <div className="info__container--author"
                                >
                                    {track?.description}
                                </div>
                            </div>
                        </div>
                        <div ref={containerRef} className="wave-form-container">
                            <div className="time" >{time}</div>
                            <div className="duration" >{duration}</div>
                            <div ref={hoverRef} className="hover-wave"></div>
                            <div className="overlay"
                                style={{
                                    position: "absolute",
                                    height: "30px",
                                    width: "100%",
                                    bottom: "0",
                                    // background: "#ccc"
                                    backdropFilter: "brightness(0.5)"
                                }}
                            ></div>
                            <div className="comments" style={{ position: "relative" }}>
                                {comments?.map((item, index) => {
                                    return (
                                        <Tooltip title={item.content} arrow key={item._id}>

                                            <Image
                                                onPointerMove={(e) => {
                                                    const hover = hoverRef.current!;
                                                    hover.style.width = calLeft(item.moment + 3);
                                                }}
                                                src={fetchDefaultImages(item?.user?.type)}
                                                key={item._id}
                                                width={20}
                                                height={20}
                                                style={{
                                                    position: "relative",
                                                    top: 96,
                                                    zIndex: 20,
                                                    left: calLeft(item.moment)
                                                }}
                                                alt="avatar comment"
                                            />
                                        </Tooltip>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                    <div className="right"
                    >
                        <div className="right__content">
                            {track?.imgUrl &&
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track?.imgUrl}`}
                                    alt="image track"
                                    width={300}
                                    height={300}
                                />
                            }
                        </div>
                    </div>
                </div>
            }

            <div className="like-track" style={{ marginTop: "20px" }}>
                <LikeTrack
                    track={track}
                    countComments={countComments}
                />
            </div>
            <div className="comment" style={{ marginTop: "10px" }}>
                <CommentTrack
                    track={track}
                    comments={comments}
                    wavesurfer={wavesurfer}
                />
            </div>
        </div >
    )
}

export default WaveTrack;