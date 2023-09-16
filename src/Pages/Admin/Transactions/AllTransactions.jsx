import React, { useCallback, useEffect, useState } from 'react'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import { Api, GetUrl } from '/src/Components/Utils/Apis'
import { SlBell, SlGlobe } from 'react-icons/sl'
import spins from '/src/Assets/Images/spins.gif'
import moment from 'moment'
import { Autos } from '/src/Components/Utils/Utility'
import { useSelector } from 'react-redux'

const AllTransactions = () => {
    const [trans, setTrans] = useState([])
    const [trans2, setTrans2] = useState([])
    const [loading, setLoading] = useState(true)
    const { subs } = useSelector(state => state.data)
    const [stats, setStats] = useState('')
    const [total, setTotal] = useState(0)

    const fetchTransactions = useCallback(async () => {
        const res = await GetUrl(Api.transactions.admin)
        setLoading(false)
        setTrans2(res.msg)
        setTotal(res.total)
        return setTrans(res.msg)
    }, [])

    useEffect(() => {
        fetchTransactions()
    }, [fetchTransactions])

    const handleStatus = (tag) => {
        setStats(tag)
        if(tag === 'all') {
            setTrans(trans2)
        }else {
            const findData = trans2.filter(ele => ele.status === tag)
            setTrans(findData)
        }
    }
    return (
        <AdminLayout pagetitle="All Transactions">
            <div className="">
                <div className="bg-white w-11/12 mx-auto p-4 rounded-lg">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="">
                            <div className="capitalize">services</div>
                            <select className="input capitalize">
                                <option value="">--Select--</option>
                                <option value="all">All</option>
                                {Autos.map((item, i) => (
                                    <option key={i} value={item.category}>{item.category}</option>
                                ))}
                            </select>
                        </div>
                        <div className="">
                            <div className="capitalize">status</div>
                            <select onChange={(e) => handleStatus(e.target.value)} className="input">
                                <option value="">--Select--</option>
                                <option value="all">All</option>
                                <option value="success">SUCCESS</option>
                                <option value="failed">FAILED</option>
                            </select>
                        </div>
                        <div className="">
                            <div className="capitalize">network</div>
                            <select className="input">
                                <option value="">--Select--</option>
                                {subs.map((item, i) => (
                                    <option key={i} value={item.id}>{item.network}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="w-11/12 mx-auto">
                        <div className="text-xl capitalize mb-3">showing <span className="font-bold">{trans.length}</span> out of <span className="font-bold">{total}</span> </div>
                        {loading && <div className="w-fit mx-auto">
                            <img src={spins} alt="" className="w-24" />
                        </div>}
                        <div className="">
                            {trans.map((item, i) => (
                                <div className={`flex gap-2 bg-white mb-2 relative`} key={i}>
                                    <div className={`flex items-center justify-center p-2 text-white ${item.status === 'success' ? 'bg-teal-400' : 'bg-red-600'} text-2xl`}><SlBell /></div>
                                    <div className="py-3 pr-3">
                                        <div className="text-xs shadow-xl uppercase bg-slate-100 py-1 px-3 w-fit mb-2 text-zinc-600 font-semibold">{item.title}</div>
                                        <div className="text-sm text-slate-600 uppercase flex items-center gap-5"> Status <div className={`${item.status === 'success' ? 'bg-teal-600' : 'bg-red-500'} text-white py-1.5 px-5 text-xs rounded-lg`}>{item.status}</div> </div>
                                        <div className="text-sm text-slate-600"> <span className="font-semibold">Transaction ID: </span> {item.txid}</div>
                                        <div className="text-sm text-slate-600"> <span className="font-semibold">Message: </span> {item.note}</div>
                                        <div className="text-sm text-slate-600"> <span className="font-semibold">Date: </span> {moment(item.createdAt).format('DD-MM-YYYY h:m A')} </div>
                                        <div className={`text-sm ${item.amount.toString().startsWith('-') ? 'text-red-600' : 'text-teal-500'}`}> <span className="font-semibold">Amount: </span> &#8358;{item.amount}</div>

                                        <div className="text-sm text-slate-600"> <span className="font-semibold">Email: </span> {item.trans.email}</div>
                                        <div className="text-sm text-slate-600"> <span className="font-semibold">User: </span> {item.trans.firstname} {item.trans.lastname}</div>
                                        <div className="text-sm text-slate-600"> <span className="font-semibold">Prev Balance: </span> &#8358;{item.prevbal?.toLocaleString()}</div>
                                        <div className="text-sm text-slate-600"> <span className="font-semibold">Current Balance: </span> &#8358;{item.currbal?.toLocaleString()}</div>
                                        <div className="text-sm text-slate-600 uppercase"> <span className="font-semibold">Automation: </span> {item.autos} </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AllTransactions