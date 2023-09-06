import React from 'react'
import AuthModal from './AuthModal'
import MyAccountModal from './MyAccountModal';

// This file is where all of the modals that are needed to be contained in the app are kept.
const Modals = (props) => {
    const { showAuth, setShowAuth, showAccount, setShowAccount } = props;
    return (
        <>
            <AuthModal showAuth={showAuth} setShowAuth={setShowAuth} />
            <MyAccountModal showAccount={showAccount} setShowAccount={setShowAccount} />
        </>
    )
}

export default Modals