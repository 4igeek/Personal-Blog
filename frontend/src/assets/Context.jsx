import { createContext } from 'react';

export const Context = createContext({});

const ContextProvider = ({ children }) => {
    const API_LINK = process.env.REACT_APP_API_LINK;
    const APP_NAME = process.env.REACT_APP_APP_NAME;
    const BUTTON_COLOR = '00df9a';
    const BACKGROUND_COLOR = '0F172A';


    return (<Context.Provider value={{
        API_LINK, APP_NAME,
        BUTTON_COLOR, BACKGROUND_COLOR
    }}>
        {children}
    </Context.Provider>
    )
}

export default ContextProvider;