import { BsShieldExclamation } from 'react-icons/bs'
import ModalLayout from '/src/Components/Utils/ModalLayout'
import React from 'react'

const ConfirmAirtimePurchase = ({closeView, handleSubmission, title="Confirm Your Airtime Subscription Request"}) => {
  return (
    <ModalLayout closeView={closeView}>
        <div className="py-10 px-5">
            <div className="w-fit mx-auto mb-5">
                <BsShieldExclamation className='text-orange-400 text-8xl animate-bounce' />
            </div>
            <div className="text-center text-zinc-500 text-xl">{title}</div>
            <div className="flex items-center justify-between mt-6">
                <button className="bg-red-400 rounded-lg text-white font-bold py-4 uppercase w-32" onClick={closeView}>no</button>
                <button className="bg-indigo-700 rounded-lg text-white font-bold py-4 uppercase w-32" onClick={handleSubmission}>yes</button>
            </div>
        </div>
    </ModalLayout>
  )
}

export default ConfirmAirtimePurchase