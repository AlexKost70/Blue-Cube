import "./NotFoundPage.css";
import ReturnButton from "../returnButton/ReturnButton";
import { Box } from "@mui/material";

export default function NotFoundPage() {
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