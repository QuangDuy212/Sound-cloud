'use client'
import { AppBar, Container, Toolbar } from "@mui/material";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useHasMounted } from "../utils/customHook";
import Grid from '@mui/material/Grid';

const AppFooter = () => {

    const hasMounted = useHasMounted();

    if (!hasMounted) return (<></>);

    return (
        <>
            <AppBar position="fixed"
                sx={{ top: 'auto', bottom: 0, background: "#f2f2f2" }}
            >
                <Container sx={{ display: "flex" }}>
                    <Grid container
                        alignItems="center"
                    >
                        <Grid item xs={10}>
                            <AudioPlayer
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
                                volume={0.5}
                                style={{
                                    boxShadow: "unset",
                                    background: '#f2f2f2'
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <div className="info"
                                style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}
                            >
                                <div style={{ color: "#ccc", fontSize: "15px" }}>Quang Duy</div>
                                <div style={{ color: "#333" }}>Grow up</div>
                            </div>
                        </Grid>
                    </Grid>


                </Container>
            </AppBar>
            <Toolbar />
        </>
    )
}

export default AppFooter;