import React, { useEffect, useRef, useState } from 'react'
import { weblink } from '../Utils/Utility'
import AdminSideBar from './AdminSideBar'
import AdminNavbar from './AdminNavbar'

const AdminLayout = (props) => {
    const { children, pagetitle } = props
    const [closetog, setClosetog] = useState(false)
    const togref = useRef()
    useEffect(() => {
        togref && window.addEventListener('click', (e) => {
            togref.current !== null && !togref.current.contains(e.target) && setClosetog(false)
        }, true)
    }, [])
    return (
        <div>
            <div className={`bg-black/50 fixed top-0 left-0 w-full h-screen z-[2] ${closetog ? '' : 'hidden'}`}>
                <div ref={togref} className="w-[18rem] bg-white h-screen overflow-y-auto scrolls pb-20">
                    <AdminSideBar />
                </div>
            </div>
            <div className="h-screen w-full flex items-center">
                <div className="w-[20vw] hidden lg:block h-screen pb-20 bg-white overflow-y-auto scrolls">
                    <AdminSideBar />
                </div>
                <div className="w-full ml-auto lg:w-[80vw] h-screen">
                    <div className="bg-white py-3 px-5 h-[10vh]">
                        <AdminNavbar closeSidebar={() => setClosetog(!closetog)} pagetitle={pagetitle} />
                    </div>
                    <div className="p-3 h-[90vh] overflow-y-auto">
                        <div className="mb-16 mt-5">
                        {children}
                        </div>
                        <div className="bg-white py-6 px-4 rounded-lg">
                            <div className="flex items-center justify-center uppercase text-slate-500">2023 &copy; {weblink} </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
