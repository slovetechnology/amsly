import { FaPlus } from 'react-icons/fa'
import UserLayout from '/src/Components/User/UserLayout'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SlExclamation, SlWallet } from 'react-icons/sl'
import mtn from '/src/Assets/Images/mtn.png'

const Bucket = () => {
    const [view, setView] = useState(false)
    return (
        <UserLayout>
            <div className="w-11/12 mx-auto">
                <div className="grid grid-cols-2">
                    <div className="uppercase font-semibold mt-2">mtn sme portal</div>
                    <div className="">
                        <div className="flex items-center justify-end gap-10">
                            <div className="">
                                <div className="relative h-10 w-20 bg-white rounded-lg shadow-2xl">
                                    <div onClick={() => setView(!view)} className={`absolute top-0 ${view ? 'right-0' : 'left-0'} cursor-pointer h-10 w-10 ${view ? 'bg-teal-600' : 'bg-slate-400'} text-white font-semibold rounded-lg uppercase text-xs flex items-center justify-center transition-all`}>{view ? 'on' : 'hold'}</div>
                                </div>
                            </div>
                            <Link to="/bucket_purchase" className="bg-blue-600 text-white py-3 px-3 rounded-lg"> <FaPlus /> </Link>
                        </div>
                    </div>
                </div>
                <div className="bg-white px-4 py-5 shadow-2xl rounded-lg mt-7">
                    <div className="grid grid-cols-2">
                        <div className="">
                            <div className="uppercase text-sm font-semibold text-blue-600">current wallet balance</div>
                            <div className="uppercase font-bold">&#8358;5500.00</div>
                        </div>
                        <div className="w-fit ml-auto">
                            <Link to="" className='text-blue-600 text-sm uppercase font-semibold'>top up</Link>
                        </div>
                    </div>
                </div>
                <div className="bg-white px-4 py-5 shadow-2xl rounded-lg mt-4">
                    <div className="grid grid-cols-2">
                        <div className="">
                            <div className="uppercase text-sm font-semibold text-blue-600">sme portal balance</div>
                            <div className="uppercase font-bold">0.00gb</div>
                        </div>
                        <div className="w-fit ml-auto">
                            <Link to="/bucket_purchase" className='text-blue-600 text-sm uppercase font-semibold'>buy new sme data</Link>
                        </div>
                    </div>
                </div>
                <div className="bg-white px-4 py-5 shadow-2xl rounded-lg mt-4">
                    <div className="grid grid-cols-2">
                        <div className="">
                            <div className="uppercase text-sm font-semibold text-blue-600">dispense route</div>
                            <div className="uppercase font-bold">mtn sme</div>
                        </div>
                        <div className="w-fit ml-auto">
                            <img src={mtn} alt="" className="w-10 h-10" />
                        </div>
                    </div>
                </div>
                <div className="bg-white px-4 py-5 shadow-2xl rounded-lg mt-4">
                    <div className="grid grid-cols-2">
                        <div className="">
                            <div className="uppercase text-sm font-semibold text-blue-600">available stock</div>
                            <div className="uppercase text-red-600 font-bold">0.00gb</div>
                        </div>
                        <div className="w-fit ml-auto">
                            <Link to="" className='text-slate-600 text-sm uppercase font-semibold flex items-center gap-2'> <SlExclamation /> info</Link>
                        </div>
                    </div>
                </div>
                <div className="font-bold my-6 capitalize">purchase history</div>
                <div className="bg-white rounded-lg p-4 h-[10rem] shadow-xl flex items-center justify-center flex-col gap-3">
                    <div className="text-4xl bg-teal-300/30 text-teal-600 p-3 rounded-lg border border-teal-500"><SlWallet /></div>
                    <div className="text-sm text-slate-600">your sme portal fund transaction will show here!...</div>
                </div>
            </div>
        </UserLayout>
    )
}

export default Bucket