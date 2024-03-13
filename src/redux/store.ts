import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "@/redux/features/data-slice";
import themeReducer from "@/redux/features/theme-slice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        order: dataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
