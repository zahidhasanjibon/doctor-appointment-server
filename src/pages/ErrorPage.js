import React, { useContext } from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'
import { authContext } from '../component/authentication/AuthContext'

export default function ErrorPage() {

  const {logOut} = useContext(authContext)
  const navigate = useNavigate()

    const error = useRouteError()

    const handleLogout = () => {
        logOut()
        .then(() => {
          localStorage.removeItem("jwttoken");
        navigate("/login");
        })
    }
    
  return (
    <>
    <div className='mt-16 text-3xl text-center text-blue-700'>Something went wrong</div>
    <p className='text-center my-4'>{error.statusText || error.message}</p>

    <div className='text-center'>
      <button className='btn btn-primary' onClick={handleLogout}>Log Out</button>
    </div>
    
    </>
  )
}
