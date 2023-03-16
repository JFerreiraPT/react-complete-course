import { useEffect } from 'react';
import { Outlet, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  // const navigation = useNavigation();


  const token = useLoaderData();
  //programatically submit a form
  //we will sent logout request
  const submit = useSubmit();

  useEffect(() => {
    if(!token) return;

    if(token === 'EXPIRED') {
      submit(null, {action: '/logout', method: 'post'});
      return;
    }

    const tokenDuration = getTokenDuration();

    //if token set timer!! this will logout user after that
    setTimeout(() => {
      submit(null, {action: '/logout', method: 'post'})
    }, tokenDuration);

  }, [token, submit])


  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
