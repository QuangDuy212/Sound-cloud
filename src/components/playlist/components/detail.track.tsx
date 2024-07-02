import { useTrackContext } from "@/lib/track.wraper";
import { convertSlugUrl } from "@/utils/api";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Image from "next/image";

interface IProps {
    track: IShareTrack;
}

const DetailATrack = (props: IProps) => {
    const { track } = props;

    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

    return (
        <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", flexWrap: "wrap", marginTop: "10px" }}>
            <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ height: "56px", width: "56px" }}>
                    {track?.imgUrl &&
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track?.imgUrl}`}
                            alt="image track"
                            width={56}
                            height={56}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    }
                </div>
                <Typography sx={{ py: 2 }}>
                    <Link
                        style={{ textDecoration: "none", color: "unset" }}
                        href={`/track/${convertSlugUrl(track.title)}-${track._id}.html?audio=${track.trackUrl}`}
                    >
                        {track.title}
                    </Link>
                </Typography>
            </div>

            <Box sx={{ display: "flex", "alignItems": "center" }}>
                {
                    (track._id !== currentTrack._id ||
                        track._id === currentTrack._id && currentTrack.isPlaying === false
                    )
                    &&
                    <IconButton aria-label="play/pause"
                        onClick={(e) => {
                            setCurrentTrack({ ...track, isPlaying: true });
                        }}
                    >
                        <PlayArrowIcon sx={{ height: 25, width: 25 }} />
                    </IconButton>
                }

                {track._id === currentTrack._id && currentTrack.isPlaying === true
                    &&
                    <IconButton aria-label="play/pause"
                        onClick={(e) => {
                            setCurrentTrack({ ...track, isPlaying: false });
                        }}
                    >
                        <PauseIcon sx={{ height: 25, width: 25 }}
                        />
                    </IconButton>
                }
            </Box>
        </Box>
    )
}

export default DetailATrack;