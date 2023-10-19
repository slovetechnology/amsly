import React from 'react'
import { Link } from 'react-router-dom'

const QuickAccess = () => {
  return (
    <div>
      this is Quick Access
      <div className="mt-20"> <Link to='/' className='bg-blue-900 py-2 px-6 text-white'>home</Link> </div>
    </div>
  )
}

export default QuickAccess
