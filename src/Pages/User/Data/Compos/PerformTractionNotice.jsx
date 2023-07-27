

import { BsCheck2Circle } from 'react-icons/bs'
import ModalLayout from '/src/Components/Utils/ModalLayout'
import React from 'react'
import { Link } from 'react-router-dom'

const PerformTractionNotice = ({closeView, handleSubmission}) => {
  return (
    <ModalLayout closeView={closeView}>
        <div className="py-10 px-5">
            <div className="w-fit mx-auto mb-5">
                <BsCheck2Circle className='text-teal-400 text-8xl animate-bounce' />
            </div>
            <div className="text-center text-zinc-500 text-xl">Transaction Successful!</div>
            <div className="flex items-center justify-between gap-8 mt-6 flex-col">
                <Link to='/dashboard' className="bg-red-400 rounded-lg text-center text-white w-full font-semibold py-4 capitalize" onClick={closeView}>back to dashboard</Link>
                <a href='' className="bg-blue-700 rounded-lg text-center text-white w-full font-semibold py-4 capitalize" onClick={handleSubmission}>initiate another transaction</a> 
            </div>
        </div>
    </ModalLayout>
  )
}

export default PerformTractionNotice