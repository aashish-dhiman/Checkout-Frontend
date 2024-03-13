import React from "react";
import { ModeToggle } from "../ToggleMode";

interface Props {}

const Header = (props: Props) => {
    return (
        <div className="w-full flex items-center justify-end ">
            <ModeToggle />
        </div>
    );
};

export default Header;
