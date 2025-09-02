import { createSlice } from '@reduxjs/toolkit';



const getInitialUser = () => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
        username: '',
        isLoggedIn: false,
        isAdminLoggedIn: false,
        showLoginModal: false,
        userData: null
        
    };
};

const initialState = getInitialUser();

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const newUser = action.payload;

            if (newUser.username=="user"&&newUser.password=="12345678")  {
                state.isLoggedIn = true;
                state.showLoginModal = false;
                state.username = newUser.username;
                state.userData = { name: newUser.username };
                localStorage.setItem('user', JSON.stringify(state));
            }
            else if (newUser.username=="admin"&&newUser.password=="12345678") {
                console.log("Admin logged in");
                state.isAdminLoggedIn = true;
                state.showLoginModal = false;
                state.username = newUser.username;
                state.userData = { name: newUser.username };
            
                localStorage.setItem('user', JSON.stringify(state));
            }
            else{
                console.log("Invalid credentials");
                //invalid creds, dont change state
                return;}
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.isAdminLoggedIn = false;  
            state.userData = null;
            state.username = '';
    
            localStorage.removeItem('user');
        },
        showLoginModal: (state) => {
            state.showLoginModal = true;
            localStorage.setItem('user', JSON.stringify(state));
        },
        hideLoginModal: (state) => {
            state.showLoginModal = false;
            localStorage.setItem('user', JSON.stringify(state));
        },
    },
});

export const { login, logout, showLoginModal, hideLoginModal } = userSlice.actions;
export default userSlice.reducer;