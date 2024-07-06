import Image from "next/image"
import Link from "next/link";

interface IProps {
    data: { imgUrl: string | null; categories: string }[]
}

const CategoryAlbum = (props: IProps) => {
    //PROPS: 
    const { data } = props;
    return (
        <>
            <div style={{ marginTop: "30px" }}>
                <h2 style={{ margin: "10px 0" }}>ALBUM HOT</h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {data?.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            href={`/category/${item?.categories}`}
                            style={{
                                color: "unset",
                                textDecoration: "unset"
                            }}>
                            <div style={{ marginLeft: "5px", marginTop: "5px" }}>
                                <div>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item?.imgUrl}`}
                                        height={138}
                                        width={138}
                                        alt='track image'
                                        style={{ borderRadius: "5px" }}
                                    />
                                </div>
                                <div style={{ fontSize: "14px", color: "#333" }}>
                                    <h3 style={{ margin: 0 }}>{item?.categories}</h3>
                                </div>
                                <div style={{ fontSize: "12px", color: "#999" }}>
                                    Perfect album
                                </div>
                            </div>
                        </Link>
                    )
                })
                }

            </div>
        </>
    )
}
export default CategoryAlbum