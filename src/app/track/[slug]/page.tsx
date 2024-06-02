'use client'


import WaveTrack from '@/components/track/wave.track';
import { useSearchParams } from 'next/navigation'

const DetailTrackPage = (props: any) => {
    //PROPS:
    const { params } = props;

    //LIBRARY: take params from url 
    const searchParams = useSearchParams();
    const search = searchParams.get('audio');

    return (
        <div>DetailTrackPage
            <div>
                <WaveTrack />
            </div>
        </div>
    )
}
export default DetailTrackPage;