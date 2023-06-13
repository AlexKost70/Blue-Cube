import React from "react";
import "./Header.css";
import logo from "./logo.svg";
import cart from "./cart.svg";
import Divider from "@mui/material/Divider";
import { Tabs, Tab, Box, Link } from "@mui/material";

export default class Header extends React.Component {
    render() {
        return(
            <React.Fragment>
                <Box className="wrapper">
                    <header>
                        <img className="logo" src={logo} alt="Логотип магазина" />
                        <Tabs className="tabs" value="/" TabIndicatorProps={{
                            sx: {
                                bgcolor: "#0073E6",
                                height: "3px",
                                borderRadius: "100px",
                            }
                        }}>
                            <Tab className="tab"  label="Товары" value="/" sx={{ mr: "16px" }} />
                            <Tab className="tab" label="Заказы" value="/orders"  />
                        </Tabs>
                        <Link className="cart" href="#"><img src={cart} alt="Логотип корзины" />Корзина (0)</Link>
                    </header>
                </Box>
                <Divider className="divider" sx={{ borderColor: "#E6F1FC" }} />
            </React.Fragment>
        );
    }
}