import { Button } from "@mui/material";
import "./ReturnButton.css";
import arrowImg from "../../assets/arrow.svg";
import { useNavigate } from "react-router-dom";

export default function ReturnButton (props) {
    const navigate = useNavigate();
    return(
        <Button 
            variant="text" 
            className="return-button"
            onClick={() => {
                console.log(window.history);
                if (window.history.state && window.history.state.idx > 0) {
                    navigate(-1);
                } else {
                    navigate('/pages/1', { replace: true });
                }
            }}
            sx={{ 
                textTransform: "none",
                backgroundColor: "transparent",
                color: "var(--brand)",
                fontSize: 16,
                fontWeight: 700,
                lineHeight: "20px"
            }}
        ><img src={arrowImg} style={{marginRight: 4}} alt="Иконка со стрелкой" />{props.children}</Button>
    )
}