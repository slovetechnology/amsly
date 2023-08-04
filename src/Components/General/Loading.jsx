import React from 'react'
import spins from '../../Assets/Images/spins.gif'

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 w-full bg-orange-50/60 z-[999] h-screen flex items-center justify-center'>
        <img src={spins} alt="" className="w-24" />
    </div>
  )
}

export default Loading