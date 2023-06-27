import React, { useState } from 'react'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import AllPrices from './AllPrices'
import SinglePrice from './SinglePrice'
import { SlPeople } from 'react-icons/sl'
import SingleSub from './SingleSub'
import Loading from '/src/Components/General/Loading'
import { Api, PostUrl } from '/src/Components/Utils/Apis'
import { SwalAlert } from '/src/Components/Utils/Utility'
import { dispatchLevels } from '/src/app/reducer'
import { ToastAlert } from '/src/Components/Utils/Utility'

const ManageLevels = () => {
    const [active, setActive] = useState(0)
    const { subs, subdata } = useSelector(state => state.data)
    const [singlesub, setSinglesub] = useState([])
    const [gifts, setGifts] = useState(false)
    const [calc, setCalc] = useState(100)
    const [forms, setForms] = useState({})
    const [prices, setPrices] = useState([])
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleForms = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    const setupSinglesub = val => {
        const filter = subdata.filter((item) => item.network === val.id)
        setSinglesub(filter)
        setActive(val.id)
        let parr = []
        filter.map((item) => {
            return parr.push(item.price)
        })
        setPrices(parr)

        const formated = val.network.split(' ')[1]
        if (formated?.toUpperCase() === 'GIFTING') {
            setGifts(true)
        } else {
            setGifts(false)
        }
    }
    const handlepercantage = (val) => {
        const pert = val / 100
        let parr = []
        singlesub.map((item) => {
            return parr.push(item.price)
        })
        for (let i = 0; i < parr.length; i++) {
            parr[i] = pert * parr[i]
        }
        setPrices(parr)
    }

    const handleLevelCreating = async () => {
        const data = {
            title
        }
        setLoading(true)
        const res = await PostUrl(Api.subs.add_level, data)
        setLoading(false)
        if(res.status === 200) {
            setTitle('')
            SwalAlert("Request Successful", res.msg, 'success')
            dispatch(dispatchLevels(res.levels))
        }else {
            ToastAlert(res.msg)
        }
    }

    return (
        <AdminLayout>
            {loading && <Loading /> }
            <div className="">
                <div className="bg-white rounded-lg p-4">
                    <div className="">
                        <div className="text-indigo-600 flex mb-3 items-center gap-3"> <div className="rounded-full p-2 bg-indigo-300/50 text-indigo-600"> <SlPeople /> </div> Name of Level</div>
                        <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="input" />
                    </div>
                    <div className="mt-5">
                        <div className="flex items-center flex-wrap gap-5">
                            {subs.map((item, i) => (
                                item.locked === 'no' && <button key={i} onClick={() => setupSinglesub(item)} className={`text-sm uppercase py-2.5 px-4 rounded-full ${active === item.id ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>{item.network}</button>
                            ))}
                        </div>
                    </div>
                    <div className={`mt-5 ${active !== 0 ? '' : 'hidden'}`}>
                        {gifts && <div className="bg-slate-50 p-3 mb-1 rounded-lg">
                            <div className="grid grid-cols-2 mb-2">
                                <div className="">
                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="text-sm">All </div>
                                    </div>
                                </div>
                                <div className="w-fit ml-auto">
                                    <div className="flex items-center gap-3">
                                        <div className="text-sm">Gifting percentage: </div>
                                        <input onKeyUp={e => handlepercantage(e.target.value)} value={calc} onChange={e => setCalc(e.target.value)} type="text" placeholder={`%`} className="text-sm border bg-transparent rounded-lg p-2" />
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className="grid grid-cols-7">
                            <div className="col-span-5">
                                {singlesub.map((item, i) => (
                                    <SingleSub key={i} item={item} />
                                ))}
                            </div>
                            <div className="col-span-2">
                                {prices.map((item, i) => (
                                    <SinglePrice key={i} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-fit mx-auto mt-10">
                    <button onClick={handleLevelCreating} className="bg-indigo-600 py-3 px-8 rounded-full text-white capitalize">create level</button>
                </div>
            </div>
        </AdminLayout>
    )
}

export default ManageLevels