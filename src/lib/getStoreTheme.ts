import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const GetThemeFromStore = () => {
    const { theme } = useSelector((state: RootState) => state.theme);
    return theme;
};
