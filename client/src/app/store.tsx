import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './features/Auth/authSlice';
import userReducer from './features/User/userSlice';
import storage from 'redux-persist/lib/storage';
import persistReducer from "redux-persist/es/persistReducer";
import { userApi } from "../services/User/UserService";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { FLUSH,REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer
})

const middleware = (getDefaultMiddleware: any) => getDefaultMiddleware({serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
}}).concat(userApi.middleware);

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export function setupStore(preloadedState?: Partial<RootState>){
    return configureStore({
        reducer: persistedReducer,
        middleware
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch : () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;