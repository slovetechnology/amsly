import React from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { FaArrowRight } from 'react-icons/fa'

const UpgradeUser = () => {
    return (
        <AdminLayout pagetitle="Upgrade User Account">
            <div className="w-11/12 mx-auto">
                <div className="bg-white rounded-lg mb-10 px-4 py-8">
                    <div className="mt-10">
                        <div className="mb-6">
                            <div className="text-zinc-600">user email address</div>
                            <input type="number" className="input" />
                        </div>
                        <div className="mb-6">
                            <div className="text-zinc-600">Select Operation</div>
                            <select className="input">
                                <option value="">--Select--</option>
                                {new Array(10).fill().map((item, i) => (
                                    <option value="">{`Upgrade to Level ${i + 1}`}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-11/12 mx-auto"><button className="bg-indigo-600 rounded-lg w-full mt-5 py-3 uppercase text-white font-semibold flex items-center justify-center gap-10">search <FaArrowRight /> </button></div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default UpgradeUser