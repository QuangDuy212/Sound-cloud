'use client';
import Chip from '@mui/material/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { sendRequest } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface IProps {
    track: ITrackTop | null;
};

interface ILike {
    d: string;
}

const LikeTrack = (props: IProps) => {
    //PROPS: 
    const { track } = props;

    //LIBRARY: 
    const { data: session } = useSession();
    const router = useRouter();

    //STATE: 
    const [trackLikes, setTrackLikes] = useState<ITrackLike[] | null>(null);

    //METHODS: 

    useEffect(() => {
        fetchData()
    }, [session]);

    const fetchData = async () => {
        if (session?.access_token) {
            const res = await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
                url: "http://localhost:8000/api/v1/likes",
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
        const res = await sendRequest<IBackendRes<ILike>>({
            url: "http://localhost:8000/api/v1/likes",
            method: "POST",
            body: {
                track: track?._id,
                quantity: trackLikes?.some(i => i._id === track?._id) ? -1 : 1,
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`
            },
        });
        if (res?.data) {
            fetchData();
            router.refresh();
        }
    };

    return (
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
                    <FavoriteIcon /> {track?.countLike}
                </div>
            </div>
        </div>
    );
}

export default LikeTrack;