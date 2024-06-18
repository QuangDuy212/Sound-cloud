'use client'

import { createContext, useContext, useState } from "react";

export const TrackContext = createContext({})

export const TrackContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [color, setColor] = useState('red');

    return (
        <TrackContext.Provider value={{ color, setColor }}>
            {children}
        </TrackContext.Provider>
    )
};

// export const useTrackContext = () => useContext(TrackContext);