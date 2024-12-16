import { Link } from '@tanstack/react-router'
import React from 'react'

const AuthLinkedIn = () => {
  return (
    <Link to={`${import.meta.env.VITE_BACKEND_URL}/v1/linkedin/auth`} className="inline-block">
      <img 
        src="/signin-button-linkedin.png" 
        alt="Sign in with LinkedIn" 
        className="w-48 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out hover:opacity-90 mt-4 mx-auto"
      />
    </Link>
  )
}

export default AuthLinkedIn