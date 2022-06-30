import { createSlice } from '@reduxjs/toolkit';

const search = createSlice({
    name: 'search',
    initialState: {
        inputSearch: '',
        songSearch: [],
        authorSearch: [],
        kindSearch: [],
    },
    reducers: {
        setSearch(state, action) {
            return {
                ...state,
                inputSearch: action.payload,
            };
        },
        setSongSearch(state, action) {
            return {
                ...state,
                songSearch: action.payload,
            };
        },
        setAuthorSearch(state, action) {
            return {
                ...state,
                authorSearch: action.payload,
            };
        },
        setKindSearch(state, action) {
            return {
                ...state,
                kindSearch: action.payload,
            };
        },
    },
});

const { actions, reducer } = search;

// export const { initialState } = counterSlice.
export const { setSearch, setSongSearch, setAuthorSearch, setKindSearch } = actions; // export action
export default reducer; //ngầm hiểu chúng ta đang export counterSlice
