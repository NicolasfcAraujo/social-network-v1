import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import userSlice from "./features/userSlice"

const persistConfig = {
    key: "root",
    storage
}

const reducer = combineReducers({
    user: userSlice
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer
})

export default store