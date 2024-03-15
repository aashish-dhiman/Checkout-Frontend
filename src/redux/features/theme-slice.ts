import { ThemeState } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";


const initialState: ThemeState = {
    theme: {
        "--background": "hsl(0, 0%, 100%)",
        "--foreground": "hsl(240, 10%, 3.9%)",
        "--primary": "hsl(240, 5.9%, 10%)",
        "--primary-foreground": "hsl(0, 0%, 98%)",
    },
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: { payload: ThemeState["theme"] }) => {
            state.theme = action.payload;
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
