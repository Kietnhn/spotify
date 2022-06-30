import { createSlice } from '@reduxjs/toolkit';

const playlist = createSlice({
    name: 'playlist',
    initialState: {
        playlists: JSON.parse(localStorage.getItem('M_List_Music')) ?? [],
        currentPlaylist: {
            name: `Danh sách phát của tôi #1`,
            description: 'User',
            iamgeMusic: '',
            album: [],
            isFadeInSearch: true,
        },
        indexPlaylist: 0,
    },
    reducers: {
        addNewPlayList(state, action) {
            const newState = {
                ...state,
                playlists: [...state.playlists, action.payload],
            };
            localStorage.setItem('M_List_Music', JSON.stringify(newState.playlists));
            return newState;
        },
        deletePlaylist(state, action) {
            const newPlaylist = [...state.playlists];
            newPlaylist.splice(action.payload, 1);
            const newState = {
                ...state,
                playlists: newPlaylist,
            };
            localStorage.setItem('M_List_Music', JSON.stringify(newState.playlists));
            return newState;
        },
        setIndexPlaylist(state, action) {
            return {
                ...state,
                indexPlaylist: action.payload,
            };
        },
        setCurrentPlaylist(state, action) {
            return {
                ...state,
                currentPlaylist: action.payload,
            };
        },
        addMusicToPlaylist(state, action) {
            // const { index, album } = action.payload;
            // const newPlayList = [...state.playlists];
            // newPlayList[index].album = album;
            const newState = {
                ...state,
                playlists: action.payload,
            };
            localStorage.setItem('M_List_Music', JSON.stringify(newState.playlists));

            return newState;
        },

        toggleFadeInSearch(state, action) {
            const newState = {
                ...state,
                playlists: action.payload,
            };
            localStorage.setItem('M_List_Music', JSON.stringify(newState.playlists));

            return newState;
        },
    },
});

const { actions, reducer } = playlist;

export const {
    addMusicToPlaylist,
    toggleFadeInSearch,
    addNewPlayList,
    deletePlaylist,
    setCurrentPlaylist,
    setIndexPlaylist,
} = actions;
export default reducer;
