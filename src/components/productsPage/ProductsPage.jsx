import React from "react";
import { useEffect, useState } from "react";
import "./ProductsPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Rating, Pagination, CircularProgress, PaginationItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import starImg from "../../assets/star.svg";
import emptyStarImg from "../../assets/emptyStar.svg";
import arrowImg from "../../assets/arrow.svg";

export default function ProductsPage() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isSmallerScreen = useMediaQuery(theme.breakpoints.down(401));
    const navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState('');
    const [page, setPage] = useState(Number(params.page));
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    const handlePageChange = (event, value) => {
        setIsPageLoaded(false);
        setPage(value);
        navigate(`/pages/${value}`);
    }

    const fetchData = async (page) => {
        fetch('https://skillfactory-task.detmir.team/products?limit=15&page=' + page)
        .then((response) => { return response.json(); })
        .then((serverData) => { setData(serverData.data) })
        .then(() => setIsPageLoaded(true))
        .catch(() => { console.log('error') });
    }

    useEffect(() => {
        if (!(Number(params.page) < 10 && Number(params.page) > 0)) {
            handlePageChange(null, 1);
        }
        fetchData(page);
    }, [page]);

    function Arrow() {
        return <img src={arrowImg} />
    }

    function ArrowRotated() {
        return <img src={arrowImg} style={{ transform: "rotate(180deg)" }} />
    }

    return(
        <main>
            { !isPageLoaded ? <div className="loader-block"> <CircularProgress disableShrink /> </div> :
                <div className="cards-block">
                    {
                        data?.length > 0 && data.map((item) => {
                            return(
                                <Card sx={{ maxWidth: 250, maxHeight: 358, borderRadius: 4 }} key={item.id}>
                                    <CardMedia
                                        sx={{ height: 250, width: 250 }}
                                        image={item.picture}
                                        title={item.title}
                                    />
                                    <CardContent className="card-content">
                                        <Typography gutterBottom component="div" className="card-title" fontSize={16}>
                                            {item.title}
                                        </Typography>
                                        <Typography>
                                            <Rating 
                                                name="read-only" 
                                                value={item.rating}
                                                precision={0.5}
                                                icon={<img src={starImg} style={{marginRight: "4px"}} alt="Иконка золотой звезды" />}
                                                emptyIcon={<img src={emptyStarImg} style={{marginRight: "4px"}} alt="Иконка белой звезды" />}
                                                readOnly 
                                            />
                                        </Typography>
                                        <Typography fontWeight="bold" mt={1.5} className="card-price">
                                            {
                                                item.price.toString().length >= 3 ? item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : item.price
                                            } ₽
                                        </Typography>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </div>
            }
            <Pagination 
                count={10} 
                page={page} 
                onChange={handlePageChange} 
                variant="outlined" 
                shape="rounded"
                boundaryCount={isSmallerScreen ? 0 : isSmallScreen ? 1 : 2}
                siblingCount={0}
                renderItem={(item) => (
                    <PaginationItem
                        components= {{ previous: Arrow, next: ArrowRotated }}
                        {...item}
                    />
                )}
            />
        </main>
    );
}
