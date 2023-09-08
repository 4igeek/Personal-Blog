import { createContext, useCallback, useState } from 'react';

export const Context = createContext({});

const ContextProvider = ({ children }) => {
    const API_LINK = process.env.REACT_APP_API_LINK;
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [email, setEmail] = useState(null)
    const [profilePicture, setProfilePicture] = useState(null);
    const [viewPage, setViewPage] = useState('login-welcome');

    const APP_NAME = process.env.REACT_APP_APP_NAME;

    const getUserProfile = useCallback(() => {
        console.log('Fetching')
        fetch(API_LINK + '/profile', {
            credentials: 'include',
            method: 'GET'
        }).then(response => {
            response.json().then(data => {
                setFirstname(data.firstname);
                setEmail(data.email);
                setLastname(data.lastname);
                setProfilePicture(data.profilePicture);
            })
        })
    }, [API_LINK])

    const logout = () => {
        fetch(API_LINK + '/logout', {
            credentials: 'include',
            method: 'POST'
        }).then(response => {
            response.json().then(data => {
                setFirstname(null);
                setEmail(null);
                setLastname(null);
                setProfilePicture(null);
            })
        });
    }

    const handleSwitchPage = (page) => {
        setViewPage(page);
    }

    return (<Context.Provider value={{
        getUserProfile, logout, handleSwitchPage,
        API_LINK, APP_NAME,
        viewPage, setViewPage,

        firstname, setFirstname,
        lastname, setLastname,
        email, setEmail,
        profilePicture, setProfilePicture

    }}>
        {children}
    </Context.Provider>
    )
}

export default ContextProvider;