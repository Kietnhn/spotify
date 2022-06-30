import { createSlice } from '@reduxjs/toolkit';

const title = createSlice({
    name: 'title',
    initialState: '',
    reducers: {
        setTitle(state, action) {
            document.title = `Spotify - ${action.payload}`;
            return action.payload;
        },
    },
});
const { actions, reducer } = title;
export const { setTitle } = actions;
export default reducer;
