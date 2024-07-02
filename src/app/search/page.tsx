import ClientSearch from "@/components/search/client.search";
import { Container } from "@mui/material";


const SearchPage = () => {

    return (
        <>
            <Container sx={{ marginTop: "100px" }}>
                <ClientSearch />
            </Container>
        </>
    )
}

export default SearchPage;