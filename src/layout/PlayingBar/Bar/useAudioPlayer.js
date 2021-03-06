import { useState, useEffect } from 'react';

function useAudioPlayer() {
    const [duration, setDuration] = useState();
    const [curTime, setCurTime] = useState();
    const [clickedTime, setClickedTime] = useState();
    // eslint-disable-next-line
    useEffect(() => {
        const audio = document.getElementById('audio');
        // state setters wrappers
        const setAudioData = () => {
            setDuration(audio.duration);
            setCurTime(audio.currentTime);
        };

        const setAudioTime = () => setCurTime(audio.currentTime);

        // DOM listeners: update React state on DOM events
        audio.addEventListener('loadeddata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);

        // React state listeners: update DOM on React state changes
        // playing ? audio.play() : audio.pause();

        if (clickedTime && clickedTime !== curTime) {
            audio.currentTime = clickedTime;
            setClickedTime(null);
        }

        // effect cleanup
        return () => {
            audio.removeEventListener('loadeddata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
        };
    });

    return {
        curTime,
        duration,
        setClickedTime,
    };
}

export default useAudioPlayer;
