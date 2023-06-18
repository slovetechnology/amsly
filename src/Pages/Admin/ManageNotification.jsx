import React from 'react'
import AdminLayout from '../../Components/Admin/AdminLayout'
import { FaArrowRight } from 'react-icons/fa'

const ManageNotification = () => {
    return (
        <AdminLayout>
            <div className="w-11/12 mx-auto">
                <div className="bg-white rounded-lg mb-10 px-4 py-8">
                    <div className="text-xl text-zinc-600 font-semibold uppercase">Manage<span className="text-red-600"> Notification</span> </div>
                    <div className="mt-10">
                        <div className="mb-6">
                            <div className="text-zinc-600">Notification Content</div>
                            <textarea cols="30" rows="10" className="input"></textarea>
                        </div>
                        <div className="mb-6">
                            <div className="text-zinc-600">Select Operation</div>
                            <select className="input">
                                <option value="">--Choose--</option>
                                <option value="">On</option>
                                <option value="">Off</option>
                            </select>
                        </div>
                        <div className="w-11/12 mx-auto"><button className="bg-indigo-600 rounded-lg w-full mt-5 py-3 uppercase text-white font-semibold flex items-center justify-center gap-10">setup Notification <FaArrowRight /> </button></div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default ManageNotification