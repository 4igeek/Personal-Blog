import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../lib/Context'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const MyAccountModal = (props) => {
    const { showAccount, setShowAccount } = props;
    const { API_LINK, firstname, lastname, email, setFirstname, setLastname } = useContext(Context);
    const [thisFirstname, setThisFirstname] = useState('');
    const [thisLastname, setThisLastname] = useState('');

    useEffect(() => {
        setThisFirstname(firstname);
        setThisLastname(lastname);
    }, [firstname, lastname]);

    const buildInputs = (event) => {
        const value = event.target.value;
        const type = event.target.name;
        switch (type) {
            case 'firstname':
                setThisFirstname(value);
                break;
            case 'lastname':
                setThisLastname(value);
                break;
            default:
                break;
        }
    }

    const closeModal = () => {
        setShowAccount(false);
    }

    const updateAccount = async () => {
        const response = await fetch(API_LINK + '/update-account', {
            method: 'POST',
            body: JSON.stringify({ email, firstname: thisFirstname, lastname: thisLastname }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        if (response.ok) {
            response.json().then(async data => {
                setFirstname(data.user.firstname);
                setLastname(data.user.lastname);
                closeModal();
            });
        }
    }

    return (
        <Modal show={showAccount} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>My Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>This is where you control your account preferences.</p>
                <Form>
                    <h6>Personal Information</h6>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="input-firstname">
                                <Form.Control value={thisFirstname} name="firstname" onInput={buildInputs}
                                    type="text" placeholder="Firstname" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="input-lastname">
                                <Form.Control value={thisLastname} name="lastname" onInput={buildInputs}
                                    type="text" placeholder="Lastname" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={updateAccount}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MyAccountModal