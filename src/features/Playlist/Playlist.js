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
        author: {},
        indexPlaylist: 0,
        isDelete: undefined,
    },
    reducers: {
        setAuthor(state, action) {
            return {
                ...state,
                author: action.payload,
            };
        },
        setIsDelete(state, action) {
            return {
                ...state,
                isDelete: action.payload,
            };
        },
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
    setIsDelete,
    setAuthor,
} = actions;
export default reducer;
