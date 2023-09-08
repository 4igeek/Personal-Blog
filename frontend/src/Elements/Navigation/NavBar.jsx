import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Context } from '../../lib/Context';
import SidebarNav from './SidebarNav';

const NavBar = (props) => {
    const { APP_NAME, email, logout } = useContext(Context);
    const [showSitebar, setShowSidebar] = useState(false);
    const { setShowAuth, setShowAccount } = props;

    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        {APP_NAME}
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {!email ?
                                <Button variant="primary" onClick={() => { setShowAuth(true) }}>
                                    Login
                                </Button>
                                :
                                <>
                                    <Button variant="secondary" onClick={() => { setShowSidebar(true) }}>
                                        <FontAwesomeIcon icon={faBars} />
                                    </Button>{' '}
                                    <Button variant="danger" onClick={logout}>Log out</Button>
                                </>
                            }
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <SidebarNav
                setShowAccount={setShowAccount}
                showSitebar={showSitebar} setShowSidebar={setShowSidebar}
            />
        </>
    );
}

export default NavBar