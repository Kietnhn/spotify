import { createSlice } from '@reduxjs/toolkit';
import songs from '../../components/Music/Music';

const music = createSlice({
    name: 'music',
    initialState: {
        indexSong: 0,
        currentAlbum: songs,
        currentMusic: songs.album[0],
        togglePlay: false,
        toggleQueue: false,
        albumChoosedFadeAll: {},
    },
    reducers: {
        changeIndexSong(state, action) {
            return {
                ...state,
                indexSong: action.payload,
            };
        },
        setCurrentAlbum(state, action) {
            return {
                ...state,
                currentAlbum: action.payload,
            };
        },
        setCurrentMusic(state, action) {
            return {
                ...state,
                currentMusic: action.payload,
            };
        },
        setTogglePlay(state, action) {
            return {
                ...state,
                togglePlay: action.payload,
            };
        },
        setIsQueue(state, action) {
            return {
                ...state,
                toggleQueue: action.payload,
            };
        },
        setAlbumChoosedFadeAll(state, action) {
            return {
                ...state,
                albumChoosedFadeAll: action.payload,
            };
        },
    },
});

const { actions, reducer } = music;

export const { changeIndexSong, setCurrentAlbum, setCurrentMusic, setTogglePlay, setIsQueue, setAlbumChoosedFadeAll } =
    actions;
export default reducer;
