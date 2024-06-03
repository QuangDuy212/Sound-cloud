'use client'


import WaveTrack from '@/components/track/wave.track';
import Container from '@mui/material/Container';
import { useSearchParams } from 'next/navigation'

const DetailTrackPage = (props: any) => {
    //PROPS:
    const { params } = props;

    //LIBRARY: take params from url 
    const searchParams = useSearchParams();
    const search = searchParams.get('audio');

    return (
        <Container>
            <div>
                <WaveTrack />
            </div>
        </Container>
    )
}
export default DetailTrackPage;