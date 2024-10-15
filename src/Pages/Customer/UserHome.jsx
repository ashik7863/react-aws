import React,{useState} from 'react';
import UserHeader from './UserHeader';
import UserMenu from './UserMenu';
import UserBanner from './UserBanner';
import Cart from './Cart';
import { IsUser } from './IsUser';

const UserHome = () => {
  const [cartActive, setCartActive] = useState(false);
  let check=IsUser();
  const toggleCart = () => {
    setCartActive(!cartActive);
  };
  return (
    <>
        <UserHeader toggleCart={toggleCart} />
        <UserBanner />
        <UserMenu />
        <Cart cartActive={cartActive} toggleCart={toggleCart} />
    </>
  )
}

export default UserHome;