import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxArchive, faUser } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import { Context } from '../../lib/Context';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
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
                <Row>
                    <Col xs={1} />
                    <Col style={{ textAlign: 'center' }}>
                        <Button className="sidebar-button" onClick={() => {
                            handleSwitchPage('login-welcome');
                            closeSidebar(false);
                        }} variant="primary">
                            <FontAwesomeIcon icon={faBoxArchive} /> Login Screen
                        </Button><br />
                        <Button className="sidebar-button" onClick={() => {
                            setShowAccount(true);
                            setShowSidebar(false);
                        }} variant="primary">
                            <FontAwesomeIcon icon={faUser} /> My Account
                        </Button><br />
                    </Col>
                    <Col xs={1} />
                </Row>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default Sidebar