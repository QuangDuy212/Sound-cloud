import CategoryTrack from "@/components/category/category.track";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";


const CategoryPage = async ({ params }: { params: { slug: string } }) => {

    const res = await sendRequest<IBackendRes<ITrackTop[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
        method: "POST",
        body: {
            category: params?.slug,
            limit: 100,
        },
    });


    return (
        <>
            <Container sx={{ marginTop: "100px" }}>
                <CategoryTrack data={res?.data} />
            </Container>
        </>
    )
}

export default CategoryPage;