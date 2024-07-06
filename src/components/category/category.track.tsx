'use client'

import Image from "next/image";
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation'
import { convertSlugUrl } from "@/utils/api";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { redirect } from 'next/navigation'
import Link from "next/link";

interface IProps {
    data: ITrackTop[] | undefined | null;
}
const CategoryTrack = (props: IProps) => {
    //PROPS: 
    const { data } = props;

    const theme = useTheme();
    const router = useRouter();

    //METHODS: 

    return (
        <>
            <Grid container spacing={1} sx={{
                ".track-top:hover": {
                    transform: "scale(1.1) "
                }
            }}>
                {data?.map((item, index) => {
                    return (
                        <Grid item xl={4} lg={4} md={6} sm={6} xs={12} key={item?._id}>
                            <Link href={`/track/${convertSlugUrl(item.title)}-${item._id}.html?audio=${item.trackUrl}`} style={{
                                color: "unset",
                                textDecoration: "unset"
                            }}>
                                <div
                                    style={{
                                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                        marginTop: "5px",
                                        borderRadius: "10px",
                                        display: "flex",
                                        width: "100%",
                                        alignItems: "center",
                                        height: "80px",
                                        padding: "10px",
                                        cursor: "pointer",
                                        // transition: "transform 250ms",
                                        transition: "all .2s ease-in-out",
                                    }}
                                    className="track-top"
                                >
                                    <div style={{ borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        {item?.imgUrl &&
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
                                                alt="track image"
                                                style={{
                                                    objectFit: "contain",
                                                    cursor: "pointer",
                                                    borderRadius: "5px"
                                                }}
                                                height={60}
                                                width={60}
                                            />
                                        }
                                    </div>
                                    <div style={{ marginLeft: "10px", }}>
                                        <div style={{ fontSize: "16px", color: "#333" }}>
                                            {item?.title}
                                        </div>
                                        <div style={{ fontSize: "14px", color: "#999" }}>
                                            {item?.description}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Grid>
                    )
                })}

            </Grid>
        </>
    )
}

export default CategoryTrack;