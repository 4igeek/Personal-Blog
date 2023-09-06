import { useContext, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Button from 'react-bootstrap/Button';
import validateEmail from '../../lib/Functions/validateEmail';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Context } from '../../lib/Context';

function AuthModal(props) {
    const { showAuth, setShowAuth } = props;
    const { API_LINK, setFirstname, setLastname, setEmail, setProfilePicture } = useContext(Context);
    const [loginEmail, setLoginEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [securityCodeSent, setSecurityCodeSent] = useState(false);
    const [validationCode, setValidationCode] = useState('');
    const [codeValid, setCodeValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // If user has password or not (if email has been validated then password will be set).
    const [emailValidated, setEmailValidated] = useState(false);

    // This is run upon successful Google login.
    const onSuccess = async (credentialResponse) => {
        const credential = credentialResponse.credential;
        const response = await fetch(API_LINK + '/verify-google-token', {
            method: 'POST',
            body: JSON.stringify({ credential }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        if (response.ok) {
            response.json().then(async data => {
                if (data.error) {
                    console.log('There was an error: ' + data.error);
                } else {
                    setFirstname(data.firstname);
                    setEmail(data.email);
                    setLastname(data.lastname);
                    setProfilePicture(data.profilePicture);
                    setShowAuth(false);
                }
            });
        }
    }

    // This builds the input data from the form inputs.
    const buildInputs = (event) => {
        const value = event.target.value;
        const type = event.target.name;
        switch (type) {
            case 'validation-code':
                setValidationCode(value);
                break;
            case 'password':
                setPassword(value);
                confirmPassword === value && confirmPassword.length > 0 ? setPasswordsMatch(true) : setPasswordsMatch(false);
                break;
            case 'confirm-password':
                setConfirmPassword(value);
                password === value && password.length > 0 ? setPasswordsMatch(true) : setPasswordsMatch(false);
                break;
            default:
                break;
        }
    }

    // Checks to see if an email is valid and if it is retrieves the information from the backend.
    const buildEmail = async (event) => {
        setValidEmail(false);
        const userInput = event.target.value.toLowerCase();
        const isValid = validateEmail(userInput);
        if (isValid) {
            const response = await fetch(API_LINK + '/check-users-email', {
                method: 'POST',
                body: JSON.stringify({ email: userInput }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            if (response.ok) {
                response.json().then(async data => {
                    setEmailValidated(data);
                    setValidEmail(true);
                });
            }
        }
        setLoginEmail(userInput);
    }

    const generateValidationCode = async () => {
        const response = await fetch(API_LINK + '/generate-validation-code', {
            method: 'POST',
            body: JSON.stringify({ email: loginEmail }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        if (response.ok) {
            response.json().then(async data => {
                console.log(data);
                setSecurityCodeSent(true);
            });
        }
    }

    const submitValidationCode = async () => {
        const response = await fetch(API_LINK + '/submit-validation-code', {
            method: 'POST',
            body: JSON.stringify({ validationCode, email: loginEmail }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        if (response.ok) {
            response.json().then(async data => {
                setCodeValid(data);
                setSecurityCodeSent(true);
                if (!data) {
                    setErrorMessage('That code is not correct. Please try again!');
                } else {
                    setErrorMessage('');
                }
            });
        }
    }

    const setNewPassword = async () => {
        const response = await fetch(API_LINK + '/set-new-password', {
            method: 'POST',
            body: JSON.stringify({ password, email: loginEmail }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        if (response.ok) {
            response.json().then(async () => {
                await login();
            });
        }
    }

    const login = async () => {
        const response = await fetch(API_LINK + '/login', {
            method: 'POST',
            body: JSON.stringify({ password, email: loginEmail }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        if (response.ok) {
            response.json().then(async data => {
                setFirstname(data.firstname);
                setEmail(data.email);
                setLastname(data.lastname);
                setProfilePicture(data.profilePicture)
                closeModal();
            });
        } else {
            setErrorMessage('That doesn\'t see mt be the right password for this email.')
        }
    }

    const closeModal = () => {
        setShowAuth(false);
        setLoginEmail('');
        setPassword('');
        setPasswordsMatch(false);
        setConfirmPassword('');
        setValidEmail(false);
        setSecurityCodeSent(false);
        setValidationCode('');
        setCodeValid(false);
        setErrorMessage('');
    }

    const forgotPassword = () => {
        setEmailValidated(false);
        setSecurityCodeSent(false);

    }

    return (
        <Modal show={showAuth} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Login or Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row style={{ marginBottom: '30px' }}>
                    <Form>
                        <p>Please enter in the email you wish to login or register with.</p>
                        <Form.Group className="mb-3" controlId="login-email">
                            <Form.Control type="email" value={loginEmail} onInput={buildEmail} placeholder="name@example.com" />
                        </Form.Group>
                        {validEmail && !emailValidated && !securityCodeSent &&
                            <p>Please generate a code using the button below.</p>
                        }
                        {validEmail && emailValidated &&
                            <>
                                <Form.Group className="mb-3" controlId="login-password">
                                    <Form.Control type="password" name="password" value={password} onInput={buildInputs}
                                        placeholder="Password" />
                                </Form.Group>
                                <p onClick={forgotPassword} style={{
                                    color: '#0D6EFD', width: '100%', textAlign: 'center', cursor: 'pointer'
                                }}>Forgot Password?</p>
                            </>
                        }
                        {validEmail && !emailValidated && securityCodeSent && !codeValid &&
                            <>
                                <p>Please check your email and enter in the code we sent you below.</p>
                                <Form.Group className="mb-3" controlId="validation-code">
                                    <Form.Control type="text" name="validation-code" value={validationCode}
                                        onInput={buildInputs} placeholder="Security Code" />
                                </Form.Group>
                            </>
                        }
                        {validEmail && !emailValidated && securityCodeSent && codeValid &&
                            <>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Control type="password" name="password" value={password}
                                        onInput={buildInputs} placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="confirm-password">
                                    <Form.Control type="password" name="confirm-password" value={confirmPassword}
                                        onInput={buildInputs} placeholder="Confirm Password" />
                                </Form.Group>
                            </>
                        }
                    </Form>
                    <div style={{ width: '100%', textAlign: 'center', marginBottom: '30px', marginTop: '20px' }}>OR</div>
                    <Col />
                    <Col>
                        <GoogleLogin style={{ marginLeft: 'auto', marginRight: 'auto' }}
                            onSuccess={((credentialResponse) => {
                                onSuccess(credentialResponse);
                            })}
                            onError={(error) => {
                                console.log(error);
                            }}
                            useOneTap
                        />
                    </Col>
                    <Col />
                </Row>
                {errorMessage &&
                    <Alert variant="danger" style={{ width: '100%', textAlign: 'center' }}>
                        {errorMessage}
                    </Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                {validEmail && !emailValidated && !securityCodeSent &&
                    <Button variant="primary" onClick={generateValidationCode}>
                        Validate Email Ownership
                    </Button>
                }
                {validEmail && !emailValidated && securityCodeSent && !codeValid &&
                    <Button variant="primary" onClick={submitValidationCode}>
                        Submit Code
                    </Button>
                }
                {validEmail && !emailValidated && securityCodeSent && codeValid && passwordsMatch &&
                    <Button variant="primary" onClick={setNewPassword}>
                        Submit New Password
                    </Button>
                }
                {validEmail && !emailValidated && securityCodeSent && codeValid && !passwordsMatch &&
                    <Alert variant="success" style={{ width: '100%', textAlign: 'center' }}>
                        Please input your desired password.
                    </Alert>
                }
                {validEmail && emailValidated &&
                    <Button variant="primary" onClick={login}>
                        Login
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    );
}

export default AuthModal;