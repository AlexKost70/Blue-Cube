import { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [currentTab, setCurrentTab] = useState(false);
    const [cart, setCart] = useState([]);
    return(
        <AppContext.Provider value={{ currentTab, setCurrentTab, cart, setCart }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;