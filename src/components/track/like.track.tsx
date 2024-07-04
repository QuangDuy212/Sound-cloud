'use client';
import Chip from '@mui/material/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { sendRequest } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { handleLikeTrackAction } from '@/utils/actions/actions';
interface IProps {
    track: ITrackTop | null;
    countComments: number | undefined;
};

interface ILike {
    d: string;
}

const LikeTrack = (props: IProps) => {
    //PROPS: 
    const { track, countComments } = props;

    //LIBRARY: 
    const { data: session } = useSession();
    const router = useRouter();
    let isMobile = false;
    if (typeof window !== "undefined") {
        isMobile = window?.matchMedia("(max-width: 600px)")?.matches;// check mobile device
    }

    //STATE: 
    const [trackLikes, setTrackLikes] = useState<ITrackLike[] | null>(null);

    //METHODS: 
    useEffect(() => {
        fetchData()
    }, [session]);

    // number abbreviation
    const formatNumber = (number: number | undefined) => {
        if (!number) return 0;
        return new Intl.NumberFormat('en-US', {
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(number);
    };

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
    const handleLikeTrack = async () => {

        const id = track?._id;
        const quantity = trackLikes?.some(i => i._id === track?._id) ? -1 : 1;
        if (id && quantity) {
            await handleLikeTrackAction(id, quantity);
        }
        fetchData();
        router.refresh();
    };

    return (
        <>
            {!isMobile
                ?
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Chip
                        color={trackLikes?.some(i => i._id === track?._id) ? "error" : "default"}
                        icon={<FavoriteIcon />}
                        label="Like"
                        variant="outlined"
                        onClick={handleLikeTrack}
                        sx={{
                            borderRadius: "5px"
                        }}
                    />
                    <div className='count-play'
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "120px",
                            color: "#777474"
                        }}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <PlayArrowIcon />{track?.countPlay}
                        </div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {/* {trackLikes?.some(i => i._id === track?._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />} {track?.countLike} */}
                            <FavoriteIcon />{track?.countLike}
                        </div>
                    </div>
                </div>
                :
                <div>
                    <div style={{ display: "flex" }}>
                        <div style={{ display: "flex", alignItems: "center", fontSize: "13px", color: "#666666", marginRight: "20px" }}>
                            <FavoriteIcon style={{ height: "24px", width: "24px" }} /> {formatNumber(track?.countLike)}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", fontSize: "13px", color: "#666666", marginRight: "20px" }}>
                            <CommentIcon style={{ height: "24px", width: "24px" }} />{formatNumber(countComments)}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default LikeTrack;