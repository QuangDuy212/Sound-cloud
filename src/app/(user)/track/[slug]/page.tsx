
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
        nextOption: { cache: "no-store" }
    });

    const comments = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
        url: "http://localhost:8000/api/v1/tracks/comments",
        method: "POST",
        queryParams: {
            current: 1,
            pageSize: 100,
            trackId: params.slug,
            sort: "-createdAt",
        }
    });

    return (
        <Container>
            <div>
                <WaveTrack
                    track={res?.data ?? null}
                    comments={comments?.data?.result ?? null}
                />
            </div>
        </Container>
    )
}
export default DetailTrackPage;