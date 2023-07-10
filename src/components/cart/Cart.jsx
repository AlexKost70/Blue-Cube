import React, { useState, useContext, useEffect } from "react";
import { Box, Button, ButtonGroup, Dialog, Typography } from "@mui/material";
import { AppContext } from "../../hoc/AppProvider";
import trashImg from "../../assets/trash.svg";
import "./Cart.css";

export default function Cart(props) {
    const [total, setTotal] = useState(0);
    const { cart, setCart, updateCart } = useContext(AppContext);

    useEffect(() => {
        let counter = 0;
        cart.forEach(item => {
            counter += item.product.price * item.quantity;
        });
        setTotal(counter);
    }, [cart]);

    const updateItemQuantity = (action, currentQuantity, id) => {
        let newQuantity = currentQuantity;
        switch(action) {
            case "increase":
                newQuantity++;
                break;
            case "decrease":
                newQuantity--;
                break;
            default:
                console.log("updateItemQuantity error");
                break;
        }

        let newCart = cart.map(item => {
            if (item.product.id === id) {
                return {...item, quantity: newQuantity};
            } else {
                return item;
            }
        });
        setCart(newCart);
        updateCart(newCart);
    }

    const removeItem = (id) => {
        let newCart = cart.filter(item => {
            return item.product.id !== id;
        });
        setCart(newCart);
        updateCart(newCart);
    }

    const handleSubmit = async () => {
        let response = await fetch('https://skillfactory-task.detmir.team/cart/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        setCart([]);
    }

    return(
        <Dialog
            {...props}
            className="card-modal"
        >
            <Box className="card-content">
                <div className="card-footer">
                    <div className="cart-items">
                        {
                            cart.map(item =>
                                <div className="item" key={item.product.id}>
                                    <img src={item.product.picture} alt={item.product.title} title={item.product.title} />
                                    <Typography className="title" title={item.product.title}>{item.product.title}</Typography>
                                    <ButtonGroup variant="contained" className="items-counter">
                                        <Button disabled={item.quantity === 0} onClick={() => updateItemQuantity("decrease", item.quantity, item.product.id)}>−</Button>
                                        <p>{item.quantity}</p>
                                        <Button onClick={() => updateItemQuantity("increase", item.quantity, item.product.id)}>+</Button>
                                    </ButtonGroup>
                                    {
                                        item.quantity === 0 ? 
                                        <Button 
                                            className="remove-button" 
                                            variant="text"
                                            sx={{ 
                                                textTransform: "none",
                                                backgroundColor: "transparent",
                                                color: "var(--focus)",
                                                fontSize: 16,
                                                fontWeight: 700,
                                                lineHeight: "20px"
                                            }}
                                            onClick={() => removeItem(item.product.id)}
                                        ><img style={{marginRight: 4, width: 20, height: 20}} src={trashImg} alt="Иконка мусорной корзины" />Удалить</Button> 
                                        : 
                                        <Typography className="price">{item.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</Typography>
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div className="total-text">
                        <Typography className="total-name">Итого</Typography>
                        <Typography className="total-price">{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</Typography>
                    </div>
                    <Button disabled={cart.length === 0} onClick={handleSubmit} variant="contained" className="brand-button">Оформить заказ</Button>
                </div>
            </Box>
        </Dialog>
    )
}