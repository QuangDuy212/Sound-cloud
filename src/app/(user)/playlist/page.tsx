import MainPlaylist from "@/components/playlist/main.playlist";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";

export const metadata = {
    title: "Playlist SoundCloud",
    description: "SoundCloud",
}

const PlayListPage = async () => {


    return (
        <>
            <Container sx={{ marginTop: "100px", borderRadius: "10px", background: "#d0dce4", padding: "20px" }}>
                <MainPlaylist />
            </Container>
        </>
    )
}


export default PlayListPage;
