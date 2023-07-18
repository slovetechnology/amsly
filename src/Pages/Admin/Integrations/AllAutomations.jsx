import React, { useCallback, useEffect, useState } from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { useQuery } from 'react-query'
import { Api, GetUrl } from '../../../Components/Utils/Apis'
import AutosList from './AutosList'

const AllAutomations = () => {
    const [zone, setZone] = useState(1)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const cs = `shadow-xl rounded-lg py-4 uppercase text-slate-600 font-semibold text-sm`

    const FetchAutomation = useCallback(async () => {
      const response = await GetUrl(Api.subs.get_automation_service)
      if(response.status === 200) {
        setIsLoading(false)
        return setData(response.msg)
      } 
  }, [])
    
    useEffect(() => {FetchAutomation()}, [FetchAutomation])
  return (
    <AdminLayout pagetitle="All Integration Services">
        <div className="grid grid-cols-2 w-11/12 max-w-xl gap-5 mx-auto mb-16">
            <button onClick={() => setZone(1)} className={`${cs} ${zone === 1 ? 'bg-indigo-600 text-white' : 'bg-white '}`}>api automations</button>
            <button onClick={() => setZone(2)} className={`${cs} ${zone === 2 ? 'bg-indigo-600 text-white' : 'bg-white '}`}>email automations</button>
        </div>
        {zone === 1 && <AutosList 
        data={data}
        isLoading={isLoading}
        resendSignal={() => FetchAutomation()}
        /> }
    </AdminLayout>
  )
}

export default AllAutomations