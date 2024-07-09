
import WaveTrack from '@/components/track/wave.track';
import { sendRequest } from '@/utils/api';
import Container from '@mui/material/Container';
import { useSearchParams } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { isMobileDevice } from '@/lib/responsive';
import WaveTrackMobile from '@/components/track/wave.track.mobile';
type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    //const slug = params.slug

    // fetch data
    // const product = await fetch(`https://.../${slug}`).then((res) => res.json())

    // optionally access and extend (rather than replace) parent metadata
    //const previousImages = (await parent).openGraph?.images || []
    const temp = params?.slug?.split(".html") ?? [];
    const temp1 = (temp[0]?.split("-") ?? []) as string[];
    const id = temp1[temp1.length - 1];

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
        method: "GET",
    });


    return {
        title: res?.data?.title,
        description: res?.data?.description,
        openGraph: {
            title: 'Hỏi Dân IT',
            description: 'Beyond Your Coding Skills',
            type: 'website',
            images: [`https://raw.githubusercontent.com/hoidanit/images-hosting/master/eric.png`],

        },
    }
}

export async function generateStaticParams() {
    return [
        { slug: "xi-mang-pho-665003f6cefeff72c13448ca.html" },
        { slug: "sau-con-mua-665003f6cefeff72c13448c9.html" },
        { slug: "rolling-down-665003f6cefeff72c13448c6.html" },
    ]

}

const DetailTrackPage = async (props: any) => {
    //PROPS:
    const { params } = props;

    //LIBRARY:

    //METHODS: 
    const temp = params?.slug?.split(".html") ?? [];
    const temp1 = (temp[0]?.split("-") ?? []) as string[];
    const id = temp1[temp1.length - 1];

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
        method: "GET",
        nextOption: {
            // cache: "no-store" ,
            next: { tags: ['track-by-id'] }
        }
    });

    const comments = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
        method: "POST",
        queryParams: {
            current: 1,
            pageSize: 100,
            trackId: id,
            sort: "-createdAt",
        }
    });

    // await new Promise(resolve => setTimeout(resolve, 5000));


    const isMobile = isMobileDevice(); // execute the function

    if (!res?.data || !comments?.data?.result) {
        notFound();
    }

    return (
        <Container>
            {isMobile
                ?
                <WaveTrackMobile
                    track={res?.data ?? null}
                    comments={comments?.data?.result ?? null}
                    countComments={comments?.data?.meta?.total}
                />
                :
                <WaveTrack
                    track={res?.data ?? null}
                    comments={comments?.data?.result ?? null}
                    countComments={comments?.data?.meta?.total}
                />
            }
        </Container>
    )
}
export default DetailTrackPage;