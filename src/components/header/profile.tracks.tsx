'use client';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useTrackContext } from '@/lib/track.wraper';
import PauseIcon from '@mui/icons-material/Pause';
interface IProps {
    data: {
        "_id": string;
        "title": string;
        "description": string;
        "category": string;
        "imgUrl": string;
        "trackUrl": string;
        "countLike": number;
        "countPlay": number;
        "uploader": {
            "_id": string;
            "email": string;
            "name": string;
            "role": string;
            "type": string;
        },
        "isDeleted": boolean;
        "createdAt": string;
        "updatedAt": string
    }
}
const ProfileTrack = (props: IProps) => {
    const theme = useTheme();
    //LIBRARY:
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;
    return (
        <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {props.data.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {props.data.description}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    {
                        (props.data._id !== currentTrack._id ||
                            props.data._id === currentTrack._id && currentTrack.isPlaying === false
                        )
                        &&
                        <IconButton aria-label="play/pause"
                            onClick={() => { setCurrentTrack({ ...props.data, isPlaying: true }) }}
                        >
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                    }
                    {
                        (props.data._id === currentTrack._id && currentTrack.isPlaying === true)
                        &&
                        <IconButton aria-label="play/pause"
                            onClick={() => { setCurrentTrack({ ...props.data, isPlaying: false }) }}
                        >
                            <PauseIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                    }
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={`http://localhost:8000/images/${[props.data.imgUrl]}`}
                alt="Live from space album cover"
            />
        </Card>
    );
}

export default ProfileTrack;