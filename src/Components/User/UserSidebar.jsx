import React, { useState } from 'react'
import man from '../../Assets/Images/man.png'
import { FcAssistant, FcHome, FcMultipleDevices, FcProcess, FcReading, FcSalesPerformance, FcServices } from 'react-icons/fc'
import { Link, useLocation } from 'react-router-dom'
import { FcStatistics } from 'react-icons/fc'
import { FcNegativeDynamic } from 'react-icons/fc'
import { FcMindMap } from 'react-icons/fc'
import { FcConferenceCall } from 'react-icons/fc'
import { FcComboChart } from 'react-icons/fc'
import { SlArrowDown, SlPower } from 'react-icons/sl'
import { useSelector } from 'react-redux'

const UserSidebar = () => {
    const location = useLocation()
    const {user} = useSelector(state => state.data)
    const [currentdrop, setCurrentDrop] = useState('')
    const handleCurentDrop = val => {
        if (currentdrop !== val) {
            setCurrentDrop(val)
        } else {
            setCurrentDrop('')
        }
    }
    return (
        <>
            <div className="h-[13rem] sidehd relative bg-gradient-to-t from-indigo-600 to-indigo-900">
                <div className="flex items-center justify-center gap-2 pt-3 flex-col w-full">
                    <img src={man} alt="" className="w-24" />
                    <div className="text-indigo-100 capitalize">{user.username}</div>
                    <div className="text-indigo-100 text-xl capitalize">&#8358;{user.balance}</div>
                </div>
            </div>
            <div className="mt-10 flex flex-col w-11/12 mx-auto">
                <Link to='/dashboard' className={`sidelink ${location.pathname === '/dashboard' ? 'bg-indigo-600 text-white' : ''}`}> <FcHome className='text-2xl' /> Dashboard</Link>

                <div className={`${currentdrop === 'deps' ? 'h-[10rem]' : 'h-[3rem]'}  transition-all overflow-hidden`}>
                    <div onClick={() => handleCurentDrop('deps')} className={`sidelink cursor-pointer ${location.pathname === '/' ? 'bg-indigo-600 text-white' : ''}`}> <FcSalesPerformance className='text-2xl' /> Deposit Money <div className="w-fit ml-auto"><SlArrowDown /></div></div>
                    <div className='ml-8 gap-3 flex flex-col capitalize text-zinc-600'>
                        <Link to='' className='sidelink1'>Automated Transfer</Link>
                        <Link to='' className='sidelink1'>Deposit/Transfer</Link>
                        <Link to='' className='sidelink1'>ATM (Flutterwave)</Link>
                    </div>
                </div>
                {/* <Link to='' className={`sidelink ${location.pathname === '/' ? 'bg-indigo-600 text-white' : ''}`}> <FcSalesPerformance className='text-2xl' /> Desposit Money</Link> */}
                <div className={`${currentdrop === 'trans' ? 'h-[15rem]' : 'h-[3rem]'}  transition-all overflow-hidden`}>
                    <div onClick={() => handleCurentDrop('trans')} className={`sidelink cursor-pointer ${location.pathname === '/' ? 'bg-indigo-600 text-white' : ''}`}> <FcStatistics className='text-2xl' /> Transactions <div className="w-fit ml-auto"><SlArrowDown /></div></div>
                    <div className='ml-8 gap-3 flex flex-col capitalize text-zinc-600'>
                        <Link to='/all-transactions' className='sidelink1'>All Transactions</Link>
                        <Link to='/success-transactions' className='sidelink1'>successful Transactions</Link>
                        <Link to='/failed-transactions' className='sidelink1'>failed Transactions</Link>
                        <Link to='' className='sidelink1'>wallet summary</Link>
                        <Link to='' className='sidelink1'>sales analysis</Link>
                    </div>
                </div>
                {/* <Link to='' className={`sidelink ${location.pathname === '/' ? 'bg-indigo-600 text-white' : ''}`}><FcConferenceCall className='text-2xl' /> My Referrals</Link> */}
                <div className={`${currentdrop === 'refs' ? 'h-[8rem]' : 'h-[3rem]'}  transition-all overflow-hidden`}>
                    <div onClick={() => handleCurentDrop('refs')} className={`sidelink cursor-pointer ${location.pathname === '/' ? 'bg-indigo-600 text-white' : ''}`}> <FcStatistics className='text-2xl' /> Referrals <div className="w-fit ml-auto"><SlArrowDown /></div></div>
                    <div className='ml-8 gap-3 flex flex-col capitalize text-zinc-600'>
                        <Link to='' className='sidelink1'>my downlines</Link>
                        <Link to='' className='sidelink1'>Cashback earned </Link>
                    </div>
                </div>
                <div className="text-slate-500 my-4 ml-3">Quick Links....</div>
                <Link to='/data_bundle' className={`sidelink ${location.pathname === '/data_bundle' ? 'bg-indigo-600 text-white' : ''}`}> <FcNegativeDynamic className='text-2xl' /> Buy Data Bundle</Link>
                <Link to='/airtime_bills' className={`sidelink ${location.pathname === '/airtime_bills' ? 'bg-indigo-600 text-white' : ''}`}><FcMindMap className='text-2xl' /> Buy Airtime VTU</Link>
                <Link to='/share_bills' className={`sidelink ${location.pathname === '/share_bills' ? 'bg-indigo-600 text-white' : ''}`}><FcComboChart className='text-2xl' /> Buy Airtime SnS</Link>
                <Link to='/cable_bills' className={`sidelink ${location.pathname === '/cable_bills' ? 'bg-indigo-600 text-white' : ''}`}><FcMultipleDevices className='text-2xl' /> Tv/Cable Subscriptions</Link>
                <Link to='/meter_bills' className={`sidelink ${location.pathname === '/meter_bills' ? 'bg-indigo-600 text-white' : ''}`}><FcProcess className='text-2xl' /> Bills Payment</Link>
                <Link to='/education_bills' className={`sidelink ${location.pathname === '/education_bills' ? 'bg-indigo-600 text-white' : ''}`}><FcNegativeDynamic className='text-2xl' /> Buy Result E-PINS</Link>
                <Link to='' className={`sidelink ${location.pathname === '/' ? 'bg-indigo-600 text-white' : ''}`}><FcAssistant className='text-2xl' /> Our Live Chat</Link>
                <Link to='' className={`sidelink ${location.pathname === '/' ? 'bg-indigo-600 text-white' : ''}`}><FcReading className='text-2xl' /> Developer Api</Link>
                <div className={`${currentdrop === 'settings' ? 'h-[10rem]' : 'h-[3rem]'} transition-all overflow-hidden`}>
                    <div onClick={() => handleCurentDrop('settings')} className={`sidelink ${location.pathname === '/' ? 'bg-indigo-600 text-white' : ''} cursor-pointer`}><FcServices className='text-2xl' /> Update Settings <div className="w-fit ml-auto"><SlArrowDown /></div> </div>

                    <div className='ml-8 gap-3 flex flex-col capitalize text-zinc-600'>
                        <Link to='1' className='sidelink1'>my profile</Link>
                        <Link to='2' className='sidelink1'>change password</Link>
                        <Link to='/kyc_upload' className='sidelink1'>kyc registration</Link>
                    </div>
                </div>

                <Link to='' className={`sidelink ${location.pathname === '/' ? 'bg-indigo-600 text-white' : ''}`}><SlPower className='text-xl text-red-400' /> Logout</Link>
            </div>
        </>
    )
}

export default UserSidebar
