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


  return (
    <Container sx={{ marginTop: "80px" }}>
      <MainSlider
        title={'Top Chill'}
        data={chills?.data ?? []}
        category='CHILL'
      />
      <MainSlider
        title={'Top Workout'}
        data={workouts?.data ?? []}
        category='WORKOUT'
      />
      <MainSlider
        title={'Top Party'}
        data={party?.data ?? []}
        category='PARTY'
      />
    </Container>
  );
}
