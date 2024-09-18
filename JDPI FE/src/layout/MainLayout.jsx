import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useLocation } from 'react-router-dom';
import HomePage from '../pages/HomePage';

const MainLayout = () => {
  const location = useLocation();

  return (
    <main>
        <Navbar/>
        {location.pathname === '/' && (
          <HomePage/>
        )}
        <Outlet/>
        <Footer/>
      
    </main>
  )
}

export default MainLayout
