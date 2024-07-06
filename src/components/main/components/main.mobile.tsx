'use client'

import CategoryAlbum from "./main.album";
import AlbumMobile from "./main.album.mobile";

interface IProps {
    chills: ITrackTop[] | null;
    workouts: ITrackTop[] | null;
    party: ITrackTop[] | null;
}

const MainMobile = (props: IProps) => {
    //PROPS: 
    const { chills, workouts, party } = props;

    // VARIABLES:
    const data = [
        { imgUrl: chills ? chills[0].imgUrl : "", categories: "CHILL" },
        { imgUrl: workouts ? workouts[0].imgUrl : "", categories: "WORKOUT" },
        { imgUrl: party ? party[0].imgUrl : "", categories: "PARTY" },
    ]

    return (
        <>
            <AlbumMobile
                title={'NEW'}
                data={chills}
            />
            <CategoryAlbum
                data={data}
            />
        </>
    )
}
export default MainMobile;