import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { useSelector } from 'react-redux'
import AllPrices from './AllPrices'
import SinglePrice from './SinglePrice'

const ManageLevels = () => {
    const [active, setActive] = useState(0)
    const { subs, subdata } = useSelector(state => state.data)
    const [singlesub, setSinglesub] = useState([])
    const [gifts, setGifts] = useState(false)
    const [calc, setCalc] = useState(100)
    const [forms, setForms] = useState({})
    const [prices, setPrices] = useState([])

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
    return (
        <AdminLayout>
            <div className="">
                <div className="bg-white rounded-lg p-4">
                    <div className="">
                        <div className="text-zinc-600">Name of Level</div>
                        <input type="text" className="input" />
                    </div>
                    <div className="mt-5">
                        <div className="flex items-center flex-wrap gap-5">
                            {subs.map((item, i) => (
                                <button key={i} onClick={() => setupSinglesub(item)} className={`text-sm uppercase py-2.5 px-4 rounded-full ${active === item.id ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>{item.network}</button>
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
                                {singlesub.map((item,i) => (
                                    <div className="flex mb-1 items-center justify-between flex-row w-full p-[0.77rem]" key={i}>
                                        <div className="text-sm">{item.title}</div>
                                        <div className="text-sm">{item.price}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="col-span-2">
                                {prices.map((item,i) => (
                                    <SinglePrice key={i} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-fit mx-auto mt-10">
                    <button className="bg-indigo-600 py-3 px-8 rounded-full text-white capitalize">create level</button>
                </div>
            </div>
        </AdminLayout>
    )
}

export default ManageLevels