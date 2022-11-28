import { useContext } from "react"
import { Link, Outlet } from "react-router-dom"
import { authContext } from "../authentication/AuthContext"
import UseAdmin from "../hook/useAdmin"
import Navbar from "../navbar/Navbar"

export default function AdminLayout() {

  const {user} = useContext(authContext)
  const [isAdmin] = UseAdmin(user?.email)
  return (
        <div>
                <Navbar></Navbar>
                <div className="drawer drawer-mobile">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col">
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        <Outlet></Outlet>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-64 bg-base-100 text-base-content">
      <li><Link to="/dashboard">Appointment</Link></li>
      {isAdmin && <li><Link to="/dashboard/users">Users</Link></li>}
      {isAdmin && <li><Link to="/dashboard/addservice">Add Service</Link></li>}
      {isAdmin && <li><Link to="/dashboard/allservices">All Service</Link></li>}
    </ul>
  
  </div>
</div>


        </div>
  )
}
