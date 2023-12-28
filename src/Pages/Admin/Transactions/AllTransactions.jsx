import React, { useCallback, useEffect, useState } from 'react'
import AdminLayout from '/src/Components/Admin/AdminLayout'
import { Api, GetUrl } from '/src/Components/Utils/Apis'
import { SlBell, SlGlobe } from 'react-icons/sl'
import spins from '/src/Assets/Images/spins.gif'
import moment from 'moment'
import { Autos } from '/src/Components/Utils/Utility'
import { useSelector } from 'react-redux'
import { ErrorAlert } from '/src/Components/Utils/Utility'
import { PostUrl } from '/src/Components/Utils/Apis'

const AllTransactions = () => {
    const [trans, setTrans] = useState([])
    const [trans2, setTrans2] = useState([])
    const [loading, setLoading] = useState(true)
    const { subs } = useSelector(state => state.data)
    const [showReset, setShowReset] = useState(false)
    const [filter, setFilter] = useState({
        limit: 10,
        service: 'all',
        search: '',
        category: 'all',
        status: 'all',
    })
    const [total, setTotal] = useState({
        all: 0,
        data: 0
    })

    const handleForms = e => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
        setShowReset(true)
    }

    const fetchTransactions = useCallback(async (params) => {
        try {
            const res = params.length < 1 ?  await GetUrl(`${Api.transactions.admin}?limit=${filter.limit}`) : params
            setTrans2(res.msg)
            setTotal({
                all: res.total,
                data: res.msg.length
            })
            return setTrans(res.msg)
        } catch (error) {
            ErrorAlert(res.msg)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchTransactions([])
    }, [fetchTransactions])

    const handleFiltering = async () => {
        const res = await PostUrl(Api.transactions.admin_filter_transactions, filter)
        fetchTransactions(res)
    }
    const ResetFilter = () => {
        setFilter({
            limit: 10,
            service: 'all',
            search: '',
            category: 'all',
            status: 'all',
        })
        fetchTransactions([])
        setShowReset(false)
    }
    return (
        <AdminLayout pagetitle="All Transactions">
            <div className="">
                <div className="bg-white w-11/12 mx-auto p-4 rounded-lg">
                  {showReset &&  <div className="w-fit ml-auto">
                        <button onClick={ResetFilter} className="bg-blue-600 text-white py-2 rounded-lg capitalize px-4">reset</button>
                    </div>}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="">
                            <div className="capitalize">categories</div>
                            <select name="category" value={filter.category} onChange={handleForms} className="input capitalize">
                                <option value="all">All</option>
                                {Autos.map((item, i) => (
                                    <option key={i} value={item.category}>{item.category}</option>
                                ))}
                            </select>
                        </div>
                        <div className="">
                            <div className="capitalize">status</div>
                            <select name="status" value={filter.status} onChange={handleForms} className="input">
                                <option value="all">All</option>
                                <option value="success">SUCCESS</option>
                                <option value="failed">FAILED</option>
                            </select>
                        </div>
                        <div className="">
                            <div className="capitalize">services</div>
                            <select name="service" value={filter.service} onChange={handleForms} className="input">
                                <option value="all">All</option>
                                {subs.map((item, i) => (
                                    <option value={item.network} key={i}>{item.network}</option>
                                ))}
                            </select>
                        </div>
                        <div className="">
                            <div className="capitalize"> Search by Email / Phone / Ref.ID / Meter No. </div>
                            <input name="search" value={filter.search} onChange={handleForms} type="text" placeholder='Search...' className="input" />
                        </div>
                        <div className="">
                            <div className="capitalize">transactions per page</div>
                            <select name="limit" value={filter.limit} onChange={handleForms} className="input">
                                <option value="10">10 per page</option>
                                <option value="50">50 per page</option>
                                <option value="100">100 per page</option>
                                <option value="150">150 per page</option>
                                <option value="200">200 per page</option>
                                <option value="300">300 per page</option>
                            </select>
                        </div>
                        <div className="">
                            <div className="capitalize"> &nbsp; </div>
                            <button onClick={handleFiltering} className="bg-blue-600 text-white text-sm capitalize w-full py-3.5 rounded-lg">apply filter</button>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="w-11/12 mx-auto">
                        <div className="text-xl capitalize mb-3">showing <span className="font-bold">{total.data}</span> out of <span className="font-bold">{total.all}</span> </div>
                        {loading && <div className="w-fit mx-auto">
                            <img src={spins} alt="" className="w-24" />
                        </div>}
                        <div className="">
                            {!loading && trans?.length > 0 && trans?.map((item, i) => (
                                <div className={`flex gap-2 bg-white mb-2 relative`} key={i}>
                                    <div className={`flex items-center justify-center p-2 text-white ${item.status === 'success' ? 'bg-teal-400' : 'bg-red-600'} text-2xl`}><SlBell /></div>
                                    <div className="py-3 pr-3">
                                        <div className="text-xs shadow-xl uppercase bg-slate-100 py-1 px-3 w-fit mb-2 text-zinc-600 font-semibold">{item.title}</div>
                                        <div className="text-sm text-slate-600 uppercase flex items-center gap-5"> Status <div className={`${item.status === 'success' ? 'bg-teal-600' : 'bg-red-500'} text-white py-1.5 px-5 text-xs rounded-lg`}>{item.status}</div> </div>
                                        <div className="text-sm text-slate-600"> <span className="font-semibold">Transaction ID: </span> {item.txid}</div>
                                        <div className="text-sm text-slate-600"> <span className="font-semibold">Message: </span> {item.note}</div>
                                        <div className="text-sm text-slate-600"> <span className="font-semibold">Date: </span> {moment(item.createdAt).format('DD-MM-YYYY h:m A')} </div>
                                        <div className={`text-sm ${item.amount?.toString().startsWith('-') ? 'text-red-600' : 'text-teal-500'}`}> <span className="font-semibold">Amount: </span> &#8358;{item.amount}</div>

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
