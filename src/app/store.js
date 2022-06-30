import musicReducer from '../features/Music/Music';
import FavoriteReducer from '../features/FavoriteList/favoriteList';
import seachReducer from '../features/Search/Search';
import playlistReducer from '../features/Playlist/Playlist';
import titleReducer from '../features/Title/Title';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = {
    music: musicReducer,
    favoriteList: FavoriteReducer,
    search: seachReducer,
    playlist: playlistReducer,
    title: titleReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
