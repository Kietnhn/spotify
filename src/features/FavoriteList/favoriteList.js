import { createSlice } from '@reduxjs/toolkit';

const favoriteList = createSlice({
    name: 'favoriteList',
    initialState: JSON.parse(localStorage.getItem('FVR_List_Music')) ?? [],
    reducers: {
        // tạo các actions
        addFavoriteList(state, action) {
            localStorage.setItem('FVR_List_Music', JSON.stringify(action.payload));
            return action.payload;
        },
        removeFavoriteList(state, action) {
            localStorage.setItem('FVR_List_Music', JSON.stringify(action.payload));
            return action.payload;
        },
    },
});

const { actions, reducer } = favoriteList;

export const { addFavoriteList, removeFavoriteList } = actions; // export action
export default reducer; //ngầm hiểu chúng ta đang export counterSlice
