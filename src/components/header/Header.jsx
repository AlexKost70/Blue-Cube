import React, { useContext } from "react";
import "./Header.css";
import logoImg from "../../assets/logo.svg";
import cartImg from "../../assets/cart.svg";
import Divider from "@mui/material/Divider";
import { Link as RouterLink } from "react-router-dom";
import { Tabs, Tab, Box, Link } from "@mui/material";
import { AppContext } from "../../hoc/AppProvider";

function LinkTab(props) {
    return (
        <Tab
            component={RouterLink}
            className="tab"
            {...props}
        />
    );
}

export default function Header() {
    const { currentTab } = useContext(AppContext);
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
                    <Link className="cart" href="#"><img src={cartImg} alt="Логотип корзины" />Корзина (0)</Link>
                </header>
            </Box>
            <Divider className="divider" sx={{ borderColor: "#E6F1FC" }} />
        </React.Fragment>
    )
}