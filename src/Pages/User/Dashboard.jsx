import React, { useCallback, useEffect, useRef, useState } from 'react'
import UserLayout from '/src/Components/User/UserLayout'
import man from '/src/Assets/Images/man.png'
import { FcFeedback, FcFilmReel, FcIdea, FcMultipleDevices, FcNfcSign, FcPhone, FcPuzzle } from 'react-icons/fc'
import { SlExclamation } from 'react-icons/sl'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Api, GetUrl } from '/src/Components/Utils/Apis'
import SingleTransactionComponent from '/src/Components/General/SingleTransactionComponent'
import { refLink } from '/src/Components/Utils/Utility'
import { ErrorAlert } from '/src/Components/Utils/Utility'
import { CoypToClipboard } from '/src/Components/Utils/Utility'

const Dashboard = () => {
    const { user } = useSelector(state => state.data)
    const copyref = useRef()
    const [trans, setTrans] = useState([])
    const [currentPage,] = useState(1)
    const [transPerPage,] = useState(3)
    const [notes, setNotes] = useState([])

    const fetchTransactions = useCallback(async () => {
        const res = await GetUrl(`${Api.transactions.user}?limit=${transPerPage}`)
        return setTrans(res.msg)
    }, [])

    useEffect(() => {
        fetchTransactions()
    }, [fetchTransactions])

    const indexOfLastTrans = currentPage * transPerPage
    const indexOfFirstTrans = indexOfLastTrans - transPerPage
    const currentTrans = trans.slice(indexOfFirstTrans, indexOfLastTrans)

    const FetchNotify = useCallback(async () => {
        try {
            const res = await GetUrl(Api.notify.notify)
            if (res.status === 200) {
                return setNotes(res.msg)
            }
        } catch (error) {
            ErrorAlert(`${error}`)
        }
    }, [])

    useEffect(() => { FetchNotify() }, [FetchNotify])
    return (
        <UserLayout pagetitle='dashboard'>
            <div className="">
                <div className="w-full max-w-3xl mx-auto">
                    {notes.map((item, i) => (
                        <div key={i}>
                            {item.tag === 'first' && <div className="bg-white p-3 rounded-md text-center shadow-md mb-4">{item.message}</div>}
                            {item.tag === 'second' && <div className="bg-orange-100/70 justify-center shadow-md text-orange-900 text-sm p-3 rounded-md mb-6 flex items-center gap-3"> <SlExclamation />{item.message}</div>}
                            {item.tag === 'third' && <div className="mb-5">
                                <marquee behavior="smooth" direction="left">{item.message}</marquee>
                            </div>}
                        </div>
                    ))}

                    <div className="bg-card shadow-xl rounded-xl px-3 pb-3 pt-5 hmscreen bg-wave bg-cover bg-center relative">
                        <div className="px-4 pb-6">
                            <div className="flex gap-2 relative pt-6">
                                <img src={man} alt="" className="w-10 h-auto rounded-full cursor-pointer active:scale-90 self-start" />
                                <div className="w-full">
                                    <div className="grid grid-cols-2">
                                        <div className="text-white font-semibold text-lg">{user.username}</div>
                                        <div className="w-fit ml-auto">
                                            <button className="bg-white hover:scale-105 transition-all text-sm shadow-xl text-zinc-600 py-2 px-4 rounded-full capitalize">fund wallet</button>
                                        </div>
                                    </div>
                                    <div className="text-white text-sm">{user.phone}</div>
                                </div>
                            </div>
                            <div className="text-center mt-8 drop-shadow text-sky-100 text-3xl font-semibold">&#8358;{parseFloat(user.balance).toLocaleString()}</div>
                            <div className="text-center text-sm text-white font-semibold">Account Balance</div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 mt-6 w-full max-w-3xl mx-auto gap-6">
                    <div className="bg-white hover:scale-105 transition-all shadow-xl p-3 rounded-lg w-fit px-5 capitalize ml-auto">sales summary</div>
                    <Link to="/all-transactions" className="bg-white hover:scale-105 transition-all shadow-xl p-3 rounded-lg w-fit px-5 capitalize">transactions</Link>
                </div>
                <div className="grid grid-cols-3 gap-5 w-full max-w-4xl mx-auto mt-6 mb-10">
                    <Link to='/airtime_bills' className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcPhone className='text-3xl lg:text-4xl' />
                        <div className="capitalize">airtime</div>
                    </Link>
                    <Link to="/data_bundle" className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcNfcSign className='text-3xl lg:text-4xl' />
                        <div className="capitalize">buy data</div>
                    </Link>
                    <Link to='/meter_bills' className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcIdea className='text-3xl lg:text-4xl' />
                        <div className="capitalize">pay bills</div>
                    </Link>
                    {/* <Link to='/cable_bills' className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcMultipleDevices className='text-3xl lg:text-4xl' />
                        <div className="capitalize">cable tv</div>
                    </Link> */}
                    {/* <div className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcPhone className='text-3xl lg:text-4xl' />
                        <div className="capitalize">airtime pin</div>
                    </div> */}
                    <Link to='/create_pin' className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcPhone className='text-3xl lg:text-4xl' />
                        <div className="capitalize">data pin</div>
                    </Link>
                    <Link to='/education_bills' className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcPuzzle className='text-3xl lg:text-4xl' />
                        <div className="capitalize">exam tokens</div>
                    </Link>
                    <div className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcFeedback className='text-3xl lg:text-4xl' />
                        <div className="capitalize">bulk sms</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 w-full max-w-4xl mx-auto mt-6 mb-10">
                    <div className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcFilmReel className='text-3xl lg:text-4xl' />
                        <div className="capitalize text-center">get your own Affiliate <br /> VTU website</div>
                    </div>
                    <div className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center justify-center flex-col gap-4 py-4">
                        <div className="w-11/12 mx-auto">
                            <div className="flex items-center gap-4">
                                <input ref={copyref} type="text" readOnly value={refLink(user.refid)} className="input" />
                                <button onClick={() => CoypToClipboard(copyref.current)} className="bg-indigo-600 text-white rounded-lg shadow-xl py-2 px-4 capitalize">copy</button>
                            </div>
                        </div>
                        <Link to="/downlines" className="capitalize text-center font-semibold">Refer new user and earn</Link>
                    </div>
                </div>
{/* 
                <div className="w-full max-w-4xl mx-auto bg-white p-3 mb-5 hover:scale-105 transition-all rounded-lg shadow-2xl break-words">
                    <div className="bg-slate-100 p-4 rounded-lg">
                        <div className="text-medium font-semibold">Api Token:</div>
                        <span className="text-sm">{user.apitoken}</span>
                    </div>
                </div> */}

                <div className="w-full max-w-4xl mx-auto">
                    <div className="grid grid-cols-6 w-11/12 mx-auto">
                        <div className="font-semibold col-span-4 capitalize text-zinc-600 text-3xl mb-5 drop-shadow-lg">latest transactions</div>
                        <div className="text-right col-span-2 pt-2">
                            <Link to='/all-transactions' className='text-indigo-600'>View All</Link>
                        </div>
                    </div>
                    {currentTrans.map((item, i) => (
                        <SingleTransactionComponent item={item} key={i} />
                    ))}
                </div>
            </div>
        </UserLayout>
    )
}

export default Dashboard
