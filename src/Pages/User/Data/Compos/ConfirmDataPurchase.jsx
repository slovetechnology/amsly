import { BsShieldExclamation } from 'react-icons/bs'
import ModalLayout from '/src/Components/Utils/ModalLayout'
import React from 'react'

const ConfirmDataPurchase = ({closeView, handleSubmission}) => {
  return (
    <ModalLayout closeView={closeView}>
        <div className="py-10 px-5">
            <div className="w-fit mx-auto mb-5">
                <BsShieldExclamation className='text-orange-400 text-8xl animate-bounce' />
            </div>
            <div className="text-center text-zinc-500 text-xl">Confirm Your Request to purchase this Data Plan</div>
            <div className="w-fit mx-auto mt-6">
                <button className="bg-indigo-600 rounded-lg text-white py-3 capitalize w-44" onClick={handleSubmission}>confirm</button>
            </div>
        </div>
    </ModalLayout>
  )
}

export default ConfirmDataPurchase