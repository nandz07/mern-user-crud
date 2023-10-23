import {configureStore} from '@reduxjs/toolkit';
import usernameReducer from './usernameReducer';

const store=configureStore({
    reducer:{
        user:usernameReducer,

    },
})

export default store;