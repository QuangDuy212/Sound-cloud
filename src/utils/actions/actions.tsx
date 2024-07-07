'use server'

import { getServerSession } from "next-auth";
import { sendRequest } from "../api";
import { authOptions } from "@/app/api/auth/auth.options";
import { revalidateTag } from "next/cache";
interface ILike {
    d: string;
}

export const handleLikeTrackAction = async (id: string, quantity: number) => {
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

export const handleAddPlaylistEmpty = async (title: string, isPublic: boolean) => {
    const session = await getServerSession(authOptions);
    const create = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists/empty`,
        method: "POST",
        body: { title, isPublic },
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        }
    })

    revalidateTag("playlist-by-user");
    return create;
}

export const handleAddTrackToUserPlaylist = async (chosenPlaylist: IPlayList, tracks: string[]) => {
    const session = await getServerSession(authOptions);
    const update = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/playlists`,
        method: "PATCH",
        body: {
            "id": chosenPlaylist._id,
            "title": chosenPlaylist.title,
            "isPublic": chosenPlaylist.isPublic,
            "tracks": tracks
        },
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        }
    })
    revalidateTag("playlist-by-user");
    return update;
}