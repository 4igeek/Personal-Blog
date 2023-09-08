import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxArchive, faUser } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import { Context } from '../../lib/Context';
import Stack from 'react-bootstrap/Stack';
import '../../lib/css/Sidebar.css'

const Sidebar = (props) => {
    const { APP_NAME, handleSwitchPage } = useContext(Context);
    const { setShowAccount, showSitebar, setShowSidebar } = props;

    const closeSidebar = () => {
        setShowSidebar(false);
    }

    return (
        <Offcanvas show={showSitebar} onHide={closeSidebar}>
            <Offcanvas.Header closeButton>
                {APP_NAME}
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={1}>
                    <div>
                        <Button className="sidebar-button" onClick={() => {
                            handleSwitchPage('login-welcome');
                            closeSidebar(false);
                        }} variant="primary">
                            <FontAwesomeIcon icon={faBoxArchive} /> Login Screen
                        </Button>
                    </div>
                    <div>
                        <Button className="sidebar-button" onClick={() => {
                            setShowAccount(true);
                            setShowSidebar(false);
                        }} variant="primary">
                            <FontAwesomeIcon icon={faUser} /> My Account
                        </Button>
                    </div>
                    <div className="p-2">Third item</div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default Sidebar