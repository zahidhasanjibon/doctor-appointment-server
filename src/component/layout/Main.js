
import { Outlet } from 'react-router-dom'
import Footer from "../footer/Footer"

import Navbar from '../navbar/Navbar'

export default function Main() {
  return (
    <>
        <Navbar />
  
        <Outlet></Outlet>
        <Footer />
    
    </>
  )
}
