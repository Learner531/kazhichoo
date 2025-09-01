import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : {
        isDarkMode: false
    };
};

const initialState = getInitialTheme();

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleDarkMode: (state, action) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem('isDarkMode', JSON.stringify(state));
        },
    },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;