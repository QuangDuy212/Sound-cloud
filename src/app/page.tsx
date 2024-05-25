"use client";
import { Container } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainSlider from "@/components/main/main.slider";



export default function HomePage() {
  return (
    <Container>
      <MainSlider />
      <MainSlider />
      <MainSlider />
    </Container>
  );
}
