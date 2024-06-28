import UploadTabs from "@/components/track/upload.tabs";
import { Container } from "@mui/material";


const UploadPage = () => {
    return (
        <Container sx={{ marginTop: "100px" }}>
            <UploadTabs />
        </Container>
    )
}

export default UploadPage;