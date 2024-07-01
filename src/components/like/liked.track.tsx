'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/router'
import { convertSlugUrl } from '@/utils/api';
import Link from 'next/link';

interface IProps {
    track: ITrackTop;
}

const LikedTrack = (props: IProps) => {
    //PROPS:
    const { track } = props;


    //METHODS: 
    return (
        <Card sx={{ width: "210px" }}>
            <CardActionArea
            >
                <Link
                    style={{ textDecoration: "none", color: "unset" }}
                    href={`/track/${convertSlugUrl(track.title)}-${track._id}.html?audio=${track.trackUrl}`}
                >
                    <CardMedia
                        component="img"
                        height="210px"
                        image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track?.imgUrl}`}
                        alt="liked tracks"
                        style={{ objectFit: "cover" }}
                    />
                    <CardContent>
                        <div
                            style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "#333", height: "34px" }}>
                            <FavoriteIcon sx={{ width: "16px", height: "16px", color: "#999999", marginRight: "2px" }} /> {track?.title}
                        </div>
                        <div style={{ fontSize: "12px", color: "#999999" }}>
                            {track?.description}
                        </div>

                    </CardContent>
                </Link>
            </CardActionArea>
        </Card>
    );
}

export default LikedTrack;