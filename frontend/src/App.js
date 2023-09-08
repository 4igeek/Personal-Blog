import { useContext, useEffect, useState } from 'react';
import './lib/css/App.css';

import { Context } from './lib/Context';
import NavBar from './Elements/Navigation/NavBar';
import PageContainer from './Elements/Pages/PageContainer';
import Modals from './Elements/Modals/Modals';

const App = () => {
  const { getUserProfile } = useContext(Context);
  const [showAuth, setShowAuth] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);



  return (
    <>
      <NavBar setShowAuth={setShowAuth} setShowAccount={setShowAccount} />
      <PageContainer />
      <Modals
        showAuth={showAuth} setShowAuth={setShowAuth}
        showAccount={showAccount} setShowAccount={setShowAccount}
      />
    </>
  );
}

export default App;
