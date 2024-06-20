'use client'
import { fetchDefaultImages } from '@/utils/api';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';

interface IProps {
    track: ITrackTop | null;
    comments: ITrackComment[] | null;
}

const CommentTrack = (props: IProps) => {
    const { track, comments } = props;
    //STATE: 
    const [yourComment, setYourComment] = useState<string>("");
    //LIBRARY: 
    dayjs.extend(relativeTime)// for time
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
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                            {track &&
                                <img
                                    src={fetchDefaultImages(track?.uploader?.type)}
                                    style={{ width: "150px", height: "150px" }}
                                />
                            }
                        </div>
                        <div style={{ fontSize: "15px", textAlign: "center" }}>{track?.uploader?.email}</div>
                    </Grid>
                    <Grid item xs={9}>
                        {comments?.map((item) => {
                            return (
                                <div
                                    style={{
                                        display: "flex", height: "50px",
                                        justifyContent: "space-between",
                                        marginTop: "20px"
                                    }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        {track &&
                                            <img
                                                src={fetchDefaultImages(track?.uploader?.type)}
                                                style={{ width: "40px", height: "40px", }}
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
                                                        borderRadius: "100px"
                                                    }}>{dayjs(item?.createdAt).format("HH:mm")}</span></div>
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
                                        {dayjs(item?.createdAt).fromNow()}
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