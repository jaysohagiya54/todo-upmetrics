// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  console.log('isAuthenticated: ', isAuthenticated);

  return (
    <header>
     { isAuthenticated &&  <nav className='bg-slate-200 border-b '>
        <ul className='flex justify-between flex-row p-4'>
         
        
          {
         (
            <>
            <li>
            <Link to="/" className='text-2xl font-bold tracking-wider'>Todos</Link>
          </li>
            <li>
              <Link to="/profile" className='text-lg font-medium mr-5'>Profile</Link>
              <button onClick={logout} className='text-lg font-medium mr-5'>Logout</button>
            </li></>
          )}
        </ul>
      </nav>}
    </header>
  );
};

export default Header;
