
import WaveTrack from '@/components/track/wave.track';
import { sendRequest } from '@/utils/api';
import Container from '@mui/material/Container';
import { useSearchParams } from 'next/navigation'

const DetailTrackPage = async (props: any) => {
    //PROPS:
    const { params } = props;

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
        method: "GET",
    });
    return (
        <Container>
            <div>
                <WaveTrack
                    track={res?.data ?? null}
                />
            </div>
        </Container>
    )
}
export default DetailTrackPage;