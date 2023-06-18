import React from 'react'
import UserLayout from '../../Components/User/UserLayout'
import man from '../../Assets/Images/man.png'
import { FcFeedback, FcFilmReel, FcIdea, FcMultipleDevices, FcNfcSign, FcPhone, FcPuzzle } from 'react-icons/fc'
import { SlExclamation } from 'react-icons/sl'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const {user} = useSelector(state => state.data)
    return (
        <UserLayout pagetitle='dashboard'>
            <div className="">
                <div className="w-full max-w-3xl mx-auto">
                    <div className="bg-orange-100/70 shadow-md text-orange-900 text-sm p-3 rounded-md mb-6 flex items-center gap-3"> <SlExclamation /> USE AUTOMATED TRANSFER TO FUND YOUR WALLET THANK YOU.</div>
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
                            <div className="text-center mt-8 drop-shadow text-sky-100 text-3xl font-semibold">&#8358;{user.balance}</div>
                            <div className="text-center text-sm text-white font-semibold">Account Balance</div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 mt-6 w-full max-w-3xl mx-auto gap-6">
                    <div className="bg-white hover:scale-105 transition-all shadow-xl p-3 rounded-lg w-fit px-5 capitalize ml-auto">sales summary</div>
                    <div className="bg-white hover:scale-105 transition-all shadow-xl p-3 rounded-lg w-fit px-5 capitalize">transactions</div>
                </div>
                <div className="grid grid-cols-3 gap-5 w-full max-w-4xl mx-auto mt-6 mb-10">
                    <div className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcPhone className='text-3xl lg:text-4xl' />
                        <div className="capitalize">airtime</div>
                    </div>
                    <div className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcNfcSign className='text-3xl lg:text-4xl' />
                        <div className="capitalize">buy data</div>
                    </div>
                    <div className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcMultipleDevices className='text-3xl lg:text-4xl' />
                        <div className="capitalize">cable tv</div>
                    </div>
                    <div className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcPhone className='text-3xl lg:text-4xl' />
                        <div className="capitalize">airtime pin</div>
                    </div>
                    <div className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcPhone className='text-3xl lg:text-4xl' />
                        <div className="capitalize">data pin</div>
                    </div>
                    <div className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcIdea className='text-3xl lg:text-4xl' />
                        <div className="capitalize">pay bills</div>
                    </div>
                    <div className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcPuzzle className='text-3xl lg:text-4xl' />
                        <div className="capitalize">exam tokens</div>
                    </div>
                    <div className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcFeedback className='text-3xl lg:text-4xl' />
                        <div className="capitalize">bulk sms</div>
                    </div>
                    <div className="shadow-xl hover:scale-105 transition-all rounded-lg bg-white flex items-center flex-col gap-4 py-4">
                        <FcFilmReel className='text-3xl lg:text-4xl' />
                        <div className="capitalize text-center">get your own Affiliate <br /> VTU website</div>
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}

export default Dashboard
