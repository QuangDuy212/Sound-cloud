'use client'
import { Container, Skeleton } from "@mui/material";

export default function Loading() {

    //LIBRARY: 
    let isMobile = false;
    if (typeof window !== "undefined") {
        isMobile = window?.matchMedia("(max-width: 600px)")?.matches;// check mobile device
    }
    return (
        <Container>
            <div style={{ marginTop: 64 }} >
                {isMobile
                    ?
                    <div>
                        <div style={{ width: "100%" }}>
                            <Skeleton variant="rectangular" width={300} height={300} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <div style={{ fontSize: "22px", fontWeight: "700", margin: 0 }}>
                                    <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                </div>
                                <div style={{ fontSize: "22px", fontWeight: "700", margin: 0, color: "#666666" }}>
                                    <Skeleton variant="text" sx={{ fontSize: '14px' }} />
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Skeleton variant="rounded" width={64} height={64} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "100%",
                                        color: "#777474"
                                    }}>
                                    <div style={{ display: "flex", alignItems: "center", fontSize: "13px", }}
                                    >
                                        <Skeleton variant="text" sx={{ fontSize: '13px' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <Skeleton variant="rectangular" width={"100%"} height={380} style={{
                            display: "flex",
                            gap: "15px",
                            padding: "20px",
                            height: "380px",
                        }} />
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                            <Skeleton variant="rectangular" width={72} height={32} />
                            <Skeleton variant="rectangular" width={120} height={24} />
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Skeleton variant="rectangular" width={"100%"} height={24} />
                        </div>
                        <div style={{ display: "flex", gap: "15px" }}>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <Skeleton variant="circular" width={150} height={150} />
                                <Skeleton variant="rectangular" width={250} height={24} />
                            </div>
                            <div>
                                <div style={{ marginTop: "20px" }}>
                                    <Skeleton variant="rectangular" width={700} height={50} />
                                </div>
                                <div style={{ marginTop: "20px" }}>
                                    <Skeleton variant="rectangular" width={700} height={50} />
                                </div>
                                <div style={{ marginTop: "20px" }}>
                                    <Skeleton variant="rectangular" width={700} height={50} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Container >
    )
}