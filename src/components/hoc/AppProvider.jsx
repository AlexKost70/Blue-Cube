import { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [currentTab, setCurrentTab] = useState(false);
    return(
        <AppContext.Provider value={{ currentTab, setCurrentTab }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;