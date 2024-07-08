'use client'


import './style.scss';
import Link from "next/link";
import Image from "next/image";
import { convertSlugUrl } from "@/utils/api";
import Grid from '@mui/material/Grid';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useTrackContext } from '@/lib/track.wraper';
import PauseIcon from '@mui/icons-material/Pause';

interface IProps {
    data: ITrackTop[] | null;
}

const SearchATrack = (props: IProps) => {
    //PROPS: 
    const { data } = props;

    //LIBRARY:
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

    let isMobile = false;
    if (typeof window !== "undefined") {
        isMobile = window?.matchMedia("(max-width: 600px)")?.matches;// check mobile device
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

    return (
        <>
            <Grid container spacing={1} sx={{
                // ".track-top:hover": {
                //     transform: "scale(1.01) "
                // }
            }}>
                {data?.map((item, index) => {
                    return (
                        <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={item?._id}>

                            <div
                                style={{
                                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    marginTop: "5px",
                                    borderRadius: "10px",
                                    display: "flex",
                                    width: "100%",
                                    alignItems: "center",
                                    height: "80px",
                                    padding: "10px",
                                    cursor: "pointer",
                                    justifyContent: "space-between",
                                    // transition: "transform 250ms",
                                    transition: "all .2s ease-in-out",
                                }}
                                className="track-top"
                            >
                                <div style={{ display: "flex", alignItems: "center", }}>
                                    <div style={{ borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        {item?.imgUrl &&
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
                                                alt="track image"
                                                style={{
                                                    objectFit: "contain",
                                                    cursor: "pointer",
                                                    borderRadius: "5px"
                                                }}
                                                height={60}
                                                width={60}
                                            />
                                        }
                                    </div>
                                    <div style={{ marginLeft: "10px", }}>
                                        <Link href={`/track/${convertSlugUrl(item.title)}-${item._id}.html?audio=${item.trackUrl}`} style={{
                                            color: "unset",
                                            textDecoration: "unset"
                                        }}>
                                            <div style={{ fontSize: "16px", color: "#333" }}>
                                                {isMobile ? TextAbstract(item?.title, 30) : TextAbstract(item?.title, 50)}
                                            </div>
                                            <div style={{ fontSize: "14px", color: "#999" }}>
                                                {item?.description}
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    {
                                        (item._id !== currentTrack._id ||
                                            item._id === currentTrack._id && currentTrack.isPlaying === false
                                        )
                                        &&
                                        <div style={{ padding: "5px" }}
                                            onClick={() => { setCurrentTrack({ ...item, isPlaying: true }) }}>
                                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                                        </div>
                                    }
                                    {
                                        (item._id === currentTrack._id && currentTrack.isPlaying === true)
                                        &&
                                        <div
                                            style={{ padding: "5px" }}
                                            onClick={() => { setCurrentTrack({ ...item, isPlaying: false }) }}>
                                            <PauseIcon sx={{ height: 38, width: 38 }} />
                                        </div>
                                    }
                                </div>

                            </div>
                        </Grid>
                    )
                })}

            </Grid>
        </>
    )

}

export default SearchATrack;