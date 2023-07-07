import "./NotFoundPage.css";
import { useContext, useEffect } from "react";
import ReturnButton from "../returnButton/ReturnButton";
import { Box } from "@mui/material";
import { AppContext } from "../hoc/AppProvider";

export default function NotFoundPage() {
    const { setCurrentTab } = useContext(AppContext);
    useEffect(() => setCurrentTab(false));

    return(
        <Box className="wrapper wrapper-notfound">
            <ReturnButton>Назад</ReturnButton>
            <div className="notfound">
                <h1>404</h1>
                <p>Страница не найдена</p>
            </div>
        </Box>
    )
}