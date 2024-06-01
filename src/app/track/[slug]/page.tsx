'use client'


import { useSearchParams } from 'next/navigation'

const DetailTrackPage = (props: any) => {
    //PROPS:
    const { params } = props;

    //LIBRARY: take params from url 
    const searchParams = useSearchParams();

    const search = searchParams.get('audio');

    console.log(">>> check search : ", search);
    return (
        <div>DetailTrackPage</div>
    )
}
export default DetailTrackPage;