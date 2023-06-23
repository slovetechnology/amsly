import { SlTrash } from 'react-icons/sl'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import React, { useCallback, useEffect, useState } from 'react'
import { ImCompass } from 'react-icons/im'
import { ToastAlert } from '/src/Components/Utils/Utility'
import { Api, GetUrl } from '/src/Components/Utils/Apis'
import Loading from '/src/Components/General/Loading'
import { PostUrl } from '/src/Components/Utils/Apis'
import { SwalAlert } from '/src/Components/Utils/Utility'
import { useParams } from 'react-router-dom'

const UpdateApiPlan = () => {
    const [plan, setPlan] = useState('')
    const [autos, setAutos] = useState({})
    const [allplans, setAllPlans] = useState([])
    const [loading, setLoading] = useState(false)
    const {id} = useParams()

    const fetchAllAutos = useCallback(async () => {
        const response = await GetUrl(`${Api.subs.single_api_plans}/${id}`)
        if (response.status === 200) {
            setAutos(response.msg)
            setAllPlans(response.msg.plans)
        }
    }, [])

    useEffect(() => {
        fetchAllAutos()
    }, [fetchAllAutos])

    const handleAutosForm = (e) => {
        const val = e.target.value 
        setAutos(val)
    }
    const handleAddPlan = () => {
        if (!plan) return ToastAlert('Enter Plan for automation name')
        // check if plan already exists
        const findPlan = allplans.find(item => item === plan)
        if(findPlan) return ToastAlert(`${autos.planName} already exists!`)
        setPlan('')
        setAllPlans([...allplans, plan])
    }

    const clearPlanFormList = item => {
        const filtered = allplans.filter(data => data !== item)
        setAllPlans(filtered)
    }

    const handleSubmission = async () => {
        try {
            if(!autos?.id) return ToastAlert('Select an automation service')
            if(allplans.length < 1) return ToastAlert('Provide valid plans for the api service')
            const formdata = {
                automation: autos.id,
                plans: allplans
            }
            setLoading(true)
            const res = await PostUrl(Api.subs.update_api_plans, formdata)
            setLoading(false)
            if(res.status === 200) {
                SwalAlert('Request Successful', res.msg, 'success')
            }else {
                ToastAlert(res.msg)
            }
        } catch (error) {
            return ToastAlert(error)
        }
    }
    return (
        <AdminLayout pagetitle={autos.title ? `Update ${autos.title} ${autos.planName}` : ''}>
            {loading && <Loading /> }
            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="col-span-2">
                        <div className="bg-white rounded-lg p-3 h-fit">
                            <select className="input" onChange={handleAutosForm}>
                                <option value={autos.id}>{autos.title}</option>
                            </select>
                            <div className={''}>
                                <div className="border-b p-3 text-slate-600">Setup {autos.planName} for {autos.title}</div>
                                <div className="mt-5">
                                    <input type="text" value={plan} onChange={e => setPlan(e.target.value)} placeholder='--Plan--' className="input" />
                                </div>
                                <div className="w-fit ml-auto mt-5">
                                    <button onClick={handleAddPlan} className="bg-indigo-700 rounded-full text-xs uppercase text-white py-2 px-4">add</button>
                                </div>
                            </div>
                        </div>ƒ
                    </div>
                    <div className="col-span-3">
                        <div className="bg-white rounded-lg p-3 h-fit">
                            <div className="border-b p-3 text-slate-600">Plans Summary</div>
                            {allplans.length > 0 ? allplans.map((item, i) => (
                                <div className="px-2 py-1.5 border-b last:border-b-0" key={i}>
                                    <div className="grid grid-cols-2">
                                        <div className="text-sm flex items-center gap-2"> <ImCompass /> {item}</div>
                                        <div onClick={() => clearPlanFormList(item)} className="w-fit ml-auto text-red-600 cursor-pointer"> <SlTrash /> </div>
                                    </div>
                                </div>
                            )) : <div className="text-center mt-10 mb-5 text-slate-600 text-sm uppercase">no {autos.title} {autos.planName}s added</div> }
                        </div>
                        <div className="w-fit mx-auto mt-5">
                            <button onClick={handleSubmission} className="bg-indigo-600 text-white uppercase rounded-lg py-3 px-6 tetx-white">update plan</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default UpdateApiPlan