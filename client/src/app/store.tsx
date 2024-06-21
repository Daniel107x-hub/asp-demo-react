import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './features/Auth/authSlice';
import userReducer from './features/User/userSlice';
import storage from 'redux-persist/lib/storage';
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export function setupStore(preloadedState?: Partial<RootState>){
    return configureStore({
        reducer: persistedReducer
    });
}


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
