import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxArchive, faGears, faUser } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import { Context } from '../../lib/Context';
import Stack from 'react-bootstrap/Stack';
import '../../lib/css/Sidebar.css'

const Sidebar = (props) => {
    const { APP_NAME, handleSwitchPage } = useContext(Context);
    const { setShowAccount, showSidebar, setShowSidebar, email, setShowAuth, logout } = props;

    const closeSidebar = () => {
        setShowSidebar(false);
    }

    return (
        <Offcanvas show={showSidebar} onHide={closeSidebar}>
            <Offcanvas.Header closeButton>
                {APP_NAME}
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={1}>
                    <Button className="sidebar-button" onClick={() => {
                        handleSwitchPage('login-welcome');
                        closeSidebar(false);
                    }} variant="primary">
                        <FontAwesomeIcon icon={faBoxArchive} /> Home
                    </Button>
                    <Button className="sidebar-button" onClick={() => {
                        handleSwitchPage('settings-page');
                        closeSidebar(false);
                    }} variant="primary">
                        <FontAwesomeIcon icon={faGears} /> Settings
                    </Button>
                    <Button className="sidebar-button" onClick={() => {
                        setShowAccount(true);
                        setShowSidebar(false);
                    }} variant="primary">
                        <FontAwesomeIcon icon={faUser} /> Account
                    </Button>
                    {!email &&
                        <Button variant="primary" onClick={() => {
                            setShowAuth(true)
                            setShowSidebar(false);
                        }}>
                            Login
                        </Button>
                    }
                    {email &&
                        <>
                            <Button variant="danger" onClick={() => {
                                setShowSidebar(false);
                                logout();
                            }}>Log out</Button>
                        </>
                    }
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default Sidebar