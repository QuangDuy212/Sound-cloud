'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
import { useSearchParams } from 'next/navigation';
import { useWavesurfer } from "@/utils/customHook";


const WaveTrack = () => {
    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio');
    const containerRef = useRef<HTMLDivElement>(null);
    const optionsMemo = useMemo(() => {
        return {
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',
            url: `/api?audio=${fileName}`,
            container: containerRef.current,
        }
    }, []);

    const wavesurfer = useWavesurfer(containerRef, optionsMemo);
    const onPlayPause = useCallback(() => {
        if (wavesurfer) {
            wavesurfer && wavesurfer.playPause();
        }
    }, [wavesurfer]);
    //STATE: 
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        if (!wavesurfer) return;

        setIsPlaying(false);
        const subscription = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),
        ];

        return () => {
            subscription.forEach((unsub) => unsub());
        }
    }, [wavesurfer]);
    return (
        <div>
            <div ref={containerRef}>
                wave track
            </div>
            <button onClick={() => onPlayPause()}>
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    )
}

export default WaveTrack;