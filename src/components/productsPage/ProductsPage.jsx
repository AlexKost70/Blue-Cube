import React from "react";
import { useEffect, useState } from "react";
import "./ProductsPage.css";
import { Card, CardMedia, CardContent, Typography, Rating, Pagination } from "@mui/material";
import star from "./star.svg";
import emptyStar from "./emptyStar.svg";

export default function ProductsPage() {
    const [data, setData] = useState('');
    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => {
        fetchData(value);
        setPage(value);
    }

    const fetchData = async (page) => {
        fetch('https://skillfactory-task.detmir.team/products?limit=15&page=' + page)
        .then((response) => { return response.json(); })
        .then((serverData) => { setData(serverData.data) })
        .catch(() => { console.log('error') });
    }

    useEffect(() => {
        fetchData(page);
    }, []);

    return(
        <main>
            {
                data?.length > 0 &&
                (data.map((item) => {
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
                                        icon={<img src={star} style={{marginRight: "4px"}} alt="Иконка золотой звезды" />}
                                        emptyIcon={<img src={emptyStar} style={{marginRight: "4px"}} alt="Иконка белой звезды" />}
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
                }))
            }
            <Pagination count={10} page={page} onChange={handlePageChange} />
        </main>
    );
}
