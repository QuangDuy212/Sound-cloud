'use client';
import LikedTrack from '@/components/like/liked.track';
import { sendRequest } from '@/utils/api';
import { Box, Container, Divider } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';



const LikePage = () => {
    //STATE: 
    const [likedTracks, setLikedTracks] = useState<ITrackTop[] | null>([]);
    //LIBRARY: 
    const { data: session } = useSession();

    useEffect(() => {
        //@ts-ignore
        if (session?.error === "RefreshAccessTokenError") {
            signIn();
        }
        fetchData();
    }, [session]);

    const fetchData = async () => {
        if (session?.access_token) {
            const res = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
                url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
                method: "GET",
                queryParams: {
                    current: 1,
                    pageSize: 100
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
                nextOption: {
                    next: { tags: ['liked-by-user'] }
                }
            })
            console.log(">> check res: ", res);
            if (res?.data) {
                setLikedTracks(res?.data?.result);
            }
        }
    }


    return (
        <>
            <Container sx={{ marginTop: "100px" }}>
                <div style={{ fontSize: "18px", color: "#999999" }}>
                    Hear the tracks you’ve liked:
                </div>
                <Divider sx={{ margin: "20px 0" }} />
                <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap", margin: "0 auto", padding: "10px" }} >
                    {likedTracks?.map((item, index) => {
                        return (
                            <LikedTrack track={item} key={item?._id} />
                        )
                    })}
                </Box>
            </Container>
        </>
    )
}

export default LikePage;