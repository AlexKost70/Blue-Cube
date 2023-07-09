import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import logoImg from "../../assets/logo.svg";
import cartImg from "../../assets/cart.svg";
import Divider from "@mui/material/Divider";
import { Link as RouterLink } from "react-router-dom";
import { Tabs, Tab, Box, Link } from "@mui/material";
import { AppContext } from "../../hoc/AppProvider";
import Cart from "../cart/Cart";


export default function Header() {
    function LinkTab(props) {
        return (
            <Tab
                component={RouterLink}
                className="tab"
                {...props}
            />
        );
    }

    const { currentTab, cart, setCart } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    
    const fetchData = async () => {
        fetch('https://skillfactory-task.detmir.team/cart')
        .then((response) => { return response.json(); })
        .then((serverData) => { setCart(serverData) })
        .then(() => console.log("получили данные", cart))
        .catch(() => { console.log('error') });
    }
    

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <React.Fragment>
            <Box className="wrapper">
                <header>
                    <img className="logo" src={logoImg} alt="Логотип магазина" />
                    <Tabs className="tabs" value={currentTab} TabIndicatorProps={{
                        sx: {
                            bgcolor: "#0073E6",
                            height: "3px",
                            borderRadius: "100px",
                        }
                    }}>
                        <LinkTab to="/pages/1"  label="Товары" value="main" sx={{ mr: "16px" }} />
                        <LinkTab to="/orders" label="Заказы" value="orders"  />
                    </Tabs>
                    <Link className="cart" onClick={() => setOpen(true)}><img src={cartImg} alt="Логотип корзины" />Корзина ({cart.length})</Link>
                </header>
            </Box>
            <Divider className="divider" sx={{ borderColor: "#E6F1FC" }} />
            <Cart open={open} onClose={() => setOpen(false)} />
        </React.Fragment>
    )
}