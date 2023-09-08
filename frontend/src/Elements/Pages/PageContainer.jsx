import React, { useContext } from 'react'
import { Context } from '../../lib/Context';
import AdminHome from './Pages/AdminHome';
import Settings from './Pages/Settings';
import Footer from '../Footer';
import HomePage from './Pages/HomePage';
import AddPost from './Pages/AddPost';

const PageContainer = () => {
    // eslint-disable-next-line
    const { viewPage, email, firstname, lastname, profilePicture } = useContext(Context);
    return (
        <>
            {!email && <HomePage />}
            {email &&
                <div>
                    {viewPage === 'admin-home' &&
                        <AdminHome />
                    }
                    {viewPage === 'settings-page' &&
                        <Settings />
                    }
                    {viewPage === 'add-post' &&
                        <AddPost />
                    }
                </div>
            }
            <Footer />
        </>

    )
}

export default PageContainer