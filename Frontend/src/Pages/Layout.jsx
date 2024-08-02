// import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
// import '../Styles/Layout.scss'
// import Footer from '../Components/Footer'

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollContainer = document.querySelector('.layout');
    if (scrollContainer) {
      scrollContainer.style.scrollBehavior = 'auto';
      scrollContainer.scrollTop = 0;
    }
  }, [pathname]);
};

const Layout = () => {
  useScrollToTop();
  return (
    <div className='layout'>
      <div className="navbar">
        {/* <Navbar /> */}
        <h1>Nav</h1>
      </div>

      <div className="content">
        <Outlet />
        {/* <Footer /> */}
        <h2>Footer</h2>

      </div>

    </div>
  )
}

export default Layout