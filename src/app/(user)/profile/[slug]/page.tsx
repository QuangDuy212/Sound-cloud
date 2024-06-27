
import { sendRequest } from "@/utils/api";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ProfileTrack from "@/components/header/profile.tracks";
import { Container } from "@mui/material";

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
    const tracks = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/users?current=1&pageSize=10`,
        method: "POST",
        body: {
            id: params.slug,
        },
    });
    return (
        <>
            <Container sx={{ marginTop: "100px" }}>
                <Box sx={{ flexGrow: 1, }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {tracks?.data && tracks?.data?.result.map((item, index) => {
                            return (
                                <Grid item xs={6} key={index}>
                                    <ProfileTrack data={item} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default ProfilePage;