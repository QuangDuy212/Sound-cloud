'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box, Button, Divider } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Link from "next/link";
import { convertSlugUrl } from "@/utils/api";
import Image from "next/image";
import { useRouter } from 'next/navigation'

interface IProps {
    data: ITrackTop[];
    title: string;
    category: string;
}

const MainSlider = (props: IProps) => {
    //PROPS:
    const { data, title, category } = props;

    //LIBRARY: 
    let isMobile = false;
    if (typeof window !== "undefined") {
        isMobile = window?.matchMedia("(max-width: 600px)")?.matches;// check mobile device
    }

    const router = useRouter()

    const NextArrow = (props: any) => {
        return (
            <Button
                color="inherit"
                variant="contained"
                onClick={props.onClick}
                sx={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35,
                    transform: "translateY(-50%)",
                }}
            >
                <ChevronRightIcon />
            </Button>
        )
    }

    const PrevArrow = (props: any) => {
        return (
            <Button
                color="inherit"
                variant="contained"
                onClick={props.onClick}
                sx={{
                    position: "absolute",
                    left: -5,
                    top: "50%",
                    zIndex: 2,
                    minWidth: 30,
                    width: 35,
                    transform: "translateY(-50%)",
                }}
            >
                <ChevronLeftIcon />
            </Button>
        )
    }
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 5,
        nextArrow: !isMobile ? <NextArrow /> : <></>,
        prevArrow: !isMobile ? <PrevArrow /> : <></>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    function TextAbstract(text: string, length: number) {
        if (text == null) {
            return "";
        }
        if (text.length <= length) {
            return text;
        }
        text = text.substring(0, length);
        const last = text.lastIndexOf(" ");
        text = text.substring(0, last);
        return text + "...";
    }

    return (
        <Box
            sx={{
                margin: "40px 50px 0",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", alignItems: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: 800 }}>{title}</div>
                <Button onClick={() => router.push(`category/${category}`)}>See more</Button>
            </div>
            <Slider {...settings}>
                {data.map((item, index) => {
                    return (
                        <div className="track" key={item._id}
                            style={{ width: "170px", marginLeft: "20px", display: "flex", justifyContent: "center", alignItems: "center" }} >
                            <div
                                style={{
                                    position: "relative", height: "170px", width: "170px",
                                    display: "flex", justifyContent: "center", alignItems: "center"
                                }}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
                                    alt="track image"
                                    style={{
                                        objectFit: "contain",
                                        cursor: "pointer"
                                    }}
                                    fill
                                    onClick={() => router.push(`track/${convertSlugUrl(item.title)}-${item._id}.html?audio=${item.trackUrl}`)}
                                />
                            </div>
                            <div style={{ width: "170px" }}>
                                <Link href={`track/${convertSlugUrl(item.title)}-${item._id}.html?audio=${item.trackUrl}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#333',
                                        fontSize: "14px",
                                        width: "170px",
                                        display: "block"
                                    }}>
                                    <div style={{ width: "170px" }}>{TextAbstract(item.title, 30)}</div>
                                </Link>
                            </div>
                            <div style={{
                                color: '#999',
                                fontSize: "13px",
                                width: "170px"
                            }}>{TextAbstract(item.description, 30)}</div>
                        </div>
                    )
                })}
            </Slider>
            <Divider sx={{ marginTop: "40px" }} />
        </Box >
    );
}

export default MainSlider;