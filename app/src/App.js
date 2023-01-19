import React, { useContext, useEffect } from 'react';
import { Link, Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { AuthContext } from './AuthContext';
import Button from './components/Button';

function App() {
  const user = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext)


  useEffect(() => {
    if (user) {
      setUser({ token: localStorage.getItem('token'), ...user });
      if (location.pathname === '/') {
        navigate('/games');
      }
    } else {
      navigate('/');
    }
  }, [])

  if (user) {
    if (location.pathname !== '/') {
      return <Outlet />;
    }
  }


  return (
    <React.Suspense>
      <div className="App h-screen w-screen p-5">
        <div className='flex flex-col h-full justify-between items-center'>
          <div className='flex flex-col h-full justify-center items-center font-home'>
            <p className='text-4xl'>async</p>
            <p className='text-8xl font-medium'>tic tac</p>
            <p className='text-8xl font-medium'>toe</p>
          </div>
          <div className='flex flex-col w-11/12 space-y-5'>
            <Link to={'/login'}>
              <Button text={'Login'} variant={'warning'} />
            </Link>
            <Link to={'/register'}>
              <Button text={'Register'} variant={'primary'} />
            </Link>
          </div>
        </div>
      </div>
    </React.Suspense>
  );
}

export default App;
