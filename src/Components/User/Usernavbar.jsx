import React, { useEffect, useRef, useState } from 'react'
import man from '../../Assets/Images/man.png'
import { Link } from 'react-router-dom'
import { SlBell } from 'react-icons/sl'
import { FcMenu } from 'react-icons/fc'
import Logout from '../General/Logout'

const Usernavbar = ({closeSidebar, pagetitle}) => {
    const [closetog, setClosetog] = useState(false)
    const [logs, setLogs] = useState(false)
    const togref = useRef()
    useEffect(() => {
        togref && window.addEventListener('click', (e) => {
            togref.current !== null && !togref.current.contains(e.target) && setClosetog(false)
        }, true)
    }, [])

  return (
    <div>
        {logs && <Logout closeView={() => setLogs(!logs)} /> }
        <div className={`${closetog ? '' : 'hidden'} absolute top-20 right-5 bg-white pb-5 rounded-lg shadow-xl z-[2] w-[12rem]`}>
            <div ref={togref} className="bg-indigo-600 navprofile relative p-4 rounded-tr-lg rounded-tl-lg">
                <div className="text-indigo-100">Hi! client username</div>
            </div>
            <div className="flex flex-col mt-3">
                <Link to='' className='capitalize py-2 px-3 text-slate-500'>my profile</Link>
                <Link to='' className='capitalize py-2 px-3 text-slate-500'>settings</Link>
                <Link onClick={() => setLogs(!logs)} className='capitalize py-2 px-3 text-slate-500'>logout</Link>
            </div>
        </div>
      <div className="flex items-center justify-between">
        <div className="">
            <div className="text-3xl lg:hidden cursor-pointer w-fit" onClick={closeSidebar}><FcMenu /></div>
        </div>
        <div className="font-semibold text-zinc-500 capitalize">{pagetitle}</div>
        <div className="flex items-center gap-8">
            <Link to='' className="text-2xl text-slate-500">
                <SlBell />
            </Link>
            <img onClick={() => setClosetog(!closetog)} src={man} alt="" className="w-10 rounded-full cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default Usernavbar
