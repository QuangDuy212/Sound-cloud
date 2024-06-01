'use client'

import { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveTrack = () => {
    useEffect(() => {
        const element = document.getElementById('hoidanit');// them dau ! la chac chan khac null
        if (element) {
            const wavesurfer = WaveSurfer.create({
                container: element,
                waveColor: 'rgb(200, 0, 200)',
                progressColor: 'rgb(100, 0, 100)',
                url: '/audio/WORKOUT.mp3',
            })
        }
    }, []);
    return (
        <div id="hoidanit">
            WaveTrack
        </div>
    )
}

export default WaveTrack;