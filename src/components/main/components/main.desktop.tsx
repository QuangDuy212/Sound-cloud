'use client'

import { Grid } from "@mui/material";
import MainSlider from "./main.slider";
import LikedTrack from "@/components/like/liked.track";
import CategoryTrack from "@/components/category/category.track";

interface IProps {
    chills: ITrackTop[] | null;
    workouts: ITrackTop[] | null;
    party: ITrackTop[] | null;
    liked: ITrackTop[] | null;
}
const MainDesktop = (props: IProps) => {
    //PROPS: 
    const { chills, workouts, party, liked } = props;
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <MainSlider
                        data={chills ?? []}
                        title={"Top chill"}
                        category={"CHILL"}
                    />
                    <MainSlider
                        data={workouts ?? []}
                        title={"Top workouts"}
                        category={"WORKOUTS"}
                    />
                    <MainSlider
                        data={party ?? []}
                        title={"Top party"}
                        category={"PARTY"}
                    />
                </Grid>
                {/* <Grid item xs={2}>
                    <CategoryTrack data={liked} />
                </Grid> */}
            </Grid>
        </>
    )
}
export default MainDesktop;