import React, { useContext } from 'react'
import { Context } from '../../lib/Context';
import LoginWelcome from './LoginWelcome';
import Container from 'react-bootstrap/Container';
import Footer from '../Footer';

const PageContainer = () => {
    const { viewPage, firstname, lastname, email, profilePicture } = useContext(Context);
    return (
        <>
            <Container style={{ backgroundColor: 'white', paddingTop: '20px', paddingBottom: '20px' }}>
                {!email && <p>Please login to continue</p>}
                {email &&
                    <>
                        Welcome: {firstname} {lastname}<br />{email}<br />
                        {profilePicture && <img src={profilePicture} alt={firstname + lastname} />}
                    </>
                }
                {email &&
                    <div>
                        {viewPage === 'login-welcome' &&
                            <LoginWelcome />}
                    </div>
                }
            </Container>
            <Footer />
        </>

    )
}

export default PageContainer