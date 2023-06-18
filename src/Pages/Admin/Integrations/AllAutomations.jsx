import React, { useState } from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { useQuery } from 'react-query'
import { Api, GetUrl, PostUrl } from '../../../Components/Utils/Apis'
import spins from '../../../Assets/Images/spins.gif'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import DeleteIntegration from './Modal/DeleteIntegration'

const AllAutomations = () => {
    const [view, setView] = useState(false)
    const navigate = useNavigate()
    const [id, setId] = useState('')

    const FetchAutomation = async () => {
        const response = await GetUrl(Api.subs.get_automation_service)
        if(response.status === 200) return response.msg
    }
    const {data, isLoading, refetch} = useQuery('admin-automation-services', FetchAutomation)
    
    const handleDeleteAutomation = async (id) => {
        setId(id)
        setView(!view)
    }
    const handleUpdateAutomation = async (id) => {
        navigate(`/auth/admin/integration/edit/${id}`)
    }
  return (
    <AdminLayout pagetitle="All Integration Services">
        {view && <DeleteIntegration id={id} resendSignal={() => refetch()} closeView={() => setView(!view)} />}
        <div className="w-11/12 mx-auto">
            {isLoading && <div className="w-fit mx-auto">
                <img src={spins} alt="" className="w-24" />
            </div>}
            <div className="grid grid-cos-1 md:grid-cols-2 gap-6 lg:grid-cols-3">
                {!isLoading && data?.map((item, i) => (
                    <div className="bg-white rounded-lg p-3 break-words shadow-xl" key={i}>
                       <div className="bg-indigo-600 text-white rounded-lg text-center uppercase text-sm mb-5 py-3">{item.title}</div>
                       <div className="text-sm uppercase pb-1"> <span className="font-semibold capitalize"> Api Url: </span> {item.apiurl} </div>
                       <div className="text-sm uppercase pb-1"> <span className="font-semibold capitalize"> Api Token: </span> {item.token} </div>
                       <div className="text-sm uppercase pb-1"> <span className="font-semibold capitalize"> Api Method: </span> {item.method} </div>
                       <div className="text-sm uppercase pb-1"> <span className="font-semibold capitalize"> Api Format: </span> {item.format} </div>
                       <div className="text-sm uppercase pb-1"> <span className="font-semibold capitalize"> Api Callback: </span> {item.callback ? item.callback : 'Not Available'} </div>
                       <div className="flex items-center border-t pt-2 mt-2 justify-between gap-5">
                        <button onClick={() => handleUpdateAutomation(item.id)} className="bg-blue-600 text-white text-sm rounded-lg py-2 px-4 capitalize">edit</button>
                        <button onClick={() => handleDeleteAutomation(item.id)} className="bg-red-600 text-white text-sm rounded-lg py-2 px-4 capitalize">delete</button>
                       </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    </AdminLayout>
  )
}

export default AllAutomations