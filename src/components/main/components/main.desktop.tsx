'use client'

import MainSlider from "./main.slider";

interface IProps {
    chills: ITrackTop[] | null;
    workouts: ITrackTop[] | null;
    party: ITrackTop[] | null;
}
const MainDesktop = (props: IProps) => {
    //PROPS: 
    const { chills, workouts, party } = props;
    return (
        <>
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
        </>
    )
}
export default MainDesktop;