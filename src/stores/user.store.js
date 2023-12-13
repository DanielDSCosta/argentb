import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    username: "", // Add a new field for the username
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsername: (state, action) => { // Add a new action to update the username
      state.username = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.username = ""; // Clear the username when the user logs out
    },
  },
});

// Destructure the actions for easier use
export const { setToken, setUsername, logout } = userSlice.actions;

// Combine the reducers
const rootReducer = combineReducers({
  user: userSlice.reducer,
});

// Configure the persist reducer
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Create the persistor
export const persistor = persistStore(store);