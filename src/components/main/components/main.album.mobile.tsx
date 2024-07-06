'use client';

import { convertSlugUrl } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";

interface IProps {
    title: string;
    data: ITrackTop[] | null;
}
const AlbumMobile = (props: IProps) => {
    //props: 
    const { data, title } = props;

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
        <>
            <div>
                <div style={{ fontSize: "18px", color: "#323232" }}>
                    <h2 style={{ margin: "10px 0" }}>{title}</h2>
                </div>
                <div>
                    {data?.map((item) => {
                        return (
                            <Link
                                href={`/track/${convertSlugUrl(item.title)}-${item._id}.html?audio=${item.trackUrl}`}
                                key={item?._id}
                                style={{
                                    color: "unset",
                                    textDecoration: "unset",
                                    width: "100%"
                                }}>
                                <div style={{ display: "flex", margin: "5px 0", alignItems: "center", width: "100%" }}>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item?.imgUrl}`}
                                            height={50}
                                            width={50}
                                            alt='track image'
                                            style={{ borderRadius: "5px" }}
                                        />
                                    </div>
                                    <div style={{ marginLeft: "10px" }}>
                                        <div style={{ fontSize: "14px", color: "#333" }}>
                                            {TextAbstract(item?.title, 30)}
                                        </div>
                                        <div style={{ fontSize: "12px", color: "#999" }}>
                                            {TextAbstract(item?.description, 20)}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default AlbumMobile;