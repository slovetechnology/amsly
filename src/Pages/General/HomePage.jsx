import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
        <Link to='/login' className="bg-indigo-600 text-white rounded-lg py-3 px-5 capitalize">login</Link>
    </div>
  )
}

export default HomePage