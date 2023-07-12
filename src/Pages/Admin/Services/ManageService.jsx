import React, { useCallback, useEffect, useState } from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { Services, SwalAlert, ToastAlert } from '../../../Components/Utils/Utility'
import { ToastContainer } from 'react-toastify'
import Loading from '../../../Components/General/Loading'
import { Api, GetUrl, PostUrl } from '../../../Components/Utils/Apis'
import { useParams } from 'react-router-dom'
import EditPackageModal from './EditPackageModal'
import { FaCheck } from 'react-icons/fa'
import DeleteSubscription from './Modals/DeleteSubscription'
import DelSubData from './Modals/DelSubData'
import { SlArrowRight } from 'react-icons/sl'

const ManageService = () => {
    const [packs, setPacks] = useState([])
    const [delview, setDelview] = useState(false)
    const [loading, setLoading] = useState(false)
    const [delpack, setDelpack] = useState(false)
    const [singlepack, setSinglepack] = useState('')
    const [singles, setSingles] = useState({})
    const [view, setView] = useState(false)
    const [, setSubs] = useState([])
    const [tagsubs, setTagsubs] = useState([])
    const { id } = useParams()
    const [openPacks, setOpenPacks] = useState(false)
    const [forms, setForms] = useState({
        network: '',
        category: '',
        tag: '',
        title: '',
        price: '',
    })

    const fetchSubData = useCallback(async () => {
        const res = await GetUrl(`${Api.subs.all_subscriptiondata}/${id}`)
        const payload = res.msg
        setSubs(payload)
        const founded = Services.find((item) => item.endsWith(payload.category.slice(-3)))
        setForms({
            ...forms,
            network: payload.network,
            category: founded,
            tag: payload.tag || ''
        })
        setPacks(payload.sub)
        setTagsubs(payload.sub)
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        fetchSubData()
    }, [fetchSubData])

    const handleForms = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }
    const addPackages = () => {
        if (!forms.title) return ToastAlert('title is required')
        if (!forms.price) return ToastAlert('price is required')
        const date = new Date()
        const info = { title: forms.title, price: forms.price, lock: 'no', id: date.getMilliseconds() }
        setPacks([...packs, info])
        setTagsubs([...tagsubs, info])
        setForms({
            ...forms,
            title: '',
            price: '',
        })
    }

    const handleSubmission = async () => {
        if (!forms.network) return ToastAlert('network is required')
        if (packs.length < 1) return ToastAlert('Service package required')
        const data = {
            network: forms.network,
            category: forms.category,
            tag: forms.tag,
            id,
            packages: [...packs]
        }
        setLoading(true)
        const res = await PostUrl(Api.subs.edit_subscription, data)
        setLoading(false)
        if (res.status === 200) {
            fetchSubData()
            SwalAlert('Request Success', res.msg, 'success')
        } else {
            SwalAlert('Request Failure', res.msg, 'error')
        }
    }

    const openSinglePack = values => {
        setSingles(values)
        setView(!view)
    }

    const togtagHandler = value => {
        if (value.lock === 'yes') {
            const mapped = tagsubs.map((item) => {
                if (item.id === value.id) {
                    item.lock = 'no'
                }
                return item
            })
            setTagsubs(mapped)
        } else {
            const mapped = tagsubs.map((item) => {
                if (item.id === value.id) {
                    item.lock = 'yes'
                }
                return item
            })
            setTagsubs(mapped)
        }
    }
    const deletePack = async (val) => {
        setDelpack(!delpack)
        setSinglepack(val.id)
    }
    return (
        <AdminLayout>
            {delview && <DeleteSubscription id={id} closeView={() => setDelview(!delview)} />}
            {view && <EditPackageModal resendSignal={() => fetchSubData()} data={singles} closeView={() => setView(!view)} />}
            {delpack && <DelSubData id={singlepack} resendSignal={() => fetchSubData()} closeView={() => setDelpack(!delpack)} />}
            {loading && <Loading />}
            <div className="">
                <div className="bg-white pt-4 rounded-lg">
                    <div className="w-fit pr-4 ml-auto">
                        <button onClick={() => setDelview(!delview)} className="bg-red-600 text-white rounded-lg capitalize py-2 px-4">delete service</button>
                    </div>
                    <div className="border-b p-3">
                        <div className="mb-3">
                            <div className="">Service Network Category (Optional)</div>
                            <select name="tag" value={forms.tag} onChange={handleForms} className="input uppercase">
                                <option value="">--Select--</option>
                                <option value="mtn">mtn</option>
                                <option value="airtel">airtel</option>
                                <option value="glo">glo</option>
                                <option value="etisalat">etisalat</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <div className="">Name of Service</div>
                            <input name="network" value={forms.network} onChange={handleForms} type="text" placeholder='--Service Name--' className="input" />
                        </div>
                        <div className="mb-3">
                            <div className="">category of Service</div>
                            <select name="category" value={forms.category} onChange={handleForms} className="input uppercase">
                                <option value="">--Select--</option>
                                {Services.map((item, i) => (
                                    <option value={item} key={i}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="p-3">
                        <div className="mb-3 pb-2 px-3">Service Packages</div>
                        <div className="grid grid-cols-3 gap-5 border-t border-b p-3">
                            <div className="">
                                <div className="">Package Title</div>
                                <input name="title" value={forms.title} onChange={handleForms} type="text" placeholder='--Title--' className="input" />
                            </div>
                            <div className="">
                                <div className="">Package Price</div>
                                <input name="price" value={forms.price} onChange={handleForms} type="number" placeholder='--Price--' className="input" />
                            </div>
                            <div className="self-center">
                                <button onClick={addPackages} className="bg-indigo-600 py-2.5 px-4 mt-5 text-sm text-white rounded-lg capitalize">add</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 p-3">
                            <div className="">All Subscription Packages</div>
                            <div onClick={() => setOpenPacks(!openPacks)} className="flex items-center justify-end cursor-pointer text-indigo-600 font-semibold">Open All <SlArrowRight className='text-xs ml-3' /> <SlArrowRight className='text-xs' /> </div>
                        </div>
                        <div className={`p-3 ${openPacks ? '' : 'hidden'}`}>
                            {packs.length > 0 ? packs.map((item, i) => (
                                <div className="py-2.5 border-b last:border-b-0 px-2" key={i}>
                                    <div className="grid grid-cols-2">
                                        <div className="flex items-center gap-3">
                                            <div onClick={() => togtagHandler(item)} className={`w-5 h-5 ${item.lock === 'no' ? 'bg-green-400 text-green-100' : 'bg-slate-50 text-slate-300 border'} cursor-pointer text-sm flex items-center justify-center`}> <FaCheck /> </div>
                                            <div className="text-sm">{item.title} = </div>
                                            <div className="text-right text-sm"> &#8358; {item.price}</div>
                                        </div>
                                        <div className="flex items-center justify-end gap-8">
                                            <button onClick={() => openSinglePack(item)} className="bg-slate-500 rounded-lg text-white text-xs uppercase py-2 px-4">edit</button>
                                            <button onClick={() => deletePack(item)} className="bg-red-500 rounded-lg text-white text-xs uppercase py-2 px-4">delete</button>
                                        </div>
                                    </div>
                                </div>
                            )) :
                                <div className="text-center text-slate-500 py-3">No Package Service added yet!.</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="w-fit ml-auto mt-10 px-3">
                    <button onClick={handleSubmission} className="bg-indigo-600 py-4 rounded-full px-6 text-white capitalize">update subscription</button>
                </div>
            </div>
            <ToastContainer />
        </AdminLayout>
    )
}

export default ManageService