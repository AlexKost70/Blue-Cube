import { createContext, useState } from "react";

export const AppContext = createContext({});


export const AppProvider = ({ children }) => {
    const [currentTab, setCurrentTab] = useState(false);
    const [cart, setCart] = useState([]);

    const updateCart = async (cart) => {
        let cartBody = { data: [] };
    
        cart.forEach(item => {
            cartBody.data.push({
                id: item.product.id,
                quantity: item.quantity
            });
        });

        console.log(cartBody);

        let response = await fetch('https://skillfactory-task.detmir.team/cart/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(cartBody)
        });
    }

    return(
        <AppContext.Provider value={{ currentTab, setCurrentTab, cart, setCart, updateCart }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;