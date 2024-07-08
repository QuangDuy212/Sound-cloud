// "use client";
import { Container } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainSlider from "@/components/main/components/main.slider";
import { sendRequest } from "@/utils/api";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/auth.options";
import { isMobileDevice } from "@/lib/responsive";
import MainMobile from "@/components/main/components/main.mobile";
import MainDesktop from "@/components/main/components/main.desktop";



export default async function HomePage() {
  const session = await getServerSession(authOptions);

  //get session
  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: "POST",
    body: {
      category: 'CHILL',
      limit: 10,
    },
  });

  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: "POST",
    body: {
      category: 'WORKOUT',
      limit: 10,
    },
  })

  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: "POST",
    body: {
      category: 'PARTY',
      limit: 10,
    },
  })
  const res = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
    method: "GET",
    queryParams: {
      current: 1,
      pageSize: 100
    },
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
    nextOption: {
      next: { tags: ['liked-by-user'] }
    }
  })

  const mobile = isMobileDevice(); // execute the function


  return (
    <Container sx={{ marginTop: "40px" }}>

      {mobile
        ?
        <MainMobile
          chills={chills?.data ?? []}
          workouts={workouts?.data ?? []}
          party={party?.data ?? []}
          liked={res?.data?.result ?? []}
        />
        :
        <MainDesktop
          chills={chills?.data ?? []}
          workouts={workouts?.data ?? []}
          party={party?.data ?? []}
          liked={res?.data?.result ?? []}
        />
      }
    </Container>
  );
}
