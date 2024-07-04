'use server'

import { getServerSession } from "next-auth";
import { sendRequest } from "../api";
import { authOptions } from "@/app/api/auth/auth.options";
import { revalidateTag } from "next/cache";
interface ILike {
    d: string;
}

export const handleLikeTrackAction = async (id: string, quantity: number) => {
    console.log(">>> check data: ", id, quantity);
    const session = await getServerSession(authOptions);
    const res = await sendRequest<IBackendRes<ILike>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
        method: "POST",
        body: {
            track: id,
            quantity: quantity,
        },
        headers: {
            Authorization: `Bearer ${session?.access_token}`
        },
    });

    revalidateTag("track-by-id");
    revalidateTag("liked-by-user");
}