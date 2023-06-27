import ModalLayout from '/src/Components/Utils/ModalLayout'
import React, { useState } from 'react'

const ConfirmDataNetwork = ({closeView, autos, handleSubmission, nets}) => {
    const [network, setNetwork] = useState('')
    const [shows, setShows] = useState(false)
    const valdata = nets.split('-' || '_' || ' ' || '')[0].toUpperCase()
    const handleAutoNetwork = (e) => {
        setNetwork(e.target.value)
        setShows(true)
    }
    const sendData = () => {
        handleSubmission(network)
    }
    const dataEnums = "AIRTEL" || "MTN" || "GLO" || "ETISALAT"
  return (
    <ModalLayout closeView={closeView}>
        <div className="p-3">
            <div className="bg-sky-100 p-2.5 rounded-lg shadow-xl text-slate-600 drop-shadow-sm">Confirm Subscription Network</div>
            <div className="mt-10">
                <select onChange={handleAutoNetwork} className="input">
                    <option value="">--Select Preference</option>
                    {autos?.networks.map((item, i) => (
                        item.title.startsWith(dataEnums) && 
                        <option key={i} value={item.tag}>{item.title}</option>
                    ))}
                </select>
            </div>
            {shows && <div className="w-fit ml-auto p-4">
                <button onClick={sendData} className="bg-indigo-700 text-white rounded-full text-sm shadow-xl uppercase py-2.5 px-6">confirm</button>
            </div>}
        </div>
    </ModalLayout>
  )
}

export default ConfirmDataNetwork