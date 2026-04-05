import { createContext} from "react";
import { useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const contextValue = {
        // Add any global state or functions here
            user,
            setUser
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}


export default AppContext;