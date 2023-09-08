import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faFileCirclePlus, faGears, faHouseChimney, faUserSecret, faXmark } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Context } from '../../lib/Context';
import SidebarNav from './SidebarNav';

const NavBar = (props) => {
    const { APP_NAME, email, logout, handleSwitchPage } = useContext(Context);
    const [showSidebar, setShowSidebar] = useState(false);
    const { setShowAuth, setShowAccount } = props;

    return (
        <>
            <Navbar style={{ backgroundColor: '#000300' }}>
                <Container>
                    <Navbar.Brand className="me-auto text-uppercase fw-bold">
                        <span style={{ color: '#00df9a' }}>
                            {APP_NAME}
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {/* hide on lg and wider screens */}
                            <div className="d-lg-none" style={{ color: '#ffffff' }}>
                                {showSidebar ?
                                    <FontAwesomeIcon size={'2x'} icon={faXmark} onClick={() => { setShowSidebar(true) }} />
                                    :
                                    <FontAwesomeIcon size={'2x'} icon={faBars} onClick={() => { setShowSidebar(true) }} />
                                }
                            </div>
                            {/* hide on screens smaller than lg */}
                            <div className="d-none d-lg-block">
                                {!email &&
                                    <Button variant="primary" className="text-uppercase fw-bold" style={{
                                        marginLeft: '20px', backgroundColor: '#00df9a', borderColor: '#00df9a', color: 'black'
                                    }}
                                        onClick={() => { setShowAuth(true) }}>
                                        Login
                                    </Button>
                                }
                                {email &&
                                    <>
                                        <Nav className="me-auto text-uppercase">
                                            <Nav.Link onClick={() => { handleSwitchPage('admin-home') }}
                                                style={{ color: '#ffffff', marginRight: '10px' }}>
                                                <FontAwesomeIcon icon={faHouseChimney} /> Home
                                            </Nav.Link>
                                            <Nav.Link onClick={() => { handleSwitchPage('settings-page') }}
                                                style={{ color: '#ffffff', marginRight: '10px' }}>
                                                <FontAwesomeIcon icon={faGears} /> Settings
                                            </Nav.Link>
                                            <Nav.Link onClick={() => { setShowAccount(true) }} style={{ color: '#ffffff', marginRight: '10px' }}>
                                                <FontAwesomeIcon icon={faUserSecret} /> Account
                                            </Nav.Link>
                                            <Nav.Link onClick={() => { handleSwitchPage('add-post') }}
                                                style={{ color: '#ffffff', marginRight: '10px' }}>
                                                <FontAwesomeIcon icon={faFileCirclePlus} /> New Post
                                            </Nav.Link>
                                            <Button className="text-uppercase fw-bold" variant="danger" style={{
                                                backgroundColor: '#00df9a', borderColor: '#00df9a', color: 'black'
                                            }} onClick={logout}>Log out</Button>
                                        </Nav>
                                    </>
                                }
                            </div>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <SidebarNav
                setShowAccount={setShowAccount}
                showSidebar={showSidebar} setShowSidebar={setShowSidebar}
                email={email} setShowAuth={setShowAuth} logout={logout}
            />
        </>
    );
}

export default NavBar