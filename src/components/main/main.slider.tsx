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

interface IProps {
    data: ITrackTop[];
    title: string;
}

const MainSlider = (props: IProps) => {
    const { data, title } = props;

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
                    left: 0,
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
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
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
                    slidesToShow: 2,
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
    return (
        <Box
            sx={{
                margin: "80px 50px 0",
                ".track": {
                    padding: "0 10px",
                    "img": {
                        height: 150,
                        width: 150,
                        objectFit: "contain"
                    }
                },
                "h3": {
                    border: "1px solid #ccc",
                    padding: "20px",
                    height: "200px",
                }
            }}
        >
            <h2>{title}</h2>
            <Slider {...settings}>
                {data.map((item, index) => {
                    return (
                        <div className="track" key={item._id} >
                            <div style={{ position: "relative", height: "175px", width: "100%" }}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
                                    alt="track image"
                                    style={{
                                        objectFit: "contain"
                                    }}
                                    fill
                                />
                            </div>
                            <Link href={`track/${convertSlugUrl(item.title)}-${item._id}.html?audio=${item.trackUrl}`}
                                style={{
                                    textDecoration: 'none',
                                    color: 'unset'
                                }}>
                                <h4>{item.title}</h4>
                            </Link>
                            <h5>{item.description}</h5>
                        </div>
                    )
                })}
            </Slider>
            <Divider />
        </Box>
    );
}

export default MainSlider;