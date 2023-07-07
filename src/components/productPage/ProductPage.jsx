import { useEffect, useContext, useState } from "react";
import { AppContext } from "../hoc/AppProvider";
import { Box, CircularProgress, Rating, Typography, Button } from "@mui/material";
import ReturnButton from "../returnButton/ReturnButton";
import { useParams } from "react-router-dom";
import starImg from "../../assets/star.svg";
import emptyStarImg from "../../assets/emptyStar.svg";
import undoImg from "../../assets/undo.svg"
import "./ProductPage.css";

export default function ProductPage() {
    const { setCurrentTab } = useContext(AppContext);
    const params = useParams();
    const [data, setData] = useState('');
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    const fetchData = async (id) => {
        fetch('https://skillfactory-task.detmir.team/products/' + id)
        .then((response) => { return response.json(); })
        .then((serverData) => { setData(serverData) })
        .then(() => setIsPageLoaded(true))
        .catch(() => { console.log('error') });
    }

    useEffect(() => {
        setCurrentTab(false);
        fetchData(params.id);
    }, []);

    return(
        <main className="product">
            <Box className="wrapper wrapper-product">
                <ReturnButton>Назад</ReturnButton>
                { !isPageLoaded ? <div className="loader-block"> <CircularProgress disableShrink /> </div> :
                    <div className="item">
                        <div className="item-main">
                            <img src={data.picture} title={data.title} alt={data.title} />
                            <div className="info">
                                <Typography variant="h1" fontSize={28} fontWeight={700} className="title">{data.title}</Typography>
                                <Rating 
                                    name="read-only" 
                                    value={data.rating}
                                    precision={0.5}
                                    icon={<img src={starImg} style={{marginRight: "4px"}} alt="Иконка золотой звезды" />}
                                    emptyIcon={<img src={emptyStarImg} style={{marginRight: "4px"}} alt="Иконка белой звезды" />}
                                    readOnly
                                    className="rating" 
                                />
                                <Typography fontWeight="bold" fontSize={28} className="price">
                                    {
                                        data.price.toString().length >= 3 ? data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : data.price
                                    } ₽
                                </Typography>
                                <Button variant="contained">Добавить в корзину</Button>
                                <Typography fontSize={16} fontWeight={"bold"} className="conditions-title">
                                    <img src={undoImg} alt={"Иконка стрелки, направленной назад"} style={{marginRight: 8}} />
                                    Условия возврата
                                </Typography>
                                <Typography fontSize={16} className="conditions">
                                    Обменять или вернуть товар надлежащего качества можно в течение 14 дней с момента покупки.
                                </Typography>
                                <Typography fontSize={12} className="price-warning">
                                    Цены в интернет-магазине могут отличаться от розничных магазинов.
                                </Typography>
                            </div>
                        </div>
                        <div className="item-description">
                            <Typography variant="h2" fontSize={20} fontWeight={700} style={{marginBottom: 16}}>Описание</Typography>
                            <div className="description" dangerouslySetInnerHTML={{__html: data.description}}></div>
                        </div>
                    </div>
                }
            </Box>
        </main>
    )
}