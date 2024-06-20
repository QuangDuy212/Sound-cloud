'use client';
import Chip from '@mui/material/Chip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface IProps {
    track: ITrackTop | null;
}

const LikeTrack = (props: IProps) => {
    const { track } = props;
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Chip icon={<FavoriteIcon />} label="Like" variant="outlined" onClick={handleClick}
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