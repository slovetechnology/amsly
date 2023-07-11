import React, { useEffect, useState } from 'react'
import spins from '../../../Assets/Images/spins.gif'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import DeleteIntegration from './Modal/DeleteIntegration'


const AutosList = ({data, isLoading, resendSignal}) => {
    const [view, setView] = useState(false)
    const navigate = useNavigate()
    const [id, setId] = useState('')
    const dets = 'details'

    useEffect(() => {
        const findDetails = data.autos?.find(item => item.category.startsWith(dets))
        console.log(findDetails, 'details placed', data)
    }, [])
    
    const handleDeleteAutomation = async (id) => {
        setId(id)
        setView(!view)
    }
    const handleUpdateAutomation = async (id) => {
        navigate(`/auth/admin/integration/edit/${id}`)
    }
  return (
    <div>
        {view && <DeleteIntegration id={id} resendSignal={resendSignal} closeView={() => setView(!view)} />}
        <div className="w-11/12 mx-auto">
            {isLoading && <div className="w-fit mx-auto">
                <img src={spins} alt="" className="w-24" />
            </div>}
            <div className="grid grid-cos-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
                {!isLoading && data?.map((item, i) => (
                    <div className="bg-white h-fit rounded-lg p-3 break-words shadow-xl" key={i}>
                       <div className="bg-indigo-600 text-white rounded-lg text-center uppercase text-sm mb-5 py-3">{item.title}</div>
                       <div className="text-sm uppercase pb-1"> <span className="font-semibold capitalize"> Api Url: </span> {item.apiurl} </div>
                       <div className="text-sm uppercase pb-1"> <span className="font-semibold capitalize"> Api Token: </span> {item.token.slice(0, 30)}... </div>
                       <div className="text-sm uppercase pb-1"> <span className="font-semibold capitalize"> Api Method: </span> {item.method} </div>
                       <div className="text-sm uppercase pb-1"> <span className="font-semibold capitalize"> Api Format: </span> {item.format} </div>
                       <div className="flex items-center border-t pt-2 mt-2 justify-between gap-5">
                        <button onClick={() => handleUpdateAutomation(item.id)} className="bg-blue-600 text-white text-sm rounded-lg py-2 px-4 capitalize">edit</button>
                        <button onClick={() => handleDeleteAutomation(item.id)} className="bg-red-600 text-white text-sm rounded-lg py-2 px-4 capitalize">delete</button>
                       </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    </div>
  )
}

export default AutosList