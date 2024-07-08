import ClientSearch from "@/components/search/client.search";
import { Container } from "@mui/material";


const SearchPage = () => {

    return (
        <>
            <Container sx={{ marginTop: "40px" }}>
                <ClientSearch />
            </Container>
        </>
    )
}

export default SearchPage;