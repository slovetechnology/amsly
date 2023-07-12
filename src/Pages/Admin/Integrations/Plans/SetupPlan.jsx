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
import { BsPencil } from 'react-icons/bs'

const SetupPlan = () => {
    const [plan, setPlan] = useState('')
    const [autos, setAutos] = useState([])
    const [api, setApi] = useState({})
    const [isApi, setIsApi] = useState(false)
    const [planned, setPlanned] = useState('')
    const [allplans, setAllPlans] = useState([])
    const [loading, setLoading] = useState(false)
    const [isNew, setisNew] = useState(true)
    const { auto } = useParams()

    const fetchAllAutos = useCallback(async () => {
        const response = await GetUrl(Api.subs.get_automation_service)
        if (response.status === 200) return setAutos(response.msg)
    }, [])

    const fetchAllApis = useCallback(async () => {
        const res = await GetUrl(`${Api.subs.all_api_plans}/${auto}`)
        if (res.status === 200) return setAllPlans(res.msg)
    }, [])

    useEffect(() => {
        fetchAllAutos()
        fetchAllApis()
    }, [fetchAllAutos, fetchAllApis])

    const handleAutosForm = (e) => {
        const val = e.target.value
        if (val) {
            const filtered = autos.find(item => item.id === parseInt(val))
            setApi(filtered)
            setPlanned(`${filtered.planName.split('_' || '-')[0]} ${filtered.planName.split('_' || '-')[1]}`)
            setIsApi(true)
        } else {
            setIsApi(false)
        }
    }
    const handleAddPlan = () => {
        if (!plan) return ToastAlert('Enter Plan for automation name')
        // check if plan already exists
        // const findPlan = allplans.find(item => item.automation === api.id)
        // if (findPlan) return ToastAlert(`${planned} already exists!`)
        setPlan('')
        const newads = {
            plan: plan,
            pack: auto,
            automation: api.id,
            title: api.title
        }
        setAllPlans([...allplans, newads])
    }

    const clearPlanFormList = item => {
        const filtered = allplans.filter(data => data !== item)
        setAllPlans(filtered)
    }

    const handleSubmission = async () => {
        try {
            if (!api?.id) return ToastAlert('Select an automation service')
            if (allplans.length < 1) return ToastAlert('Provide valid plans for the api service')
            const formdata = {
                pack: auto,
                plans: allplans
            }
            setLoading(true)
            const res = await PostUrl(Api.subs.add_api_plans, formdata)
            setLoading(false)
            if (res.status === 200) {
                SwalAlert('Request Successful', res.msg, 'success')
            } else {
                ToastAlert(res.msg)
            }
        } catch (error) {
            return ToastAlert(error)
        }
    }
    const updatePlanInList = (data) => {
        if (data) {
            const filtered = autos.find(item => item.id === parseInt(data.automation))
            setApi(data)
            setPlan(data.plan)
            console.log(filtered.plan)
            setPlanned(`${filtered.planName.split('_' || '-')[0]} ${filtered.planName.split('_' || '-')[1]}`)
            setIsApi(true)
        } else {
            setIsApi(false)
        }
    }
    return (
        <AdminLayout pagetitle="Setup Autmation Service Plans">
            {loading && <Loading />}
            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="col-span-2">
                        <div className="bg-white rounded-lg p-3 h-fit">
                            <select className="input" onChange={handleAutosForm}>
                                <option value="">--Select Automation Service</option>
                                {autos.map((item, i) => (
                                    <option value={item.id} key={i}>{item.title}</option>
                                ))}
                            </select>
                            <div className={isApi ? '' : 'hidden'}>
                                <div className="border-b p-3 text-slate-600">Setup plan for {api.title}</div>
                                <div className="mt-5">
                                    <input type="text" value={plan} onChange={e => setPlan(e.target.value)} placeholder='--Plan--' className="input" />
                                </div>
                                <div className="w-fit ml-auto mt-5">
                                    <button onClick={handleAddPlan} className="bg-indigo-700 rounded-full text-xs uppercase text-white py-2 px-4">add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="bg-white rounded-lg p-3 h-fit">
                            <div className="border-b p-3 text-slate-600">Plans Summary</div>
                            {allplans.map((item, i) => (
                                <div className="px-2 py-1.5 border-b last:border-b-0" key={i}>
                                    <div className="grid grid-cols-2">
                                        <div className="">
                                            <div className="text-sm flex items-center gap-2"> <ImCompass />
                                                <div className="">
                                                    <div className="text-sm">Plan: {item.plan}</div>
                                                    <div className="text-sm uppercase">Api: {item.title}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div onClick={() => clearPlanFormList(item)} className="w-fit ml-auto text-red-600 cursor-pointer"> <SlTrash /> </div>
                                            {/* <div onClick={() => updatePlanInList(item)} className="w-fit ml-auto text-blue-600 cursor-pointer"> <BsPencil /> </div> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-fit mx-auto mt-5">
                            <button onClick={handleSubmission} className="bg-indigo-600 text-white uppercase rounded-lg py-3 px-6 tetx-white">save plan</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default SetupPlan