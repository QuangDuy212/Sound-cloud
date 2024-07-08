'use client'
import { sendRequest } from "@/utils/api";
import { Box, Container, Divider } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import SearchATrack from "./result.atrack";

const ClientSearch = () => {
    //STATE:
    const [tracks, setTracks] = useState<ITrackTop[] | null>([]);

    //LIBRARY: 
    const searchParams = useSearchParams();
    const query = searchParams.get('q') as string;

    //METHODS: 
    useEffect(() => {
        //set title for search page
        document.title = `Search - "${query}"`;

        //search -> set track
        if (query)
            handleSearch(query);
    }, [query])
    const handleSearch = async (query: string) => {
        const res = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/search`,
            method: "POST",
            body: {
                title: query,
                current: 1,
                pageSize: 100,
            },
            nextOption: {
                next: { tags: ['search-track-by-name'] }
            }
        })
        if (res?.data) {
            setTracks(res?.data?.result);
        }
    }
    return (
        <>
            {!tracks?.length &&
                <div style={{ fontSize: "16px", color: "#999" }}>
                    Not found in search name
                </div>
            }
            {tracks && tracks.length > 0 &&
                <>
                    <div style={{ fontSize: "24px", color: "#999" }}>
                        Result search : {query}
                    </div>
                    <Divider sx={{ margin: "10px 0" }} />
                    <Box sx={{ marginTop: "10px" }}>
                        <SearchATrack data={tracks} />
                    </Box>
                </>

            }
        </>
    )
}

export default ClientSearch;